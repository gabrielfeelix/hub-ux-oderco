# PLANO V3 — "Luz e História" (Tonante website)

> **Para o agente executor:** documento autossuficiente. Sucede o `PLANO-HOME-V2.md` (já executado).
> Escopo: virada de fundo branco, seção Músicos Tonante, seção Encordoamentos, cards estilo
> Gibson, storytelling de história real (pesquisada e com fontes), experiência musical na PDP.
> Dúvidas de negócio → Gabriel. Nada de número/fato/artista inventado — só o dossiê §2.

---

## 0. Diagnóstico em uma frase

O site está **competente mas "arenoso"**: o creme `#F6F2E9` em tudo dá clima de papelaria
vintage, não de loja especialista. As referências aprovadas (Gibson, Izzo, SG Strings) são
**claras, brancas, com cor usada COM intenção** — cor aparece no produto, no card temático,
no momento editorial; nunca como tinta de parede. E a Tonante tem uma história real
extraordinária que o site atual reduz a um parágrafo. O V3 resolve essas duas coisas:
**luz** (base branca profissional) e **história** (a marca que foi o primeiro instrumento
de gerações).

---

## 1. Resumo do que muda

| # | Entrega | Substitui / altera | Ref |
|---|---|---|---|
| 1 | Base branca — remap completo de tokens | `theme.css` inteiro | Gibson (fundo branco, wells `#f5f3ef`) |
| 2 | **MusicosTonante** + modal vídeo/depoimento | `RealMusicians.tsx` (deletar da home) | Izzo "Nosso time Izzo players" |
| 3 | **EncordoamentosShowcase** — cards coloridos por família | seção nova na home | Cards SG Strings (calibres grandes, cor por tipo) |
| 4 | ProductCard v3 — peso visual, hover-swap, thumbs | `ProductCard.tsx` | Cards Gibson (imagem grande, well claro, New/Limited) |
| 5 | História: StoryBand v2 + timeline + footer manifesto + `/quem-somos` incrível | `StoryBand.tsx`, `Footer.tsx`, rota `/quem-somos` | Izzo footer (banda institucional antes da newsletter) |
| 6 | Experiência musical: PDP com "Ouça", bloco luthier/assinatura, specs sonoras | `ProductPage.tsx`, schema de dados | — |
| 7 | Camada awwwards: motion, som com consentimento, detalhes | transversal | — |

---

## 2. DOSSIÊ TONANTE (pesquisa real, com fontes — base de TODO o copy)

### 2.1 Fatos confirmados (usar livremente)

- **5 de abril de 1954** — registro da **"Ao Rei dos Violões Ltda."** (CNPJ 61.092.011/0001-33,
  ainda consultável). Fundada pelos **irmãos portugueses Abel e Samuel Tonante** — Tonante é
  **sobrenome de família**. Chegaram ao Brasil ~13 anos antes (~1941) e construíam instrumentos
  **à mão**.
- **Três endereços = timeline pronta:**
  1. 1954–~1962: Rua Gomes Freire, **Lapa, São Paulo** (oficina artesanal);
  2. ~1962–1974: Rua Cel. Bento Bicudo 1038, **Piqueri/Pirituba** (fábrica, entrada do Samuel);
  3. 1974–2007: **Itupeva-SP**, galpão na entrada da cidade.
- **Produção:** violões, guitarras, contrabaixos, cavaquinhos, banjos, bandolins.
  Assinatura técnica da era: **corpo de cedro, escala de ipê** (madeiras brasileiras),
  braço propositalmente grosso "que não empena". Captadores **Malagoli**.
- **Modelos clássicos:** **Finder** (a mais icônica — mistura Strato + Jazzmaster), Erton,
  Starlight, Semi-studio, GCFC/2.
- **Jovem Guarda:** consenso das fontes — era **a guitarra que a classe média podia pagar**
  quando importar era impossível. "O primeiro instrumento de muitas pessoas" (texto da
  própria marca). Anos 60–80 = era de ouro.
