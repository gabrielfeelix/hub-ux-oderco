# PCYES V3 — Plano DS: Figma 1:1, Component Library e Governança

> Objetivo: transformar o DS de "tokens + fundações documentadas" num **design system operável** — designer monta tela a partir de componentes, dev consome 1:1 via Code Connect, e o sistema escala com governança.
>
> Pré-requisito (FEITO): código tokenizado (cor/raio/tipo/sombra), primitivos no código, variáveis Figma corretas (global + theme com modos light/dark). Criado: 2026-06-05. Anexo de `design.md`, `DS-PLAN.md`, `AUDIT-DS.md`.

---

## Estado atual (baseline)

| Camada | Estado |
|---|---|
| Tokens no código | ✅ cor/raio/tipo/sombra/motion 100% token |
| Primitivos no código | ✅ CTAButton v2, ProductCard, CarouselNavButton + 13 |
| Variáveis Figma | ✅ `global` (fundação) + `theme` (modos light/dark, flip ok) |
| Páginas de fundação Figma | ✅ 9 (Colors, Gradients, Type, Spacing, Radii, Shadows, Motion, Containers + Semantic) |
| **Componentes Figma** | ❌ **zero** — gap principal |
| Text/Effect styles bound | ❌ swatches usam fill cru |
| Code Connect | ❌ |
| Library publicada | ❌ |
| Identity pages | ⬜ stubs |
| Light mode | ⬜ valores rascunho |

---

## Princípios (à risca)

1. **Variável é a fonte.** Todo style/componente referencia variável, nunca hex cru. Token muda → tudo atualiza.
2. **Figma espelha o código, não inventa.** Nome, variante e valor do componente Figma = o do código. Divergência = bug.
3. **Piloto antes de espalhar.** Componente/fase de risco: construo 1, screenshot, você aprova o padrão, então replico.
4. **Naming consistente.** `Componente / Variante` no Figma = `Component` + prop no código. Documentado na Fase G.
5. **Cada fase é verificável e reversível.** Screenshot de prova + checklist. Figma é server-side (sem git), então cada fase tem registro neste doc.

---

## Fase F0 — Styles bound aos tokens (fundação dos componentes)

**Meta:** criar os estilos reutilizáveis que os componentes vão consumir, ligados às variáveis.

- [ ] **Text styles** — Figtree/Inter × rampa (h1–h4, lg, xl, base, sm, caption, micro) × pesos usados. Cada um bound ao `fontSize` variable + família + peso + line-height + letter-spacing token.
- [ ] **Effect styles** — as 19 sombras (neon-red, hover families, CTA, layout) como effect styles bound aos shadow tokens.
- [ ] **Bind dos swatches de doc** às variáveis (Colors/Semantic/Gradients) — fonte única, swatch atualiza com o token.

**Risco:** baixo. **Verificar:** aplicar um text style + effect style num frame teste; trocar o token e ver propagar.

---

## Fase F1 — Component library: PILOTO (CTAButton + ProductCard)

**Meta:** estabelecer o padrão de qualidade e a convenção de variants com os 2 componentes-âncora.

- [ ] **CTAButton** — component set com props: `variant` (buy/preorder/brand) × `size` (sm/md/lg) × `block` × estado (default/hover/disabled). Pílula, gradiente via variable, sombra via effect style, texto via text style. Bate o código 1:1.
- [ ] **ProductCard** — component set: `variant` (shelf/grid) + toggles (rank, swatches, favorite). Usa CTAButton (quick-add) aninhado, DiscountBadge, well com hover `deal-card-img`.

**Risco:** médio-alto (define o padrão). **Piloto:** construo os 2, screenshot, você aprova naming + estrutura de variants ANTES de seguir.

**Decisão a travar no piloto:** convenção de nomes de variant (ex: `variant=buy, size=md` property names) — vale pro resto.

---

## Fase F2 — Component library: ROLLOUT

**Meta:** cobrir o resto dos primitivos + composites, no padrão aprovado na F1.

- [ ] **Átomos/badges:** DiscountBadge, PreOrderPill, Tag, BrindePill, Eyebrow, QtyStepper, CarouselNavButton
- [ ] **Forms:** FieldInput, FieldLabel (variants: default/required/invalid/focus)
- [ ] **Moléculas:** SectionHeader, Newsletter pill, TrustStrip icon, Coin chip, Countdown cells
- [ ] **Organismos:** Navbar, AnnouncementBar, CartDrawer, modais (Search/Auth/Address/Cookie)
- [ ] **Hover languages** documentadas: halo (card) vs stroke (banner) com exemplos

**Risco:** médio. **Verificar:** cada componente bate o screenshot do site real. Lote por lote.

---

## Fase F3 — Code Connect (handoff 1:1)

