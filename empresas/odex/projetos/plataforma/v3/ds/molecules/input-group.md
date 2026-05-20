# DS · Input Group

> Source: [`input-group.css`](./input-group.css) · Catalog: [#input-group](../catalog.html#input-group)

## Quando usar

Input/select com ícone à esquerda (decorativo · sugere intent), opcional ícone/botão à direita (reveal de senha, clear, dropdown chevron customizado).

## Quando NÃO usar

- Input simples sem ícone → use [`.ds-input`](../atoms/inputs.md) direto
- Dropdown custom rico → use [`.odex-select`](./select.md) (molecule com keyboard + ARIA)
- Search com botão submit dentro → componente próprio (TODO)

## Anatomy

```
.ds-input-group           ← container · border + focus-within ring
├── .ds-input-group-icon          ← (opcional) left, decorativo
├── <input> ou <select>           ← child obrigatório · 42h default
├── .ds-input-group-icon-right    ← (opcional) right, decorativo
└── .ds-input-group-reveal        ← (opcional) right, button interativo
```

Quando há ícone à esquerda, `<input>` recebe `padding-left: 42px` automaticamente via `:has(.ds-input-group-icon)`.

## Variants

| Class | Effect |
|---|---|
| `.ds-input-group` (default) | 42h / 16px (matching `.ds-input`) |
| `.ds-input-group .ds-input-group-lg` | 44h / 15px (pattern auth) |

## States

| State | Behavior |
|---|---|
| Default | Border `--color-border-default` |
| `:focus-within` | Border `--color-border-focus` + ring `--shadow-focus-blue` · ícone esquerdo vira azul |
| `.ds-input-group-reveal:hover` | bg `--color-surface-sunken` + color strong |
| `.ds-input-group-reveal:focus-visible` | bg sunken + ring 2px azul |

## Tokens consumidos

- `--color-surface-card` · bg
- `--color-border-default` / `-focus` · borders
- `--color-text-default` / `-muted` / `-strong` / `-placeholder`
- `--shadow-focus-blue`
- `--motion-fast` / `-medium`
- `--r-form` / `--r-circle`
- `--fs-15` / `--fs-16`

## Accessibility

- Ícone à esquerda decorativo → marca `aria-hidden="true"` no `<i>` ou wrap span
- Ícone à direita decorativo → idem
- `.ds-input-group-reveal` (toggle senha) → adicione `aria-label="Mostrar senha"` ou similar
- Focus visible no input via `:focus-within` no container (ring no pai), no reveal button via `:focus-visible` próprio
- O `:has()` selector requer Chrome 105+ / Firefox 121+ / Safari 15.4+ · suportado em todos browsers que rodam o DS

## Examples

```html
<!-- Input com ícone esquerdo (auth-style) -->
<div class="ds-input-group ds-input-group-lg">
  <i data-lucide="user" class="ds-input-group-icon" aria-hidden="true"
     style="width:16px;height:16px;"></i>
  <input type="email" placeholder="seu@email.com" />
</div>

<!-- Input senha com reveal -->
<div class="ds-input-group ds-input-group-lg">
  <i data-lucide="lock" class="ds-input-group-icon" aria-hidden="true"
     style="width:16px;height:16px;"></i>
  <input type="password" id="senha" />
  <button type="button" class="ds-input-group-reveal"
          aria-label="Mostrar senha"
          onclick="togglePassword('senha')">
    <i data-lucide="eye" style="width:16px;height:16px;"></i>
  </button>
</div>

<!-- Default size (42h matching ds-input) -->
<div class="ds-input-group">
  <i data-lucide="search" class="ds-input-group-icon" aria-hidden="true"></i>
  <input type="search" placeholder="Buscar..." />
</div>

<!-- Sem ícone esquerdo (só border + focus-within ring) -->
<div class="ds-input-group">
  <input type="text" placeholder="..." />
  <i data-lucide="info" class="ds-input-group-icon-right" aria-hidden="true"></i>
</div>
```

## Related

- [Inputs · `.ds-input`](../atoms/inputs.md) — input atomic sem container
- [Fields](../atoms/fields.md) — label + input wrapper
- [Auth feature](../../features/auth/README.md) — usa `.ds-input-group .ds-input-group-lg`
