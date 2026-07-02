# PCYES — v3

E-commerce da PCYES (hardware, periféricos, computadores e edições
exclusivas). Versão **v3**: redesign da v2 com foco **mobile-first**,
feito página por página.

Aplicação **SPA** — não é um site de HTML estático. As páginas são
componentes React; o `index.html` é só o ponto de entrada e todo o
restante é renderizado em runtime pelo JavaScript.

## Stack

| Camada        | Tecnologia                                  |
| ------------- | ------------------------------------------- |
| Build / dev   | Vite 6                                      |
| UI            | React 18 + TypeScript                       |
| Roteamento    | React Router 7 (`createBrowserRouter`)      |
| Estilo        | Tailwind CSS 4 + tokens em `src/styles/theme.css` |
| Componentes   | Radix UI (primitivos em `src/app/components/ui/`) |
| Animação      | `motion`                                    |
| Ícones        | `lucide-react`                              |
| Backend       | Supabase (`@supabase/supabase-js`)          |

Origem: export do Figma Make, estendido à mão depois.

## Como rodar

### Local

```bash
npm install
npm run dev      # http://localhost:5173
```

### Docker

Usado quando o ambiente exige o certificado raiz da Kaspersky para
acessar HTTPS (ver `Dockerfile.dev`).

```bash
docker compose up
```

Sobe o serviço `web` em `http://localhost:5173` com hot-reload.

### Scripts

| Script              | O que faz                                         |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento (Vite)                |
| `npm run build`     | Build de produção em `dist/`                      |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) — opcional, não roda no build |

## Estrutura de pastas

```
src/
  main.tsx                  Ponto de entrada — monta o React
  app/
    App.tsx                 RouterProvider
    routes.tsx              Definição de todas as rotas
    components/             Componentes e páginas
      ui/                   Primitivos Radix (button, dialog, input...)
      figma/                Helpers do export Figma
      icons/                SVGs de bandeiras de cartão
      pages/                Páginas institucionais carregadas via HTML
      *.tsx                 Seções da home, páginas, contextos, modais
      *Data.ts              Dados estáticos (produtos, drivers, pré-venda)
    pages/                  Páginas: monte-seu-pc, FAQ, legais
    styles/                 CSS global, tema, fontes, Tailwind
public/                     Imagens estáticas (home, setups, switches...)
docs/                       Specs e planos de design
```

> Observação: páginas hoje vivem em três lugares (`components/`,
> `components/pages/` e `pages/`). Consolidar numa única pasta é uma
> melhoria pendente — ver "Pendências conhecidas".

## Dados de produto

Os produtos **seguem um padrão claro** — não são hardcoded espalhados
pelos componentes. A arquitetura tem três camadas:

1. **`src/app/components/productsData.ts`** — fonte única de verdade.
   Interface `Product` tipada (id, sku, nome, preço, specs, tags,
   imagens...) e um array de ~509 produtos do catálogo real da PCYES.
   Exporta também `categories`, `allTags` e `brands`.

2. **`productEnhancements.ts`** — valores *derivados* por função:
   desconto %, preço no PIX, parcelamento, formatação BRL. Calculado,
   não fixo por produto.

3. **`productPresentation.ts`** — apresentação derivada: swatches de
   cor, mídia de hover, links de catálogo.

~20 componentes importam `allProducts` dessa fonte única. Para mudar o
catálogo, edita-se **um** arquivo. Limitação atual: catálogo 100%
estático, sem API/backend.

## Rotas

Definidas em `src/app/routes.tsx`. Principais: `/` (home),
`/produtos`, `/produto/:id`, `/carrinho`, `/checkout`, `/pre-venda`,
`/perfil`, mais páginas institucionais (`/quem-somos`, `/faq`,
`/termos-de-uso`, etc.).

## Deploy

Este protótipo é publicado em dois lugares, com o mesmo código servido por dois projetos Vercel diferentes. Este diretório (no monorepo) é a fonte da verdade. O standalone é uma cópia só de código, sincronizada a partir daqui.

