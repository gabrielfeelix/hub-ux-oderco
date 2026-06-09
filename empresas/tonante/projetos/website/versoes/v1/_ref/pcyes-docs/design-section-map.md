# PCYES V3 — Section → Primitivos Map

> Mapa visual seção-por-seção. Anexo do `design.md`. Última sync: 2026-05-28.
>
> **Como usar (designer Figma):** veja a seção que quer reconstruir → pegue lista de primitivos usados → consulte spec em `design.md §8.1.1` ou direto o componente em `src/app/components/section/`.

---

## Home

Ordem real em [`HomePage.tsx`](src/app/components/HomePage.tsx).

### 1. HeroSection (`HeroSection.tsx`)
- **Header dark** — sempre fora do scope `data-page-light-scope`
- Carousel slides com `.hero-card` className → `--shadow-hero-card-hover` + `--gradient-hero-stroke[-hover]`
- Stagger reveal com easing house `[0.16, 1, 0.3, 1]`
- Sem primitivo do DS (ainda) — sliding logic é complexa, candidato pra `<HeroCarousel>` futuro

### 2. TrustStrip (`TrustStrip.tsx`)
- Strip `border-y` `bg-[#0a0a0a]`, max-width 1200px
- 4 colunas, `h-11 w-11 rounded-pill` icon container (hover → primary)
- Sem primitivo (1 spot só)

### 3. DropDoDiaSection (`DropDoDiaSection.tsx`)
- `<SectionHeader>` eyebrow="// DROP DO DIA" + icon Flame, size=md, weight=700, **animated=false**
- 3x card premium com `--radius-card-xl` (26px), red radial gradient bg
- `<DiscountBadge percent>` por card
- `<CTAButton variant="buy" size="lg" block>` por card

### 4. FlashDealsStrip (`FlashDealsStrip.tsx`)
- `<SectionHeader>` eyebrow="// PROMOÇÕES DA SEMANA" + Flame icon, size=md, weight=700
- Countdown chip com `data-keep-dark` (dark mesmo em light theme)
- Horizontal shelf 5/6 ratio cards
- `<DiscountBadge percent>` / `<PreOrderPill info>` por card
- `<CTAButton variant="buy-sm" size="lg">` quick-add hover
- `.deal-card-img` className → `--shadow-deal-hover`

### 5. CategoryShowcase (`CategoryShowcase.tsx`)
- `<SectionHeader>` eyebrow="EXPLORE" (sem `//`), size=lg, weight=700, animated=false
- Horizontal scroll cards com `--radius-card-xl` (26px)
- `.category-active:hover` className → `--shadow-category-active`

### 6. DealsHighlight ("Hall da meta")
- `<SectionHeader>` eyebrow="// HALL DA META", size=sm, weight=600 (default)
- Grid `2fr_1fr` — 6 small cards + 1 featured
- `<DiscountBadge percent>` por card
- `<CTAButton variant="buy-sm" size="lg">` quick-add hover

### 7. ProductShelf ("MAIS VENDIDOS")
- `<SectionHeader>` eyebrow="// MAIS VENDIDOS", size=sm, weight=600
- Horizontal shelf 5/6 ratio cards
- Ranking medallion `--gradient-brand` (Top 10)
- `<DiscountBadge percent>` / `<PreOrderPill info>` por card
- `<CTAButton variant="buy-sm" size="lg">` quick-add hover

### 8. EssentialsSection
- Grid `grid-cols-1 md:grid-cols-[2fr_3fr]`
- Cards com `.essential-card` className → `--shadow-essential-hover`
- `<Tag variant="brand">` chips (Destaques)

### 9. IntelligentDevices
- Eyebrow custom Inter 11/700 ls 0.3em primary
- **`.glitch-word`** — chromatic aberration animado cyclando ["Gamers", "Streamers", "Escritório", "Performance"]
- Sem primitivos do DS

### 10. GpuShowcase
- Before/after slider
- Sem primitivos

### 11. ProductShelf ("LANÇAMENTOS")
- Mesmo que #7

### 12. InRealLifeSection
- UGC grid
- Sem primitivos

### 13. Newsletter (`Newsletter.tsx`)
- `<Eyebrow>FIQUE POR DENTRO</Eyebrow>` (standalone, não SectionHeader pois title é gigante 52px)
- h2 fluid 26-52px
- Input pill custom (Newsletter-specific)
- Mobile: `<CTAButton variant="brand-pill" size="md" block>`
- Desktop: `<CTAButton variant="brand-pill" size="md">` dentro de input wrapper

### 14. Footer
- Sem primitivos do DS

---

## Product detail

### ProductPage (`ProductPage.tsx`)

**Desktop layout:**
- Image gallery (left) + info panel (right)
- `<DiscountBadge percent size="sm">` inline na price row (com fontSize override 11px)
- `<QtyStepper value onChange disabled>` size=md, shape=rect (default)
- `<CTAButton variant="buy" size="xl" block>` "Comprar agora"

**Mobile flow (`order-4 lg:hidden`):**
- `<DiscountBadge percent size="sm">` inline (fontSize 10.5px override)
- `<QtyStepper size="lg" shape="pill">` (pill aesthetic)
- `<CTAButton variant={isPreOrder ? "preorder" : "buy"} size="xl" block>` (dynamic variant)
- "Pré-venda" pill com `--gradient-preorder-red`

