# Odex · Plataforma Solar · Design System

> v0.39.0 · 2026-05-20 · Owner: Gabriel Felix Barbosa

📖 **[Catálogo visual](./catalog.html)** · abra no navegador pra ver todos atoms + molecules + tokens em todos estados.

📑 **Component docs** · ver "Component docs" abaixo · cada atom/molecule tem `.md` irmão.

♿ **[Accessibility (a11y.md)](./a11y.md)** · WCAG 2.1 AA audit · contrast ratios, focus visible, reduced motion, ARIA.

🔬 **[Divergence audit (Phase H prep)](./divergence-audit.md)** · master tracker de DUPES cross-feature + novos DS atoms/molecules a criar.

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
| **C · Componentes contextuais** | DS infra C.1-C.9 ✅ · 16 features extraídas ✅ · C.25 cleanup ✅ (legacy-compat + loja residue + home blocks) | ✅ Completo (C.1-C.25) |
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

## Component docs

Cada atom/molecule tem `.md` irmão documentando: quando usar / quando não / variants / states / a11y / examples.

### Base
- [reset](./base/reset.md) — foundational reset HTML

### Atoms
- [typography](./atoms/typography.md) — `.ds-h1..h3`, `.ds-p..`, `.ds-label`
- [buttons](./atoms/buttons.md) — `.ds-btn` + 7 variants + 2 sizes + pílulas especiais
- [icon-btn](./atoms/icon-btn.md) — `.ds-icon-btn` ⭐ Phase H.1 · 10x DUPES · 2 shapes × 4 sizes × 5 tones + dot/badge slots
- [links](./atoms/links.md) — `.ds-link` + size/color variants
- [inputs](./atoms/inputs.md) — `.ds-input`, `.ds-select`, `.ds-textarea`
- [fields](./atoms/fields.md) — `.ds-field`, `.ds-field-label`, `.ds-field-inline`
- [checkbox](./atoms/checkbox.md) — `.ds-check` (checkbox + radio)
- [pills](./atoms/pills.md) — `.ds-pill` + 6 status variants
- [cards](./atoms/cards.md) — `.ds-card` + variants
- [table-grid](./atoms/table-grid.md) — `.ds-table-grid` ⭐ Phase H.2 · 8x DUPES · CSS-grid table com custom cols + slots + cell utilities
- [icon-box](./atoms/icon-box.md) — `.ds-icon-box` ⭐ Phase H.3 · 14+ DUPES · container decorativo · 6 sizes × 3 shapes × 8 tones
- [overlay](./atoms/overlay.md) — `.ds-overlay` ⭐ Phase H.4 · 7 DUPES · backdrop modal/drawer · 4 tints × 4 blur × 4 z-intents
- [hero-gradient](./atoms/hero-gradient.md) — `.ds-hero-gradient` ⭐ Phase H.5 · 7 DUPES · brand gradient bg · 4 directions × 4 pad × 3 radius × decorated
- [kpi](./atoms/kpi.md) — `.ds-kpi` ⭐ Phase H.6 · 6 DUPES · stat card label+val+trend · 3 sizes × 2 tones × icon-right · grid container
- [empty-state](./atoms/empty-state.md) — `.ds-empty-state` ⭐ Phase H.7 · 10 DUPES · placeholder vazio · icon+title+desc+action · 4 sizes × inline
- [toolbar](./atoms/toolbar.md) — `.ds-toolbar` ⭐ Phase H.8 · 5 DUPES · listing header · search+filters+actions · 3 sizes × flush × sticky · search-icon auto-sized
- [section-head](./atoms/section-head.md) — `.ds-section-head` ⭐ Phase H.9 · 7+ DUPES · title+sub+action · 3 sizes × 3 style variants (eyebrow/bordered/baseline)
- [status-dot](./atoms/status-dot.md) — `.ds-status-dot` ⭐ Phase H.10 · 5 DUPES · indicador circular 6-10px · 4 sizes × 7 tones × 3 effects (glow/ring/pulse) + `.ds-dot-sep` separator

### Molecules
- [select](./molecules/select.md) — `.odex-select` (via `.ds-replace`)
- [menu](./molecules/menu.md) — `.ds-menu` (toolbar dropdown)
- [input-group](./molecules/input-group.md) — `.ds-input-group` (input + ícone + reveal)

### Features
- [auth](../features/auth/README.md) — Login + Cadastro + Redefinir senha
- [checkout](../features/checkout/README.md) — Cart drawer + Checkout page
- [orcamentos](../features/orcamentos/README.md) — Lista + Detail v1/v2 + Form novo + WhatsApp modal
- [pedidos](../features/pedidos/README.md) — Lista + Detail v2 + Modal Resumo
- [monte-kit](../features/monte-kit/README.md) — Kit builder multi-step (fotovoltaico/híbrido/BESS/eletroposto)
- [clientes](../features/clientes/README.md) — Lista + Detail + Modal busca + Modal novo cliente (3 steps)
- [calculadora](../features/calculadora/README.md) — Simulação payback solar + métricas + share PDF/WhatsApp
- [ajuda](../features/ajuda/README.md) — Central de ajuda + Artigos + Help FAB/Modal
- [dashboard](../features/dashboard/README.md) — Home · Hero + KPIs + Main grid + Carrosséis + Brand bar
- [premio-venda-direta](../features/premio-venda-direta/README.md) — Lista + Detalhe c/ status banner + upload NF + timeline
- [novidades](../features/novidades/README.md) — Drawer V5 + filtros + items + reactions + toast global
- [de-chat](../features/de-chat/README.md) — Mascote Dé + chat drawer assistente IA
- [notif](../features/notif/README.md) — Notif Panel legacy + Notif Drawer V2 lateral
- [admin](../features/admin/README.md) — Painel administrativo · hero + tabs + tables + banners CMS
- [loja](../features/loja/README.md) — PDP V2 (rich product page) + Hero carousel
- [chrome](../features/chrome/README.md) — App shell · Sidebar + Topbar + Shell container + User menu + body modifiers (.is-auth, .sb-collapsed)