- **2007:** a fábrica de Itupeva fecha. Detalhe humano fortíssimo: **ex-funcionários usaram
  o dinheiro da rescisão para comprar as máquinas** e fundaram a Clave Sonora — a fábrica
  morreu, o ofício não.
- **2019/2021:** **Grupo Oderço** (Maringá-PR) compra a marca e relança em **agosto de 2021**.
  Campanha **"Feito de Histórias"**. Linha Muriel's numerada com código GTRM**1954**.
- **Culto vivo hoje:** ~143 anúncios no Mercado Livre, threads no Cifra Club e ContrabaixoBR,
  vídeos de restauração no YouTube, e **João Paulo Rodrigues e Silva** (Tonante Rock Clube),
  fã que mantém a memória da marca desde 2005 e foi homenageado pela Oderço em 2021.
- **A dualidade que é a alma da marca:** o Brasil **zoava e amava** a Tonante ao mesmo tempo.
  A lenda "uma Tonante afinada jamais desafina" convive com depoimentos reais como:
  *"O Tonante foi o meu primeiro violão, foi com ele que aprendi os primeiros acordes e
  graças a ele tenho orgulho de ser o violonista que sou hoje."* Isso é prova social
  emocional autêntica — humor + afeto, sem verniz corporativo.

Fontes: Wikipédia (en) "Tonante"; elissalles.com.br (História de Itupeva); Correio do Cidadão
(relançamento + matéria do João Paulo); Música & Mercado; Guitarload; blog Minha Guitarra de
Cedro; blog O Quase Famoso (2009); Econodata (CNPJ); tonantebrasil.com.br/sobre-nos.

### 2.2 PROIBIDO (não confirmado)

- **Nomes de artistas famosos** que começaram numa Tonante — NENHUM verificável. Usar o
  arquétipo verdadeiro ("o primeiro instrumento de gerações"), nunca endosso inventado.
- Origem do nome "Muriel's" (perguntar à Oderço).
- Números de produção do auge.

### 2.3 Hierarquia narrativa (do mais ao menos poderoso)

1. "O primeiro violão de gerações" — democratizou a música no Brasil.
2. Dois irmãos imigrantes, 1954, construindo à mão na Lapa.
3. Jovem Guarda — o rock nas garagens brasileiras quando importar era impossível.
4. Cedro e ipê — madeiras brasileiras, braço que não empena: honestidade construtiva.
5. Os funcionários que compraram as máquinas com a rescisão.
6. O fã-guardião (Tonante Rock Clube) e o culto vintage vivo.
7. O recomeço 2021 — "os instrumentos que marcaram gerações estão de volta".

---

## 3. FASE 1 — Base branca (a mudança estrutural; fazer primeiro)

### 3.1 Conceito

Não é só trocar `#F6F2E9` por `#FFF`. É inverter a lógica: **a página é branca e neutra;
o calor da Tonante (âmbar, madeira, creme) vira ACENTO** — aparece no produto, nos momentos
editoriais (stages escuros, seção de linhas, história) e nos detalhes. Como na Gibson: página
branca, produto no well levemente quente, cor só onde tem significado.

### 3.2 Remap de tokens (`src/styles/theme.css`)

