"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, Flame, Heart, ShoppingBag, Timer } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts, type Product } from "./productsData";
import {
  getPrimaryProductImage,
  getProductSwatches,
  getVisibleCatalogProducts,
} from "./productPresentation";
import { getPreOrderInfo } from "./PreOrderData";
import { PreOrderBadge } from "./PreOrderBanner";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useFavorites } from "./FavoritesContext";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader, CTAButton, DiscountBadge } from "./section";

const DEAL_IDS = [436, 72, 199, 329, 446, 433, 30, 295, 375];

function getDealEnd() {
  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(target - now, 0);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownChip({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) {
  const units = [
    { label: "D", value: pad(days) },
    { label: "H", value: pad(hours) },
    { label: "M", value: pad(minutes) },
    { label: "S", value: pad(seconds) },
  ];
  return (
    <div
      data-keep-dark
      className="inline-flex items-center gap-3 rounded-full px-4 py-2.5"
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        border: "1px solid rgba(225, 6, 0, 0.5)",
        boxShadow: "0 0 28px -4px rgba(225, 6, 0, 0.55), inset 0 0 0 1px rgba(225, 6, 0, 0.08)",
      }}
    >
      <Timer size={18} strokeWidth={2.2} style={{ color: "var(--primary)" }} />
      <div className="flex items-center gap-2">
        {units.map((u, i) => (
          <span key={u.label} className="flex items-center gap-2">
            <span
              className="text-white tabular-nums"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {u.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "10px",
                fontWeight: 600,
                color: "rgba(var(--foreground-rgb), 0.45)",
                letterSpacing: "0.06em",
              }}
            >
              {u.label}
            </span>
            {i < units.length - 1 && (
              <span style={{ color: "rgba(var(--foreground-rgb), 0.25)" }}>:</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

interface DealCardProps {
  product: Product;
  emphasize: boolean;
  onAdd: (product: Product) => void;
}

function DealCard({ product, emphasize, onAdd }: DealCardProps) {
  const swatches = getProductSwatches(product);
  const [selectedSwatchId, setSelectedSwatchId] = useState<number | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const { isLoggedIn } = useAuth();
  const { addFavorite } = useFavorites();
  const displayProduct = (selectedSwatchId ? allProducts.find((p) => p.id === selectedSwatchId) : null) ?? product;
  const image = getPrimaryProductImage(displayProduct);
  const oldPriceNum = product.oldPriceNum ?? (emphasize ? product.priceNum * 1.22 : 0);
  const discount =
    oldPriceNum > product.priceNum
      ? Math.round(((oldPriceNum - product.priceNum) / oldPriceNum) * 100)
      : 0;
  const preOrderInfo = getPreOrderInfo(product.id);

  return (
    <div
      className="snap-start flex-shrink-0 group"
      style={{ width: "clamp(264px, 78vw, 380px)" }}
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div
          className="deal-card-img relative aspect-[5/6] overflow-hidden transition-all duration-300"
          style={{
            background:
              "linear-gradient(140deg, rgba(var(--foreground-rgb), 0.07) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
            borderRadius: "var(--radius-card-lg)",
            border: "1px solid rgba(var(--foreground-rgb), 0.05)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(var(--foreground-rgb), 0.06) 0%, transparent 55%)",
              borderRadius: "var(--radius-card-lg)",
            }}
          />

          {discount > 0 && !preOrderInfo && (
            <DiscountBadge
              percent={discount}
              className="absolute z-20"
              style={{ top: "14px", left: "14px" }}
            />
          )}

          {preOrderInfo && (
            <span className="absolute z-20" style={{ top: "14px", left: "14px" }}>
              <PreOrderBadge info={preOrderInfo} />
            </span>
          )}

          <ImageWithFallback
            src={image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-4 md:p-9 transition-transform duration-500 group-hover:scale-[1.06]"
          />

          {/* Favorite (top-right, on hover) — only when logged in */}
          {isLoggedIn && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorited(!isFavorited);
                addFavorite({ id: product.id, name: product.name, price: product.price, image });
              }}
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

          {/* Quick add on hover */}
          <CTAButton
            variant="buy-sm"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              onAdd(product);
            }}
            className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 translate-y-0 md:translate-y-2 opacity-100 md:opacity-0 transition-all duration-300 group-hover:translate-y-0 md:group-hover:opacity-100 cursor-pointer"
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
              className="text-white whitespace-nowrap leading-none"
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
          {swatches.slice(0, 5).map((s) => {
            const active = s.productId === displayProduct.id;
            return (
              <button
                key={s.productId}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSwatchId(active ? null : s.productId);
                }}
                className="inline-flex items-center justify-center p-4 md:p-0 -m-4 md:m-0 rounded-full cursor-pointer hover:scale-110 transition-all"
                aria-label={s.label}
              >
                <span
                  className="block h-3 w-3 rounded-full pointer-events-none"
                  style={{
                    background: s.color,
                    border: active ? "2px solid rgba(225,6,0,0.9)" : "1px solid rgba(var(--foreground-rgb), 0.18)",
                    boxShadow: active ? "0 0 8px rgba(225,6,0,0.5)" : "none",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FlashDealsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();
  const endRef = useRef(getDealEnd());
  const time = useCountdown(endRef.current);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const products = useMemo(() => {
    const visible = getVisibleCatalogProducts(allProducts);
    const picked = DEAL_IDS
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean) as Product[];
    return picked.length > 0 ? picked : visible.slice(0, 9);
  }, []);

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
    const cardWidth = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 380;
    el.scrollBy({ left: dir * (cardWidth + 24) * 2, behavior: "smooth" });
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
      className="px-5 md:px-[72px]"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-md)",
        background: "#0a0a0a",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="// PROMOÇÕES DA SEMANA"
            eyebrowIcon={<Flame size={13} strokeWidth={2.2} />}
            title="Os deals que estão dominando"
            size="md"
            weight={700}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <CountdownChip {...time} />
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="deals-track flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.04 * i }}
              >
                <DealCard product={product} emphasize onAdd={(p) =>
                  addItem({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: getPrimaryProductImage(p),
                  })
                } />
              </motion.div>
            ))}
          </div>

          <CarouselDots trackRef={scrollRef} className="mt-4" />

          {navBtn(() => scrollByCards(-1), !canPrev, "Anterior", <ChevronLeft size={20} strokeWidth={2.2} />, "left")}
          {navBtn(() => scrollByCards(1), !canNext, "Próximo", <ChevronRight size={20} strokeWidth={2.2} />, "right")}
        </div>
      </div>
    </section>
  );
}
