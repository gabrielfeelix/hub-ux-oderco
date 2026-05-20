# Odex · Plataforma Solar · Design System

> v0.6.0 · 2026-05-20 · Owner: Gabriel Felix Barbosa

📖 **[Catálogo visual](./catalog.html)** · abra no navegador pra ver todos atoms + molecules + tokens (primitivos e semânticos) em todos estados.

Design System da Plataforma Solar Odex. Source of truth para tokens, componentes e padrões visuais que devem ser idênticos entre código (browser) e design (Figma).

---

## Por que isso existe

A plataforma rodava como single-file `index.html` — ótimo pra iterar rápido, ruim pra:

1. Garantir consistência (mesmo botão em telas diferentes diverge sem alguém perceber)
2. Handoff Figma ↔ código (sem componentes formais, sync sempre vira retrabalho)
3. Onboarding de outros devs / designers
4. Trocar token (ex: cor da marca) sem caçar 50 lugares

Este DS resolve esses 4 pontos sem destruir a ergonomia do `index.html`. Tokens viram CSS variables linkadas; HTML continua abrindo no navegador com double-click.

---

## Status atual

| Fase | Escopo | Status |
|---|---|---|
| **A · Tokens** | Cores, radius, shadows, font family/sizes/weights, spacing, sizes | ✅ Pronto |
| **B · CSS atomic** | `.ds-*` extraídos pra `ds/atoms/` + `.odex-select`/`.ds-menu` em `ds/molecules/` | ✅ Pronto |
| **C · Componentes contextuais** | Auth ✅ · Catálogo ✅ · Semantic ✅ · Build pipeline ✅. Próximo: reset/motion/z-index/breakpoint tokens, @layer | 🟡 Em progresso (C.1-C.4 ✅) |
| **D · Figma DS espelho** | Criar componentes 1:1 no `Design System [ODEX]` da file Figma | ⏳ |
| **E · Code Connect** | Mapear cada CSS class ↔ Figma component | ⏳ |
| **F · Icon library** | Subset lucide como component set no Figma | ⏳ |

---

## Estrutura

```
ds/
├── README.md                # este arquivo
├── index.css                # ⭐ root barrel · single link from HTML
├── tokens/
│   ├── tokens.json          # ⭐ source of truth (style-dictionary)
│   └── tokens.css           # export CSS
├── atoms/
│   ├── index.css            # barrel atoms
│   ├── typography.css       # .ds-h1, h2, h3, p, p2, p3, p-bold, label, placeholder
│   ├── buttons.css          # .ds-btn + variants + .ds-pill-warm/-cool
│   ├── links.css            # .ds-link, -14, -16, -navy
│   ├── inputs.css           # .ds-input, .ds-select, .ds-textarea, .ds-input-sm
│   ├── fields.css           # .ds-field-label, .ds-field, .ds-field-inline
│   ├── checkbox.css         # .ds-check (checkbox + radio)
│   ├── pills.css            # .ds-pill + status variants
│   └── cards.css            # .ds-card, -lg, -shadow
└── molecules/
    ├── index.css            # barrel molecules
    ├── select.css           # .odex-select (custom dropdown)
    └── menu.css             # .ds-menu (toolbar dropdown)
```

### Feature modules (outside `ds/`)

Convenção: composição específica de DS pra uma feature vive em `features/<name>/`:

```
features/
├── auth/
│   └── auth.css             # ✅ Login + Cadastro + Redefinir senha
├── monte-kit/               # 🔜 .mk-* (kit builder multi-step)
│   └── mk.css
├── orcamentos/              # 🔜 .ov-* / .orc-* (orçamentos)
│   └── ov.css
├── pedidos/                 # 🔜 .ped-* / .ped-v2-* (pedidos)
│   └── ped.css
├── checkout/                # 🔜 .ck-* / .ckform-* / .ckitem-* / .cksummary-*
│   └── ck.css
├── clientes/                # 🔜 .clients-* / .nc-* (novo cliente)
├── calculadora/             # 🔜 .calc-* (payback solar)
├── orçamentos-listing/      # 🔜 .orc-* / .list-* (listings)
├── ajuda/                   # 🔜 .ajuda-*
├── dashboard/               # 🔜 .dash-*
└── topbar-sidebar/          # 🔜 .topbar, .sidebar-* (app chrome)
```

