# Guia do Agente — Odex Plataforma v3 (espelho Figma ↔ código)

Leia isto **antes** de mexer no Figma ou no código deste projeto. Vale para todo agente.

## 0. O que é este projeto

Plataforma Solar Odex. O código de verdade vive em **`index.html`** (single-file: telas renderizadas por funções `renderXxx()` em JS) + **`features/<feature>/*.css`** + Design System em **`ds/`** (tokens, atoms, molecules, `catalog.html`, `README.md`).

Estamos na **Fase D — espelho Figma**: cada tela do código tem que existir 1:1 como design no Figma, usando os **componentes/variáveis/estilos publicados** da biblioteca `DS [ODEX]`. Figma e código são a **mesma fonte de verdade** — divergência = bug.

- **Figma file:** `ai2nQ9xREiDfkLFaDdiKtx` (Plataforma Solar V2)
- **Biblioteca publicada:** `DS [ODEX]` (key `lk-2afeaea82bb7621e89a37916bd081f0ea1875c864ab7145faf609ce5d6d1a372b7f084be8a292968eb6cf1da57d94175bb1340d0f7e5b2bf420472c470fb08fd`)
- Páginas/node ids já mapeados ficam na memória do projeto (`memory/odex-figma-espelho.md`).

---

## 1. SEMPRE olhe o código antes (regra de ouro)

**Espelhe o CÓDIGO, nunca o README nem a sua memória.** O README descreve intenção; o código é o que renderiza. Eles divergem.

Antes de montar qualquer tela:
1. Ache a função de render no `index.html`: `grep -n "renderLogin\|view-produto\|renderProduct" index.html`.
2. Leia o bloco inteiro (markup + dados). Copie **layout, ordem, labels, textos, ícones, estados** 1:1.
3. Leia o CSS da feature (`features/<x>/<x>.css`) para pegar **tamanhos de fonte, pesos, cores (var(--...)), radius, gaps, paddings**.
4. Pegue os **dados reais** do array no código (catálogo, specs, preços) — não invente.
5. Se a tela tem variantes/passos (login/cadastro/redefinir, abas, steps), liste todas.

Se algo não existe como componente no DS, **crie usando os atoms/tokens do DS** — não invente valores soltos.

---

## 2. Regras de fidelidade (o "isso isso e aquilo")

Ao construir no Figma, **bind tudo ao sistema** — nada hardcoded:

| Propriedade | Regra | Como |
|---|---|---|
| **Cor** (fill/stroke) | variável do DS, nunca hex solto | `figma.variables.setBoundVariableForPaint(paint,'color', v)` |
| **Texto** | text style do DS, nunca fonte/size solto | `node.setTextStyleIdAsync(styleId)` |
| **Sombra** | effect style do DS (`shadow/card`, `shadow/lg`, `shadow/cta-blue`…) | `node.setEffectStyleIdAsync(id)` |
| **Radius** | variável `radius/*` (`card`, `form`, `pill`, `tag`) | `node.setBoundVariable('topLeftRadius', v)` ×4 cantos |
| **Ícone** | componente `icon/*` do DS; se a Fase F ainda não cobre, SVG lucide via `figma.createNodeFromSvg()` | **NUNCA emoji** |
| **Componentes** | reusar instâncias publicadas (Button, Input, Select, Pill, Stepper, Checkbox, Product Card, Tabs, Sidebar, Topbar…) | `importComponentSetByKeyAsync(...).defaultVariant.createInstance()` ou clonar instância existente |

**Mapeamento de tokens do CSS → variável Figma** (resolva por nome):
`--navy`→`color/brand/navy` · `--blue`→`color/brand/blue` · `--muted`→`text/muted` · `--ink`→`text/strong` · `--line`→`border/default` · `--soft`→`surface/sunken` · `--white`→`surface/card` · `--bg`→`surface/page` · `--green-softer`→`color/feedback/green-softer` etc. Coleções: `semantic` + `primitives`.

**Multi-estado = 1 frame por estado.** Tabs, toggles, steps, hover/active: clone o frame e ajuste o estado — não empilhe tudo num frame só. Use o componente DS do estado (ex: instância `Tabs` com o tab ativo correto), não frame manual ad-hoc.

---

## 3. Como descobrir os assets do DS (keys)

Antes de instanciar/bindar você precisa das keys. `use_figma` **não retorna dados** (ver §4), então:

- **Variáveis:** enumere dentro do próprio script —
  `figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` → `getVariablesInLibraryCollectionAsync(key)` → mapeie `nome→key` → `importVariableByKeyAsync(key)`.
