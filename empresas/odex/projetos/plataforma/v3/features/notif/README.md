# Feature · Notificações

> Source: [`notif.css`](./notif.css)
> Triggered: bell icon no topbar abre Notif Panel (legacy popover) OU Notif Drawer (v2 lateral)
> Layer: `@layer features`

## Propósito

Sistema de notificações com 2 implementações:
- **V1 legacy:** popover `.notif-panel` (360w abre do bell)
- **V2:** drawer lateral `.notif-drawer` (420w · consistente com Novidades)

Items mostram icon + title + desc + time + dot unread. Suporta filtros por tab, badge contador, empty state, footer link.

## Componentes principais

### Notif Panel (legacy popover)
- `.notif-bell-wrap` (relative wrapper)
- `.notif-panel` (absolute 360w · transform scale opening transition)
- `.notif-panel.open` (visible state)
- `.notif-head` (title + read-all) / `.notif-head strong` / `.notif-read-all`
- `.notif-list` (scroll body)
- `.notif-item` + `.unread` (border-left + bg tint)
- `.notif-icon` (38 color radius 11) / `.notif-item.unread .notif-icon` (blue)
- `.notif-body` / `.notif-title` (13 bold) / `.notif-desc` (12 muted ellipsis)
- `.notif-meta` (right column) / `.notif-time` (11 muted) / `.notif-dot` (7 blue)
- `.notif-badge-novas` (red bubble counter no bell)
- `.notif-foot` (link footer)

### Notif Item Redesign (overrides v1)
- `.notif-item` (border-left 3, padding 13 18 13 15)
- `.notif-item.unread` (border-left blue)
- `.notif-icon` (34 radius form)

### Notif Drawer Lateral V2
- `.notif-drawer-overlay` (backdrop blur z-300)
- `.notif-drawer` (right 420w slide z-310)
- `.notif-drawer-head` + `.notif-drawer-head strong`
- `.notif-drawer-badge` (blue pill counter)
- `.notif-drawer-actions` / `.notif-drawer-action` (icon-btn 30h)
- `.notif-drawer-tabs` (scroll-x sem scrollbar)
- `.notif-drawer-tab` (pill 30h) + `.active` (navy solid)
- `.notif-drawer-body` (scroll)
- `.notif-drawer-item` (+`unread` border-left + bg)
- `.notif-drawer-icon` (36 color radius form)
- `.notif-drawer-body-text` + `.notif-drawer-title` (13.5 bold) + `.notif-drawer-desc` + `.notif-drawer-time`
- `.notif-drawer-dot` (8 blue indicator)
- `.notif-drawer-empty` + `.notif-drawer-empty-icon` (54 circle)
- `.notif-drawer-foot` + `.notif-drawer-foot-link`

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.notif-drawer-overlay` / `.novas-overlay` / `.de-chat-mask` / `.ped-resumo-overlay` / `.help-modal-mask` | `.ds-overlay` UPGRADE 5x → **6x** | DUPE |
| `.notif-drawer` / `.novas-panel` | `.ds-drawer` (CONFIRMED 2x) | DUPE |
| `.notif-drawer-head` | `.ds-drawer-head` (parte de `.ds-drawer`) | Match |
| `.notif-drawer-badge` / `.cart-count-tag` | `.ds-pill` blue solid | DUPE |
| `.notif-drawer-action` (30h outline) | `.ds-btn-ghost-sm` (size novo) | Pattern |
| `.notif-drawer-tab` (pill 30h) / `.notif-drawer-tab.active` | `.ds-tab-pill` (sugerido em mk-mode-tabs · agora 2x = CONFIRMED) | DUPE |
| `.notif-drawer-icon` / `.notif-icon` | `.ds-icon-box` UPGRADE 6x → **7x** | DUPE |
| `.notif-drawer-empty` + `-empty-icon` | `.ds-empty-state` (CONFIRMED 4x → **5x**) | DUPE |
| `.notif-drawer-item` + `unread` | List item pattern | Domain (notif-specific) |
| `.notif-drawer-dot` / `.notif-dot` / `.de-chat-status-dot` | `.ds-status-dot` (sugerido) → **3x · subir CONFIRMED** | DUPE |
| `.notif-drawer-foot-link` | `.ds-link` ✅ | DUPE |
| `.notif-panel` (legacy popover) | `.ds-popover` (new) | Pattern |
| `.notif-badge-novas` (red bubble counter) | `.ds-badge-counter` (new) | Pattern |

**Estimativa migration:** ~85% migrável.

**Upgrades confirmados:**
- `.ds-overlay` 5x → **6x** (+notif-drawer-overlay)
- `.ds-icon-box` 6x → **7x** (+notif-drawer-icon + notif-icon)
- `.ds-empty-state` 4x → **5x** (+notif-drawer-empty)
- `.ds-drawer` 2x → **3x** (+notif-drawer)
- `.ds-tab-pill` SOBE pra CONFIRMED 2x (+notif-drawer-tab confirma mk-mode-tabs)
- `.ds-status-dot` SOBE pra CONFIRMED 3x (notif-drawer-dot + notif-dot + de-chat-status-dot)

**Novos sugeridos:**
- `.ds-popover` (legacy notif-panel pattern)
- `.ds-badge-counter` (red bubble counter)

## Tokens

Maioria primitives. Phase H migra junto.

## Notas

V1 popover `.notif-panel` foi parcialmente substituído por V2 drawer mas ambos coexistem · pode haver dead code · cleanup futuro.

## Related

- [Novidades](../novidades/README.md) — drawer pattern compartilhado
- [Dé chat](../de-chat/README.md) — overlay pattern compartilhado
- [DS](../../ds/) — múltiplos atoms confirmados
