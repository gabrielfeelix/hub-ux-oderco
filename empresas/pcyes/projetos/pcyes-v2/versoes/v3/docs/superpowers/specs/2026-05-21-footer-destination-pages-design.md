# Footer destination pages — design spec

**Date:** 2026-05-21
**Goal:** Every PCYES v3 footer link resolves to a real screen in the v3 visual identity. No `#` dead links.

## Problem

Footer audit found 6 dead links (`href="#"`): F.A.Q, Drivers e Manuais, Download e Suporte,
Política de Garantia/Trocas/Devoluções, Política de Privacidade, Termos de uso, Quem somos.
`Download e Suporte` duplicates `Drivers e Manuais`. `Pedidos → /perfil` already works.

## Scope

7 new React page components (DS v3), routing, footer rewire, audit of 2 legacy pages.

### New routes

| Route | Component | Type |
|---|---|---|
| `/drivers-e-manuais` | `DriversManuaisPage` | Feature — product listing |
| `/drivers-e-manuais/:slug` | `DriverDetailPage` | Feature — per-product downloads |
| `/faq` | `FaqPage` | Content — accordion |
| `/quem-somos` | `QuemSomosPage` | Institutional |
| `/politica-de-privacidade` | `PrivacyPage` | Legal |
| `/politica-de-garantia` | `WarrantyPage` | Legal |
| `/termos-de-uso` | `TermsPage` | Legal |

### Footer changes (`components/Footer.tsx`)

- Remove `Download e Suporte`.
- Wire 6 dead links to the new routes.
- `Quem somos → /quem-somos`.

## Architecture

- New pages live in `src/app/pages/` next to `MonteSeuPcPage.tsx`.
- Each page is a React component, renders its own `<Footer />`, relies on `RootLayout`
  for Navbar/AnnouncementBar. First section pads for the fixed navbar.
- Mock data `src/app/components/driversData.ts` derives from `allProducts`
  (peripherals plausibly needing drivers) + driver (ZIP) and manual (PDF) metadata.
- `LegalPageLayout.tsx` — shared hero + sticky section nav + prose; reused by the 3 legal pages.

## Page designs (dark theme, red accent, Figtree/Inter, rounded cards, generous spacing)

- **DriversManuaisPage** — hero (red `DOWNLOADS` badge + title) → toolbar (search + category
  select + page-size) → product card grid (image, category badge, name, "Ver downloads") → pagination.
- **DriverDetailPage** — breadcrumb → split hero (image + name + badge + "Ver downloads" /
  "Página do Produto") → Drivers & Manuais download cards (ZIP/PDF chip, size, update date,
  download icon) → short description block.
- **FaqPage** — hero → category tabs (Pedidos · Pagamentos · Devolução · Garantia/RMA) →
  accordion. 28 Q&A sourced from pcyes.com.br/faq.
- **QuemSomosPage** — hero ("Power up your game") → story → stats strip (10+ anos · 700+
  produtos · 8000+ parceiros) → timeline 2010→2025 → values (inovação, autenticidade, acessibilidade).
- **Legal pages** — shared `LegalPageLayout`: hero (badge + title + "atualizado em") +
  sticky section nav + content sections. Content from pcyes.com.br.

## Out of scope / notes

- Fale Conosco + Onde Encontrar are legacy static HTML (`public/pages/*.html`) — audited and
  reported only, not rebuilt.
- Legal copy is structured/paraphrased from pcyes.com.br — acceptable for prototype; final
  wording needs PCYES validation before production.
