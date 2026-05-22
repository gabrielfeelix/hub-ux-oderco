# Homepage Mobile-First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the PCYES v3 homepage usable and correct on mobile (360–390px) without regressing the approved desktop design.

**Architecture:** Tailwind responsive prefixes (`md:` = 768px breakpoint) plus one `@media` token override in `theme.css`. Fixed inline widths become `clamp()`. Hover-only controls become visible-by-default, hover-gated only at `md:`+. No JS dual-render.

**Tech Stack:** React 18, Vite 6, Tailwind v4, `motion`, lucide-react. No test framework — verification is `npm run build` + browser DevTools device-mode at 360px and 390px.

**Spec:** `docs/superpowers/specs/2026-05-22-homepage-mobile-design.md`

**Verification convention:** Each task ends with `npm run build` (must succeed) and a device-mode visual check of the listed points. A final full-homepage sweep runs at the end.

---

### Task 1: Global section spacing tokens

**Files:**
- Modify: `src/styles/theme.css` (after the `:root {}` block, ~line 71)

- [ ] **Step 1: Add mobile token override**

Append after the `:root` block:

```css
/* Mobile: compress section spacing — desktop tokens leave ~256px dead space */
@media (max-width: 767px) {
  :root {
    --space-section-sm: 40px;
    --space-section-md: 56px;
    --space-section-lg: 72px;
    --space-section-xl: 96px;
  }
}
```

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check** — every section's vertical padding visibly tighter at 390px.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): mobile — compress section spacing tokens`

---

### Task 2: Shared CarouselDots component

**Files:**
- Create: `src/app/components/CarouselDots.tsx`

- [ ] **Step 1: Create the component**

A presentational + behavioral dots indicator driven by a scroll container ref. Reads `scrollLeft`/`scrollWidth`/`clientWidth`, renders one dot per page, click scrolls to that page. Mobile-only (`md:hidden` on the wrapper).

```tsx
import { useEffect, useRef, useState } from "react";

interface CarouselDotsProps {
  /** ref to the horizontally-scrollable track element */
  trackRef: React.RefObject<HTMLElement>;
  /** extra classes for the wrapper */
  className?: string;
}

export function CarouselDots({ trackRef, className = "" }: CarouselDotsProps) {
  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const recalc = () => {
      const pageW = el.clientWidth;
      const count = pageW > 0 ? Math.round(el.scrollWidth / pageW) : 0;
      setPages(count > 1 ? count : 0);
      setActive(pageW > 0 ? Math.round(el.scrollLeft / pageW) : 0);
    };

    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(recalc);
    };

    recalc();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [trackRef]);

  if (pages < 2) return null;

  return (
    <div className={`flex justify-center gap-2 md:hidden ${className}`}>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          aria-label={`Ir para página ${i + 1}`}
          onClick={() => {
            const el = trackRef.current;
            if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
          }}
          className="flex h-11 w-6 items-center justify-center"
        >
          <span
            className="block rounded-full transition-all"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.2)",
            }}
          />
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build** — `npm run build` → success (component unused yet, must still compile).
- [ ] **Step 3: Commit** — `feat(pcyes-v3): add CarouselDots mobile scroll indicator`

---

### Task 3: FlashDealsStrip — mobile

**Files:**
- Modify: `src/app/components/FlashDealsStrip.tsx`

Audit refs: card width `124`, hover buy `199-217`, hover favorite `178-197`, arrows `335-344`, swatches `267-285`, `scrollByCards` `332`, image padding `128`.

- [ ] **Step 1: Apply changes**

1. `DealCard` `width: "380px"` → `width: "clamp(264px, 78vw, 380px)"`.
2. Quick-add "Comprar" button: `opacity-0 group-hover:opacity-100` → `opacity-100 md:opacity-0 md:group-hover:opacity-100`.
3. Favorite button: same opacity transform; bump box to `h-11 w-11` on mobile (`h-11 w-11 md:h-8 md:w-8`); keep icon size.
4. Color swatches `h-3 w-3`: wrap each in a `flex h-11 w-11 items-center justify-center md:h-auto md:w-auto` hit-area, or add `p-4 md:p-0` to the button — keep the 12px visual dot.
5. Add the track ref (a `useRef<HTMLDivElement>`) if not present; pass it to `<CarouselDots trackRef={ref} />` rendered right after the track. Import `CarouselDots`.
6. Track: add `snap-x snap-mandatory` and each card `snap-start` if not already set.
7. `scrollByCards`: compute card width from `track.firstElementChild` width instead of hard-coded `(380 + 24)`.
8. Card image `object-contain p-9` → `p-4 md:p-9`.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — one card fits with a peek; "Comprar" + favorite visible; dots present; swipe snaps.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): FlashDealsStrip mobile — card width, visible actions, dots`

