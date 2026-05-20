# DS · Buttons

> Source: [`buttons.css`](./buttons.css) · Catalog: [#buttons](../catalog.html#buttons)

## Quando usar

Toda ação que muda estado do sistema (salvar, cancelar, criar, excluir). Use a variant que comunica corretamente a intenção e o risco.

## Quando NÃO usar

- Navegação (use `<a>` com `.ds-link` ou link estilizado)
- Toggle states (use checkbox/radio/switch)
- Pílulas de status passivo (use `.ds-pill-*`)

## Variants

| Class | Visual | Quando usar |
|---|---|---|
| `.ds-btn .ds-btn-primary` | Blue solid | CTA principal da tela. **Apenas um** primary por contexto. |
| `.ds-btn .ds-btn-primary-navy` | Navy solid | CTA principal sobre bg claro quando blue conflita com brand |
| `.ds-btn .ds-btn-secondary` | Outline blue | Ação secundária próxima do CTA primary |
| `.ds-btn .ds-btn-secondary-navy` | Outline navy | Secundária em contexto navy |
| `.ds-btn .ds-btn-ghost` | Outline neutro | Cancelar, fechar, voltar |
| `.ds-btn .ds-btn-danger` | Outline red | Excluir, cancelar pedido, reverter |
| `.ds-btn .ds-btn-danger-soft` | Outline rosa pálido (disabled-look) | Danger disabled state · não clicável |

## Sizes

| Class | Height / Font | Uso |
|---|---|---|
| `.ds-btn-sm` | 32h / 12px | Toolbars compactas, filtros, ações secundárias inline |
| (default) | 42h / 14px | Padrão |
| `.ds-btn-lg` | 48h / 16px | Hero CTAs, forms grandes |

Auth tem variant própria `.auth-submit` (48h com box-shadow) — não use `.ds-btn-lg` lá.

## States

| State | Behavior |
|---|---|
| `:hover` | Background ou border muda · transition `--motion-default` (150ms) |
| `:disabled` | `opacity: .55` + `cursor: not-allowed` |
| `:active` | Sem animação custom · browser default |
| `:focus-visible` | `--shadow-focus-blue` (3px blue glow) · `--shadow-focus-error` em danger |

## Pílulas especiais (CTA destacado)

| Class | Visual | Uso |
|---|---|---|
| `.ds-btn .ds-pill-warm` | Amarelo + glow warm | "Tornar Pedido", conversão |
| `.ds-btn .ds-pill-cool` | Slate + glow cool | "Ir para produtos", navegação destacada |

## Tokens consumidos

- `--color-action-*` (todas as cores de fg/bg/border por variant)
- `--r-form` · 4px radius
- `--font` · Inter
- `--motion-default` · transition

## Accessibility

- Sempre prefira `<button>` para ações, `<a>` para navegação
- Disabled buttons recebem `disabled` attr · screen reader anuncia "disabled"
- Ícones decorativos: `aria-hidden="true"` no `<i>`. Ícones funcionais (sem label): `aria-label="..."`
- ✅ Focus ring via `:focus-visible` · keyboard nav OK
- Contrast: danger fg agora usa `--red-700` (6.58:1 AA) · veja [a11y.md](../a11y.md)

## Examples

```html
<!-- CTA + secundária -->
<button class="ds-btn ds-btn-primary">Salvar</button>
<button class="ds-btn ds-btn-ghost">Cancelar</button>

<!-- Danger -->
<button class="ds-btn ds-btn-danger">Excluir pedido</button>

<!-- Sizes -->
<button class="ds-btn ds-btn-primary ds-btn-sm">Filtrar</button>
<button class="ds-btn ds-btn-primary ds-btn-lg">Finalizar</button>

<!-- Pílula especial -->
<a class="ds-btn ds-pill-warm" href="#novo-pedido">Tornar Pedido</a>
```

## Related

- [Links](./links.md) — para navegação não-CTA
- [Pills](./pills.md) — para status (não interativo)
- Auth submit (`features/auth/auth.css`) — variant own pra CTAs de auth
