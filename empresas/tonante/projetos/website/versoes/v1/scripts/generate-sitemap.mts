/**
 * Sitemap generator. Run with:
 *   npx tsx scripts/generate-sitemap.mts
 *
 * Emits public/sitemap.xml with:
 *   - Static institutional pages
 *   - All category and subcategory URLs derived from the catalog
 *   - All product detail URLs in the canonical semantic form
 *
 * Stage 6 of A1 (semantic URLs).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { allProducts } from "../src/app/components/productsData";
import { getCategoryUrl, getProductUrl } from "../src/app/lib/slug";

const ROOT = "https://pcyes.com.br";
const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");

type Entry = { loc: string; changefreq: string; priority: string };

const staticEntries: Entry[] = [
  { loc: "/",                       changefreq: "daily",   priority: "1.0" },
  { loc: "/pre-venda/",             changefreq: "weekly",  priority: "0.8" },
  { loc: "/monte-seu-pc/",          changefreq: "weekly",  priority: "0.7" },
  { loc: "/maringa-fc/",            changefreq: "weekly",  priority: "0.6" },
  { loc: "/influenciadores/",       changefreq: "monthly", priority: "0.5" },
  { loc: "/revendedor/",            changefreq: "monthly", priority: "0.5" },
  { loc: "/fale-conosco/",          changefreq: "monthly", priority: "0.4" },
  { loc: "/onde-encontrar/",        changefreq: "monthly", priority: "0.4" },
  { loc: "/quem-somos/",            changefreq: "monthly", priority: "0.4" },
  { loc: "/faq/",                   changefreq: "monthly", priority: "0.3" },
  { loc: "/drivers-e-manuais/",     changefreq: "weekly",  priority: "0.4" },
];

// Unique categories and subcategories from the catalog.
const categorySet = new Set<string>();
const subSet = new Set<string>(); // "Category||Subcategory"
for (const p of allProducts) {
  if (p.category) categorySet.add(p.category);
  if (p.category && p.subcategory) subSet.add(`${p.category}||${p.subcategory}`);
}

const categoryEntries: Entry[] = [...categorySet].map((cat) => ({
  loc: getCategoryUrl(cat),
  changefreq: "daily",
  priority: "0.9",
}));

const subcategoryEntries: Entry[] = [...subSet].map((key) => {
  const [cat, sub] = key.split("||");
  return { loc: getCategoryUrl(cat, sub), changefreq: "daily", priority: "0.8" };
});

const productEntries: Entry[] = allProducts.map((p) => ({
  loc: getProductUrl(p),
  changefreq: "weekly",
  priority: "0.7",
}));

const all = [...staticEntries, ...categoryEntries, ...subcategoryEntries, ...productEntries];

// Dedupe by loc.
const dedup = new Map<string, Entry>();
for (const e of all) dedup.set(e.loc, e);

const lines: string[] = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];
for (const e of dedup.values()) {
  lines.push(`  <url><loc>${ROOT}${e.loc}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`);
}
lines.push("</urlset>", "");

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, lines.join("\n"), "utf8");

console.log(`Wrote ${dedup.size} URLs to ${OUTPUT}`);
