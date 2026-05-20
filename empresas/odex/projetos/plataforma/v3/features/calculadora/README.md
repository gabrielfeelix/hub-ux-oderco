# Feature · Calculadora Solar

> Source: [`calculadora.css`](./calculadora.css)
> Tela: `#calculadora`
> Layer: `@layer features`

## Propósito

Simulação de payback solar · usuário entra consumo + cidade + tarifa, calculadora estima potência ideal, geração esperada, payback em anos, economia 25 anos. Outputs em métricas grandes + share modal (PDF + WhatsApp) + CTA pra criar kit no Monte Kit.

## Componentes principais

### Layout

| Class | Função |
|---|---|
| `.calc-form-wrap` | Grid main + sidebar 320 |
| `.calc-form-card` / `.calc-info-card` | Cards principais (padding 32 34) |
| `.calc-form-head` / `.calc-form-head-text` | Header com title + share button |
| `.calc-form-title` (24 bold) / `.calc-form-sub` (14 muted) | Title + sub |
| `.calc-form-share` (38×38 circle) | Share icon button |

### Form inputs

| Class | Função |
|---|---|
| `.calc-inputs-row` | Grid 2-col fields |
| `.calc-field-lbl` (+ `.req`) | Label + required |
| `.calc-inp-wrap` | Container input + icon + suffix |
| `.calc-inp-icon` | Ícone esquerdo absoluto |
| `.calc-inp` | Input 42h c/ padding-left 40 |
| `.calc-inp-sfx` | Sufixo direito (kWh, R$/kWh) |
| `.calc-actions` | Row de buttons |
| `.calc-sim-btn` (50h blue, 15px) | CTA "Simular" |
| `.calc-clr-btn` (50h outline) | "Limpar" |

### Info sidebar

| Class | Função |
|---|---|
| `.calc-info-label` | Header uppercase 10px |
| `.calc-info-stat` | Stat row (num + copy) |
| `.calc-info-num` (24 bold navy) | Numero destacado |
| `.calc-info-copy-title` / `-copy-sub` | Texto |

### Loading state

| Class | Função |
|---|---|
| `.calc-loading` / `.is-active` | Container loading |
| `.calc-spin-svg` / `.calc-spin-arc` | Spinner SVG animado |
| `.calc-loading-title` / `-loading-hint` | Texto |
| `.calc-prog-track` / `-prog-fill` | Barra progresso gradient |

### Results

| Class | Função |
|---|---|
| `.calc-results` / `.is-active` | Container resultados |
| `.calc-metrics` | Grid 4-col KPI cards |
| `.calc-metric` (padding 20 22) | KPI card individual |
| `.calc-metric-lbl` (10 uppercase) | Label KPI |
| `.calc-metric-val` (28 bold navy) | Numero KPI |
| `.calc-metric-sub` (12 muted) | Subtitle KPI |
| `.mv-green/-blue/-amber` | Cor variants (legacy, todos navy agora) |

### Share modal

| Class | Função |
|---|---|
| `.calc-share-bar` | Strip horizontal action |
| `.calc-share-info` | Texto info |
| `.calc-share-actions` | Botões PDF + WhatsApp |
| `.calc-share-btn` (40h) base button |
| `.calc-share-pdf` (white + border) | PDF variant |
| `.calc-share-wa` (green #22c55e) | WhatsApp variant |

### Misc

| Class | Função |
|---|---|
| `.calc-disclaimer` | Aviso jurídico muted left-border |
| `.calc-carousel-head` | Header de carousel produtos sugeridos |
| `.calc-kit-cta` (48h navy) | CTA "Criar kit com esses produtos" |
| `.calc-prod-add` | Botão add produto inline |

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.calc-form-card` / `.calc-info-card` | `.ds-card` ✅ | DUPE |
| `.calc-inp` (42h c/ icon left) | `.ds-input-group` ✅ | DUPE |
| `.calc-inp-icon` / `.calc-inp-sfx` | `.ds-input-group-icon` / `-icon-right` ✅ | DUPE |
| `.calc-field-lbl` (+req) | `.ds-field-label` ✅ | DUPE |
| `.calc-sim-btn` (50h blue) | `.ds-btn-primary .ds-btn-lg` (48h) | Near-dupe (50 vs 48) |
| `.calc-clr-btn` (50h outline) | `.ds-btn-ghost .ds-btn-lg` | Near-dupe |
| `.calc-kit-cta` (48h NAVY) | `.ds-btn-primary-navy .ds-btn-lg` | Match |
| `.calc-share-btn` (40h base) | `.ds-btn-secondary .ds-btn-sm` (32h) ou novo size | Near |
| `.calc-share-pdf` / `.calc-share-wa` | variantes de share (PDF/WhatsApp) | Custom (green = WhatsApp brand) |
| `.calc-share-bar` | Action strip pattern · novo? | Pattern |
| `.calc-disclaimer` | Banner muted · candidato `.ds-alert-neutral` | Pattern |
| `.calc-metrics` / `.calc-metric` | KPI card pattern · candidato `.ds-kpi` (CONFIRMED já sugerido em clientes) | DUPE com `.client-kpi` |
| `.calc-form-share` (38 circle) | `.ds-icon-btn` (CONFIRMED) | DUPE |
| `.calc-loading*` | Loading state custom · candidato `.ds-spinner` | Pattern |
| `.calc-prog-track/-fill` | Progress bar · DUPE de `.auth-progress` | DUPE cross-feature |

**Estimativa migration:** ~80% migrável pra DS.

**Novos atoms/molecules confirmados nesta extração:**
- `.ds-kpi` (KPI card pattern) — DUPE com `.client-kpi`
- `.ds-progress` (linear bar) — DUPE com `.auth-progress`
- `.ds-spinner` (loading anim) — único até agora
- `.ds-alert-neutral` (disclaimer) — único até agora
- `.ds-icon-btn` (já confirmado) — share button +1 ocorrência

## Tokens

Maioria primitivos. Phase H migra junto.

## Responsive

`@media (max-width:1100px)` cross-feature em index.html (compartilhado com clientes) tem `.calc-form-wrap` + `.calc-metrics` overrides · ficou lá. Internal `@media(max-width:680px)` extraído junto.

## Related

- [Monte Kit](../monte-kit/README.md) — calc gera dados pra criar kit (`.calc-kit-cta`)
- [Clientes](../clientes/README.md) — `.client-kpi` DUPE com `.calc-metric`
- [Auth](../auth/README.md) — `.auth-progress` DUPE com `.calc-prog-track`
