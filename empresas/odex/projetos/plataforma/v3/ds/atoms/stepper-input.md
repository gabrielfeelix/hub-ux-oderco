# `.ds-stepper-input` (atom)

> Source: [`stepper-input.css`](./stepper-input.css)
> Phase H.11 · consolida **3 DUPES** (pdp-qty, qty-stepper, cart-qty).

## Quando usar

Quantity stepper · botões - / + flanqueando valor central. Pra cart items, PDP add-to-cart, mk kit quantities.

## Quando NÃO usar

- Numeric input livre → use `<input type="number">` com `.ds-input`
- Slider de range → use `<input type="range">` com `.ds-slider` (futuro)

## API

```html
<div class="ds-stepper-input" role="group" aria-label="Quantidade">
  <button type="button" aria-label="Diminuir">−</button>
  <span class="ds-stepper-input-value">1</span>
  <button type="button" aria-label="Aumentar">+</button>
</div>
```

## Variants

### Sizes (via custom props)
- `.ds-stepper-input-sm` (28h · 22 btn · 11 val · cart drawer)
- `.ds-stepper-input-md` (36h · default · product-card)
- `.ds-stepper-input-lg` (48h · PDP add-to-cart)

### Style
- (default) — white bg + borders
- `.ds-stepper-input-filled` — soft bg + no internal borders (PDP pattern)

## Accessibility

- Wrap em `role="group"` + `aria-label`
- Buttons precisam de `aria-label` ("Diminuir quantidade", "Aumentar")
- Value should have `aria-live="polite"` se mudar dinamicamente
- Disabled state em botões quando hit min/max

## Migration map (Phase H.11)

| Origin | Replace with |
|---|---|
| `.pdp-qty` (48h soft filled) | `.ds-stepper-input .ds-stepper-input-lg .ds-stepper-input-filled` |
| `.qty-stepper` (36h white border) | `.ds-stepper-input .ds-stepper-input-md` (default) |
| `.cart-qty` (28h white border) | `.ds-stepper-input .ds-stepper-input-sm` |
| `.pdp-qty button` / `.qty-stepper button` / `.cart-qty button` | `.ds-stepper-input button` |
| `.pdp-qty span` / `.qty-stepper span` / `.cart-qty span` | `.ds-stepper-input-value` |

## Related

- `.ds-btn` — actions próximos (add to cart, remove)
- `.ds-icon-btn` — single-action btn quando não é stepper