---

### Task 4: ProductShelf — mobile

**Files:**
- Modify: `src/app/components/ProductShelf.tsx`

Audit refs: card width `78`, arrows `331`, `scrollByCards` `320-325`, snap `385`, hover buy `173-191`, hover favorite `157-170`, swatches `243-262`, image padding `104`.

- [ ] **Step 1: Apply changes**

1. Card `width: "380px"` → `width: "clamp(264px, 78vw, 380px)"`.
2. Quick-add pill: `opacity-0 group-hover:opacity-100` → `opacity-100 md:opacity-0 md:group-hover:opacity-100`.
3. Favorite `h-8 w-8`: opacity transform + `h-11 w-11 md:h-8 md:w-8`.
4. Swatches `h-3 w-3`: 44px hit-area wrapper (as Task 3 step 4).
5. `scrollByCards`: card width from `track.firstElementChild` width, not `380 + 24`.
6. Track: `snap-x snap-mandatory` + cards `snap-start` (confirm present, add if missing).
7. Image `p-8` → `p-4 md:p-8`.
8. Add `<CarouselDots trackRef={...} />` after the track using the existing scroll-container ref. Import it.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — card peek, visible actions, dots, snap.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): ProductShelf mobile — card width, visible actions, dots`

---

### Task 5: ProductCarousel — mobile

**Files:**
- Modify: `src/app/components/ProductCarousel.tsx`

Audit refs: card width `233`, arrows `208-221`, hover add `315-323`, hover favorite `325-335`, swatches `343-365`, H2 line-height `172`, H2 clamp `167-175`.

- [ ] **Step 1: Apply changes**

1. Card `w-[300px]` → inline `width: "clamp(264px, 78vw, 440px)"` (replace the `w-[300px] md:w-[440px]` pair).
2. "Adicionar" button: `opacity-0 ... group-hover:opacity-100` → `opacity-100 md:opacity-0 md:group-hover:opacity-100`.
3. Favorite `w-9 h-9`: opacity transform + `w-11 h-11 md:w-9 md:h-9`.
4. Swatches `h-3.5 w-3.5`: 44px hit-area wrapper.
5. H2: `lineHeight: "48px"` → `lineHeight: 1.1` (unitless — fixes oversized spacing when font shrinks).
6. H2 `fontSize: clamp(36px, 5vw, 48px)` → `clamp(26px, 6vw, 48px)` (lower mobile floor).
7. Add `<CarouselDots trackRef={...} />` after the track using the existing scroll ref. Import it. Keep the existing "Arraste para navegar" hint or remove it in favor of dots — keep it; dots + hint both fine.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — card peek, visible "Adicionar", dots, heading not oversized.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): ProductCarousel mobile — card width, visible actions, dots`

---

### Task 6: DealsHighlight — mobile

**Files:**
- Modify: `src/app/components/DealsHighlight.tsx`

Audit refs: banner `minHeight` `281`, `%` decoration `295-310`, grid `248`, product grid `250`, hover add `104-122`, hover favorite `85-101`, section padding `206`.

- [ ] **Step 1: Apply changes**

