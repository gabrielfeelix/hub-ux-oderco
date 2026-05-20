# Feature · Super Admin

> Source: [`admin.css`](./admin.css)
> Telas: `#admin` (painel) · `#admin-artigos` · `#admin-banners` · etc
> Layer: `@layer features`

## Propósito

Painel administrativo · hero gradient navy + ações rápidas + tabs (novidades / artigos / banners / relatórios / usuários / auditoria). Gestão completa de CMS: edição de novidades, artigos da central de ajuda, banners promocionais, controle de usuários.

## Componentes principais

### Hero
- `.admin-hero` (gradient navy)
- `.admin-hero-info` / `.admin-hero-actions` / `.admin-hero-more` (icon-btn 38)
- `.admin-hero-menu` (dropdown popover · `.is-open` state)
- `.admin-hero-menu-item` (icon + strong + small)
- `.admin-hero-tag` (uppercase pill white-on-brand)
- `.admin-hero-title` (24 bold white)
- `.admin-hero-sub` (13 muted)
- `.admin-hero-action` (CTA white sobre brand bg)

### Sections + cards
- `.admin-section` / `.admin-section-head` / `.admin-section-title` (+icon) / `.admin-section-sub`
- `.admin-card` (padding 20 22)
- `.admin-card-head` (border-bottom · title + sub)

### Tabs
- `.admin-tabs` (scroll-x, no scrollbar)
- `.admin-tab` (42h, border-bottom blue when active)
- `.admin-tab.active` (navy + bold + border-bottom blue)
- `.admin-tab-pane` (+`.active` display)

### Novidades CMS list
- `.admin-novidades-list` / `.admin-novidade-row` (grid 6-col)
- `.admin-novidade-tag` (status pill 24h)
- `.admin-novidade-info` / `-title` / `-meta`
- `.admin-novidade-stats` (views/reactions counter)

### Artigos CMS list
- `.admin-artigos-list` / `.admin-artigo-row` (grid 5-col)
- `.admin-artigo-cat-pill` (status pill 24h)
- `.admin-artigo-info` / `-title` / `-meta`
- `.admin-artigo-empty` (estado vazio)
- Internal `@media(max-width:880px)`

### Relatórios admin
- `.admin-rel-grid` (4-col)
- `.admin-rel-card` (padding 16 18)
- `.admin-rel-label` / `-value` / `-trend`

### Quick actions
- `.admin-quick-grid` (cards de atalho)
- `.admin-quick-row` (linha de actions)
- `.admin-quick-btn` (card link c/ ícone)

### Users management
- `.admin-users-table-card` / `.admin-users-table-head` / `-table-row`
- `.admin-users-filter` (toolbar search + filter)
- `.admin-users-search` / `.admin-users-search-input`
- `.admin-users-add` (CTA blue)
- `.admin-user-row` / `.admin-user-name` / `.admin-user-role` / `.admin-user-status`
- `.admin-user-toggle` (switch on/off)
- `.admin-user-filter` (mini-filter pills)

### Auditoria
- `.admin-audit-card`
- `.admin-audit-list` / `.admin-audit-item` / `.admin-audit-action`
- `.admin-audit-time` / `.admin-audit-meta`

### Banners CMS (v3)
- `.admin-banner-grid` (auto-fill minmax 320)
- `.admin-banner-card`
- `.admin-banner-thumb` / `-thumb-img` / `-thumb-empty`
- `.admin-banner-thumb-overlay` (status pill no canto)
- `.banner-status` + variants:
  - `.banner-status.is-live` (green)
  - `.banner-status.is-scheduled` (amber)
  - `.banner-status.is-paused` (muted)
  - `.banner-status.is-expired` (red)
- `.admin-banner-body` / `-row-top` / `-pos` / `-title` / `-meta`
- `.admin-banner-actions` (footer · ghost buttons + toggle)

