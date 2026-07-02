# Pente-fino QA/UX — PCYES v3

**Data:** 2026-07-02 · **Escopo:** erros, estados vazios, edge cases, microinterações + revisão da auditoria de heurísticas (FigJam). Método: leitura de código + inspeção de DOM via CDP.

---

## ✅ Status de resolução (Plano Nota-100, Fase 4)

| Gap | Status | Onde |
|---|---|---|
| G1 CEP inválido em silêncio | ✅ Resolvido | `CheckoutPage.handleCepLookup` — `toast.error` + `cepError` + `aria-invalid` |
| G2 checkout sem erro por-campo | ✅ Resolvido | `err()` + `role="alert"` + `aria-invalid` nos 5 obrigatórios + foco no 1º inválido |
| G3 sem catch-all 404 | ✅ Resolvido | `routes.tsx` `path:"*"` → `NotFoundPage` + `CategoryRoute` valida slug |
| G4 remoção sem undo | ✅ Resolvido | `removeWithUndo` (sonner `action`) + "Limpar" confirmado em Cart**Page** e Cart**Drawer** |
| G5 PIX sem ação ao expirar | ✅ Resolvido | `pixExpired` + `regeneratePix` ("Gerar novo código PIX") |
| G6 cupom sem sugestão | 🟢 Baixa (aberto) | polimento opcional |
| G7 line-clamp sliver (zoom≠100%) | 🟢 Baixa (aberto) | artefato Chromium, só em zoom ≠ 100% |

**Correção (Fase 7):** o "achado" anterior de `/checkout` sem `<h1>`/`<main>` era **artefato do harness de teste** — o `python http.server` dá 404 em `/checkout` (rota sem prerender, sem SPA-fallback), então o app nem iniciava naquela medição. Na Vercel o `rewrites` serve o `index.html` e a página monta normalmente. O empty-state do checkout **já tem `<h1>`** (`CheckoutPage:657`) e fica dentro do `<main>` do `RootLayout`. **Nada a corrigir.**

---

## 1. Bug do truncamento de título (o "texto vazando abaixo do …")

**Investigação:** inspecionei o DOM real dos títulos de produto (CDP). O `-webkit-line-clamp` renderiza **limpo** (2 linhas + "…", sem vazamento) em zoom 100% no meu render controlado. O `display: computed = flow-root` que aparece é o **headless reportando** o `-webkit-box` (nenhuma regra CSS define `flow-root`; forçar `display:-webkit-box !important` não altera o computed).

**Veredito:** é o artefato conhecido do `-webkit-line-clamp` do Chromium em **zoom ≠ 100% / HiDPI** — a caixa de clamp arredonda e deixa vazar ~1px do topo da linha seguinte. Não é bug do código nem regressão das minhas mudanças (não toco `display`/`line-clamp`).
**Não shippei band-aid** que não consigo verificar aqui. **Fix targetado disponível** (max-height em `em` no título = zoom-proof) — aplico se você confirmar que persiste em **zoom 100%**.

**Bug real achado de quebra:** `ProductCard` (home) tinha old-price `line-through` em `0.38` (3,5:1) — escapou do meu grep de contraste. **Corrigido → 0.62.**

---

## 2. Revisão da auditoria do agente — o que faz sentido MESMO

| Recomendação do board | Veredito | Evidência no código |
|---|---|---|
| **"Busca é só placeholder / não funciona"** (H7, SEV4, "prio máxima") | ❌ **ERRADO** | Busca funciona e2e: `Navbar` filtra por nome+categoria (`searchResults`), submit → `/produtos?search=`, e o PLP lê o param (`ProductsPage:345,405`). Tem live-results no mega-menu + empty state. |
| **"WCAG: 48 text-foreground/15-25 em risco; 4 falhas de contraste"** | ❌ **OUTDATED** | Já remediado nesta sprint: axe WCAG 2.2 AA **129→0**. |
| **"CEP inválido não alerta"** (H5) | ✅ **REAL** | `CheckoutPage:456` — `catch`/`data.erro` ignorados em silêncio, sem feedback. |
| **"Falta desfazer remoção de item"** (H3) | ✅ **REAL** | `removeItem` imediato (`CartPage:469`, `CartDrawer:293`), sem undo/confirmação. |
| **"PIX sem tela de expiração / retry"** (Fluxo E/G) | ✅ **PARCIAL** | Existe `pixWaiting`+`pixTimer(600s)`, mas nada acontece ao chegar a 0. |
| **"404 de slug sem mensagem clara"** (H9) | ✅ **REAL** | Sem rota catch-all `path:"*"`; slug desconhecido cai no `:category` → PLP vazia, não um 404. |
| "Validação por passo no checkout" (citado como existente) | ✅ **CORRETO** | `canAdvance` / `step0/1/2Valid` bloqueiam avanço. |
| "Empty states" | ✅ **BOM** | Carrinho vazio, Nenhum pedido/resultado/setup/transação/lançamento — bem cobertos. |
| "Sem e-mail/push de confirmação", "cancelar pedido pós-compra não existe" | ⚠️ **PROTOTYPE** | Mock esperado — não há backend. Fora de escopo de protótipo, mas vale registrar. |

