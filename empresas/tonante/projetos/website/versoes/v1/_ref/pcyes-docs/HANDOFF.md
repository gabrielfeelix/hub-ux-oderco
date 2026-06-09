# PCYES V3 — Handoff (2026-06-03)

Read this before doing anything. It compresses ~12h of context so you can pick up without re-discovering the codebase.

---

## 1. What this project is

Prototype of the new **PCYES storefront** (Brazilian gamer hardware brand). Lives at:

```
/home/gabrielbarbosa/dev/ux-prototipos/empresas/pcyes/projetos/pcyes-v2/versoes/v3/
```

Stack: Vite + React 18 + react-router v6 + Tailwind 4 + motion/react + shadcn/ui + react-helmet-async.

Mounted inside a Next.js monorepo at the root `ux-prototipos/`. Vercel deploy is from the **monorepo root**, but the v3 lives in a sub-path served as prototype. Production alias:

```
https://ux-oderco.vercel.app
```

Deploy command from monorepo root:

```bash
cd /home/gabrielbarbosa/dev/ux-prototipos
vercel --prod
```

User memory rule (saved in CLAUDE.md): `vercel --prod` from `ux-prototipos` root. `public/` subfolders must be in vite `prototypePublicRoots` or 404.

---

## 2. Where the design system lives

| File | What's in it |
|---|---|
| `design.md` | Full DS audit — 16+ sections covering identity, tokens, components, motion, accessibility, theming. **Read this first.** |
| `design-section-map.md` | Section → primitives mapping. Tells you which DS primitive each home/product/checkout surface consumes. |
| `tokens.json` | DTCG format export (W3C spec). |
| `tokens.studio.json` | Tokens Studio for Figma native format. Already imported into the team's Figma file (3 collections, 32 paints, 20 effects, 16 text styles). |
| `src/styles/theme.css` | **Source of truth.** All CSS custom properties, `@theme inline` exposure, base layer, custom variants (`notebook:`, `short:`). Currently 65 tokens. |
| `src/app/components/section/` | 12 DS primitive components — Eyebrow, SectionHeader, SectionContainer, CTAButton, QuickAddButton, DiscountBadge, BrindePill, PreOrderPill, Tag, FieldLabel, FieldInput, QtyStepper. Plus `index.ts` barrel + `SEO.tsx` lives one level up. |

Figma file (Token Studio synced):

```
https://www.figma.com/design/A0Zg3I15KcYI82zZocmyjD/PCYES-V2--DS-
```

---

## 3. What's been done (last several days)

Recent commits worth knowing (newest first, summary):

| Commit | What |
|---|---|
| `d0eba1f2` | DS tokens — added `--shadow-card-hairline` + `--shadow-medallion`. Swept 19 hardcoded inline copies. |
| `bfed1aec` | Mobile fixes — DealsHighlight CTA compact, IntelligentDevices rail (10 categories, runtime-filter empty, chevron right), filter empty cats. |
| `4ea7449b` | TrustStrip mobile — chevron-only carousel (dropped auto-rotate/dots per user feedback). |
| `7e397700` | ProfilePage — single coin, top stroke for active mobile tab, CSS mask fade, "Ver todas as abas" sheet with grid. |
| `5e27d37b` | Hero mobile taller (clamp 460-620, 78dvh cap), removed broken srcMobile. |
| `902bb475` | A11y batch — skip link, `<main>`, reduced motion, Hero pause, aria-label sweep on icon buttons, FieldInput `required`/`invalid` props. Responsive — custom `notebook:` + `short:` variants. dvh in layout. |
| `ced194e7` | TrustStrip + Hero mobile + A1 stage 6 sitemap (597 URLs). |
| `a2b2e84a` | A1 stage 5 — client-side redirect from /produto/:id to slug URL. Fixed primaryImage scope bug. |
| `9ad3d208` | A1 stage 4 — canonical + JSON-LD now point at semantic slug URLs. |
| `0fb5d29e` | A1 stage 3 — `getCatalogHref` emits semantic URLs. |
| `e9d05396` | A1 stage 2 — parallel slug routes (legacy /produtos?... still works). |
| `4acd4a7f` | A1 stage 1 — `src/app/lib/slug.ts` utilities + maps. |
| `ff396e95` | SEO meta + canonical + JSON-LD primitive. |
| `96361d84` | UX/SEO batch — D1 ViaCEP real, C1 TrustStrip bigger, C2 hero compress mobile, C3 banner center mobile, C4 breadcrumb mobile + semantic, B1 H2 dup ProductPage. |
| (earlier) | Token promotion + DS primitives + ~200 hardcoded refs migrated. See `design.md §16 changelog`. |

