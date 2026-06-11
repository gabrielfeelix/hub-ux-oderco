# PLANO — Home Tonante v2 (redesign UI/UX completo)

> **Para o agente executor:** este documento é autossuficiente. Siga as fases em ordem.
> Cada seção tem spec de layout, interação, mobile, arquivos-alvo e critérios de aceite.
> Não invente seções fora deste plano; dúvidas de negócio → perguntar ao Gabriel.

---

## 1. Contexto

- Projeto: e-commerce Tonante (violões/guitarras, grupo Oderço, desde 1954). Vite + TS + React Router + Tailwind v4 token-driven (`src/styles/theme.css`). Light-only.
- Estrutura herdada do template PCYES v3; identidade própria Tonante já aplicada (creme `#F6F2E9`, ink `#1A1714`, âmbar oficial `#C87800`, Bodoni Moda display + Hanken Grotesk corpo).
- Manual de marca: `_ref/uploads/Tonante-Manual-de-Marca-A5-RGB-rev1.pdf`. Cores oficiais: preto + âmbar `#C87800` (Pantone 1385 C). Tipografia institucional: família Bodoni (alternativas permitidas em material publicitário). Slogan: "Rei dos Violões". Mantra: "Feita de Histórias". Heritage: 1954, dois irmãos.
- Home atual: `src/app/components/HomePage.tsx` — 15 seções, **11.016px** de altura desktop. Alvo pós-redesign: **~8.500px, 11 seções**.

### Diagnóstico que motivou este plano (resumo)

| Problema | Evidência |
|---|---|
| Bodoni (didone, traço-fio) usado em preço e nome de produto | `ProductCard.tsx` — preço 22px serif, nome 20px serif; separadores de milhar quase invisíveis em tela |
| 4 falhas de contraste WCAG | branco/âmbar `#C87800` = 3,42:1 · branco/`#E08C12` = 2,65 · âmbar-texto/creme = 3,06 · preço antigo `#A89C8B` = 2,65 |
| 3 seções de promoção nas 6 primeiras dobras | DropDoDia + FlashDeals + PromoPanel — dilui posicionamento heritage/premium |
| Categorias só na dobra 4 | compra de instrumento é considerada → navegação categoria-first |
| Popup 10% OFF aos 4s + cookie banner empilhados no mobile | `WelcomePopup.tsx` (sessionStorage `pcyes-welcome`, delay 4000ms) |
| Inconsistência "até 12x" (TrustStrip/SEO) vs máx. 10x calculado | `ProductCard.tsx:81` — `Math.min(10, ...)` |
| Sem prova social agregada, sem recently-viewed, sem barra de frete grátis no carrinho | `StatsSection.tsx` existe e está órfão; CartDrawer só tem "Calcular frete" |

---

## 2. Princípios de design (decidir tudo por eles)

1. **Loja primeiro, editorial como tempero.** Cada dobra responde "o que eu compro aqui?" antes de "que marca bonita".
2. **Bodoni é palco, Hanken é balcão.** Serif display APENAS em títulos de seção, hero, storytelling e numerais editoriais grandes (1954, 70). TODO dado transacional (nome de produto, preço, parcela, PIX, contadores) em Hanken Grotesk.
3. **Âmbar é assinatura, não tinta de parede.** `#C87800` em superfícies, CTAs e ícones; texto pequeno âmbar SEMPRE `--amber-deep #A05F00` (5,0:1 ✅). Nunca branco sobre `#E08C12`.
4. **Uma urgência por página.** Um único countdown. Desconto comunica valor ("Economize R$ X"), não gritaria.
5. **Tonante tem mãos.** Detalhes artesanais (cordas, roseta, carimbo) usados como sistema — não clipart: micro-momentos que nenhum template tem.
6. **Compra considerada decide por especificação, não por emoção.** Violão não é compra por impulso: quem decide quer dado técnico (tipo de tampo, corda nylon vs aço, tamanho/escala, fundo/lateral). O card e a PDP DEVEM expor 2–3 specs-chave antes do "comprar". Editorial seduz, spec converte — sem spec, a home fica bonita e não vende mais que a atual. Specs derivadas de `productsData.ts`/`productEnhancements.ts`; nunca inventadas.

---

## 3. Assinaturas visuais Tonante (a camada criativa — construir como componentes)

