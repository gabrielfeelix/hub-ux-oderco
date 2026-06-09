"use client";

import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts } from "./productsData";
import { getPrimaryProductImage } from "./productPresentation";
import { ProductCard } from "./ProductCard";

// PromoPanel — "Hall das ofertas / Tudo que está em promoção" (porta
// _ref/src/home_sections.jsx PromoPanel): grid de 4 cards + faixa âmbar.
export function PromoPanel() {
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();
  const onSale = useMemo(() => allProducts.filter((p) => p.oldPriceNum && p.oldPriceNum > p.priceNum), []);
  const grid = onSale.slice(0, 4);
  const thumbs = onSale.slice(0, 5);
  const promoCount = onSale.length;

  if (grid.length === 0) return null;

  return (
    <section className="px-5 md:px-[72px]" style={{ background: "var(--surface-0)", paddingTop: "var(--space-section-md)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-8">
          <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>
            Hall das ofertas
          </p>
          <h2 className="text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(30px,4.4vw,52px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>
            Tudo que está em promoção
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {grid.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              swatches
              favorite
              onAdd={(pr) => addItem({ id: pr.id, name: pr.name, price: pr.price, image: getPrimaryProductImage(pr) })}
              onFavorite={(pr) => addFavorite({ id: pr.id, name: pr.name, price: pr.price, image: getPrimaryProductImage(pr) })}
            />
          ))}
        </div>

        {/* faixa âmbar */}
        <div
          data-keep-dark
          className="grain relative mt-6 overflow-hidden"
          style={{ borderRadius: "var(--radius-card-xl)", color: "#fff", background: "radial-gradient(120% 160% at 85% 10%, #e08c12, #a05f00)", padding: "clamp(26px,3vw,40px)" }}
        >
          <img src="/brand/tonante-symbol-white.png" alt="" aria-hidden="true" className="pointer-events-none absolute select-none" style={{ left: "-3%", bottom: "-40%", width: 220, opacity: 0.14 }} />
          <div className="relative z-[2] flex flex-wrap items-center justify-between gap-7">
            <div className="flex flex-wrap items-center gap-6">
              <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(48px,6vw,76px)", fontWeight: 800, lineHeight: 0.85 }}>+{promoCount}</span>
              <div style={{ maxWidth: 360 }}>
                <span className="label mb-2 inline-block rounded-pill px-3 py-1" style={{ background: "rgba(255,255,255,.22)", color: "#fff" }}>
                  Ofertas da semana
                </span>
                <h3 style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 700, lineHeight: 1.02, margin: 0 }}>
                  Itens em promoção, num só lugar
                </h3>
                <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "14.5px", color: "rgba(255,255,255,.9)", margin: "8px 0 0" }}>
                  Descontos de verdade em violões, guitarras e acessórios — atualizados toda semana.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex">
                {thumbs.map((p, i) => (
                  <div
                    key={p.id}
                    title={p.name}
                    className="relative overflow-hidden rounded-full"
                    style={{ width: 56, height: 56, border: "2px solid #a05f00", marginLeft: i ? -16 : 0, background: "#fffdf8", boxShadow: "0 4px 10px rgba(0,0,0,.2)" }}
                  >
                    <ImageWithFallback src={getPrimaryProductImage(p)} alt={p.name} className="absolute inset-0 h-full w-full object-contain p-1" style={{ mixBlendMode: "multiply" }} />
                  </div>
                ))}
              </div>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-pill cursor-pointer whitespace-nowrap"
                style={{ background: "#fff", color: "var(--amber-deep)", padding: "15px 28px", fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "15.5px" }}
              >
                Ver todas as ofertas <ArrowRight size={17} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