The full changelog is in `design.md` under "Histórico de auditoria".

---

## 4. What's pending

### DS / Tokens (organized by risk)

| Item | Risk | Notes |
|---|---|---|
| **Migrate 11 hand-rolled buy CTAs** to `<CTAButton>` or `<QuickAddButton>` | Medium | Files: CheckoutPage, CartDrawer, CartPage, ProductsPage, GpuShowcase, IntelligentDevices, EssentialsSection, FeaturedProduct, NewReleasesSection, MonteSeuPcPage. Each needs visual check — sizes differ. |
| **Sweep borderRadius numeric** (10/14/16/20/24) → token family | Medium | 121 inline copies. Risk: 2-4px visual diff. Map: 10→`--radius-card-sm` (12), 20→`--radius-card-lg` (22), 24→`--radius-card-xl` (26). 14 and 16 have no token — decide before sweeping. |
| **Contrast token migration** (`text-foreground/15-25`) | High visual | 48 instances. WCAG 1.4.3 risk in dark mode. Need utility classes `text-muted-strong` (foreground/70+) etc. and case-by-case migration. |
| **Hairline alpha variants** (0.04, 0.06) | Low | 15 remaining inline copies use marginally different alphas. Decide if `--shadow-card-hairline-strong` / `-subtle` are needed. |
| **ProductCard formal extraction** | High | 5+ duplications across ProductShelf/FlashDealsStrip/DealsHighlight/Essentials/DropDoDia. Biggest payoff still untouched. Risk: visual regression easy. |
| **Modal/Drawer base primitives** | Medium | 5 modals share recipe (SearchModal, WelcomePopup, AddressFormModal, AuthModal, CookieConsent). Right-anchored sheet pattern (CartDrawer) is its own primitive. |
| **CarouselNavButton** (h-12 chevron) | Low | 5+ usages (ProductShelf, FlashDealsStrip, CategoryShowcase, ProductCarousel, etc). Easy primitive extraction. |
| **TrustStrip / Nerd Pride / mega-menu pill** primitives | Low | 1-3 usages each. Low value. |
| **CheckoutPage forms → FieldLabel/FieldInput** | Low | Primitive exists, just apply across ~30 inputs. Pure mechanical. |
| **Semantic light mode tokens** (roadmap §10.4) | High | 250-line CSS override exists today. Replace by `--surface-0/1/2`, `--text-strong/default/muted/subtle`, `--border-subtle/default/strong` semantic tokens that flip per mode. 6-phase migration roadmap is documented in `design.md §10.4`. |

### SEO / UX still on the user's list

- Item 2 from SEO doc — **"remover excesso de div/span"** — never audited or applied. Marketing/lighthouse score work, low strategic priority.
- Item 4 partial — **"controle de tamanho da letra" no rich text editor** — `CategorySeoBlock` now supports H2/H3/bold via `nodes[]`; arbitrary font-size control would need a real WYSIWYG editor (over-engineered for prototype).
- Items 6, 11, 12, 13 from SEO doc — user never sent the screenshots. Ask them if they want.

### Mobile audit recent fixes (done)

