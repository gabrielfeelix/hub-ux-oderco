# Homepage Mobile-First — Design Spec

**Date:** 2026-05-22
**Scope:** PCYES v3 homepage only (`src/app/components/HomePage.tsx` and its sections). No v2, no other prototypes.

## Problem

The homepage was designed and built desktop-only. The whole project has **zero `@media` queries** and almost no Tailwind responsive prefixes. Components mix Tailwind `className` with inline `style={{}}`. On a 360–390px viewport the homepage has ~50 mobile defects across functional, layout, and touch-target categories.

## Goal

Make the homepage usable and correct on mobile (target 360px and 390px wide) without regressing the approved desktop design. Banner **imagery/visuals** of the hero stay untouched; hero mobile bugs are in scope.

## Approach

**Tailwind responsive prefixes + token `@media` overrides.** Chosen over a CSS-classes rewrite or a JS `useMediaQuery` dual-render because the codebase already uses the `md:` breakpoint and `clamp()`, so this is the idiomatic, lowest-risk path.

- **Breakpoint:** `<768px` = mobile (aligns with Tailwind `md:`).
- Section spacing: one `@media (max-width: 767px)` block in `theme.css` overrides the `--space-section-*` tokens — fixes vertical padding across every section at once.
- Fixed inline-style widths → `clamp()` (responsive without a media query).
- Hover-only controls → visible by default, hover-gated only at `md:` and up.

## User decisions (approved)

1. **Hero:** fix bugs **and** shrink hero height on mobile. Do not touch banner imagery/visuals.
2. **Carousels:** swipe + next-card peek + position dots on mobile. No arrows on mobile.
3. **Card actions:** add-to-cart and favorite buttons always visible on mobile.

## Fix plan (9 blocks)

### Block 1 — Global tokens (`src/styles/theme.css`)
Add `@media (max-width: 767px)` overriding section tokens to mobile values:
`--space-section-sm` 56→40px, `--space-section-md` 88→56px, `--space-section-lg` 128→72px, `--space-section-xl` 168→96px. Fixes empty vertical space in every section.

### Block 2 — Product cards (FlashDealsStrip, DealsHighlight, ProductShelf, ProductCarousel, IntelligentDevices, EssentialsSection)
Single repeated pattern:
- Fixed card width `380px`/`300px` → `clamp(264px, 78vw, 380px)` — card fits a 360px screen with a peek of the next.
- Add-to-cart + favorite: `opacity-0 group-hover:opacity-100` → `opacity-100 md:opacity-0 md:group-hover:opacity-100` — always visible on mobile.
- Favorite button 32–36px → 44px tap target. Color swatches (12–16px) get a 44px hit-area wrapper.
- `scrollByCards` magic numbers (`380 + 24`) recomputed from actual card width.

### Block 3 — Carousels (all shelves)
- Nav arrows `hidden md:flex` (gone on mobile).
- New shared **position-dots** indicator shown on mobile, driven by scroll position.
- `scroll-snap-type: x mandatory` + `scroll-snap-align: start` on every track so swipe lands cleanly.

### Block 4 — CategoryShowcase
Convert the `motion.div` transform track to a native `overflow-x` scroll container so touch swipe works (today it is frozen on mobile). Mobile shows ~1.3 cards (peek). Replace the 15-dot per-card indicator with the shared position-dots.

### Block 5 — GpuShowcase
- Comparison area `aspectRatio: 21/9` → `4/3` on mobile (stops the ~154px-tall strip).
- Badge clusters stack / shorten on mobile so they stop colliding and overflowing.
- `touchmove` handler calls `e.preventDefault()` while dragging (or `touch-action: none` on the container) so the slider stops fighting page scroll.

### Block 6 — Newsletter
Form row `flex-row` → `flex-col md:flex-row`. Input and submit button each ≥44px tall on mobile. Headline clamp floor lowered for 360px.

### Block 7 — Hero
- Remove `pt-[160px]` dead space → responsive top padding matching the mobile header.
- Carousel height: lower the mobile floor (~300px) so the banner is not tall-and-narrow.
- Slide gap `44px` → ~14px on mobile.
- Dots `h-2` (8px) → wrapped in ≥44px tap targets.
- Banner imagery, object-fit, and visual treatment unchanged.

### Block 8 — Grids & spacing
- TrustStrip / IntelligentDevices / DealsHighlight `grid-cols-2` reviewed → 1 col where cramped at 360px.
- DropDoDiaSection product image `p-8` → `p-4` on mobile.
- Footer link rows get vertical padding so each link is a ≥44px tap target.

### Block 9 — InRealLifeSection
- Carousel arrows `hover`-only → visible on mobile.
- Card overlay (`@username`, product-dot preview) `group-hover`-gated → visible by default on mobile.
- Modal: image height-capped on mobile (`max-h-[40vh]`) so the product list/CTA stay reachable.
- Image tag-dots 28–36px → ≥44px tap targets. Modal close button ≥44px.

## Out of scope

- Hero banner imagery / visual design.
- v2 and other prototypes.
- Desktop layout changes (≥768px stays as the approved design).
- Non-homepage pages.

## Delivery

- One commit per block (project rule: commit frequently after each block).
- Verify in a browser at 360px and 390px viewport before final.

## Success criteria

- No horizontal page overflow at 360px.
- Every add-to-cart / favorite reachable by touch.
- Every carousel swipeable with a visible scroll affordance (peek + dots).
- Interactive targets ≥44×44px.
- Section vertical spacing proportionate on mobile.
- Desktop (≥768px) visually unchanged.
