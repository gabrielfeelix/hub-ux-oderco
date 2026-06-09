# SEO — Pendências reais (v3)

> Origem: doc "OTIMIZAÇÃO SEO - Projeto V2/V3". Auditado contra código + git em 2026-06.
> **A maioria do doc já está feita** (sprint A1 stages 1-6 + B/C/D): URLs semânticas, canonical self-referring, sitemap.xml (600 linhas), robots.txt, meta robots index/follow, BreadcrumbList JSON-LD, H1 único/página, search-expand (Cmd+K), breadcrumb mobile. O doc está defasado (escrito antes desse sprint).
>
> Abaixo, **só o que falta de verdade** no protótipo v3.

## 1. CEP autofill no AddressFormModal — BUG objetivo (prioridade)
- `src/app/components/AddressFormModal.tsx` (~linha 93-94): o campo CEP só **mascara** (`maskCep`), não busca endereço.
- `src/app/components/CheckoutPage.tsx:451` já tem a chamada funcionando: `fetch('https://viacep.com.br/ws/${digits}/json/')`.
- **Fazer:** replicar essa chamada no onBlur do CEP do modal e auto-preencher rua/bairro/cidade/UF. (Corresponde ao item 14 do doc: "ao adicionar o CEP, o gerador não pega o endereço correto".)

## 2. Apertar a 1ª dobra — espaçamento menor (itens 7 + 12) — UX
- Reduzir padding-top / gaps no topo pra caber mais conteúdo above-the-fold.
- Onde: `HeroSection.tsx` / `HomePage.tsx` (topo) e `ProductPage.tsx` (gap menu↔breadcrumb + centralizar 1ª dobra).

## 3. Aumentar destaques da home (item 8) — UX / E-E-A-T
- Subir tamanho de fonte dos textos de destaque pra bater o padrão dos cards de produto.
- Onde: `DealsHighlight.tsx` / `FlashDealsStrip.tsx` / `DropDoDiaSection.tsx` (títulos/labels).

## 4. Facilitar visualização de imagens na página de produto (item 11) — UX
- Galeria/zoom mais óbvio (thumbs maiores, affordance de zoom).
- Onde: `ProductGallery` em `ProductPage.tsx`.

## Não-acionáveis neste repo
- **Item 2** (reduzir JS / remover div-span): é SPA React, não se aplica.
- Itens com padrões **Magento** (`/catalogsearch/`, `/sendfriend/`, `/catalog/product_compare/`): miram o **site de produção**, não o protótipo v3.

## Já feito (não refazer) — evidência
- URLs semânticas: rotas `:category/:subcategory/:brand/:slug` em `routes.tsx` (commits A1 stage 2).
- Canonical + JSON-LD: `SEO.tsx` (`meta robots`, `link canonical`, structured data). BreadcrumbList em `ProductPage.tsx:2308` e `ProductsPage.tsx:1114`.
- Sitemap: `public/sitemap.xml`. Robots: `public/robots.txt`.
- Categoria: 16/page, `CategorySeoBlock.tsx` (rich text h2/h3/p), filtros (preço/marca/cor), `robots: noindex` pra filtro.
- Search-expand: `Navbar.tsx` (`searchOpen` + Cmd+K). H1 único: Product/Products = 1.