### Responsive (interno)
- `@media(max-width:1100px)` (quick-grid 1col)
- `@media(max-width:880px)` (admin-artigo-row simplifica)
- `@media(max-width:680px)` (admin-quick-row 1col)

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.admin-hero` (gradient navy) | `.ds-hero-gradient` UPGRADE 5x → **6x** | DUPE |
| `.admin-hero-more` (38 icon-btn) | `.ds-icon-btn` UPGRADE 8x → **9x** | DUPE |
| `.admin-hero-menu` (dropdown) | `.ds-popover` ou `.ds-menu` (CONFIRMED) | DUPE |
| `.admin-hero-menu-item` | `.ds-menu-item` ✅ | DUPE |
| `.admin-hero-tag` (uppercase pill white-on-brand) | `.ds-pill` on-brand variant | Near-dupe |
| `.admin-hero-action` | `.ds-btn-on-brand` (sugerido em dash) → **2x · sobe CONFIRMED** | DUPE |
| `.admin-card` / `.admin-users-table-card` / `.admin-audit-card` / `.admin-rel-card` / `.admin-banner-card` | `.ds-card` ✅ | DUPE 5x |
| `.admin-card-head` / `.admin-section-head` | `.ds-section-head` UPGRADE 3x → **4x** | DUPE |
| `.admin-tabs` / `.admin-tab` / `.admin-tab.active` | `.ds-tabs` (sugerido em mk-mode-tabs) → CONFIRMED em notif `.notif-drawer-tab` + admin → **3x** · sobe CONFIRMED | DUPE 3x |
| `.admin-novidade-row` / `.admin-artigo-row` / `.admin-user-row` | `.ds-table-grid` UPGRADE 5x → **8x** (3 novas variants) | DUPE |
| `.admin-novidade-tag` / `.admin-artigo-cat-pill` | `.ds-pill` ✅ | DUPE |
| `.admin-rel-grid` | `.ds-form-grid` ou utility grid · UPGRADE 4x → 5x | DUPE |
| `.admin-rel-card` (KPI-like) | `.ds-kpi` UPGRADE 5x → **6x** | DUPE |
| `.admin-quick-btn` / `.dash quick-act-btn` | `.ds-card-link` (sugerido em dash) → **2x · sobe CONFIRMED** | DUPE |
| `.admin-users-filter` / `.admin-user-filter` | `.ds-toolbar` UPGRADE 4x → **5x** | DUPE |
| `.admin-users-search` (input + icon) | `.ds-input-group` ✅ | DUPE |
| `.admin-users-add` | `.ds-btn-primary` ✅ | DUPE |
| `.admin-user-toggle` | `.ds-toggle` (new) | New atom |
| `.admin-audit-action` | `.ds-btn-ghost-sm` (size novo) | Pattern |
| `.admin-banner-grid` (auto-fill 320) | Layout utility · gallery pattern | Domain |
| `.admin-banner-thumb-empty` | `.ds-empty-state` UPGRADE 5x → **6x** | DUPE |
| `.banner-status` + 4 variants (is-live/scheduled/paused/expired) | `.ds-pill` blur overlay variant | Near-dupe |

**Estimativa migration:** ~85% migrável.

**Upgrades de atoms confirmados:**
- `.ds-hero-gradient` 5x → **6x**
- `.ds-icon-btn` 8x → **9x**
- `.ds-table-grid` 5x → **8x** (3 variants novas)
- `.ds-kpi` 5x → **6x**
- `.ds-toolbar` 4x → **5x**
- `.ds-empty-state` 5x → **6x**
- `.ds-section-head` 3x → **4x**

**SOBE pra CONFIRMED:**
- `.ds-tabs` (mk + notif + admin = 3x) **NEW CONFIRMED**
- `.ds-btn-on-brand` (dash + admin = 2x) **NEW CONFIRMED**
- `.ds-card-link` (dash + admin = 2x) **NEW CONFIRMED**

**Novos sugeridos:**
- `.ds-toggle` (switch on/off)
- `.ds-btn-ghost-sm` (size variant)

## Tokens

Maioria primitives. Phase H migra junto.

## Related

- [Dashboard](../dashboard/README.md) — `.dash-hero-cta` DUPE `.admin-hero-action` (.ds-btn-on-brand)
- [Notif](../notif/README.md) — `.notif-drawer-tab` DUPE `.admin-tab` (.ds-tabs)
- Múltiplos features — DUPES de toolbar/table/card consolidam Phase H
