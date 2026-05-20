# `.ds-hero-gradient` (atom)

> Source: [`hero-gradient.css`](./hero-gradient.css)
> Created: Phase H.5 (2026-05-20) · consolida **7 DUPES** (dash-hero, auth-brand, ajuda-hero, admin-hero, de-chat-head, help-modal-head, loja heroes).

## Quando usar

Container com background gradient brand (navy → blue) + texto branco. Padrão pra:
- Dashboard hero (home com saudação + KPIs)
- Auth left panel (login com brand pitch)
- Ajuda hero (central de ajuda título + busca)
- Admin hero (painel topo)
- Modal headers escuros (de-chat, help-modal)
- Loja banner hero v1

## Quando NÃO usar

- Banner com imagem de fundo → use `<section>` com `background-image` + overlay
- Card branco normal → use `.ds-card`
- Hero com cor flat (não gradient) → use `<section style="background: var(--navy)">`

## API

```html
<!-- Dashboard hero (3-stop · decorated · large radius) -->
<section class="ds-hero-gradient ds-hero-gradient-3stop ds-hero-gradient-decorated ds-hero-gradient-radius-xl ds-hero-gradient-pad-md">
  <p class="ds-hero-gradient-eyebrow">Boa tarde · maio</p>
  <h2>Boa tarde, Gabriel</h2>
  <p>Você está R$ 16,5k acima do mês anterior.</p>
</section>

<!-- Modal head dark (2-stop · sm pad · no radius — modal wraps) -->
<header class="ds-hero-gradient ds-hero-gradient-2stop ds-hero-gradient-pad-sm">
  <h3>Suporte</h3>
  <button class="ds-icon-btn ds-icon-btn-circle ds-icon-btn-glass" aria-label="Fechar">×</button>
</header>

<!-- Progress bar (horizontal 90deg · custom inside) -->
<div class="progress-track">
  <div class="progress-fill" style="background: linear-gradient(90deg, var(--navy) 0%, var(--blue) 100%);"></div>
</div>
```

## Variants

### Gradient direction/stops
- `.ds-hero-gradient-3stop` — 135deg navy → blue-button 50% → blue (default · richer)
- `.ds-hero-gradient-2stop` — 135deg navy → blue (simpler · modal heads)
- `.ds-hero-gradient-horizontal` — 90deg navy → blue (progress bars, dividers)
- `.ds-hero-gradient-radial` — radial top-left (alternative · ambient)

### Decoration
- `.ds-hero-gradient-decorated` — adiciona 2 radial blobs decorativos via ::before/::after (right-anchored circles · pattern do dash-hero)

### Padding presets
- `.ds-hero-gradient-pad-sm` (16/20) — modal head
- `.ds-hero-gradient-pad-md` (24/30) — dash-hero default
- `.ds-hero-gradient-pad-lg` (40/48) — auth-brand
- `.ds-hero-gradient-pad-xl` (56/48/60) — ajuda-hero big

### Radius presets
- (none) — sem radius (modal head)
- `.ds-hero-gradient-radius` — 12px (admin-hero)
- `.ds-hero-gradient-radius-lg` — 16px (ajuda-hero)
- `.ds-hero-gradient-radius-xl` — 24px (dash-hero)

## Text helpers

- `.ds-hero-gradient-eyebrow` — small uppercase label dentro do hero
- `<h1>/<h2>/<h3>` ganham `color: white` automaticamente
- `<p>` ganha `color: rgba(255,255,255,0.7)` automaticamente

## Accessibility

- Contrast white text sobre navy bg = AAA (16:1+)
- White-alpha .7 sobre navy/blue = AA (4.5:1+)
- Decorative `::before/::after` têm `pointer-events: none`
- Heading hierarchy continua válida (h1/h2/h3 visualmente styled mas semanticamente preservados)

## Examples

```html
<!-- Auth brand left panel -->
<aside class="ds-hero-gradient ds-hero-gradient-3stop ds-hero-gradient-pad-lg ds-hero-gradient-radius-lg">
  <p class="ds-hero-gradient-eyebrow">Plataforma Solar</p>
  <h1>Acelere suas vendas com a Odex</h1>
  <p>Gerencie orçamentos, pedidos e kits direto da plataforma.</p>
</aside>

<!-- Help modal head (dark variant) -->
<header class="ds-hero-gradient ds-hero-gradient-2stop ds-hero-gradient-pad-sm">
  <h3>Central de ajuda</h3>
  <button class="ds-icon-btn ds-icon-btn-glass" aria-label="Fechar">×</button>
</header>

<!-- Admin hero with actions -->
<section class="ds-hero-gradient ds-hero-gradient-2stop ds-hero-gradient-pad-md ds-hero-gradient-radius">
  <div>
    <h2>Painel Administrativo</h2>
    <p>Gerencie configurações da plataforma.</p>
  </div>
  <button class="ds-btn ds-btn-ghost">Configurações</button>
</section>
```

## Migration map (Phase H.5)

| Origin | Replace with |
|---|---|
| `.dash-hero` (135deg 3-stop · 24px radius · decorated) | `.ds-hero-gradient .ds-hero-gradient-3stop .ds-hero-gradient-decorated .ds-hero-gradient-radius-xl .ds-hero-gradient-pad-md` |
| `.auth-brand` (135deg 3-stop · padding 60/48) | `.ds-hero-gradient .ds-hero-gradient-3stop .ds-hero-gradient-pad-lg` + custom radius |
| `.ajuda-hero` (135deg 3-stop · big padding) | `.ds-hero-gradient .ds-hero-gradient-3stop .ds-hero-gradient-pad-xl .ds-hero-gradient-radius-lg` |
| `.admin-hero` (135deg 2-stop hardcoded #0d1d52 → #1e2f6e) | `.ds-hero-gradient .ds-hero-gradient-2stop .ds-hero-gradient-pad-md .ds-hero-gradient-radius` (passa a usar tokens) |
| `.de-chat-head` (135deg 2-stop · small pad) | `.ds-hero-gradient .ds-hero-gradient-2stop .ds-hero-gradient-pad-sm` |
| `.help-modal-head` (135deg 2-stop · small pad) | `.ds-hero-gradient .ds-hero-gradient-2stop .ds-hero-gradient-pad-sm` |
| `.hero` (loja v1 padding 22/24) | `.ds-hero-gradient .ds-hero-gradient-3stop .ds-hero-gradient-pad-md` |

## Related

- `.ds-icon-btn .ds-icon-btn-glass` — botões close em modal heads
- `.ds-icon-box .ds-icon-box-glass` — icon containers sobre brand bg
- `--color-text-on-brand` — text color helper
