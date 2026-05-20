# DS · Checkbox / Radio

> Source: [`checkbox.css`](./checkbox.css) · Catalog: [#checkbox](../catalog.html#checkbox)

## Quando usar

- **Checkbox** — múltipla escolha independente (aceitar termos, filtros multi-select, opções de configuração)
- **Radio** — escolha única entre opções relacionadas (forma de pagamento, tipo de cliente)

## Quando NÃO usar

- 2 opções binárias UI-leve — considere switch/toggle (não temos ainda no DS)
- Lista de opções longa (10+) — use select dropdown
- Auth terms checkbox multi-linha — usa `.auth-check` (variant top-align)

## Markup convention

`<label class="ds-check"><input type="checkbox|radio"> Texto</label>`

O wrap `<label>` permite click no texto pra toggle. 18×18 hit target — atende WCAG (>24×24 com padding nativo do label).

## States

| State | Behavior |
|---|---|
| Default | Border `--color-border-default`, bg `--color-surface-card` |
| `:checked` | bg `--color-text-strong` (navy), border same, check icon em white |
| `:disabled` | Inherit + opacity (browser default) |
| `:focus` | Outline browser default · **TODO Phase C.8**: custom focus ring |

## Radio specific

Radios usam `border-radius: 50%`. Quando `:checked`, mostra dot centralizado em white (6×6).

## Tokens consumidos

- `--color-border-default` · border unchecked
- `--color-surface-card` · bg unchecked
- `--color-text-strong` · bg + border checked
- `--color-text-on-brand` · cor do check icon
- `--color-text-default` · cor do label
- `--motion-fast` · transition

## Accessibility

- Sempre wrap em `<label>` (semântica + hit target maior)
- Para radios, todos do mesmo grupo compartilham `name="..."`
- Para grupos relacionados, use `<fieldset>` + `<legend>` em vez de label individual genérico
- Required: adicione `required` attr · `aria-required="true"` redundante mas explícito
- **Focus state custom ausente** · keyboard nav usa outline browser (visível mas inconsistente) · TODO C.8

## Examples

```html
<!-- Checkbox simples -->
<label class="ds-check">
  <input type="checkbox" />
  Receber notificações
</label>

<!-- Checkbox required -->
<label class="ds-check">
  <input type="checkbox" required aria-required="true" />
  Li e aceito os termos
</label>

<!-- Radio group -->
<fieldset>
  <legend class="ds-field-label">Forma de pagamento</legend>
  <label class="ds-check">
    <input type="radio" name="pgto" value="pix" /> Pix
  </label>
  <label class="ds-check">
    <input type="radio" name="pgto" value="boleto" /> Boleto
  </label>
  <label class="ds-check">
    <input type="radio" name="pgto" value="cartao" /> Cartão
  </label>
</fieldset>
```

## Related

- [Inputs](./inputs.md) — outros tipos de input
- Auth check (`features/auth/auth.css` · `.auth-check`) — variant top-align multi-line