| Alvo | URL | Fonte | Publica quando |
|------|-----|-------|----------------|
| Hub interno | https://ux-oderco.vercel.app/pcyes/pcyes-v2/v3 | este monorepo | push na `main` do monorepo |
| Standalone (devs) | https://pcyes-v3-codigo-fonte.vercel.app | repo `pcyes-v3-codigo-fonte` | push na `main` desse repo |

`dist/` é gerado no build e ignorado pelo git. A Vercel builda a partir do código, não do `dist/` commitado.

### 1. Deploy do hub (monorepo)

O projeto Vercel `ux-oderco` está ligado ao GitHub do monorepo e faz deploy de produção a cada push na `main`. O build roda `scripts/build-prototypes.mjs`, que compila cada protótipo do hub e serve o PCYES v3 em `/pcyes/pcyes-v2/v3`.

```bash
# na raiz do monorepo, com o trabalho commitado na main
git push origin main
```

Isso rebuilda todos os protótipos do hub (todas as empresas), não só o PCYES. Leva alguns minutos. Alternativa manual: `vercel --prod` a partir da raiz do monorepo.

### 2. Deploy do standalone (repo dos devs)

O standalone é um repo git próprio em `/home/gabrielbarbosa/dev/v3-codigo-fonte` (remote `pcyes-v3-codigo-fonte`, público). Push na `main` dele dispara o deploy automático na Vercel.

Antes de publicar, sincronizar o código a partir daqui:

```bash
H=/home/gabrielbarbosa/dev/ux-prototipos/empresas/pcyes/projetos/pcyes-v2/versoes/v3
D=/home/gabrielbarbosa/dev/v3-codigo-fonte

# 1. Espelhar codigo e assets (com --delete para remover arquivos deletados)
rsync -rc --delete "$H/src/"    "$D/src/"
rsync -rc --delete "$H/public/" "$D/public/"

# 2. Copiar configs de build (NAO copiar README, ATTRIBUTIONS nem .gitignore)
for f in index.html package.json package-lock.json tsconfig.json \
         vite.config.ts postcss.config.mjs vercel.json; do
  cp -p "$H/$f" "$D/$f"
done
cp -p "$H/SEO.md" "$D/SEO.md"   # doc de SEO para os devs

# 3. Build (tem que terminar verde)
cd "$D" && npm install && npm run build

# 4. Publicar (dispara o deploy na Vercel)
git add -A
git commit -m "sync: atualiza prototipo a partir do monorepo"
git push origin main
```

O runbook completo (o que copiar, o que nunca copiar, checagens antes de publicar) está em `ATUALIZAR-PROTOTIPO.md`. Atalho: pedir ao Claude "atualiza o protótipo".

### Como o build gera o SEO

`npm run build` roda o Vite com os plugins definidos em `vite.config.ts`:

- `deferMainCss`: tira o bundle CSS do caminho crítico de renderização.
- `prerenderSeoHtml`: gera um `index.html` por rota do sitemap, com canonical self-referring, JSON-LD e o corpo da página já no HTML cru.

Os padrões de SEO estão documentados em `SEO.md`. Subpastas novas de `public/` precisam ser listadas em `prototypePublicRoots` no `vite.config.ts`, senão dão 404 no hub.

## Pendências conhecidas

Melhorias de organização ainda não feitas (escopo "limpeza segura" já
aplicado; estas exigem mover arquivos / refatorar):

- Consolidar páginas numa única pasta `pages/`.
- Criar pastas `contexts/`, `data/`, `hooks/`.
- Quebrar arquivos gigantes (`MonteSeuPcPage.tsx` ~6.3k linhas,
  `ProductPage.tsx`, `Navbar.tsx`, `CheckoutPage.tsx`).
- `npm run typecheck` aponta ~29 erros de tipo pré-existentes
  (tsconfig está em modo leniente).
