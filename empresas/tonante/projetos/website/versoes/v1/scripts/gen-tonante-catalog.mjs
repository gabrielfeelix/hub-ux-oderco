// Gera src/app/components/productsData.ts (catálogo Tonante) a partir de:
//  - _ref/src/catalog_data.js (TONANTE_REAL: imagens CDN + HTML da esteira + ficha)
//  - _ref/src/data.js (TONANTE_DATA: 22 produtos curados c/ nome/preço/specs)
//  - produtos_tonante_com_imagens.csv (imagens principais por SKU)
// Mapeia pro contrato Product do template PCYES v3.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// --- carrega as fontes JS (usam window.X = ...) ---
global.window = {};
require(path.join(root, '_ref/src/catalog_data.js')); // -> window.TONANTE_REAL
require(path.join(root, '_ref/src/data.js'));          // -> window.TONANTE_DATA
const DATA = global.window.TONANTE_DATA;

// --- imagens principais por SKU (CSV: sku,numero_imagem,cdn,fonte) ---
const imagesBySku = {};
const csv = fs.readFileSync(path.join(root, 'produtos_tonante_com_imagens.csv'), 'utf8').trim().split('\n').slice(1);
for (const line of csv) {
  const f = line.split(',');
  if (f.length < 3) continue;
  const sku = f[0].trim();
  const num = parseInt(f[1], 10) || 0;
  const url = f[2].trim();
  if (!sku || !url) continue;
  (imagesBySku[sku] ||= []).push({ num, url });
}
for (const sku in imagesBySku) {
  imagesBySku[sku] = imagesBySku[sku].sort((a, b) => a.num - b.num).map((x) => x.url);
}

const CAT_LABEL = {
  violoes: 'Violões', guitarras: 'Guitarras', contrabaixos: 'Contrabaixos',
  acessorios: 'Acessórios', cordas: 'Cordas & Encordoamentos', suportes: 'Suportes',
};

