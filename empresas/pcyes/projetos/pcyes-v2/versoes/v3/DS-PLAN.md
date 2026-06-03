# PCYES V3 — Plano de Orquestração do Design System

> Objetivo: transformar o protótipo num sistema realmente orquestrado a nível de página + design system. Zero cor hardcoded, primitivos cobrindo toda duplicação, cada página compondo só tokens + primitivos. Resultado: handoff Figma 1:1 trivial.
>
> Criado: 2026-06-03. Anexo de `design.md` + `HANDOFF.md` + `design-section-map.md`.

---

## Decisões que moldam este plano (2026-06-03)

| Decisão | Escolha | Consequência |
|---|---|---|
| **Light mode** | Não shipa agora (versão atual está errada). Milestone futuro dedicado. | Migração semântica usa só valores **dark** corretos. Override legacy de 250 linhas NÃO é mantido vivo — quando um componente sai de `bg-[#0a0a0a]` pra `bg-surface-0`, o seletor antigo do override deixa de casar e o light daquele trecho "quebra mais". **Aceito**, porque light já está errado e não shipa. Light ganha milestone próprio depois, partindo de tokens limpos. |
| **Figma** | Depois. | Sem fase de parity. Gate leve: cada fase de DS re-exporta `tokens.json` + `tokens.studio.json`. Você monta o Figma quando quiser, já 1:1 com os tokens. |
| **Cadência** | Fase a fase, você revisa no browser. | Cada fase = 1 batch commitável + checklist de verificação. PARO ao fim de cada fase. Você roda `npm run dev`, confere as telas listadas, aprova. Só então a próxima. |

---

## Por que esta ordem (a lógica de segurança)

Princípio: **consolidar antes de tokenizar**. Migrar primitivos primeiro reduz a superfície da migração de tokens (migrar 1 ProductCard em vez de 5). Ordem geral:

```
[ganhos mecânicos: matam drift]  →  [consolidar duplicação]  →  [camada semântica de tokens]  →  [orquestração por página]
        Fase 1-2                          Fase 3-4                      Fase 5-6                       Fase 7
```

Risco cresce ao longo do plano. As fases mecânicas (1-2) são quase risco-zero e dão vitórias visíveis cedo. O ponto de maior risco (Fase 6, migração de tokens página-a-página) só chega depois da fundação estar sólida, e é fatiado por página pra cada revisão ser pequena.

---

## Protocolo de segurança (toda fase)

Não existe teste visual automatizado. O gate é:

1. `npm run typecheck` — zero erros novos.
2. `npm run build` — passa, bundle sem salto absurdo (anoto antes/depois).
3. **Você** roda `npm run dev` e confere as telas que a fase tocou (checklist por fase abaixo).
4. Commit por fase (mensagem em prosa, factual, Co-Authored-By no fim).
5. Rollback = `git revert` da fase. Cada fase é um commit atômico isolado → reverter uma não derruba as outras.

Regra de ouro: **nenhuma fase mistura "extrair primitivo" com "mudar valor visual"**. Extração é refactor puro (markup idêntico). Mudança de valor é fase separada. Isso mantém cada diff legível e cada regressão rastreável.

---

## Fase 0 — Baseline (sem mudança visual)

**Meta:** congelar o ponto de partida pra medir regressão.

- [ ] Rodar `npm run typecheck` + `npm run build`, anotar erros pré-existentes e tamanho do bundle (CSS + JS) aqui.
- [ ] Confirmar que as telas-chave renderizam hoje sem erro de console (Home, ProductPage, ProductsPage, Cart, Checkout, Profile).

**Risco:** nenhum. **Commit:** nenhum (só medição).

---

## Fase 1 — Migrar botões de compra hand-rolled → `<CTAButton>` / `<QuickAddButton>`

**Meta:** matar o drift de sombra (auditoria cloud achou cópias com `0 8px 20px -6px rgba(34,197,94,.55)` divergindo do token `--shadow-buy-cta-sm`).

**Arquivos (10):** GpuShowcase, CartDrawer, CartPage, ProductPage, CheckoutPage, NewReleasesSection, ProductsPage, FeaturedProduct, IntelligentDevices, EssentialsSection.

**Passos:**
- Por arquivo: identificar o `<button>` de compra/adicionar, trocar por `<CTAButton variant=... size=...>` ou `<QuickAddButton>` mantendo label e handler.
- Atenção a tamanhos: os hand-rolled variam (h-11 vs h-12, px diferente). Mapear pro `size` mais próximo; se nenhum encaixar, anotar e NÃO forçar — discutir antes de inventar size novo.
- Remover imports de ícone/sombra que ficaram órfãos.

