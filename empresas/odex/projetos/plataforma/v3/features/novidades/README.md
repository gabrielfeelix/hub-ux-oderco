# Feature · Novidades (Painel V5)

> Source: [`novidades.css`](./novidades.css)
> Triggered: botão "What's new" no topbar abre drawer lateral
> Layer: `@layer features`

## Propósito

Drawer lateral 560w com lista de novidades/updates da plataforma. Filtros por categoria via sub-drawer slide-in. Cada novidade tem hero gradient + tags + reactions + feedback. End-state c/ feedback form. Toast global pra notificações.

## Componentes principais

### Drawer + Overlay
- `.novas-overlay` (backdrop blur z-300)
- `.novas-panel` (right drawer 560w · transform translateX, z-310, shadow forte)
- `.novas-panel.open` (slide-in)
- `.novas-head` (sticky 64h navy)
- `.novas-head-menu` (hamburger 34) / `.novas-close` (close 34 circle)

### Categorias sub-drawer
- `.novas-cats` (nested drawer 300w slide from left)
- `.novas-cats-head` (back + title)
- `.novas-cats-list` (scroll)
- `.novas-cat-item` (selectable row) / `.novas-cat-dot` (8 circle)
- `.novas-cat-item.active` (blue tint + dot blue)

### Body + cards
- `.novas-body` (flex scroll)
- `.novas-item` (card 24 padding) / `.is-read` (opacity)
- `.novas-item-top` / `.novas-item-meta`
- `.novas-title` (18 bold) / `.novas-time` (12 muted)
- `.novas-tag` + variants (cyan/green/amber/blue) — DUPE de .ds-pill
- `.novas-content` / `.novas-desc` (+ `.is-clamped` 3-line)
- `.novas-more-btn` (link "ler mais")
- `.novas-hero` (16/7 aspect ratio gradient com glow + icon)
- `.novas-hero-glow` / `-hero-icon`

### Footer reactions + feedback + saiba
- `.novas-footer` (border-top divisor)
- `.novas-reactions-grp` / `.novas-react` (emoji + count)
- `.novas-react-emoji` / `-react-count`
- `.novas-feedback-btn` (text-link 12px)
- `.novas-feedback-btn.on/.sent` (states)
- `.novas-saiba` (CTA outline pill com seta)

### Feedback form
- `.novas-feedback-form` (footer area)
- `.novas-feedback-input` (textarea)
- `.novas-fb-actions` (row)
- `.novas-fb-cancel` (outline 34) / `.novas-fb-send` (blue 34)

### Empty + End states
- `.novas-empty` / `-empty-icon` (filter sem resultados)
- `.novas-divider` (entre fresh + old)
- `.novas-end` / `-end-icon` (fim da lista)

### Toast global (GLOBAL · não só novidades)
- `.odex-toast` (fixed top-right · slide-in animation)
- `.odex-toast strong` (title) / `span` (sub)
- `.odex-toast.is-out` (slide-out)
- `@keyframes odexToastIn`

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.novas-overlay` / `.notif-drawer-overlay` / `.de-chat-mask` / `.ped-resumo-overlay` / `.help-modal-mask` | `.ds-overlay` (parte de .ds-modal · CONFIRMED 3x → upgrade 5x) | DUPE backdrop |
| `.novas-panel` / `.notif-drawer` (right drawer) | `.ds-drawer` (new molecule) | 2x · novidades + notif |
| `.novas-close` | `.ds-icon-btn` circle (CONFIRMED 6x → upgrade 7x) | DUPE |
| `.novas-head-menu` | `.ds-icon-btn` square variant | DUPE |
| `.novas-tag` + 4 variants | `.ds-pill` ✅ + cyan/amber tones | DUPE 7x |
| `.novas-cat-item` (selectable row) | List item pattern · candidato `.ds-list-item-selectable` | New |
| `.novas-react` (emoji pill button) | Custom pattern · reactions | Domain-specific |
| `.novas-feedback-input` | `.ds-textarea` ✅ | DUPE |
| `.novas-fb-cancel` / `.novas-fb-send` | `.ds-btn-ghost-sm` / `.ds-btn-primary-sm` | DUPE |
| `.novas-empty` / `.novas-end` | Empty state pattern · candidato `.ds-empty-state` | DUPE com cart-empty + ped-empty etc |
| `.novas-saiba` (CTA pill outline) | `.ds-btn-ghost` pill variant | Near-dupe |
| `.novas-hero` (16/7 gradient + icon) | Card hero pattern · custom | Domain |
| `.odex-toast` | `.ds-toast` (new molecule) | New |

**Estimativa migration:** ~75%. Domain-specific: hero gradient, react pills, cats nested drawer.

**Upgrades de atoms confirmados:**
- `.ds-icon-btn` 6x → **7x** (+novas-close)
- `.ds-overlay` (parte de ds-modal) sobe pra 5x

**Novos sugeridos:**
- `.ds-drawer` (right side panel · novidades + notif 2x)
- `.ds-toast` (toast notification top-right)
- `.ds-empty-state` (empty state com icon + h4 + p · usado em ~5 features)
- `.ds-list-item-selectable` (linha clicável com dot/checkmark)

## Tokens

Maioria primitives. Phase H migra junto.

## Notas de extração

- Bloco notif-drawer (lines 2641-2674 do index pre-c19) ficou em place · será extraído em C.21 (notif).
- `.odex-toast` é GLOBAL não só novidades · ficou aqui por proximidade no código original. Phase H promove pra `ds/molecules/toast.css`.

## Related

- [Notif](../notif/README.md) (futuro C.21) — `.notif-drawer` DUPE com `.novas-panel`
- [Ajuda](../ajuda/README.md) — `.help-modal-mask` DUPE overlay
- [Pedidos](../pedidos/README.md) — `.ped-resumo-overlay` DUPE
