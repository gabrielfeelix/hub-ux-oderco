# DS · Cards

> Source: [`cards.css`](./cards.css) · Catalog: [#cards](../catalog.html#cards)

## Quando usar

Container genérico de conteúdo agrupado · listings, settings, dashboard widgets, info panels.

## Quando NÃO usar

- Modal/dialog → use `.ds-card-lg` + sombra forte ou wrapper específico
- Auth shell → tem `.auth-shell` próprio (grid 1180×680 com brand panel)
- Card de produto/cliente com layout específico → defina feature class (`.prod-card`, `.client-card`)

## Variants

| Class | Border-radius | Shadow | Uso |
|---|---|---|---|
| `.ds-card` | 12px | `--shadow-sm` | Default |
| `.ds-card .ds-card-lg` | 16px | `--shadow-sm` | Card grande, modal |
| `.ds-card .ds-card-shadow` | 12px | `--shadow-card` | Hover state, destaque |

## Composição esperada

`.ds-card` é só wrapper · você adiciona padding/contents inline ou via classe própria. Sem padding default (pra dar flexibilidade).

## Tokens consumidos

- `--color-surface-card` · bg
- `--color-border-default` · border
- `--r-card` (12px) · `--r-card-lg` (16px)
- `--shadow-sm` · `--shadow-card`

## Accessibility

- `.ds-card` é container puro · use semântica correta no conteúdo:
  - Lista de cards → `<ul><li>`
  - Card clicável (toda área) → wrap em `<a>` ou `<button>` ou `tabindex="0"` + `role="button"` + keyboard handlers
  - Card com heading → `<h2>/<h3>` dentro

## Examples

```html
<!-- Card simples -->
<div class="ds-card" style="padding:16px;">
  <h3 class="ds-h3">Total de orçamentos</h3>
  <p class="ds-p">14 ativos · 32 finalizados</p>
</div>

<!-- Card grande -->
<div class="ds-card ds-card-lg" style="padding:24px;">
  <h2 class="ds-h2">Configurações</h2>
  ...
</div>

<!-- Card com sombra (destaque/hover) -->
<div class="ds-card ds-card-shadow" style="padding:18px;">
  <h3 class="ds-h3">Em destaque</h3>
  ...
</div>

<!-- Card clicável (semântica correta) -->
<a href="#detalhes" class="ds-card" style="padding:16px;display:block;">
  ...
</a>
```

## Related

- [Cascade architecture](../README.md#cascade-architecture-layer) — features podem override .ds-card via @layer features
