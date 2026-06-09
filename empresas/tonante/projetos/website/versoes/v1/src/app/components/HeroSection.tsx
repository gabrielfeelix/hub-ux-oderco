"use client";

import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts } from "./productsData";
import { getCatalogHref, getPrimaryProductImage } from "./productPresentation";

// Hero editorial Tonante (porta o design do protótipo de marca _ref/src/hero.jsx):
// símbolo gigante de fundo, headline serif "Feita de Histórias", CTAs, stats e
// um produto em destaque.
const featured =
  allProducts.find((p) => p.category === "Violões" && p.image?.startsWith("http")) ??
  allProducts.find((p) => p.image?.startsWith("http")) ??
  allProducts[0];

const stats: [string, string][] = [
  ["70+", "anos de história"],
  ["6", "famílias de produto"],
  [`${allProducts.length}`, "instrumentos"],
  ["4.8", "nota dos clientes"],
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pb-10 pt-[calc(80px+var(--announce-h))] md:pb-16 md:pt-[calc(170px+var(--announce-h))] notebook:pt-[calc(108px+var(--announce-h))]"
      style={{ background: "var(--surface-0)" }}
    >
      {/* símbolo gigante de fundo */}
      <img
        src="/brand/tonante-symbol-black.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute hidden select-none md:block"
        style={{ right: "-7%", top: "-12%", width: 560, opacity: 0.04, transform: "rotate(8deg)" }}
      />

      <div className="relative mx-auto grid w-full grid-cols-1 items-center gap-10 px-5 md:grid-cols-[1.04fr_0.96fr] md:gap-12 md:px-[72px]" style={{ maxWidth: "1600px" }}>
        {/* texto */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 20 }}>
            Instrumentos musicais · Desde 1954
          </p>
          <h1
            className="text-ink-strong"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontWeight: 700,
              fontSize: "clamp(46px, 8vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Feita de
            <br />
            <span style={{ fontStyle: "italic", color: "var(--amber)" }}>Histórias</span>.
          </h1>
          <p
            className="mt-6 max-w-[480px]"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "clamp(15px, 1.4vw, 18px)",
              color: "var(--ink-soft)",
              lineHeight: 1.6,
            }}
          >
            Marca brasileira tradicional, renovada. Violões, guitarras e tudo que conecta gente à
            música — com o cuidado de quem faz instrumentos há mais de meio século.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 rounded-pill cursor-pointer transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "15px 30px",
                fontFamily: "var(--font-family-inter)",
                fontWeight: 600,
                fontSize: "16px",
                boxShadow: "var(--shadow-brand-cta)",
              }}
            >
              Explorar a loja <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
            <Link
              to={getCatalogHref({ category: "Violões" })}
              className="inline-flex items-center gap-2 rounded-pill cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                background: "transparent",
                color: "var(--ink-strong)",
                padding: "15px 28px",
                border: "1.5px solid #d6cbb5",
                fontFamily: "var(--font-family-inter)",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              Ver violões
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
            {stats.map(([n, l]) => (
              <div key={l}>
                <div
                  className="num text-ink-strong"
                  style={{ fontFamily: "var(--font-family-figtree)", fontSize: "32px", fontWeight: 700, lineHeight: 1 }}
                >
                  {n}
                </div>
                <div className="label" style={{ fontSize: "9.5px", marginTop: 7 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* destaque */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden md:block"
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "var(--radius-card-xl)",
                background: "linear-gradient(160deg, #faf7f0, #efe9dc)",
                border: "1px solid #e4dccc",
                boxShadow: "var(--shadow-float)",
              }}
            >
              {/* glow âmbar */}
              <div
                className="pointer-events-none absolute"
                style={{ inset: 0, background: "radial-gradient(60% 50% at 70% 25%, rgba(200,120,0,0.16), transparent 70%)" }}
              />
              <Link to={`/produto/${featured.id}`} className="block">
                <div className="relative flex h-[420px] items-center justify-center p-10">
                  <ImageWithFallback
                    src={getPrimaryProductImage(featured)}
                    alt={featured.name}
                    className="max-h-full w-auto object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <span className="label absolute left-6 top-6" style={{ color: "var(--amber-deep)" }}>
                    Destaque
                  </span>
                </div>
              </Link>
              <div className="flex items-center justify-between gap-4 border-t px-6 py-5" style={{ borderColor: "#e4dccc" }}>
                <div className="min-w-0">
                  <div
                    className="truncate text-ink-strong"
                    style={{ fontFamily: "var(--font-family-figtree)", fontSize: "19px", fontWeight: 600 }}
                  >
                    {featured.name}
                  </div>
                  <div
                    style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: 600, color: "var(--amber-deep)", marginTop: 2 }}
                  >
                    {featured.price}
                  </div>
                </div>
                <Link
                  to={`/produto/${featured.id}`}
                  aria-label="Conhecer destaque"
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-105"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  <ShoppingBag size={18} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
