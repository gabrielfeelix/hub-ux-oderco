// Fase 7 — code-split do catálogo.
// Tira os campos pesados de descrição do bundle inicial:
//   - htmlDescription (621 KB, MORTO: nenhum componente usa) -> removido do bundle
//   - description (382 KB) -> mantém blurb curto no bundle; completo em productDetails
// Gera src/app/components/productDetails.ts (lazy, importado só pela PDP) com a
// descrição completa + htmlDescription por id. Reescreve productsData.ts (light).
//
// specs/features FICAM no light (usados pelo filtro da PLP). Rodar 1x:
//   node scripts/split-catalog.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "src/app/components/productsData.ts");
const DETAILS = path.join(ROOT, "src/app/components/productDetails.ts");
const MAX_BLURB = 300; // chars da description que ficam no bundle (blurb p/ listagem/home)

const { allProducts } = await import(DATA);

// 1) productDetails.ts — descrição completa + htmlDescription por id (lazy).
const details = {};
for (const p of allProducts) {
  const d = {};
  if (p.description) d.description = p.description;
  if (p.htmlDescription) d.htmlDescription = p.htmlDescription;
  if (Object.keys(d).length) details[p.id] = d;
}
const header = `// GERADO por scripts/split-catalog.mjs — NÃO editar à mão.
// Descrição completa + htmlDescription por produto. Importado só pela PDP (rota
// lazy), então este peso (~1 MB) fica FORA do chunk inicial de todas as páginas.
export interface ProductDetails { description?: string; htmlDescription?: string }
export const productDetails: Record<number, ProductDetails> = ${JSON.stringify(details)};
`;
fs.writeFileSync(DETAILS, header);

// 2) productsData.ts light — remove htmlDescription, trunca description.
let src = fs.readFileSync(DATA, "utf8");
const before = src.length;

// remove linhas de htmlDescription inteiras (campo em 1 linha, com aspas escapadas)
src = src.replace(/^[ \t]*"htmlDescription":\s*"(?:[^"\\]|\\.)*",?[ \t]*\r?\n/gm, "");

// trunca o valor de description para um blurb (mantém 1ª parte; PDP carrega o resto)
src = src.replace(
  /^([ \t]*"description":\s*")((?:[^"\\]|\\.)*)(",?)[ \t]*$/gm,
  (_m, pre, val, post) => {
    if (val.length <= MAX_BLURB) return `${pre}${val}${post}`;
    let cut = val.slice(0, MAX_BLURB);
    cut = cut.replace(/\\+$/, (b) => (b.length % 2 ? b.slice(0, -1) : b)); // não deixar \ solto
    return `${pre}${cut}…${post}`;
  },
);

fs.writeFileSync(DATA, src);
console.log(`productDetails.ts: ${Object.keys(details).length} produtos`);
console.log(`productsData.ts: ${(before / 1024).toFixed(0)} KB -> ${(src.length / 1024).toFixed(0)} KB`);
