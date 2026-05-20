# Feature · Clientes

> Source: [`clientes.css`](./clientes.css)
> Telas: Lista (`#clientes`) · Detail (`#cliente-N`) · Modal Cliente Search · Modal Novo Cliente (steps)
> Layer: `@layer features`

## Propósito

Gestão de clientes · listagem com toolbar (search + date range + filter), página detalhe com KPIs/endereços/tabs, modal de busca de cliente (autocomplete), modal de novo cliente em 3 steps (tipo PF/PJ → dados → endereço).

## Componentes principais

### Lista (.clients-*)

| Class | Função |
|---|---|
| `.clients-toolbar` | Toolbar c/ search + date range + filter + add |
| `.clients-srch-wrap` / `.clients-srch-icon` / `.clients-srch` | Search input 42h |
| `.clients-date-range` / `.clients-date-lbl` / `.clients-date-inp` / `.clients-date-sep` | Inputs de período |
| `.clients-srch-btn` (blue outline) / `.clients-clr-btn` (X clear) / `.clients-add-btn` (blue solid) | Toolbar buttons |
| `.clients-list-card` | Container tabela |
| `.clients-tbl-head` / `.clients-tbl-row` | Tabela grid 6-cols (48px av + nome + email + tel + data + arrow) |
| `.client-av` (38×38 avatar) / `.client-av-lg` (52×52 detail) | Avatar coloridos |
| `.client-row-name` / `-sub` / `-email` / `-tel` / `-date` / `-arrow` | Cells |
| `.clients-list-foot` | Footer "X de Y clientes" |

### Detail (.client-*)

| Class | Função |
|---|---|
| `.client-detail-grid` | Grid main + sidebar 420 |
| `.client-detail-left` / `-right` (sticky) | Colunas |
| `.client-info-card` / `-info-hdr` | Card info principal |
| `.client-detail-name` / `-detail-code` | 21px bold + codigo muted |
| `.client-edit-btn` / `.client-edit-btn2` / `.client-back-btn` / `.client-new-orc` | Action buttons |
| `.client-kpis` / `-kpi` / `-kpi-lbl` / `-kpi-val` | KPIs grid 2-col |
| `.client-fields` / `-field-lbl` / `-field-val` | Campos info (uppercase lbl + value) |
| `.client-addr-card` / `-addr-title` / `-addr-item` / `-addr-type` / `-addr-line` | Card endereços |
| `.client-addr-tags` / `-addr-tag` + variants (urbano/rural/carreta-sim/carreta-nao) | Tags por endereço |
| `.tag-urbano` / `.tag-rural` / `.tag-carreta-*` | Tag colors |
| `.client-tabs-card` | Tabs (orçamentos/pedidos do cliente) |

### Modal Cliente Search (.cliente-*)

| Class | Função |
|---|---|
| `.cliente-search-list` | Container scroll max-h 320 |
| `.cliente-search-item` | Item autocomplete (codigo + nome) |
| `.cliente-search-item:hover` | bg azul claro |
| `.cliente-search-item strong` | Codigo em blue bold |
| `.cliente-search-empty` | Estado vazio |

### Modal Novo Cliente Steps (.nc-*)

| Class | Função |
|---|---|
| `.modal-wide` | Modal override 660w |
| `.nc-steps` / `.nc-step` / `.nc-step-dot` (done/active/pending) / `.nc-step-lbl` / `.nc-step-sep` | Wizard horizontal 3 steps |
| `.nc-body` | Scroll body max-h 460 |
| `.nc-tipo` / `.nc-tipo-opt` (sel state) | Select PF/PJ cards |
| `.nc-grid-2` / `.nc-grid-3` | Form grids |
| `.nc-field` / `.nc-label` (+ `.req`) | Form fields |
| `.nc-input` / `.nc-textarea` | Form controls 42h |
| `.nc-radio-row` / `.nc-radio-opt` | Radio buttons inline |
| `.nc-legal` | Footer legal disclaimer |
| `.nc-foot` / `.nc-cancel` / `.nc-next` | Footer actions |