| Token | Hoje | Novo | Racional |
|---|---|---|---|
| `--background` / `--surface-0` | `#f6f2e9` creme | **`#ffffff`** | página branca |
| `--surface-1` (cards) | `#fffdf8` | **`#ffffff`** + borda (cards deixam de "boiar" por cor, passam a se definir por borda/sombra) |
| `--surface-2` (inputs/elevado) | `#efe9dc` sand | **`#f6f5f2`** (cinza-quente neutro 2%) | sai o tom areia |
| `--surface-3` (hover) | `#e4dccc` tan | **`#eeede9`** | idem |
| **NOVO** `--well` (fundo de foto de produto) | `#fbfaf6` | **`#f5f4f0`** | o "creme Gibson" — quente mas neutro; é o ÚNICO lugar onde o warm sobrevive como superfície clara |
| `--border` | `#e4dccc` | **`#e7e5e0`** | hairline neutro |
| `--edge*` | rgba ink | manter (já neutros) | — |
| `--foreground` / inks | warm black `#1a1714` | **manter** | o warm black sobre branco fica ótimo e preserva identidade |
| `--amber*` | `#c87800` etc | **manter** | assinatura intocada |
| `--stage` / `--stage-2` | `#16130f` | **manter** | dark stages viram contraste AINDA mais dramático sobre branco |
| tone-chips das linhas | — | manter | — |

Regras derivadas:
1. **Sombra > tonalidade.** Sobre branco, cards precisam de borda 1px `--border` + sombra
   `--shadow-card` levemente reforçada (subir alpha do segundo termo de 0.22 → 0.26).
   Validar visualmente — branco sobre branco sem definição é o risco nº 1 desta fase.
2. **Wells de foto SEMPRE `--well`** (ProductCard, quick-view, PDP gallery, OfertasDaSemana
   deal hero) — cria o ritmo Gibson: página branca / janela quente / produto.
3. **`mixBlendMode: multiply` das fotos: manter** (continua funcionando sobre `--well`).
4. Seções que hoje usam `--surface-2` como faixa (MonteSeuKit etc): trocar por branco com
   `border-top/bottom` `--border`, OU promover a dark-stage se a narrativa pedir. Decidir
   seção a seção (auditoria §3.3).
5. **Auditoria de contraste obrigatória:** pares que passavam sobre creme podem mudar sobre
   branco (na prática branco AUMENTA contraste com ink, mas chips/pills âmbar claros e
   `--ink-subtle` precisam revalidação). Rodar snippet do PLANO-V2 §10 em todos os pares.
6. **Grain/textura:** manter APENAS nos dark stages. Grain sobre branco = sujeira.

### 3.3 Varredura de componentes (checklist da fase)

Grep por `#f6f2e9|#efe9dc|#e4dccc|#fffdf8|#fbfaf6|surface-2|surface-3` e auditar um a um:
Navbar (fundo branco + hairline no scroll), HeroSection, CategoryChips, TrustStrip,
OfertasDaSemana, CategoryShowcase, ProductShelf, ProductCard (+quick-view), LinhasDeViolao,
MonteSeuKit, StoryBand, GuiaIniciante, Newsletter, Footer (checkout variant), CartDrawer,
SearchModal, WelcomePopup, AuthModal, páginas internas (`/produtos`, PDP, checkout, perfil).

**Aceite Fase 1:** zero ocorrência dos hexas creme/sand fora de `--well`; screenshot
desktop+mobile da home inteira sem "mar de areia"; todos os pares de contraste ≥4,5:1;
dark stages mantidos; nenhuma seção "fantasma" branco-sobre-branco sem borda.

---

## 4. FASE 2 — MusicosTonante (substitui RealMusicians)

### 4.1 Conceito

Ref Izzo players: retratos **preto & branco** de músicos reais, grandes (3:4 vertical),
nome + instrumento embaixo. P&B é decisão-chave: unifica fotos de qualidades diferentes,
dá peso documental/editorial e elimina ruído de cor — exatamente a virada "arenoso →
especialista". Clique abre **modal-palco** com vídeo vertical + depoimento.

### 4.2 Seção na home

- Posição: mesma da atual RealMusicians (após SocialProofBar, antes do GuiaIniciante).
- Header: eyebrow roseta "MÚSICOS TONANTE" + título Bodoni "Quem toca, conta" (ou copy
  aprovada) + sub "Histórias reais de quem faz música com a gente".
- Layout: carrossel horizontal (reusar `CarouselNavButton`/`CarouselDots`), 4 cards visíveis
  @1440 (como a Izzo), scroll-x livre no mobile (peek de meio card).
