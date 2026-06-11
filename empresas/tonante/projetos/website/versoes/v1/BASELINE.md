# BASELINE — Home Tonante v2 (estado pré-redesign)

> Capturado na Fase 0 (§4.0 do PLANO-HOME-V2.md), commit base `59312524`, em 2026-06-11.
> Serve de referência antes/depois. NÃO editar os números "ANTES"; preencher "DEPOIS" na Fase 5.

## 1. Estrutura da home (antes)

- Arquivo: `src/app/components/HomePage.tsx` — **15 seções**.
- Ordem atual: Hero → TrustStrip → DropDoDia → FlashDealsStrip → CategoryShowcase → ProductShelf(Top) → PromoPanel → MonteSeuKit → ShopByStyle → LinhasDeViolao → StoryBand → ProductShelf(Recém) → RealMusicians → Pillars → Newsletter → Footer.
- Altura desktop @1440: **11.016px** (medição do diagnóstico; **recapturar via browser na Fase 2/5**).
- Seções de promoção nas 6 primeiras dobras: **3** (DropDoDia, FlashDeals, +PromoPanel logo após).
- Countdowns na página: **2** (DropDoDia + FlashDealsStrip).
- Categorias: só aparecem na **dobra 4** (CategoryShowcase).

### Métricas de browser (medidas via playwright + chromium c/ libs extraídas em /tmp/chromelibs)
| Métrica | ANTES | DEPOIS Fase 2 | Alvo |
|---|---|---|---|
| Altura total desktop @1440 | 11.016px | 8.846 (F2) → **9.217px** (F3) | ≤8.800 (417px acima; Fase 5 enxuga paddings) |
| Altura total mobile @390 | _n/d_ | 10.255 (F2) → 11.049px (F3) | — |
| **Produtos clicáveis acima de 2.000px (desktop)** | _n/d_ | **5** ✅ | ≥3 |
| Produtos clicáveis acima de 1.700px (mobile) | _n/d_ | **5** ✅ | ≥1 |
| Countdowns na página | 2 | **1** ✅ | 1 |
| Nota | — | F3 +371px desktop (SocialProofBar + champion + kit presets — conteúdo de valor); Fase 5 reduz `--space-section-lg` em 2-3 seções p/ voltar a ≤8.800 | |
| Scroll-depth mediano | sem analytics | sem analytics | — |

> Como remedir: `npx vite preview --port 4173` + script playwright apontando `executablePath` p/ `~/.cache/ms-playwright/chromium-1169/chrome-linux/chrome` com `LD_LIBRARY_PATH=/tmp/chromelibs/root/usr/lib/x86_64-linux-gnu`. Contagem de produtos via `a[href^="/produto/"]` com top < limite.

## 2. Catálogo (fonte de verdade p/ SocialProofBar §6.10 — números REAIS)

- **282 produtos** ativos.
- **Rating médio: 4,66 ★** (⚠️ o placeholder do plano §6.10 dizia "4,8" — usar **4,66** real, ou "+4,6★").
- **69.992 avaliações** somadas (forte prova social agregada).
- Preço: R$ 19,90 (min) · R$ 836,65 (médio) · R$ 4.309,90 (max).
- Por categoria: Acessórios 112 · Violões 63 · Cordas & Encordoamentos 44 · Suportes 33 · Guitarras 18 · Contrabaixos 12.

## 3. Contraste (antes — pares com defeito, medidos)

| Par | Ratio antes | Status |
|---|---|---|
| branco / âmbar `#C87800` (CTA Comprar) | 3,42:1 | ❌ falha AA |
| branco / gradiente-buy (ponta clara) | 3,42–4,13:1 | ❌ falha AA |
| preço riscado `--faint #a89c8b` / surface | 2,65:1 | ❌ falha |
| reviews `--muted #837767` / surface | 4,30:1 | ⚠️ marginal |
| **CORRIGIDOS na Fase 0** | | |
| `--ink-meta #6b5f51` / surface | 6,11:1 | ✅ |
| `--ink-meta #6b5f51` / creme | 5,56:1 | ✅ |
| `--amber-deep #a05f00` / surface | 5,00:1 | ✅ |
| ink `#1A1714` / âmbar `#C87800` (CTA alternativo) | 5,22:1 | ✅ |

## 4. Tipografia transacional (antes → depois Fase 0)

- Preço card: Bodoni (figtree) 22px 600 → **Hanken 700 `.num`** ✅
- Nome produto: Bodoni 20px → **Hanken 600 15px lh1.35** ✅
- Preço riscado/reviews: `--faint`/`--muted` → **`--ink-meta`** ✅
- Eyebrow card: 9,5px → **11px** (`--text-eyebrow`) ✅
- Varredura: zero `font-family-figtree` em preço/nome (grep ✅) — card, quick-view, ProductCarousel, PDP related-rail, CartDrawer total.

