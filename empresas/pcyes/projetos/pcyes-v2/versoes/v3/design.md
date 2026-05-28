# PCYES V3 — Design System

> Auditoria da realidade visual do site v3 (mobile-first, dark-default, gamer/PC aesthetic).
> Fonte: `src/styles/theme.css` + componentes em `src/app/components/`. Última revisão: 2026-05-28.
> Este documento é o blueprint para reconstrução em Figma — fundações, componentes, padrões.

---

## 1. Identidade de marca

**Nome:** PCYES — Built for Performance
**Categoria:** Hardware, periféricos, setups (gamer / streamer / criador).
**Voz:** pop-nerd, direta, com piscadelas Star Wars / cyberpunk. Eyebrows usam sintaxe de comentário de código (`// PROMOÇÕES DA SEMANA`, `// HALL DA META`). Refresca a categoria sem cair em clichê "RGB de 2008".

### 1.1 Logo

| Uso | Asset | Altura |
|---|---|---|
| Header desktop | `Simbolo-Logo-Horiz-Vermelho.png` | 34px |
| Header mobile centralizado | mesmo | 30px |
| Drawer mobile | mesmo | 26px |
| Footer | `logo-default.png` | 34px |
| Welcome popup (hero) | mesmo | 220px com `drop-shadow(0 8px 24px rgba(225,6,0,0.45))` |

Sempre `w-auto object-contain`. Sem tagline ao lado da marca — tagline aparece apenas em surfaces dedicados (welcome, mega-menu de marca).

### 1.2 Tagline / mantra

- **Principal:** "Built for Performance" (Figtree 26/700, `letter-spacing: -0.02em`)
- **Apoio (PT):** "Hardware, periféricos e setups feitos pra quem joga, edita e cria sem trava." (Inter 13)

### 1.3 Quirks visuais que definem a marca

1. **Vermelho vivo, em camadas.** Nunca chapado. Toda superfície vermelha é gradiente diagonal `135deg` ou `rgba(225,6,0,α)` empilhada com glow.
2. **Neon-hover.** Hover de card pinta um halo vermelho de 60px ao invés de só `box-shadow`. Identidade tátil principal.
3. **Glitch word** (chromatic aberration animado) cicla rótulos de audiência. Vermelho `#ff2419` em `mix-blend-mode: screen`.
4. **HUD scan-frame corners** (cantos em "L" 9×9px) em ícones de usuário no header — detalhe gamer micro.
5. **Eyebrows comentário-de-código** (`//`) repetidos em toda seção.

---

## 2. Tokens (fundações)

Definidos em `src/styles/theme.css`. Toda mudança de cor/tipografia/raio passa por aqui.

### 2.1 Cores

#### Light mode (padrão para conteúdo `[data-page-light-scope]`, opt-in)

