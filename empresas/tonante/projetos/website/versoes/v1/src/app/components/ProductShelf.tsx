"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts, type Product } from "./productsData";
import {
  getPrimaryProductImage,
  getVisibleCatalogProducts,
} from "./productPresentation";
import { getCardSpecs } from "./productAttributes";
import { getInstallmentCount, getInstallmentValue, getPixPrice, formatBRL } from "./productEnhancements";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader, CarouselNavButton } from "./section";
import { ProductCard } from "./ProductCard";

/** Card campeão (#1 do leaderboard, §6.7): 2× largura, medalhão, "mais amado". */
function ChampionCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const specs = getCardSpecs(product);
  const pix = getPixPrice(product);
  const n = getInstallmentCount(product.priceNum);
  return (
    <article
      className="snap-start flex-shrink-0 overflow-hidden rounded-card-lg border bg-surface-1"
      style={{ width: "clamp(300px, 90vw, 600px)", borderColor: "rgba(200,120,0,0.4)", boxShadow: "var(--shadow-category-active)" }}
    >
      <div className="grid h-full grid-cols-1 sm:grid-cols-2">
        <Link to={`/produto/${product.id}`} className="relative block">
          <div className="deal-image-bg relative aspect-square overflow-hidden p-5">
            <ImageWithFallback
              src={getPrimaryProductImage(product)}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-contain p-[8%]"
              style={{ mixBlendMode: "multiply" }}
            />
            <span
              className="num absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "var(--gradient-buy)", color: "#fff", fontFamily: "var(--font-family-figtree)", fontWeight: 700, fontSize: "20px", boxShadow: "var(--shadow-medallion)" }}
            >
              1
            </span>
          </div>
        </Link>
        <div className="flex flex-col gap-2.5 p-5">
          <span className="label" style={{ color: "var(--amber-deep)", fontSize: "var(--text-eyebrow)" }}>
            ★ O mais amado da semana
          </span>
          <Link to={`/produto/${product.id}`}>
            <h3 className="line-clamp-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "18px", fontWeight: 600, lineHeight: 1.3, color: "var(--ink-strong)" }}>
              {product.name}
            </h3>
          </Link>
          {specs.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
              {specs.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {i > 0 && <span style={{ width: 3, height: 3, borderRadius: 9999, background: "var(--amber)" }} />}
                  {s}
                </span>
              ))}
            </div>
          )}
          <span className="flex items-center gap-1.5">
            <span className="flex" style={{ color: "var(--amber)" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} strokeWidth={1.5} fill={product.rating - i >= 0.5 ? "var(--amber)" : "none"} stroke={product.rating - i >= 0.5 ? "var(--amber)" : "rgba(26,23,20,0.3)"} />
              ))}
            </span>
            <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
              {product.rating.toFixed(1)} · {product.reviews}
            </span>
          </span>
          <div className="mt-auto pt-1">
            <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-price-xl)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink-strong)" }}>
              {product.price}
            </span>
            <div className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-soft)", marginTop: 2 }}>
              No PIX <strong style={{ color: "var(--amber-deep)" }}>{formatBRL(pix)}</strong> · ou {n}x de {formatBRL(getInstallmentValue(product.priceNum))}
            </div>
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-pill cursor-pointer"
              style={{ background: "var(--primary)", color: "#fff", padding: "12px 16px", fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "14.5px", boxShadow: "var(--shadow-buy-cta-sm)" }}
            >
              <ShoppingBag size={17} strokeWidth={2} /> Comprar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export interface ShelfTab {
  /** rótulo do pill de aba */
  tabLabel: string;
  eyebrow: string;
  title: string;
  productIds: number[];
  showRanking?: boolean;
}

interface ProductShelfProps {
  label: string;
  title: string;
  productIds: number[];
  showRanking?: boolean;
  emphasizeDiscount?: boolean;
  /** Abas alternáveis (ex.: Mais vendidos | Lançamentos). Quando presente,
      eyebrow/título/produtos vêm da aba ativa; props soltas viram fallback. */
  tabs?: ShelfTab[];
}

