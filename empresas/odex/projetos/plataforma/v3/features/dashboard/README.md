# Feature · Dashboard (Home)

> Source: [`dashboard.css`](./dashboard.css)
> Tela: `#dashboard` (home da plataforma)
> Layer: `@layer features`

## Propósito

Tela inicial da plataforma · hero gradient com saudação + KPIs do mês + main grid com chart de orçamentos + carrosséis de produtos featured + avisos finais + brand bar (logo do integrador no hero).

## Componentes principais

### Dash V1 (legacy KPIs)
- `.dash-kpis` (grid 4-col)
- `.dash-kpi` (card padding 24, hover lift)
- `.dash-kpi-icon` (48 color square)
- `.kpi-blue/-green/-amber/-purple` (color variants)
- `.dash-kpi-value` (28 bold) / `.dash-kpi h4` (label) / `.dash-kpi-trend`
- `.trend-up` (green) / `.trend-down` (red)
- `.section-header` / `.section-header h3 p` / `.btn-link`
- `.vitrine` (grid 4-col carousels)
- `.dash-bottom` (grid 2fr 1fr Budget Table Layout)

### Dash V3 Hero
- `.dash-hero` (gradient navy→blue, radius 24, padding 24 30, decorações radiais)
- `.dash-hero-left` / `-right` (sticky 280min)
- `.dash-hero-greet` (uppercase 13)
- `.dash-hero h2 p`
- `.dash-hero-cta` (CTA white)
- `.dash-hero-stat` (card glass blur) / `-stat-lbl` / `-stat-val` / `-stat-sub`
- `.dash-month-input` (date input glass)
- Internal `@media(max-width:880px)`

### Home KPIs (hero direito sutil)
- `.home-kpis/-kpi-grid/-kpi/-kpi-lbl/-kpi-row/-kpi-val/-kpi-trend`

### Dash V3 KPIs override
- `.dash-kpi` upgrade (padding 22 + hover lift + transform)
- `.dash-kpi-top/-bottom` (flex layout)
- `.dash-kpi-icon` static smaller (40 + radius form)
- `.dash-kpi-value` (28 bold, letter-spacing -.03)

### Quick actions
- `.quick-act-btn` (card link) / `-act-icon` (36 color) / `-act-title` / `-act-desc`

### Featured products
- `.dash-feat-product` (row borda inf)
- `.dash-feat-img` (48 contain) / `-feat-info` / `-feat-name` / `-feat-meta` / `-feat-price`

### Activity list
- `.dash-activity-list` / `-activity-item` (rows)

### Main grid + cards
- `.dash-main-grid` (grid 1.55fr 1fr)
- Vários sub-componentes orçamentos chart + product carousels

### Promo banner
- `.dash-promo-*` (price + CTA + bg gradient)
- `.dash-carousel-cta`
- `.dash-feat-product:hover`

### Avisos finais
- `.dash-alerts` (grid 2-col)
- Internal `@media(max-width:760px)`