**Risco:** Médio-baixo. Sombra/scale podem mudar 1-2px. Por isso é fase isolada com revisão.

**Verificar no browser:** hover dos botões "Comprar"/"Adicionar" nas 10 telas — sombra verde idêntica, scale no hover/active igual, label e clique funcionando.

**Commit:** `refactor(pcyes-v3): buy CTAs hand-rolled migram para CTAButton/QuickAddButton`

---

## Fase 2 — Primitivo `<CarouselNavButton>`

**Meta:** consolidar o chevron `h-12 w-12 rounded-pill` repetido em 5+ shelves.

**Consumidores:** ProductShelf, FlashDealsStrip, CategoryShowcase, ProductCarousel, + os outros 5 arquivos que casam o padrão.

**Passos:**
- Criar `src/app/components/section/CarouselNavButton.tsx` reproduzindo markup idêntico (border white/15, bg black/55, backdrop-blur, hover primary, disabled opacity-0). Props: `direction`, `onClick`, `disabled`, `className?`.
- Exportar no `index.ts`.
- Migrar os consumidores um a um.

**Risco:** Baixo. Markup idêntico, refactor puro.

**Verificar no browser:** setas de navegação de cada carrossel — posição, hover vermelho, estado disabled nas pontas.

**Commit:** `feat(pcyes-v3): primitivo CarouselNavButton + migra 5 shelves`

---

## Fase 3 — Extração formal do `<ProductCard>`

**Meta:** matar a maior duplicação do projeto (card de produto repetido em 5 arquivos). É o maior payoff de DS ainda pendente.

**Duplicado em:** ProductShelf, ProductsPage, FlashDealsStrip, ProductCarousel, ProductPage (+ DealsHighlight, Essentials, DropDoDia têm variações).

**Passos (em 2 sub-commits pra segurança):**
- **3a — Desenhar a API primeiro, sem migrar nada.** Escrever a interface do `<ProductCard>` (props: produto, ratio `5/6 | square`, slots de overlay, variante de badge, quick-add on/off) num rascunho. Revisar comigo a API ANTES de extrair. Cards premium (Drop-do-Dia, Hero) ficam de fora — são variantes próprias, não forçar.
- **3b — Extrair + migrar shelf por shelf.** Um consumidor por vez, markup idêntico, comparando lado a lado. Não migrar todos de uma vez.

**Risco:** Alto (regressão visual fácil). Mitigação: API revisada antes, migração incremental, cada shelf verificado isolado.

**Verificar no browser:** cada shelf que usa o card — imagem (aspect/padding), badges de desconto/pré-venda na posição certa, quick-add no hover, preço/título/swatches, hover neon vermelho.

**Commits:** `feat(pcyes-v3): API do primitivo ProductCard (rascunho)` → depois um commit por lote de migração.

---

## Fase 4 — Base de Modal/Drawer (opcional, avaliar custo-benefício)

**Meta:** 5 modais compartilham receita (SearchModal, WelcomePopup, AddressFormModal, AuthModal, CookieConsent) + drawer right-anchored (CartDrawer) é primitivo próprio.

**Passos:**
- `<ModalBase>` (backdrop blur, centragem, radius, z-index, ESC, trap de foco) + `<DrawerBase>` (right-anchored sheet).
- Migrar incremental.

**Risco:** Médio (foco/scroll-lock/z-index são chatos). **Decisão:** se o tempo apertar, pular — não bloqueia Figma. Marcar como "nice to have".

**Verificar no browser:** abrir/fechar cada modal, ESC, clique no backdrop, foco preso dentro, scroll travado atrás.

**Commit:** `feat(pcyes-v3): primitivos ModalBase + DrawerBase`

---

## Fase 5 — Declarar camada de tokens semânticos (dark) — SEM tocar componente

**Meta:** criar a camada role-based que mata o hardcode e habilita Figma 1:1. Tokens descrevem PAPEL, não valor.

**Passos:**
- Em `theme.css`, declarar (valores dark; light fica como rascunho pro milestone futuro):
  - `--surface-0/1/2/3`, `--surface-glass`
  - `--text-strong/default/muted/subtle`
  - `--border-subtle/default/strong`
  - (spec completa em `design.md §10.4`)
- Expor no bloco `@theme inline` → vira utilitário Tailwind (`bg-surface-0`, `text-muted`, `border-subtle`).
- **Zero mudança em componente.** Só adiciona tokens. Build idêntico visualmente.

**Risco:** Quase zero (só adiciona CSS custom properties não consumidas ainda).

**Verificar no browser:** nada muda visualmente. Confirmar que build passa e nenhuma tela regrediu.

**Commit:** `feat(pcyes-v3): camada de tokens semanticos (surface/text/border) em theme.css`

