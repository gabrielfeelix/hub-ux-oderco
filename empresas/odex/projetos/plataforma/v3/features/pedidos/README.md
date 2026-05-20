# Feature · Pedidos

> Source: [`pedidos.css`](./pedidos.css)
> Telas: Lista (`#pedidos`) · Detail v2 (`#pedido-ver-N`) · Modal Resumo (overlay em qualquer página)
> Layer: `@layer features`

## Propósito

Gestão de pedidos · listagem com filtros, página de detalhe v2 com sidebar + items + premia table, e modal de resumo do pedido com cards organizados.

## Componentes principais

### Lista (.ped-*)

| Class | Função |
|---|---|
| `.ped-toolbar` | Toolbar com search + filter + email |
| `.ped-srch-wrap` / `.ped-srch-icon` / `.ped-srch` | Search input 42h com ícone |
| `.ped-filter-btn` | Botão filtrar |
| `.ped-email-btn` | CTA "Enviar email" 40h blue |
| `.ped-tbl-head` / `.ped-tbl-row` | Tabela grid columns |
| `.ped-code` / `.ped-cliente` / `.ped-date` / `.ped-total` | Cells |
| `.ped-status-pill` + variants | Pílulas status |
| `.ped-print-btn2` | Link imprimir (icon + text blue) |

### Detail v2 (.ped-v2-*)

| Class | Função |
|---|---|
| `.ped-v2-card` | Card de seção |
| `.ped-v2-banner` | Banner header com cliente |
| `.ped-v2-banner-btns` | Strip de actions |
| `.ped-v2-ghost` / `.ped-v2-solid` | Buttons outline white / solid white |
| `.ped-v2-stat-col` / `.ped-v2-stat-val` / `.ped-v2-stat-lbl` | Stats columns |
| `.ped-v2-2col` | Grid 2-col 1.4fr/1fr |
| `.ped-v2-prods-card` / `.ped-v2-prods-hdr` | Card produtos |
| `.ped-v2-prod` (+ img/info/name/sku/right) | Linha de produto |
| `.ped-v2-pricing-rows` / `.ped-v2-pricing-row` | Linhas de preço |
| `.ped-v2-pricing-total` | Total destacado |
| `.ped-v2-pill` + variants (`ban/and/can/fat`) | Pílulas inline |
| `.ped-v2-premia-table` | Tabela Prêmio Venda Direta |
| `.ped-client-strip` | Strip cliente (alternativa banner) |

### Modal Resumo (.ped-resumo-* + .resumo-*)

| Class | Função |
|---|---|
| `.ped-resumo-overlay` | Backdrop blur z-300 |
| `.ped-resumo-modal` | Modal 780w z-310 (open scale transition) |
| `.ped-resumo-head` | Header gradient blue subtle |
| `.ped-resumo-eyebrow` | "PEDIDO #1234" uppercase 11px |
| `.ped-resumo-title` | Title 22px |
| `.ped-resumo-close` | Close button 34×34 circle |
| `.ped-resumo-body` | Scroll body |
| `.resumo-client` / `.resumo-avatar` | Banner cliente |
| `.resumo-grid-2col` / `.resumo-card` | Cards logística + pagamento lado-a-lado |
| `.resumo-card-head` / `.resumo-card-icon` | Card header com ícone color-coded |
| `.resumo-kv` (dl/dt/dd) | Key-value pairs |
| `.resumo-prod-head` / `.resumo-prod` | Tabela de produtos no resumo |
| `.resumo-prod-thumb` | Thumb 48×48 com fallback "no-img" |
| `.resumo-prod-qty` / `.resumo-prod-val` | Qty pill + valor |
| `.resumo-nf-card` / `.resumo-nf-*` | Card nota fiscal |
| `.resumo-nf-btn` | Botão NF outline |

## 📋 Divergence audit (Phase H · TODO consolidar com DS)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.ped-toolbar` / `.orc-toolbar` | Mesmo pattern · futuro `.ds-toolbar` molecule | DUPE cross-feature |
| `.ped-srch` (icon + 42h input) | `.ds-input-group` com `.ds-input-group-icon` | DUPE |
| `.ped-filter-btn` (42h ghost) | `.ds-btn .ds-btn-ghost` | DUPE |
| `.ped-add-btn` / `.orc-add-btn` (42h blue) | `.ds-btn .ds-btn-primary` | DUPE |
| `.ped-email-btn` (40h blue) | `.ds-btn .ds-btn-primary` (com size custom 40) | Near-dupe |
| `.ped-tbl-head` / `.ped-tbl-row` | Mesmo pattern grid · futuro `.ds-table-grid` | DUPE cross-feature |
| `.ped-status-pill` | `.ds-pill` ✅ existe | DUPE direto |
| `.ped-v2-pill` + variants | `.ds-pill` variants | DUPE |
| `.ped-v2-ghost` | `.ds-btn-ghost` (com white bg adjust) | Near-dupe |
| `.ped-v2-solid` | `.ds-btn-primary` variant white-on-bg | Custom (deixar) |
| `.ped-v2-card` / `.ped-info-card` | `.ds-card` ✅ | DUPE |
| `.ped-resumo-modal` (modal 780w) | Não existe `.ds-modal` ainda | **Criar molecule `.ds-modal`** |
| `.ped-resumo-overlay` | Padrão backdrop · vai com `.ds-modal` | Idem |
| `.ped-resumo-close` / `.cart-close` | Mesma 28-34px icon-button circle | DUPE cross-feature → `.ds-icon-btn-close` |
| `.resumo-kv` (dl/dt/dd) | Padrão key-value · futuro `.ds-kv-list` | Sugerir molecule |
| `.resumo-card` | `.ds-card` | DUPE |
| `.resumo-card-count` | `.ds-pill` neutro | DUPE |
| `.resumo-nf-btn` (36h outline) | `.ds-btn .ds-btn-ghost .ds-btn-sm` | Match |
| `.ped-print-btn2` | `.ds-link` com ícone | Match estrutural |

**Estimativa migration:** ~75% migrável pra DS. Restam:
- `.ds-modal` molecule a ser criada (Phase H)
- `.ds-toolbar` molecule (genérico pra qualquer listing)
- `.ds-table-grid` molecule (CSS grid table)
- `.ds-kv-list` molecule (key-value pairs)
- `.ds-icon-btn-close` (close button circular)
- `.ped-v2-banner` / `.resumo-nf-icon` provavelmente ficam feature-specific

## Tokens

Maioria primitivos hardcoded. Phase H migra junto.

## Responsive

Media query `@media(max-width:1024px)` em index.html (linhas ~3978+) tem rules pra ped + orc + ajuda · não extraído pra evitar quebra cross-feature. Phase H avalia migração.

## Related

- [Checkout](../checkout/README.md) — `.cart-close` cross-feature dupe com `.ped-resumo-close`
- [Orçamentos](../orcamentos/README.md) — toolbars/tables são DUPES estruturais
- [DS pills](../../ds/atoms/pills.md), [cards](../../ds/atoms/cards.md), [buttons](../../ds/atoms/buttons.md)
