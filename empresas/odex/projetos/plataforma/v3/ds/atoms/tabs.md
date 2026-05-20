# `.ds-tabs` (atom)

> Source: [`tabs.css`](./tabs.css)
> Phase H.12 · consolida **4 DUPES** (pdp-tabs, admin-tabs, dash-products-tabs, notif-drawer-tabs).

## API

```html
<div class="ds-tabs" role="tablist">
  <button class="ds-tab is-active" role="tab" aria-selected="true">
    Sobre <span class="ds-tab-count">12</span>
  </button>
  <button class="ds-tab" role="tab" aria-selected="false">Especificações</button>
  <button class="ds-tab" role="tab" aria-selected="false">Suporte</button>
</div>

<div class="ds-tab-pane is-active">...</div>
<div class="ds-tab-pane">...</div>
```

## Variants

- Sizes: `.ds-tabs-sm` (36h) / default (46h) / `.ds-tabs-lg` (54h)
- Style: (default · underline) / `.ds-tabs-pill` (rounded pill · active filled)
- Count badge: `.ds-tab-count` inside tab button

## Accessibility

- `role="tablist"` no wrapper · `role="tab"` em buttons · `aria-selected` flag
- Keyboard: arrow left/right pra navegar entre tabs (consumer wires JS)
- `aria-controls` pra referenciar `.ds-tab-pane id`
- Focus ring visível em `:focus-visible`

## Migration map (Phase H.12)

| Origin | Replace with |
|---|---|
| `.pdp-tabs` (46h underline) | `.ds-tabs` (default) |
| `.pdp-tab` | `.ds-tab` |
| `.pdp-tab.active` | `.ds-tab.is-active` |
| `.pdp-tab-count` | `.ds-tab-count` |
| `.pdp-tab-pane` | `.ds-tab-pane` |
| `.admin-tabs` | `.ds-tabs` |
| `.dash-products-tabs` (pill style) | `.ds-tabs .ds-tabs-pill` |
| `.notif-drawer-tabs` (small) | `.ds-tabs .ds-tabs-sm` |

## Related

- `.ds-pill` — chip-like single state (não tab navegação)
- `.ds-btn-ghost` — botões de filtro alternativos