- Hero pt overlap header → fixed by switching to `calc(...+var(--announce-h))` (today's commit, see §5).
- TrustStrip dots dropped, chevron right.
- DealsHighlight CTA compact mobile.
- IntelligentDevices rail + 10 categories + empty-category filter.
- ProfilePage: single coin, top stroke, mask fade, "Ver todas as abas" sheet.

---

## 5. Today's last change — layout reflow when AnnouncementBar dismisses

**Problem reported by user:** "quando eu tiro a faixinha de banner que fica no topo, o header sobe, mas os banners não sobem junto, a página fica fixa."

**Cause:** Pages used hardcoded `pt-[120px] md:pt-[210px]` assuming the announcement bar was always there.

**Fix:** Replaced all top-padding offsets with `calc(<base>+var(--announce-h))`. The `--announce-h` is set by `AnnouncementBar.tsx` to `40px` when present, `0px` on dismiss. Default `40px` is also declared in `theme.css :root` so first paint doesn't flash.

Files touched today (NOT yet committed):

- `src/styles/theme.css` — add `--announce-h: 40px` default.
- `src/app/components/HeroSection.tsx` — `pt-[calc(80px+var(--announce-h))] md:pt-[calc(170px+var(--announce-h))] notebook:pt-[calc(108px+var(--announce-h))]`
- `src/app/components/ProductsPage.tsx` — `pt-[calc(56px+var(--announce-h))] md:pt-[calc(142px+var(--announce-h))] notebook:pt-[calc(92px+var(--announce-h))]`
- `src/app/components/ProductPage.tsx` — `pt-[calc(56px+var(--announce-h))] lg:pt-[calc(180px+var(--announce-h))] notebook:pt-[calc(120px+var(--announce-h))]`
- `src/app/components/ProfilePage.tsx` — two spots, mobile + md+
- `src/app/components/PreOrderPage.tsx` — one spot

`MonteSeuPcPage`, `QuemSomosPage`, `DriverDetailPage`, `FaqPage`, `Warranty`, `PrivacyPage`, `TermsPage` were not audited — they might still have hardcoded `pt-` somewhere. Check before final ship.

The next AI should: **commit + push + deploy this**, then continue per the user's request.

---

## 6. URL routing model (A1, all 6 stages shipped)

Both legacy and semantic URLs work in parallel:

| Legacy | Semantic |
|---|---|
| `/produtos?category=Periféricos` | `/perifericos/` |
| `/produtos?category=Periféricos&subcategory=Mouses` | `/perifericos/mouses/` |
| `/produto/128` | `/perifericos/mouses/pcyes/vertical-ergonomico-rest-mrsc01/` (auto-redirected client-side) |

Slug builder utilities live in `src/app/lib/slug.ts`:

```ts
import { getProductUrl, getCategoryUrl, getProductSlug, getCategoryFromSlug } from "../lib/slug";
```

`getCatalogHref()` in `productPresentation.ts` already emits the semantic form. `SEO.tsx` canonical points at the slug URL.

When you add a new product, the slug comes from `Product.seoSlug` if set, otherwise `slugify(name)`.

---

## 7. SEO meta primitive

`src/app/components/SEO.tsx` wraps `react-helmet-async`. Pages drop this near the top of their JSX:

```tsx
<SEO
  title="..."
  description="..."
  canonicalPath="/categoria/sub/"   // semantic URL
  image="..."                        // og:image
  ogType="website" | "product"
  robots="index" | "noindex"         // noindex when filter combos active
  jsonLd={[ /* Product, BreadcrumbList, Organization, etc */ ]}
/>
```

Already applied on `HomePage` (Organization schema), `ProductPage` (Product + BreadcrumbList), `ProductsPage` (BreadcrumbList, with `noindex` when `activeFilterCount > 0`).

Apply to remaining pages when the team asks (PreOrderPage, MonteSeuPcPage, etc).

---

## 8. Accessibility status

| Rule | Status |
|---|---|
| 2.4.1 Bypass Blocks (skip link) | ✅ `RootLayout.tsx` |
| 1.3.1 `<main>` landmark | ✅ `RootLayout.tsx` |
| 2.2.2 Pause carousel | ✅ Hero has Play/Pause button + auto-pause on focus/hover/reduced-motion |
| 2.3.3 Reduced motion | ✅ `theme.css` `@media (prefers-reduced-motion: reduce)` |
| 4.1.2 aria-label on icon-only buttons | Partial — Navbar (search/heart/user/cart), CartDrawer (close/remove/coupon/gift). Other components NOT swept yet (`SearchModal`, `CardFormModal`, etc). |
| 1.4.3 Contrast | 48 `text-foreground/15-25` instances at risk. **Not fixed.** |
| 3.3.1 / 4.1.2 Form a11y | `FieldInput` primitive supports `required`/`invalid`; consumers must opt in. AddressFormModal already migrated. CheckoutPage NOT migrated. |

Full report and prioritization is in the most recent assistant turn — search the conversation for "# Accessibility audit". If lost, re-run: grep for `<button` without `aria-label` in icon-only contexts.

---

## 9. Responsive status

Custom Tailwind variants live in `theme.css`:

```css
@custom-variant notebook (@media (min-width: 1024px) and (max-height: 820px));
@custom-variant short    (@media (max-height: 720px));
```

Use `notebook:pt-[148px]` etc to compress header padding on small laptops (1366×720). The dvh-capped Hero height (`min(clamp(...), 70dvh|60dvh)`) protects the first fold.

`RootLayout` now uses `min-h-dvh` instead of `min-h-screen`.

---

## 10. Things that will trip you up

- **Multiple PageIntros bug**: When iterating on Figma pages, `findOne()` only catches one duplicate. Use `await page.loadAsync()` then `page.children.filter(...)` to find ALL duplicates per page.
- **Tailwind `bg-[var(--gradient-buy)]`**: this maps to `background-color` not `background-image`. For gradient tokens use `[background-image:var(--gradient-buy)]` explicitly. Bug fixed in `CTAButton` (commit `16197651`).
- **`<picture>` source 404 fallback**: if `<source media="...">` points at a broken URL, browser sticks with the broken source — doesn't fall back to the `<img>`. Don't add `srcMobile` until the asset file actually exists.
- **CheckoutPage has 4 `<h1>`** — conditional per step (cart empty, address, payment, success). Probably renders one at a time, but worth verifying before declaring h1-once compliance.
- **`useParams` after refactor**: When you change `const { id } = useParams()` to `const params = useParams()`, grep the file for bare `id` references before committing — got bit by this in commit `b9961725`.
- **Hub is Next.js**: monorepo root is Next 14+, but PCYES v3 is Vite. Don't confuse the two when looking at vercel.json / build configs.

---

## 11. Recommended next moves (in priority order)

1. **Commit + push + deploy the announce-h reflow fix** (today's pending work, §5).
2. **Migrate the 11 hand-rolled buy CTAs** to primitives — kills the shadow drift the cloud-claude audit found.
3. **CheckoutPage / CartPage forms → FieldInput/FieldLabel** — mechanical, low risk, biggest accessibility upgrade for forms.
4. **Extract `<CarouselNavButton>` primitive** — quick win, 5+ consumers.
5. **Run a contrast pass** on the 48 `text-foreground/15-25` instances. Don't sweep; review each and bump as appropriate.
6. **Tackle `<ProductCard>` formal extraction** — biggest DS payoff still pending. Plan the API first.
7. **Semantic light mode** roadmap §10.4 — when the team is ready to take that on.

---

## 12. Conventions to keep

- **No emojis** in code, files, file names. User requested this.
- **No em-dashes (`—`)** in user-facing text. ASCII hyphens or periods.
- **Caveman mode** is the active conversation style: terse, no filler, fragments OK. Switch off only on user request.
- **Commit messages**: prose paragraphs, no bullet points, factual. End with the Co-Authored-By line. See `git log` for the established voice.
- Memory rule: **commit after each phase/feature/refactor without waiting for ask**.
- Memory rule: **PCYES v3 is mobile-first**.
- Memory rule: **Kaspersky may MITM Docker containers** — if container can't reach HTTPS, add Kaspersky root CA to its trust store.

---

## 13. The current todo list

```
1. Add tokens + sweep done — completed
2. Commit + push + deploy — in progress (the announce-h reflow fix)
3. Next: borderRadius sweep (medium risk) + buy CTAs migration + design.md update — pending
```

Use this as your starting point. Add the pending items the user asked about as new todos.

Good luck.
