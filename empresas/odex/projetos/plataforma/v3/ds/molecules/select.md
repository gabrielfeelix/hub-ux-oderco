# DS · Odex-Select

> Source: [`select.css`](./select.css) · Catalog: [#select](../catalog.html#select)

## Quando usar

Dropdown rico em formulários/filtros que precisam:
- Visual mais polido que `<select>` nativo
- Customização de opções (icons, descrições · não suportado por nativo)
- Comportamento consistente cross-browser

## Quando NÃO usar

- Forms simples onde nativo basta — use `.ds-select`
- Multi-select — não suportado (TODO)
- Combobox/autocomplete — não suportado (TODO)

## Como funciona

Marca o `<select>` nativo com classe `.ds-replace`. JavaScript (`applyOdexSelects(scope?)`) constrói wrapper `.odex-select` com trigger + menu + options. Sincroniza valor com select original (que fica `display: none`).

Pattern progressivo:
1. Markup envia `<select>` válido (acessível, funciona sem JS)
2. JS substitui visualmente quando carrega
3. Submit do form ainda usa o `<select>` original

## Anatomy

```
<select class="ds-replace">  ← original (escondido após apply)
└── (gerado dinamicamente:)
    .odex-select
    ├── .odex-select-trigger
    │   ├── .odex-select-label
    │   └── ::after (chevron via border rotate)
    └── .odex-select-menu (popover)
        └── .odex-select-option (× N)
            ├── <span>texto</span>
            └── .odex-select-option-check (✓ se ativo)
```

## States

| State | Behavior |
|---|---|
| Default closed | Trigger border default |
| `:hover` (trigger) | Border `--color-border-hover` |
| `:focus` (trigger) | Border `--color-border-focus` + ring `--shadow-focus-blue` |
| `.is-open` | Trigger border focus + chevron rotaciona 180° · menu fade-in |
| `.is-placeholder` | Trigger label color `--color-text-placeholder` |
| Option `:hover` | bg `--color-surface-page` |
| Option `.is-active` | bg `--color-surface-info` + color `--color-text-link` + bold + check ✓ |

## Tokens consumidos

- `--color-border-default` / `-hover` / `-focus`
- `--color-surface-card` · trigger e menu bg
- `--color-surface-info` · option ativa bg
- `--color-text-default` / `-strong` / `-link` / `-placeholder` / `-muted`
- `--shadow-focus-blue`
- `--motion-fast` / `-default` / `-medium`
- `--easing-default`
- `--z-sticky` (200) · z-index do menu
- `--r-form`

## Accessibility

- Trigger é `<button>` com `aria-haspopup="listbox"` e `aria-expanded="true|false"`
- Menu é `<div role="listbox">`
- Options são `<button role="option">`
- ✅ Focus visible via `:focus-visible` no trigger e nas options
- **Falta:** `aria-selected` no option ativo · TODO C.8.1
- **Falta:** keyboard nav (arrow keys, Enter, Esc) · TODO C.8.1 · ver [a11y.md](../a11y.md)

## Examples

```html
<select class="ds-replace">
  <option value="" disabled selected>Selecione</option>
  <option value="solar">Energia Solar</option>
  <option value="bess">BESS</option>
  <option value="eletro">Eletroposto</option>
</select>

<script>
  applyOdexSelects(); // aplica em todos .ds-replace do document
  // ou applyOdexSelects(scopeEl); // aplica só dentro de scopeEl
</script>
```

## Helper JS

`applyOdexSelects(scope?)` é definido inline em `index.html` (e replicado em `ds/catalog.html` pra demo standalone). Marca `data-odex-applied="1"` no select original pra evitar dupla aplicação.

## Related

- [Inputs · ds-select](../atoms/inputs.md) — select nativo simples (alternativa leve)
- [DS-Menu](./menu.md) — dropdown contextual de toolbar (não substitui select)
