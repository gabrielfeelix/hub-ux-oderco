# DS · Menu

> Source: [`menu.css`](./menu.css) · Catalog: [#menu](../catalog.html#menu)

## Quando usar

Dropdown **contextual** em toolbars · filtros multi-grupo, ordenação, ações de bulk. Suporta sections (headers), items com label + descrição, separador e checkmark de item selecionado.

## Quando NÃO usar

- Form select (single value) → use `.odex-select` (.ds-replace)
- Menu de navegação principal → use sidebar/topbar pattern (feature)
- Submenu profundo (cascading) → não suportado · use modal ou nova tela

## Anatomy

```
.ds-menu                       ← container · position relative
├── .ds-menu-trigger           ← botão que abre (use .ds-btn-ghost.ds-menu-trigger)
└── .ds-menu-popover           ← popover absoluto · oculto até .open
    ├── .ds-menu-section       ← header de grupo · "STATUS", "PERÍODO"
    ├── .ds-menu-item          ← item clicável · grid 3-col (icon | text | check)
    │   ├── <span>             ← icon slot (optional)
    │   ├── <span>label</span> ← texto + opcional <small>descrição</small>
    │   └── .ds-menu-check     ← ✓ se selected
    ├── .ds-menu-item.is-selected   ← bold + cor link + check visível
    └── .ds-menu-sep            ← divider 1px
```

Abrir: adicione `.open` no container `.ds-menu` (toggle via JS).

## States

| State | Behavior |
|---|---|
| Closed | Popover hidden (opacity 0, scale .98, pointer-events none) |
| `.open` | Popover visible (opacity 1, scale 1, pointer-events auto) |
| Item `:hover` | bg `--color-action-secondary-bg-hover` (blue-50) |
| Item `.is-selected` | color link + bold + check ✓ |

## Tokens consumidos

- `--color-surface-card` · popover bg
- `--color-border-default` · popover border + separator
- `--color-text-strong` / `-muted` / `-link` · cores
- `--color-action-secondary-bg-hover` · item hover
- `--motion-fast` / `-default`
- `--z-dropdown` (100) · z-index
- `--r-form`

## Accessibility

- Trigger deve ter `aria-haspopup="menu"` e `aria-expanded="true|false"`
- Popover deve ter `role="menu"`
- Items devem ter `role="menuitem"`
- Items `.is-selected` adicionam `aria-current="true"`
- **Falta:** keyboard nav (arrow keys, Enter, Esc, Tab close) · TODO Phase C.8
- **Falta:** Focus trap quando aberto · TODO

## Examples

```html
<div class="ds-menu" id="filtros-menu">
  <button class="ds-btn ds-btn-ghost ds-menu-trigger"
          aria-haspopup="menu" aria-expanded="false"
          onclick="document.getElementById('filtros-menu').classList.toggle('open')">
    Filtrar por ▾
  </button>

  <div class="ds-menu-popover" role="menu">
    <div class="ds-menu-section">Status</div>
    <button class="ds-menu-item is-selected" role="menuitem" aria-current="true">
      <span></span>
      <span>Aprovado</span>
      <span class="ds-menu-check">
        <i data-lucide="check" style="width:14px;height:14px;"></i>
      </span>
    </button>
    <button class="ds-menu-item" role="menuitem">
      <span></span>
      <span>Pendente</span>
      <span class="ds-menu-check"></span>
    </button>

    <div class="ds-menu-sep"></div>

    <div class="ds-menu-section">Período</div>
    <button class="ds-menu-item" role="menuitem">
      <span></span>
      <span>Últimos 30 dias <small>até hoje</small></span>
      <span class="ds-menu-check"></span>
    </button>
  </div>
</div>
```

## Related

- [Odex-Select](./select.md) — select form, não toolbar
- [Buttons · ghost](../atoms/buttons.md) — trigger usa .ds-btn-ghost