Quatro elementos proprietários, reutilizáveis. São eles que tiram a home do genérico:

### 3.1 `StringDivider` — divisor de cordas
- 6 linhas horizontais (espessuras 0.5→1.5px, como cordas reais: mizinha→bordão), cor `--edge` com a 3ª corda em `--amber-deep`.
- Interação: ao entrar no viewport, ondulação única (spring, amplitude 4px, 600ms, stagger 40ms por corda) — "alguém passou o dedo". Hover (desktop): corda sob o cursor vibra (oscilação amortecida ~500ms via SVG path + motion).
- Uso: separador entre blocos editoriais (antes de StoryBand, antes de Newsletter, footer). Máx. 3 por página.
- `prefers-reduced-motion`: estático.
- Novo arquivo: `src/app/components/section/StringDivider.tsx`.

### 3.2 `SeloTonante` — carimbo/selo circular
- Selo circular tipo carimbo de luthier: borda dupla, texto circular ("TONANTE · DESDE 1954 ·"), centro com glifo (coroa do logo ou numeral Bodoni). Variantes: `70 anos`, `Destaque` (semanal — ver §6.5), `Rei dos Violões`.
- SVG com `<textPath>`; rotação lenta contínua (60s linear) opcional na variante hero; estático nas demais.
- Uso: badge do deal principal, StoryBand, footer. Substitui o badge "PRÊMIO DO DIA" atual do DropDoDia.
- Novo arquivo: `src/app/components/section/SeloTonante.tsx`.

### 3.3 Roseta como ornamento de eyebrow
- Meio-arco de roseta (padrão geométrico da boca do violão) como ícone à esquerda dos eyebrows de seção, no lugar de ícones genéricos lucide. SVG único, 16px, `--amber-deep`.
- Implementar em `Eyebrow.tsx` como ícone default (prop `icon` continua sobrescrevendo).

### 3.4 Tone chips das Linhas
- Cada linha de violão (Coral, Vivace, Una, Onix, Círica, Lorenza — conferir nomes reais em `LinhasDeViolao.tsx`) ganha cor própria (terracota, mel, cru, grafite...) usada como chip/swatch nos cards da seção Linhas e nos filtros de categoria.
- Tokens: `--tone-coral`, `--tone-vivace`, etc. em `theme.css` (derivar da paleta warm, checar 3:1 sobre creme p/ uso como chip com borda).

---

## 4. FASE 0 — Fundações de sistema (fazer antes de qualquer seção)

### 4.0 Baseline de conversão (ANTES de mexer em qualquer pixel)
- Capturar estado atual como referência — sem baseline, o redesign prova só que ficou "bonito", não que vende mais.
- **Snapshot estrutural (fazer agora, com script):** medir e registrar em `BASELINE.md` na raiz do plano:
  - altura total da home desktop @1440 e mobile @390 (atual: 11.016px desktop);
  - **nº de produtos clicáveis acima de 2.000px de scroll** (proxy de "loja-first" — ver §10);
  - nº de countdowns na página; nº de seções de promoção nas 6 primeiras dobras;
  - nº de CTAs primários e quantos passam contraste ≥4,5:1.
- **Instrumentação de funil (mínimo viável):** garantir que existam eventos de `add_to_cart`, `view_item`, clique em CategoryChips/Showcase e scroll-depth. Se não houver analytics no projeto, registrar como dívida em `BASELINE.md` e **não** prometer meta de funil que não dá pra medir. Confirmar com Gabriel qual ferramenta (GA4 / Vercel Analytics / nenhuma).
- Aceite: `BASELINE.md` commitado antes do 1º commit de Fase 0. Metas §12 só incluem fator de funil se a instrumentação existir.

### 4.1 Tokens novos em `src/styles/theme.css`
```css
/* Tipografia transacional */
--text-price-lg: 22px;      /* preço card */
--text-price-xl: 30px;      /* preço quick-view/PDP */
--text-product-name: 15px;
--text-meta: 13px;          /* PIX, parcelas, rating */
--text-eyebrow: 11px;       /* mínimo absoluto p/ uppercase tracked */

/* Cores utilitárias corrigidas (contraste) */
--ink-meta: #6b5f51;        /* substitui --muted e --faint em texto pequeno: 6,2:1 */
--amber-text: var(--amber-deep);  /* alias semântico: âmbar PERMITIDO como texto */
```