---

## Cart & Checkout

### CartDrawer (`CartDrawer.tsx`)
- Right-anchored sheet, `borderTopLeftRadius: var(--radius-card-lg)` (22px)
- `box-shadow: var(--shadow-drawer-side)`
- Brinde card com `--radius-card-md` (18px), progress bar
- `<BrindePill>` em item gift
- `<QtyStepper size="sm">` em cada item
- PCYES Coin chip (yellow tint)

### CartPage (`CartPage.tsx`)
- Forms ainda **não migrados** pra FieldLabel/FieldInput
- Quick-buy CTAs ainda hand-rolled

### CheckoutPage (`CheckoutPage.tsx`)
- Forms ainda **não migrados** pra FieldLabel/FieldInput (~30 inputs)
- Multi-step com eyebrows em vários lugares
- Pix copy/paste com `--shadow-brand-cta` ou `--shadow-buy-cta` (dynamic)

---

## Auth & Profile

### AuthModal (`AuthModal.tsx`)
- Centralizado, `--radius-card-sm` (12px)
- Forms hand-rolled

### AddressFormModal (`AddressFormModal.tsx`) ✅ MIGRADO
- 8x `<FieldLabel required>` / `<FieldLabel>` (Complemento opcional)
- 8x `<FieldInput>`

### ProfilePage
- Cards com `.profile-card` className → `--shadow-profile-hover`
- Order list com `.order-card` className → `--shadow-order-hover`
- Forms hand-rolled

---

## Other pages

### ProductsPage (`ProductsPage.tsx`)
- Sort/filter sidebar
- Product grid com `<DiscountBadge>` e `<PreOrderPill>`
- Tags pills hand-rolled

### MonteSeuPcPage (`MonteSeuPcPage.tsx`)
- Quiz builder, `.quiz-scroll-area` height responsive
- Deal cards custom

### PreOrderPage / PreOrderBanner
- `<PreOrderPill>` reexport ainda em PreOrderBanner

### Legal / Faq / DriverDetailPage / QuemSomos / Warranty
- LegalPageLayout shared
- Sem primitivos

---

## Cobertura primitivos (visão geral)

| Primitivo | Usos atuais | Lugares onde **deveria** estar mas não está |
|---|---|---|
| `<Eyebrow>` | Newsletter | Várias `<p>` Inter 11/700 ls 0.3em primary nas seções |
| `<SectionHeader>` | ProductShelf, DealsHighlight, FlashDealsStrip, DropDoDiaSection, CategoryShowcase | GpuShowcase, IntelligentDevices, InRealLife, MegaSaleBanner, PopularGrid, NewReleases |
| `<SectionContainer>` | — (ainda ninguém consome) | Toda seção (~15 seções) |
| `<CTAButton>` | ProductShelf, FlashDealsStrip, DealsHighlight, DropDoDiaSection, Newsletter (2x), ProductPage (2x) | CartDrawer, CartPage, CheckoutPage (~10+), ProductsByTags, ProductCarousel quick-adds |
| `<DiscountBadge>` | ProductShelf, FlashDealsStrip, DealsHighlight, DropDoDiaSection, ProductsPage, ProductPage (2x), ProductCarousel | — (coberto) |
| `<BrindePill>` | CartDrawer item | CartPage gift item (diff visual, OK não migrar) |
| `<PreOrderPill>` | ProductShelf, FlashDealsStrip, ProductCarousel, ProductsPage | — (coberto) |
| `<Tag>` | EssentialsSection | TrustStrip features, Nerd Pride pill, mega-menu deals, ProductsPage tag chips |
| `<FieldLabel>` / `<FieldInput>` | AddressFormModal | CheckoutPage (~30 inputs), CartPage, ProfilePage, AuthModal, CardFormModal |
| `<QtyStepper>` | ProductPage (desktop md/rect + mobile lg/pill), CartDrawer (sm/rect) | CartPage (variar shape conforme uso) |

---

## Heurística pra reuso

Quando achar 3+ duplicações de um pattern e ele **não está nessa tabela** → vira primitive novo. Atualize esse map.

Patterns observados que ainda não viraram primitivo:
1. **Hero card** (HeroSection slides) — complexo, motion-heavy
2. **Right-anchored drawer** (CartDrawer base + futuras drawers)
3. **Centered modal** (SearchModal, WelcomePopup, AddressFormModal, AuthModal) — wrapper compartilhado faria sentido
4. **Carousel nav button** (h-12 w-12 rounded-pill chevron) — 5+ duplicações
5. **Trust strip icon** (h-11 w-11 rounded-pill border hover red)
6. **Newsletter pill input** (input + CTA embedded)
7. **PCYES Coin display chip** (Coin SVG + yellow tint)
8. **Countdown cells** (4-cell grid days/hours/min/sec)
9. **Mega-menu showcase card** (Navbar)
10. **Glass pill** (rounded-pill backdrop-blur dark glass)

**Próxima rodada de DS:** atacar #4 (CarouselNavButton, alta repetição) + #2-3 (modal/drawer base).
