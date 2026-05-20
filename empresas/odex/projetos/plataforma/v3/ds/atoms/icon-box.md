# `.ds-icon-box` (atom)

> Source: [`icon-box.css`](./icon-box.css)
> Created: Phase H.3 (2026-05-20) · consolida **7+ DUPES** cross-feature.

## Quando usar

Container **decorativo** quadrado/circular para ícone — não-clicável, parte de uma row/card maior. Tipicamente:
- Avatar de notificação/categoria (`.notif-icon`, `.ajuda-cat-icon`)
- KPI icon stamp (`.dash-kpi-icon`)
- Hero quick action thumbnail (`.dash-hero-quick-ico`, `.home-perk-icon`)
- Brand logo container (`.dash-hero-brand-logo`)
- Activity row indicator (`.dash-activity-icon`)
- Empty state illustration anchor (`.notif-drawer-empty-icon`)

## Quando NÃO usar

- Botão clicável icon-only → use `.ds-icon-btn` (versão interativa com hover/focus)
- Avatar de usuário com foto → use `.ds-avatar` (futuro)
- Logo da brand inteira → use `<img>` direto, sem container

## API

```html
<!-- Default (36px square · soft bg · muted fg) -->
<div class="ds-icon-box">
  <i data-lucide="bell"></i>
</div>

<!-- Sized + toned -->
<div class="ds-icon-box ds-icon-box-lg ds-icon-box-brand">
  <i data-lucide="zap"></i>
</div>

<!-- Rounded + glass over brand bg -->
<div class="ds-icon-box ds-icon-box-rounded ds-icon-box-glass">
  <i data-lucide="folder"></i>
</div>
```

## Variants

### Sizes
- `.ds-icon-box-xs` (28 · inner 14) — inline dense list
- `.ds-icon-box-sm` (32 · inner 16)
- `.ds-icon-box-md` (36 · inner 18) — **default**
- `.ds-icon-box-lg` (40 · inner 20)
- `.ds-icon-box-xl` (48 · inner 22) — KPI stamp
- `.ds-icon-box-xxl` (54 · inner 26) — empty state illustration

### Shapes
- `.ds-icon-box-square` (4px radius · default)
- `.ds-icon-box-rounded` (10px) — notif/category cards
- `.ds-icon-box-circle` (50%)

### Tones
- (default) — soft bg + muted fg
- `.ds-icon-box-brand` — blue tinted
- `.ds-icon-box-success` — green
- `.ds-icon-box-warning` — amber
- `.ds-icon-box-danger` — red
- `.ds-icon-box-navy` — solid navy + white fg
- `.ds-icon-box-glass` — rgba white .12 (sobre brand bg)
- `.ds-icon-box-white` — solid white (sobre dark bg)

## Accessibility

- **Decorativo** → ícone interno deve ter `aria-hidden="true"` ou ser puramente visual
- Se carrega significado, repita label no elemento pai (row/card) com texto visível
- Não receber focus (não é interativo)

## Examples

```html
<!-- KPI card icon stamp -->
<div class="dash-kpi">
  <div class="ds-icon-box ds-icon-box-xl ds-icon-box-brand">
    <i data-lucide="zap" aria-hidden="true"></i>
  </div>
  <span class="dash-kpi-lbl">Geração</span>
  <span class="dash-kpi-val">128 kWp</span>
</div>

<!-- Activity row (notif) -->
<div class="ds-list-row">
  <div class="ds-icon-box ds-icon-box-rounded ds-icon-box-success">
    <i data-lucide="check" aria-hidden="true"></i>
  </div>
  <div>...</div>
</div>

<!-- Hero brand logo container -->
<div class="ds-icon-box ds-icon-box-lg ds-icon-box-white">
  <img src="brand-logo.png" alt="">
</div>

<!-- Empty state illustration -->
<div class="ds-icon-box ds-icon-box-xxl ds-icon-box-circle">
  <i data-lucide="inbox" aria-hidden="true"></i>
</div>
```

## Migration map (Phase H.3)

| Origin | Replace with |
|---|---|
| `.notif-icon` (38×38 11r) | `.ds-icon-box .ds-icon-box-lg .ds-icon-box-rounded` + tone |
| `.notif-drawer-icon` (36×36 r-form) | `.ds-icon-box .ds-icon-box-md` + tone |
| `.notif-drawer-empty-icon` (54×54 circle) | `.ds-icon-box .ds-icon-box-xxl .ds-icon-box-circle` |
| `.ajuda-cat-icon` (46×46 r-form) | `.ds-icon-box .ds-icon-box-xl` (size override via inline if needed) + tone |
| `.dash-kpi-icon` (48×48 r-card) | `.ds-icon-box .ds-icon-box-xl .ds-icon-box-rounded` + tone (positioned absolute mantém no card) |
| `.dash-hero-quick-ico` (30×30 r-form glass) | `.ds-icon-box .ds-icon-box-sm .ds-icon-box-glass` |
| `.dash-hero-brand-logo` (white box · logo container) | `.ds-icon-box .ds-icon-box-lg .ds-icon-box-white` |
| `.dash-activity-icon` (36×36) | `.ds-icon-box .ds-icon-box-md` + tone |
| `.dash-info-pill-icon` (34×34) | `.ds-icon-box .ds-icon-box-sm` + tone |
| `.quick-act-icon` (36×36) | `.ds-icon-box .ds-icon-box-md` + tone |
| `.home-perk-icon` (40×40 10r) | `.ds-icon-box .ds-icon-box-lg .ds-icon-box-rounded` + tone |
| `.home-cat-icon` (38×38 10r) | `.ds-icon-box .ds-icon-box-lg .ds-icon-box-rounded` + tone |
| `.home-recent-head-icon` (36×36 10r) | `.ds-icon-box .ds-icon-box-md .ds-icon-box-rounded` + tone |
| `.client-av` (avatar inicial · 38×38) | `.ds-icon-box .ds-icon-box-lg` + tone (text inicial dentro) |

## Related

- `.ds-icon-btn` — interactive sibling (com hover/focus/cursor)
- `.ds-avatar` — futuro · pra foto de usuário
