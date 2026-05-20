# `.ds-form-grid` (atom)

> Source: [`form-grid.css`](./form-grid.css)
> Phase H.19 · consolida **4 DUPES** (.ck-grid, .nc-grid, .ov-grid-2, .mk-grid).

## API

```html
<div class="ds-form-grid ds-form-grid-2">
  <div class="ds-field">Nome</div>
  <div class="ds-field">Sobrenome</div>
  <div class="ds-field ds-form-grid-field-full">Endereço (span full)</div>
  <div class="ds-field">Cidade</div>
  <div class="ds-field">UF</div>
</div>

<!-- Asymmetric · 2fr 1fr -->
<div class="ds-form-grid ds-form-grid-21">
  <div class="ds-field">Logradouro</div>
  <div class="ds-field">Número</div>
</div>
```

## Variants

- Cols: `.ds-form-grid-{1,2,3,4}` (custom prop `--ds-form-grid-cols`)
- Asymmetric: `.ds-form-grid-21` (2fr 1fr) · `.ds-form-grid-31` (3fr 1fr) · `.ds-form-grid-city` (1fr 100px · UF)
- Span: `.ds-form-grid-field-full` (1/-1) · `.ds-form-grid-field-half` (span 1)
- Gap: custom prop `--ds-form-grid-gap` (default 14px)

## Responsive

Auto-collapse pra 1 coluna em < 600px (mobile).

## Migration map

| Origin | Replace with |
|---|---|
| `.ck-grid-2` / `.ck-grid-3` | `.ds-form-grid .ds-form-grid-{2,3}` |
| `.ck-grid-city` | `.ds-form-grid .ds-form-grid-city` |
| `.nc-grid-2` / `.nc-grid-3` | `.ds-form-grid .ds-form-grid-{2,3}` |
| `.ov-grid-2` / `.ov-grid-3-1` | `.ds-form-grid .ds-form-grid-{2,31}` |
| `.mk-v3-grid-2` | `.ds-form-grid .ds-form-grid-2` |