### 4.2 Regras de correção global (varrer e aplicar)
1. **Preço** → Hanken 700, `var(--text-price-lg)`, classe `.num` (tabular nums, já existe em `theme.css:471`). Cor: `--ink-strong`; com desconto: `--amber-deep`.
2. **Nome de produto** → Hanken 600, 15px, `line-height: 1.35`, `letter-spacing: 0`, 2 linhas clamp.
3. **Preço antigo riscado** → `--ink-meta`, 13px (era `--faint` 2,65:1 ❌).
4. **Contagem de reviews** → `--ink-meta` (era `--muted` 4,30:1 marginal).
5. **Eyebrow de card** → 11px mínimo (era 9,5px), manter tracking 0.18em máx.
6. **CTA âmbar (Comprar, Assinar, etc.):** fundo `--gradient-buy` (termina `#A05F00`) com texto branco 700 — ratio efetivo ≥4,5 na média do gradiente; OU fundo `#C87800` sólido com texto `#1A1714` 700 (4,7:1). Escolher UM padrão e aplicar em todos os CTAs primários. **Proibido**: branco sobre `#E08C12`.
7. **"até 12x"**: padronizar parcelamento. Decisão: `installments = min(12, max(2, round(priceNum / 200)))` e TrustStrip mantém "até 12x". Aplicar em `ProductCard.tsx`, `DropDoDiaSection.tsx`, quick-view, PDP (`ProductPage.tsx`), CartDrawer.
8. **Focus visible**: todo elemento interativo com `focus-visible:ring-2 ring-[--ring] ring-offset-2` — auditar cards, setas de carrossel, dots, swatches.
9. **Touch targets** ≥44px no mobile (botões de ícone do card hoje 36px → 44px no mobile).
10. **Specs-chave no card (§2.6):** `ProductCard.tsx` ganha linha de 2–3 specs-chave abaixo do nome (Hanken 13px `--ink-meta`, ícone-ponto âmbar) — ex.: `Tampo Spruce · Nylon · 4/4`. Dados de `productsData.ts`/`productEnhancements.ts`; se o produto não tiver specs cadastradas, ocultar a linha (não inventar nem mostrar placeholder). Verificar quais campos existem antes de implementar; se não existirem, abrir item de dados em `BASELINE.md` e degradar para tipo+categoria.
11. **`ProductCard.tsx` é compartilhado (home + listagem + PDP relacionados).** Toda mudança aqui (preço, specs, parcelamento §4.2.7) reflete fora da home. Após editar, rodar smoke test do fluxo de compra (§11) antes de fechar a fase.

### 4.3 Critério de aceite da Fase 0
- Rodar o snippet de contraste (§10) — todos os pares de texto ≥4,5:1 (ou ≥3:1 se ≥18,66px bold).
- Zero ocorrência de `font-family-figtree` em preço/nome de produto (grep).
- Grep "12x" retorna valor consistente com a fórmula.

---

## 5. Nova arquitetura da home

Ordem nova de `HomePage.tsx` (seções detalhadas no §6):

| # | Seção | Status | Função na narrativa |
|---|---|---|---|
| 1 | AnnouncementBar | ajustar | utilidade (frete/12x) + heritage |
| 2 | Hero (banners do designer) | manter + chips | impacto + campanha |
| 3 | **CategoryChips** (novo, sob o hero) | novo | wayfinding instantâneo |
| 4 | TrustStrip | manter | redução de ansiedade |
| 5 | **OfertasDaSemana** (funde DropDoDia + FlashDeals) | refazer | comércio/urgência (countdown único) |
| 6 | CategoryShowcase "O que você toca hoje?" | upgrade | navegação profunda |
| 7 | Top da semana (ProductShelf ranked) | upgrade #1 | prova social de produto |
| 8 | LinhasDeViolao | upgrade tone chips | diferenciação/educação |
| 9 | MonteSeuKit + **presets** | upgrade | AOV + iniciantes |
| 10 | StoryBand 1954 + **SocialProofBar** | upgrade | marca/confiança |
| 11 | Recém-chegados (ProductShelf) | manter | frescor |
| 12 | RealMusicians (UGC) | upgrade leve | comunidade |
| 13 | **GuiaIniciante** (banner CTA) | novo | captura do maior segmento |
| 14 | Newsletter | upgrade | retenção |
| 15 | Footer | ajustes | confiança final |