## 📋 Divergence audit (Phase H · TODO consolidar com DS)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.clients-toolbar` / `.ped-toolbar` / `.orc-toolbar` / `.mk-toolbar` | `.ds-toolbar` (new molecule) | **DUPE 4x cross-feature** |
| `.clients-srch` (search + icon) | `.ds-input-group` ✅ | DUPE |
| `.clients-tbl-head` / `.clients-tbl-row` | `.ds-table-grid` (new molecule) | DUPE 4x cross-feature |
| `.clients-add-btn` / `.client-new-orc` (blue 42h/40h) | `.ds-btn .ds-btn-primary` | DUPE |
| `.clients-clr-btn` (icon-only 42×42) | `.ds-icon-btn` (new molecule) | New atom |
| `.clients-srch-btn` (blue tint outline) | `.ds-btn .ds-btn-secondary` (variant) | Near-dupe |
| `.client-back-btn` / `.ck-back-btn` / `.orc-back` | Mesmo pattern back-link | DUPE cross-feature |
| `.client-edit-btn` / `.client-edit-btn2` | `.ds-btn .ds-btn-ghost .ds-btn-sm` | DUPE |
| `.client-info-card` / `.client-addr-card` / `.client-tabs-card` | `.ds-card` ✅ | DUPE 3x |
| `.client-kpi` | `.ds-card` pattern com label/value | Near-dupe |
| `.client-fields` (label uppercase + value) | KV pattern · `.ds-kv-list` (new) | Pattern |
| `.client-addr-tag` + variants | `.ds-pill` ✅ existe (rename pra ds-pill) | DUPE |
| `.client-av` / `.client-av-lg` | Avatar pattern · `.ds-avatar` (new) | New atom |
| `.cliente-search-list` / `-item` | Autocomplete results · `.ds-search-list` (new) | New molecule |
| `.nc-step*` (3 steps wizard) | `.auth-step-indicator` / `.mk-step` → `.ds-stepper` (new) | DUPE cross-feature 3x |
| `.nc-tipo-opt` (selection card) | `.mk-tipo-card` / `.radio-opt` (checkout) → `.ds-card-selectable` (new) | DUPE 3x |
| `.nc-grid-2` / `.nc-grid-3` / `.ck-grid-2` / `.ck-grid-3` (checkout) / `.auth-grid-2` | Form grid pattern · `.ds-form-grid` (new) | DUPE 4x |
| `.nc-input` | `.ds-input` ✅ | DUPE |
| `.nc-textarea` | `.ds-textarea` ✅ | DUPE |
| `.nc-field` / `.nc-label` | `.ds-field` / `.ds-field-label` ✅ | DUPE |
| `.nc-radio-opt` | `.ds-check input[radio]` ou `.radio-opt` (checkout) | DUPE |
| `.nc-cancel` (ghost) / `.nc-next` (primary) | `.ds-btn-ghost` / `.ds-btn-primary` ✅ | DUPE |

**Estimativa migration:** ~85% migrável. Custom restantes:
- `.client-detail-grid` específico do detalhe cliente
- `.client-addr-*` específico de endereços do cliente
- `.tag-urbano/-rural/-carreta-*` domain-specific
- `.cliente-search-*` autocomplete (vira molecule)
- `.nc-legal` disclaimer text

**Novos DS atoms/molecules sugeridos a partir desta feature:**
- `.ds-toolbar` (CONFIRMED · 4x feature DUPE)
- `.ds-table-grid` (CONFIRMED · 4x feature DUPE)
- `.ds-icon-btn` (clear/close buttons)
- `.ds-avatar` (38/52 sized initials circle)
- `.ds-stepper` (CONFIRMED · 3x feature DUPE)
- `.ds-card-selectable` (CONFIRMED · 3x feature DUPE)
- `.ds-form-grid` (4x feature DUPE)
- `.ds-search-list` (autocomplete results)
- `.ds-kv-list` (CONFIRMED dupe de mk + ped resumo)

## Tokens

Maioria primitivos hardcoded. Phase H migra junto.

## Responsive

`@media(max-width:1100px)` em index.html (cross-feature com calc) tem rules pra `.client-detail-grid` e `.clients-tbl-*` · ficou no index pra evitar quebra de media compartilhada.

## Cleanup (durante extração C.14)

Removido orphan `}` no index.html linha 3149 (leftover de extração anterior) e orphan comment `/* ====== ORÇAMENTO DETAIL (legacy v1) ====== */` que não tinha CSS associado.

## Related

- [DS atoms](../../ds/) — DUPES massivos a consolidar Phase H
- [Pedidos](../pedidos/README.md) / [Orçamentos](../orcamentos/README.md) / [Monte-kit](../monte-kit/README.md) — DUPES de toolbar + table-grid
- [Checkout](../checkout/README.md) — `.nc-radio-opt` ↔ `.radio-opt` DUPE
- [Auth](../auth/README.md) — `.nc-step*` ↔ `.auth-step-indicator` DUPE