1. Featured banner `minHeight: "460px"` → `minHeight: "clamp(320px, 70vw, 460px)"`.
2. `%` decoration `fontSize: 360px` → `fontSize: "clamp(160px, 48vw, 360px)"`; keep `right`/`bottom` offsets.
3. Quick-add pill: `opacity-0 group-hover:opacity-100` → `opacity-100 md:opacity-0 md:group-hover:opacity-100`.
4. Favorite `h-8 w-8`: opacity transform + `h-11 w-11 md:h-8 md:w-8`.
5. Product grid `grid-cols-2`: keep `grid-cols-2` (two compact cards per row is acceptable at 390px) but reduce card image `p-6` → `p-3 md:p-6`.
6. Section padding already uses `--space-section-*` tokens — Task 1 covers it, no change.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — banner not absurdly tall, `%` glyph no horizontal overflow, visible actions on product cards.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): DealsHighlight mobile — banner scale, visible actions`

---

### Task 7: CategoryShowcase — convert to native scroll

**Files:**
- Modify: `src/app/components/CategoryShowcase.tsx`

Audit refs: motion track `203-215`, arrows `378`/`389`, card width `226`, viewport height `202`, CTA `308-324`, dots `353-367`.

- [ ] **Step 1: Apply changes**

1. Replace the `motion.div` transform track with a native scroll container: a `<div ref={trackRef} className="flex gap-... overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>`. Remove the `x` transform / motion animation driving slide position. Desktop arrows now call `trackRef.current.scrollBy(...)` instead of mutating an index.
2. Card width `calc((100% - 48px) / 3)` → `clamp(220px, 70vw, calc((100% - 48px) / 3))` so mobile shows ~1.3 cards (peek), desktop keeps 3.
3. Each card gets `snap-start`.
4. Viewport height `clamp(360px, 38vw, 460px)` → `clamp(300px, 56vw, 460px)` (avoids tall thin slivers on mobile).
5. Arrows stay `hidden md:flex` (correct — mobile uses swipe).
6. Replace the 15-`<span>` per-card dot block with `<CarouselDots trackRef={trackRef} />` rendered once below the track. Import it. Remove the old dot markup.
7. Featured-card CTA `<Link>` `py-2.5` → `py-2.5 md:py-2.5` then add `min-h-[44px] flex items-center justify-center` for the mobile tap target.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — carousel swipes, ~1.3 cards visible, dots track position, CTA tappable. Desktop: 3 cards, arrows work.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): CategoryShowcase mobile — native scroll, swipe, dots`

---

### Task 8: EssentialsSection + IntelligentDevices — mobile

**Files:**
- Modify: `src/app/components/EssentialsSection.tsx`
- Modify: `src/app/components/IntelligentDevices.tsx`

EssentialsSection audit refs: image align `67`, image `max-h` `72`, swatches `123-127`, CTA `178`.
IntelligentDevices audit refs: grid `188`, hover favorite/add `219`/`243`, category gap `144`, image padding `215`.

- [ ] **Step 1: EssentialsSection changes**

1. Card image side `justify-start pl-8` → `justify-center md:justify-start pl-0 md:pl-8` (centers image on mobile stack).
2. Image `max-h-[280px]` → `max-h-[200px] md:max-h-[280px]`.
3. Swatches `h-4 w-4`: 44px hit-area wrapper.
4. "Comprar" button `px-7 py-2.5` → add `min-h-[44px]`.

- [ ] **Step 2: IntelligentDevices changes**

1. Product grid `grid-cols-2` → `grid-cols-1 sm:grid-cols-2` (one column at 360px, two from 640px).
2. Favorite + quick-add: `opacity-0 group-hover:opacity-100` → `opacity-100 md:opacity-0 md:group-hover:opacity-100`.
3. Favorite `h-8 w-8` → `h-11 w-11 md:h-8 md:w-8`.
4. Category circles gap `gap-8` → `gap-4 md:gap-8`.
5. Product image `p-7` → `p-4 md:p-7`.
6. "Ver mais" link `py-2.5` → add `min-h-[44px] inline-flex items-center`.

- [ ] **Step 3: Build** — `npm run build` → success.
- [ ] **Step 4: Visual check (390px)** — Essentials image centered, swatches tappable; IntelligentDevices one column, visible actions.
- [ ] **Step 5: Commit** — `fix(pcyes-v3): Essentials + IntelligentDevices mobile layout`

---

### Task 9: GpuShowcase — mobile

**Files:**
- Modify: `src/app/components/GpuShowcase.tsx`

Audit refs: touchmove handler `84-103`, aspect ratio `214-222`, badges `281`/`314`/`349`, pills `179`, featured card `414-491`.

- [ ] **Step 1: Apply changes**

1. Comparison area `aspectRatio: "21/9"` → `aspectRatio: "4/3"` on mobile, `21/9` on `md+`. Implement via a state-free CSS approach: set `style={{ aspectRatio: "4 / 3" }}` and add Tailwind `md:[aspect-ratio:21/9]`, OR a CSS class with a `@media` rule. Prefer the Tailwind arbitrary variant.
2. `onMove` touch handler: when dragging, call `e.preventDefault()`. Also add `touch-action: none` to the comparison container so vertical page scroll does not fight the drag.
3. Badge clusters: on mobile reduce font sizes and constrain the top-center metric badge with `max-w-[90vw]` + allow wrap (`whitespace-normal`), so `metric · tagline` stops overflowing. Bottom-left/right badges: shift inset so they do not collide (e.g. smaller `bottom`/`left` offsets on mobile) or stack — pick non-overlap at 360px.
4. GPU pill selector `px-5 py-2.5`: add `min-h-[44px]`.
5. Featured product card row `flex items-center`: → `flex-col md:flex-row` so image/text/button stack on mobile; "Comprar" button `px-10` → `px-6 md:px-10`.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — comparison area is 4:3 (not a thin strip), badges do not collide/overflow, drag handle moves without scrolling the page, featured card stacks.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): GpuShowcase mobile — aspect ratio, badges, touch drag`