### Brand bar (logo integrador)
- `.dash-hero-brand` (glass strip)
- `.dash-hero-brand-logo` (36 white) / `-brand-logo img i`
- `.dash-hero-brand-text strong/small`
- `.dash-hero-brand-edit` (icon-btn glass)

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.dash-kpi` (v1+v3) / `.home-kpi` | `.ds-kpi` (CONFIRMED) | 3+ DUPE (com client-kpi + calc-metric) |
| `.kpi-blue/-green/-amber/-purple` | color variants · `.ds-kpi-tone-{blue/green/amber/purple}` | Pattern |
| `.dash-hero` (gradient navy→blue) | `.ds-hero-gradient` (CONFIRMED 3x → upgrade 4x) | DUPE |
| `.dash-hero-cta` (CTA white sobre brand bg) | `.ds-btn-on-brand` variant (não existe) | Pattern |
| `.dash-hero-stat` (card glass blur) | Possible `.ds-stat-card-glass` variant | Custom |
| `.dash-month-input` (date input glass) | Glass input variant | Custom |
| `.dash-bottom` (grid 2fr 1fr) | Layout primitive · candidato `.ds-grid-2-1` | Utility |
| `.dash-main-grid` (1.55fr 1fr) | Layout pattern | Domain-specific |
| `.dash-alerts` (grid 2-col) | Generic layout · `.ds-grid-2` ou `.ds-form-grid-2` | Utility |
| `.dash-hero-brand-edit` | `.ds-icon-btn` glass variant (CONFIRMED upgrade) | DUPE |
| `.dash-hero-brand-logo` (36 logo box) | `.ds-icon-box` variant | DUPE |
| `.dash-hero-quick-ico` (30 glass square) | `.ds-icon-box` glass variant | DUPE |
| `.dash-hero-brand` (glass strip · logo + text + edit) | Pattern: glass strip · candidato | Pattern |
| `.dash-hero-greet` (uppercase 13 + dot + status) | Eyebrow text pattern | DUPE com .ckform-section-title |
| `.quick-act-btn` (card link interativo) | Card link pattern · candidato `.ds-card-link` | Pattern |
| `.dash-feat-product` (linha produto compacta) | List item pattern | Domain |
| `.dash-promo-cta` / `.dash-carousel-cta` / `.dash-hero-cta` | `.ds-btn-on-brand` variants | DUPE pattern |
| `.section-header` | Section header pattern · candidato `.ds-section-head` | Pattern |
| `.btn-link` | `.ds-link` ✅ | DUPE direto |
| `.trend-up` / `.trend-down` | Trend indicators · candidato | Pattern |

**Estimativa migration:** ~75% migrável. Custom restantes: hero glass effect, month-input glass, quick-act-btn pattern.

**Novos atoms/molecules confirmados nesta extração:**
- `.ds-kpi` upgrade 3x→**4x+** (dash + home + client + calc)
- `.ds-hero-gradient` upgrade 3x→**4x** (+dash-hero)
- `.ds-icon-btn` upgrade 4x→**5x** (+dash-hero-brand-edit)
- `.ds-icon-box` upgrade 3x→**5x** (+dash-hero-brand-logo + dash-hero-quick-ico)

**Novos sugeridos:**
- `.ds-btn-on-brand` (CTA branco/light sobre brand bg dark)
- `.ds-card-link` (card como link interativo)
- `.ds-section-head` (header com title + sub + action link)
- `.ds-kpi-tone-*` (color variants do KPI)
- `.ds-grid-2-1` (layout utility 2fr 1fr)

## Tokens

Maioria primitives. Phase H migra junto.

## Responsive

- `@media(max-width:880px)` interna (hero responsive)
- `@media(max-width:760px)` interna (alerts grid)
- Plus cross-feature em index.html (dash-kpis · dash-bottom em compat block)

## C.25c · Home content blocks (extracted)

Phase C.25c trouxe pra dashboard.css todos os blocos `.home-*` que faltavam (estavam num `<style>` separado após o link do dashboard.css). Agrupados em 9 sub-seções:

1. **Home KPIs** (`.home-kpis`, `.home-kpi-grid/lbl/row/val/trend.is-up/is-down`) — KPIs sutis no hero direito
2. **Perks strip** (`.home-perks`, `.home-perk`, `.home-perk-icon`, `.home-perk strong/small`) — 3 mini-cards horizontais
3. **Showcase** (`.home-showcase`, `.home-showcase-media + .is-ambient`, `.home-showcase-tag`, `.home-showcase-info/cat/name/specs/spec/desc/price-block/price-row/old/discount/price-line/price-lbl/price-tax/price/cta-row/cta-primary/cta-secondary`) — produto destaque grande
4. **Categorias grid** (`.home-categories-grid`, `.home-cat-card/icon/info/arrow`) — v2
5. **Categorias pills** (`.home-categories-pills`, `.home-cat-pill/-icon/-label`) — v3 circulares
6. **Sections head** (`.home-section`, `.home-section-head/title/sub/link`)
7. **Product mini cards** (`.home-products-grid`, `.home-prod-card/badge/img/body/cat/name/foot/old/price`)
8. **Recent grid** (`.home-recent-grid`, `.home-recent-card/head/head-info/head-icon/list/row/avatar/avatar-green/info/name/meta/code/dot/tail/total`) — orçamentos | pedidos rails
9. **Home responsive** (3 media queries: 1100/720/680px)

**DUPES adicionais notadas em C.25c (Phase H prep):**
- `.home-kpi` → `.ds-kpi` (já confirmado 6x, agora também home variant com bg dark)
- `.home-prod-card` → `.ds-product-card` pattern (com `.product-card` da loja · 3+ variantes do mesmo conceito)
- `.home-recent-card/row` → `.ds-list-card` pattern (com `.dash-feat-product`)
- `.home-section-head` → `.ds-section-head` (já confirmado 4x · agora 5x)
- `.home-cat-pill` → `.ds-icon-button-circle` ou `.ds-quick-pick` pattern

## Related

- [DS atoms](../../ds/) — DUPES massivos
- [Clientes](../clientes/README.md) / [Calculadora](../calculadora/README.md) — `.ds-kpi` DUPE 3x já confirmado
- [Ajuda](../ajuda/README.md) — `.ds-hero-gradient` DUPE
- [Loja](../loja/README.md) — `.product-card` ↔ `.home-prod-card` DUPE pattern (Phase H consolida)
