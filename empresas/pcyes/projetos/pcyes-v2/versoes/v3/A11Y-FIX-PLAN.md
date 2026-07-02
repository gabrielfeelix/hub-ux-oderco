# Plano de Correção de Acessibilidade — PCYES v3

**Base:** [A11Y-AUDIT.md](A11Y-AUDIT.md) · **Meta:** WCAG 2.2 AA · **Data:** 2026-07-02

## Arquitetura (2 trilhas — importa pro plano)

| Trilha | Páginas | Onde ficam os fixes |
|---|---|---|
| **A — React/Tailwind** | home, PLPs, PDP, carrinho, checkout, pre-venda, perfil, drivers (lista+detalhe), faq, quem-somos, 3 legais | `.tsx` + `src/styles/theme.css` |
| **B — HTML cru (landings)** | influenciadores, revendedor, fale-conosco, onde-encontrar, maringa-fc | `public/pages/*.html` + `public/pages/unified-overrides.css` + `shared-tokens.css` |

Landings são injetadas via `htmlLoader.ts` (fetch + inject). Classes custom (`.mc-marquee-text`, `.cta-button`, `.fc-faq-desc`, `.carousel-dots`) e o `<main>` duplicado vivem nos `.html`, **não** nos componentes.

**Ordem das fases = impacto↓ / dependência.** Fase 0 primeiro (derruba ~95% do volume). Cada fase fecha com validação pelo harness (`axe-core` via CDP).

---

## FASE 0 — Fundação: tokens de contraste no DS 🟠 P0
**Objetivo:** WCAG 1.4.3 (AA) · derruba a maioria dos **129 nós** de contraste de uma vez.
**Esforço:** M · **Bloqueia:** validação das fases seguintes (fundo/cor mudam).

### 0.1 — Escala de texto mudo acessível (trilha A)
**Problema:** `text-foreground/{20,30,35,40}` = branco em opacidade sobre escuro → 1.88–3.77:1 (nunca 4.5). 200 usos / 20 arquivos.
Contagem: `/40`×63 · `/35`×43 · `/30`×44 · `/20`×24 · `/65`×26.

**Abordagem recomendada (A — semântica):** criar tokens sólidos verificados em `theme.css` e trocar via codemod:
- `--text-secondary` (corpo secundário, ≥4.5:1)
- `--text-tertiary` (legendas/meta, ≥4.5:1 — texto pequeno também precisa 4.5)
- Mapear: `/40`,`/35` → `text-secondary` · `/30`,`/20` → revisar (muitos são decorativos/disabled → manter, mas texto real sobe).
- `line-through` de preço antigo: subir contraste (é informação, não decoração).

**Abordagem pragmática (B — MVP):** find/replace elevando opacidade até o harness confirmar ≥4.5 (aprox. `/62`–`/70` no dark). Rápido, mas mantém hierarquia por opacidade.

> ⚠️ Não chutar o valor — validar com o harness. Fundo dark não é preto puro; a relação alpha→ratio não é linear.

**Arquivos:** `src/styles/theme.css` (define tokens) + 20 `.tsx` (aplica). Principais: cards de produto, `Navbar` (breadcrumb), PLP, PDP, drivers.

### 0.2 — Vermelho da marca com texto branco (trilhas A+B)
**Problema:** `--primary: #ff2b2e` + `#fff` = **3.72:1**. Falha 4.5 (texto normal). Badges, chips `.w-fit`, CTAs, botões (drivers, faq, influenciadores `.cta-button`).
**Fix:** definir regra de uso:
- Texto **grande** (≥18px ou ≥14px bold) sobre primary: passa em 3:1 → OK manter branco.
- Texto **normal / ícone-em-botão**: escurecer o vermelho para `~#c81a1d` (≈4.5:1 c/ branco) **ou** garantir tamanho grande.
- Criar `--primary-text-safe` para superfícies que precisam de texto normal.
**Arquivos:** `theme.css` + `public/pages/unified-overrides.css`.

### 0.3 — Cores hardcoded nas landings (trilha B)
**Problema:** valores fora de token — `maringa-fc .mc-marquee-text` #333 = **1.66:1** (pior do sistema); `fale-conosco .fc-faq-desc` #666 = 3.44; `influenciadores .landing-form-subtitle` 4.24; `checkout .text-foreground/20` 1.88.
**Fix:** substituir hex hardcoded por tokens de `shared-tokens.css` já verificados.
**Arquivos:** `public/pages/{maringa-fc,fale-conosco,influenciadores}.html` + `unified-overrides.css`.

**✅ Aceite F0:** rerun harness → `color-contrast` cai de 129 p/ ~0. Zero regressão visual (revisar dark+light).

---

## FASE 1 — Target size 24×24px 🟠 P0
**Objetivo:** WCAG 2.5.8 (AA, novo 2.2) · derruba a maioria dos **88 nós** (20/22 páginas).
**Esforço:** S · a maioria são componentes globais → 1 fix propaga.

| Alvo | Tamanho atual | Componente |
|---|---|---|
| Setas "Anúncio anterior/próximo" | **5×18** | `AnnouncementBar.tsx` |
| "Fechar aviso" | 20×20 | `AnnouncementBar.tsx` |
| Dots de banner ("Banner 2") | 22×44 | banner (home) |
| Breadcrumb ("Home") | 38×**17** | `Navbar.tsx` / `ui/breadcrumb.tsx` |
| Filtros/paginação PLP | vários | `ProductsPage.tsx` (44 nós em `/perifericos`) |

**Fix:** `min-height/min-width: 24px` (ideal 44px) nos botões-ícone; aumentar área clicável do breadcrumb (padding) sem quebrar layout.
**Isento (ignorar):** skip link `1×1` (visually-hidden, expande no foco — não é defeito).
**Arquivos:** `AnnouncementBar.tsx`, `Navbar.tsx`, `ui/breadcrumb.tsx`, `ProductsPage.tsx`.