### Accessibility
- [a11y.md](./a11y.md) — WCAG 2.1 AA audit completo · contrast, focus, motion, ARIA

## Cascade architecture (post Phase H.0)

> **2026-05-20 update:** features `@layer` wrapper REMOVIDO após visual regressions (commit `284df72d`). Arquitetura atual descrita abaixo é a **versão correta canônica**.

CSS usa camadas explícitas pra DS (atoms/molecules/legacy) · features ficam **unlayered** (mesmo comportamento pré-extração).

### Ordem de prioridade (high → low)

```
1. !important + inline styles            (browser default)
2. UNLAYERED rules                       (features/*.css + inline <style> em index.html)
                                          → roda por specificity + source order
3. @layer legacy                         (ds/legacy-compat.css · força r-form/r-card via !important)
4. @layer molecules                      (ds/molecules/select.css, menu.css, input-group.css)
5. @layer atoms                          (ds/atoms/* · .ds-btn, .ds-pill, .ds-icon-btn, etc)
6. @layer tokens                         (ds/tokens/tokens.css · :root vars)
7. @layer reset                          (ds/base/reset.css)
```

Declarado em `ds/index.css`:

```css
@layer reset, tokens, atoms, molecules, legacy, utilities;
```

(Note: `features` NÃO está mais nessa lista · features são unlayered.)

### Regras da cascade

- **UNLAYERED styles SEMPRE vencem layered** · feature CSS roda em "implicit topmost layer"
- **Layered styles** entre si seguem ordem declarada (legacy vence molecules vence atoms vence tokens vence reset)
- `!important` em layered pode bater unlayered (precedência reversa entre layers)
- Specificity é tie-breaker dentro da mesma layer/grupo

### Histórico · por que features não está mais em layer

**Fase C.10-C.24 (2026-05-20 manhã):** Cada feature extraído pra `features/<name>/<name>.css` foi wrapped em `@layer features { ... }`. Intenção: cascade determinístico (atoms < molecules < features < legacy).

**Problema descoberto:** `index.html` ainda tem ~9.7k linhas de CSS inline UNLAYERED (`.card`, `.input-group`, `.profile-*`, responsive @media de `.dash-kpis`, etc). Esses unlayered vencem ANY layered rule. Resultado: rules genéricas em index.html sobreescrevendo feature rules específicas, causando regressões visuais (loja, monte-kit, dashboard).

**Fix (commit `284df72d`):** Removido `@layer features { }` wrapper de todos os 16 feature CSS files. Features voltaram a ser unlayered (mesmo comportamento de cascade pre-extração).

**Trade-off aceito:**
- ✅ Visual parity com baseline pre-extração
- ✅ DS atoms/molecules permanecem em layers (features customizam normalmente)
- ✅ legacy-compat mantém override de radius/font-family via `!important`
- ❌ Ordem entre features dada por `<link>` tag order (não declarada via @layer)
- ❌ Adicionar feature nova: usuário precisa entender ordem de import no `<link>`

### Como declarar layer no CSS

**Via @import (DS barrels):**

```css
@import url('./atoms/index.css')   layer(atoms);
@import url('./legacy-compat.css'); /* self-declares @layer legacy */
```

**Via @layer block (DS-internal, ex: legacy-compat):**

```css
@layer legacy {
  .legacy-class { border-radius: var(--r-form) !important; }
}
```

**Features:** **NÃO** envolva em `@layer features { ... }`. Escreva CSS direto:

```css
/* features/auth/auth.css */
.auth-shell { ... }
@media (max-width: 600px) { .auth-shell { ... } }
```

### Phase H markup migration

Quando markup for migrado pra usar `.ds-*` atoms diretamente (sem feature CSS custom), DS layer priority volta a fazer sentido. Atoms ficam em `@layer atoms` · features que ainda existirem podem voltar pra `@layer features` quando NÃO houver mais unlayered CSS em index.html.

### Compat com unlayered CSS

