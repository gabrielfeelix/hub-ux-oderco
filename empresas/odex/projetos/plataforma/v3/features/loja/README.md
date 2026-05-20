# Feature · Loja / Produto

> Source: [`loja.css`](./loja.css)
> Telas: `#loja` (catalog) · `#produto-<sku>` (PDP) · Hero carousel da loja
> Layer: `@layer features`

## Propósito

Loja online · catalog grid + filtros + busca + categorias + Hero carousel decorativo no topo + Product Detail Page (PDP) rich com gallery + sticky purchase card + tabs + specs.

## Componentes principais

### PDP V2 (Product Detail Page rich)
- `.pdp-page` (1200w container)
- `.pdp-hero` (grid 1fr 420 · gallery + purchase)
- `.pdp-gallery` (column) · `.pdp-gallery-main` (1:1 aspect) · `.pdp-thumbs` · `.pdp-thumb` (+`.active`)
- `.pdp-purchase` (sticky card)
- `.pdp-brand-row` / `.pdp-brand-pill` (uppercase pill) / `.pdp-sku-line`
- `.pdp-stock-tag` + `.in/.out` variants · `.pdp-stock-dot` (pulse)
- `.pdp-title` (22 bold navy)
- `.pdp-rating-row` / `.pdp-stars` (yellow) / `.pdp-rating-val` / `.pdp-rating-count`
- `.pdp-specs-strip` (chips horizontal) · `.pdp-spec-mini` (22 pill)
- `.pdp-price-block` (gradient blue subtle bg) / `.pdp-price-label` / `.pdp-price` (30 bold) / `.pdp-price-breakdown` / `.pdp-installments`
- `.pdp-meta-grid` (2-col key-value)
- `.pdp-actions` / `.pdp-qty` (stepper +/-) / `.pdp-add-btn` (CTA 48 blue)
- `.pdp-perks` (delivery + warranty list)
- Tabs: `.pdp-tabs` / `.pdp-tab` (+`.active` border-bottom blue) / `.pdp-tab-count` / `.pdp-tab-pane`
- Content: `.pdp-content-card` / `.pdp-section-title` / `.pdp-content-p` / `.pdp-bullets` / `.pdp-datasheet-feature-btn`

