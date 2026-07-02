# Auditoria de Acessibilidade — PCYES v3

**Padrão:** WCAG 2.2 nível AA · **Data:** 2026-07-02 · **Tema auditado:** dark (padrão do app)

**Método:** DOM renderizado em Chrome headless (CDP puro), `axe-core 4.12.1` com tags `wcag2a/2aa/21a/21aa/22aa` + probes manuais (target-size 2.5.8, tabindex, landmarks, hierarquia de headings, skip link, reduced-motion). Skills usadas: `accessibility` (Addy Osmani) + `wcag-audit-patterns`.

**Escopo:** 22 templates distintos (não as ~500 URLs — produtos/categorias reusam o mesmo template). 1 URL representativa por template.

> ⚠️ Ferramenta automatizada pega ~30–50% dos problemas. Falta teste manual com leitor de tela (NVDA/VoiceOver) e navegação 100% teclado — listados no fim.

---

## Resumo executivo

| Severidade | Regra | WCAG | Páginas | Ocorrências |
|---|---|---|---|---|
| 🟠 Serious | Contraste de cor insuficiente | 1.4.3 (AA) | **22/22** | 129 |
| 🟠 Serious | Alvos de toque < 24×24px | 2.5.8 (AA, novo 2.2) | 20/22 | 88 |
| 🔴 Critical | Botão sem nome acessível | 4.1.2 (A) | 3 | 6 |
| 🔴 Critical | `<select>` sem label | 4.1.2 / 3.3.2 (A) | 1 | 1 |
| 🔴 Critical | `role` com filhos inválidos | 1.3.1 (A) | 1 | 1 |
| 🔴 Critical | `<iframe>` sem título | 4.1.2 (A) | 1 | 1 |
| 🟠 Serious | Região rolável sem foco por teclado | 2.1.1 (A) | 1 | 1 |

**2 defeitos sistêmicos** (contraste + target-size) dominam o volume. Resolvidos no design system, corrigem ~95% das ocorrências de uma vez. Os 🔴 critical são pontuais e rápidos.

**Já em conformidade** (bom): `lang="pt-BR"` em todas · skip link presente em todas · `prefers-reduced-motion` respeitado · zero `tabindex` positivo · zero autoplay · `<h1>` único em 21/22.

---

## 🟠 SISTÊMICO 1 — Contraste (WCAG 1.4.3, AA) · 22/22 páginas

**Causa raiz — escala de texto mudo por opacidade.** Componentes usam `text-foreground/40`, `/35`, `/30`, `/20` para texto secundário, breadcrumbs, legendas e preços antigos. No tema dark `--foreground: #fff`, então é branco sobre fundo escuro em opacidade parcial — nunca cruza 4.5:1:

| Utilitário | Ratio medido | Mínimo AA | Passa? |
|---|---|---|---|
| `text-foreground/40` | 3.77:1 | 4.5:1 | ❌ |
| `text-foreground/35` | 3.21:1 | 4.5:1 | ❌ |
| `text-foreground/30` | 2.58:1 | 4.5:1 | ❌ |
| `text-foreground/20` | 1.88:1 | 4.5:1 | ❌ |

Aparece em quase toda página (breadcrumb "Home", subtítulos, `line-through` de preço antigo no card de produto, textos de apoio).

**Causa raiz 2 — vermelho da marca com texto branco.** `--primary: #ff2b2e` + texto `#ffffff` = **3.72:1**. Falha 4.5 para texto normal (só passaria como texto grande ≥18px/14px-bold). Atinge badges, CTAs, chips `.w-fit`, botões (`drivers-lista`, `faq`, `influenciadores .cta-button`).