**Removidos da home:** `PromoPanel` (vira banner-link compacto dentro de OfertasDaSemana → `/promocoes`), `ShopByStyle` (migra para a página de categoria violões), `Pillars` (eco do TrustStrip — deletar da home).
**Órfãos PCYES** (não usar; candidatos a deletar em fase de limpeza): `EssentialsSection`, `GpuShowcase`, `IntelligentDevices`, `WorldSection`, `InRealLifeSection`, `MegaSaleBanner`, `BannerDuo`, `BrandsStrip`, `DealsHighlight`, `CategorySpotlight`, `CategoryRail`, `CategoryGrid`, `ProductsByTags`, `CouponBanner`, `Marquee`, `FeaturesStrip`, `PreOrderBanner`.

**Métrica de arquitetura (altura é proxy fraco — produto comprável é o que importa):**
- Critério primário: **≥3 produtos clicáveis (card com preço + comprar) acima de 2.000px de scroll** desktop, e ≥1 acima de uma dobra mobile (≈1.700px @390). Página pode ter 8.800px e ainda enterrar produto — esse critério evita isso.
- Critério secundário: altura total ≤8.800px desktop @1440 (anti-bloat). Medir com script (§10).
- Comparar ambos contra `BASELINE.md` (§4.0): redesign tem que melhorar produto-acima-da-dobra, não só encurtar a página.

---

## 6. Spec seção por seção

### 6.1 AnnouncementBar
- Manter barra ink com texto creme. Mobile: mensagem trunca ("O REI DOS…") — trocar por **rotação de 3 mensagens** (fade a cada 5s): `Frete grátis acima de R$ 299` · `Até 12x sem juros` · `Feita de Histórias desde 1954`. Desktop pode manter frase única + utilitários.
- Aceite: nenhum truncamento em 320px; altura fixa `--announce-h` sem layout shift.

### 6.2 Hero
- **Não trocar a arte** (banners do designer, decisão recente — commit `451d82b8`). Upgrades:
  - Mobile: banner atual fica baixo (~150px útil). Usar crop/arte mobile do designer se existir em `public/`; senão `aspect-ratio` mínimo 4:3 com `object-position` focado na arte.
  - Dots de navegação: aumentar área de toque p/ 44px (visual pode continuar pequeno).
  - Preload da 1ª imagem (`<link rel="preload">` ou `fetchpriority="high"`); lazy nas demais.
- Aceite: LCP = imagem do hero; hero mobile ocupa ≥40% do viewport 390×844.

### 6.3 CategoryChips (NOVO) — wayfinding sob o hero
- Linha única de chips-pill horizontais logo abaixo do hero, scroll-x no mobile: `Violões · Guitarras · Contrabaixos · Cordas · Acessórios · Suportes · Ofertas`.
- Anatomia do chip: ícone de silhueta do instrumento (SVG fino 20px, stroke 1.5) + label Hanken 600 13px. Fundo `--surface-1`, borda `--edge`, hover: borda âmbar + sombra `--shadow-deal-hover`. Chip "Ofertas" com fundo `--gradient-buy` e texto branco.
- Links → rotas de categoria existentes (`routes.tsx`).
- Novo arquivo: `src/app/components/CategoryChips.tsx`.
- Aceite: visível na 1ª dobra desktop E mobile sem scroll; targets ≥44px.

### 6.4 TrustStrip
- Manter 4 selos. Trocar ícones genéricos por versão duotone fina coerente (lucide com stroke 1.5 + ponto âmbar). Garantir "até 12x" consistente (§4.2.7).

