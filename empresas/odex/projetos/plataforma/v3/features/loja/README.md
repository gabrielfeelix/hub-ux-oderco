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

Loja CSS é HIGHLY scattered no index.html original. Esta extração cobre só os 2 blocos maiores bem-delimitados:
- **PDP V2** (lines 293-469 do index pre-c23)
- **Hero Carousel** (lines 474-595 do index pre-c23)

**Ficam no index.html (legacy compat · cleanup em C.25):**
- `.product` / `.product-card` (loja grid card)
- `.product-img` / `.product-badge` / `.product-info`
- `.product-actions` / `.qty-stepper` / `.cart-btn` (shared com cart)
- `.product-footer` / `.price-block`
- `.filter-chip` / `.filter-chip-clear` / `.active-filters`
- `.store` / `.store-layout` / `.store-page` (v1 + v2)
- `.toolbar` / `.search` / `.search-icon` / `.search-clear`
- `.category-btn` (filter button)
- `.filter-group` / `.price-slider` / `.price-track` / `.price-fill`
- `.catalog` / `.catalog-head` / `.catalog-header` / `.catalog-controls`
- `.grid.list-view` overrides
- `.spec-tag` / `.product-rating` / `.product-specs`

## Tokens

Maioria primitives. Phase H migra junto.

## Related

- [Checkout](../checkout/README.md) — qty-stepper DUPE com pdp-qty
- [DS atoms](../../ds/) — múltiplos upgrades