---

### Task 10: Newsletter — mobile

**Files:**
- Modify: `src/app/components/Newsletter.tsx`

Audit refs: form row `148-186`, input/button sizing `156-185`, headline `73-85`.

- [ ] **Step 1: Apply changes**

1. Form container `flex items-center` → `flex flex-col md:flex-row md:items-center` (stacks on mobile).
2. Input: ensure `w-full` on mobile; padding to reach ≥44px height (`py-3` or explicit `minHeight: 44`).
3. Submit button: `w-full md:w-auto`, `min-h-[44px]`, remove `whitespace-nowrap` dependency for shrink (full-width on mobile makes it moot).
4. Headline `fontSize: clamp(32px, 4.5vw, 52px)` → `clamp(26px, 7vw, 52px)`.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — input full width above button, both ≥44px, no squeeze.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): Newsletter mobile — stack form, 44px targets`

---

### Task 11: HeroSection — mobile bugs + height

**Files:**
- Modify: `src/app/components/HeroSection.tsx`

Audit refs: top padding `95`, carousel height `100`, gap/track math `103-104`, dots `207-210`. **Do not change banner imagery, object-fit, or visual treatment.**

- [ ] **Step 1: Apply changes**

1. Top padding `pt-[160px]` → `pt-[96px] md:pt-[160px]` (kills mobile dead space; keeps desktop header reserve).
2. Carousel height `clamp(420px, 48vw, 600px)` → `clamp(300px, 62vw, 600px)` (mobile floor 300px instead of 420px so the banner is not tall-and-narrow; desktop unchanged at the 600px cap).
3. Slide gap `44px` → use `clamp(14px, 4vw, 44px)`; update the track `x` translate math that references `44px` to use the same value (extract to a const so the gap and the transform stay in sync).
4. Dots: keep the 8px visual `<span>` but wrap each dot button so its tap target is ≥44px — `className` on the button to `flex h-11 w-11 items-center justify-center` (or `h-11` with horizontal padding), visual dot stays small.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — no dead space above banner, banner height proportionate, slides snug, dots easy to tap. Banner images themselves unchanged.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): HeroSection mobile — kill dead space, height, dots`

---

### Task 12: TrustStrip + DropDoDiaSection + Footer — mobile polish

**Files:**
- Modify: `src/app/components/TrustStrip.tsx`
- Modify: `src/app/components/DropDoDiaSection.tsx`
- Modify: `src/app/components/Footer.tsx`

