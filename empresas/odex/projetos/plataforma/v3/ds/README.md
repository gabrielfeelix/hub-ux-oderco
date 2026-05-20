# Odex · Plataforma Solar · Design System

> v0.24.0 · 2026-05-20 · Owner: Gabriel Felix Barbosa

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
| **C · Componentes contextuais** | DS infra C.1-C.9 ✅ · Features: auth, checkout, orc, ped, mk, clientes, calc, ajuda, dash, pv, novidades, de-chat, notif ✅. Próximo: admin, loja, chrome | 🟡 Em progresso (C.1-C.21 ✅) |
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
- [links](./atoms/links.md) — `.ds-link` + size/color variants
- [inputs](./atoms/inputs.md) — `.ds-input`, `.ds-select`, `.ds-textarea`
- [fields](./atoms/fields.md) — `.ds-field`, `.ds-field-label`, `.ds-field-inline`
- [checkbox](./atoms/checkbox.md) — `.ds-check` (checkbox + radio)
- [pills](./atoms/pills.md) — `.ds-pill` + 6 status variants
- [cards](./atoms/cards.md) — `.ds-card` + variants

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

### Accessibility
- [a11y.md](./a11y.md) — WCAG 2.1 AA audit completo · contrast, focus, motion, ARIA

## Cascade architecture (`@layer`)

CSS hoje usa **camadas explícitas de cascade** via `@layer`. Elimina specificity wars e torna ordem de override determinística.

### Ordem das layers (lowest → highest priority)

```
1. reset       · base HTML element resets (ds/base/reset.css)
2. tokens      · :root CSS variables (ds/tokens/tokens.css)
3. atoms       · .ds-* atomic classes (ds/atoms/*)
4. molecules   · .odex-select, .ds-menu (ds/molecules/*)
5. features    · .auth-*, .mk-* etc (features/<name>/*)
6. legacy      · compat overrides pra classes pré-DS
7. utilities   · .text-center, .mt-4 etc (futuro · top priority)
```

Declarado em `ds/index.css`:

```css
@layer reset, tokens, atoms, molecules, features, legacy, utilities;
```

### Regras da cascade

- **Layered styles** obedecem ordem acima (utilities ganha de legacy ganha de features ganha de molecules etc)
- **Unlayered styles** (sem `@layer`) **sempre vencem** layered · forma um "implicit topmost layer"
- **Inline styles** (`style="..."`) e **`!important`** continuam acima de tudo
- Specificity vira tie-breaker DENTRO da mesma layer

### Como declarar layer no CSS

**Via @import (preferido em barrels):**

```css
@import url('./atoms/index.css') layer(atoms);
```
A folha importada (e seus nested @imports) ficam todas em `atoms` layer.

**Via @layer block (preferido em feature CSS):**

```css
@layer features {
  .auth-shell { ... }
  @media (max-width: 600px) { .auth-shell { ... } }
}
```

### Por que isso importa

| Antes (sem layers) | Depois (com layers) |
|---|---|
| Override de feature precisa de specificity maior | Layer order ganha · sem `!important` |
| Conflito atomic ↔ feature imprevisível | Determinístico · feature sempre vence atomic |
| `!important` em legacy compat | Layer `legacy` controla precedência |
| Ordem de `<link>` importa | Ordem **declarada** importa |

### Compat com unlayered CSS

`index.html` ainda tem ~14k linhas de feature CSS unlayered (extraída fase C.10+). Esses estilos atualmente VENCEM as layers do DS · que é OK porque feature CSS tem o direito de override. Quando feature for extraído pra `features/<name>/`, ganha `@layer features` e participa da cascade ordenada.

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
- [ ] **C.22+ · Demais features** — admin, loja/produto, chrome (topbar/sidebar)
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

Breaking changes em tokens = major bump. Aditivos = minor. Fixes/docs = patch.
