"use client";

import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts } from "./productsData";
import { getCatalogHref } from "./productPresentation";

// Categories — "O que você toca hoje?" (porta _ref/src/home.jsx Categories +
// CategoryCard): grid com card grande (Violões) + fotos representativas, overlay
// escuro, "N produtos" + nome serif + blurb + seta.

type Cat = { label: string; blurb: string };
const CATS: Cat[] = [
  { label: "Violões", blurb: "A alma da Tonante desde 1954." },
  { label: "Guitarras", blurb: "Para quem leva o palco a sério." },
  { label: "Contrabaixos", blurb: "O peso certo do groove." },
  { label: "Acessórios", blurb: "O que completa o seu som." },
  { label: "Cordas & Encordoamentos", blurb: "O toque que muda tudo." },
  { label: "Suportes", blurb: "Seu instrumento sempre seguro." },
];

const meta = (label: string) => {
  const inCat = allProducts.filter((p) => p.category === label);
  const photo = inCat.find((p) => p.image?.startsWith("http"))?.image ?? "";
  return { count: inCat.length, photo };
};

function CategoryCard({ cat, big }: { cat: Cat; big?: boolean }) {
  const [hover, setHover] = useState(false);
  const { count, photo } = meta(cat.label);
  return (
    <Link
      to={getCatalogHref({ category: cat.label })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative flex flex-col justify-end overflow-hidden ${big ? "md:col-span-2" : ""}`}
      style={{
        borderRadius: "var(--radius-card-lg)",
        minHeight: big ? 320 : 220,
        padding: 24,
        color: "#fff",
        background: "radial-gradient(120% 120% at 75% 10%, #b5793c, #6e4220)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "transform .35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {photo && (
        <ImageWithFallback
          src={photo}
          alt={cat.label}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hover ? "scale(1.06)" : "scale(1)" }}
        />
      )}
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: photo
            ? "linear-gradient(180deg, rgba(20,16,12,.15) 0%, rgba(20,16,12,.40) 45%, rgba(20,16,12,.85) 100%)"
            : "transparent",
        }}
      />
      {!photo && (
        <img
          src="/brand/tonante-symbol-white.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{ right: -20, top: -20, width: big ? 200 : 130, opacity: 0.18, transform: hover ? "rotate(8deg)" : "none", transition: "transform .5s" }}
        />
      )}
      <div className="relative z-[2]">
        <span className="label" style={{ color: "rgba(255,255,255,.82)", fontSize: "9.5px" }}>
          {count} produtos
        </span>
        <div style={{ fontFamily: "var(--font-family-figtree)", fontSize: big ? "40px" : "26px", fontWeight: 700, lineHeight: 1, margin: "8px 0 6px" }}>
          {cat.label}
        </div>
        <div className="flex items-center gap-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "14px", color: "rgba(255,255,255,.88)" }}>
          {cat.blurb}
          <ArrowRight size={16} style={{ transform: hover ? "translateX(4px)" : "none", transition: "transform .3s" }} />
        </div>
      </div>
    </Link>
  );
}

export function CategoryShowcase() {
  return (
    <section className="px-5 md:px-[72px]" style={{ background: "var(--surface-0)", paddingTop: "var(--space-section-lg)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>
              Navegue por família
            </p>
            <h2 className="text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(30px,4.4vw,52px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>
              O que você toca hoje?
            </h2>
          </div>
          <Link to="/produtos" className="hidden items-center gap-2 md:inline-flex" style={{ fontFamily: "var(--font-family-inter)", fontSize: "15px", fontWeight: 600, color: "var(--ink-strong)" }}>
            Ver tudo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATS.map((c, i) => (
            <CategoryCard key={c.label} cat={c} big={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