Audit refs: TrustStrip grid `38`; DropDoDia image `111`; Footer links `184-190`, social `163-173`.

- [ ] **Step 1: TrustStrip** — grid `grid-cols-2`: verify wrapping at 360px; if titles/descs crowd, change to `grid-cols-1 min-[420px]:grid-cols-2` (single column on the smallest phones). Keep `grid-cols-2` from 420px+.

- [ ] **Step 2: DropDoDiaSection** — product image container `h-[260px]` with `object-contain p-8` → image padding `p-8` → `p-4 md:p-8` (more room for the product on a narrow card).

- [ ] **Step 3: Footer** — link rows: add `py-2` to each link so tap height ≥44px. Social icons `w-10 h-10` → `w-11 h-11`.

- [ ] **Step 4: Build** — `npm run build` → success.
- [ ] **Step 5: Visual check (360px)** — TrustStrip cells not crowded, DropDoDia product larger, Footer links comfortably tappable.
- [ ] **Step 6: Commit** — `fix(pcyes-v3): TrustStrip + DropDoDia + Footer mobile polish`

---

### Task 13: InRealLifeSection — mobile

**Files:**
- Modify: `src/app/components/InRealLifeSection.tsx`

Audit refs: modal panel `319`, image tag-dots `278-300`, carousel arrows `173-184`, card overlay `212-242`, gallery card width `198`, modal product rows `345-403`, modal close `321-326`.

- [ ] **Step 1: Apply changes**

1. Carousel arrows `opacity-0 group-hover/carousel:opacity-100` → `opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100` (visible on mobile).
2. Card overlay (`@username` + product-dot preview) `opacity-0 group-hover/card:opacity-100` → `opacity-100 md:opacity-0 md:group-hover/card:opacity-100`.
3. Gallery card `w-[260px]` → `w-[240px]` (lets the next card peek at 360px).
4. Image tag-dots `w-7 h-7` / `w-9 h-9`: wrap each in a `flex h-11 w-11 items-center justify-center` tap area; keep the small visual dot inside.
5. Modal: image side gets `max-h-[40vh] md:max-h-none` so the product list/CTA stay on screen on mobile.
6. Modal close button: add `flex h-11 w-11 items-center justify-center` around the `X` icon.
7. Modal product-row cart button `w-9 h-9` → `w-11 h-11 md:w-9 md:h-9`.

- [ ] **Step 2: Build** — `npm run build` → success.
- [ ] **Step 3: Visual check (390px)** — arrows + usernames visible, dots tappable, modal image capped so list/CTA reachable.
- [ ] **Step 4: Commit** — `fix(pcyes-v3): InRealLifeSection mobile — visible controls, tap targets, modal`

---

### Task 14: Final full-homepage mobile sweep

**Files:** none (verification only)

- [ ] **Step 1:** `npm run build` → success.
- [ ] **Step 2:** Run `npm run dev`, open the homepage in browser DevTools device mode at 360px and 390px. Scroll the entire page top to bottom.
- [ ] **Step 3:** Confirm against spec success criteria: no horizontal overflow at 360px; every add-to-cart/favorite reachable; every carousel swipeable with peek + dots; interactive targets ≥44px; section spacing proportionate.
- [ ] **Step 4:** Spot-check desktop at ≥1280px — layout unchanged from before.
- [ ] **Step 5:** Fix any regression found, then commit — `fix(pcyes-v3): homepage mobile sweep — final corrections` (skip the commit if nothing found).

---

## Self-Review

**Spec coverage:** Spec blocks 1–9 → Tasks 1, 3–13. Shared dots component (spec block 3) → Task 2. Final sweep → Task 14. All spec blocks covered.

**Placeholder scan:** No "TBD"/"TODO". Pattern-based string transforms reference exact audit line numbers and give concrete before/after values. Executor reads each file to locate the exact current string — expected for a responsive sweep across 13 files.

**Type consistency:** `CarouselDots` props (`trackRef`, `className`) defined in Task 2, consumed identically in Tasks 3, 4, 5, 7. Breakpoint `md:` (768px) and the `clamp(264px, 78vw, 380px)` card-width formula used consistently across card tasks.