### 6.5 OfertasDaSemana (NOVO — funde DropDoDia + FlashDealsStrip)
- **UMA temporalidade só.** "Drop do dia" (24h) e "Ofertas da semana" (7 dias) no mesmo bloco confundem — o countdown não bate com o título. **Decisão: a seção é semanal.** O Deal Hero é o **"Destaque da semana"** e o countdown conta até o fim da semana (domingo 23:59). Aposentar o rótulo "Drop do dia" e a variante homônima do `SeloTonante` → renomear para variante **"Destaque"**. (Se Gabriel quiser manter cadência diária no futuro, vira seção própria com seu próprio countdown — mas aí quebra "uma urgência por página" §2.4; default é semanal.)
- **Layout desktop**: grid 12 col — esquerda (col 1–5) o **Deal Hero**: 1 produto destaque com `SeloTonante` variante "Destaque", imagem grande no well creme, preço Hanken 30px, chip "Economize R$ X", countdown único (chips de dígito tabulares, reaproveitar o do FlashDeals); direita (col 6–12) rail 2×2 ou carrossel com os demais deals (ProductCard padrão).
- Header: eyebrow roseta "OFERTAS DA SEMANA" + título Bodoni "O palco é seu" (ou copy aprovada) + link "Ver todas →" → `/promocoes` (substitui o PromoPanel inteiro).
- Countdown: ÚNICO da página, alinhado à cadência semanal. Dígitos Hanken `.num`; rótulo acessível (`aria-live="polite"` a cada minuto, não a cada segundo).
- Mobile: Deal Hero primeiro, rail vira scroll-x.
- Arquivos: novo `src/app/components/OfertasDaSemana.tsx`; deletar uso de `DropDoDiaSection` e `FlashDealsStrip` na home (manter arquivos até fase de limpeza).
- Aceite: 1 countdown na página inteira; seção ≤ 950px de altura desktop.

### 6.6 CategoryShowcase "O que você toca hoje?"
- Manter conceito dark-stage (funciona). Upgrades:
  - **Grid assimétrico editorial**: tile "Violões" 2×2 (produto-core, heritage), demais 1×1. Desktop: `grid-template-areas`; mobile: scroll-x atual.
  - Cada tile ganha: contagem de produtos + "a partir de R$ X" (Hanken 13px, dados derivados de `productsData.ts` — calcular no build do componente, não hardcode).
  - Hover: zoom 1.04 + rim âmbar (já existe `--shadow-category-active`) + seta circular.
- Aceite: tile violões visivelmente dominante; dados de preço reais do catálogo.

### 6.7 Top da semana — leaderboard
- Manter shelf ranked. Upgrade: **#1 vira card campeão** com 2× largura no desktop (primeiro slot do rail): imagem maior, medalhão `1` em selo âmbar, linha extra "O mais amado da semana" + 1 review curta real do produto (se houver em `productEnhancements.ts`; senão omitir review e manter selo).
- Medalhões 2–10: manter, mas numeral em **Bodoni 700** (uso display correto — numeral grande isolado) sobre disco ink.
- Aceite: hierarquia visível #1 > demais; rail flui no mobile.

### 6.8 LinhasDeViolao — momento joia
- Manter estrutura stage marrom + painel. Upgrades:
  - **Tone chips** (§3.4): swatch da cor da linha ao lado do nome; chips clicáveis trocam a linha ativa (já há tabs — estilizar com a cor da linha).
  - Nome da linha em Bodoni italic display GRANDE (clamp 56–88px) como specimen tipográfico — aqui o Bodoni brilha.
  - Descritores de timbre como pills: `madeira escura` · `som encorpado` · `roda de boteco` (copys já existem no componente — promover a pills).
  - CTA duplo: "Conhecer a Coral →" (primário) + "Ouvir o timbre" (secundário, **desabilitado/oculto até existirem áudios** — ver backlog §9).
- Aceite: troca de linha anima cor do stage suavemente (400ms); zero regressão mobile.

### 6.9 MonteSeuKit + presets
- Manter builder. Adicionar **3 presets clicáveis** acima do builder (cards pequenos): `Kit Iniciante` (violão + capa + afinador + palhetas), `Kit Palco` (guitarra + cabo + correia + pedal/suporte), `Kit Estúdio` (microfone + cabos + suporte). Clique = pré-popula o builder (IDs reais de `productsData.ts`).
- Barra de total: total + "Economize R$ X" sticky no painel; CTA "Adicionar kit" usa padrão de CTA da §4.2.6.
- Aceite: preset popula builder em 1 clique; economia calculada certa.

