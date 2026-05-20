# `.ds-card-selectable` (atom)

> Source: [`card-selectable.css`](./card-selectable.css)
> Phase H.16 · consolida **3 DUPES** (mk-kit-card, nc-tipo-opt, ov-radio-row).

## API

```html
<button class="ds-card-selectable is-selected" role="radio" aria-checked="true" type="button">
  <div class="ds-icon-box ds-icon-box-lg ds-icon-box-brand"><i data-lucide="zap"></i></div>
  <div>
    <strong>Fotovoltaico</strong>
    <small>Geração padrão on-grid</small>
  </div>
  <span class="ds-card-selectable-radio"></span>
</button>
```

## States

- `:hover` — border darker
- `:focus-visible` — blue ring
- `.is-selected` / `[aria-checked="true"]` — border + bg blue-50 + outer ring + radio fill

## Variants

- Sizes: `.ds-card-selectable-sm` / default / `.ds-card-selectable-lg`
- Layouts: (default · horizontal row) / `.ds-card-selectable-vertical`

## A11y

- Use `<button role="radio">` em radio group OR `<input type="radio" hidden>` + `<label class="ds-card-selectable">`
- `aria-checked` reflete state
- Group em `<div role="radiogroup" aria-labelledby="...">`
- Keyboard: arrow nav entre cards no group (consumer wires)

## Migration map

| Origin | Replace with |
|---|---|
| `.mk-kit-card` (kit type cards) | `.ds-card-selectable` |
| `.mk-kit-card-radio` | `.ds-card-selectable-radio` |
| `.mk-kit-card.is-selected` | `.ds-card-selectable.is-selected` |
| `.nc-tipo-opt` (novo cliente type) | `.ds-card-selectable` |
| `.ov-radio-row` (orçamento radio) | `.ds-card-selectable` |
