# Plano Nota-100 — PCYES v3

Roadmap para elevar a auditoria web (SEO, GEO, Conversão, Testes) de **72** para **~93+**.
Executado em **6 fases**, cada fase = **1 commit atômico**, verificado antes de seguir. Sem regressão de acessibilidade (base já AA, axe=0) nem de UI.

**Base:** SPA React 18 + Vite 6 + react-router 7. Hospedagem estática (Vercel). Dados mock estáticos (`productsData.ts`).

---

## Glossário rápido

- **SSR** (Server-Side Rendering): servidor monta o HTML pronto a cada visita. Precisa de servidor. Ideal em produção com preço/estoque dinâmico.
- **SSG** (Static Site Generation): monta o HTML pronto **1x no build**, serve arquivo estático. Sem servidor. **Escolha deste protótipo** — implementado por *snapshot* (renderiza cada rota no build com Chrome headless e grava o HTML renderizado no `index.html` da rota). O React re-hidrata em runtime; react-helmet reconcilia as tags.
- **JSON-LD**: dados estruturados que o Google lê para rich results (estrelas, breadcrumb, preço).
- **CWV** (Core Web Vitals): LCP, INP, CLS — métricas de experiência que afetam ranking.

---

## Placar: base → meta

| Módulo | Base | Meta | Alavanca principal |
|---|---|---|---|
| SEO & Onpage | 83 | **96** | JSON-LD no HTML cru + SSG do corpo |
| GEO & Indexação | 66 | **92** | Liberar IA + corpo crawlável (SSG) |
| Estrutura & Conversão | 75 | **89** | Fluxo de erro (QA P0/P1) — hero mantido |
| Testes & Melhorias | 65 | **90** | Instrumentação GA4/GTM + KPIs |
| **Média** | **72** | **~92** | |

> **Decisão de layout (fixada):** o plano é **layout-neutral nas páginas normais**. O hero da home fica **exatamente como está** (carrossel de imagem). Nenhuma fase altera o visual das telas em estado normal — só se adicionam telas/feedbacks de **estado de erro** (404, toasts). M3 mira 89 (não 93) por não incluir o hero textual.

> **Nota honesta:** 100 cravado em todos não é realista num protótipo. Teto de GEO depende de autoridade/tempo no ar (não só de código); AAA de contraste exige redesenhar a paleta (vermelho de marca não bate 7:1). Meta de ~93 = "excelente" em todos os módulos.

---

## Princípios de execução

1. **1 fase = 1 commit** com mensagem `feat/fix/docs(pcyes-v3): <fase>`.
2. **Verificar antes de commitar**: `npm run typecheck` limpo (baseline: 31 erros pré-existentes — não aumentar) + build passa + screenshot sem regressão visual nas rotas-chave (home/PLP/PDP/checkout).
3. **Sem push automático** — branch atual não é `main`. Push só sob pedido (main = deploy prod).
4. Cada fase atualiza o doc de referência correspondente (SEO.md / QA-AUDIT.md).

---

## Fase 1 — Liberar IA + rich rating no schema  ✅ (robots feito)

**Objetivo:** desbloquear GEO e ganhar estrela no SERP. Esforço: **~1h**. Impacto: M2 +6, M1 +3.

- [x] `robots.txt`: remover Disallow dos bots de IA + `Content-Signal: ai-train=yes`. Áreas privadas/query params seguem bloqueadas.
- [ ] `Product` JSON-LD: adicionar `aggregateRating` (`ratingValue`, `reviewCount`) e 1-2 `review` — a PDP já tem nota/reviews na UI (`ProductPage.tsx`), só não expõe no schema.
- [ ] `og:image` dinâmico por produto (imagem do item) e por categoria — hoje é logo global.

**Arquivos:** `public/robots.txt`, `src/app/components/ProductPage.tsx`, `src/app/components/SEO.tsx`.
**Aceite:** robots sem bloqueio de IA; Rich Results Test valida Product com rating; OG por rota no share.
**Commit:** `fix(pcyes-v3): libera crawlers de IA + aggregateRating e OG dinâmico`

---

## Fase 2 — JSON-LD + meta no HTML cru (sem headless)

**Objetivo:** schema visível a **todos** os crawlers (não só Googlebot que renderiza JS). Esforço: **~2-3h**. Impacto: M1 +6, M2 +3.

- [ ] Estender `prerenderSeoHtml` (`vite.config.ts`) para injetar JSON-LD **estático** no `<head>` cru por tipo de rota: Organization na home; Product+BreadcrumbList por produto; BreadcrumbList+CollectionPage por categoria.
- [ ] Fonte dos dados: `productsData.ts` lido no build (já é estático) → gera o blob por rota do sitemap.
- [ ] Manter `data-rh`/reconciliação: helmet não duplica em runtime.

**Arquivos:** `vite.config.ts`, novo `scripts/build-jsonld.ts`.
**Aceite:** `curl` da rota (sem JS) retorna JSON-LD no HTML; sem tag duplicada no browser.
**Commit:** `feat(pcyes-v3): JSON-LD estático no HTML cru por rota (crawler sem JS)`

---

## Fase 3 — SSG por snapshot (o grande salto) 🚀

**Objetivo:** corpo textual + links + conteúdo no HTML cru → resolve keyword real, links crawláveis e conteúdo para LLMs. Esforço: **~1-2 dias**. Impacto: M1 +7, M2 +14.

