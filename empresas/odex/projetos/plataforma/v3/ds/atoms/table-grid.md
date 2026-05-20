# `.ds-table-grid` (atom)

> Source: [`table-grid.css`](./table-grid.css)
> Created: Phase H.2 (2026-05-20) · consolida **8 DUPES** (clients/orc/ped tbl + premia/admin variants).

## Quando usar

Listagem tabular em CSS grid (head + rows). NÃO é `<table>` HTML semântico — é list pattern com layout grid ortogonal, hover individual, cursor:pointer.

Casos:
- Lista de clientes, orçamentos, pedidos (listings com row arrow)
- Lista de novidades/artigos no admin
- Lista de prêmios (premia table)
- Qualquer listing com colunas fixas alinhadas

## Quando NÃO usar

- Tabular data semântica (relatório, datatable) → use `<table>` HTML com `.ds-data-table` (futuro · não criado ainda)
- Lista que cresce vertical sem alinhamento entre rows → use `<ul>` simples
- Card list não-tabular → use `.ds-card` repetido em flex/grid

## API

Colunas via CSS custom prop no parent:
```html
<div class="ds-table-grid" style="--ds-table-cols: 88px 1fr 150px 120px;">
  <div class="ds-table-grid-head">
    <span>Code</span><span>Cliente</span><span>Data</span><span>Total</span>
  </div>
  <div class="ds-table-grid-row ds-table-grid-row-clickable">
    <span class="ds-table-grid-cell-mono">#1234</span>
    <span class="ds-table-grid-cell-strong">João Silva</span>
    <span class="ds-table-grid-cell-meta">20/05</span>
    <span class="ds-table-grid-cell-num">R$ 4.890</span>
  </div>
</div>
```

## Estrutura

- `.ds-table-grid` wrapper (card · bg/border/radius)
- `.ds-table-grid-head` (grid · padding 11/20 · bg sunken)
- `.ds-table-grid-head span` (10px/700 uppercase muted)
- `.ds-table-grid-row` (grid · padding 12/20 · border-bottom)
- `.ds-table-grid-row-clickable` (cursor + hover bg)
- `.ds-table-grid-row-arrow` slot (chevron right · 26 circle)

## Variants

- (default) — clickable rows (orcamentos/pedidos/clientes pattern)
- `.ds-table-grid-dense` — padding reduzido pra listas longas

## Cell utilities

Helpers comuns dentro de rows:
- `.ds-table-grid-cell-mono` — SKU/code (monospace 12 muted)
- `.ds-table-grid-cell-strong` — primary text (600 14 ink · ellipsis)
- `.ds-table-grid-cell-num` — valor numérico (700 14 tabular-nums)
- `.ds-table-grid-cell-meta` — secondary text (400 12 muted)

## States

- `:hover` (em `-clickable`) — bg sunken
- `:focus-visible` — inset blue ring 2px
- empty list → `.ds-table-grid-empty` (placeholder centered)

## Accessibility

- Não é `<table>` semântico — leitores de tela tratam como lista de items
- Se precisar tabular semantics use `<table>` com `<thead>/<tbody>/<tr>/<td>`
- Para rows clickable adicione `role="button"` + `tabindex="0"` + handler de Enter/Space
- Head visualmente identificável mas não lido como cabeçalho semântico (use `aria-label` em parent se precisar)

## Examples

```html
<!-- Lista de pedidos (8-col) -->
<div class="ds-table-grid" style="--ds-table-cols: 80px 1fr 110px 170px 80px 80px 110px 184px;">
  <div class="ds-table-grid-head">
    <span>Code</span><span>Cliente</span><span>Status</span><span>Data</span>
    <span>Itens</span><span>Valor</span><span>Pagto</span><span></span>
  </div>
  <div class="ds-table-grid-row ds-table-grid-row-clickable" tabindex="0">
    <span class="ds-table-grid-cell-mono">#PED-1234</span>
    <span class="ds-table-grid-cell-strong">Distribuidora ACME</span>
    <span class="ds-pill ds-pill-andamento">Em andamento</span>
    <span class="ds-table-grid-cell-meta">20/05/2026</span>
    <span class="ds-table-grid-cell-num">12</span>
    <span class="ds-table-grid-cell-num">R$ 48.900</span>
    <span class="ds-pill ds-pill-pago">Pago</span>
    <span class="ds-table-grid-row-arrow"><i data-lucide="chevron-right"></i></span>
  </div>
</div>

<!-- Dense list -->
<div class="ds-table-grid ds-table-grid-dense" style="--ds-table-cols: 1fr 80px 60px;">
  <div class="ds-table-grid-head">
    <span>Item</span><span>Qtd</span><span></span>
  </div>
  <div class="ds-table-grid-row">
    <span class="ds-table-grid-cell-strong">Painel Solar 580W</span>
    <span class="ds-table-grid-cell-num">12</span>
    <span><button class="ds-icon-btn ds-icon-btn-sm ds-icon-btn-danger" aria-label="Remover">×</button></span>
  </div>
</div>

<!-- Empty -->
<div class="ds-table-grid">
  <div class="ds-table-grid-head">
    <span>Cliente</span><span>Data</span>
  </div>
  <div class="ds-table-grid-empty">
    Nenhum cliente cadastrado ainda.
  </div>
</div>
```

## Migration map (Phase H.2)

| Origin | Replace with |
|---|---|
| `.clients-tbl-head` (6-col) | `.ds-table-grid-head` em parent c/ `--ds-table-cols: 48px 1fr 200px 155px 135px 40px` |
| `.clients-tbl-row` | `.ds-table-grid-row.ds-table-grid-row-clickable` |
| `.client-row-arrow` | `.ds-table-grid-row-arrow` slot |
| `.orc-tbl-head` (7-col) | `.ds-table-grid-head` c/ `--ds-table-cols: 88px 1fr 150px 120px 100px 110px 140px` |
| `.orc-tbl-row` | `.ds-table-grid-row.ds-table-grid-row-clickable` |
| `.ped-tbl-head` (8-col) | `.ds-table-grid-head` c/ `--ds-table-cols: 80px 1fr 110px 170px 80px 80px 110px 184px` |
| `.ped-tbl-row` | `.ds-table-grid-row.ds-table-grid-row-clickable` |
| `.admin-novidade-row` | `.ds-table-grid-row.ds-table-grid-row-clickable` (em parent c/ cols custom) |
| `.admin-artigo-row` | `.ds-table-grid-row.ds-table-grid-row-clickable` |

## Related

- `.ds-pill` — status indicators inside rows
- `.ds-icon-btn` — row actions (com `.ds-icon-btn-sm`)
- [clientes](../../features/clientes/README.md) / [orcamentos](../../features/orcamentos/README.md) / [pedidos](../../features/pedidos/README.md) — primários consumidores