**Meta:** ligar cada componente Figma ao arquivo de código — dev abre no Figma e vê o componente/props reais.

- [ ] Map `add_code_connect_map` por componente → `src/app/components/section/*.tsx` (ou raiz). Label React.
- [ ] Snippet de uso (props → variant) pra os principais (CTAButton, ProductCard).

**Risco:** baixo. **Verificar:** Dev Mode mostra o source code certo no componente.

---

## Fase F4 — Publicar Library

**Meta:** o DS vira consumível por outros arquivos Figma.

- [ ] Publicar variáveis (global + theme) e componentes como Library, com descrição.
- [ ] Versionar (v1.0) + changelog de publicação.

**Risco:** baixo. **Verificar:** `search_design_system` retorna os componentes/variáveis; arquivo de produto consegue inserir.

---

## Fase F5 — Identity pages

**Meta:** completar os stubs Brand + Assets.

- [ ] **Brand:** logo lockups (header/footer/welcome), tagline, quirks (vermelho em camadas, neon-hover, HUD scan-frame), voz.
- [ ] **Assets:** PCYES Coin (SVG dourado), glitch word demo, countdown chip, eyebrow pattern.

**Risco:** baixo. **Verificar:** páginas saem do estado "só intro".

---

## Fase F6 — Light mode milestone (código + Figma)

**Meta:** fechar o modo light de verdade (hoje rascunho).

- [ ] Código: revisar os valores light dos semantic tokens (a versão atual estava errada); `[data-keep-dark]` em Navbar/AnnouncementBar; resolver os ternários invertidos.
- [ ] Figma: validar o flip light end-to-end nos componentes; ajustar valores light dos tokens se mudarem.
- [ ] QA de contraste WCAG nos dois modos.

**Risco:** alto (toca muita superfície). **Piloto:** uma página (ex: home) em light, revisar, então o resto.

---

## Fase F7 — Backlog de código (AUDIT-DS.md)

**Meta:** fechar a dívida técnica que sobrou da tokenização.

- [ ] Line-height no grid 4px (fecha a tipografia — ritmo vertical)
- [ ] Base **Modal/Drawer** primitivo (5 modais compartilham recipe)
- [ ] **ProductCardPremium** (extrair o Drop do Dia)
- [ ] `FieldInput` com slot de ícone (cobre AuthModal + busca)
- [ ] Sombras inline one-off (~80) — tokenizar as repetidas
- [ ] Botões `<button>` bespoke restantes — triagem CTA vs ícone/tab

**Risco:** médio. **Verificar:** typecheck ≤ baseline, build verde, sem regressão visual.

---

## Fase G — Governança

**Meta:** o DS se mantém consistente sem depender de memória.

- [ ] **Convenção de nomes** — token, variável, componente, variant. Doc curto.
- [ ] **Guia de contribuição** — como adicionar token/componente, o checklist de "bate código↔Figma".
- [ ] **Versionamento** — semver do DS + changelog (já há base em `design.md §16`).
- [ ] **Sync ritual** — quando código muda token, re-export `tokens.studio.json` + re-import; quando componente muda, atualizar Figma + Code Connect.

---

## Sequência recomendada (dependências)

```
F0 (styles) → F1 (piloto CTAButton+ProductCard) → [aprovação]
   → F2 (rollout componentes) → F3 (Code Connect) → F4 (publicar)
F5 (identity) pode rodar em paralelo após F0.
F6 (light) e F7 (backlog código) são milestones próprios, depois do core Figma.
G (governança) fecha, documentando o que foi estabelecido.
```

**Caminho crítico pro "DS operável":** F0 → F1 → F2 → F3 → F4. Esses 5 entregam designer-monta-tela + dev-consome-1:1 + consumível por outros arquivos.

## Mapa de risco

| Fase | Risco | Piloto? | Bloqueia "DS operável"? |
|---|---|---|---|
| F0 styles | Baixo | Não | Sim (fundação) |
| F1 piloto componentes | **Alto** | **Sim** | Sim (define padrão) |
| F2 rollout | Médio | Por lote | Sim |
| F3 Code Connect | Baixo | Não | Sim (handoff 1:1) |
| F4 publicar | Baixo | Não | Sim (consumível) |
| F5 identity | Baixo | Não | Não |
| F6 light mode | **Alto** | **Sim** | Não (milestone) |
| F7 backlog código | Médio | Por item | Não |
| G governança | Zero | Não | Não (mas mantém) |

---

## Próximo passo imediato
**F0 + F1.** Crio text/effect styles bound aos tokens, depois construo CTAButton + ProductCard como component sets no Figma (piloto). Screenshot, você aprova naming + estrutura, e a gente trava o padrão pro rollout.
