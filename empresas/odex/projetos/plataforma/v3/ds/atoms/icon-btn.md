# `.ds-icon-btn` (atom)

> Source: [`icon-btn.css`](./icon-btn.css)
> Created: Phase H.1 (2026-05-20) · consolidando **10 DUPES** confirmadas
> Highest-DUPE atom no audit · atom #1 prioritário pra migração.

## Quando usar

Botões icon-only · onde o significado é carregado pelo ícone (não pelo texto). Sempre com `aria-label`.

Exemplos de uso:
- **Topbar actions** (notifications, settings, help · chrome.css)
- **Modal/drawer close** (×) — cart-close, modal-close, help-modal-close
- **Sidebar toggle** (hamburger)
- **Inline copy** (profile-copy-btn em row metadata)
- **Glass edits** (dash-hero-brand-edit, profile-cover-edit-btn — sobre brand bg)
- **Notif/badge anchors** (com red dot ou counter)

## Quando NÃO usar

- Botão CTA principal → use `.ds-btn` com label de texto
- Botão com icon + label → use `.ds-btn` (icon dentro)
- Avatar/foto-do-usuário clicável → use `.user-profile-btn` pattern, não icon-btn
- Action em row de tabela com label → use `.ds-btn-ghost-sm`

## Variants

### Shapes
- `.ds-icon-btn-square` (default · radius `--r-form` 4px)
- `.ds-icon-btn-circle` (radius 50% · close icons, profile)

### Sizes
- `.ds-icon-btn-sm` (28px) — inline copy, dense row
- `.ds-icon-btn-md` (34px) — default · topbar v2, sidebar-toggle
- `.ds-icon-btn-lg` (40px) — topbar v1, prominent action
- `.ds-icon-btn-xl` (48px) — PDP add-to-cart, primary CTA icon

### Tones
- (default) — white surface · muted icon → hover soft + ink
- `.ds-icon-btn-ghost` — transparent · use em topbar v2 chrome
- `.ds-icon-btn-soft` — bg `--color-surface-page` (cinza claro) → use em cart-close, modal-close
- `.ds-icon-btn-glass` — rgba white 16% sobre brand bg · use em hero brand edit, profile cover edit, help-modal-close
- `.ds-icon-btn-danger` — destructive red

## States

- `:hover` — soft bg + ink color
- `:focus-visible` — blue focus ring (`--shadow-focus-blue`)
- `:disabled` — opacity .45 + cursor not-allowed

## Slots

- `.ds-icon-btn-dot` — red 8×8 notif indicator (top-right · ringed em surface color)
- `.ds-icon-btn-badge` — number counter (16h min · -3/-3 corners)

## Accessibility

- **MUST** have `aria-label` (ícone não carrega texto acessível)
- `:focus-visible` ring obrigatório (já incluso)
- Slots `.ds-icon-btn-dot` e `.ds-icon-btn-badge` têm `pointer-events: none` (não interferem com click)
- Se for ação destrutiva use `.ds-icon-btn-danger` + `aria-label="Remover ..."`

## Examples

```html
<!-- Topbar notifications -->
<button class="ds-icon-btn ds-icon-btn-ghost ds-icon-btn-md" aria-label="Notificações">
  <i data-lucide="bell"></i>
  <span class="ds-icon-btn-dot"></span>
</button>

<!-- Topbar cart with counter -->
<button class="ds-icon-btn ds-icon-btn-ghost" aria-label="Carrinho · 3 itens">
  <i data-lucide="shopping-bag"></i>
  <span class="ds-icon-btn-badge">3</span>
</button>

<!-- Modal close -->
<button class="ds-icon-btn ds-icon-btn-circle ds-icon-btn-soft" aria-label="Fechar">
  <i data-lucide="x"></i>
</button>

<!-- Hero brand edit (sobre brand bg) -->
<button class="ds-icon-btn ds-icon-btn-glass ds-icon-btn-sm" aria-label="Editar marca">
  <i data-lucide="pencil"></i>
</button>

<!-- Inline copy -->
<button class="ds-icon-btn ds-icon-btn-ghost ds-icon-btn-sm" aria-label="Copiar email">
  <i data-lucide="copy"></i>
</button>

<!-- Sidebar toggle -->
<button class="ds-icon-btn ds-icon-btn-ghost ds-icon-btn-md" aria-label="Recolher menu lateral">
  <i data-lucide="menu"></i>
</button>
```

## Migration map (Phase H.1)

| Origin | Replace with |
|---|---|
| `.icon-btn` (chrome v1 · 40×40 circle) | `.ds-icon-btn .ds-icon-btn-circle .ds-icon-btn-lg` |
| `.icon-btn` (chrome v2 · 34×34 square) | `.ds-icon-btn .ds-icon-btn-ghost` |
| `.icon-btn .dot` | `.ds-icon-btn-dot` slot |
| `.sidebar-toggle` | `.ds-icon-btn .ds-icon-btn-ghost` |
| `.modal-close` | `.ds-icon-btn .ds-icon-btn-circle .ds-icon-btn-soft` |
| `.cart-close` | `.ds-icon-btn .ds-icon-btn-circle .ds-icon-btn-soft` |
| `.help-modal-close` (28×28 sobre brand) | `.ds-icon-btn .ds-icon-btn-circle .ds-icon-btn-glass .ds-icon-btn-sm` |
| `.dash-hero-brand-edit` | `.ds-icon-btn .ds-icon-btn-glass .ds-icon-btn-sm` |
| `.profile-cover-edit-btn` | `.ds-icon-btn .ds-icon-btn-glass` (with text label override) |
| `.profile-copy-btn` (24h ghost) | `.ds-icon-btn .ds-icon-btn-ghost .ds-icon-btn-sm` |
| `.notif-close-btn` (drawer close) | `.ds-icon-btn .ds-icon-btn-circle .ds-icon-btn-soft` |

## Related

- `.ds-btn` — botões com texto label
- `.ds-pill` — chips, status pills
- [chrome](../../features/chrome/README.md) — primário consumidor (topbar)