### Hero Carousel
- `.hero-carousel` (relative 21/6 aspect · margin -28px lateral)
- `.hero-slide` (absolute fade transitions)
- `.hero-slide-image` (cover bg)
- `.hero-slide-fallback img` (hide fallback)
- `.hero-dots` (pagination)
- `.hero-dot` (+`.active`)
- `.hero::after` (radial decoration)
- `.hero-eyebrow` (uppercase 12)
- `.hero h2` (40 bold white)
- `.hero p` (16 white .7)
- `.hero-cta` (CTA pill white-on-brand)
- `.hero-bg` / `.hero img` (decorative product)

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.pdp-spec-mini` (pill 22h) / `.pdp-brand-pill` | `.ds-pill` ✅ | DUPE |
| `.pdp-stock-tag` (com .in/.out) | `.ds-pill` semantic variants | DUPE |
| `.pdp-stock-dot` | `.ds-status-dot` UPGRADE 3x → **4x** | DUPE |
| `.pdp-thumb` (74×74 selectable) | `.ds-card-selectable` mini variant | Pattern |
| `.pdp-purchase` (sticky card) | `.ds-card` ✅ + sticky positioning | DUPE |
| `.pdp-content-card` | `.ds-card` ✅ | DUPE |
| `.pdp-add-btn` (CTA 48 blue) | `.ds-btn-primary .ds-btn-lg` | Near-dupe |
| `.pdp-qty` (stepper +/- 48h) | `.ds-stepper-input` CONFIRMED 2x → **3x** | DUPE |
| `.pdp-tabs` / `.pdp-tab` | `.ds-tabs` CONFIRMED 3x → **4x** | DUPE |
| `.pdp-tab-count` (pill 18 mini) | `.ds-pill` mini variant | Near-dupe |
| `.pdp-meta-grid` (2-col KV) | `.ds-kv-list` UPGRADE 2x → **3x** | DUPE |
| `.pdp-price-breakdown` (2-col KV) | `.ds-kv-list` upgrade | DUPE |
| `.pdp-section-title` | Section heading pattern · candidato | Pattern |
| `.pdp-bullets` (icon list) | `.ds-tips` confirmado | DUPE |
| `.pdp-perks` (icon + text rows) | List pattern · candidato | Pattern |
| `.pdp-datasheet-feature-btn` | `.ds-btn-ghost` | DUPE |
| `.pdp-rating-row` (stars + val + count) | Rating pattern · candidato `.ds-rating` | New |
| `.hero-carousel` (21/6 aspect) | `.ds-carousel` (new molecule) | New |
| `.hero-dots` / `.hero-dot` | `.ds-carousel-dots` (sub-molecule) | Sub-pattern |
| `.hero h2` (40 bold white) / `.hero p` | Hero text on brand · pattern já em `.ds-hero-gradient` | Pattern |
| `.hero-cta` | `.ds-btn-on-brand` CONFIRMED 2x → **3x** | DUPE |

**Estimativa migration:** ~70%. Custom restantes: PDP-specific layout (sticky purchase, specs strip), hero-carousel mecânica.

**Upgrades de atoms confirmados:**
- `.ds-status-dot` 3x → **4x** (+pdp-stock-dot)
- `.ds-stepper-input` 2x → **3x** (+pdp-qty)
- `.ds-tabs` 3x → **4x** (+pdp-tabs)
- `.ds-kv-list` 2x → **3x** (+pdp-meta-grid + pdp-price-breakdown)
- `.ds-btn-on-brand` 2x → **3x** (+hero-cta)

**Novos sugeridos:**
- `.ds-carousel` (slide com pagination dots)
- `.ds-rating` (stars + val + count)

## Notas de extração

Loja CSS estava HIGHLY scattered no index.html original. Extração feita em duas fases:

**C.23 (PDP V2 + Hero Carousel):**
- PDP V2 rich page (lines 293-469 pre-c23)
- Hero Carousel (lines 474-595 pre-c23)

**C.25b (residue cleanup · grande sweep final):**
- Store v1 layout (`.store-layout`, `.catalog`, `.grid`, `.product`, `.product-img`, `.product-info`, `.product-foot`, `.product h3`, `.tag`, `.sku`, `.tags`, `.btn-add`, `.price`)
- Cart overlay/drawer (`.cart-overlay`, `.cart`, `.cart.open`, `.cart-head`, `.cart-close`) — shared com checkout, fica em loja por simplicidade
- Product PDP v1 hero (`.product-hero`, `.gallery-main`, `.thumb`)
- Store v2 layout (`.store`, `.toolbar`, `.tabs`, `.tab`, `.search`, `.cart-trigger`, `.store-cart-badge`)
- Filters (`.filters`, `.filter-title`, `.checks`, `.price-inputs`, `.filter-group`, `.price-slider-container`, `.price-track`, `.price-fill`, `.price-input-wrapper`)
- Category bar (`.category-bar`, `.category-btn`)
- Product card v2 + v3 (`.product-card`, `.product-promo-badge`, `.product-image` + `.is-cover/.is-inset`, `.product-sku`, `.product-title`, `.product-rating`, `.rating-val`, `.rating-count`, `.product-specs`, `.spec-tag`)
- Active filter chips (`.active-filters`, `.filter-chip`, `.filter-chip-x`, `.filter-chip-clear`)
- Product footer + cart actions (`.product-footer`, `.product-actions`, `.qty-stepper`, `.cart-btn`, `.action-pill`)
- List view (`.grid.list-view` + children)
- Empty state (`.empty-state`)
- Catalog header (`.catalog-header`, `.catalog-sort`, `.catalog-controls`, `.view-toggle`, `.view-btn`)
- Store search icon + store proportions overrides

**Restante na compat block (C.25a → `ds/legacy-compat.css`):**
- Força font-family/border-radius em `.product-badge`, `.category-btn`, `.tab`, `.filter-btn` etc — esses overrides ficam em legacy layer.

## Tokens

Maioria primitives. Phase H migra junto.

## Related

- [Checkout](../checkout/README.md) — qty-stepper DUPE com pdp-qty
- [DS atoms](../../ds/) — múltiplos upgrades
