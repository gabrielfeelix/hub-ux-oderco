# `.ds-link-back` (atom)

> Source: [`link-back.css`](./link-back.css)
> Phase H.15 · consolida **5 DUPES** (orc-back, ped-detail-back, pv-back, client-back-btn, auth-back).

## API

```html
<button class="ds-link-back" onclick="history.back()">
  <i data-lucide="arrow-left"></i> Voltar
</button>
```

## Variants

- Sizes: `.ds-link-back-sm` (12) / default (13) / `.ds-link-back-lg` (14)
- `.ds-link-back-outlined` — button-like com border (client-back-btn pattern)

## A11y

- Use `<button>` se trigger JS, `<a>` se navigation real
- Arrow icon decorativo · `aria-hidden="true"`
- Hover slide animation respeitada (não excessiva pra reduced-motion)

## Migration map

| Origin | Replace with |
|---|---|
| `.orc-back` / `.ped-detail-back` / `.pv-back` / `.auth-back` | `.ds-link-back` |
| `.client-back-btn` (button outlined) | `.ds-link-back .ds-link-back-outlined` |
