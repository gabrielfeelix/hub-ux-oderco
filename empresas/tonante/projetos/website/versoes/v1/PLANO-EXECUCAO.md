# Tonante — Plano de Execução (e-commerce v1)

> **Estratégia:** estrutura/engenharia da **PCYES v3** + identidade/alma da **Tonante**.
> Reskin, não reconstrução. Devs herdam checkout, filtros, rotas e organização do PCYES.
> Última revisão: 2026-06-09.

---

## 0. Princípio

| Vem do PCYES v3 (mantém) | Vem da Tonante (substitui) |
|---|---|
| Stack: Vite + React + TS + React Router 7 | Paleta: âmbar `#C87800` + preto `#000` + creme |
| Larguras / grid / container (`--maxw`, padding lateral) | Border-radius próprio (8/12/18/999, mais suave) |
| Disciplina de tokens (`theme.css` única fonte) | Botões próprios (âmbar sólido, "sacola") |
| Primitivos de seção (`section/`) | Tipografia: Bodoni Moda + Hanken Grotesk |
| Checkout multi-step completo | Sombras suaves premium (sem neon) |
| Sistema de filtros (sidebar + multi-select) | Tom de voz editorial, herança 1954 |
| Rotas semânticas + sitemap + robots + SKU | Catálogo: violões/guitarras/baixos/acessórios |
| Contexts (Cart/Fav/Auth) | Quirks: grain, serif, respiro — sem glitch/HUD |

**Fontes de verdade:**
- Estrutura → `v3-base/` (cópia PCYES v3, já feita, 58M sem node_modules)
- Identidade → `claude-design/` (protótipo) + `claude-design/uploads/Tonante-Manual-de-Marca-A5-RGB-rev1.pdf`

---

## Identidade oficial (do manual de marca)

- **Cores:** preto `#000000` · âmbar `#C87800` (RGB 200,120,0 · Pantone 1385 C · CMYK 0/55/100/20). **Apenas estas duas** são oficiais.
- **Tipografia institucional:** família Bodoni (manual: "Bodoni Std"). Web → **Bodoni Moda** (Google Fonts) p/ display + **Hanken Grotesk** p/ corpo (sans é escolha livre do material publicitário, conforme manual).
- **Logo:** símbolo + wordmark script. Respiro = 1/6 da largura. Variantes: padrão, com slogan "Rei dos Violões", positivo, negativo. Assets em `claude-design/assets/logos/` + `claude-design/uploads/`.
- **História:** 1954, dois irmãos, "conectar pessoas à música". Slogan herança: **"Rei dos Violões"**. Mantra atual (claude-design): **"Feita de Histórias"**.
- **Proibições:** não alterar cores, não distorcer logo, não inserir elementos, não mudar orientação.

### Tokens-alvo (derivados do claude-design, validados pelo manual)
```
--amber #C87800 · --amber-bright #E08C12 · --amber-deep #A05F00
--ink #1A1714 (preto quente) · --ink-soft #4F463C · --muted #837767
--paper #F6F2E9 (creme, LIGHT-default) · --surface #FFFDF8 · --hairline #E4DCCC
dark = opt-in [data-theme="dark"]
display: "Bodoni Moda" serif · sans: "Hanken Grotesk"
radius: 8/12/18/999 · sombras suaves (sem halo neon)
```

---

## Fases

### Fase 0 — Higiene & boot (base rodando) ✅ CONCLUÍDA
- [x] Mover `v3-base/` → raiz v1; `claude-design/` → `_ref/`.
- [x] `package.json`: `pcyes-v3` → `tonante-website`. Docs PCYES → `_ref/pcyes-docs/` (design.md preservado p/ referência).
- [x] `index.html`: title/meta/og/favicon Tonante, lang pt-BR, **dark-bootstrap removido** (light-only).
- [x] `npm install` (232 pkgs) + `npm run dev` → Vite 6 HTTP 200, main.tsx compila. Baseline OK.
- [ ] (pendente) `.env.local` próprio; `vercel.json`/docker → domínio Tonante. *(adiado — não bloqueia)*

### Fase 1 — Fundação de marca (tokens) ★ coração
- [ ] Reescrever `src/styles/theme.css`: cores (vermelho→âmbar, dark-bg→creme), **inverter p/ light-default** (dark = opt-in), tipografia, radius próprio, sombras suaves, gradientes (vermelho→âmbar/madeira). Remover quirks gamer (glitch, HUD, neon-hover) → adicionar grain + respiro editorial.
- [ ] `src/styles/fonts.css`: Figtree/Inter → Bodoni Moda + Hanken Grotesk.
- [ ] Regenerar `tokens.json` / `tokens.studio.json`.
- [ ] Reescrever `design.md` → bíblia DS Tonante.
- [ ] **Checkpoint visual:** home PCYES re-tematizada já deve "sentir" Tonante só por tokens.

### Fase 2 — Assets de marca
- [ ] Copiar logos (`assets/logos/` + `uploads/LOGO_*`) → `public/brand/`. Fotos reais de produto (`uploads/*`) → `public/products/`.
- [ ] Ajustar `prototypePublicRoots` no `vite.config.ts` (add `brand`, `products`).
- [ ] Favicon + wiring de logo em Navbar/Footer/WelcomePopup.

