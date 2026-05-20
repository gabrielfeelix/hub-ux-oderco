# `.ds-kpi` (atom)

> Source: [`kpi.css`](./kpi.css)
> Created: Phase H.6 (2026-05-20) · consolida **6 DUPES** (dash-kpi v1+v3, home-kpi, client-kpi, calc-metric).

## Quando usar

Card de métrica · label uppercase pequena + valor grande + trend opcional + icon opcional. Pra:
- Dashboard KPI grid (Vendas / Pedidos / Orçamentos / Potência)
- Hero direito sutil (home-kpi · sobre brand bg)
- Detalhe de cliente (1 KPI de orçamentos + 1 de venda total)
- Calculadora métricas (Economia mensal / Payback / Geração / Investimento)

## Quando NÃO usar

- Card descritivo (com texto longo) → use `.ds-card`
- Card de produto → use `.product-card` (Phase H futuro: `.ds-product-card`)
- Status pill standalone → use `.ds-pill`

## API

```html
<!-- Default KPI card -->
<div class="ds-kpi">
  <span class="ds-kpi-lbl">Vendas do mês</span>
  <strong class="ds-kpi-val">R$ 142,5k</strong>
  <span class="ds-kpi-trend is-up"><i data-lucide="trending-up"></i>12,5%</span>
</div>

<!-- KPI with icon top-right -->
<div class="ds-kpi ds-kpi-icon-right ds-kpi-lg">
  <span class="ds-kpi-lbl">Geração</span>
  <strong class="ds-kpi-val">128 <small>kWp</small></strong>
  <p class="ds-kpi-sub">Comparado ao mês anterior</p>
  <div class="ds-kpi-icon-slot">
    <div class="ds-icon-box ds-icon-box-xl ds-icon-box-brand">
      <i data-lucide="zap"></i>
    </div>
  </div>
</div>

<!-- Glass tone (sobre brand bg · hero) -->
<div class="ds-kpi ds-kpi-glass">
  <span class="ds-kpi-lbl">Vendas</span>
  <strong class="ds-kpi-val">R$ 142,5k</strong>
  <span class="ds-kpi-trend is-up"><i data-lucide="trending-up"></i>12,5%</span>
</div>

<!-- Grid container -->
<div class="ds-kpi-grid" style="--ds-kpi-cols: 4;">
  <div class="ds-kpi">...</div>
  <div class="ds-kpi">...</div>
  ...
</div>
```

## Variants

### Sizes
- `.ds-kpi-sm` (14/16 pad · val 20px) — client/admin compact
- `.ds-kpi-md` (20/22 pad · val 28px) — **default** · calc-metric, dash-kpi v3
- `.ds-kpi-lg` (24/26 pad · val 32px) — emphasized

### Tones
- (default) — white surface + ink text
- `.ds-kpi-glass` — transparent bg sobre brand · text on-brand · trend pills com glass tokens

### Layouts
- (default) — vertical stack: lbl / val / trend / sub
- `.ds-kpi-icon-right` — icon slot absolute top-right (use `.ds-icon-box` inside `.ds-kpi-icon-slot`)
- `.ds-kpi-top` — flex row pra label + ação inline
- `.ds-kpi-bottom` — flex row pra value + trend inline

### Trend states
- `.ds-kpi-trend.is-up` — green-softer bg + green-800 text
- `.ds-kpi-trend.is-down` — red-50 bg + red-700 text
- `.ds-kpi-trend.is-neutral` — surface-sunken bg + muted text

### Clickable
- `.ds-kpi-clickable` — cursor pointer + hover lift (translateY-3 + shadow-card)

## Grid container

`.ds-kpi-grid` provides responsive grid · default 4 cols → 2 cols at 1024 → 1 col at 600. Customize via `--ds-kpi-cols` custom prop.

## Accessibility

- `.ds-kpi-lbl` é descritivo (não-h# semântico) · se precisar landmark heading use `<h3 class="ds-kpi-lbl">`
- `.ds-kpi-val` é o foco visual · screen readers leem em order
- `.ds-kpi-trend` deve incluir texto descritivo (não só ícone) pra a11y
- Glass variant tem contraste reduzido (text rgba 0.55) · ok pra label decorativa, NÃO pra valores críticos

## Examples

```html
<!-- Dashboard KPI grid · 4 cards lado a lado -->
<section class="ds-kpi-grid" style="--ds-kpi-cols: 4;">
  <div class="ds-kpi ds-kpi-clickable">
    <div class="ds-kpi-top">
      <span class="ds-kpi-lbl">Vendas do mês</span>
      <div class="ds-icon-box ds-icon-box-md ds-icon-box-brand"><i data-lucide="trending-up"></i></div>
    </div>
    <strong class="ds-kpi-val">R$ 142,5k</strong>
    <div class="ds-kpi-bottom">
      <p class="ds-kpi-sub">vs mês anterior</p>
      <span class="ds-kpi-trend is-up"><i data-lucide="arrow-up"></i>12,5%</span>
    </div>
  </div>
  ...
</section>

<!-- Home hero right (glass KPIs sobre dash-hero) -->
<div class="ds-hero-gradient ds-hero-gradient-3stop ds-hero-gradient-pad-md ds-hero-gradient-radius-xl">
  <div class="ds-hero-gradient-decorated"></div>
  <div class="ds-kpi-grid" style="--ds-kpi-cols: 2; gap: 14px 22px;">
    <div class="ds-kpi ds-kpi-glass">
      <span class="ds-kpi-lbl">Vendas</span>
      <strong class="ds-kpi-val">R$ 142,5k</strong>
      <span class="ds-kpi-trend is-up">12,5%</span>
    </div>
    ...
  </div>
</div>
```

## Migration map (Phase H.6)

| Origin | Replace with |
|---|---|
| `.dash-kpi` (v1 24 pad · icon absolute) | `.ds-kpi .ds-kpi-lg .ds-kpi-icon-right` |
| `.dash-kpi` (v3 22 pad · hover) | `.ds-kpi .ds-kpi-md .ds-kpi-clickable` |
| `.dash-kpi-icon` (48 absolute) | `.ds-icon-box .ds-icon-box-xl .ds-icon-box-rounded` inside `.ds-kpi-icon-slot` |
| `.dash-kpi h4` (label) | `.ds-kpi-lbl` |
| `.dash-kpi-value` | `.ds-kpi-val` |
| `.dash-kpi-trend` | `.ds-kpi-trend.is-up/down` |
| `.home-kpi` (hero glass · sem card) | `.ds-kpi .ds-kpi-glass` |
| `.home-kpi-lbl/-val/-trend` | `.ds-kpi-lbl/-val/-trend` |
| `.client-kpi` (14/16 · border) | `.ds-kpi .ds-kpi-sm` |
| `.client-kpis` (grid 2-col) | `.ds-kpi-grid` com `--ds-kpi-cols: 2` |
| `.calc-metric` (20/22 · val 28) | `.ds-kpi .ds-kpi-md` |
| `.calc-metric-lbl/-val/-sub` | `.ds-kpi-lbl/-val/-sub` |
| `.calc-metrics` (grid 4-col) | `.ds-kpi-grid` com `--ds-kpi-cols: 4` |

## Related

- `.ds-icon-box` — color-coded icon inside `.ds-kpi-icon-slot`
- `.ds-hero-gradient` — host pra `.ds-kpi-glass` cards
- `.ds-pill` — alternativa pra trend mostrar status discreto sem trend
