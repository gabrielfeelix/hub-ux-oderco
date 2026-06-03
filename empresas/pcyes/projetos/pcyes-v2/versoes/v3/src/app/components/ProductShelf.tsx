"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { useAuth } from "./AuthContext";
import { allProducts, type Product } from "./productsData";
import {
  getPrimaryProductImage,
  getProductSwatches,
  getVisibleCatalogProducts,
} from "./productPresentation";
import { getPreOrderInfo } from "./PreOrderData";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader, CTAButton, DiscountBadge, PreOrderPill } from "./section";

interface ProductShelfProps {
  label: string;
  title: string;
  productIds: number[];
  showRanking?: boolean;
  emphasizeDiscount?: boolean;
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

interface CardProps {
  product: Product;
  rank?: number;
  emphasizeDiscount: boolean;
  onAdd: (product: Product) => void;
  onFavorite: (product: Product) => void;
}

function ProductCard({ product, rank, emphasizeDiscount, onAdd, onFavorite }: CardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedSwatchId, setSelectedSwatchId] = useState<number | null>(null);
  const { isLoggedIn } = useAuth();

  const swatches = getProductSwatches(product);
  const selectedProduct = selectedSwatchId
    ? allProducts.find(p => p.id === selectedSwatchId)
    : product;
  const image = getPrimaryProductImage(selectedProduct);

  const oldPriceNum =
    product.oldPriceNum ?? (emphasizeDiscount ? product.priceNum * 1.18 : 0);
  const discount =
    oldPriceNum > product.priceNum
      ? Math.round(((oldPriceNum - product.priceNum) / oldPriceNum) * 100)
      : 0;
  const preOrderInfo = getPreOrderInfo(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    onFavorite(product);
  };

