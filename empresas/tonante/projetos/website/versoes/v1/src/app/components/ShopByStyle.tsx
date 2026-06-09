"use client";

import { useMemo, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts } from "./productsData";
import { categories as CATS } from "./productsData";
import { getPrimaryProductImage } from "./productPresentation";
import { ProductCard } from "./ProductCard";

// ShopByStyle — "Pra cada jeito de tocar" (porta _ref/src/home_sections.jsx
// ShopByStyle): abas circulares de categoria + grid de 4 produtos.
const catPhoto = (label: string) =>
  allProducts.find((p) => p.category === label && p.image?.startsWith("http"))?.image ?? "";

export function ShopByStyle() {
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();
  const [cat, setCat] = useState(CATS[0]);
  const list = useMemo(() => allProducts.filter((p) => p.category === cat).slice(0, 4), [cat]);

  return (
    <section className="px-5 text-center md:px-[72px]" style={{ background: "var(--surface-0)", paddingTop: "var(--space-section-md)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 14 }}>
          Feito pra você
        </p>
        <h2 style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(28px,3.8vw,48px)", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
          Pra cada jeito de <span style={{ fontStyle: "italic", color: "var(--amber)" }}>tocar</span>
        </h2>

        {/* abas */}
        <div className="no-bar my-9 flex flex-wrap justify-center gap-3.5">
          {CATS.map((c) => {
            const photo = catPhoto(c);
            const active = cat === c;
            return (
              <button key={c} onClick={() => setCat(c)} className="flex w-24 flex-col items-center gap-2.5 cursor-pointer">
                <span
                  className="grid place-items-center overflow-hidden rounded-full"
                  style={{
                    width: 76,
                    height: 76,
                    border: `2px solid ${active ? "var(--amber)" : "#e4dccc"}`,
                    background: photo ? "linear-gradient(160deg,#faf7f0,#efe9dc)" : "radial-gradient(circle at 35% 25%, #c9a06a, #6e4220)",
                    transform: active ? "scale(1.06)" : "scale(1)",
                    transition: "all .25s",
                    filter: active ? "none" : "saturate(.85)",
                  }}
                >
                  {photo ? (
                    <ImageWithFallback src={photo} alt={c} className="h-full w-full object-cover" />
                  ) : (
                    <img src="/brand/tonante-symbol-white.png" alt="" style={{ width: "58%", opacity: 0.92 }} />
                  )}
                </span>
                <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: active ? 700 : 500, color: active ? "var(--ink-strong)" : "var(--muted)", lineHeight: 1.15 }}>
                  {c}
                </span>
              </button>
            );
          })}
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 gap-4 text-left md:grid-cols-4 md:gap-6">
          {list.map((p) => (
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
      </div>
    </section>
  );
}