- **Text/effect styles e componentes:** `search_design_system({query, fileKey, includeLibraryKeys:[DS key]})` devolve `name`+`key`. Importe com `importStyleByKeyAsync` / `importComponentByKeyAsync` / `importComponentSetByKeyAsync`.
- Para escolher o text style certo: importe os candidatos, leia `style.fontSize`/`style.fontName.style` e pegue o **mais próximo** do tamanho/peso do CSS (a escala tem buracos: 22, 30 não são tokens).
- Para saber **props/estrutura** de um componente: importe e percorra `componentPropertyDefinitions` / `children` / `findAll`, e **escreva o resultado num text node** para ler (ver §4). Atenção: `figma.mixed` é symbol — faça `typeof v==='symbol'` antes de concatenar.

---

## 4. Gotchas do `use_figma` (decore)

1. **Não retorna valor nem `console.log`.** Só confirma execução. Para "ler" qualquer coisa: escreva num `TextNode` e leia depois com `get_design_context(nodeId)`.
2. **Para ler de volta sem estourar contexto:** crie o text node **dentro de um frame pequeno de id conhecido** (ex: um header), pegue o id do text via `get_metadata(framePequeno)` (barato) e então `get_design_context(textId, excludeScreenshot:true)`. Nunca rode `get_metadata` na página inteira só pra achar um id — é caríssimo.
3. **Nós novos vão pra `figma.currentPage`**, que **não** é a página alvo. Sempre `appendChild` no pai/página certa, ou mova depois (`page.appendChild(node)`).
4. **`layoutSizingHorizontal/Vertical='FILL'` só funciona DEPOIS do `appendChild`** num pai com auto-layout. Setar antes → erro "must be auto-layout frame or child".
5. **Imagens:** `upload_assets` (POST dos bytes) devolve `imageHash`. Aplique como fill (`{type:'IMAGE',scaleMode:'FILL'|'FIT',imageHash}`). `nodeId` do `upload_assets` **não aceita sub-nó de instância** (`I..;..`) → suba a imagem, pegue o hash, e aplique o fill via `use_figma`.
6. **`createNodeFromSvg`:** gere o SVG com `width/height` = tamanho final (escala pelo viewBox 0 0 24 24), depois rebinde os `strokes` dos vetores para a variável de cor.
7. **Idempotência:** delete o frame anterior antes de reconstruir (`page.children.filter(name===...).forEach(remove)`); scripts não são transacionais (erro no meio deixa lixo). Envolva trechos arriscados em `try/catch`.
8. **Sempre limpe** os text nodes/markers temporários e frames de placement de imagem ao terminar.

---

## 5. Não acumule contexto (regras de eficiência)

- **Leia só o trecho do arquivo que importa** (`Read` com `offset/limit`, `grep -n` pra localizar). Nunca leia `index.html` inteiro (é gigante).
- **Screenshots:** use `get_screenshot` → ele devolve uma **URL**; baixe com `curl -o /tmp/x.png` e abra com `Read`. **Não** use `enableBase64Response` (estoura tokens).
- **Nunca** `get_metadata` numa página/canvas inteiro só pra achar um id — use o truque do frame pequeno (§4.2). Só rode metadata num subtree quando precisar mesmo da estrutura dele.
- **Não re-busque** no `search_design_system` com os mesmos args (resultado é estável no turno).
- Reaproveite keys/ids já descobertos (memória) em vez de redescobrir.
- Delegue exploração ampla a subagente quando fizer sentido; traga só a conclusão.

---

## 6. Checklist antes de entregar

- [ ] Bati o resultado contra o **código** (layout, textos, ordem, estados) — não contra o README.
- [ ] Todo texto usa **text style**, toda cor usa **variável**, sombra usa **effect style**, ícone é **componente/SVG** (zero emoji, zero hex solto).
- [ ] Componentes do DS instanciados onde existem; o que faltou foi criado com atoms/tokens (e anotado como candidato a virar componente).
- [ ] Multi-estado em **frames separados**, um por estado.
- [ ] **Screenshot conferido** visualmente (baixado e lido).
- [ ] Frames/markers/placements **temporários removidos**.
- [ ] Atualizei `memory/odex-figma-espelho.md` com node ids e keys novos.
- [ ] Reportei honestamente o que ficou aproximado/pendente (ex: componente do DS que ainda não prevê o caso).

---

## 7. Quando o DS não prevê algo

Se um padrão recorrente não existe como componente (ex: `ds-input-group` com ícone, `ds-rating`, `Tabs` sem prop de "ativo"): construa com tokens **e registre como gap** (no relatório e/ou `ds/divergence-audit.md`). O objetivo da Fase D é justamente expor esses buracos pra evoluir o DS — não esconder com valor solto.