`index.html` ainda tem ~140 linhas de CSS inline unlayered (`.card`, `.input-group`, `.profile-*`, responsive overrides). Conviver com features unlayered: cascade resolve por source order. Eventualmente extrair pra `features/<name>/`.

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
- [x] **C.5 · Tokens faltantes** — motion (duration + easing), z-index scale, breakpoint scale, base/reset.css (extraído de index.html)
- [x] **C.6 · CSS @layer architecture** — cascade determinístico · 7 layers (reset/tokens/atoms/molecules/features/legacy/utilities) · DS + auth wrapped
- [x] **C.7 · Component README** — `.md` doc irmão pra cada atom/molecule + base/reset + features/auth/README.md
- [x] **C.8 · A11y baseline** — `:focus-visible` em todos atoms+molecules+auth · `prefers-reduced-motion` · WCAG AA contrast (fix de 3 violations: danger-fg, success-fg, andamento-fg) · audit doc em [a11y.md](./a11y.md)
- [x] **C.8.1 · A11y keyboard nav** — `ds/molecules/select.js` (Listbox pattern: ↑↓/Home/End/Enter/Space/Esc/Tab/type-ahead + aria-selected + aria-activedescendant) · `ds/molecules/menu.js` (Menu pattern: ↑↓/Home/End/Enter/Space/Esc/Tab + aria roles auto)
- [x] **C.9 · Input-group molecule** — `.auth-input-wrap` paradigm promovido pra `.ds-input-group` (DS molecule reutilizável) · variant `-lg` 44h pra auth · todo markup auth migrado · auth.css limpo
- [x] **C.10 · Checkout feature** — `.cart-*` (drawer) + `.ckform-*`/`.cksummary-*`/`.ckitem-*`/`.ckprice-*`/CTAs/`.radio-opt`/`.premia-row` extraídos pra `features/checkout/checkout.css` · `@layer features` · -105 linhas em index.html
- [x] **C.11 · Orçamentos feature** — `.orc-*` (lista + detail v1) + `.ov-*` (form v2 + WhatsApp modal) + `.orc-doc-brandbar` extraídos pra `features/orcamentos/orcamentos.css` · `@layer features` · -201 linhas em index.html · README c/ **divergence audit** (Phase H prep)
- [x] **C.12 · Pedidos feature** — `.ped-*` (lista + detail v2) + `.ped-resumo-*` modal + `.resumo-*` sub-classes extraídos pra `features/pedidos/pedidos.css` · `@layer features` · -289 linhas em index.html · README c/ divergence audit (sugere `.ds-modal`/`.ds-toolbar`/`.ds-table-grid`/`.ds-kv-list` molecules na Phase H)
- [x] **C.13 · Monte Kit feature** — maior feature (.mk-* + .mk-v3-* · 413 decls) extraída pra `features/monte-kit/monte-kit.css` · multi-step wizard fotovoltaico/hibrido/bess/eletroposto · **-936 linhas** em index.html · README sugere `.ds-stepper`/`.ds-tabs`/`.ds-card-selectable`/`.ds-stepper-input`/`.ds-tips` molecules Phase H
- [x] **C.14 · Clientes feature** — `.clients-*` (lista) + `.client-*` (detail) + `.cliente-search-*` (modal busca) + `.nc-*` (modal novo cliente 3 steps) extraídos pra `features/clientes/clientes.css` · -150 linhas + orphan cleanup · README CONFIRMA cross-feature DUPES (toolbar 4x, table-grid 4x, stepper 3x, card-selectable 3x, form-grid 4x)
- [x] **C.15 · Calculadora feature** — `.calc-*` (form + métricas + share + loading + disclaimer) extraída pra `features/calculadora/calculadora.css` · -140 linhas · CONFIRMA 3 novos DS atoms (`.ds-kpi`, `.ds-progress`, `.ds-icon-btn` upgrade 2x→3x) · 2 sugeridos viraram confirmados (.ds-stepper-input, .ds-tips)
- [x] **C.16 · Ajuda feature** — `.help-modal-*` v1+v2 + `.ajuda-*` (hero + categorias + populares + FAQ + artigo) + `.artigo-*` + `.help-fab` extraídos pra `features/ajuda/ajuda.css` · -247 linhas · CONFIRMA 3 novos atoms (.ds-link-back 4x, .ds-icon-box 3x, .ds-hero-gradient 3x) · 3 novos sugeridos (.ds-accordion, .ds-fab, .ds-video-embed)
- [x] **C.17 · Dashboard feature** — `.dash-*` v1+v3 (KPIs + hero gradient + main grid + carrosséis + alerts + brand bar) + `.home-kpi-*` + `.kpi-{tone}` + `.quick-act-*` extraídos pra `features/dashboard/dashboard.css` · -336 linhas · UPGRADES audit: .ds-kpi 2x→4x · .ds-hero-gradient 3x→4x · .ds-icon-btn 4x→5x · .ds-icon-box 3x→5x · 3 sugeridos (.ds-btn-on-brand, .ds-card-link, .ds-section-head)
- [x] **C.18 · Prêmio Venda Direta feature** — `.pv-*` (detalhe + upload NF + status banner) + `.premio-*` (lista + pills + status) extraídos pra `features/premio-venda-direta/premio-venda-direta.css` · -188 linhas · UPGRADES: .ds-table-grid 5x · .ds-link-back 5x · .ds-kpi 5x · .ds-icon-box 6x · .ds-icon-btn 6x · .ds-alert 4x (com 5 tones) · `.ds-section-head` sobe pra CONFIRMED 3x · 3 sugeridos (.ds-dropzone, .ds-meta-strip, .ds-timeline)
- [x] **C.19 · Novidades feature** — `.novas-*` (drawer V5 · panel + cats nested + items + reactions + feedback + end-state) + `.odex-toast` global extraídos pra `features/novidades/novidades.css` · -290 linhas · UPGRADES: .ds-icon-btn 7x · 4 novos sugeridos (.ds-drawer 2x, .ds-toast, .ds-empty-state 4x, .ds-list-item-selectable)
- [x] **C.20 · Dé chat feature** — `.de-*` (mascote face pseudo-elements + chat drawer + mensagens + suggestions + cart inline) + `.help-modal-de*` (CTA bridge) extraídos pra `features/de-chat/de-chat.css` · -140 linhas · UPGRADES: .ds-icon-btn 8x · .ds-hero-gradient 5x · 3 sugeridos (.ds-chip 2x, .ds-chat-bubble, .ds-status-dot)
- [x] **C.21 · Notif feature** — `.notif-*` (panel legacy + item redesign + drawer V2 lateral 420w) extraídos pra `features/notif/notif.css` · -80 linhas · UPGRADES: .ds-overlay 6x · .ds-icon-box 7x · .ds-empty-state 5x · .ds-drawer CONFIRMED 3x · .ds-tab-pill CONFIRMED 2x · .ds-status-dot CONFIRMED 3x · 2 sugeridos (.ds-popover, .ds-badge-counter)
- [x] **C.22 · Admin feature** — `.admin-*` (hero + tabs + cards + tables + banners CMS + auditoria) extraídos pra `features/admin/admin.css` · -334 linhas · MAIORES UPGRADES: .ds-icon-btn 9x · .ds-table-grid 8x · .ds-kpi 6x · .ds-hero-gradient 6x · .ds-toolbar 5x · .ds-empty-state 6x · .ds-section-head 4x · 3 sugeridos SOBEM pra CONFIRMED (.ds-tabs 3x, .ds-card-link 2x, .ds-btn-on-brand 2x) · 2 novos (.ds-toggle, .ds-btn-ghost-sm)
- [x] **C.23 · Loja/Produto feature** — `.pdp-*` (PDP V2 rich) + `.hero-*` (carousel) extraídos pra `features/loja/loja.css` · -298 linhas · UPGRADES: .ds-status-dot 4x · .ds-stepper-input CONFIRMED 3x · .ds-tabs 4x · .ds-kv-list 3x · .ds-btn-on-brand 3x · 2 novos (.ds-carousel, .ds-rating) · Loja CSS scattered, restantes (product/store/toolbar/search/filter-chip/qty-stepper/etc) ficam pra C.25 cleanup
- [x] **C.24 · Chrome (app shell) feature** — `.sidebar*` + `.topbar*` + `.shell*` + `.user-menu*` + body modifiers (`.is-auth`, `.sb-collapsed`) extraídos pra `features/chrome/chrome.css` · -157 linhas · UPGRADE forte: **.ds-icon-btn 9x → 10x** (pico do DS · justifica icon-btn como atom #1 prioritário) · 3 novos sugeridos: .ds-notif-dot, .ds-nav-link, .ds-divider --vertical · layout primitives candidatos: .ds-app-sidebar + .ds-app-topbar (não atom, layout)
- [x] **C.25 · Misc/cleanup** — 3 sub-phases concluídas: **C.25a** legacy compat block (155 linhas force-radius/font-family) extraído pra `ds/legacy-compat.css` (`@layer legacy` self-declared, importado via `ds/index.css`) · **C.25b** loja residue (280+ linhas: store v1/v2, product-card, filter-chip, qty-stepper, price-slider, cart-overlay, list-view, empty-state, search) anexado em `features/loja/loja.css` · **C.25c** home content blocks (365 linhas: home-kpis, home-perks, home-showcase, home-categories grid/pills, home-products-grid, home-recent rails) anexado em `features/dashboard/dashboard.css` · NO new atoms confirmed (cleanup-only) · DUPES adicionais: `.home-prod-card` ↔ `.product-card` 3+ variantes, `.home-section-head` 5x · total -921 linhas index.html (10589 → 9668)
- [x] **Phase C COMPLETO** — DS infra (C.1-C.9) + 16 features (C.10-C.24) + cleanup (C.25). 

### Phase H · Consolidação DS adoption (em progresso)

Criar atoms confirmados (≥2x DUPES) em `ds/`, com docs + catalog + opcional migration. Sequência por DUPE-count desc:

- [x] **H.1 · `.ds-icon-btn`** (10x DUPES · TOP) — Atom criado em `ds/atoms/icon-btn.{css,md}` · 2 shapes (square/circle) × 4 sizes (sm 28/md 34/lg 40/xl 48) × 5 tones (default/ghost/soft/glass/danger) + slots `.ds-icon-btn-dot` (red 8×8 anchored) e `.ds-icon-btn-badge` (counter) · barrel index.css atualizado · catalog section adicionada com 4 sub-componentes (shapes, sizes, tones, slots) · migration map em icon-btn.md mapeando 10 origins → ds replacements
- [x] **H.2 · `.ds-table-grid`** (8x DUPES) — Atom criado em `ds/atoms/table-grid.{css,md}` · CSS grid table (head + clickable rows) com colunas customizáveis via `--ds-table-cols` · slot `.ds-table-grid-row-arrow` (chevron) · 4 cell utilities (mono/strong/num/meta) · `.ds-table-grid-dense` variant + `.ds-table-grid-empty` placeholder · catalog com 3 sub-componentes (default/with-arrow/dense+empty) · migration map mapeando 9 origins (clients-tbl-head/row, orc-tbl-head/row, ped-tbl-head/row, admin-novidade-row, admin-artigo-row, client-row-arrow → ds-table-grid-row-arrow slot)
- [x] **H.3 · `.ds-icon-box`** (7x audit · **14+ na real inspection**) — Atom criado em `ds/atoms/icon-box.{css,md}` · container decorativo (não-clicável · sibling de `.ds-icon-btn`) · 6 sizes (xs 28 → xxl 54) × 3 shapes (square/rounded 10/circle) × 8 tones (default/brand/success/warning/danger/navy/glass/white) · CSS custom props pra inner icon auto-size · catalog 3 sub-componentes · migration map cobre 14 origins (notif-icon, notif-drawer-icon, notif-drawer-empty-icon, ajuda-cat-icon, dash-kpi-icon, dash-hero-quick-ico, dash-hero-brand-logo, dash-activity-icon, dash-info-pill-icon, quick-act-icon, home-perk-icon, home-cat-icon, home-recent-head-icon, client-av)
- [x] **H.4 · `.ds-overlay`** (7 DUPES · audit dizia 6x) — Atom criado em `ds/atoms/overlay.{css,md}` · 4 tint variants (soft/medium/strong/chat/gray) × 4 blur intensities (sm 2px/md 4px/lg 8px/none) × 4 z-intent classes (dropdown/sticky/overlay/popover) · semantic tokens (`--color-overlay-navy-*`, `--color-overlay-dark`, `--color-overlay-gray`) · catalog 3 sub-componentes (tints/blur/z-intent) · migration map cobre 7 origins (modal-overlay, cart-overlay, notif-drawer-overlay, novas-overlay, ped-resumo-overlay, de-chat-mask, help-modal-mask)
- [x] **H.5 · `.ds-hero-gradient`** (7 DUPES · audit dizia 6x) — Atom criado em `ds/atoms/hero-gradient.{css,md}` · 4 gradient directions (3stop/2stop/horizontal/radial) × 4 padding presets (sm/md/lg/xl) × 3 radius presets (default/lg/xl) · `.ds-hero-gradient-decorated` opt-in pra 2 radial blobs decorativos (dash-hero pattern) · text helpers auto (h1/h2/h3 white · p rgba .7 · `.ds-hero-gradient-eyebrow` uppercase) · tokens consumidos (`--navy`, `--blue-button`, `--blue`, `--color-text-on-brand`, `--color-glass-white-medium`) · catalog 3 sub-componentes · migration map cobre 7 origins (dash-hero, auth-brand, ajuda-hero, admin-hero — hardcoded #0d1d52/#1e2f6e → tokens, de-chat-head, help-modal-head, loja hero)
- [x] **H.6 · `.ds-kpi`** (6 DUPES) — Atom criado em `ds/atoms/kpi.{css,md}` · label uppercase + valor grande + trend pill (.is-up/.is-down/.is-neutral) + sub opcional + icon slot opcional · 3 sizes (sm 14/16 val 20 / md 20/22 val 28 default / lg 24/26 val 32) × 2 tones (default white / glass over brand) × icon-right layout + clickable hover · `.ds-kpi-grid` container responsive (custom `--ds-kpi-cols`) · **7 novos tokens glass** (`--color-glass-text-muted/-soft/-strong`, `-success-bg/-fg`, `-error-bg/-fg`) consumidos. Catalog 4 sub-componentes (default+grid/sizes/icon-right/glass). Migration map cobre 6 origins (dash-kpi v1+v3, home-kpi glass, client-kpi, calc-metric + grids associados)
- [x] **H.7 · `.ds-empty-state`** (10 DUPES · audit dizia 6x) — Atom criado em `ds/atoms/empty-state.{css,md}` · vertical stack centralizado (icon + title + desc + action) · 4 sizes (sm 32/18 · md 48/24 · default 60/24 · lg 72/32) + inline horizontal layout · semantic tokens (`--color-text-muted/default`) · catalog 2 sub-componentes (default+sizes / inline) · migration map cobre 14 origins (cart-empty, notif-drawer-empty, ov-items-empty, premio-empty, admin-artigo-empty, admin-banner-empty, client-tabs-empty, cliente-search-empty, ajuda-cat-empty, novas-empty, empty-state geral + slots de icon/title/desc/action)
- [x] **H.8 · `.ds-toolbar`** (5 DUPES) — Atom criado em `ds/atoms/toolbar.{css,md}` · card container · slots `.ds-toolbar-search` (com auto-sized lucide search icon via `!important`) + `.ds-toolbar-filters` + `.ds-toolbar-actions` (margin-left auto) + `.ds-toolbar-spacer` · 3 sizes (sm 36h · md 42h default · lg 46h) × 2 modes (`.ds-toolbar-flush` · `.ds-toolbar-sticky`) · catalog 3 sub-componentes · migration map cobre 5 origins. **BONUS · fix universal:** mesmo padrão `svg.{class}` + `!important` aplicado em `ds/molecules/input-group.css` (`.ds-input-group-icon` + `.ds-input-group-icon-right`) — corrige icon-overlap em auth login/reset e qualquer form com ícone usando essa molecule. **Root cause documentado**: lucide.createIcons() substitui `<i data-lucide>` por `<svg width="24" height="24">` · sem `!important` no CSS, SVG width attribute vence em alguns browsers. Fix aplicado também em 5 features (clientes/pedidos/orcamentos/ajuda/calculadora) em commit `8e07d6da`.
- [x] **H.9 · `.ds-section-head`** (7+ DUPES · audit dizia 5x) — Atom criado em `ds/atoms/section-head.{css,md}` · spacing-only (sem bg/border · drop-in pra qualquer container) · slots `.ds-section-head-info` (title+sub stack) + `.ds-section-head-title` (com icon inline) + `.ds-section-head-sub` + `.ds-section-head-action` (link/button à direita) · 3 sizes (sm 14 · default 18 · lg 22) × 3 style variants (`.ds-section-head-eyebrow` uppercase 11 muted · `.ds-section-head-bordered` border-bottom · `.ds-section-head-baseline` align baseline) · catalog 3 sub-componentes · migration map cobre 14 origins (home-section-head + title/sub/link, section-header + h3/p, btn-link, admin-section-head, ajuda-section-head, ov-section-head, orc-section-head, pv-section-head, catalog-head, catalog-header)
- [x] **H.10 · `.ds-status-dot`** (5 DUPES + separator family) — Atom criado em `ds/atoms/status-dot.{css,md}` · indicador circular pequeno · 4 sizes (xs 6 · sm 7 · md 8 default · lg 10) × 7 tones (info/brand · success/online · warning/pending · danger/error · muted/offline · navy) × 3 effects (`.ds-status-dot-glow` outer shadow tinted · `.ds-status-dot-ring` 3px halo via `--color-tint-blue-strong` · `.ds-status-dot-pulse` animated keyframes com prefers-reduced-motion fallback) · `.ds-dot-sep` separator variant (3px muted inline) · catalog 4 sub-componentes · migration map cobre 8 origins (de-chat-status-dot, notif-dot, notif-drawer-dot, pdp-stock-dot + 4 separator variants)
- [ ] H.11-H.20 — resto dos 23 atoms confirmados (audit completo em divergence-audit.md)
- [ ] **H.21+ · Markup migration** — substituir uses por DS classes em features, deletar dupes
- [ ] **Phase H · Consolidação DS adoption** — automated audit script + cluster review + markup migration · gather divergence audits dos READMEs features

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
| 0.7.0 | C.5 | 2026-05-20 | Motion tokens (5 durations + 5 easings) · Z-index scale (9 layers) · Breakpoint scale (5 sizes) · `ds/base/reset.css` extraído de index.html |
| 0.8.0 | C.6 | 2026-05-20 | CSS `@layer` architecture · 7 camadas (reset/tokens/atoms/molecules/features/legacy/utilities) · cascade determinístico |
| 0.9.0 | C.7 | 2026-05-20 | Component docs · `.md` irmão pra cada atom/molecule (12 arquivos) + features/auth/README.md |
| 0.10.0 | C.8 | 2026-05-20 | A11y baseline · `:focus-visible` em todos elementos · `prefers-reduced-motion` · WCAG AA contrast audit + 3 fixes (danger-fg/success-fg/andamento-fg) · `ds/a11y.md` |
| 0.11.0 | C.8.1 | 2026-05-20 | A11y keyboard nav · `ds/molecules/select.js` (Listbox WAI-ARIA: ↑↓/Home/End/Enter/Space/Esc/Tab/type-ahead) · `ds/molecules/menu.js` (Menu WAI-ARIA) · inline JS extraído de index.html + catalog.html |
| 0.12.0 | C.9 | 2026-05-20 | Input-group molecule · `.auth-input-wrap` promovido pra `.ds-input-group` (DS reutilizável) · variant `-lg` pra auth · `:has()` selector pra padding-left auto · markup migrado |
| 0.13.0 | C.10 | 2026-05-20 | Checkout feature extraído pra `features/checkout/checkout.css` · cart drawer + checkout page · -105 linhas em index.html · `@layer features` |
| 0.14.0 | C.11 | 2026-05-20 | Orçamentos feature extraído pra `features/orcamentos/orcamentos.css` · lista + detail v1/v2 + WhatsApp modal · -201 linhas em index.html · README inclui divergence audit (Phase H prep) |
| 0.15.0 | C.12 | 2026-05-20 | Pedidos feature extraído pra `features/pedidos/pedidos.css` · lista + detail v2 + modal resumo + .resumo-* sub-classes · -289 linhas em index.html · divergence audit sugere `.ds-modal`/`.ds-toolbar`/`.ds-table-grid`/`.ds-kv-list` molecules |
| 0.16.0 | C.13 | 2026-05-20 | Monte Kit feature (MAIOR · 413 decls) extraída pra `features/monte-kit/monte-kit.css` · multi-step wizard fotovoltaico/hibrido/BESS/eletroposto · -936 linhas em index.html · divergence audit sugere `.ds-stepper`/`.ds-tabs`/`.ds-card-selectable`/`.ds-stepper-input`/`.ds-tips` molecules |
| 0.17.0 | C.14 | 2026-05-20 | Clientes feature extraído pra `features/clientes/clientes.css` · lista + detail + busca + novo cliente 3 steps · -150 linhas + orphan brace/comment cleanup · audit CONFIRMA cross-feature DUPES (toolbar 4x · table-grid 4x · stepper 3x · card-selectable 3x · form-grid 4x) |
| 0.18.0 | C.15 | 2026-05-20 | Calculadora feature extraída pra `features/calculadora/calculadora.css` · form + KPIs + share + loading · -140 linhas · divergence audit confirma `.ds-kpi`/`.ds-progress` 2x + `.ds-icon-btn` upgrade 3x + sobe `.ds-stepper-input`/`.ds-tips` pra confirmado |
| 0.19.0 | C.16 | 2026-05-20 | Ajuda feature extraída pra `features/ajuda/ajuda.css` · central + artigos + help FAB/modal v1+v2 · -247 linhas · 3 novos atoms confirmados (.ds-link-back 4x, .ds-icon-box 3x, .ds-hero-gradient 3x) + 3 sugeridos (.ds-accordion, .ds-fab, .ds-video-embed) |
| 0.20.0 | C.17 | 2026-05-20 | Dashboard feature extraída pra `features/dashboard/dashboard.css` · 4 blocos (v1 KPIs + v3 hero + main grid + brand bar) · -336 linhas · UPGRADES: .ds-kpi 4x · .ds-hero-gradient 4x · .ds-icon-btn 5x · .ds-icon-box 5x + 3 sugeridos (.ds-btn-on-brand, .ds-card-link, .ds-section-head) |
| 0.21.0 | C.18 | 2026-05-20 | PV feature extraída pra `features/premio-venda-direta/premio-venda-direta.css` · lista + detalhe + upload NF + 5 status banner tones · -188 linhas · UPGRADES: ds-table-grid 5x · ds-link-back 5x · ds-kpi 5x · ds-icon-box 6x · ds-icon-btn 6x · ds-alert 4x · ds-section-head sobe CONFIRMED · 3 sugeridos (.ds-dropzone, .ds-meta-strip, .ds-timeline) |
| 0.22.0 | C.19 | 2026-05-20 | Novidades feature extraída pra `features/novidades/novidades.css` · drawer V5 560w + cats nested + items + reactions + feedback + odex-toast global · -290 linhas · UPGRADES: ds-icon-btn 7x · 4 sugeridos (.ds-drawer 2x, .ds-toast, .ds-empty-state 4x, .ds-list-item-selectable) |
| 0.23.0 | C.20 | 2026-05-20 | Dé chat feature extraída pra `features/de-chat/de-chat.css` · mascote face SVG-like + chat drawer + mensagens + suggestions + cart inline + help-modal-de CTA bridge · -140 linhas · UPGRADES: ds-icon-btn 8x · ds-hero-gradient 5x · ds-overlay 5x · 3 sugeridos (.ds-chip 2x, .ds-chat-bubble, .ds-status-dot) |
| 0.24.0 | C.21 | 2026-05-20 | Notif feature extraída pra `features/notif/notif.css` · panel legacy + item redesign + drawer V2 lateral 420w · -80 linhas · UPGRADES: ds-overlay 6x · ds-icon-box 7x · ds-empty-state 5x · ds-drawer CONFIRMED 3x · ds-tab-pill CONFIRMED 2x · ds-status-dot CONFIRMED 3x · 2 sugeridos (.ds-popover, .ds-badge-counter) |
| 0.25.0 | C.22 | 2026-05-20 | Admin feature extraída pra `features/admin/admin.css` · hero + tabs + 5 cards + 3 tables + banners CMS + auditoria · -334 linhas · MAIORES UPGRADES até agora: ds-icon-btn 9x · ds-table-grid 8x · ds-kpi 6x · ds-hero-gradient 6x · ds-toolbar 5x · ds-empty-state 6x · ds-section-head 4x · 3 sugeridos viram CONFIRMED (.ds-tabs, .ds-card-link, .ds-btn-on-brand) · 2 novos (.ds-toggle, .ds-btn-ghost-sm) |
| 0.26.0 | C.23 | 2026-05-20 | Loja/Produto feature extraída (PDP V2 + Hero Carousel) pra `features/loja/loja.css` · -298 linhas · UPGRADES: ds-status-dot 4x · ds-stepper-input CONFIRMED 3x · ds-tabs 4x · ds-kv-list 3x · ds-btn-on-brand 3x · 2 novos (.ds-carousel, .ds-rating) · resto da loja (product/store/filter/qty-stepper) fica pra C.25 cleanup |
| 0.27.0 | C.24 | 2026-05-20 | **Chrome (app shell) feature extraída** pra `features/chrome/chrome.css` (sidebar + topbar + shell + user-menu + body modifiers) · -157 linhas · **MAIOR upgrade do DS: .ds-icon-btn 9x→10x** (pico absoluto · justifica icon-btn como atom #1 prioritário pra Phase H) · 3 novos sugeridos: `.ds-notif-dot` (red 8×8 anchored), `.ds-nav-link` (vertical sidebar nav atom), `.ds-divider --vertical` (extender existing) · layout primitives candidatos: `.ds-app-sidebar` + `.ds-app-topbar` (não atom · shell layout) · index.html: 10589 → 10432 linhas |
| 0.28.0 | C.25 | 2026-05-20 | **Phase C COMPLETO · cleanup sweep final em 3 sub-phases**: C.25a legacy compat (155 linhas force-radius/font-family) → `ds/legacy-compat.css` (`@layer legacy` self-declared, importado via `ds/index.css`) · C.25b loja residue (280+ linhas: store v1/v2, product-card, filter-chip, qty-stepper, price-slider, cart-overlay, list-view, empty-state, search) anexado em `features/loja/loja.css` · C.25c home content (365 linhas: home-kpis, home-perks, home-showcase, home-categories grid/pills, home-products-grid, home-recent rails) anexado em `features/dashboard/dashboard.css` · NO new atoms confirmed (cleanup-only) · DUPES adicionais pra Phase H: `.home-prod-card` ↔ `.product-card` 3+ variantes, `.home-section-head` 5x · index.html: 10432 → 9668 linhas (-764 nesta phase · -35% acumulado desde C.10 inicial 14901) |
| 0.29.0 | H.1 | 2026-05-20 | **Phase H BEGAN · 1º atom criado** · `.ds-icon-btn` (10x DUPES · maior do audit) em `ds/atoms/icon-btn.{css,md}` · 2 shapes (square/circle) × 4 sizes (sm 28/md 34/lg 40/xl 48) × 5 tones (default/ghost/soft/glass/danger) + slots `.ds-icon-btn-dot` (red 8×8) e `.ds-icon-btn-badge` (counter) · semantic tokens (`--color-surface-*`, `--color-text-*`, `--color-feedback-error-strong`, `--shadow-focus-blue`) · barrel `ds/atoms/index.css` atualizado · catalog section com 4 sub-componentes (shapes/sizes/tones/slots) + nav anchor · doc tem migration map de 10 origins (icon-btn v1+v2, modal-close, cart-close, help-modal-close, sidebar-toggle, profile-copy, profile-cover-edit, dash-hero-brand-edit, notif-close) → DS replacements · markup migration pendente (Phase H.21+) |
| 0.30.0 | H.2 | 2026-05-20 | **`.ds-table-grid` atom criado** (8x DUPES · 2º maior) em `ds/atoms/table-grid.{css,md}` · CSS-grid table (head + clickable rows) com colunas via custom prop `--ds-table-cols` (não usa @media · adaptável por consumer) · slot `.ds-table-grid-row-arrow` (chevron 26 circle · DUPE com client-row-arrow) · 4 cell utilities (mono SKU/strong primary/num tabular/meta secondary) · variants `.ds-table-grid-dense` + placeholder `.ds-table-grid-empty` · semantic tokens (--color-surface-card/sunken/page, --color-border-default, --color-border-focus, --color-text-muted/default, --color-action-primary-bg) · catalog 3 sub-componentes (default/with-arrow/dense+empty) · migration map cobre 9 origins (clients/orc/ped tbl-head/row + admin-novidade-row + admin-artigo-row + client-row-arrow slot) |
| 0.31.0 | H.3 | 2026-05-20 | **`.ds-icon-box` atom criado** (audit dizia 7x · inspection revelou **14+ DUPES** · maior cluster do DS) em `ds/atoms/icon-box.{css,md}` · container **decorativo** (não-clicável · sibling de `.ds-icon-btn` interativo) · 6 sizes via custom prop `--ds-icon-box-size` (xs 28/sm 32/md 36 default/lg 40/xl 48/xxl 54) com `--ds-icon-box-inner` auto pra svg/i · 3 shapes (square 4r/rounded 10r/circle 50%) · 8 tones (default/brand/success/warning/danger/navy/glass/white) · catalog 3 sub-componentes (sizes/shapes/tones) · migration map cobre 14 origins (notif-icon, notif-drawer-icon, notif-drawer-empty-icon, ajuda-cat-icon, dash-kpi-icon, dash-hero-quick-ico, dash-hero-brand-logo, dash-activity-icon, dash-info-pill-icon, quick-act-icon, home-perk-icon, home-cat-icon, home-recent-head-icon, client-av) |
| 0.32.0 | H.0 fixes | 2026-05-20 | **ARCHITECTURE PIVOT (fix de regressões visuais)** · após user reportar telas quebradas (loja/monte-kit/dashboard), análise programática vs commit ref `b4f18c80` (12/05) identificou 4 categorias de bug: **(1)** 4 feature CSS files com `@media` blocks abertos sem fechar (loja/admin/orc/ped · regras seguintes silenciosamente nested). **(2)** Cart drawer perdeu position:fixed + slide-in transform + overlay. **(3)** Hero responsive movido de 720px → 640px wrongly em C.25b. **(4)** ROOT CAUSE estrutural: `@layer features` wrapper nas extrações C.10-C.24 rebaixava feature rules vs unlayered `<style>` em index.html · cascade quebrada. **Fixes aplicados:** brace closure (commit `bcc77112`) · cart restore + hero breakpoint (`44e2f75c`) · **REMOVED `@layer features` wrapper de TODOS os 16 feature CSS files** (`284df72d` · features voltam unlayered = parity pre-extração) · svg.{class} qualifier + !important em 5 search-icon rules pra forçar size sobre lucide SVG attribute (`8e07d6da`). Documentação `ds/index.css` + `ds/README.md` cascade section atualizadas pra refletir arquitetura corrente (features unlayered · atoms/molecules/legacy em @layer). Esta é a **versão canônica** · Phase H atoms criados (H.1-H.3) seguem essa arquitetura. |
| 0.39.0 | H.10 | 2026-05-20 | **`.ds-status-dot` atom criado** (5 DUPES + separator family) em `ds/atoms/status-dot.{css,md}` · 4 sizes × 7 tones × 3 effects (glow/ring/pulse com prefers-reduced-motion) · `.ds-dot-sep` separator variant (3px muted inline) · semantic tokens · catalog 4 sub-componentes · migration map cobre 8 origins (de-chat-status-dot, notif-dot, notif-drawer-dot, pdp-stock-dot, home-recent-dot, artigo-meta-dot, ajuda-popular-row-dot, dash-carousel-dot). Progress: 10/23 atoms done. |
| 0.38.0 | H.9 + emoji purge | 2026-05-20 | **`.ds-section-head` atom criado** (7+ DUPES · audit dizia 5x) em `ds/atoms/section-head.{css,md}` · spacing-only · slots info+title+sub+action · 3 sizes × 3 style variants (eyebrow/bordered/baseline) · catalog 3 sub-componentes. **EMOJI PURGE GLOBAL:** rule firmado · UI usa LUCIDE icons exclusivamente · único emoji permitido é `👋` (saudação "Boa tarde, Gabriel"). Catalog limpo: 🔔🛒🔍📦📭⚡📋♿🔬⚙✎✓📑 + placeholders ascii (★▢·×→›▲▼) substituídos por `<i data-lucide>` correspondentes. Index.html limpo: de-chat suggestions (🔆🧰🔋📝) + novidades reactions (👏❤😢) + ✨ intro + ➕ recommendation + ✓ ncStep · todos viraram `<i data-lucide>` com correspondentes (sun/wrench/battery-charging/file-text · thumbs-up/heart/frown · plus · check). |
| 0.37.0 | H.8 + input-group fix | 2026-05-20 | **`.ds-toolbar` atom criado** (5 DUPES) em `ds/atoms/toolbar.{css,md}` · card container · slots search/filters/actions/spacer · 3 sizes × 2 modes (flush/sticky) · search-icon auto-sized via `!important` (fix universal). **BONUS:** `.ds-input-group-icon` + `.ds-input-group-icon-right` em `ds/molecules/input-group.css` ganharam `svg.{class}` qualifier + `!important` sizing — **corrige icon-overlap em auth login/reset e em qualquer form usando essa molecule**. Root cause: lucide.createIcons() substitui `<i>` por `<svg width="24" height="24">` que vence CSS width sem `!important`. Aplicado anteriormente em 5 features (`8e07d6da`) · agora canonicalizado no DS molecule. Padding-left aumentado de 42 → 44px pra margem extra. Catalog ganhou seção #toolbar com 3 sub-componentes. |
| 0.36.0 | H.7 | 2026-05-20 | **`.ds-empty-state` atom criado** (10 DUPES · audit dizia 6x) em `ds/atoms/empty-state.{css,md}` · vertical stack: icon-slot + title + desc + action · 4 sizes (sm 32/18 · md 48/24 · default 60/24 · lg 72/32) + `.ds-empty-state-inline` horizontal layout · semantic tokens · catalog 2 sub-componentes · migration map cobre 14 origins (cart-empty, notif-drawer-empty, ov-items-empty, premio-empty, admin-artigo-empty, admin-banner-empty, client-tabs-empty, cliente-search-empty, ajuda-cat-empty, novas-empty). |
| 0.35.0 | H.6 | 2026-05-20 | **`.ds-kpi` atom criado** (6 DUPES) em `ds/atoms/kpi.{css,md}` · 3 sizes (sm/md/lg) × 2 tones (default white / glass) × icon-right layout (compose com `.ds-icon-box`) + `.ds-kpi-trend.is-{up,down,neutral}` pills + `.ds-kpi-clickable` hover + `.ds-kpi-grid` container responsive (`--ds-kpi-cols` custom prop). **7 novos tokens glass** adicionados em tokens.json (`--color-glass-text-{muted,soft,strong}`, `--color-glass-{success,error}-{bg,fg}`) · 220 tokens total · zero hardcoded rgba em atoms/molecules confirmado. Hero-gradient.css refactored pra consumir `--color-glass-text-strong` + `--color-tint-blue-strong` (era hardcoded). Catalog 4 sub-componentes. Migration map cobre 6 origins (dash-kpi v1+v3, home-kpi, client-kpi, calc-metric). |
| 0.34.0 | H.5 | 2026-05-20 | **`.ds-hero-gradient` atom criado** (7 DUPES) em `ds/atoms/hero-gradient.{css,md}` · 4 gradient directions × 4 pad presets × 3 radius presets × decorated opt-in · text helpers auto (h1-h3 white · p .7 · `.ds-hero-gradient-eyebrow`) · semantic tokens (navy/blue-button/blue/text-on-brand/glass-white-medium) · catalog 3 sub-componentes · migration map cobre 7 origins (dash-hero, auth-brand, ajuda-hero, admin-hero ⚠ migra hardcoded #0d1d52/#1e2f6e pra tokens, de-chat-head, help-modal-head, loja hero) |
| 0.33.0 | H.4 + tokenization sweep | 2026-05-20 | **`.ds-overlay` atom criado** (7 DUPES) em `ds/atoms/overlay.{css,md}` · 4 tints × 4 blur × 4 z-intent. **TOKENIZATION COMPLETA:** auditoria identificou 16 hardcoded `rgba(...)` em atoms/molecules · 100% migrados pra semantic tokens. **18 novos tokens** adicionados em `tokens.json` + build-tokens.js extended: `--color-overlay-{navy-soft/medium/strong/deep,dark,gray}` (6 backdrop tints) · `--color-glass-white-{light/medium/strong/hover}` + `--color-glass-border{,-strong}` (6 glass effects sobre brand) · `--color-tint-{blue-soft/medium/strong/shadow,warning-glow,navy-glow}` (6 hover/focus subtle bgs) · `--shadow-dropdown` + `--shadow-popover` (2 semantic shadows usados em menu/select molecules). Tokens consumidos em: overlay.css (4 tint variants), icon-btn.css (glass tone), icon-box.css (glass tone), table-grid.css (row hover), buttons.css (pill-warm/cool shadows), menu.css (dropdown shadow), select.css (popover shadow). Build pipeline: 209 tokens · 209 CSS vars · zero hardcoded rgba em atoms/molecules. Catalog overlay section 3 sub-componentes (tints/blur/z) + nav anchor. |

Breaking changes em tokens = major bump. Aditivos = minor. Fixes/docs = patch.