---

## Fase 6 — Migrar componentes → tokens semânticos, PÁGINA POR PÁGINA

**Meta:** o fix de verdade. Trocar `bg-[#0a0a0a]`/`text-white/70`/`border-white/10` por `bg-surface-0`/`text-muted`/`border-subtle`. Superfície atual: **27 arquivos** com hex de surface, **257** `text-white/α`, **74** `border-white/α`.

**Estratégia — fatiar por página (ordem mobile-first), cada fatia = 1 commit revisável:**

| Lote | Escopo | Notas |
|---|---|---|
| 6a | Componentes simples alta-visibilidade: Footer, Newsletter, TrustStrip, BrandsStrip | Aquece o padrão num escopo pequeno |
| 6b | Shelves da home: ProductShelf, FlashDealsStrip, DealsHighlight, EssentialsSection, DropDoDia, CategoryShowcase | Já usam primitivos → migração mais limpa |
| 6c | Home restante: Hero, IntelligentDevices, GpuShowcase, InRealLife | |
| 6d | ProductPage + ProductsPage | |
| 6e | Cart + Checkout + Profile | Forms aqui também migram pra FieldInput/FieldLabel (fold-in) |
| 6f | Modais + Navbar/AnnouncementBar | Navbar/Announce continuam "sempre dark" (decisão light-mode); só trocam hardcode por token de valor dark |

**Fold-in de contraste:** as 49 instâncias `text-foreground/15-25` em risco WCAG entram aqui — ao mapear pra `--text-subtle`/`--text-muted` defino o valor acessível UMA vez, não caço caso a caso.

**Fold-in de forms:** lote 6e migra os ~30 inputs de Checkout + Cart + Profile pra `<FieldInput>`/`<FieldLabel>` (primitivo já existe).

**Risco:** Alto no agregado, BAIXO por lote (cada lote é pequeno e isolado). É exatamente por isso que é fatiado e você revisa cada um.

**Verificar no browser (por lote):** a(s) página(s) do lote, em dark — surfaces, textos e bordas idênticos ao antes. Comparar com a tela anterior (screenshot mental ou git stash).

**Commits:** um por lote, ex: `refactor(pcyes-v3): Footer/Newsletter/TrustStrip migram para tokens semanticos`

---

## Fase 7 — Orquestração final + sync de docs

**Meta:** fechar o sistema e deixar pronto pro Figma.

**Passos:**
- Auditar cada página: confirmar que compõe **só** primitivos + tokens (grep por hex/`text-white` residual).
- Atualizar `design-section-map.md` — cobertura de primitivos real pós-migração.
- Atualizar `design.md §16` changelog + marcar §10.4 fase 1 como feita.
- Re-exportar `tokens.json` + `tokens.studio.json` (DTCG + Token Studio) com a camada semântica → pronto pra reimport no Figma.
- Atualizar `HANDOFF.md` (remover §5 stale, registrar estado novo).

**Risco:** Nenhum (docs + export).

**Commit:** `docs(pcyes-v3): sync design system docs + re-export tokens pos-orquestracao`

---

## Fase 8 — Backlog (não bloqueia nada)

- **Sweep borderRadius** (302 inline). Risco médio, valor baixo. 14px/16px não têm token — decidir tokens antes (`--radius-card-input`?) ou folder no mais próximo. Só fazer se sobrar fôlego.
- **Milestone Light Mode** (refazer do zero com tokens semânticos limpos — a versão atual está errada).
- Primitivos de baixa repetição: Glass pill, Countdown cells, Coin chip, Mega-menu card.

---

## Mapa de risco (resumo)

| Fase | Risco | Reversível | Bloqueia Figma? |
|---|---|---|---|
| 1 Buy CTAs | Médio-baixo | Sim | Não |
| 2 CarouselNavButton | Baixo | Sim | Não |
| 3 ProductCard | **Alto** | Sim | Ajuda muito |
| 4 Modal/Drawer base | Médio | Sim | Não (opcional) |
| 5 Declarar tokens | Quase zero | Sim | **Sim — habilita 1:1** |
| 6 Migrar p/ tokens | Alto agregado / baixo por lote | Sim (por lote) | **Sim — núcleo do 1:1** |
| 7 Docs + export | Zero | Sim | Entrega final |

**Caminho mínimo pro Figma 1:1:** Fases 5 → 6 → 7. As fases 1-4 são higiene de primitivo que tornam a 6 mais limpa. Se a prioridade for Figma rápido, dá pra fazer 1-2 (rápidas), pular 3-4, e ir direto pro 5-6-7 — mas o ProductCard (3) some muita duplicação, então recomendo não pular.