- [ ] Pós-`vite build`: subir servidor estático no `dist`, crawlear cada rota do sitemap com Chrome headless (CDP — setup já existe), aguardar render + rede idle, gravar `document.documentElement.outerHTML` no `index.html` da rota (substitui `#root` vazio pelo DOM renderizado).
- [ ] Garantir **hidratação sem mismatch**: usar `hydrateRoot` quando houver HTML pré-renderizado; snapshot só do markup estável (sem estados de hover/modal abertos).
- [ ] **Estratégia de escala:** snapshot de 100% das rotas OU (fallback) templates representativos (home + 1 por template de categoria + top 50 produtos) — decidir por tempo de build. Registrar o que foi coberto (sem truncamento silencioso).
- [ ] Excluir do snapshot rotas privadas (checkout/perfil) e filtradas (noindex).

**Arquivos:** novo `scripts/prerender-snapshot.mjs`, `vite.config.ts` (hook closeBundle), `src/main.tsx` (hydrate condicional).
**Aceite:** `curl` da home/PLP/PDP retorna texto do produto/categoria no HTML; Lighthouse SEO 100; sem flash/mismatch de hidratação no browser.
**Commit:** `feat(pcyes-v3): SSG por snapshot headless — corpo no HTML cru`
**Risco/mitigação:** build mais lento → paralelizar crawl + limitar concorrência; se hidratação der mismatch, cair para snapshot só de rotas institucionais + PLP e manter PDP CSR.

---

## Fase 4 — Robustez de erro (QA P0/P1)

**Objetivo:** fechar fricções que travam o usuário. **Sem mudança de layout em tela normal** — só feedback de estado de erro. Esforço: **~1 dia**. Impacto: M3 +14.

> **Hero mantido:** por decisão, o carrossel de imagem **não muda**. O H1 segue `sr-only` (invisível, só SEO/leitor de tela) — já existe, nada a fazer. O teste de hero textual fica como A/B opcional pós-Fase 5, decidido por dado real.

- [ ] **G1** CEP inválido: `toast.error` + marca campo (`CheckoutPage`).
- [ ] **G3** rota catch-all `path:"*"` → página 404 com busca/voltar/categorias (só aparece em URL quebrada).
- [ ] **G2** erros por-campo no checkout: `aria-invalid` + `role="alert"` + foco no 1º inválido (fecha lacuna a11y 3.3.1/3.3.3).
- [ ] **G4** undo na remoção do carrinho (sonner `action`) + confirmação em "limpar carrinho".
- [ ] **G5** PIX expirado: ao timer `0`, UI "Gerar novo".

**Arquivos:** `CheckoutPage.tsx`, `routes.tsx`, novo `NotFoundPage.tsx`, `CartPage.tsx`, `CartDrawer.tsx`.
**Aceite:** QA-AUDIT P0/P1 zerado; axe segue 0; fluxos de erro dão feedback; **home/PLP/PDP visualmente idênticas** (screenshot diff).
**Commit:** `feat(pcyes-v3): robustez de erro (CEP/404/checkout/undo/PIX)`

---

## Fase 5 — Instrumentação e métricas (M4)

**Objetivo:** sem medição não há A/B validável. Esforço: **~1 dia**. Impacto: M4 +20.

- [ ] GA4 + GTM com **Consent Mode v2** amarrado ao `CookieConsent` existente.
- [ ] `dataLayer` de funil: `view_item`, `add_to_cart`, `begin_checkout`, `add_shipping_info`, `purchase` (e-commerce GA4).
- [ ] Mapa de calor opcional (Microsoft Clarity — grátis) na home e PDP.
- [ ] Documentar KPIs por módulo: LCP/INP/CLS, taxa add-to-cart, conclusão de checkout, CTR de busca.

**Arquivos:** `index.html` (GTM), novo `src/utils/analytics.ts`, pontos de disparo em cart/checkout, `src/app/components/CookieConsent.tsx`.
**Aceite:** eventos aparecem no GTM Preview; consent bloqueia tags antes do opt-in.
**Commit:** `feat(pcyes-v3): analytics GA4/GTM com consent + eventos de funil`

---

## Fase 6 — Polimento e validação final

**Objetivo:** fechar resíduos e reauditar. Esforço: **~meio dia**. Impacto: fecha para ~93.

- [ ] 3 saltos de heading best-practice (faq/monte-seu-pc/onde-encontrar).
- [ ] Lighthouse/CWV nas rotas-chave (meta: Perf ≥90, SEO 100, Best-Practices ≥95, A11y 100).
- [ ] Rerodar axe (manter 0) + Rich Results + validar sitemap/robots pela raiz.
- [ ] Atualizar `SEO.md` (remover "SSR fora de escopo" → agora SSG feito) e `QA-AUDIT.md` (P0/P1 fechados). Reescrever placar.

**Aceite:** placar reauditado ~93; docs de referência batem com o código.
**Commit:** `docs(pcyes-v3): reauditoria pós-plano nota-100 + polimento final`

---

## Sequência e dependências

```
Fase 1 (robots+schema) ──┐
Fase 2 (JSON-LD cru) ─────┼─► Fase 3 (SSG snapshot) ─► Fase 6 (validação)
Fase 4 (CRO/erro) ────────┘        Fase 5 (analytics) ─┘
```

- Fase 1 e 2 são independentes e baratas → começar por elas.
- Fase 3 é o maior ganho e o maior risco → isolar num commit próprio, com fallback definido.
- Fase 4 e 5 podem correr em paralelo à 3 (arquivos diferentes).
- Fase 6 sempre por último (reauditoria).

**Esforço total estimado:** ~4-5 dias de trabalho focado.