**Regra geral:**
- Classe começa com `.ds-` ou `.odex-` → vive em `ds/atoms/` ou `ds/molecules/`
- Classe começa com prefixo de feature (`.auth-`, `.mk-`, `.ov-`, etc) → vive em `features/<name>/`
- Classe `.body.is-auth #view-*` ou seletor de página → vai junto com sua feature module

### Próximas adições

```
ds/
├── ... (acima)
├── organisms/               # .auth-shell, .mk-step-shell · agregados grandes do DS
├── icons/                   # SVG paths lucide subset (Phase F)
└── figma/                   # exports pra Tokens Studio / Variables Import
```

---

## Camadas de tokens (primitive ↔ semantic)

Tokens vivem em **duas camadas hierárquicas**:

### 1. Primitives (foundation layer)

Valores literais. Hex codes, px, segundos. Não mudam baseado em contexto.

```css
--blue:       #005AFF;
--navy:       #0D1D52;
--red-50:     #FDE0E0;
--space-16:   16px;
--r-form:     4px;
```

### 2. Semantic (intent layer)

Aliases por **intenção**. Resolvem pra primitivas. Componentes do DS usam SEMPRE semantic.

```css
--color-action-primary-bg:      var(--blue);
--color-action-primary-bg-hover: var(--blue-hover);
--color-action-primary-fg:       var(--white);
--color-feedback-error-bg:       var(--red-50);
--color-text-on-brand:           var(--white);
```

### Por que essa separação?

- **Theming** — pra fazer dark mode, brand variant, white-label: troca só o bloco semantic, primitivas ficam intactas. Components não precisam mudar.
- **Refactor seguro** — mudar `--blue` afeta TODOS os usos do azul. Mudar `--color-action-primary-bg` afeta só CTAs primários. Granularidade.
- **Naming significativo** — `var(--color-feedback-error-fg)` documenta a intenção. `var(--red-700)` não.
- **Onboarding** — devs entendem "quando usar qual token" pela intenção, não pela cor.

### Padrão de naming semantic

```
--color-<categoria>-<elemento>-<estado>

categorias: action | surface | text | border | feedback | status
elementos:  bg | fg | border | shadow
estados:    default (implícito) | hover | disabled | focus
```

Exemplos:
- `--color-action-primary-bg` · BG do botão primary
- `--color-action-primary-bg-hover` · BG em hover
- `--color-text-on-brand` · Text quando sobre brand bg
- `--color-feedback-error-strong` · Cor saturada de erro (não soft)

### Quando usar primitive vs semantic

| Contexto | Use | Por quê |
|---|---|---|
| Atom/molecule CSS (DS canon) | **semantic** | Componente reutilizável precisa ser theme-aware |
| Feature CSS (`features/*/`) | **semantic** preferred, primitive em casos especiais | Mesma razão; primitive só pra cores brand-specific (gradient hero, etc) |
| Inline style no HTML | semantic ou primitive · ambos OK | Caso isolado, pouco impacto |
| Novo token de feature | adiciona em **primitive** se for cor base, **semantic** se for intent | Decide pela intenção |

## Fluxo de tokens

```
                ┌────────────────────────┐
                │   tokens/tokens.json   │  ← SOURCE OF TRUTH
                │  (style-dictionary)    │
                └─────────────┬──────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
   ┌──────────────────┐            ┌──────────────────────┐
   │  tokens/tokens.css│            │  Figma Variables     │
   │   (CSS variables) │            │  (via Tokens Studio  │
   │                   │            │   ou Variables       │
   │  → index.html     │            │   Import 2 plugin)   │
   └──────────────────┘            └──────────────────────┘
```

**Source of truth:** `tokens.json`. NUNCA edite `tokens.css` manualmente — ele é gerado.

**Build:**

```bash
# Re-gera ds/tokens/tokens.css a partir de ds/tokens/tokens.json
npm run build-tokens
# ou diretamente:
node ds/scripts/build-tokens.js
```

**Check (CI):** verifica se `tokens.css` está sincronizado com `tokens.json` · falha exit code 1 se drift:

```bash
npm run check-tokens
```