**✅ Aceite F1:** `target-size` cai de 88 p/ ~0 (fora skip link).

---

## FASE 2 — Críticos nível A (trilha React) 🔴 P1
**Objetivo:** WCAG 4.1.2 / 2.1.1 / 3.3.2 (nível A). Bloqueadores de leitor de tela.
**Esforço:** S (pontuais).

| # | Página | Regra | Elemento | Fix | Arquivo |
|---|---|---|---|---|---|
| 2.1 | home | `button-name` ×2 | setas carrossel produto (`.backdrop-blur-sm`) | `aria-label` + `<svg aria-hidden>` | `ProductCarousel.tsx` (~L304/325) / `PopularGrid.tsx` |
| 2.2 | home | `scrollable-region-focusable` | `.scrollbar-hide` sem foco teclado | `tabindex="0"` + `role="region"` + `aria-label` | carrossel home |
| 2.3 | checkout | `button-name` ×2 | botão fechar (`.top-4`) | `aria-label="Fechar"` | `CheckoutPage.tsx` (~L132/190) |
| 2.4 | pre-venda | `select-name` | `<select>` sem label | `<label for>` ou `aria-label` | `PreOrderPage.tsx:779` |
| 2.5 | drivers-lista | `button-name` ×2 | controles de filtro | texto ou `aria-label` | `DriversManuaisPage.tsx` (~L219/295) |

**✅ Aceite F2:** `button-name`, `select-name`, `scrollable-region-focusable` = 0.

---

## FASE 3 — Críticos nível A (trilha HTML landings) 🔴 P1
**Objetivo:** WCAG 4.1.2 / 1.3.1 (A) nos `.html` cru.
**Esforço:** S.

| # | Página | Regra | Fix | Arquivo |
|---|---|---|---|---|
| 3.1 | maringa-fc | `frame-title` | `title="..."` no `<iframe>` | `maringa-fc.html` |
| 3.2 | influenciadores | `aria-required-children` | corrigir `role` de `.carousel-dots` (filhos `<button>` inválidos) → `role="tablist"`+`tab` ou remover role | `influenciadores.html` |
| 3.3 | influenciadores, revendedor, maringa-fc | `<main>` duplicado | trocar `<main>` interno da landing por `<section>` (RootLayout já provê `<main>`) | 3× `.html` |

**✅ Aceite F3:** `frame-title`, `aria-required-children` = 0 · 1 só `<main>` por página.

---

## FASE 4 — Estrutura & semântica 🟡 P2
**Objetivo:** WCAG 1.3.1 / 2.4.6 (A/AA).
**Esforço:** S–M.

| # | Item | Fix | Arquivo |
|---|---|---|---|
| 4.1 | `perfil` sem `<h1>` | h1 existe só no estado logado (L248); adicionar `<h1>` no estado **gate/login** (L215) | `ProfilePage.tsx` |
| 4.2 | `monte-seu-pc` sem `<nav>` | verificar por que header/nav some nessa rota; restaurar landmark | `MonteSeuPcPage.tsx` |
| 4.3 | Salto de heading (h1→h3) | reordenar níveis em: `plp-todos`, `plp-categoria`, `onde-encontrar`, `monte-seu-pc`, `faq` | `ProductsPage.tsx`, `onde-encontrar.html`, `MonteSeuPcPage.tsx`, `FaqPage.tsx` |

**✅ Aceite F4:** todo template com `<h1>` único · zero salto de heading · landmarks corretos.

---

## FASE 5 — Verificação 🔵 P3
**Objetivo:** confirmar automação + cobrir os ~50–70% que ferramenta não pega.

**5.1 — Rerun harness** (regressão): `axe-core` via CDP em todas as 22 páginas. Meta: 0 violations serious/critical.

**5.2 — Manual (obrigatório p/ AA real):**
- [ ] Teclado 100%: Tab em toda página, foco visível (2.4.7), sem trap (2.1.2), ordem lógica. Foco: modais (carrinho/checkout), filtros PLP, wizard "Monte seu PC".
- [ ] Leitor de tela (NVDA + VoiceOver): cards de produto, breadcrumb, form checkout, erros com `role="alert"` (3.3.1).
- [ ] Zoom 200% (1.4.4) + reflow 320px (1.4.10) sem scroll horizontal.
- [ ] Foco não obscurecido por header sticky (2.4.11, novo 2.2).
- [ ] "Monte seu PC": operável sem drag (2.5.7); estado em `aria-live` (4.1.3).
- [ ] Redundant entry no checkout (3.3.7): endereço entrega = cobrança.

---

## Resumo de execução

| Fase | Prioridade | Esforço | WCAG | Ganho |
|---|---|---|---|---|
| 0 — Tokens de contraste | P0 | M | 1.4.3 | ~129 nós |
| 1 — Target size | P0 | S | 2.5.8 | ~88 nós |
| 2 — Críticos React | P1 | S | 4.1.2/2.1.1 | 7 nós |
| 3 — Críticos HTML | P1 | S | 4.1.2/1.3.1 | 3 + main |
| 4 — Estrutura | P2 | S–M | 1.3.1/2.4.6 | 7 páginas |
| 5 — Verificação | P3 | M | — | garantia |

**Caminho crítico:** 0 → 1 (paralelizáveis) → 2 ‖ 3 (paralelizáveis) → 4 → 5.
**Commits sugeridos:** 1 por fase (ou por subitem em F0), pra medir queda no harness a cada passo.

*Harness em `scratchpad/audit.mjs` — reexecutável.*