| Token | Valor | Uso |
|---|---|---|
| `--background` | `rgb(250, 250, 250)` | Página |
| `--foreground` | `rgb(22, 22, 22)` | Texto principal |
| `--foreground-rgb` | `22, 22, 22` | Triplet pra `rgba(var(--foreground-rgb), α)` |
| `--card` | `#ffffff` | Cards |
| `--primary` | `rgb(220, 20, 20)` (#DC1414) | CTA / brand / hover |
| `--primary-foreground` | `#ffffff` | Texto sobre primary |
| `--secondary` | `#f5f5f5` | Surface neutra |
| `--muted` | `rgb(140,140,140)` | Bordas/ícones secundários |
| `--muted-foreground` | `rgb(100,100,100)` | Texto secundário |
| `--accent` | `#DC1414` | = primary |
| `--destructive` | `rgb(220, 50, 50)` | Erro/destruição |
| `--border` | `rgb(220,220,220)` | Strokes |
| `--ring` | `#DC1414` | Focus ring |

#### Dark mode (padrão da home, header SEMPRE dark)

| Token | Valor | Uso |
|---|---|---|
| `--background` | `rgb(18, 18, 18)` (#121212) | Página |
| `--foreground` | `#ffffff` | Texto principal |
| `--foreground-rgb` | `255, 255, 255` | Triplet |
| `--card` | `rgba(26, 26, 26, 0.90)` | Cards (glassy) |
| `--primary` | `rgb(255, 43, 46)` (#FF2B2E) | CTA / brand |
| `--secondary` | `rgb(206, 206, 206)` | Surface clara |
| `--muted` | `rgb(128,128,128)` | |
| `--accent` | `rgb(255, 85, 88)` | Estados hover |
| `--destructive` | `rgb(246, 76, 76)` | |
| `--border` | `rgb(128,128,128)` | |
| `--input` | `rgba(0,0,0,0.50)` | |
| `--ring` | `rgb(255, 85, 88)` | Focus ring |

#### Vermelhos especiais (gradientes — TOKENIZADOS, ver §2.4)

| Nome | Valor | Onde |
|---|---|---|
| Glow red | `#ff2419` | Glitch, hover, dentro de gradientes |
| Brand red base | `#DC1414` | Light primary |
| Brand red dark | `#FF2B2E` | Dark primary |
| Glow alpha | `rgba(225, 6, 0, α)` com α ∈ {0.08, 0.10, 0.12, 0.18, 0.22, 0.28, 0.35, 0.45, 0.55} | Hover/neon (canônico) |

> Gradientes vermelhos saíram dessa tabela e viraram tokens. Ver §2.4 Gradientes.

#### Cores funcionais (não-vermelho)

| Nome | Valor | Uso |
|---|---|---|
| Buy green | `#22c55e → #16a34a` | CTA "Comprar agora" / "Adicionar" |
| Buy green glow | `rgba(34,197,94, 0.55)` | Shadow do CTA verde |
| Novidade green | `#34d399` | Texto "Novidades" no navbar |
| Pre-order orange | `#f97316 → #ea580c` | CTA pré-venda mobile |
| Coin gold | `#fde68a → #facc15 → #b45309` | PCYES Coin |
| Coin bronze | `#92400e` | Stroke da coin |
| Coin letter | `#7c2d12` | "P" no centro |

#### Surfaces dark (uso direto via Tailwind `bg-[#xxx]` ou inline)

| Hex | Uso |
|---|---|
| `#0a0a0a` | Background de seção (default) |
| `#0e0e0e` | ProductShelf |
| `#040404`, `#070708`, `#0f0f10`, `#0f1011`, `#121214` | Variações próximas ao preto |
| `#1a1a1a`, `#1d1d1d`, `#1f1c1c` | Cards e inputs |
| `#323232` | Surface elevada (raro) |

> Em light mode (`html.light [data-page-light-scope]`), TODAS essas surfaces dark são reescritas: `#0a0a0a → #fafafa`, `#1a1a1a → #ffffff`, `#323232 → #f0f0f0`, etc. Ver §10 (Theming).

### 2.2 Tipografia

#### Famílias

- **Display / headings:** `Figtree` (300, 400, 500, 600, 700)
- **Body / UI:** `Inter` (300, 400, 500, 600)

Carregadas via Google Fonts em `src/styles/fonts.css`.

#### Escala tokenizada (uso semântico em HTML cru)

| Token | px | Uso |
|---|---|---|
| `--text-h1` | 80 | h1 (Figtree 400, line 1.11) |
| `--text-h2` | 48 | h2 (Figtree 300, line 1.0) |
| `--text-h3` | 40 | h3 (Figtree 400, line 1.0) |
| `--text-h4` | 32 | h4 (Figtree 400, line 1.2) |
| `--text-base` | 16 | p, input, button (Inter) |
| `--text-sm` | 14 | secundário |
| `--text-xs` | 13 | label, caption |
| `--text-label` | 13 | labels de form |
| `--text-caption` | 12 | meta |
| `--text-micro` | 11 | eyebrow, tag |

#### Escala fluida real (a usada nos componentes)

A maior parte dos heads usa `clamp()`, NÃO os tokens semânticos:

| Contexto | Recipe |
|---|---|
| Shelf title | `clamp(28px, 3vw, 36px)` · Figtree 600 · `letter-spacing -0.02em` |
| Deal / Drop title | `clamp(28px, 3vw, 38px)` · Figtree 700 |
| Category showcase | `clamp(28px, 3.4vw, 44px)` · Figtree 700 |
| Newsletter giant | `clamp(26px, 7vw, 52px)` · Figtree 700 |
| Category display | `clamp(48px, 6vw, 74px)` · Figtree 300 · `letter-spacing -0.03em` |
| Card product title | `15px` · Figtree 600 · `letter-spacing -0.01em` · `line-height 1.25` · `line-clamp 1` |
| Card price (main) | `20px` · Figtree 700 · `letter-spacing -0.015em` |
| Card price (strike) | `13px` · Inter · `line-through` · `rgba(fg, 0.38)` |
| Card price (PIX/parcelado) | `12px` · Inter · `rgba(fg, 0.55)` |
| Eyebrow `// LABEL` | `11px` · Inter 700 · `letter-spacing 0.3em` · uppercase · `color var(--primary)` |
| Pill genérica | `10–11px` · Inter 900 · `letter-spacing 0.16–0.18em` · uppercase |
| Form label | `10.5px` · Inter 700 · `letter-spacing 0.14em` · uppercase · `rgba(fg, 0.55)` |
| Form input | `13–14px` desktop / `16px` mobile (anti-zoom iOS) |

### 2.3 Espaçamento

#### Section spacing tokens

| Token | Desktop | Mobile (<768px) |
|---|---|---|
| `--space-section-sm` | 56px | 40px |
| `--space-section-md` | 88px | 56px |
| `--space-section-lg` | 128px | 72px |
| `--space-section-xl` | 168px | 96px |

#### Padding lateral (mantra)

- **Padrão:** `px-5 md:px-[72px]` (20px mobile / 72px desktop)
- **Variantes:** `lg:px-[172px]` (FeaturedProduct), `md:px-[72.5px]` (raro)

#### Container widths

| Uso | Max-width |
|---|---|
| Shelf content | 1600px |
| Edge bands (strips, banner duo, stats) | 1760px |
| TrustStrip | 1200px |
| `--container-max` (token) | 1760px |

#### Grid

- **Base:** 4px (todo valor do DS no grid; nada de 9/11/13px ímpar).
- **Gap horizontal entre cards de shelf:** 24px (`gap-6`).
- **Touch targets mobile:** mínimo 44×44px (forçado em `.checkout-field`, `.cart-field`, `.profile-field`).

### 2.4 Gradientes (tokens)

Toda superfície vermelha/verde/laranja do v3 é gradiente diagonal `135deg`. Tokenizado em `theme.css`:

| Token CSS | Valor | Tailwind utility | Uso |
|---|---|---|---|
| `--gradient-brand` | `linear-gradient(135deg, var(--primary), #ff2419)` | `bg-[var(--gradient-brand)]` | Newsletter CTA, ranking medallion, glow brand |
| `--gradient-discount` | `linear-gradient(135deg, #ff3b3e, #d31417)` | `bg-[var(--gradient-discount)]` | Pill de desconto -X% |
| `--gradient-buy` | `linear-gradient(135deg, #22c55e, #16a34a)` | `bg-[var(--gradient-buy)]` | "Comprar agora", "Adicionar ao carrinho" |
| `--gradient-preorder-orange` | `linear-gradient(135deg, #f97316, #ea580c)` | `bg-[var(--gradient-preorder-orange)]` | CTA pré-venda mobile |
| `--gradient-preorder-red` | `linear-gradient(135deg, #ff2419, #b91c1c)` | `bg-[var(--gradient-preorder-red)]` | Pill pré-venda no card |
| `--gradient-hero-stroke` | branco translúcido 22% → 8% | `bg-[var(--gradient-hero-stroke)]` | Stroke default do hero card |
| `--gradient-hero-stroke-hover` | brand red → ff2419 35% → red/0.55 65% → red/0.15 100% | `bg-[var(--gradient-hero-stroke-hover)]` | Stroke hover do hero card |
| `--gradient-category-grid` | `linear-gradient(72.85deg, #000 44.62%, #0f0f0f 100.35%)` | inline | Background do CategoryGrid |

**Regra:** novo CTA/pill/badge vermelho/verde/laranja sempre usa token. Hex direto só pra cores fora dessas famílias.

### 2.5 Raios

#### Família base (form controls + small cards)

| Token | Valor | Uso |
|---|---|---|
| `--radius` | 4px | Base |
| `--radius-button` | 4px | Buttons (shadcn) |
| `--radius-card` | 8px | Cards genéricos / cookie consent |
| `--radius-sm` (Tailwind) | 2px | — |
| `--radius-md` (= `--radius`) | 4px | — |
| `--radius-lg` (= `--radius-card`) | 8px | — |
| `--radius-xl` (derivado) | 12px | — |

#### Família "Card" (premium / grandes)

Tokens criados pra eliminar magic numbers 18/20/22/24/26:

| Token | Valor | Tailwind utility | Uso |
|---|---|---|---|
| `--radius-card-sm` | 12px | `rounded-card-sm` | Modal central (SearchModal), countdown cells, search input |
| `--radius-card-md` | 18px | `rounded-card-md` | Brinde card, cards intermediários |
| `--radius-card-lg` | 22px | `rounded-card-lg` | Product card image well, cart drawer corner, welcome popup |
| `--radius-card-xl` | 26px | `rounded-card-xl` | CategoryShowcase, Drop-do-Dia, mega-menu showcase |
| `--radius-pill` | 9999px | `rounded-pill` | CTAs principais, pills, search pill, badges circulares |

> Valores intermediários (10px do discount badge, 20px de modais antigos, 24px do mega-menu) foram absorvidos no token mais próximo (10→12, 20→22, 24→26). **Padronizar progressivamente nos componentes.**

### 2.6 Sombras (tokens)

Todas as 13 famílias de sombra do v3 viraram tokens em `theme.css`:

| Token CSS | Tailwind utility | Uso |
|---|---|---|
| `--shadow-neon-red` | `shadow-neon-red` | Hover canônico de cards (red halo + glow 60px) |
| `--shadow-hero-card-hover` | `shadow-hero-card-hover` | Hero carousel hover |
| `--shadow-category-active` | `shadow-category-active` | CategoryShowcase card ativa |
| `--shadow-essential-hover` | `shadow-essential-hover` | Essentials section |
| `--shadow-deal-hover` | `shadow-deal-hover` | Flash deals |
| `--shadow-profile-hover` | `shadow-profile-hover` | Profile dashboard |
| `--shadow-order-hover` | `shadow-order-hover` | Lista de pedidos |
| `--shadow-buy-cta` | `shadow-buy-cta` | "Comprar agora" / "Adicionar" (dominante `0 14px 32px -8px`) |
| `--shadow-buy-cta-sm` | `shadow-buy-cta-sm` | Quick-add em product card (`0 10px 26px -6px`) |
| `--shadow-brand-cta` | `shadow-brand-cta` | CTA principal vermelho (`0 14px 32px -8px`) |
| `--shadow-brand-cta-sm` | `shadow-brand-cta-sm` | CTA secundário vermelho (`0 8px 22px -8px`) |
| `--shadow-brand-pill` | `shadow-brand-pill` | Newsletter / brand pills (`0 8px 22px -6px`) |
| `--shadow-discount-badge` | `shadow-discount-badge` | -X% pill (`0 12px 28px -8px`) |
| `--shadow-discount-sm` | `shadow-discount-sm` | Discount badge menor (`0 4px 14px -4px`, alpha 0.6) |
| `--shadow-drawer-side` | `shadow-drawer-side` | CartDrawer lateral |
| `--shadow-search-open` | `shadow-search-open` | Navbar search input focused |

Token legacy mantido: `--elevation-sm` (sombra suave genérica `0 1px 3px / 0 1px 2px`).

**Regra:** novo componente usa token. Hardcoded só pra one-off justificado.

### 2.7 Easing & motion

- **House easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — repetido em hero, mega-menu, newsletter, popup, shelves, cookie. **Esta é a easing principal da marca.**
- **Duration padrão:** 300–500ms para hover, 320ms para neon-hover, 700ms para zoom de imagem.
- **Stagger children:** `0.04s` entre items em shelves (motion.staggerChildren).
- **Scroll reveal:** `initial { opacity: 0, y: 16–24 }, animate { opacity: 1, y: 0 }`, threshold 0.1–0.3, `once: true`. Hook custom: `useScrollReveal()`.

---

## 3. Componentes — Botões

### 3.1 Vocabulários de CTA (existem 4 simultâneos, intencional)

| Vocabulário | Cor | Quando | Recipe |
|---|---|---|---|
| **Buy (verde)** | `#22c55e → #16a34a` | Adicionar ao carrinho, Comprar agora (estoque normal) | `h-12 rounded-full px-10 py-3` · Inter 13–14/700 · `letter-spacing 0.04em` · shadow verde · hover `scale-[1.02]` / active `scale-[0.97]` |
| **Brand (vermelho)** | `var(--primary) → #ff2419` | Newsletter, "Built for performance" CTAs, callouts de marca | `rounded-full` · Inter 12/700 · uppercase · `letter-spacing 0.05em` · shadow vermelho |
| **Pre-order (laranja)** | `#f97316 → #ea580c` | Produto em pré-venda | Mesmo shape do verde, troca cor |
| **Shadcn (UI library)** | tokens (`--primary`, `--secondary`...) | Forms, modais, ações secundárias | Ver §3.2 |

### 3.2 Shadcn Button (`ui/button.tsx`)

#### Variantes

| Variant | Bg | Text | Hover |
|---|---|---|---|
| `default` | `var(--primary)` | `var(--primary-foreground)` | `primary/90` |
| `destructive` | `var(--destructive)` | white | `destructive/90` |
| `outline` | `var(--background)` + 1px border | `var(--foreground)` | `var(--accent)` |
| `secondary` | `var(--secondary)` | `var(--secondary-foreground)` | `secondary/80` |
| `ghost` | transparent | inherit | `var(--accent)` bg |
| `link` | none | `var(--primary)` | underline |

#### Sizes

| Size | Height | Padding | Radius |
|---|---|---|---|
| `default` | 36px (h-9) | px-4 py-2 | `--radius-md` (4px) |
| `sm` | 32px (h-8) | px-3 | 4px |
| `lg` | 40px (h-10) | px-6 | 4px |
| `icon` | 36×36 (size-9) | — | 4px |

### 3.3 Secundário "ghost" customizado

- `border border-foreground/15 hover:border-foreground/30`
- `rounded-[var(--radius-button)]` (4px)
- Inter 12

### 3.4 Filter pills / audience selector

```
rounded-full · border 1px · px-[17px] py-[9px]
active:   border-primary/30 · bg-primary · text-white
idle:     border-white/10 · bg-transparent · text-white/45
```

### 3.5 Icon button (Cart drawer close)

```
w-9 h-9 · rounded-full · hover:bg-foreground/5
```

---

## 4. Componentes — Inputs

### 4.1 Newsletter pill (canônico)

```
bg: rgba(fg, 0.04)
border: 1px solid rgba(fg, 0.10)
inset shadow: inset 0 1px 0 rgba(fg, 0.04)
radius: 9999px
mobile: min-h-[44px] · px-5 · text-[14.5px] Inter
```

### 4.2 Navbar search

```
h-[40px] · rounded-full · bg-[#1f1c1c]
border default: rgba(fg, 0.08)
border open:    rgba(fg, 0.35)
shadow open:    0 10px 32px rgba(0,0,0,0.55)
```

### 4.3 Search modal

```
text-[18px] Inter · transparent bg
placeholder: text-foreground/20
suffix: chip "ESC" como kbd hint
```

### 4.4 Form field (AddressFormModal, padrão)

```
padding: 11px 13px
radius: 10px
border: 1px solid rgba(fg, 0.08)
bg: rgba(fg, 0.03)
font: Inter 13/500

label acima:
  Inter 10.5/700
  letter-spacing: 0.14em
  uppercase
  color: rgba(fg, 0.55)
```

### 4.5 Touch targets mobile

Classes utilitárias forçam `min-height: 44px` + `font-size: 16px !important` (anti-zoom iOS):

`.checkout-field` · `.cart-field` · `.profile-field` · `.preorder-field` · `.msp-field`

### 4.6 Qty stepper (ProductPage)

```
[w-8 h-9 "−"] [w-9 h-9 número] [w-8 h-9 "+"]
container: border border-foreground/12 · rounded-[var(--radius-button)]
número: Inter 13/600 · tabular-nums
```

---

## 5. Componentes — Cards

### 5.1 Product card (base, repetido em 5+ seções)

```
WRAPPER
  width: clamp(264px, 78vw, 380px)
  flex-shrink-0 · snap-start
  group

IMAGE WELL
  aspect: 5/6  (square em DealsHighlight pequeno)
  radius: 20–22px
  border: 1px solid rgba(fg, 0.05–0.08)
  background:
    linear-gradient(135deg, rgba(fg, 0.07–0.10) 0%, rgba(fg, 0.02–0.03) 100%)
    + radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06), transparent 55%)
  inset shadow: inset 0 1px 0 rgba(fg, 0.05)

IMAGE
  object-contain · p-4 md:p-8
  hover: scale-[1.05–1.06] · 500–700ms

OVERLAYS (absolute)
  top-left:    discount badge (-XX%) ou ranking circle (Top 10)
  top-right:   pill "Pré-venda", "BRINDE", etc + favorite button
  bottom:      quick-add CTA (hover-reveal desktop, sempre visível mobile)

INFO (abaixo do well)
  título (15/600 Figtree)
  preço strike (13 Inter)
  preço main (20/700 Figtree)
  PIX / parcelado (12 Inter, fg/55)
  swatches (opcional, 12px circles)
```

### 5.2 Discount badge (-X%)

```
position: top-12/14px · left-12/14px
padding: 6px 12px
radius: 10px
background: linear-gradient(135deg, #ff3b3e 0%, #d31417 100%)
font: Figtree 15/900 · letter-spacing -0.02em
shadow: 0 12px 28px -8px rgba(255,43,46, 0.55)
```

### 5.3 Ranking medallion (Top 10)

```
h-9 w-9 · rounded-full
background: linear-gradient(135deg, var(--primary) 0%, #ff2419 100%)
font: Figtree 15/800 · white
```

### 5.4 Favorite button

| Estado | Recipe |
|---|---|
| Default mobile | `h-11 w-11 · rounded-full · backdrop-blur-8 · dark glass border` |
| Default desktop | `md:h-8 md:w-8` · hover-reveal (`opacity-0 group-hover:opacity-100`) |
| Active | `bg-rgba(225,6,0,0.2) · border-red · Heart filled` |

### 5.5 Color swatches

```
default: w-3 h-3 · rounded-full · border 1px subtle
selected: border 2px rgba(225,6,0,0.9) + shadow 0 0 8px rgba(225,6,0,0.5)
mobile touch: padding p-4 -m-4 (44px alvo invisível)
```

### 5.6 Drop-do-Dia premium card

Variação do product card:

```
radius: 24px
background: radial-gradient(circle at 18% 20%, rgba(255,90,80,0.18), transparent)
border: 1px solid rgba(255,90,80,0.25)
price: Figtree 30/800
overlay: pill "Prêmio do dia" (top-right, dark glass)
```

### 5.7 Category card (3 sabores)

| Sabor | Onde | Recipe |
|---|---|---|
| **Showcase** (carousel) | CategoryShowcase | radius 26px · `clamp(260px, 82vw, calc((100% - 48px)/3))` · hover red stroke + glow + zoom |
| **Grid bento** | CategoryGrid | `col-span` variável 1/2/2×2 · bg `linear-gradient(72.85deg, #000 44.62%, #0f0f0f 100.35%)` |
| **Mega-menu** | Navbar | showcase `rounded-[24px]` · compact `rounded-[22px]` · hover `-translate-y-1 + shadow red` |

### 5.8 Brinde card (CartDrawer)

```
radius: 18px
border: 1px solid primary/18
background: primary/[0.06]
threshold: R$ 950
progress bar: h-1.5 · rounded-full · bg-foreground/6 + fill linear-gradient(to right, primary, primary/65)
icon: Sparkles
label "BRINDE": rounded-full · bg-primary/[0.10] · text-primary · Inter 9/700 · letter-spacing 0.08em
```

### 5.9 Hero carousel card

```
.hero-card stroke (default):
  background: linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))

.hero-card:hover stroke:
  background: linear-gradient(135deg, var(--primary), #ff2419 35%, rgba(225,6,0,0.55) 65%, rgba(225,6,0,0.15) 100%)
  shadow: 0 30px 80px -24px rgba(0,0,0,0.75), 0 0 50px -10px rgba(225,6,0,0.35)
```

---

## 6. Componentes — Badges & Pills

| Nome | Recipe |
|---|---|
| **Discount %** | Ver §5.2 |
| **Pré-venda (red)** | gradient `135deg #ff2419 → #b91c1c` · Inter 10/900 · `letter-spacing 0.18em` · uppercase · shadow red |
| **Pré-venda (orange mobile)** | gradient `135deg #f97316 → #ea580c` |
| **BRINDE** | `rounded-full · bg-primary/[0.10] · text-primary` · Inter 9/700 · `letter-spacing 0.08em` |
| **PCYES Coin chip** | `bg-yellow-500/10 · text-yellow-500/70 · rounded-full · px-2 py-0.5` + coin SVG 14px |
| **Tag (Essentials)** | `rounded-full · px-3 py-1.5 · text-[11px]/600` · bg `rgba(225,6,0,0.12)` · border `rgba(225,6,0,0.35)` · color `rgba(255,90,80,0.95)` |
| **Mega-menu deal** | `bg-primary · px-2.5 py-1 · rounded-full · shadow [0_0_15px_rgba(255,43,46,0.5)]` · Inter 9/700 |
| **Nerd Pride** | gradient amarelo→laranja · Inter 10/900 · `letter-spacing 0.16em` · uppercase |
| **Frete grátis (trust)** | ícone `h-11 w-11 rounded-full border-white/10 bg-white/[0.02]` → hover `border-primary/50 bg-primary/10` |

---

## 7. Componentes — Modais & Drawers

### 7.1 CartDrawer

```
position: right-anchored sheet
bg: var(--card) (dark: rgba(26,26,26,0.90))
border-left: 1px solid rgba(fg, 0.06)
border-bottom-left-radius: 22px
shadow: -24px 0 60px -12px rgba(0,0,0,0.55)
header: px-7 py-5 · Figtree 18/500
```

### 7.2 SearchModal

```
position: top-[10%] left-1/2 -translate-x-1/2
size: w-[95%] max-w-[640px]
radius: 12px
backdrop: bg-black/70 · backdrop-blur-md
z-index: 70 (backdrop) / 71 (content)
```

### 7.3 WelcomePopup

```
size: 920px wide (hero + form grid)
radius: 20px
overflow: hidden
left:  radial red gradients + dark
right: white/dark form card
logo: 220px com drop-shadow vermelho
```

### 7.4 AddressFormModal / similar

```
max-width: 560px
radius: 20px
bg: #161617 (dark) / #ffffff (light)
overflow: hidden
```

### 7.5 CookieConsent

```
position: bottom-anchored row
max-width: 900px
bg: var(--card) · border 1px var(--border)
radius: var(--radius-card) (8px)
backdrop-filter: blur(40px)
z-index: 80
```

---

## 8. Padrões de Seção

### 8.1 Anatomia padrão

```
SECTION
├── padding lateral: px-5 md:px-[72px]
├── padding vertical: var(--space-section-md) ou similar
├── max-width: 1600px (shelf) ou 1760px (band)
├── HEADER
│   ├── eyebrow "// LABEL"  (Inter 11/700 · ls 0.3em · primary · uppercase)
│   └── title              (Figtree clamp 28–44px · 600–700 · ls -0.02em)
├── BODY (shelf | grid | bento)
└── (opcional) CTA secundário / link
```

### 8.1.1 Primitivos disponíveis — `src/app/components/section/`

```tsx
import { Eyebrow, SectionHeader, SectionContainer } from "./section";
```

| Primitivo | Props principais | Uso |
|---|---|---|
| `<Eyebrow icon={<Flame/>}>// LABEL</Eyebrow>` | `icon?`, `className?`, `style?` | Eyebrow standalone (sem h2) |
| `<SectionHeader eyebrow title size weight animated />` | `size: sm/md/lg` (36/38/44px), `weight: 500/600/700`, `animated: bool`, `eyebrowIcon`, `align`, `titleStyle` | Eyebrow + h2 com scroll reveal padrão |
| `<SectionContainer maxWidth paddingY background>` | `maxWidth: 1200/1600/1760`, `paddingY: sm/md/lg/xl` | Wrapper `<section>` com padding lateral + max-width centralizado |

Animação padrão (em `SectionHeader animated={true}`):
- Eyebrow: `y: 16→0, opacity: 0→1, 0.5s, easing house`
- Title: `y: 24→0, opacity: 0→1, 0.6s, delay 0.05s, easing house`
- Trigger: `useScrollReveal()` (`useInView` com `once: true`, threshold 0.15)

### 8.2 Horizontal shelf (mais reutilizado)

```
WRAPPER position: relative

NAV BUTTONS (desktop only, md:flex)
  position: absolute · top-[228px] · -translate-y-1/2 · esq/dir
  size: h-12 w-12 · rounded-full
  border: 1px solid white/15
  bg: black/55 · backdrop-blur-md
  text: white/85
  hover: border primary/60 · bg primary/15 · scale-105
  disabled: opacity-0

TRACK
  flex · gap-6 (24px) · overflow-x-auto · scroll-smooth
  snap-x snap-mandatory
  pb-2
  scrollbar: oculto (.shelf-track / .deals-track / .essentials-track / .category-track)

DOTS
  componente CarouselDots vinculado ao trackRef
```

### 8.3 Stagger reveal

```js
container: staggerChildren 0.04
item: { initial: { y: 15, opacity: 0 }, show: { y: 0, opacity: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
```

### 8.4 Texturas / overlays comuns

- **Radial glow central:** `radial-gradient(circle at center, rgba(225,6,0,α) 0%, transparent 60%)`
- **Grid texture:** `opacity-[0.04–0.06]`, geralmente SVG ou repeat-image fina
- **Starfield (AnnouncementBar):** `radial-gradient` de pontos brancos sobre near-black

---

## 9. Header system (sempre dark)

### 9.1 AnnouncementBar

- Top strip, gradient laser (verde→amarelo→vermelho) nas laterais
- Glow box-shadow verde + vermelho
- Carrossel de mensagens Star Wars-coded
- Pill "Semana do Orgulho Nerd": amarelo→laranja sobre starfield, Inter 10/900 ls 0.16em uppercase
- Setas hidden `md:inline`
- Pode ser fechada — Navbar segue dismissal

### 9.2 Navbar

```
height:        96px → 92px (scroll shrink)
bg:            sempre dark (fora do data-page-light-scope)
logo:          34px desktop / 30px mobile centralizado
mega-menu:     cards 22–24px radius, hover lift -translate-y-1 + shadow red
search:        pill 40px (ver §4.2)
icon hover:    scan-frame corners (L de 9×9px) em userIcon
emphasis nav:  "Monte seu PC" red #ff2419 700 ls 0.02em
               "Novidades" green #34d399 500
"DESTAQUE":    pill com animate-ping rings vermelhos
mobile menu:   sliding stacked drawer (mobileMenuView state)
```

---

## 10. Theming (Dark default, Light opt-in)

### 10.1 Arquitetura

```
<html class="dark|light">
  <AnnouncementBar />   ← SEMPRE dark (fora do scope)
  <Navbar />            ← SEMPRE dark (fora do scope)
  <div data-page-light-scope>
    ↳ conteúdo da página, pode ser light se html.light
    ↳ subtrees com [data-keep-dark] continuam dark mesmo em light theme
  </div>
</html>
```

### 10.2 Overrides em light mode (resumo)

| Tailwind class / inline | Vira em `html.light [data-page-light-scope]` |
|---|---|
| `bg-black`, `bg-neutral-950`, `bg-[#040404…121214]` | `#fafafa` |
| `bg-neutral-900`, `bg-[#1a1a1a…1f1c1c]` | `#ffffff` |
| `bg-neutral-800`, `bg-[#323232]` | `#f0f0f0` |
| `bg-white/α` | `bg-rgba(0,0,0, α scaled)` |
| `text-white`, `text-white/α` | `text-rgba(22,22,22, α boosted)` |
| `text-neutral-100/200/300` | `rgb(38,38,38)` |
| `text-neutral-400/zinc-300/400` | `rgb(82,82,82)` |
| `border-white/α`, `border-neutral-800/900` | `rgba(0,0,0, α)` / `rgb(229,229,229)` |
| inline `style={{ background: "#0a0a0a" }}` | reescrito via `[style*="rgb(10, 10, 10)"]` matcher |
| `.glitch-word` color (white hardcoded) | `rgb(22,22,22)` (red ghost continua) |

### 10.3 `[data-keep-dark]` (opt-out)

Para surfaces que precisam permanecer dark mesmo em light theme:
- Barras promo vermelhas
- Pills/chips de pré-venda
- Overlays de vídeo
- Glass pills escuros

Dentro do subtree:
- `--foreground-rgb` força volta para `255, 255, 255`
- `.text-white/X` mantém alfa branco original
- `.bg-black` mantém `#000`

### 10.4 Estratégia ideal (semantic tokens) — roadmap

**Problema atual:** componentes usam Tailwind hardcoded (`bg-[#0a0a0a]`, `text-white/70`, `border-white/10`). Light mode é forçado via CSS overrides massivos (~250 linhas em theme.css). Cada cor nova exige 2 lugares: o componente + o override.

**Padrão correto (semantic tokens):**

Tokens descrevem ROLE (papel semântico), não valor. Componente usa só semantic tokens; light mode é só trocar valores dos tokens, sem `!important`.

Proposta de semantic tokens (a adicionar em fase futura):

| Token | Dark value | Light value | Uso |
|---|---|---|---|
| `--surface-0` | `#0a0a0a` | `#fafafa` | Background de página/seção |
| `--surface-1` | `#1a1a1a` | `#ffffff` | Cards |
| `--surface-2` | `#1f1c1c` | `#f5f5f5` | Inputs, surfaces elevadas |
| `--surface-3` | `#323232` | `#e5e5e5` | Hover state de surface |
| `--surface-glass` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.04)` | Glassy overlay |
| `--text-strong` | `#ffffff` | `#161616` | Headings |
| `--text-default` | `rgba(255,255,255,0.85)` | `rgba(22,22,22,0.95)` | Body |
| `--text-muted` | `rgba(255,255,255,0.55)` | `rgba(22,22,22,0.65)` | Secondary |
| `--text-subtle` | `rgba(255,255,255,0.35)` | `rgba(22,22,22,0.45)` | Captions |
| `--border-subtle` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.06)` | Strokes leves |
| `--border-default` | `rgba(255,255,255,0.12)` | `rgba(0,0,0,0.12)` | Strokes |
| `--border-strong` | `rgba(255,255,255,0.22)` | `rgba(0,0,0,0.22)` | Strokes hover |

**Componente refatorado (exemplo):**

```diff
- <div className="bg-[#0a0a0a] text-white/85 border border-white/10">
+ <div className="bg-surface-0 text-default border border-subtle">
```

Em light, automaticamente vira branco com texto preto. Sem `!important`. Sem override.

**Migração faseada (não fazer tudo de uma vez):**

| Fase | Escopo | Esforço |
|---|---|---|
| 1 | Declarar semantic tokens em `theme.css` + expor no `@theme inline` | Baixo (1 commit, sem mudar componente algum) |
| 2 | Refatorar `Footer`, `Newsletter`, `TrustStrip`, `BrandsStrip` (componentes simples, alta visibilidade) | Médio |
| 3 | Refatorar shelves (`ProductShelf`, `FlashDealsStrip`, `DealsHighlight`, `EssentialsSection`) | Médio-alto |
| 4 | Refatorar `Navbar` + `AnnouncementBar` (deixar de "sempre dark" virar tema-aware se quiser) | Alto |
| 5 | Refatorar modais + checkout + cart | Alto |
| 6 | Remover CSS overrides legacy em `theme.css` § "LIGHT THEME OVERRIDES" | Cleanup |

**Benefícios depois da migração:**
- Light mode "grátis" (trocar 12 valores de token vs reescrever 250 linhas de override)
- Tema customizável em runtime (white-label / temas sazonais)
- Figma 1:1 com código — variáveis Figma = variáveis CSS
- Designer pode propor tema novo sem dev (só trocar valores em `theme.css`)

---

## 11. PCYES-specific assets

### 11.1 PCYES Coin (`PcyesCoin.tsx`)

```
default size: 18px (também 14px em cart chip)
radial gradient: #fde68a → #facc15 → #b45309
stroke: #92400e · 1.2px
inner ring: dashed
letter "P": Figtree 14/900 · #7c2d12
highlight: ellipse branca sutil top-left
context: chip yellow-tinted
```

### 11.2 Glitch word (`IntelligentDevices`)

```
animação: 1500ms steps(1, end)
labels cycle: ["Gamers", "Streamers", "Escritório", "Performance"]
camada base:   Figtree heavy · color: white (→ fg em light)
camada R (red ghost):
  color: #ff2419
  mix-blend-mode: screen
  text-shadow: 0 0 12px rgba(255,36,25,0.85)
  keyframes: translate(±2–8px, ±2px) + clip-path bands
```

### 11.3 Glitch word base shadow

```
text-shadow: 0 0 6px rgba(255,36,25,0.25)
animação: glitch-flicker (transform, filter blur/brightness)
```

### 11.4 Pré-venda countdown

```
grid 4 cells (dias/horas/min/seg)
cell: bg-rgba(0,0,0,0.45) · rounded-[12px]
número: Figtree 24/700
label: Inter 9.5 · letter-spacing 0.18em
```

### 11.5 Maringá FC × PCYES

Item de navbar dedicado, rota `/maringa-fc`, featured-style mega-menu card.

---

## 12. Acessibilidade & responsividade

### 12.1 Touch targets

- Mínimo 44×44px em mobile (forçado via `.checkout-field`, `.cart-field`, `.profile-field`, `.preorder-field`, `.msp-field`)
- Padding invisível em swatches (`p-4 -m-4`)

### 12.2 iOS zoom prevention

`font-size: 16px !important` em todo input mobile (`<768px`)

### 12.3 Focus ring

`focus-visible:ring-ring/50 focus-visible:ring-[3px]` (shadcn padrão)
`--ring` = primary (vermelho em ambos os temas)

### 12.4 Autofill

Browser autofill amarelo/azul é eliminado via `-webkit-text-fill-color` + `transition: background-color 600000s` (theme.css:141–156)

### 12.5 Contraste em light mode

Tokens `text-foreground/X` e `text-white/X` são re-escalados PARA CIMA em light (e.g. `/40 → /65`) para manter ~AA legibilidade.

---

## 13. Hover treatments (catálogo)

| Classe | Hover effect |
|---|---|
| `.neon-hover-red` | Stroke vermelho + halo + glow 60px (canônico) |
| `.hero-card` | Stroke gradient gray → red + shadow black + red glow |
| `.essential-card` | Border `rgba(225,6,0,0.45)` + soft red shadow |
| `.essential-card-glow` (children) | Opacity 0 → 1 em 500ms |
| `.deal-card-img` | Border vermelha + shadow |
| `.category-active` | Stroke vermelho forte + dupla shadow + zoom imagem |
| `.profile-card` | Border vermelha sutil + shadow leve |
| `.order-card` | Border vermelha + shadow + `translateY(-1px)` |
| `.glitch-word` | Animação contínua de chromatic aberration |
| `group-hover:scale-[1.04–1.10]` | Zoom de imagem em todos os cards (500–700ms) |

---

## 14. Convenções de código (DS-relevantes)

1. **Sempre Tailwind 4** (`@theme inline` em theme.css mapeia tokens → utilitários).
2. **Cores via token**, exceto vermelhos especiais (gradients) e surfaces dark hardcoded — esses estão no §2.1.
3. **Easing house:** `[0.16, 1, 0.3, 1]` em toda animação.
4. **Mobile-first:** breakpoints `md:` (768) e `lg:` (1024).
5. **Container caps:** 1600 (shelf) / 1760 (band).
6. **Padding lateral:** `px-5 md:px-[72px]` é o default; mudou? documente aqui.
7. **Eyebrow `// LABEL`** é assinatura — não inventar variantes (TODO/FIXME/etc).
8. **Grid 4px:** sem valores ímpares (11/9/13 px) fora dos tokens já listados.

---

## 15. Próximos passos (Figma)

### 15.1 Fundações para construir

- [ ] Color styles: tokens completos (light + dark), gradientes especiais (red brand, red discount, green buy, orange preorder, gold coin)
- [ ] Text styles: escala fluida (clamp) + escala tokenizada (h1–h4, base, sm, xs, label, caption, micro)
- [ ] Effect styles: 13 famílias de shadow tokenizadas em §2.6
- [ ] Grid styles: 4px base, 24px gap, container 1600/1760
- [ ] Spacing scale: 4/8/12/16/20/24/40/56/72/88/96/128/168px

### 15.2 Componentes para construir

- [ ] Button (4 vocabulários × 3 sizes × estados)
- [ ] Input (newsletter pill, search, form field, qty stepper)
- [ ] Card / Product (5/6 ratio, square, drop-do-dia)
- [ ] Card / Category (3 sabores)
- [ ] Card / Hero (red stroke variant)
- [ ] Badge / Pill (9 variantes catalogadas em §6)
- [ ] Modal (cart drawer, search, welcome, address, cookie)
- [ ] Header bar (announcement + navbar)
- [ ] Section template (eyebrow + title + shelf/grid/bento)
- [ ] Coin (asset SVG)

### 15.3 Decisões resolvidas (2026-05-28)

| # | Decisão | Status |
|---|---|---|
| 1 | **Família "Card" de raios** (12/18/22/26px) — `--radius-card-sm/md/lg/xl` + `--radius-pill` | ✅ Implementado |
| 2 | **Gradientes especiais tokenizados** — `--gradient-brand/discount/buy/preorder-orange/preorder-red/hero-stroke/category-grid` | ✅ Implementado |
| 3 | **13 famílias de sombra tokenizadas** — `--shadow-neon-red`, `--shadow-hero-card-hover`, etc | ✅ Implementado |
| 4 | **Light theme — semantic tokens nativos** | 📋 Roadmap em §10.4 (migração faseada) |

### 15.4 Pendente

- Aplicar os tokens novos nos componentes existentes (migração progressiva, não-bloqueante)
- Implementar Fase 1 do roadmap §10.4 (declarar semantic tokens)
- Exportar tokens pra `tokens.json` (Style Dictionary) pra sync com Figma

---

## 16. Histórico de auditoria

| Data | Revisão |
|---|---|
| 2026-05-28 | Documento inicial — auditoria completa pós-mobile-first homepage + ProductPage. |
| 2026-05-28 | **Tokenização** — promovido a tokens: família de raios "Card" (12/18/22/26), gradientes especiais (brand/discount/buy/preorder/hero/category), 13 famílias de sombra. Adicionado roadmap §10.4 de migração pra semantic tokens em light mode. |
| 2026-05-28 | **Aplicação dos tokens** — 81 gradients + 38 sombras + ~70 raios migrados pra `var(--*)` em ~20 componentes (ProductShelf, FlashDealsStrip, CartDrawer, CheckoutPage, ProductPage, etc). Adicionados `-sm` variants para sombras (buy-cta-sm, brand-cta-sm, brand-pill, discount-sm). Bundle CSS +0.42 kB, JS −2.23 kB. |
| 2026-05-28 | **Primitivos de seção** — criados `<Eyebrow>` + `<SectionHeader>` + `<SectionContainer>` em `src/app/components/section/`. Migradas 6 seções (ProductShelf, DealsHighlight, FlashDealsStrip, DropDoDiaSection, CategoryShowcase, Newsletter). Net −125 linhas. |
