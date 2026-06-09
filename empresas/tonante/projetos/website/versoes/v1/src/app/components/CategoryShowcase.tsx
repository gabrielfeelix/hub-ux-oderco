"use client";

import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts } from "./productsData";
import { getCatalogHref } from "./productPresentation";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader } from "./section";

interface CategoryItem {
  label: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

const catImg = (cat: string) =>
  allProducts.find((p) => p.category === cat && p.image?.startsWith("http"))?.image ?? "";

const CATEGORIES: CategoryItem[] = [
  { label: "Violões", description: "A alma da Tonante desde 1954 — do nylon clássico ao eletroacústico de palco.", image: catImg("Violões"), href: getCatalogHref({ category: "Violões" }), cta: "Ver violões" },
  { label: "Guitarras", description: "Para quem leva o palco a sério. Humbucker, single-coil, HSS — do limpo ao distorcido.", image: catImg("Guitarras"), href: getCatalogHref({ category: "Guitarras" }), cta: "Ver guitarras" },
  { label: "Contrabaixos", description: "O peso certo do groove. Jazz e Precision, 4 cordas, passivos e ativos.", image: catImg("Contrabaixos"), href: getCatalogHref({ category: "Contrabaixos" }), cta: "Ver contrabaixos" },
  { label: "Cordas & Encordoamentos", description: "O toque que muda tudo. Para violão, guitarra, baixo, ukulele e viola.", image: catImg("Cordas & Encordoamentos"), href: getCatalogHref({ category: "Cordas & Encordoamentos" }), cta: "Ver cordas" },
  { label: "Acessórios", description: "O que completa o seu som — capotraste, afinador, palhetas, cabos e mais.", image: catImg("Acessórios"), href: getCatalogHref({ category: "Acessórios" }), cta: "Ver acessórios" },
  { label: "Suportes", description: "Seu instrumento sempre seguro. Suportes, pedestais, estantes e banquetas.", image: catImg("Suportes"), href: getCatalogHref({ category: "Suportes" }), cta: "Ver suportes" },
];

const GAP_PX = 24;

export function CategoryShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      className="relative"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-sm)",
        background: "var(--surface-0)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="px-5 md:px-[72px] mb-10 md:mb-12">
        <div className="mx-auto" style={{ maxWidth: "1600px" }}>
          <SectionHeader
            eyebrow="EXPLORE"
            title="Equipamentos por categoria"
            size="lg"
            weight={700}
            animated={false}
            titleStyle={{ maxWidth: "640px" }}
          />
        </div>
      </div>

      {/* Carousel — native horizontal scroll (touch swipe on mobile, arrows on desktop) */}
      <div className="relative">
        <div style={{ height: "clamp(300px, 56vw, 460px)" }}>
          <div
            ref={trackRef}
            className="category-track flex h-full overflow-x-auto snap-x snap-mandatory"
            style={{
              gap: `${GAP_PX}px`,
              paddingLeft: `${GAP_PX}px`,
              paddingRight: `${GAP_PX}px`,
              scrollbarWidth: "none",
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="flex-shrink-0 relative overflow-hidden h-full group category-card category-active snap-start"
                style={{
                  width: "clamp(260px, 82vw, calc((100% - 48px) / 3))",
                  borderRadius: "var(--radius-card-xl)",
                  border: "1px solid transparent",
                  boxShadow:
                    "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 18px -6px rgba(200, 120, 0,0.2), inset 0 1px 0 rgba(var(--foreground-rgb), 0.06)",
                  transition: "border-color 320ms ease, box-shadow 320ms ease",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: "var(--radius-card-xl)",
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(200, 120, 0,0.45) 0%, rgba(200, 120, 0,0.05) 45%, rgba(200, 120, 0,0.35) 100%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    zIndex: 5,
                  }}
                />
                <div className="absolute inset-0 overflow-hidden">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)",
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                  <div className="max-w-[460px]">
                    <h3
                      className="text-ink-strong mb-2"
                      style={{
                        fontFamily: "var(--font-family-figtree)",
                        fontSize: "clamp(22px, 2.4vw, 34px)",
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                      }}
                    >
                      {cat.label}
                    </h3>
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "clamp(12px, 1vw, 14px)",
                        lineHeight: 1.5,
                        color: "rgba(var(--foreground-rgb), 0.85)",
                        textShadow: "0 1px 6px rgba(0,0,0,0.55)",
                      }}
                    >
                      {cat.description}
                    </p>
                    <Link
                      to={cat.href}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 transition-transform hover:scale-[1.04] active:scale-[0.97]"
                      style={{
                        background:
                          "var(--gradient-brand)",
                        color: "white",
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        boxShadow: "0 14px 32px -10px rgba(200, 120, 0,0.6)",
                      }}
                    >
                      {cat.cta} <ArrowRight size={13} strokeWidth={2.4} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollByPage(-1)}
          aria-label="Anterior"
          className="absolute left-4 md:left-6 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(15, 15, 16, 0.85)",
            border: "1px solid rgba(var(--foreground-rgb), 0.12)",
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 28px -8px rgba(0,0,0,0.6)",
          }}
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>
        <button
          onClick={() => scrollByPage(1)}
          aria-label="Próximo"
          className="absolute right-4 md:right-6 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(15, 15, 16, 0.85)",
            border: "1px solid rgba(var(--foreground-rgb), 0.12)",
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 28px -8px rgba(0,0,0,0.6)",
          }}
        >
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* Mobile-only position dots driven by native scroll */}
      <CarouselDots trackRef={trackRef} className="mt-6" />
    </section>
  );
}