**Pontuais piores (classes custom fora do DS):**
- `maringa-fc .mc-marquee-text` — **1.66:1** (#333 sobre fundo escuro) — pior do sistema
- `checkout .text-foreground/20` — 1.88:1
- `fale-conosco .fc-faq-desc` — 3.44:1 (#666)
- `checkout .hover:text-primary` — 2.7:1

**Correção (no DS, `src/styles/theme.css`):**
1. Definir piso acessível para texto mudo. Branco-sobre-escuro só cruza 4.5:1 a partir de ~`/62`. Trocar a escala `/20…/40` por um token sólido `--muted-foreground` já verificado (hoje ele é `#fff` puro no dark — inútil como "mudo", por isso os componentes contornam com opacidade). Ex.: texto secundário mínimo `rgba(255,255,255,.70)`.
2. Vermelho: `#ff2b2e` + branco só serve para **texto grande/bold**. Para texto normal e ícones-em-botão, escurecer o vermelho (~`#c81a1d` dá 4.5:1) **ou** garantir tamanho ≥18px/700. Badges pequenos com branco reprovam.
3. Eliminar `#333`/`#666` hardcoded (marquee, faq) — usar tokens.

---

## 🟠 SISTÊMICO 2 — Target size 24×24px (WCAG 2.5.8, AA novo 2.2) · 20/22 páginas

Alvos interativos abaixo de 24×24 CSS px. Piores (globais, no header/RootLayout — atingem toda página):

| Elemento | Tamanho | Onde |
|---|---|---|
| Setas do carrossel de avisos ("Anúncio anterior/próximo") | **5×18px** | topo, global |
| "Fechar aviso" | 20×20px | topo, global |
| Dots do banner ("Banner 2") | 22×44px | home/global |
| Links de breadcrumb ("Home") | 38×**17px** | todas com breadcrumb |
| `plp-categoria` | 44 alvos pequenos | filtros/paginação |

**Exceção legítima:** o skip link aparece como `1×1px` — é a técnica visually-hidden padrão (expande no foco). Não é defeito real; ignorar.

**Correção:** `min-height/min-width: 24px` (recomendado 44px) nos controles de ícone do header, dots e setas. Links inline em fluxo de texto são isentos pela norma — priorizar botões-ícone e a barra de avisos.

---

## 🔴 CRÍTICOS pontuais (nível A — corrigir já)

| Página | Regra | WCAG | Elemento | Fix |
|---|---|---|---|---|
| **home** | `button-name` ×2 | 4.1.2 | setas do carrossel de produtos (`.backdrop-blur-sm`) — sem texto/label | `aria-label="Próximo/Anterior"` + `<svg aria-hidden>` |
| **home** | `scrollable-region-focusable` | 2.1.1 | `.scrollbar-hide` (carrossel) não recebe foco por teclado | `tabindex="0"` + `role="region"` + `aria-label` na área rolável |
| **checkout** | `button-name` ×2 | 4.1.2 | botão `.top-4` (fechar modal?) sem nome | `aria-label` |
| **pre-venda** | `select-name` | 4.1.2 / 3.3.2 | `<select>` sem `<label>` associado | `<label for>` ou `aria-label` |
| **influenciadores** | `aria-required-children` | 1.3.1 | `.carousel-dots` com `role` que não permite os `button` filhos | corrigir role do container (ex.: `role="tablist"`+`role="tab"`, ou remover role) |
| **maringa-fc** | `frame-title` | 4.1.2 | `<iframe>` (mapa/embed) sem `title` | `title="..."` descritivo |
| **drivers-lista** | `button-name` ×2 | 4.1.2 | botões de filtro `.min-w-[170px]` sem texto visível a SR | texto ou `aria-label` |

---

## 🟡 Estrutura / semântica (Serious–Moderate)

- **`perfil` sem `<h1>`** (2.4.6/1.3.1) — página renderiza sem heading principal (provável gate de auth mostrando login sem título). Adicionar `<h1>`.
- **`<main>` duplicado** em `influenciadores`, `revendedor`, `maringa-fc` (2 landmarks `main`). Landing embutida traz seu próprio `<main>` dentro do `<main>` do RootLayout. Só um `<main>` por página — trocar o interno por `<section>`/`<div>`.
- **`monte-seu-pc` sem landmark `<nav>`** — verificar se o header some nessa rota.
- **Salto de heading** (pula nível, 1.3.1) em `plp-todos`, `plp-categoria`, `onde-encontrar`, `monte-seu-pc`, `faq` — h1→h3 sem h2. Reordenar níveis.

---

## Tabela por página

| Template | URL | Contraste | Target | 🔴 Crítico | Estrutura |
|---|---|---:|---:|---|---|
| home | `/` | 2 | 2 | button-name×2, scroll-focus | ok |
| plp-todos | `/produtos` | 12 | 4 | — | salto heading |
| plp-categoria | `/perifericos` | 11 | **44** | — | salto heading |
| plp-subcategoria | `/perifericos/mouses` | 4 | 2 | — | ok |
| pdp | `/produto/1` | 23 | 2 | — | ok |
| carrinho | `/carrinho` | 2 | 0 | — | ok |
| checkout | `/checkout` | 7 | 1 | button-name×2 | ok |
| pre-venda | `/pre-venda` | 5 | 2 | select-name | ok |
| perfil | `/perfil` | 1 | 2 | — | **sem h1** |
| influenciadores | `/influenciadores` | 4 | 7 | aria-required-children | main×2 |
| revendedor | `/revendedor` | 2 | 2 | — | main×2 |
| fale-conosco | `/fale-conosco` | 4 | 2 | — | ok |
| onde-encontrar | `/onde-encontrar` | 2 | 2 | — | salto heading |
| maringa-fc | `/maringa-fc` | 3 | 2 | frame-title | main×2 |
| monte-seu-pc | `/monte-seu-pc` | 2 | 0 | — | sem nav, salto heading |
| drivers-lista | `/drivers-e-manuais` | 15 | 2 | button-name×2 | ok |
| drivers-detalhe | `/drivers-e-manuais/{slug}` | 13 | 2 | — | ok |
| faq | `/faq` | 3 | 2 | — | salto heading |
| quem-somos | `/quem-somos` | 2 | 2 | — | ok |
| politica-privacidade | `/politica-de-privacidade` | 4 | 2 | — | ok |
| politica-garantia | `/politica-de-garantia` | 4 | 2 | — | ok |
| termos-de-uso | `/termos-de-uso` | 4 | 2 | — | ok |

*(números = nós de DOM reprovados por axe naquela regra)*

---

## Plano de correção priorizado

**P0 — DS (1 fix, ~95% do volume):**
1. Escala de texto mudo acessível (piso de contraste) em `theme.css` → mata a maioria dos 129 nós de contraste.
2. Regra de uso do vermelho `#ff2b2e` (texto grande/bold OU escurecer) → badges/CTAs.
3. `min-height:24px` nos botões-ícone globais (setas de aviso, fechar, dots) → mata a maioria dos 88 nós de target-size.

**P1 — Críticos nível A (7 fixes pontuais):** `aria-label` nas setas de carrossel (home) e botões de fechar (checkout) e filtro (drivers); `label` no `<select>` (pre-venda); `title` no iframe (maringa-fc); role dos dots (influenciadores); `tabindex`+`role` na região rolável (home).

**P2 — Estrutura:** `<h1>` no perfil; deduplicar `<main>` (influenciadores/revendedor/maringa-fc); corrigir saltos de heading (5 páginas).

**P3 — Manual (não coberto por automação):**
- [ ] Navegação 100% teclado: Tab em toda página, foco visível, sem trap, ordem lógica — foco especial em modais (carrinho, checkout), filtros de PLP e wizard "Monte seu PC".
- [ ] Leitor de tela (NVDA/VoiceOver): cards de produto, breadcrumb, form de checkout, mensagens de erro (`role="alert"`).
- [ ] Zoom 200% sem perda de conteúdo/scroll horizontal.
- [ ] Foco não obscurecido por header sticky (2.4.11, novo 2.2).
- [ ] "Monte seu PC": operável sem drag (2.5.7) e feedback de estado em `aria-live`.

---

*Harness reproduzível: `axe-core` via CDP em Chrome headless. Reexecutar após P0 para medir queda no volume.*
