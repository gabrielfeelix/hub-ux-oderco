"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Plus, Check, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage } from "./productPresentation";
import { getPixPrice, formatBRL } from "./productEnhancements";

// MonteSeuKit — combo builder (porta _ref/src/home_sections.jsx FeaturedEssentials).
// Instrumento base + add-ons selecionáveis, 8% off no kit.
export function MonteSeuKit() {
  const { addItem } = useCart();
  const base = useMemo(
    () =>
      allProducts.find((p) => p.name.includes("Cecille")) ??
      allProducts.find((p) => p.category === "Guitarras") ??
      allProducts[0],
    [],
  );
  const addons = useMemo(() => {
    const wants = ["Capotraste", "Suporte", "Encordoamento", "Afinador"];
    const out: Product[] = [];
    for (const w of wants) {
      const hit = allProducts.find((p) => p.name.includes(w) && !out.includes(p));
      if (hit) out.push(hit);
      if (out.length >= 3) break;
    }
    return out;
  }, []);

  const [sel, setSel] = useState<number[]>(addons.map((a) => a.id));
  const chosen = addons.filter((a) => sel.includes(a.id));
  const toggle = (id: number) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const full = base.priceNum + chosen.reduce((s, a) => s + a.priceNum, 0);
  const combo = Math.round(full * 0.92 * 100) / 100;
  const save = Math.round((full - combo) * 100) / 100;

  const addKit = () => {
    [base, ...chosen].forEach((p) => addItem({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) }));
  };

  return (
    <section
      className="px-5 md:px-[72px]"
      style={{ background: "var(--surface-2)", borderTop: "1px solid #e4dccc", borderBottom: "1px solid #e4dccc", paddingTop: 60, paddingBottom: 60 }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-7">
          <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>
            Combo Tonante
          </p>
          <h2 style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(28px,3.8vw,48px)", fontWeight: 700, lineHeight: 1, margin: 0 }}>
            Monte seu <span style={{ fontStyle: "italic", color: "var(--amber)" }}>kit</span>
          </h2>
          <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "16px", color: "var(--ink-soft)", maxWidth: 460, margin: "10px 0 0" }}>
            Comece com o instrumento e adicione os essenciais. Levando junto,{" "}
            <strong style={{ color: "var(--amber-deep)" }}>8% off</strong> no kit.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,420px)_auto_1fr]">
          {/* base */}
          <article className="flex flex-col gap-3" style={{ background: "var(--surface-1)", border: "1px solid #e4dccc", borderRadius: "var(--radius-card-lg)", padding: 16 }}>
            <span className="label" style={{ color: "var(--amber-deep)" }}>
              Instrumento base
            </span>
            <Link to={`/produto/${base.id}`} className="relative block overflow-hidden rounded-[12px]" style={{ background: "linear-gradient(160deg,#faf7f0,#efe9dc)" }}>
              <div className="relative aspect-[4/3]">
                <ImageWithFallback src={getPrimaryProductImage(base)} alt={base.name} className="absolute inset-0 h-full w-full object-contain p-4" style={{ mixBlendMode: "multiply" }} />
              </div>
            </Link>
            <div>
              <Link to={`/produto/${base.id}`} className="text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: 600 }}>
                {base.name}
              </Link>
              <div style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: 600, color: "var(--amber-deep)", marginTop: 4 }}>
                {formatBRL(getPixPrice(base))}
              </div>
            </div>
          </article>

          {/* plus */}
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-full" style={{ background: "var(--ink-strong)", color: "var(--background)" }}>
            <Plus size={20} strokeWidth={2.4} />
          </div>

          {/* add-ons (horizontais) + resumo */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {addons.map((a) => {
                const on = sel.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    className="relative flex cursor-pointer flex-col gap-2 text-left"
                    style={{
                      background: "var(--surface-1)",
                      border: `1.5px solid ${on ? "var(--amber)" : "#e4dccc"}`,
                      borderRadius: "var(--radius-card-md)",
                      padding: 12,
                      transition: "border-color .2s",
                    }}
                  >
                    <span
                      className="absolute right-2.5 top-2.5 grid h-[26px] w-[26px] place-items-center rounded-full"
                      style={{ background: on ? "var(--amber)" : "rgba(255,255,255,0.9)", border: `1.5px solid ${on ? "var(--amber)" : "#d6cbb5"}`, color: on ? "#fff" : "var(--muted)" }}
                    >
                      {on ? <Check size={14} strokeWidth={2.6} /> : <Plus size={14} strokeWidth={2.6} />}
                    </span>
                    <div className="relative aspect-square overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(160deg,#faf7f0,#efe9dc)" }}>
                      <ImageWithFallback src={getPrimaryProductImage(a)} alt={a.name} className="absolute inset-0 h-full w-full object-contain p-2" style={{ mixBlendMode: "multiply" }} />
                    </div>
                    <div className="line-clamp-2 text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontWeight: 600, fontSize: "13px", lineHeight: 1.2 }}>
                      {a.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", color: "var(--amber-deep)" }}>
                      + {formatBRL(getPixPrice(a))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* resumo (claro) */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
              style={{ background: "var(--surface-1)", border: "1.5px solid #d6cbb5", borderRadius: "var(--radius-card-md)" }}
            >
              <div>
                <div className="num" style={{ fontSize: "12.5px", color: "var(--faint)", textDecoration: "line-through" }}>
                  {formatBRL(full)}
                </div>
                <div className="flex items-baseline gap-2">
                  <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: "26px", fontWeight: 700, color: "var(--ink-strong)" }}>{formatBRL(combo)}</span>
                  <span style={{ fontSize: "11.5px", color: "var(--amber-deep)", fontWeight: 700 }}>economize {formatBRL(save)}</span>
                </div>
              </div>
              <button
                onClick={addKit}
                className="inline-flex items-center gap-2 rounded-pill cursor-pointer"
                style={{ background: "var(--primary)", color: "#fff", padding: "13px 24px", fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "14.5px", boxShadow: "var(--shadow-buy-cta-sm)" }}
              >
                <ShoppingBag size={16} strokeWidth={2.2} /> Adicionar kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
