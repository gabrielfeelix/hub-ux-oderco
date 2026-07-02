import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { allProducts } from './src/app/components/productsData'
import {
  getProductUrl,
  getCategorySlug,
  getSubcategorySlug,
  getCategoryFromSlug,
} from './src/app/lib/slug'

const prototypeBasePath = process.env.PROTOTYPE_BASE_PATH || '/'
const prototypeOutDir = process.env.PROTOTYPE_OUT_DIR || 'dist'
const prototypePublicRoots = ['home', 'pages', 'switches', 'assets', 'setups']

function prototypePublicAssetBase() {
  const base = prototypeBasePath.endsWith('/') ? prototypeBasePath : `${prototypeBasePath}/`
  if (base === '/') return null

  const roots = prototypePublicRoots.join('|')
  const stringPattern = new RegExp(`(["'\`])/(?:${roots})/`, 'g')
  const cssPattern = new RegExp(`url\\(/(?:${roots})/`, 'g')
  const htmlPattern = new RegExp(`(src|href)=["']/(?:${roots})/`, 'g')

  function rewrite(code) {
    return code
      .replace(stringPattern, (match, quote) => `${quote}${base}${match.slice(2)}`)
      .replace(cssPattern, (match) => `url(${base}${match.slice(5)}`)
      .replace(htmlPattern, (match, attr) => `${attr}="${base}${match.slice(attr.length + 3)}`)
  }

  return {
    name: 'prototype-public-asset-base',
    generateBundle(_options, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type === 'chunk') {
          item.code = rewrite(item.code)
        } else if (typeof item.source === 'string') {
          item.source = rewrite(item.source)
        }
      }
    },
  }
}

const publicAssetBasePlugin = prototypePublicAssetBase()

// Tira o bundle CSS local (index-*.css) do caminho crítico de renderização:
// carrega via preload+swap (non-blocking) e mantém <noscript> como fallback.
// O fundo base é pintado por CSS crítico inline em index.html, evitando FOUC.
function deferMainCss() {
  return {
    name: 'defer-main-css',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        // Casa o bundle CSS local sob .../assets/*.css (com ou sem PROTOTYPE_BASE_PATH
        // prefixado, ex. /pcyes/pcyes-v2/v3/assets/). Não casa fonts (https, sem /assets/).
        /<link rel="stylesheet"([^>]*?)href="([^"]*assets\/[^"]+\.css)"([^>]*)>/g,
        (match: string, pre: string, href: string, post: string) =>
          `<link rel="preload" as="style"${pre}href="${href}"${post} onload="this.onload=null;this.rel='stylesheet'"><noscript>${match}</noscript>`,
      )
    },
  }
}

