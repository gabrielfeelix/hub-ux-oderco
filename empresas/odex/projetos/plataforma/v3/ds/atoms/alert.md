# `.ds-alert` (atom)

> Source: [`alert.css`](./alert.css)
> Phase H.17 · consolida **4 DUPES** (orc-alert, mk-tax-alert, ckform-alert, admin-banner-alert).

## API

```html
<div class="ds-alert ds-alert-info" role="status">
  <span class="ds-alert-icon"><i data-lucide="info"></i></span>
  <div class="ds-alert-content">
    <strong>Dica tributária:</strong> Adicionar painéis ao kit BESS pode zerar o IPI de 15%.
  </div>
</div>

<!-- Com dismiss -->
<div class="ds-alert ds-alert-warning" role="alert">
  <span class="ds-alert-icon"><i data-lucide="alert-triangle"></i></span>
  <div class="ds-alert-content">Status pendente · ação necessária.</div>
  <button class="ds-alert-dismiss" aria-label="Fechar"><i data-lucide="x"></i></button>
</div>
```

## Tones

- `.ds-alert-info` (blue · default)
- `.ds-alert-success` (green)
- `.ds-alert-warning` (yellow)
- `.ds-alert-danger` / `.ds-alert-error` (red)
- `.ds-alert-neutral` (gray subtle)

## Sizes

- `.ds-alert-sm` (12px font · compact)
- default (13px)
- `.ds-alert-lg` (14px · prominent)

## A11y

- `role="status"` (info/success) ou `role="alert"` (warning/error)
- Icon decorativo · `aria-hidden="true"`
- Dismiss button precisa de `aria-label`

## Migration map

| Origin | Replace with |
|---|---|
| `.orc-alert` (yellow ·#FCDFB3 bg) | `.ds-alert .ds-alert-warning` |
| `.mk-tax-alert` (blue info) | `.ds-alert .ds-alert-info` |
| `.ckform-alert` | `.ds-alert .ds-alert-{tone}` |
| `.admin-banner-alert` | `.ds-alert .ds-alert-{tone}` |
