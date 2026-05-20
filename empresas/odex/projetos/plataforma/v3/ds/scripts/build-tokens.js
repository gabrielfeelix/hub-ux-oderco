#!/usr/bin/env node
/**
 * ds/scripts/build-tokens.js
 *
 * Lê ds/tokens/tokens.json (source of truth) e gera ds/tokens/tokens.css.
 *
 * Uso:
 *   node ds/scripts/build-tokens.js
 *   npm run build-tokens
 *
 * Sem dependências · só Node stdlib.
 *
 * Como funciona:
 * 1. Parse JSON
 * 2. Walk hierarquia · cada folha { value, type } vira CSS var
 * 3. Resolve referências {path.to.token} pra var(--name)
 * 4. Agrupa por seção · emite com headers de comentário
 * 5. Anexa aliases legados (--amber, --r, --rx) no fim
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'tokens', 'tokens.json');
const CSS_PATH = path.join(ROOT, 'tokens', 'tokens.css');

// ============================================================
// Naming rules · JSON path → CSS var name
// Ordem importa: regras mais específicas primeiro.
// ============================================================
const RULES = [
  // Semantic
  { test: (p) => p.startsWith('semantic.color.'),  build: (p) => '--color-' + p.slice('semantic.color.'.length).split('.').join('-') },
  { test: (p) => p.startsWith('semantic.shadow.'), build: (p) => '--shadow-' + p.slice('semantic.shadow.'.length) },

  // Primitives
  { test: (p) => p === 'font.family.sans',         build: ()  => '--font' },
  { test: (p) => p.startsWith('color.info.'),      build: (p) => '--info-' + p.slice('color.info.'.length) },
  { test: (p) => /^color\.(brand|text|surface|feedback)\./.test(p), build: (p) => '--' + p.split('.').pop() },
  { test: (p) => p.startsWith('radius.'),          build: (p) => '--r-' + p.slice('radius.'.length) },
  { test: (p) => p.startsWith('shadow.'),          build: (p) => '--shadow-' + p.slice('shadow.'.length) },
  { test: (p) => p.startsWith('font.weight.'),     build: (p) => '--fw-' + p.slice('font.weight.'.length) },
  { test: (p) => p.startsWith('font.size.'),       build: (p) => '--fs-' + p.slice('font.size.'.length) },
  { test: (p) => p.startsWith('font.lineHeight.'), build: (p) => '--lh-' + p.slice('font.lineHeight.'.length) },
  { test: (p) => p.startsWith('spacing.'),         build: (p) => '--space-' + p.slice('spacing.'.length) },
  { test: (p) => p.startsWith('size.control.'),    build: (p) => '--control-' + p.slice('size.control.'.length) },
  { test: (p) => p.startsWith('size.icon.'),       build: (p) => '--icon-' + p.slice('size.icon.'.length) },
  { test: (p) => p.startsWith('motion.duration.'), build: (p) => '--motion-' + p.slice('motion.duration.'.length) },
  { test: (p) => p.startsWith('motion.easing.'),   build: (p) => '--easing-' + p.slice('motion.easing.'.length) },
  { test: (p) => p.startsWith('z.'),               build: (p) => '--z-' + p.slice('z.'.length) },
  { test: (p) => p.startsWith('breakpoint.'),      build: (p) => '--bp-' + p.slice('breakpoint.'.length) },
];

function pathToVarName(p) {
  for (const r of RULES) if (r.test(p)) return r.build(p);
  return null;
}

// ============================================================
// Section order · controla ordem de emissão no CSS final
// (mantém compatibilidade com layout atual pra diff mínimo)
// ============================================================
const SECTION_ORDER = [
  { prefix: 'color.brand.',    header: 'COLOR · BRAND (primitives)' },
  { prefix: 'color.text.',     header: 'COLOR · TEXT' },
  { prefix: 'color.surface.',  header: 'COLOR · SURFACE' },
  { prefix: 'color.feedback.', header: 'COLOR · FEEDBACK (primitives · success / warning / error)' },
  { prefix: 'color.info.',     header: 'COLOR · INFO (banners/alerts azuis)' },
  { prefix: 'radius.',         header: 'RADIUS' },
  { prefix: 'shadow.',         header: 'SHADOW' },
  { prefix: 'font.family.',    header: 'FONT · family' },
  { prefix: 'font.weight.',    header: 'FONT · weight' },
  { prefix: 'font.size.',      header: 'FONT · size' },
  { prefix: 'font.lineHeight.', header: 'FONT · line-height' },
  { prefix: 'spacing.',        header: 'SPACING (escala 4px base)' },
  { prefix: 'size.control.',   header: 'SIZE · control (botões/inputs altura)' },
  { prefix: 'size.icon.',      header: 'SIZE · icon' },
  { prefix: 'motion.duration.',header: 'MOTION · duration' },
  { prefix: 'motion.easing.',  header: 'MOTION · easing curves' },
  { prefix: 'z.',              header: 'Z-INDEX scale (use intent · não números mágicos)' },
  { prefix: 'breakpoint.',     header: 'BREAKPOINT · escala canônica (literais em @media)' },
  // Semantic
  { prefix: 'semantic.color.action.',    header: 'SEMANTIC · ACTION · botões e elementos interativos', sectionHeader: 'SEMANTIC' },
  { prefix: 'semantic.color.surface.',   header: 'SEMANTIC · SURFACE · backgrounds' },
  { prefix: 'semantic.color.text.',      header: 'SEMANTIC · TEXT' },
  { prefix: 'semantic.color.border.',    header: 'SEMANTIC · BORDER' },
  { prefix: 'semantic.color.feedback.',  header: 'SEMANTIC · FEEDBACK · success/warning/error/info' },
  { prefix: 'semantic.color.status.',    header: 'SEMANTIC · STATUS · domain-specific pills' },
  { prefix: 'semantic.shadow.',          header: 'SEMANTIC · SHADOW' },
];

// ============================================================
// Legacy aliases · não vivem no JSON (compat com classes antigas)
// ============================================================
const LEGACY_ALIASES = [
  { name: '--amber',   value: 'var(--yellow)',    desc: 'alias compat de --yellow' },
  { name: '--r',       value: 'var(--r-form)',    desc: 'alias compat de --r-form' },
  { name: '--rx',      value: 'var(--r-card)',    desc: 'alias compat de --r-card' },
  { name: '--shadow',  value: 'var(--shadow-md)', desc: 'alias compat de --shadow-md (default shadow)' },
];

// ============================================================
// Walk JSON · coleta { path, value, type, description }
// ============================================================
function walk(obj, prefix, out) {
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key === '$schema' || key === '$meta') continue;
    const val = obj[key];
    const newPath = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in val && 'type' in val) {
      out.push({
        path: newPath,
        value: val.value,
        type: val.type,
        description: val.description || null,
      });
    } else if (val && typeof val === 'object') {
      walk(val, newPath, out);
    }
  }
}

// ============================================================
// Resolve {path.to.token} → var(--name)
// ============================================================
function resolveRef(value, pathToName) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([a-z0-9.-]+)\}/gi, (m, ref) => {
    const name = pathToName.get(ref);
    if (!name) {
      console.warn(`[build-tokens] referência não resolvida: ${ref}`);
      return m;
    }
    return `var(${name})`;
  });
}

// ============================================================
// Main
// ============================================================
function main() {
  const raw = fs.readFileSync(JSON_PATH, 'utf8');
  const json = JSON.parse(raw);

  const tokens = [];
  walk(json, '', tokens);

  // Build path → CSS var name map (resolves references)
  const pathToName = new Map();
  for (const t of tokens) {
    const name = pathToVarName(t.path);
    if (!name) {
      console.warn(`[build-tokens] sem mapeamento pra path: ${t.path}`);
      continue;
    }
    if (pathToName.has(t.path)) {
      console.warn(`[build-tokens] path duplicado: ${t.path}`);
    }
    pathToName.set(t.path, name);
  }

  // Bucket by section
  const buckets = new Map(); // section index → tokens[]
  const unmatchedTokens = [];
  for (const t of tokens) {
    let matched = false;
    for (let i = 0; i < SECTION_ORDER.length; i++) {
      if (t.path.startsWith(SECTION_ORDER[i].prefix)) {
        if (!buckets.has(i)) buckets.set(i, []);
        buckets.get(i).push(t);
        matched = true;
        break;
      }
    }
    if (!matched) unmatchedTokens.push(t);
  }
  if (unmatchedTokens.length) {
    console.warn(`[build-tokens] ${unmatchedTokens.length} token(s) sem seção:`, unmatchedTokens.map(t => t.path).join(', '));
  }

  // Detect collisions on CSS var name
  const seenNames = new Set();
  const collisions = [];
  for (const t of tokens) {
    const name = pathToName.get(t.path);
    if (!name) continue;
    if (seenNames.has(name)) collisions.push({ name, path: t.path });
    seenNames.add(name);
  }
  if (collisions.length) {
    console.error('[build-tokens] colisões de var name:', collisions);
    process.exit(1);
  }

  // Generate CSS
  const lines = [];
  lines.push('/* ==========================================================================');
  lines.push('   ODEX · PLATAFORMA SOLAR · DESIGN TOKENS');
  lines.push('   GERADO AUTOMATICAMENTE por ds/scripts/build-tokens.js');
  lines.push('   NÃO EDITE ESTE ARQUIVO MANUALMENTE · edite ds/tokens/tokens.json');
  lines.push('   Re-gere com:  node ds/scripts/build-tokens.js  (ou: npm run build-tokens)');
  lines.push('   ========================================================================== */');
  lines.push('');
  lines.push(':root {');

  let lastWasSemantic = false;
  for (let i = 0; i < SECTION_ORDER.length; i++) {
    const section = SECTION_ORDER[i];
    const items = buckets.get(i);
    if (!items || !items.length) continue;

    const isSemantic = section.prefix.startsWith('semantic.');
    // Header de bloco SEMANTIC (apenas uma vez)
    if (isSemantic && !lastWasSemantic) {
      lines.push('');
      lines.push('  /* ============================================================');
      lines.push('     ========================= SEMANTIC =========================');
      lines.push('     ============================================================');
      lines.push('     Aliases por INTENÇÃO. Components usam essas variáveis em vez');
      lines.push('     de primitivas. Permite tematização trocando só este bloco.');
      lines.push('     ============================================================ */');
      lastWasSemantic = true;
    }

    lines.push('');
    lines.push('  /* ============================================================');
    lines.push(`     ${section.header}`);
    lines.push('     ============================================================ */');

    // Calcular padding de alinhamento
    const names = items.map(t => pathToName.get(t.path));
    const maxNameLen = Math.max(...names.map(n => n.length));

    for (const t of items) {
      const name = pathToName.get(t.path);
      const value = resolveRef(t.value, pathToName);
      const pad = ' '.repeat(maxNameLen - name.length);
      const valueStr = `${name}:${pad} ${value};`;
      const line = t.description
        ? `  ${valueStr.padEnd(60)}/* ${t.description} */`
        : `  ${valueStr}`;
      lines.push(line);
    }
  }

  // Legacy aliases
  if (LEGACY_ALIASES.length) {
    lines.push('');
    lines.push('  /* ============================================================');
    lines.push('     LEGACY ALIASES · compat com classes antigas');
    lines.push('     ============================================================ */');
    const maxAliasLen = Math.max(...LEGACY_ALIASES.map(a => a.name.length));
    for (const a of LEGACY_ALIASES) {
      const pad = ' '.repeat(maxAliasLen - a.name.length);
      const valueStr = `${a.name}:${pad} ${a.value};`;
      const line = a.desc ? `  ${valueStr.padEnd(60)}/* ${a.desc} */` : `  ${valueStr}`;
      lines.push(line);
    }
  }

  lines.push('}');
  lines.push('');

  const output = lines.join('\n');

  // --check mode · verifica drift sem escrever
  if (process.argv.includes('--check')) {
    const existing = fs.existsSync(CSS_PATH) ? fs.readFileSync(CSS_PATH, 'utf8') : '';
    if (existing !== output) {
      console.error('[build-tokens] ✗ DRIFT detectado · tokens.json e tokens.css fora de sync');
      console.error('[build-tokens]   Execute: npm run build-tokens');
      process.exit(1);
    }
    console.log('[build-tokens] ✓ check passou · tokens.json e tokens.css em sync');
    return;
  }

  fs.writeFileSync(CSS_PATH, output, 'utf8');

  console.log(`[build-tokens] ✓ ${CSS_PATH}`);
  console.log(`[build-tokens]   ${tokens.length} tokens · ${seenNames.size} CSS vars · ${LEGACY_ALIASES.length} legacy aliases`);
}

main();
