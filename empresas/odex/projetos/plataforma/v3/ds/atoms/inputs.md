# DS · Inputs

> Source: [`inputs.css`](./inputs.css) · Catalog: [#inputs](../catalog.html#inputs)

## Quando usar

Captura de dados do usuário em forms padrão da app.

## Quando NÃO usar

- Forms de auth — use `.auth-input-wrap` (input-group com ícone)
- Dropdown rico de filtros/Monte Kit — use `.odex-select` (via `<select class="ds-replace">`)
- Search bars em toolbars — features têm classes próprias (`.list-toolbar-search`)

## Variants

| Class | Height / Font | Uso |
|---|---|---|
| `.ds-input` | 42h / 16px | Default · forms standard |
| `.ds-input-sm` | 38h / 14px | Forms compactos, filtros |
| `.ds-textarea` | min 96h / 16px | Texto multi-linha · resize vertical |
| `.ds-select` | 42h / 16px | Select nativo com chevron SVG |

## States

| State | Behavior |
|---|---|
| Default | border `--color-border-default` (#E6E6E6) |
| `:focus` | border `--color-border-focus` (blue) + ring `--shadow-focus-blue` |
| `:disabled` | bg `--color-surface-sunken` + color `--color-text-disabled` |
| `::placeholder` | color `--color-text-placeholder` |

## Tokens consumidos

- `--color-border-default` · border padrão
- `--color-border-focus` · border focus
- `--color-surface-card` · bg
- `--color-surface-sunken` · bg disabled
- `--color-text-default` · cor digitada
- `--color-text-placeholder` · cor placeholder
- `--color-text-disabled` · cor disabled
- `--shadow-focus-blue` · ring de focus
- `--motion-default` · transition

## Accessibility

- Sempre associe `<label>` ao input via `for=...` matching `id=...` (ou wrap o input no label)
- Use `aria-required="true"` em campos obrigatórios (além do `*` visual)
- Use `aria-invalid="true"` em erro · combine com mensagem `aria-describedby`
- `<input>` nunca em-tela sem label visível ou aria-label
- Focus ring é visível · OK pra keyboard nav
- Contraste placeholder cumpre 4.5:1 sobre white

## Examples

```html
<!-- Input standalone (raro · prefere ds-field) -->
<input class="ds-input" placeholder="Buscar..." />

<!-- Com label via ds-field -->
<div class="ds-field">
  <label class="ds-field-label" for="email">
    E-mail <span class="req">*</span>
  </label>
  <input id="email" class="ds-input" type="email"
         placeholder="seu@email.com" required />
</div>

<!-- Disabled -->
<input class="ds-input" disabled value="Read-only" />

<!-- Textarea -->
<textarea class="ds-textarea" placeholder="Observações..."></textarea>

<!-- Select nativo (DS) ou custom (odex-select) -->
<select class="ds-select">...</select>
<select class="ds-replace">...</select>  <!-- vira .odex-select via JS -->
```

## Related

- [Fields](./fields.md) — label + input wrapper
- [Odex-Select](../molecules/select.md) — dropdown custom rico
- Auth inputs (`features/auth/auth.css` · `.auth-input-wrap`) — input-group com ícone
