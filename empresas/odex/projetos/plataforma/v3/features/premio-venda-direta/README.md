# Feature · Prêmio Venda Direta

> Source: [`premio-venda-direta.css`](./premio-venda-direta.css)
> Telas: Lista (`#premio`) · Detalhe (`#premio-ver-<id>`)
> Layer: `@layer features`

## Propósito

Dashboard do Prêmio Venda Direta (PVD) · listagem de pedidos com status de pagamento, tabela com colunas customizadas (código/cliente/NF/pagamento/vencimento) e detalhe individual com status banner (5 tons), upload de NF (dropzone), timeline de eventos e meta strip.

## Componentes principais

### Header + Tabela (.premio-*)
- `.premio-page-head` (h2 navy + actions)
- `.premio-table-card` (container)
- `.premio-tbl-head` / `.premio-tbl-row` (grid 7-col específico)
- `.premio-cod` / `-cliente` / `-nf` / `-pgto` / `-vence` (cells)
- `.premio-row-arrow` (32 circle hover blue)
- `.premio-empty` (estado vazio)
- `.premio-status-pill` + variants:
  - `.premio-s-recebido` (green)
  - `.premio-s-aguardando` (blue)
  - `.premio-s-vencendo` (amber)
  - `.premio-s-vencido` (red)
  - `.premio-s-cancelado` (muted)
- Internal `@media(max-width:680px)`

### Detalhe (.pv-*)
- `.pv-back` (link voltar)
- `.pv-header` / `-header-l h2/p strong`

**Status banner (5 tons)**
- `.pv-status-banner` (border + bg colorido conforme tom)
- `.pv-status-banner-icon` (36 circle white)
- `.pv-status-banner-body h3/p`
- `.pv-tone-warn` (yellow) / `-tone-info` (blue) / `-tone-danger` (red) / `-tone-success` (green) / `-tone-muted` (gray)

**Meta strip**
- `.pv-meta` (horizontal strip divided)
- `.pv-meta-item` (col padding 14 20)
- `.pv-meta-item span` (label uppercase) / `strong` (valor)
- `.pv-meta-highlight` (variant blue gradient · valor destacado)

**Upload NF**
- `.pv-upload-card` (container)
- `.pv-upload-head` / `-head-text h3/p` / `-head-badge`
- `.pv-upload-drop` (dropzone dashed blue · `.is-drag` state)
- `.pv-upload-icon` (52 circle white)
- `.pv-upload-title` / `-title em` (link-style "selecione um arquivo")
- `.pv-upload-sub` (hint texto)

**Timeline + cards (.pv-timeline-* / .pv-section-card / .pv-card)**
- Cards de seção, lista timeline com pontos
- `.pv-stat-card` (KPI · DUPE com .ds-kpi)
- `.pv-cta-btn` (CTA primary)

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.premio-page-head` | `.ds-section-head` (sugerido) | DUPE com .dash + .ajuda-section |
| `.premio-tbl-head/-row` | `.ds-table-grid` (CONFIRMED 4x) | DUPE upgrade 5x |
| `.premio-row-arrow` | `.ds-icon-btn` circle (CONFIRMED 5x) | DUPE upgrade 6x |
| `.premio-status-pill` + 5 tones | `.ds-pill` ✅ + variants | DUPE 7x |
| `.pv-back` | `.ds-link-back` (CONFIRMED 4x) | DUPE upgrade 5x |
| `.pv-status-banner` + 5 tones | `.ds-alert` (CONFIRMED 3x) | DUPE upgrade 4x · MAIS variants |
| `.pv-meta` / `-meta-item` | KV strip pattern · candidato `.ds-meta-strip` | Pattern |
| `.pv-upload-drop` (dropzone dashed) | `.ds-dropzone` (new) | New molecule |
| `.pv-upload-icon` | `.ds-icon-box` circle (CONFIRMED 5x) | DUPE upgrade 6x |
| `.pv-stat-card` | `.ds-kpi` (CONFIRMED 4x) | DUPE upgrade 5x |
| `.pv-card` / `.pv-section-card` | `.ds-card` ✅ | DUPE |
| `.pv-cta-btn` | `.ds-btn-primary` ✅ | DUPE |
| `.pv-tone-warn/-info/-danger/-success/-muted` | `.ds-alert-{warning,info,error,success,neutral}` | 5 variants |
| `.pv-timeline-*` | Timeline pattern · candidato `.ds-timeline` | New molecule |

**Estimativa migration:** ~85% migrável.

**Upgrades de atoms já confirmados:**
- `.ds-table-grid` 4x → **5x**
- `.ds-link-back` 4x → **5x**
- `.ds-icon-box` 5x → **6x**
- `.ds-icon-btn` 5x → **6x**
- `.ds-alert` 3x → **4x** (+ 5 variants tones)
- `.ds-kpi` 4x → **5x**

**Novos sugeridos:**
- `.ds-dropzone` (upload area dashed blue)
- `.ds-meta-strip` (horizontal divided info strip)
- `.ds-timeline` (eventos verticais)

## Tokens

Maioria primitives. Phase H migra junto.

## Responsive

Internal `@media(max-width:680px)` (tabela vira card grid).
Internal `@media(max-width:520px)` (upload card padding ajusta).

## Related

- [DS atoms](../../ds/) — múltiplos upgrades confirmados
- [Pedidos](../pedidos/README.md) — `.ped-status-pill` DUPE
- [Orçamentos](../orcamentos/README.md) — `.orc-status-pill` DUPE