function getSubtitle(product: Product): string | null {
  if (product.tags && product.tags.length > 0) {
    const filtered = product.tags.filter(
      (t) => t.toLowerCase() !== product.category.toLowerCase() && t.length > 1,
    );
    if (filtered.length >= 2) return `${filtered[0]}  |  ${filtered[1]}`;
    if (filtered.length === 1) return filtered[0];
  }
  if (product.brand && product.category) {
    return `${product.brand}  |  ${product.category}`;
  }
  return product.category ?? null;
}


export function ProductShelf({
  label,
  title,
  productIds,
  showRanking = false,
  emphasizeDiscount = false,
  tabs,
}: ProductShelfProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();

  const current = tabs?.[activeTab];
  const effectiveEyebrow = current?.eyebrow ?? label;
  const effectiveTitle = current?.title ?? title;
  const effectiveIds = current?.productIds ?? productIds;
  // com abas, ranking é decisão da aba (ausente = false); sem abas, da prop
  const effectiveRanking = tabs ? (current?.showRanking ?? false) : showRanking;

  const selectTab = (i: number) => {
    setActiveTab(i);
    scrollRef.current?.scrollTo({ left: 0 });
  };

  const products = useMemo(() => {
    const visible = getVisibleCatalogProducts(allProducts);
    const resolved = effectiveIds
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean) as Product[];
    return resolved.length > 0 ? resolved : visible.slice(0, 8);
  }, [effectiveIds]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [products]);

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstElementChild as HTMLElement)?.getBoundingClientRect().width ?? 380;
    const cardWithGap = cardWidth + 24;
    el.scrollBy({ left: dir * cardWithGap * 2, behavior: "smooth" });
  };

  const navBtn = (onClick: () => void, disabled: boolean, label: string, side: "left" | "right") => (
    <CarouselNavButton
      direction={side}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-[228px] -translate-y-1/2 ${side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}`}
    />
  );

  return (
    <section
      ref={ref}
      className="px-5 py-12 md:px-[72px] md:py-14"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow={effectiveEyebrow} title={effectiveTitle} size="sm" weight={600} />
          {tabs && tabs.length > 1 && (
            <div role="tablist" aria-label={title} className="flex gap-2">
              {tabs.map((t, i) => {
                const on = i === activeTab;
                return (
                  <button
                    key={t.tabLabel}
                    role="tab"
                    aria-selected={on}
                    onClick={() => selectTab(i)}
                    className="rounded-pill cursor-pointer transition-colors"
                    style={{
                      padding: "9px 18px",
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "14px",
                      fontWeight: 600,
                      background: on ? "var(--ink-strong)" : "var(--surface-1)",
                      color: on ? "var(--background)" : "var(--ink-strong)",
                      border: `1.5px solid ${on ? "var(--ink-strong)" : "var(--edge)"}`,
                    }}
                  >
                    {t.tabLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative">
          {navBtn(() => scrollByCards(-1), !canPrev, "Anterior", "left")}
          {navBtn(() => scrollByCards(1), !canNext, "Próximo", "right")}
          <div
            ref={scrollRef}
            className="shelf-track flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, i) => {
              const add = (p: Product) =>
                addItem({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) });
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.04 * i }}
                >
                  {effectiveRanking && i === 0 ? (
                    <ChampionCard product={product} onAdd={add} />
                  ) : (
                    <ProductCard
                      product={product}
                      variant="shelf"
                      swatches
                      favorite
                      rank={effectiveRanking ? i + 1 : undefined}
                      emphasizeDiscount={emphasizeDiscount}
                      className="snap-start flex-shrink-0"
                      style={{ width: "clamp(264px, 78vw, 380px)" }}
                      onAdd={add}
                      onFavorite={(p) =>
                        addFavorite({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: getPrimaryProductImage(p),
                        })
                      }
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
          <CarouselDots trackRef={scrollRef} />
        </div>
      </div>
    </section>
  );
}