- Card: foto P&B 3:4 (`filter: grayscale(1)`), `border-radius` 10px; embaixo (FORA da foto,
  como na Izzo): **nome** Hanken 600 18px ink + **instrumento/linha** 13px `--ink-meta`
  (ex.: "Violão Coral"). Hover: grayscale(1) → grayscale(0) em 400ms + scale 1.02 — a cor
  "acende" sob o cursor (micro-momento awwwards barato e memorável).
- Acessibilidade: card é `<button>` com `aria-haspopup="dialog"`; foco visível.

### 4.3 Modal "palco"

- Portal full-screen, fundo `rgba(22,19,15,0.92)` + blur 8px (dark stage — o modal é o
  momento escuro sobre a página branca). Fechar: X 44px, `Esc`, clique no backdrop;
  focus-trap (padrão dos modais existentes).
- Grid desktop 2 colunas:
  - **Esquerda:** vídeo **vertical 9:16** (formato celular, como pedido), `max-height: 80vh`,
    rounded 16px, `<video>` com `poster` (a própria foto), controles nativos, `preload="none"`,
    **nunca autoplay com som** — play explícito do usuário.
  - **Direita:** eyebrow âmbar "MÚSICO TONANTE" · nome em Bodoni 40px · cidade/projeto 14px
    meta · **depoimento** em Bodoni itálico 22px com aspas decorativas âmbar ·
    bloco "Toca com:" → **mini-card do produto real** (foto no well + nome + preço + link
    pra PDP — modal vende, não só emociona) · link instagram do músico (pill glass).
- Mobile: coluna única — vídeo no topo (altura 60vh), conteúdo abaixo, scroll interno.
- Navegação entre músicos dentro do modal: setas prev/next no rodapé do painel direito.

### 4.4 Dados

Novo `src/app/components/musiciansData.ts`:
```ts
interface Musician {
  id: string;
  name: string;
  city?: string;
  role: string;            // "Violonista", "Professora de violão"...
  photo: string;           // retrato 3:4 (tratado P&B via CSS)
  video?: string;          // mp4 vertical 9:16 (opcional — sem vídeo, modal mostra foto grande)
  quote: string;           // depoimento
  instagram?: string;
  productId?: number;      // instrumento que usa → lookup em productsData
  instrumentLabel: string; // fallback de texto ("Violão Coral")
}
```
- **Protótipo:** 6–8 músicos placeholder (fotos Unsplash retrato + vídeos placeholder ou
  `video` omitido). Estrutura pronta para conteúdo real da Oderço.
- `video` ausente → modal degrada para foto P&B grande no lugar do player (sem botão play
  fake).

**Aceite Fase 2:** carrossel 4-up com P&B→cor no hover; modal com focus-trap/Esc/setas;
mini-card de produto clicável leva à PDP; mobile fluido; `prefers-reduced-motion` sem
transições de grayscale.

---

## 5. FASE 3 — EncordoamentosShowcase (ref SG Strings)

### 5.1 Conceito

A ref SG acerta porque transforma a compra mais confusa do iniciante (que corda eu compro?)
em **cards-pôster**: calibre GIGANTE no topo, frase de uso ("níquel para guitarra"), cor de
fundo por família. É educação + venda no mesmo componente. Versão Tonante: mesma força, sem
copiar o metal-diamond da SG — nossa textura é **silhueta de cordas verticais** (6 linhas
com espessuras crescentes, eco do `StringDivider` que já é assinatura da casa).

### 5.2 Seção na home

- Posição: após LinhasDeViolao (educação → educação) ou antes dela — decidir vendo o ritmo
  claro/escuro da página; default: **depois** de LinhasDeViolao.
- Header: eyebrow "CORDAS & ENCORDOAMENTOS" + título Bodoni "Qual corda é a sua?" + link
  "Ver todas →" `/produtos?category=Cordas%20%26%20Encordoamentos`.