### Fase 3 — Chrome & tom de voz (componentes compartilhados)
- [ ] `Navbar`: mega-menu PCYES → categorias Tonante (Violões/Guitarras/Contrabaixos/Acessórios/Cordas/Suportes). Logo script. Eyebrow `// CÓDIGO` → label editorial (uppercase, tracking).
- [ ] `AnnouncementBar`: "FEITA DE HISTÓRIAS DESDE 1954 · FRETE GRÁTIS R$299 · ATÉ 12X SEM JUROS · GARANTIA TONANTE 2 ANOS".
- [ ] `Footer`, `CTAButton` (labels "Adicionar à sacola"/"Comprar agora"), `Eyebrow`, badges → restyle.
- [ ] Passada de copy (tom de voz: caloroso, artesanal, herança).

### Fase 4 — Modelo de catálogo
- [ ] Mapear `claude-design/src/data.js` (TONANTE_DATA) + `catalog_data.js` (CSV real) → interface `Product` do v3.
  - `price`(num) → `price`(str "R$ X,XX") + `priceNum`; `cat`→`category`; gerar `subcategory`, `specs[]`, `features[]`, `images[]`, `seoSlug`; manter `tone` p/ placeholder, `form`/`attrs`.
- [ ] Specs de instrumento: tampo, madeira (fundo/laterais), escala, captação, nº cordas, acabamento.
- [ ] Config de categorias (6) + slugs URL. Marcas/linhas Tonante.
- [ ] Adaptar `productEnhancements` (12x, PIX) e `productPresentation` (swatches → tons de madeira).

### Fase 5 — Páginas (reskin + escopo)
- [ ] `HomePage`: manter hero editorial, vitrine de categorias, prateleira mais-vendidos, seção herança "desde 1954", mapa de revendedores, newsletter. **Remover** seções PCYES-only (GPU, monte-seu-pc, Maringá FC, PcyesCoin).
- [ ] `ProductsPage`: filtros p/ domínio instrumento (categoria, tipo/`form`, atributos nylon/aço/humbucker, faixa de preço, sort). **Manter largura/grid/sidebar do PCYES.**
- [ ] `ProductPage`: galeria + specs de instrumento + frete + parcelas. Reusa layout PCYES.
- [ ] `StoreLocator`/Revendedores (claude-design tem mapa Brasil).
- [ ] `QuemSomos` → história 1954 / "Rei dos Violões".

### Fase 6 — Rotas, URLs, SEO
- [ ] `routes.tsx`: rotas Tonante (`/violoes`, `/guitarras`, `/contrabaixos`, `/acessorios`, `/cordas`, `/suportes`, `/quem-somos`, `/onde-encontrar`, `/fale-conosco`, `/faq`). Remover rotas PCYES-only.
- [ ] `lib/slug.ts`: mapa de categorias Tonante.
- [ ] `public/robots.txt` + `scripts/generate-sitemap.mts` → categorias/produtos Tonante, domínio tonante.
- [ ] SEO defaults / og / meta.

### Fase 7 — Checkout & fluxos (herança PCYES — mínimo esforço)
- [ ] `CheckoutPage` PCYES intacto → só re-tematizar via tokens + copy ("sacola"). É o ganho principal pros devs.
- [ ] `CartDrawer`: "sacola", regras de frete grátis R$299.
- [ ] Contexts Cart/Fav/Auth mantidos.

### Fase 8 — Limpeza, QA, docs
- [ ] Remover páginas/dados mortos PCYES (monte-seu-pc, drivers, maringa, pcyes-coin, productsData PCYES).
- [ ] Atualizar `README` / `HANDOFF` p/ Tonante.
- [ ] `npm run typecheck` + `npm run build` limpos.
- [ ] QA visual contra screenshots `claude-design/screenshots/`.
- [ ] Arquivar `claude-design/` + remover base de referência se desnecessária.

---

## Decisões (FECHADAS · 2026-06-09)
1. **Layout de pasta:** mover conteúdo de `v3-base/` → raiz `v1/`. `claude-design/` vira `_ref/`.
2. **Dark mode:** **só light.** Remover dark de vez (limpa `[data-theme=dark]` e toggle).
3. **Dados (Fase 4):** 3 fontes —
   - `produtos_tonante_com_imagens.csv` (286 linhas: sku + imagens principais CDN)
   - `claude-design/uploads/esteira-operacional-2026-06-09.csv` (HTML rico de descrição p/ parte dos SKUs)
   - `claude-design/src/catalog_data.js` (40 produtos já estruturados = base)
   - **Regra:** SKU com esteira → usa HTML real. SKU sem esteira → gerar **MESMO padrão HTML** (hero/blocos/cards/galeria) + reaproveitar imagens principais do CSV.
4. **Páginas PCYES-only:**
   - `drivers-e-manuais` → avaliar virar **"Manuais"** de instrumentos (violões/guitarras têm manual). Provável manter adaptado.
   - `monte-seu-pc` → manter **OCULTO** (rota viva mas fora do menu) — viramos "monte seu setup" próprio depois.
   - `PcyesCoin` → criar **TonanteCoin** (claude-design já esboçava algo).
   - `influenciadores` → versão própria Tonante.
   - `maringa-fc` → remover. Demais (revendedor, fale-conosco, faq, quem-somos, onde-encontrar) → adaptar.

---

## Ordem de entrega recomendada
Fase 0 → **1 (tokens)** → 2 → 3 → checkpoint visual home → 4 (dados) → 5 → 6 → 7 → 8.
Tokens primeiro = retorno visual máximo com menor esforço. Cada fase = commit atômico.