  return (
    <div
      className="snap-start flex-shrink-0 group"
      style={{ width: "clamp(264px, 78vw, 380px)" }}
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div
          className="relative aspect-[5/6] overflow-hidden transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.10) 0%, rgba(var(--foreground-rgb), 0.03) 100%)",
            borderRadius: "20px",
            border: "1px solid rgba(var(--foreground-rgb), 0.08)",
            boxShadow: "var(--shadow-card-hairline)",
          }}
        >
          {/* Subtle inner shine */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(var(--foreground-rgb), 0.06) 0%, transparent 55%)",
              borderRadius: "20px",
            }}
          />

          <ImageWithFallback
            src={image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-4 md:p-8 transition-transform duration-500 group-hover:scale-[1.05]"
          />

          {rank !== undefined && (
            <span
              className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white"
              style={{
                background: "var(--gradient-brand)",
                fontFamily: "var(--font-family-figtree)",
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                boxShadow: "0 6px 18px -4px rgba(225,6,0,0.55), inset 0 1px 0 rgba(var(--foreground-rgb), 0.18)",
              }}
            >
              {rank}
            </span>
          )}

          {discount > 0 && !preOrderInfo && (
            <DiscountBadge
              percent={discount}
              className="absolute z-20"
              style={{ left: rank !== undefined ? "60px" : "12px", top: "12px" }}
            />
          )}

          {preOrderInfo && (
            <span
              className="absolute z-20"
              style={{
                left: rank !== undefined ? "60px" : "12px",
                top: "12px",
              }}
            >
              <PreOrderPill info={preOrderInfo} />
            </span>
          )}

          {/* Favorite (top-right, on hover) — only when logged in */}
          {isLoggedIn && (
            <button
              onClick={handleFavorite}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full border opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 cursor-pointer"
              style={{
                background: isFavorited ? "rgba(225, 6, 0, 0.2)" : "rgba(0, 0, 0, 0.55)",
                border: isFavorited ? "1px solid rgba(225, 6, 0, 0.8)" : "1px solid rgba(var(--foreground-rgb), 0.15)",
                color: isFavorited ? "#ff2419" : "rgba(var(--foreground-rgb), 0.85)",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Favoritar"
            >
              <Heart size={13} strokeWidth={isFavorited ? 0 : 1.8} fill={isFavorited ? "#ff2419" : "none"} />
            </button>
          )}

          {/* Quick add — floating pill */}
          <CTAButton
            variant="buy-sm"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdd(product);
            }}
            className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 translate-y-0 md:translate-y-2 opacity-100 md:opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 cursor-pointer"
          >
            <ShoppingBag size={14} strokeWidth={2} /> Comprar
          </CTAButton>
        </div>

        <div className="mt-4 px-1">
          <h3
            className="line-clamp-1 text-white"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            {product.name}
          </h3>

          <div className="mt-3">
            {oldPriceNum > product.priceNum && (
              <p
                className="line-through leading-none mb-1"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "13px",
                  color: "rgba(var(--foreground-rgb), 0.38)",
                }}
              >
                {product.oldPrice ?? `R$ ${oldPriceNum.toFixed(2).replace(".", ",")}`}
              </p>
            )}
            <p
              className="text-white leading-none"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.015em",
              }}
            >
              {product.price}
            </p>
            <p className="mt-1.5 leading-tight" style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px", color: "rgba(var(--foreground-rgb), 0.55)" }}>
              No PIX ou 10x de R$ {(product.priceNum / 10).toFixed(2).replace(".", ",")}
            </p>
          </div>

        </div>
      </Link>

      {swatches.length > 0 && (
        <div className="mt-2.5 px-1 flex items-center gap-1.5">
          {swatches.slice(0, 5).map((s) => (
            <button
              key={s.productId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedSwatchId(s.productId === selectedSwatchId ? null : s.productId);
              }}
              className="inline-flex items-center justify-center p-4 -m-4 md:p-0 md:m-0 cursor-pointer transition-all hover:scale-110"
              aria-label={s.label}
              type="button"
            >
              <span
                className="block h-3 w-3 rounded-full"
                style={{
                  background: s.color,
                  border: selectedSwatchId === s.productId
                    ? "2px solid rgba(225, 6, 0, 0.9)"
                    : "1px solid rgba(var(--foreground-rgb), 0.18)",
                  boxShadow: selectedSwatchId === s.productId
                    ? "0 0 8px rgba(225, 6, 0, 0.5)"
                    : "none",
                }}
              />
            </button>
          ))}
          {swatches.length > 5 && (
            <span
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "11px",
                color: "rgba(var(--foreground-rgb), 0.45)",
              }}
            >
              +{swatches.length - 5}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function ProductShelf({
  label,
  title,
  productIds,
  showRanking = false,
  emphasizeDiscount = false,
}: ProductShelfProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();

  const products = useMemo(() => {
    const visible = getVisibleCatalogProducts(allProducts);
    const resolved = productIds
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean) as Product[];
    return resolved.length > 0 ? resolved : visible.slice(0, 8);
  }, [productIds]);

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

  const navBtn = (onClick: () => void, disabled: boolean, label: string, icon: React.ReactNode, side: "left" | "right") => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-[228px] z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 backdrop-blur-md transition-all hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/15 hover:text-white hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer md:flex ${side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}`}
      aria-label={label}
    >
      {icon}
    </button>
  );

  return (
    <section
      ref={ref}
      className="px-5 py-16 md:px-[72px] md:py-20"
      style={{ background: "#0e0e0e" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeader eyebrow={label} title={title} size="sm" weight={600} />
        </div>

        <div className="relative">
          {navBtn(() => scrollByCards(-1), !canPrev, "Anterior", <ChevronLeft size={20} strokeWidth={2.2} />, "left")}
          {navBtn(() => scrollByCards(1), !canNext, "Próximo", <ChevronRight size={20} strokeWidth={2.2} />, "right")}
          <div
            ref={scrollRef}
            className="shelf-track flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.04 * i }}
              >
                <ProductCard
                  product={product}
                  rank={showRanking ? i + 1 : undefined}
                  emphasizeDiscount={emphasizeDiscount}
                  onAdd={(p) =>
                    addItem({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: getPrimaryProductImage(p),
                    })
                  }
                  onFavorite={(p) =>
                    addFavorite({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: getPrimaryProductImage(p),
                    })
                  }
                />
              </motion.div>
            ))}
          </div>
          <CarouselDots trackRef={scrollRef} />
        </div>
      </div>
    </section>
  );
}
