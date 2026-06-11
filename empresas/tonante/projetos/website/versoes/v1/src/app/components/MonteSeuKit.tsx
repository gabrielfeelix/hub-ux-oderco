"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Plus, Check, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage } from "./productPresentation";
import { getPixPrice, formatBRL } from "./productEnhancements";

// MonteSeuKit — combo builder (porta _ref/src/home_sections.jsx FeaturedEssentials).
// Presets clicáveis (§6.9) pré-populam base + add-ons. 8% off no kit.
const findOne = (...kw: string[]) =>
  allProducts.find((p) => kw.some((k) => p.name.toLowerCase().includes(k.toLowerCase())));

function resolveAddons(groups: string[][], exclude: Product): Product[] {
  const out: Product[] = [];
  for (const g of groups) {
    const hit = allProducts.find(
      (p) =>
        g.some((k) => p.name.toLowerCase().includes(k.toLowerCase())) &&
        p.id !== exclude.id &&
        !out.some((o) => o.id === p.id),
    );
    if (hit) out.push(hit);
  }
  return out;
}

type Preset = { key: string; label: string; desc: string; base: Product; addons: Product[] };
const PRESETS: Preset[] = [
  { key: "iniciante", label: "Kit Iniciante", desc: "Pra dar os primeiros acordes",
    baseKw: ["Lorenzzo", "Violão Clássico", "Violão"], groups: [["Capa", "Bag", "Case"], ["Afinador"], ["Palheta"]] },
  { key: "palco", label: "Kit Palco", desc: "Pronto pra subir no palco",
    baseKw: ["Cecille", "Guitarra Elétrica", "Guitarra"], groups: [["Cabo DE Guitarra", "Cabo"], ["Correia"], ["Suporte"]] },
  { key: "estudio", label: "Kit Estúdio", desc: "Grave com qualidade",
    baseKw: ["Microfone Profissional", "Microfone", "Podcast"], groups: [["Cabo DE Microf", "Cabo Para Microf", "Cabo"], ["Pedestal", "Suporte"], ["Plug"]] },
].map((r) => {
  const base = findOne(...r.baseKw) ?? allProducts[0];
  return { key: r.key, label: r.label, desc: r.desc, base, addons: resolveAddons(r.groups, base) };
});

export function MonteSeuKit() {
  const { addItem } = useCart();
  const [presetIdx, setPresetIdx] = useState(0);
  const active = PRESETS[presetIdx];
  const base = active.base;
  const addons = active.addons;

  const [sel, setSel] = useState<number[]>(active.addons.map((a) => a.id));
  const chosen = addons.filter((a) => sel.includes(a.id));
  const toggle = (id: number) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const choosePreset = (i: number) => {
    setPresetIdx(i);
    setSel(PRESETS[i].addons.map((a) => a.id));
  };

  const full = base.priceNum + chosen.reduce((s, a) => s + a.priceNum, 0);
  const combo = Math.round(full * 0.92 * 100) / 100;
  const save = Math.round((full - combo) * 100) / 100;

  const addKit = () => {
    [base, ...chosen].forEach((p) => addItem({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) }));
  };

  return (
    <section
      className="px-5 md:px-[72px]"
      style={{ background: "var(--surface-2)", borderTop: "1px solid #e4dccc", borderBottom: "1px solid #e4dccc", paddingTop: 44, paddingBottom: 44 }}
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

        {/* presets — pré-populam o builder em 1 clique (§6.9) */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PRESETS.map((p, i) => {
            const on = i === presetIdx;
            return (
              <button
                key={p.key}
                onClick={() => choosePreset(i)}
                className="flex cursor-pointer items-center gap-3 text-left transition-all"
                style={{
                  background: on ? "var(--ink-strong)" : "var(--surface-1)",
                  color: on ? "var(--background)" : "var(--ink-strong)",
                  border: `1.5px solid ${on ? "var(--ink-strong)" : "var(--edge)"}`,
                  borderRadius: "var(--radius-card-md)",
                  padding: "13px 16px",
                }}
              >
                <span
                  className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full"
                  style={{ background: on ? "var(--amber)" : "var(--surface-2)", color: on ? "#fff" : "var(--amber-deep)" }}
                >
                  <ShoppingBag size={16} strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block" style={{ fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "14.5px", lineHeight: 1.1 }}>
                    {p.label}
                  </span>
                  <span className="block" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px", opacity: 0.72, marginTop: 2 }}>
                    {p.desc}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,420px)_auto_1fr]">
          {/* base */}
          <article className="flex flex-col gap-3" style={{ background: "var(--surface-1)", border: "1px solid #e4dccc", borderRadius: "var(--radius-card-lg)", padding: 16 }}>
            <span className="label" style={{ color: "var(--amber-deep)" }}>
              Instrumento base
            </span>
            <Link to={`/produto/${base.id}`} className="relative block overflow-hidden rounded-[12px]" style={{ background: "#fbfaf6", boxShadow: "inset 0 0 0 1px rgba(26,23,20,0.06)" }}>
              <div className="relative aspect-[4/3]">
                <ImageWithFallback src={getPrimaryProductImage(base)} alt={base.name} className="absolute inset-0 h-full w-full object-contain p-4" style={{ mixBlendMode: "multiply" }} />
              </div>
            </Link>
            <div>
              <Link to={`/produto/${base.id}`} className="text-ink-strong line-clamp-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "15px", fontWeight: 600, lineHeight: 1.35 }}>
                {base.name}
              </Link>
              <div className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-price-lg)", fontWeight: 700, color: "var(--amber-deep)", marginTop: 4 }}>
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
                    className="relative flex cursor-pointer flex-col overflow-hidden text-left"
                    style={{
                      background: "var(--surface-1)",
                      border: `1.5px solid ${on ? "var(--amber)" : "#e4dccc"}`,
                      borderRadius: "var(--radius-card-md)",
                      transition: "border-color .2s",
                    }}
                  >
                    {/* well no topo, flush nos cantos (card clipa) — sem borda
                        âmbar vazando atrás da imagem */}
                    <div className="relative aspect-square" style={{ background: "#fbfaf6" }}>
                      <ImageWithFallback src={getPrimaryProductImage(a)} alt={a.name} className="absolute inset-0 h-full w-full object-contain p-3" style={{ mixBlendMode: "multiply" }} />
                      <span
                        className="absolute right-2.5 top-2.5 grid h-[26px] w-[26px] place-items-center rounded-full"
                        style={{ background: on ? "var(--amber)" : "rgba(255,255,255,0.92)", border: `1.5px solid ${on ? "var(--amber)" : "#d6cbb5"}`, color: on ? "#fff" : "var(--muted)", boxShadow: "0 2px 6px -2px rgba(26,23,20,0.25)" }}
                      >
                        {on ? <Check size={14} strokeWidth={2.6} /> : <Plus size={14} strokeWidth={2.6} />}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                      <div className="line-clamp-2 text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontWeight: 600, fontSize: "13px", lineHeight: 1.2 }}>
                        {a.name}
                      </div>
                      <div style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", color: "var(--amber-deep)" }}>
                        + {formatBRL(getPixPrice(a))}
                      </div>
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
                <div className="num" style={{ fontSize: "var(--text-meta)", color: "var(--ink-meta)", textDecoration: "line-through" }}>
                  {formatBRL(full)}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink-strong)" }}>{formatBRL(combo)}</span>
                  <span className="num" style={{ fontSize: "11.5px", color: "var(--amber-deep)", fontWeight: 700 }}>economize {formatBRL(save)}</span>
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
