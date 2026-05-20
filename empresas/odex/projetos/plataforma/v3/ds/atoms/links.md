# DS · Links

> Source: [`links.css`](./links.css) · Catalog: [#links](../catalog.html#links)

## Quando usar

Navegação textual entre páginas/hashes. Ações secundárias inline ("Ver mais", "Saiba mais").

## Quando NÃO usar

- CTA principal — use `.ds-btn`
- Auth microcopy ("Esqueci minha senha") — use `.auth-link` (sem underline default, font 13px)
- Texto sem ação — use typography

## Variants

| Class | Size | Cor | Underline |
|---|---|---|---|
| `.ds-link` | 12px | blue (link) | sim |
| `.ds-link.ds-link-14` | 14px | blue | sim |
| `.ds-link.ds-link-16` | 16px | blue | sim |
| `.ds-link.ds-link-navy` | inherit | navy | sim |

## States

| State | Behavior |
|---|---|
| `:hover` | `opacity: .8` (subtle fade) |
| `:visited` | Sem distinção · cor mantida |

## Tokens consumidos

- `--color-text-link` · blue
- `--color-text-strong` · navy (link-navy variant)
- `--font` · Inter

## Accessibility

- Texto do link deve ser descritivo (NUNCA "clique aqui")
- Se link abrir em nova aba: adicione `target="_blank" rel="noopener noreferrer"` + indicador visual (ícone external)
- Contraste WCAG AA atendido com `--color-text-link` sobre `--color-surface-card`

## Examples

```html
<!-- Link inline -->
<p class="ds-p">
  Veja os <a href="#detalhes" class="ds-link ds-link-14">detalhes do pedido</a>.
</p>

<!-- Link navy (em hero ou contexto destacado) -->
<a href="#" class="ds-link ds-link-16 ds-link-navy">Voltar à plataforma</a>
```

## Related

- [Buttons](./buttons.md) — para ações de mudança de estado
- Auth link (`features/auth/auth.css` · `.auth-link`) — variant específica do form de auth