O script (`ds/scripts/build-tokens.js`):
- Zero dependências · só Node stdlib (Node 18+)
- Resolve referências `{path.to.token}` pra `var(--name)`
- Aplica regras de naming por categoria (ex: `radius.form` → `--r-form`, `font.size.12` → `--fs-12`)
- Detecta colisões de var name e aborta
- Aliases legados (`--amber`, `--r`, `--rx`, `--shadow`) injetados no final pra compat com classes antigas

---

## Como importar no Figma

### Opção 1 · Tokens Studio for Figma (recomendado)

1. Instale o plugin **Tokens Studio for Figma** ([figma.com/community](https://www.figma.com/community/plugin/843461159747178978))
2. No plugin: `Tools` → `Import` → cole o conteúdo de `tokens/tokens.json`
3. Click `Create Variables` → escolhe collection name (sugestão: `DS Odex`)
4. Pronto. Variáveis aparecem na file Figma e podem ser aplicadas em fills/text styles.

### Opção 2 · Variables Import 2

1. Plugin [Variables Import 2](https://www.figma.com/community/plugin/1256713532517819979)
2. Cole `tokens/tokens.json` no input
3. Click `Import` → gera coleção de Variables

### Opção 3 · Build script (futuro)

`pnpm run build-figma-tokens` vai gerar um JSON no formato exato da Figma REST API pra upload programático.

---

## Como consumir no código

### CSS

```html
<link rel="stylesheet" href="ds/index.css">
```

Esse único link carrega: tokens → atoms (`.ds-*`) → molecules (`.odex-select`, `.ds-menu`).

Depois usa classes DS direto no HTML:

```html
<button class="ds-btn ds-btn-primary">Salvar</button>
<input class="ds-input" placeholder="Digite...">
<select class="ds-replace"><option>...</option></select>  <!-- vira .odex-select -->
```

Ou usa as variáveis CSS quando precisar de estilo custom:

```css
.my-button {
  background: var(--blue);
  color: var(--white);
  border-radius: var(--r-form);
  padding: 0 var(--space-18);
  height: var(--control-md);
  font: var(--fw-medium) var(--fs-14) var(--font);
  box-shadow: var(--shadow-sm);
}
```

### JS / JSON (futuro)

Quando virar `.npm` package:

```js
import { color, spacing, radius } from '@odex/ds-tokens';
console.log(color.brand.blue); // '#005AFF'
```

---

## Convenções

### Naming

- **Cores** seguem categoria-finalidade: `color.brand.navy`, `color.feedback.green`, `color.surface.bg`
- **Radius** seguem uso: `radius.form` (controls), `radius.card` (containers), `radius.pill` (especiais)
- **Spacing** seguem px (`space-4`, `space-8`, `space-16`...) — base 4px
- **Sizes** seguem t-shirt (`control-sm/md/lg`, `icon-xs/sm/md/lg/xl`)
- **Font sizes** seguem px (`fs-12`, `fs-14`, `fs-28`...)

### O que NÃO criar como token

- Cores one-off de animação ou estados muito específicos → usa rgba inline
- Valores únicos usados em UM lugar → não escala como token
- Cores temáticas de feature (ex: brand color do Prêmio Venda Direta) → vive na feature, não no DS

### Mudanças

Mudar token significa mudar visual em **toda a plataforma**. Sempre:
1. Discutir com UX antes
2. Atualizar `tokens.json` E `tokens.css` no mesmo commit
3. Revisar telas-chave (Dashboard, Login, Monte Kit, Loja, Orçamentos) antes de merge

---

## Referência rápida · Tokens

### Brand

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#0D1D52` | Sidebar, headings |
| `--blue` | `#005AFF` | CTAs primários, links |
| `--blue-button` | `#22437D` | Botão navy variant |

### Surface

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F9F9F9` | BG página |
| `--white` | `#FFFFFF` | Cards, inputs |
| `--line` | `#E6E6E6` | Borders |

### Feedback

| Token | Valor | Uso |
|---|---|---|
| `--green` | `#53C667` | Success |
| `--yellow` | `#F39200` | Warning |
| `--red` | `#E94647` | Error |

### Radius

| Token | Valor | Uso |
|---|---|---|
| `--r-form` | `4px` | Botões, inputs |
| `--r-card` | `12px` | Cards |
| `--r-card-lg` | `16px` | Modais |

### Control sizes

| Token | Valor | Uso |
|---|---|---|
| `--control-sm` | `32px` | `.ds-btn-sm` |
| `--control-md` | `42px` | `.ds-btn`, `.ds-input` |
| `--control-lg` | `48px` | `.ds-btn-lg`, `.auth-submit` |

---

## Roadmap

### Phase A · Tokens
- [x] Extrair CSS vars de `index.html` pra `ds/tokens/tokens.css`
- [x] Espelhar em `ds/tokens/tokens.json` (style-dictionary)
- [x] Documentar fluxo em `ds/README.md`
- [x] Link `tokens.css` em `index.html`
- [ ] Importar `tokens.json` no Figma como Variables (Phase D pré-requisito)

### Phase B · CSS Atomic
- [x] Mover `.ds-*` (buttons, inputs, typography, fields, checkbox, pills, cards, links) pra `ds/atoms/*.css`
- [x] Mover `.odex-select` e `.ds-menu` pra `ds/molecules/`
- [x] Root barrel `ds/index.css` linkado pelo `index.html`
- [ ] Auditar duplicações `.auth-input-wrap` vs `.ds-input` (Phase C)

### Phase C · Consolidação (em progresso)
- [x] **C.1 · Auth feature** — extraído pra `features/auth/auth.css` · removido `.auth-redefinir-*` dead code
- [x] **C.2 · Catálogo visual** — `ds/catalog.html` · todos atoms/molecules/tokens em todos estados
- [x] **C.3 · Semantic tokens** — primitive ↔ semantic split · atoms + molecules migrados pra `--color-*` semantic
- [x] **C.4 · Build pipeline** — `tokens.json → tokens.css` generator + `--check` mode · zero dependências · `npm run build-tokens` / `npm run check-tokens`
- [ ] **C.5 · Tokens faltantes** — reset, motion, z-index, breakpoint
- [ ] **C.6 · CSS @layer architecture** — cascade determinístico
- [ ] **C.7 · Component README** — doc por atom (when use/when not/a11y/examples)
- [ ] **C.8 · A11y audit** — contrast WCAG AA, focus visible, ARIA, keyboard nav
- [ ] **C.9 · Input-group molecule** — promove `.auth-input-wrap` → `.ds-input-group`
- [ ] **C.10+ · Demais features** — mk, ov, ped, ck, clientes, calculadora, ajuda, dashboard, topbar/sidebar

### Phase D · Figma DS espelho
- [ ] Importar tokens via Tokens Studio
- [ ] Criar component sets: Button, Input, Select, Field, Checkbox, Spark
- [ ] Variants conforme CSS variants

### Phase E · Code Connect
- [ ] `figma-code-connect` por componente
- [ ] CI valida sync

### Phase F · Lucide icon library
- [ ] Subset usado: ~30 ícones
- [ ] Component set "Icon" no Figma com all variants
- [ ] Code Connect: `<i data-lucide="user">` ↔ `Icon/user`

---

## Versionamento

| Versão | Phase | Data | Resumo |
|---|---|---|---|
| 0.1.0 | A | 2026-05-20 | Tokens extraídos pra `ds/tokens/` |
| 0.2.0 | B | 2026-05-20 | Atoms + molecules extraídos pra `ds/atoms/` e `ds/molecules/` |
| 0.3.0 | C.1 | 2026-05-20 | Auth feature extraído pra `features/auth/auth.css` · removido `.auth-redefinir-*` dead |
| 0.4.0 | C.2 | 2026-05-20 | Catálogo visual `ds/catalog.html` · todos atoms/molecules/tokens em todos estados |
| 0.5.0 | C.3 | 2026-05-20 | Semantic tokens (primitive ↔ semantic) · atoms + molecules migrados pra `--color-*` aliases por intenção |
| 0.6.0 | C.4 | 2026-05-20 | Build pipeline `tokens.json → tokens.css` (Node, zero deps) + `--check` mode CI · package.json com `npm run build-tokens` |

Breaking changes em tokens = major bump. Aditivos = minor. Fixes/docs = patch.