### 6.10 StoryBand 1954 + SocialProofBar
- StoryBand: manter dark. Adicionar `SeloTonante` "70 anos" e mini-timeline horizontal (1954 → renascimento 2021 → hoje; 3 pontos, linha com ornamento de corda).
- **SocialProofBar** (novo, logo acima ou abaixo do StoryBand): faixa creme com 3–4 números em Bodoni display + label Hanken: `70 anos de música` · `+N produtos no catálogo` (derivar de `productsData.ts`) · `4,8 ★ média das avaliações` (derivar a média real do catálogo) · `12x sem juros`. **Reaproveitar/adaptar o órfão `StatsSection.tsx`** se a estrutura servir; senão criar `SocialProofBar.tsx` e deletar StatsSection na limpeza.
- Regra: NENHUM número inventado — tudo derivado de dados reais do repo ou aprovado pelo Gabriel.
- Aceite: números batem com `productsData.ts` em runtime.

### 6.11 Recém-chegados
- Manter. Apenas herda correções de card da Fase 0.

### 6.12 RealMusicians (UGC)
- Manter masonry. Upgrades leves: moldura tipo foto impressa (borda creme 6px + sombra suave + leve rotação aleatória ±1,5° fixa por item — seed pelo index, não random em render); handle do músico em pill glass; CTA final "Apareça aqui — use **#FeitaDeHistorias**".
- Aceite: rotação estável entre renders (sem flicker).

### 6.13 GuiaIniciante (NOVO) — banner educacional
> **Esta é a aposta de conversão mais alta do plano** (iniciante = maior segmento de violão no BR). O destino do CTA não pode ficar em aberto — resolvido abaixo.
- Banner editorial 2 colunas antes da Newsletter: esquerda copy ("Primeiro violão? A gente te guia." + 3 bullets: tamanho certo, nylon vs aço, kit completo), direita imagem de violão + selo "Guia grátis".
- **Destino do CTA (decidido) — entrega em 2 tempos:**
  - **Fase 4 (agora):** CTA "Ver violões para começar" → **categoria violões com `?tag=iniciante`** (filtro já suportável via dados). Entrega valor de conversão imediato sem bloquear na criação de conteúdo. Garantir que existam produtos marcados `iniciante` em `productsData.ts`; se não, marcar 4–6 (confirmar seleção com Gabriel) — sem isso o link cai em página vazia.
  - **Backlog (§9.5):** página `/guia-do-primeiro-violao` editorial completa (tamanho/escala, nylon vs aço, kit completo, FAQ). Quando existir, o CTA aponta pra ela e o banner ganha 2 CTAs (guia + ver violões). Depende de conteúdo redigido.
- O banner é o mesmo nos dois tempos; só muda o destino — zero retrabalho de layout.
- Racional e-commerce: educação reduz devolução e ansiedade de 1ª compra; capturar o iniciante onde ele já está pronto pra comprar (categoria) vence mandar pra um artigo que adia a compra.
- Novo arquivo: `src/app/components/GuiaIniciante.tsx`.

### 6.14 Newsletter
- Manter layout serif display (bonito). Ajustes: CTA padrão §4.2.6; benefício explícito "10% OFF na primeira compra" (consistente com o popup — hoje popup promete 10% e a newsletter não); microcopy "Sem spam · Cancele quando quiser" mantém.
- `StringDivider` acima da seção.

### 6.15 Footer
- Subir selos/certificados para a primeira linha do footer (hoje enterrados); adicionar linha "Uma empresa do grupo Oderço — CNPJ ..." (já existe, manter); ícones de pagamento manter.
- Trocar ícone Twitter por X em TODO o site (`WelcomePopup.tsx`, `Footer.tsx` — grep `Twitter`).

### 6.16 WelcomePopup (regras novas)
- Trigger: scroll ≥40% OU 20s, o que vier primeiro; NUNCA com cookie consent aberto (esperar consent fechar + 5s).
- Mobile: só a partir da 2ª página vista na sessão.
- CTA "QUERO MEU DESCONTO": fundo âmbar padrão §4.2.6 (hoje é pill creme que parece desabilitada).
- Título: verificar hífen de "Cadastre-se" (em Bodoni o hífen fica invisível — se persistir, reescrever copy: "Ganhe 10% OFF na primeira compra").
- Aceite: em sessão nova mobile, nenhuma sobreposição popup+cookie; popup nunca antes de 20s.

