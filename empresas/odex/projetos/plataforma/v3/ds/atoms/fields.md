# DS · Fields

> Source: [`fields.css`](./fields.css) · Catalog: [#fields](../catalog.html#fields)

## Quando usar

Wrapper de label + input/select para criar campos de formulário consistentes.

## Quando NÃO usar

- Input standalone sem label (rarissimo, prefira sempre com label)
- Forms de auth — usam markup próprio (label `.ds-field-label` + `.auth-input-wrap` direto)

## Components

| Class | Função |
|---|---|
| `.ds-field` | Container coluna · gap 8px entre label e input |
| `.ds-field-inline` | Container linha · gap 24px · label tem min-width 96px |
| `.ds-field-label` | Label do campo · navy, 14px, margin-bottom 8 (não usado em ds-field-inline) |
| `.ds-field-label .req` | Marker `*` em red, margin-left 2 |

## Tokens consumidos

- `--color-text-label` · cor do label (navy)
- `--color-feedback-error-strong` · cor do `*` required (red)
- `--font` · Inter
- (gap/margin valores hardcoded · TODO substituir por --space-*)

## Accessibility

- Label DEVE ter `for="..."` matching input `id="..."` OU wrap o input
- Marker `*` é visual · sempre acompanhar de `aria-required="true"` no input
- Para erro de validação, use `<p class="ds-p3" style="color:var(--color-feedback-error-strong)">` abaixo do campo + `aria-describedby` apontando pra ele

## Examples

```html
<!-- Stacked (default) -->
<div class="ds-field">
  <label class="ds-field-label" for="nome">
    Nome <span class="req">*</span>
  </label>
  <input id="nome" class="ds-input" required aria-required="true" />
</div>

<!-- Inline -->
<div class="ds-field-inline">
  <label class="ds-field-label" for="status">Status</label>
  <select id="status" class="ds-select">
    <option>Aprovado</option>
    <option>Pendente</option>
  </select>
</div>

<!-- Com erro (markup convencional) -->
<div class="ds-field">
  <label class="ds-field-label" for="email">E-mail</label>
  <input id="email" class="ds-input" aria-invalid="true"
         aria-describedby="email-error" />
  <p id="email-error" class="ds-p3"
     style="color:var(--color-feedback-error-strong);margin:0;">
    Formato inválido
  </p>
</div>
```

## Related

- [Inputs](./inputs.md) — o input dentro do field
- [Typography](./typography.md) — `.ds-field-label` herda da escala