## 5. Parcelamento (antes — inconsistente)

- ProductCard: `min(10, max(2, round(priceNum/250)))`
- ProductPage main: fixo 12x · related-rail: "10x" hardcode
- ProductCarousel / ProductsPage: "10x" hardcode (priceNum/10)
- DropDoDia: "10x" com preço cheio (errado)
- FAQ: "até 10x, parcela mín. R$50" · TrustStrip/AnnouncementBar/Checkout: "12x"
- **Fase 0 (decidido Gabriel 2026-06-11):** política = **até 10x, parcela mínima R$50**. `getInstallmentCount = min(10, max(1, floor(priceNum/50)))` em `productEnhancements.ts` (fonte única; `MAX_INSTALLMENTS=10`, `MIN_INSTALLMENT_VALUE=50`).
- Aplicado: ProductCard, quick-view, ProductCarousel, ProductsPage, DropDoDia, PDP (headline + tabela de parcelas agora limitada a counts válidos), checkout selector já era 10. Claims "até 12x"→"até 10x" em TrustStrip, AnnouncementBar, FeaturesStrip, CheckoutPage, SEO (HomePage/ProductsPage/ProductPage). FAQ já dizia 10x ✅.

## 6. Instrumentação de funil

- **Nenhuma ferramenta de analytics** detectada (sem GA4/Plausible/PostHog/Vercel Analytics).
- ⇒ Metas de funil (§12.1 do plano) ficam como **backlog de medição**. Sucesso das fases julgado por critérios estruturais/visuais/contraste até instrumentar. Decisão de instrumentar = Gabriel.

## 7. Dados de produto (gap descoberto na Fase 0)

- `Product.specs` existe mas é **boilerplate** (SKU, Categoria, Marca, Garantia, Origem) — NÃO atributos de instrumento (tampo, nylon/aço, escala, nº cordas).
- ⇒ §4.2.10 (linha de specs no card) bloqueada por dados.
- **Decisão Gabriel 2026-06-11: ENRIQUECER catálogo agora.** Extrair atributos reais (tampo, tipo de corda, tamanho/escala, nº cordas, cor) de `name`/`htmlDescription`/`features` dos 282 produtos e popular specs estruturado utilizável no card. Tarefa de dados própria (ver TAREFAS PENDENTES).

## 8. Tarefas pendentes (descobertas na Fase 0, fora do escopo dela)

1. **CTA primário — cor (decisão Gabriel 2026-06-11: MANTER por enquanto).** Botões "Comprar" seguem branco sobre âmbar `#C87800` = 3,42:1 (reprova AA "por pouco"). Decisão consciente de manter o visual atual; revisitar depois (opções já levantadas: âmbar+texto-preto 5,22 ✅ on-brand, ou âmbar-deep+branco 5,08 ✅). É o único par de contraste fora de AA que permanece após a Fase 0.
2. **Enriquecimento de specs do catálogo** — ✅ FEITO. `productAttributes.ts`: parser determinístico extrai atributos reais do `name` (tampo, corda, tamanho, nº cordas, linha, config, gauge, conectores, etc.). Não-destrutivo (runtime, sem mutar productsData). Cobertura: Guitarras/Baixos 100%, Cordas 98%, Suportes 91%, Violões 90%, Acessórios 23% (mics/plugs sem spec real → linha oculta, sem placeholder). Spec-line ligada no card + chips no quick-view. Bônus: `getProductAttributes().linha` reutilizável p/ tone chips (§3.4/§6.8). PDP specs table ainda boilerplate — trocar numa fase futura usando o mesmo parser.
3. **PCYES leftover** — 174 ocorrências em 37 arquivos (copy SEO, alguns sessionStorage `pcyes-welcome`/URLs com risco). Troca marca PCYES→Tonante. Tarefa própria, cuidadosa.
4. **Tag "iniciante" (curadoria Gabriel).** Nenhum produto tem tag iniciante no array `tags` (só aparece em descrições/specs). GuiaIniciante (§6.13) aponta provisoriamente p/ categoria Violões. Marcar 4–6 violões iniciantes habilita `/produtos?tag=Iniciantes` (ProductsPage já lê `?tag=` da URL — feature pronta).
5. **Footer: subir selos p/ 1ª linha (§6.15).** Adiado p/ Fase 5 — Footer tem erros de tipo pré-existentes (LinkedIn/X/href), mexer exige QA visual. Twitter→X já resolvido site-wide (era só no WelcomePopup).