- Carrossel de **cards-pôster verticais** (~300×420px desktop), 4 visíveis, scroll-x mobile:

| Família | Cor base do card | Calibre destaque | Frase de uso |
|---|---|---|---|
| Nylon p/ violão | âmbar suave → mel | Tensão média | "Nylon para violão clássico — macia pros dedos" |
| Aço bronze p/ violão | laranja queimado | .011 / .052 | "Aço bronze — brilho pra roda e palco" |
| Phosphor bronze | cobre/terracota | .010 / .047 | "Phosphor bronze — calor e durabilidade" |
| Níquel p/ guitarra | grafite/ônix | .009 / .042 | "Níquel para guitarra — ataque e timbre" |
| Níquel p/ baixo | marrom profundo | .045 / .105 | "Pra segurar o groove do baixolão ao baixo" |

  (Cores derivam dos `--tone-*` existentes — a paleta warm vira sistema de famílias de corda;
  nada de azul/verde da SG, que é paleta deles. Conferir produtos reais da categoria em
  `productsData.ts` e ajustar famílias ao que existe no catálogo.)
- Anatomia do card: fundo gradiente da família + textura cordas verticais (SVG, opacity 8%) ·
  **calibre em Hanken 800 ~40px** branco no topo (o "009/012/010" da ref) · frase de uso
  em itálico · imagem do produto real (embalagem) centrada com sombra · pills de info
  ("6 cordas", "tensão média", "p/ iniciante") · CTA pill outline branco "comprar →" que
  leva à PDP do produto real (ou categoria filtrada).
- Texto sobre os gradientes: validar contraste ≥4,5:1 (escurecer base da família se preciso).
- Micro-extra (backlog se apertar): hover no card → vibração sutil da textura de cordas.

### 5.3 Mini-guia integrado

Linha de apoio sob o carrossel (3 colunas, 13px meta): "**Calibre** = espessura: quanto
maior, mais volume e tensão" · "**Nylon vs aço**: nylon é macio (clássico), aço é brilhante
(folk)" · "Na dúvida? **Guia do iniciante →**" (link pro GuiaIniciante/categoria). Educação
curta no ponto de decisão, sem mandar o usuário embora.

**Aceite Fase 3:** 4–5 cards com produtos REAIS do catálogo; calibres/infos batem com os
produtos linkados (não inventar specs); contraste validado; scroll-x mobile com peek.

---

## 6. FASE 4 — ProductCard v3 (peso Gibson)

### 6.1 O que a ref Gibson tem que o card atual não tem

1. **Imagem dominante** — o produto É o card (well claro grande, produto preenchendo);
2. **Proporção vertical** da área de foto (≈4:5, não quadrada) — instrumento é vertical;
3. **Thumbs de variação de cor** como miniaturas reais do produto (não bolinhas);
4. **Badges tipográficos** ("New | Limited" em texto pequeno colorido, não pills gritadas);
5. Hierarquia: badge → nome bold → marca → acabamento → preço, tudo enxuto;
6. Hover: zoom suave + segunda foto (swap).

### 6.2 Spec

- **Área de foto:** `aspect-ratio: 4/5`, fundo `--well`, produto com `mixBlendMode: multiply`,
  padding 6%. Hover desktop: se `images[1]` existe → **crossfade pra 2ª foto** (300ms);
  senão zoom 1.06. Manter chevrons de galeria no hover (já existem).
- **Thumbs de variantes:** substituir as bolinhas-swatch por **miniaturas 44×44** da foto
  do produto variante (well + multiply), borda 1.5px ink na ativa — exatamente o padrão
  Gibson. Máx 3 + "+N". Reusar a lógica de variantes existente (swatches → thumbs).