const slug = (s) => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const brl = (n) => 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// placeholder quente p/ produtos sem foto (violões) — SVG data-uri c/ tom de madeira
function placeholder(tones) {
  const [a, b] = tones || ['#C9A06A', '#8A5E2C'];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='640'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='640' height='640' fill='url(#g)'/><text x='320' y='330' font-family='Georgia, serif' font-style='italic' font-size='96' fill='rgba(255,253,248,0.94)' text-anchor='middle'>Tonante</text><text x='320' y='392' font-family='Arial, sans-serif' font-size='20' letter-spacing='8' fill='rgba(255,253,248,0.6)' text-anchor='middle'>DESDE 1954</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// HTML de descrição — usa blocos reais da esteira (REAL) ou gera no mesmo padrão
function buildHtml(p, real, catLabel) {
  const parts = [`<section class="produto-descricao">`];
  if (real) {
    parts.push(`<h2>${esc(real.focusTitle || ('Conheça ' + p.name))}</h2>`);
    if (real.focusText) parts.push(`<p>${esc(real.focusText)}</p>`);
    if (real.blocoTitle) parts.push(`<h3>${esc(real.blocoTitle)}</h3>`);
    if (real.blocoText) parts.push(`<p>${esc(real.blocoText)}</p>`);
    if (real.bannerTitle) parts.push(`<h3>${esc(real.bannerTitle)}</h3>`);
    if (real.bannerText) parts.push(`<p>${esc(real.bannerText)}</p>`);
  } else {
    const secs = DATA.sectionsFor(p);
    parts.push(`<h2>${esc(secs[0].title)}</h2><p>${esc(secs[0].text)}</p>`);
    parts.push(`<h3>${esc(secs[1].title)}</h3><p>${esc(secs[1].text)}</p>`);
    parts.push(`<h3>${esc(secs[2].title)}</h3><p>${esc(secs[2].text)}</p>`);
  }
  const feats = DATA.aboutFor(p);
  parts.push(`<h2>Principais características</h2><ul>`);
  for (const f of feats) parts.push(`<li>${esc(f)}</li>`);
  parts.push(`</ul></section>`);
  return parts.join('');
}

const products = DATA.products.map((p, i) => {
  const real = p.real;
  const catLabel = CAT_LABEL[p.cat] || p.cat;
  // imagens: CSV (principais) → REAL (hero/galeria) → placeholder
  let images = [];
  if (p.sku && imagesBySku[p.sku]) images = imagesBySku[p.sku].slice(0, 6);
  if (images.length === 0 && real) {
    images = [real.hero, real.specImg, real.blocoImg, ...(real.galeria || []), ...(real.lateral || [])].filter(Boolean);
    images = [...new Set(images)].slice(0, 6);
  }
  if (images.length === 0) images = [placeholder(p.tones)];
  const image = images[0];

  // tags: categoria + atributos + partes do "tag"
  const tagParts = String(p.tag || '').split('·').map((s) => s.trim()).filter(Boolean);
  const tags = [...new Set([catLabel, ...(p.attrs || []), ...tagParts])];

  // specs: ficha real (k/v) → specsFor
  const fichaSrc = (real && real.ficha && real.ficha.length) ? real.ficha : DATA.specsFor(p);
  const specs = fichaSrc.map((f) => ({ label: f.k, value: f.v }));
  if (!specs.some((s) => s.label === 'SKU') && p.sku) specs.unshift({ label: 'SKU', value: p.sku });

  const seoSlug = slug(p.name + ' tonante');
  const out = {
    id: i + 1,
    sku: p.sku,
    name: p.name,
    price: brl(p.price),
    priceNum: p.price,
    rating: p.rating,
    reviews: p.reviews,
    category: catLabel,
    subcategory: p.form,
    tags,
    brand: 'Tonante',
    image,
    images,
    inStock: true,
    description: p.desc,
    htmlDescription: buildHtml(p, real, catLabel),
    features: DATA.aboutFor(p),
    specs,
    seoSlug,
    productUrl: `https://tonante.com.br/${seoSlug}`,
  };
  if (p.old) { out.oldPrice = brl(p.old); out.oldPriceNum = p.old; }
  if (p.badge) out.badge = p.badge;
  return out;
});

const allTags = [...new Set(products.flatMap((p) => p.tags))];
const categories = ['Violões', 'Guitarras', 'Contrabaixos', 'Acessórios', 'Cordas & Encordoamentos', 'Suportes'];

const header = `export interface Product {
  id: number;
  sku?: string;
  name: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  oldPriceNum?: number;
  rating: number;
  reviews: number;
  category: string;
  subcategory?: string;
  tags: string[];
  image: string;
  badge?: string;
  brand?: string;
  inStock?: boolean;
  description?: string;
  htmlDescription?: string;
  seoSlug?: string;
  productUrl?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
  images?: string[];
}

`;

const wrapper = `
function withSyntheticDiscount(p: Product): Product {
  if (p.oldPriceNum && p.oldPriceNum > p.priceNum) return p;
  const hash = (p.id * 17 + 23) % 100;
  let pct = 0;
  if (hash >= 78 && hash < 90) pct = 10 + (p.id % 6);
  else if (hash >= 90) pct = 15 + (p.id % 5);
  if (pct === 0) return p;
  const oldPriceNum = Math.round((p.priceNum / (1 - pct / 100)) * 100) / 100;
  const oldPrice = \`R$ \${oldPriceNum.toFixed(2).replace(".", ",")}\`;
  return { ...p, oldPriceNum, oldPrice };
}

export const allProducts: Product[] = rawProducts.map(withSyntheticDiscount);

export const categories = ${JSON.stringify(categories)};
export const allTags = ${JSON.stringify(allTags)};
export const brands = ["Tonante"];
`;

const body = `const rawProducts: Product[] = ${JSON.stringify(products, null, 2)};\n`;
const outPath = path.join(root, 'src/app/components/productsData.ts');
fs.writeFileSync(outPath, header + body + wrapper, 'utf8');
console.log(`OK — ${products.length} produtos | ${allTags.length} tags | imagens reais: ${products.filter(p => !p.image.startsWith('data:')).length} | placeholder: ${products.filter(p => p.image.startsWith('data:')).length}`);
console.log('categorias:', categories.join(', '));