**Resumo:** o board mistura acerto e ruído. **2 itens de prioridade alta dele estão errados/desatualizados** (busca e acessibilidade). Os gaps de erro/recuperação (CEP, undo, PIX, 404) **procedem**.

---

## 3. Minha auditoria — gaps reais (erros / vazios / edge / microinteração)

| # | Gap | WCAG/Nielsen | Onde | Severidade |
|---|---|---|---|---|
| G1 | **CEP inválido falha em silêncio** — nem toast nem estado de erro | 3.3.1 · H1/H9 | `CheckoutPage:446-456` | 🟠 Alta |
| G2 | **Checkout sem erro por-campo** — gate por step existe, mas 0 `aria-invalid`/`role=alert`; leitor de tela e usuário não sabem QUAL campo falhou | 3.3.1/3.3.3 | `CheckoutPage` (0 ocorrências) | 🟠 Alta |
| G3 | **Sem catch-all 404** — URL/slug inválido → PLP vazia em vez de página de erro com saída | H9 | `routes.tsx` | 🟠 Alta |
| G4 | **Remoção de item sem undo/confirmação** — ação destrutiva instantânea | H3/H5 | `CartPage:469`, `CartDrawer:293` | 🟡 Média |
| G5 | **PIX: timer sem ação ao expirar** — conta até 0 e não oferece reabrir/gerar novo | H1 | `CheckoutPage:498-507` | 🟡 Média |
| G6 | **Cupom inválido** — tem toast, mas sem sugestão de cupons válidos | H5 | Cart/Checkout | 🟢 Baixa |
| G7 | **line-clamp sliver** em zoom ≠ 100% (ver §1) | — | títulos de produto | 🟢 Baixa |

**O que já está bom (não mexer):** toasts de feedback (add-to-cart, review, link copiado), highlight do último item adicionado, validação do form de cartão (`CardFormModal:67`), loading states (CEP, PIX), empty states, e — pós-sprint — acessibilidade AA + foco de teclado.

---

## 4. Plano priorizado

### P0 — Erros que deixam o usuário travado (rápidos, alto impacto)
1. **G1 CEP inválido** — no `if (data.erro)`/`catch`, disparar `toast.error("CEP não encontrado")` + marcar campo. ~15 min.
2. **G3 catch-all 404** — rota `path:"*"` com página de erro (busca, voltar à home, categorias). ~30 min.
3. **G2 erros de campo no checkout** — `aria-invalid` + `role="alert"` + mensagem inline nos required ao tentar avançar; focar o 1º inválido. Fecha lacuna de a11y (3.3.1/3.3.3) além de UX. ~1-2 h.

### P1 — Recuperação e ações destrutivas
4. **G4 undo na remoção** — `toast` com ação "Desfazer" (sonner suporta `action`) restaurando o item; idem "Limpar carrinho" com confirmação. ~1 h.
5. **G5 PIX expiração** — ao `pixTimer===0`, trocar UI para "PIX expirado · Gerar novo" reabrindo o fluxo. ~1 h.

### P2 — Polimento
6. **G6** cupom: listar 1-2 cupons ativos na dica de erro.
7. **G7** line-clamp: `max-height` em `em` nos títulos (zoom-proof) — só se confirmar em 100%.
8. Confirmação em outras ações destrutivas (remover cartão/endereço salvo no perfil).

**Nota:** e-mail/push de confirmação e cancelamento de pedido pós-compra dependem de backend — fora do escopo de protótipo, registrados para a fase de integração.

---

*Auditoria feita sobre a base já remediada de acessibilidade (ver [A11Y-AUDIT.md](A11Y-AUDIT.md)). Nada aqui é bloqueante de a11y — são gaps de robustez de fluxo/erro.*