// Gera 1 index.html por rota do sitemap com canonical/og:url self-referring no
// HTML CRU (o doc de SEO pede canonical self-referring em todas as páginas).
// Como é SPA, o react-helmet só setava isso em runtime; aqui embutimos no estático.
// As tags têm data-rh, então o helmet reconcilia em runtime sem duplicar.
// Só mexe no <head> — body segue sendo o #root vazio → ZERO mudança de UI/UX.
function prerenderSeoHtml() {
  const SITE = 'https://www.pcyes.com.br'
  // Título/descrição por rota estática conhecida (canonical é feito pra TODAS).
  const META: Record<string, [string, string]> = {
    '/pre-venda/': ['Pré-venda', 'Garanta em primeira mão os lançamentos PCYES. Reserve na pré-venda com condições exclusivas, frete grátis acima de R$ 299 e até 12x sem juros.'],
    '/monte-seu-pc/': ['Monte seu PC', 'Monte seu PC gamer ou workstation PCYES peça a peça. Compatibilidade garantida, montagem profissional, frete grátis acima de R$ 299.'],
    '/drivers-e-manuais/': ['Drivers e Manuais', 'Baixe drivers, firmwares e manuais oficiais dos produtos PCYES. Central de downloads atualizada.'],
    '/faq/': ['Perguntas Frequentes', 'Tire dúvidas sobre pedidos, entrega, trocas, garantia e pagamento na PCYES.'],
    '/quem-somos/': ['Quem Somos', 'Conheça a PCYES: marca brasileira de hardware, periféricos e setups gamer.'],
    '/influenciadores/': ['Influenciadores', 'Programa de influenciadores PCYES: parcerias, cupons e conteúdo para creators de tecnologia e games.'],
    '/revendedor/': ['Seja um Revendedor', 'Torne-se revendedor oficial PCYES. Condições especiais de atacado em hardware, periféricos e setups gamer.'],
    '/fale-conosco/': ['Fale Conosco', 'Fale com a PCYES: suporte, dúvidas sobre pedidos, garantia e parcerias.'],
    '/onde-encontrar/': ['Onde Encontrar', 'Encontre os produtos PCYES em lojas e revendedores oficiais perto de você.'],
    '/maringa-fc/': ['PCYES × Maringá FC', 'Coleção oficial PCYES em parceria com o Maringá FC. Edições especiais para a torcida.'],
  }
  const set = (html: string, re: RegExp, val: string) =>
    html.replace(re, (_m, a, b) => `${a}${val}${b}`)

  // ── JSON-LD no HTML cru (Fase 2) ──────────────────────────────
  // Indexa o catálogo estático para emitir dados estruturados por rota
  // ANTES do JavaScript. Crawlers que não executam JS (Bing, scrapers
  // sociais, LLMs) passam a ver Product/Breadcrumb/CollectionPage.
  const productByUrl = new Map<string, any>()
  const subLabelBySlug = new Map<string, string>()
  for (const prod of allProducts as any[]) {
    productByUrl.set(getProductUrl(prod), prod)
    if (prod.subcategory) {
      const key = `${getCategorySlug(prod.category)}/${getSubcategorySlug(prod.subcategory)}`
      if (!subLabelBySlug.has(key)) subLabelBySlug.set(key, prod.subcategory)
    }
  }
  const abs = (img?: string): string | undefined =>
    !img ? undefined : /^https?:\/\//.test(img) ? img : `${SITE}${img.startsWith('/') ? img : `/${img}`}`

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PCYES',
    url: SITE,
    logo: 'https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png',
    sameAs: ['https://www.instagram.com/pcyesoficial', 'https://www.youtube.com/@pcyesoficial'],
  }

  const productLd = (prod: any, url: string): any[] => {
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: prod.name,
      image: abs(prod.images?.[0] ?? prod.image),
      sku: prod.sku ? String(prod.sku) : undefined,
      brand: { '@type': 'Brand', name: prod.brand || 'PCYES' },
      category: prod.category,
      aggregateRating:
        prod.reviews > 0
          ? { '@type': 'AggregateRating', ratingValue: prod.rating, reviewCount: prod.reviews, bestRating: 5, worstRating: 1 }
          : undefined,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: prod.priceNum,
        availability: prod.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        url: `${SITE}${url}`,
      },
    }
    const catSlug = url.split('/').filter(Boolean)[0]
    const catLabel = getCategoryFromSlug(catSlug) || prod.category
    const items: any[] = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: catLabel, item: `${SITE}/${catSlug}/` },
    ]
    if (prod.subcategory) {
      const subSlug = getSubcategorySlug(prod.subcategory)
      items.push({ '@type': 'ListItem', position: 3, name: prod.subcategory, item: `${SITE}/${catSlug}/${subSlug}/` })
      items.push({ '@type': 'ListItem', position: 4, name: prod.name })
    } else {
      items.push({ '@type': 'ListItem', position: 3, name: prod.name })
    }
    return [product, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }]
  }

  const categoryLd = (p: string): any[] | null => {
    const segs = p.split('/').filter(Boolean)
    const catLabel = getCategoryFromSlug(segs[0])
    if (!catLabel) return null
    const items: any[] = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: catLabel, item: `${SITE}/${segs[0]}/` },
    ]
    let name = catLabel
    if (segs[1]) {
      const subLabel = subLabelBySlug.get(`${segs[0]}/${segs[1]}`) || segs[1]
      items.push({ '@type': 'ListItem', position: 3, name: subLabel, item: `${SITE}/${segs[0]}/${segs[1]}/` })
      name = `${subLabel} ${catLabel}`
    }
    return [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items },
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name, url: `${SITE}${p}`, isPartOf: { '@type': 'WebSite', name: 'PCYES', url: SITE } },
    ]
  }

  const injectLd = (html: string, blobs: any[] | null): string => {
    if (!blobs || !blobs.length) return html
    const scripts = blobs
      .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
      .join('')
    return html.replace('</head>', `${scripts}</head>`)
  }

  return {
    name: 'prerender-seo-html',
    closeBundle() {
      const outDir = path.resolve(__dirname, prototypeOutDir)
      const tplPath = path.join(outDir, 'index.html')
      const smPath = path.join(outDir, 'sitemap.xml')
      if (!fs.existsSync(tplPath) || !fs.existsSync(smPath)) return
      const tpl = fs.readFileSync(tplPath, 'utf8')
      const locs = [...fs.readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      let count = 0
      let ld = 0
      // Home: injeta Organization no index.html raiz (canonical já é a home).
      fs.writeFileSync(tplPath, injectLd(tpl, [orgLd]))
      for (const loc of locs) {
        if (!loc.startsWith(SITE)) continue
        const p = loc.slice(SITE.length) || '/'
        if (p === '/') continue
        let html = set(tpl, /(<link rel="canonical" href=")[^"]*(")/, loc)
        html = set(html, /(<meta property="og:url" content=")[^"]*(")/, loc)
        const meta = META[p]
        if (meta) {
          const full = `${meta[0]} | PCYES`
          html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${full}</title>`)
          html = set(html, /(<meta name="description" content=")[^"]*(")/, meta[1])
          html = set(html, /(<meta property="og:title" content=")[^"]*(")/, full)
          html = set(html, /(<meta property="og:description" content=")[^"]*(")/, meta[1])
        }
        // JSON-LD por tipo de rota: produto > categoria/subcategoria > (nada).
        const segs = p.split('/').filter(Boolean)
        const prod = productByUrl.get(p)
        const blobs = prod
          ? productLd(prod, p)
          : segs.length <= 2 && getCategoryFromSlug(segs[0])
            ? categoryLd(p)
            : null
        if (blobs) {
          html = injectLd(html, blobs)
          ld++
        }
        const dir = path.join(outDir, p)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
        count++
      }
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] ${count} rotas canonical no HTML cru · ${ld} com JSON-LD + home Organization`)
    },
  }
}

export default defineConfig({
  base: prototypeBasePath,
  build: {
    outDir: prototypeOutDir,
    emptyOutDir: true,
  },
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    publicAssetBasePlugin,
    deferMainCss(),
    prerenderSeoHtml(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
