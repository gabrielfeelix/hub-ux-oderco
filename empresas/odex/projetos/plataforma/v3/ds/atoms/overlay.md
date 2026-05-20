# `.ds-overlay` (atom)

> Source: [`overlay.css`](./overlay.css)
> Created: Phase H.4 (2026-05-20) · consolida **7 DUPES** (modal-overlay, cart-overlay, notif-drawer-overlay, novas-overlay, ped-resumo-overlay, de-chat-mask, help-modal-mask).

## Quando usar

Backdrop fixo cobre toda viewport · escurece + blurra conteúdo abaixo · clicável pra dismissar modal/drawer. Sempre par com modal ou drawer.

## Quando NÃO usar

- Sem blocking content abaixo → não precisa overlay (use só dropdown/popover)
- Loading state inline → use spinner local, não overlay
- Tooltip/popover → usa `z-popover` + sem backdrop

## API

```html
<!-- Default modal backdrop -->
<div class="ds-overlay" onclick="closeModal()"></div>

<!-- Drawer backdrop (lighter tint) -->
<div class="ds-overlay ds-overlay-tint-medium" onclick="closeDrawer()"></div>

<!-- Chat-style dark mask -->
<div class="ds-overlay ds-overlay-tint-chat ds-overlay-blur-sm" onclick="closeChat()"></div>
```

Toggle: add/remove `.is-open` (preferido) ou `.open` (legacy compat) via JS.

```js
overlay.classList.add('is-open');
// ...
overlay.classList.remove('is-open');
```

## Variants

### Blur intensity
- `.ds-overlay-blur-sm` (2px · subtle · drawers que mantém contexto visual)
- `.ds-overlay-blur-md` (4px · **default** · modal/cart)
- `.ds-overlay-blur-lg` (8px · forte · cobertura total)
- `.ds-overlay-blur-none` (sem blur · pra browsers sem support ou perf-sensitive)

### Tint intensity
- `.ds-overlay-tint-soft` (navy .20 · sub-menus)
- `.ds-overlay-tint-medium` (navy .32 · drawers · default consistente)
- `.ds-overlay-tint-strong` (navy .45 · modais críticos)
- `.ds-overlay-tint-chat` (dark navy .42 · de-chat/help)

### Z-index intent
- `.ds-overlay-z-dropdown` (100)
- `.ds-overlay-z-sticky` (200)
- `.ds-overlay-z-overlay` (300 · **default**)
- `.ds-overlay-z-popover` (400)

## States

- (closed) — opacity 0 + pointer-events none (não intercepta clicks)
- `.is-open` / `.open` — opacity 1 + pointer-events auto + clickable

## Accessibility

- Click handler obrigatório (dismiss via clique-fora)
- Modal/drawer associado precisa de:
  - `role="dialog"` ou `role="alertdialog"`
  - `aria-modal="true"`
  - focus-trap no modal (não no overlay)
  - ESC key fecha (consumer wires)
- Overlay em si é decorativo · não recebe focus

## Examples

```html
<!-- Modal completo -->
<div class="ds-overlay is-open" onclick="closeModal()" aria-hidden="true"></div>
<div class="modal is-open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h3 id="modal-title">Confirmar ação</h3>
  ...
</div>

<!-- Cart drawer (right-slide) -->
<div class="ds-overlay ds-overlay-tint-medium" onclick="closeCart()"></div>
<aside class="cart" role="dialog" aria-modal="true" aria-label="Carrinho">...</aside>

<!-- De-chat mask (dark + light blur) -->
<div class="ds-overlay ds-overlay-tint-chat ds-overlay-blur-sm" onclick="closeDeChat()"></div>
<div class="de-chat-panel" role="dialog">...</div>
```

## Migration map (Phase H.4)

| Origin | Replace with |
|---|---|
| `.modal-overlay` (navy .45 · blur 4 · z 200 → 300) | `.ds-overlay .ds-overlay-tint-strong` (z-overlay 300 default) |
| `.cart-overlay` (gray .4 · blur 4 · z 40 → 300) | `.ds-overlay .ds-overlay-tint-medium` (legacy z 40 fica) |
| `.notif-drawer-overlay` (navy .32 · blur 4 · z 300) | `.ds-overlay .ds-overlay-tint-medium` |
| `.novas-overlay` (navy .32 · blur 2 · z 300) | `.ds-overlay .ds-overlay-tint-medium .ds-overlay-blur-sm` |
| `.ped-resumo-overlay` (navy .45 · blur 4 · z 300) | `.ds-overlay .ds-overlay-tint-strong` |
| `.de-chat-mask` (dark .42 · blur 2 · z 110) | `.ds-overlay .ds-overlay-tint-chat .ds-overlay-blur-sm` |
| `.help-modal-mask` (dark .42 · blur 2 · z 100) | `.ds-overlay .ds-overlay-tint-chat .ds-overlay-blur-sm .ds-overlay-z-dropdown` |

## Related

- `.ds-modal` (futuro) — dialog content que pareia com overlay
- `.ds-drawer` (futuro) — side panel slide-in