- **Badges:** linha de texto 12px acima do nome: `Novidade` em `--amber-deep` · separador
  `|` · `Oferta` quando houver (cores: novidade âmbar, oferta `#b3361f` já usado no
  favorito). Remover pill flutuante sobre a foto.
- **Info:** nome Hanken 600 15px (2 linhas) → marca 13px `--ink-meta` → acabamento/spec
  1 linha 13px (já existe via `getCardSpecs`) → rating compacto → bloco de preço atual
  (manter PIX/parcelas — isso a Gibson não tem e nós PRECISAMOS, é e-commerce BR).
- **Card:** fundo branco, borda `--border`, hover: lift -4px + sombra reforçada (§3.2.1).
- Quick-view e PDP herdam `--well` no fundo de foto.
- **Compartilhado com listagem/PDP relacionados** → rodar smoke test de compra do
  PLANO-V2 §11.1 ao fechar a fase.

**Aceite Fase 4:** card 4:5 com well claro; hover-swap onde há 2ª imagem; thumbs de
variante em miniatura real; zero pill sobre foto; smoke test compra ✅.

---

## 7. FASE 5 — História (o coração do V3)

### 7.1 StoryBand v2 → "Setenta anos em uma dobra"

Manter dark stage, mas sair do parágrafo genérico para **timeline cinematográfica**:

- Headline Bodoni: **"O primeiro violão de gerações"** (arquétipo central §2.3).
- **Timeline horizontal de 5 atos** (scroll-x no mobile, linha com ornamento de corda):
  1. **1954** — "Dois irmãos portugueses abrem a Ao Rei dos Violões na Lapa, São Paulo.
     Violões feitos à mão."
  2. **Anos 60** — "A Jovem Guarda explode. A Tonante é a guitarra que cabe no bolso da
     classe média — o rock entra nas garagens do Brasil."
  3. **1974** — "A fábrica cresce e muda para Itupeva. Cedro e ipê, madeiras brasileiras."
  4. **2007** — "A fábrica para. A memória, não — colecionadores e fãs mantêm a marca viva."
  5. **2021** — "A Tonante volta. Feita de Histórias, desde 1954."
- Cada ato: ano em Bodoni display 40px âmbar + 2 linhas Hanken 14px creme.
- CTA: "Conheça a história completa →" `/quem-somos`.
- `SeloTonante` variante "70 anos" mantido.

### 7.2 Página `/quem-somos` — a peça awwwards

Hoje xoxa; vira **long-form editorial scroll-telling** (é a página onde o orçamento de
drama é permitido — não compete com conversão):

1. **Abertura:** full dark, "1954" em Bodoni gigante (clamp 120–220px) com grain, sub:
   "Dois irmãos. Um plano: música para todos." Scroll-fade.
2. **Capítulo Lapa:** os irmãos Abel e Samuel, imigrantes, construção à mão. Foto de época
   (placeholder sépia até a Oderço fornecer acervo).
3. **Capítulo Jovem Guarda:** fundo vira âmbar profundo; texto sobre a guitarra acessível;
   menção honesta à **Finder** como ícone da era. Pull-quote grande.
4. **Capítulo do afeto (o mais corajoso):** assumir a dualidade com elegância —
   "O Brasil inteiro tinha uma piada sobre a Tonante. E uma saudade também." + depoimento
   real anonimizado do tipo "foi com ele que aprendi os primeiros acordes" (§2.1). Marca
   que ri de si tem confiança — diferencial enorme vs institucional engessado.
5. **Capítulo 2007–2021:** a fábrica para; fãs e colecionadores mantêm viva (Tonante Rock
   Clube); a Oderço traz de volta. "Os instrumentos que marcaram gerações estão de volta."
6. **Fecho comercial suave:** "Continue a história" → grid de 3 linhas de violão atuais +
   CTA catálogo.
- Motion: cada capítulo com reveal (fade/translate), números com count-up discreto,
  `prefers-reduced-motion` estático. Sem parallax pesado.

### 7.3 Footer manifesto (ref Izzo)