### 6.17 CartDrawer — barra de frete grátis (CRO, fora da home mas obrigatória)
- Barra de progresso no topo do drawer: "Faltam **R$ X** para frete grátis" (meta R$ 299) com fill `--gradient-buy`; ao atingir: "🎉 Você ganhou frete grátis" (fill completo, check).
- Hanken `.num`; atualiza ao mudar quantidade.
- Aceite: cálculo correto com carrinho vazio/1 item/acima da meta.

---

## 7. Motion & micro-interações (sistema)

- Base: `useScrollReveal` + motion já existem — manter entrada fade/translate-y das seções.
- Stagger de cards em shelf: 40ms entre cards, só na primeira entrada.
- `StringDivider`: ondulação na entrada (§3.1).
- Hover de card: já tem translate-y + sombra — manter; adicionar transição de imagem 1.05 (existe).
- Countdown: flip sutil por dígito (ou apenas fade) — sem tique-taque visual agressivo.
- **Tudo atrás de `prefers-reduced-motion`** (media query global já existe em `theme.css` ✅ — não quebrar).
- Proibido: parallax pesado, autoplay de vídeo com som, cursor custom.

## 8. Acessibilidade — checklist obrigatório de cada fase

- [ ] Contraste: pares novos validados ≥4,5:1 (texto) / ≥3:1 (UI/texto grande) — snippet §10.
- [ ] Focus visible em TODO interativo (cards, chips, dots, setas, swatches).
- [ ] Touch targets ≥44×44 mobile.
- [ ] `aria-label` em botões de ícone; `aria-live` no countdown (minuto) e no total do kit.
- [ ] Imagens de produto: `alt` = nome do produto (já ok via `ImageWithFallback` — conferir).
- [ ] Navegação por teclado: carrosséis com setas focáveis; popup com focus-trap + `Esc`.
- [ ] Zero texto <11px; corpo ≥13px.

## 9. Backlog criativo (NÃO executar agora — depende de assets/decisão)

1. **Áudio de timbre por linha** (LinhasDeViolao): sample de 3–5s por linha, botão play discreto. Diferencial real de loja de instrumento. Depende: gravações.
2. **Afinador online** (mic) como ferramenta/lead magnet — página própria.
3. **TonanteCoin na home** (hoje só checkout/perfil) — faixa de cashback.
4. **Quiz "Qual violão é o seu?"** (reaproveitar mecânica do MonteSeuPc quiz oculto).
5. Página `/guia-do-primeiro-violao` completa (se §6.13 ficar no link de categoria).

## 10. Validação técnica (rodar ao fim de cada fase)

```bash
# Dev server
npm run dev  # porta 5173

# Contraste (node one-liner) — adaptar pares novos:
node -e "const L=h=>{const c=h.replace('#','');const[r,g,b]=[0,2,4].map(i=>parseInt(c.substr(i,2),16)/255).map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4));return .2126*r+.7152*g+.0722*b};const CR=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return((x+.05)/(y+.05)).toFixed(2)};console.log(CR('#1A1714','#C87800'))"

# Screenshots headless (neste ambiente o chromium do playwright precisa de libs extraídas):
# 1) libs: apt-get download libnss3 libnspr4 libasound2t64 && dpkg -x cada .deb em /tmp/chromelibs/root
# 2) LD_LIBRARY_PATH=/tmp/chromelibs/root/usr/lib/x86_64-linux-gnu node <script playwright-core>
#    (playwright-core disponível em ~/dev/gabriel/ct-boxe/node_modules/.pnpm/playwright-core@1.59.1/...)
# Capturar: desktop 1440×900 fold a fold + mobile 390×844; conferir altura total:
#    await page.evaluate(() => document.body.scrollHeight)  → alvo ≤ 8.800px (secundário)

# Produto-acima-da-dobra (métrica PRIMÁRIA de arquitetura §5) — contar cards comerciais
# (com preço + botão comprar) cujo topo está acima de 2.000px no desktop:
#    await page.evaluate(() => [...document.querySelectorAll('[data-product-card]')]
#      .filter(el => el.getBoundingClientRect().top + window.scrollY < 2000).length)  → alvo ≥3
#    (garantir data-product-card no ProductCard; mobile: limiar ≈1700px, alvo ≥1)
# Registrar os dois números em BASELINE.md antes/depois.
```

## 11. Ordem de execução e critérios de done

