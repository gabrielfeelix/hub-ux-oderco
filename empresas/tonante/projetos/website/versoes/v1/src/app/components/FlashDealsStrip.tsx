"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { Flame, Timer } from "lucide-react";
import { allProducts, type Product } from "./productsData";
import {
  getPrimaryProductImage,
  getVisibleCatalogProducts,
} from "./productPresentation";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader, CarouselNavButton } from "./section";
import { ProductCard } from "./ProductCard";

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
  // Ref claude-design: pill brick-tint (sem glow), células creme, número tabular.
  return (
    <div
      className="inline-flex items-center gap-2.5 px-3.5 py-2.5"
      style={{
        background: "rgba(179, 54, 31, 0.07)",
        border: "1px solid rgba(179, 54, 31, 0.22)",
        borderRadius: "var(--radius-card-sm)",
      }}
    >
      <Timer size={16} strokeWidth={2.2} style={{ color: "#b3361f" }} />
      <div className="flex items-center gap-1.5">
        {units.map((u, i) => (
          <span key={u.label} className="flex items-center gap-1.5">
            <span
              className="num text-center"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "4px 7px",
                minWidth: 30,
                fontFamily: "var(--font-family-inter)",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--ink-strong)",
              }}
            >
              {u.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {u.label}
            </span>
            {i < units.length - 1 && <span style={{ color: "rgba(26,23,20,0.25)" }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}


export function FlashDealsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();
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
      className="px-5 md:px-[72px]"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-md)",
        background: "var(--surface-0)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="PROMOÇÕES DA SEMANA"
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
                <ProductCard
                  product={product}
                  variant="shelf"
                  swatches
                  favorite
                  emphasizeDiscount
                  className="snap-start flex-shrink-0"
                  style={{ width: "clamp(264px, 78vw, 380px)" }}
                  onAdd={(p) =>
                    addItem({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) })
                  }
                  onFavorite={(p) =>
                    addFavorite({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) })
                  }
                />
              </motion.div>
            ))}
          </div>

          <CarouselDots trackRef={scrollRef} className="mt-4" />

          {navBtn(() => scrollByCards(-1), !canPrev, "Anterior", "left")}
          {navBtn(() => scrollByCards(1), !canNext, "Próximo", "right")}
        </div>
      </div>
    </section>
  );
}
