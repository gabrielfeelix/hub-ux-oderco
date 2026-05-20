# Feature · Chrome (App Shell)

> Source: [`chrome.css`](./chrome.css)
> Telas: aplica em TODAS as views (sidebar fixa + topbar sticky)
> Layer: `@layer features`
> Body modifiers: `.is-auth` (esconde chrome em telas auth) · `.sb-collapsed` (sidebar 72px)

## Propósito

App-shell global · sidebar fixa esquerda · topbar sticky com toggle de colapso · user menu dropdown · container `.shell` que abriga as views · `body.is-auth` esconde chrome em telas de login/registro · `body.sb-collapsed` colapsa sidebar para 72px com transição smooth.

## Componentes principais

### Sidebar
- `.sidebar` (252w · fixed · navy bg · radius 0 22 22 0)
- `.sidebar-header` (72h · logo container)
- `.sidebar-logo-full` / `.sidebar-logo-icon` (modo expandido vs colapsado)
- `.sidebar-nav` (flex column · gap 4 · overflow-y auto)
- `.sidebar-link` (+`.active`) (10/14 padding · icon + label · radius r-form)
- `.sidebar-link .nav-label` (fade smooth no collapse)
- `.sidebar-divider` (1px linha)

### Topbar
- `.topbar` (62h · sticky · white · shadow bottom)
- `.topbar-left` (toggle + title group · overflow hidden)
- `.sidebar-toggle` (34×34 hamburger)
- `.topbar-title` / `.topbar-title small` (eyebrow context)
- `.topbar-actions` (gap 4 · icon-btn cluster)
- `.topbar-sep` (1px divider entre icon-btns)
- `.icon-btn` (34×34 · radius r-form · hover soft)
- `.icon-btn .dot` (8×8 red notif indicator)
- `.badge` (tiny pill 16h · cantos negativos)

### User menu
- `.user-profile` (avatar + name + role · clicável)
- `.user-profile img` / `.user-profile .name` / `.user-profile .role`
- `.user-menu-wrap` (relative anchor)
- `.user-profile-btn` (botão neutro)
- `.user-menu` (+`.open`) (220w · drop · 8 padding · shadow 18/40)
- `.user-menu-link` (42h · icon + label · radius r-card · hover soft)

### Shell + view system
- `.shell` (container max 1480 · padding 26/28/44)
- `.shell--narrow` (1080) · `.shell--mid` (1180)
- `.view` (default `display:none`) · `.view.active` (`display:block` + fadeIn)
- `.view-fullscreen` (100vh override · auth pages)
- `@keyframes fadeIn` (10px translateY 0.3s)

### Body modifiers
- `body.is-auth` → esconde sidebar/topbar, main margin-left 0, shell sem max-width, bg slate-100
- `body.sb-collapsed` → sidebar 72w, main margin-left 96, nav-label opacity 0

### Responsive (≤1024px)
- `.sidebar { transform: translateX(-100%) }` (off-canvas)
- `.main { margin-left: 0 }`

## 📋 Divergence audit (Phase H)

| Chrome class | DS equivalent | Tipo |
|---|---|---|
| `.icon-btn` (40×40 v1 + 34×34 v2 redesign) | `.ds-icon-btn` CONFIRMED 9x → **10x** | DUPE forte |
| `.icon-btn .dot` (red 8×8 notif) | `.ds-notif-dot` candidato (extrai p/ ds) | New atom |
| `.badge` (pill 16h positioned) | `.ds-pill` micro variant + positioning util | Near-dupe |
| `.sidebar-link` (icon+label row · hover bg) | `.ds-nav-link` candidato (vertical nav atom) | New atom |
| `.sidebar-divider` (1px line) | `.ds-divider` (já existe ou candidato) | Pattern |
| `.sidebar-toggle` (icon-only 34×34) | `.ds-icon-btn` upgrade | DUPE |
| `.user-profile-btn` | `.ds-btn-ghost` com slot avatar | Near-dupe |
| `.user-menu` (dropdown 220w) | `.ds-menu` molecule já existe ✅ | DUPE |
| `.user-menu-link` (42h icon row) | `.ds-menu-item` ✅ | DUPE |
| `.topbar-sep` (1px vertical line) | `.ds-divider --vertical` | Pattern |
| `.topbar` (sticky shell header) | Layout primitive · candidato `.ds-app-topbar` | Layout |
| `.sidebar` (fixed shell nav) | Layout primitive · candidato `.ds-app-sidebar` | Layout |

**Estimativa migration:** ~55%. Custom restantes: layout primitives (sidebar fixed pos, main margin tokens, sb-collapsed transitions), shell responsive media.

**Upgrades de atoms confirmados:**
- `.ds-icon-btn` 9x → **10x** (+icon-btn · 2 tamanhos)

**Novos sugeridos:**
- `.ds-notif-dot` (red 8×8 pulse · top-right anchored)
- `.ds-nav-link` (icon + label · active state · vertical nav padrão)
- `.ds-divider --vertical` (extender existing divider)

## Notas de extração

Chrome estava espalhado em **5 blocos** no index.html original:
1. **Sidebar + Main + Topbar core** (lines 178-231 pre-c24)
2. **Shell + body.is-auth + view system** (lines 233-245 pre-c24)
3. **Responsive sidebar/main** (lines 484-486 pre-c24 · DOIS rules dentro de @media compartilhada)
4. **Sidebar collapse + topbar redesign** (lines 504-546 pre-c24)
5. **Topbar overflow + user menu + sidebar svg + badge fix** (lines 579-621, 720-725 pre-c24)

**Fica no index.html:**
- `@keyframes rayRotate` (auth-specific solar ray rotation · 1 line)
- Listagem `.sidebar-link, .icon-btn, .badge, .topbar-title, .topbar-actions` dentro de blocos compartilhados de `font-family` e `border-radius` (legacy compat block · cleanup C.25)

## Tokens

- `--sidebar-bg` (semantic · navy escuro)
- `--blue` (active link bg)
- `--bg`, `--soft`, `--line`, `--ink`, `--muted`, `--font`, `--r-form`, `--r-card`

Phase H migra junto.

## Related

- [Notif panel](../notif/README.md) — chrome topbar dispara notif-panel
- [De Chat](../de-chat/README.md) — chrome topbar dispara help float
- [DS atoms](../../ds/) — `.ds-icon-btn` (10x DUPE confirmed) + 3 novos sugeridos