| Fase | Escopo | Done quando |
|---|---|---|
| **0** | §4.0 baseline + §4 fundações (tipo, contraste, 12x, focus, specs no card) | `BASELINE.md` commitado; aceites §4.3 ✅; smoke test compra ✅ |
| **1** | Assinaturas §3 (StringDivider, SeloTonante, roseta, tone tokens) | componentes isolados renderizando + reduced-motion ok |
| **2** | Arquitetura §5: reordenar HomePage, criar CategoryChips, OfertasDaSemana; remover PromoPanel/ShopByStyle/Pillars da home | produto-acima-da-dobra ≥3 (§5/§10); altura ≤8.800px; 1 countdown; categorias na dobra 2 |
| **3** | Upgrades de seção §6.6–6.12 (showcase assimétrico, leaderboard, linhas, kit presets, story+social proof, UGC) | aceites por seção ✅ |
| **4** | Novos §6.13–6.17 (GuiaIniciante, Newsletter, Footer, Popup, CartDrawer frete) | aceites por seção ✅; smoke test compra ✅ (toca CartDrawer) |
| **5** | Limpeza: deletar órfãos §5 + screenshots finais + checklist §8 completo + comparar BASELINE.md antes/depois | grep sem imports mortos; QA visual desktop+mobile; tabela antes/depois preenchida |

### 11.1 Smoke test de fluxo de compra (OBRIGATÓRIO toda fase que toca `ProductCard`/`CartDrawer`/`ProductPage`)
`ProductCard`, `CartDrawer` e o cálculo de parcelamento são compartilhados com listagem/PDP/checkout — redesign de home não pode quebrar a venda. Antes de fechar Fase 0 e Fase 4, rodar manualmente (ou via playwright §10):
1. Home → clicar card → PDP abre com preço e parcelamento corretos (§4.2.7).
2. PDP → adicionar ao carrinho → CartDrawer abre, item certo, barra de frete grátis calcula (§6.17).
3. Quick-view (se existir) → add to cart → mesma consistência de preço/parcela.
4. Carrinho vazio / 1 item / acima de R$ 299 → barra de frete em cada estado.
- Aceite: nenhum dos 4 passos quebra; preço/parcela idênticos em card, quick-view e PDP.

Commits: 1 commit por fase no mínimo, mensagem `feat(tonante/home): ...`. Não tocar em checkout/PDP além do listado (§4.2.7, §4.2.10–11 e §6.17).

## 12. Metas de nota (re-avaliar com os mesmos critérios da análise de 2026-06-11)

| Fator | Antes | Meta |
|---|---|---|
| Aplicação tipográfica e-commerce | 4,0 | 9 |
| Contraste/acessibilidade | 4,5 | 9 |
| Apresentação de preço | 4,0 | 9 |
| Arquitetura/dobras | 5,5 | 8,5 |
| Mobile UX | 5,0 | 8 |
| Prova social | 6,0 | 8,5 |
| Criatividade/assinatura | (6,5) | 9 |
| **Geral** | **6,1** | **≥8,5** |

> Acima são metas de **design** (subjetivas, re-avaliadas com os mesmos critérios). Não confundir com resultado de negócio.

### 12.1 Metas de funil (SÓ se instrumentação existir — §4.0)
Design bonito ≠ venda maior. Se houver analytics no projeto, fixar metas mensuráveis contra `BASELINE.md`; senão, registrar como dívida e não prometer número que não dá pra medir.

| Métrica | Baseline | Meta | Mede |
|---|---|---|---|
| Produtos clicáveis acima de 2.000px (desktop) | medir §4.0 | ≥3 | loja-first |
| Add-to-cart rate da home | medir (se houver GA4) | +X% | poder de conversão |
| CTR CategoryChips + CategoryShowcase | n/a (novos) | estabelecer baseline pós-launch | wayfinding |
| Scroll-depth mediano | medir | ≥ baseline com página mais curta | densidade vs bloat |
| Conclusão de checkout (não-regressão) | medir | ≥ baseline | smoke test §11.1 não basta — confirmar com dado |

- Sem ferramenta de analytics: este bloco fica como **backlog de medição**, e o sucesso da Fase é julgado só pelos critérios estruturais/visuais. Decisão de instrumentar = Gabriel.
