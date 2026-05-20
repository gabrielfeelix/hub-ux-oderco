# `.ds-toolbar` (atom)

> Source: [`toolbar.css`](./toolbar.css)
> Created: Phase H.8 (2026-05-20) · consolida **5 DUPES** (clients-toolbar, orc-toolbar, ped-toolbar, mk-toolbar, admin-toolbar).

## Quando usar

Header de listagem · search + filters + actions à direita. Pra qualquer página de listing (clientes, orçamentos, pedidos, kits, banners admin, etc).

## Quando NÃO usar

- Topbar global do app (sidebar/notif/profile) → use `.topbar` em chrome
- Filter toolbar dentro de drawer (vertical) → use stack vertical custom
- Action bar de items selecionados (bulk actions) → use `.ds-bulk-bar` (futuro)

## API

```html
<!-- Toolbar default -->
<div class="ds-toolbar">
  <div class="ds-toolbar-search">
    <i data-lucide="search" class="ds-toolbar-search-icon"></i>
    <input type="text" placeholder="Buscar por código, nome, documento..." />
  </div>
  <div class="ds-toolbar-filters">
    <span class="ds-pill">Pendentes</span>
    <span class="ds-pill">Últimos 30 dias</span>
  </div>
  <div class="ds-toolbar-actions">
    <button class="ds-btn ds-btn-ghost">Filtrar</button>
    <button class="ds-btn ds-btn-primary">+ Novo cliente</button>
  </div>
</div>
```

## Slots

- `.ds-toolbar-search` — input com search icon (flex 1 · max 420)
- `.ds-toolbar-search-icon` — lucide search (positioned absolute · auto-sized 15px)
- `.ds-toolbar-filters` — flex row pra chips/date-range/pills
- `.ds-toolbar-actions` — margin-left auto · ações à direita
- `.ds-toolbar-spacer` — flex 1 · push manual

## Variants

### Sizes
- `.ds-toolbar-sm` (10/14 pad · input 36h) — drawer toolbars, dense
- `.ds-toolbar-md` (14/18 pad · input 42h) — **default** · page listings
- `.ds-toolbar-lg` (18/22 pad · input 46h) — hero-level prominent

### Modes
- `.ds-toolbar-flush` — sem bg/border/shadow · dentro de cards maiores
- `.ds-toolbar-sticky` — `position: sticky; top: 0` · gruda no scroll

## Accessibility

- Search input deve ter `aria-label` ou `<label>` associado se sem visible label
- Actions buttons mantém ordem visual = ordem de tab
- Sticky variant: testar com keyboard nav · não cortar focus rings

## Examples

```html
<!-- Clientes listing -->
<div class="ds-toolbar">
  <div class="ds-toolbar-search">
    <i data-lucide="search" class="ds-toolbar-search-icon" aria-hidden="true"></i>
    <input type="text" aria-label="Buscar cliente" placeholder="Buscar por código, nome, documento..." />
  </div>
  <div class="ds-toolbar-filters">
    <label class="ds-toolbar-date-lbl">Última compra</label>
    <input type="date" class="ds-input ds-input-sm" />
    <span>→</span>
    <input type="date" class="ds-input ds-input-sm" />
  </div>
  <div class="ds-toolbar-actions">
    <button class="ds-btn ds-btn-ghost" aria-label="Limpar filtros">×</button>
    <button class="ds-btn ds-btn-primary">+ Adicionar Cliente</button>
  </div>
</div>

<!-- Dense drawer toolbar -->
<div class="ds-toolbar ds-toolbar-sm ds-toolbar-flush">
  <div class="ds-toolbar-search">
    <i data-lucide="search" class="ds-toolbar-search-icon"></i>
    <input type="text" placeholder="Filtrar..." />
  </div>
</div>

<!-- Sticky pra scroll longo -->
<div class="ds-toolbar ds-toolbar-sticky">
  <div class="ds-toolbar-search">...</div>
  <div class="ds-toolbar-actions">
    <button class="ds-btn ds-btn-primary">+ Novo orçamento</button>
  </div>
</div>
```

## Migration map (Phase H.8)

| Origin | Replace with |
|---|---|
| `.clients-toolbar` (14/18 white card) | `.ds-toolbar` |
| `.clients-srch-wrap` | `.ds-toolbar-search` |
| `.clients-srch-icon` (svg lucide) | `.ds-toolbar-search-icon` |
| `.clients-srch` (input) | `.ds-toolbar-search input` (auto-styled) |
| `.clients-date-range` (date range) | `.ds-toolbar-filters` |
| `.clients-add-btn` | inside `.ds-toolbar-actions` |
| `.clients-clr-btn` | inside `.ds-toolbar-actions` |
| `.orc-toolbar` | `.ds-toolbar` |
| `.orc-srch-wrap/-icon/-srch` | `.ds-toolbar-search` |
| `.orc-filter-btn` / `.orc-add-btn` | inside `.ds-toolbar-actions` |
| `.ped-toolbar` | `.ds-toolbar` |
| `.ped-srch-wrap/-icon/-srch` | `.ds-toolbar-search` |
| `.ped-filter-btn` / `.ped-email-btn` | inside `.ds-toolbar-actions` |
| `.mk-toolbar` | `.ds-toolbar` |
| `.admin-toolbar` (se houver) | `.ds-toolbar` |

## Related

- `.ds-input` — generic input (toolbar styles bake search input directly)
- `.ds-btn` — actions
- `.ds-pill` — filter chips inside `.ds-toolbar-filters`
- `.ds-icon-btn .ds-icon-btn-sm` — clear/icon-only actions
