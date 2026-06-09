"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts, type Product } from "./productsData";
import { getCatalogHref, getPrimaryProductImage } from "./productPresentation";

// Hero — carrossel de banners (porta HERO C do protótipo _ref/src/hero.jsx).
// 3 slides em palco centralizado, gradiente escuro por slide, kicker + título
// serif com acento itálico, CTA branco, produto em destaque + tagline.

const pickCat = (cat: string): Product | undefined =>
  allProducts.find((p) => p.category === cat && p.image?.startsWith("http")) ??
  allProducts.find((p) => p.category === cat);

type Slide = {
  kicker: string;
  title: string;
  accent: string;
  sub: string;
  cta: string;
  href: string;
  tones: [string, string];
  product?: Product;
  tagline: string;
  taglineSub: string;
};

const slides: Slide[] = [
  {
    kicker: "Linha de violões · Rei dos Violões",
    title: "A alma da",
    accent: "Tonante.",
    sub: "Do nylon ao eletroacústico, o violão que vira história. Em até 12x sem juros.",
    cta: "Comprar violões",
    href: getCatalogHref({ category: "Violões" }),
    tones: ["#b5793c", "#6e4220"],
    product: pickCat("Violões"),
    tagline: "12x",
    taglineSub: "sem juros",
  },
  {
    kicker: "Feita de Histórias · Desde 1954",
    title: "Música para",
    accent: "todos.",
    sub: "Mais de meio século conectando gente à música. Conheça a loja completa.",
    cta: "Explorar a loja",
    href: "/produtos",
    tones: ["#2a2018", "#0e0a06"],
    product: pickCat("Guitarras"),
    tagline: "70",
    taglineSub: "anos",
  },
  {
    kicker: "Guitarras & Contrabaixos",
    title: "O palco é",
    accent: "seu.",
    sub: "Timbre, sustain e atitude. Para quem leva o som a sério.",
    cta: "Ver guitarras",
    href: getCatalogHref({ category: "Guitarras" }),
    tones: ["#7e3a24", "#3e160e"],
    product: pickCat("Contrabaixos"),
    tagline: "NEW",
    taglineSub: "drop 2026",
  },
];

function BannerSlide({ s, active }: { s: Slide; active: boolean }) {
  const [a, b] = s.tones;
  const navigate = useNavigate();
  return (
    <div
      className="grain absolute inset-0 overflow-hidden"
      style={{
        borderRadius: "var(--radius-card-xl)",
        background: `radial-gradient(120% 130% at 78% 12%, ${a}, ${b})`,
        color: "#fff",
        boxShadow: active ? "var(--shadow-float)" : "none",
      }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 90% at 18% 30%, rgba(0,0,0,.30), transparent 60%)" }} />
      <img
        src="/brand/tonante-symbol-white.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ right: "-4%", bottom: "-22%", width: "46%", opacity: 0.14, transform: "rotate(-8deg)" }}
      />
      <div className="relative z-[2] grid h-full grid-cols-1 items-center gap-6 p-7 md:grid-cols-[1.15fr_0.85fr] md:p-[clamp(26px,4vw,60px)]">
        <div>
          <span className="label" style={{ color: "rgba(255,255,255,.85)" }}>{s.kicker}</span>
          <h2
            className="mt-3.5"
            style={{ fontFamily: "var(--font-family-figtree)", fontWeight: 700, fontSize: "clamp(30px,5vw,68px)", lineHeight: 0.92, letterSpacing: "-0.02em", margin: "14px 0 0" }}
          >
            {s.title}
            <br />
            <span style={{ fontStyle: "italic", color: "#ffd9a0" }}>{s.accent}</span>
          </h2>
          <p className="mt-3.5 max-w-[380px]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "clamp(14px,1.4vw,18px)", color: "rgba(255,255,255,.9)", lineHeight: 1.55 }}>
            {s.sub}
          </p>
          <button
            onClick={() => navigate(s.href)}
            className="mt-6 inline-flex items-center gap-2.5 rounded-pill cursor-pointer transition-transform hover:-translate-y-0.5"
            style={{ background: "#fff", color: "var(--ink-strong)", padding: "14px 26px", fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "16px" }}
          >
            {s.cta} <ArrowRight size={18} strokeWidth={2.4} style={{ color: "var(--amber-deep)" }} />
          </button>
        </div>

        {/* produto + tagline */}
        <div className="relative hidden h-full place-items-center md:grid">
          {s.product && (
            <div
              className="relative overflow-hidden"
              style={{
                width: "min(72%, 220px)",
                transform: "rotate(-4deg)",
                borderRadius: "var(--radius-card-lg)",
                background: "linear-gradient(160deg, #faf7f0, #efe9dc)",
                boxShadow: "0 26px 44px rgba(0,0,0,.45)",
              }}
            >
              <div className="relative aspect-[3/4]">
                <ImageWithFallback
                  src={getPrimaryProductImage(s.product)}
                  alt={s.product.name}
                  className="absolute inset-0 h-full w-full object-contain p-4"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            </div>
          )}
          <div className="num absolute bottom-2 right-0 text-right">
            <div style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(38px,6vw,80px)", fontWeight: 800, lineHeight: 0.8 }}>{s.tagline}</div>
            <div className="label" style={{ color: "rgba(255,255,255,.85)" }}>{s.taglineSub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5200);
    return () => clearInterval(t);
  }, [paused, n]);

  const goTo = (i: number) => setIdx((i + n) % n);

  return (
    <section
      className="px-5 pt-[calc(70px+var(--announce-h))] md:px-[72px] md:pt-[calc(150px+var(--announce-h))] notebook:pt-[calc(100px+var(--announce-h))]"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="relative mx-auto" style={{ maxWidth: "1600px" }}>
        {/* palco */}
        <div className="relative overflow-hidden" style={{ height: "clamp(360px, 40vw, 540px)", borderRadius: "var(--radius-card-xl)" }}>
          {slides.map((s, i) => {
            let off = i - idx;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const isActive = off === 0;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  top: 8,
                  bottom: 8,
                  left: "8%",
                  width: "84%",
                  transform: `translateX(${off * 80}%) scale(${isActive ? 1 : 0.9})`,
                  opacity: Math.abs(off) > 1 ? 0 : isActive ? 1 : 0.5,
                  transition: "transform .6s cubic-bezier(.22,1,.36,1), opacity .5s ease",
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: isActive ? 3 : 1,
                }}
              >
                <BannerSlide s={s} active={isActive} />
              </div>
            );
          })}
        </div>
        {/* setas */}
        <button
          onClick={() => goTo(idx - 1)}
          aria-label="Anterior"
          className="absolute top-1/2 z-[5] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
          style={{ left: "calc(8% - 22px)", background: "var(--surface-1)", border: "1px solid #e4dccc", color: "var(--ink-strong)", boxShadow: "var(--shadow-card)" }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => goTo(idx + 1)}
          aria-label="Próximo"
          className="absolute top-1/2 z-[5] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
          style={{ right: "calc(8% - 22px)", background: "var(--surface-1)", border: "1px solid #e4dccc", color: "var(--ink-strong)", boxShadow: "var(--shadow-card)" }}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* dots + pause */}
      <div className="mt-7 flex items-center justify-center gap-3.5">
        <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Reproduzir" : "Pausar"} className="grid place-items-center cursor-pointer" style={{ color: "var(--muted)" }}>
          {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-[9px] rounded-full transition-all cursor-pointer"
              style={{ width: i === idx ? 28 : 9, background: i === idx ? "var(--amber)" : "#d6cbb5", padding: 0, border: "none" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