A Izzo coloca banda institucional ANTES da newsletter/footer — reforço de marca no fim do
funil. Fazer o equivalente:

- **Bloco manifesto** no topo do footer dark (antes das colunas de links): símbolo Tonante
  centrado + 3 linhas em Bodoni creme:
  *"Desde 1954, a Tonante é o primeiro acorde de milhões de brasileiros.
  Feita de Histórias. Feita pra tocar."*
  + link discreto "Nossa história →".
- Mantém colunas/pagamentos/certificados existentes abaixo. Custo baixo, efeito Izzo.

**Aceite Fase 5:** timeline com os 5 atos e fatos do §2 (zero fato inventado);
`/quem-somos` com 6 capítulos navegáveis e motion com reduced-motion ok; manifesto no footer.

---

## 8. FASE 6 — Experiência musical (PDP e transversal)

É loja de instrumento: o produto tem SOM e tem AUTORIA. Hoje a PDP não entrega nenhum dos dois.

### 8.1 "Ouça este instrumento" (PDP)

- Bloco abaixo da galeria: player minimalista — botão play circular âmbar + waveform
  estática (SVG decorativo) + "Ouça o timbre · 0:12".
- **Fonte do áudio, em 2 tempos (honestidade primeiro):**
  - **Agora (protótipo):** reusar o sintetizador **Karplus-Strong** já existente em
    `LinhasDeViolao.tsx:27-95` — extrair para `src/app/lib/strum.ts` e mapear preset por
    linha/categoria (nylon = cutoff baixo, aço = brilhante, baixo = graves). Rotular
    **"timbre simulado"** em 11px meta — não fingir gravação real.
  - **Conteúdo real (backlog Oderço):** campo `audioSample?: string` no schema; quando
    existir mp3 gravado, player troca pro arquivo e o rótulo vira "Gravado com este modelo".
- Regras: nunca autoplay; um som por vez (parar o anterior); ícone de estado claro;
  `aria-label` "Ouvir demonstração de [produto]".
- Aplicar TAMBÉM no quick-view do card (botão pequeno ao lado do título) — barato, reusa lib.

### 8.2 "Quem assina este instrumento" (luthier/autoria)

- Schema: `luthier?: { name: string; title: string; photo?: string; bio?: string }` em
  `productsData.ts` (ou `productEnhancements.ts`).
- PDP: bloco-cartão após a descrição — foto redonda P&B 64px + "Assinado por **[nome]**,
  luthier" + 2 linhas de bio + (futuro) link pra página do luthier.
- Card/listagem: produtos com luthier ganham micro-badge "Assinado" (texto 12px âmbar com
  glifo de assinatura) — raridade comunica valor.
- **Sem dados reais hoje:** estrutura pronta + 1–2 produtos exemplo com placeholder
  CLARAMENTE marcado pra Gabriel validar (não publicar nome fictício como real).

### 8.3 Specs sonoras com hierarquia

- PDP: promover specs musicais decisivas (tampo, fundo/lateral, cordas, escala, tamanho)
  a **grid de 4–6 "spec tiles"** acima da tabela completa (ícone fino + label + valor) —
  compra considerada decide por spec (princípio V2 §2.6). Tabela completa permanece abaixo.

### 8.4 Transversal

- LinhasDeViolao: o botão "Ouvir" já existe — padronizar com o player novo (mesma lib).
- **Som global SEMPRE opt-in.** Nada de áudio em scroll/hover. Awwwards penaliza som
  não-solicitado tanto quanto usuário de e-commerce.

**Aceite Fase 6:** player funciona em PDP + quick-view com rótulo honesto; um áudio por
vez; bloco luthier renderiza quando o campo existe e some quando não; spec tiles na PDP.

---

## 9. Camada awwwards (transversal, aplicar durante as fases)

O que júri de awwwards busca em e-commerce — e o que fazemos sem sacrificar conversão:

1. **Direção de arte coerente** — é a Fase 1 + P&B dos músicos + wells quentes. A página
   branca com momentos escuros ritmados (hero → branco → stage LinhasDeViolao → branco →
   stage Story → branco → footer dark) é a assinatura. **Auditar o ritmo claro/escuro da
   home no fim da Fase 3** — não pode haver dois stages escuros consecutivos.
2. **Tipografia como protagonista** — Bodoni display nos números (1954, calibres, 70) já é
   nossa arma; V3 a usa nos calibres de corda e na abertura do /quem-somos.
3. **Micro-interações com significado** — grayscale→cor (músicos), hover-swap (cards),
   StringDivider vibrando, count-up da timeline. Nada de cursor custom/preloader longo.
4. **Som como diferencial honesto** — loja de instrumento com play de timbre é memorável
   E justificado (raríssimo em e-commerce BR).
5. **Storytelling com profundidade real** — /quem-somos long-form com fatos verdadeiros.
   Júri (e cliente) sente a diferença entre lorem-heritage e história de verdade.
6. **Craft técnico** — LCP do hero preservado, imagens lazy, reduced-motion em tudo,
   focus visible, contraste auditado. Awwwards tem nota de acessibilidade; nós já temos
   o pipeline do V2.
7. **O que NÃO fazer:** parallax pesado, scroll-jacking, autoplay com som, preloader,
   WebGL gratuito — tudo isso derruba conversão e o site é, antes de tudo, loja.

---

## 10. Dados novos (resumo de schema)

| Arquivo | Mudança |
|---|---|
| `musiciansData.ts` (novo) | interface Musician §4.4 + 6–8 entradas placeholder |
| `productsData.ts` / `productEnhancements.ts` | `audioSample?: string` · `luthier?: {...}` · conferir `images[1]` para hover-swap (produtos com 1 foto degradam pra zoom) |
| `src/app/lib/strum.ts` (novo) | Karplus-Strong extraído de LinhasDeViolao + presets por categoria |
| `theme.css` | remap §3.2 + `--well` |

---

## 11. Ordem de execução

| Fase | Escopo | Risco | Done quando |
|---|---|---|---|
| **1** | Base branca (§3) | ALTO (toca tudo) | aceite §3.3; screenshots antes/depois; contraste ✅ |
| **2** | MusicosTonante + modal (§4) | médio | aceite §4; RealMusicians removido da home |
| **3** | EncordoamentosShowcase (§5) | baixo | aceite §5; ritmo claro/escuro auditado (§9.1) |
| **4** | ProductCard v3 (§6) | médio (compartilhado) | aceite §6 + smoke test compra |
| **5** | História: StoryBand v2 + /quem-somos + footer (§7) | baixo | aceite §7 |
| **6** | Experiência musical (§8) | médio | aceite §8 |

- 1 commit por fase mínimo: `feat(tonante/v3): ...`.
- Fase 1 PRIMEIRO e isolada — é a fundação; todas as outras assumem fundo branco.
- Screenshots desktop 1440 + mobile 390 ao fim de cada fase (pipeline headless do V2 §10).

## 12. Pendências para o Gabriel / Oderço (não bloqueiam protótipo)

1. **Assets músicos:** fotos retrato 3:4 + vídeos verticais + depoimentos reais (protótipo
   usa placeholder).
2. **Áudio real por produto/linha** (protótipo usa timbre simulado rotulado).
3. **Luthiers reais:** nomes/fotos/bios de quem assina os instrumentos artesanais.
4. **Acervo histórico:** fotos de época (Lapa, fábrica, anúncios antigos, Finder) para o
   /quem-somos — transformaria a página de ótima em espetacular.
5. Confirmar com a Oderço: origem do nome "Muriel's"; se há artistas com endosso REAL
   autorizado; tom do capítulo "afeto/zoeira" (§7.2.4 — recomendo manter, é a alma da marca).
