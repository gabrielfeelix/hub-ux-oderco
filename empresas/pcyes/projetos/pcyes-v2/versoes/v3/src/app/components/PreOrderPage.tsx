"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Rocket,
  Clock,
  Zap,
  ShieldCheck,
  ChevronRight,
  Flame,
  Search,
  X,
  TrendingUp,
  CalendarDays,
  Filter,
  ArrowDownUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { allProducts } from "./productsData";
import { getPrimaryProductImage } from "./productPresentation";
import { PRE_ORDER_ITEMS } from "./PreOrderData";
import type { PreOrderInfo } from "./PreOrderData";

const pad = (n: number) => String(n).padStart(2, "0");

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=2400&q=80";

function useCountdown(targetIso: string) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const delta = Math.max(0, target - now);
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta % 86_400_000) / 3_600_000),
    minutes: Math.floor((delta % 3_600_000) / 60_000),
    seconds: Math.floor((delta % 60_000) / 1000),
    delta,
  };
}

function formatReleaseDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function parsePrice(s?: string): number {
  if (!s) return 0;
  const cleaned = s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

type SortKey = "soonest" | "most-reserved" | "price-asc" | "price-desc";
type DeliveryFilter = "all" | "month" | "quarter" | "later";

function PreOrderCard({ info }: { info: PreOrderInfo }) {
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === info.productId);
  const { days, hours, minutes, seconds, delta } = useCountdown(info.releaseDate);
  if (!product) return null;

  const reservedPct = Math.min(100, Math.round((info.reservedUnits / info.totalUnits) * 100));
  const image = getPrimaryProductImage(product);
  const isHot = reservedPct >= 70;
  const isImminent = delta > 0 && delta < 30 * 86_400_000;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/produto/${product.id}`)}
      style={{
        borderRadius: "22px",
        background: "linear-gradient(135deg, #1a0608 0%, #2a0a0d 45%, #1a0608 100%)",
        border: "1px solid rgba(255,36,25,0.25)",
        boxShadow: "0 24px 60px -20px rgba(255,36,25,0.35)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(255,36,25,0.25) 0%, transparent 55%), radial-gradient(circle at 10% 100%, rgba(255,200,90,0.12) 0%, transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 32%, #fff 0.5px, transparent 1px), radial-gradient(circle at 62% 68%, #fde68a 0.5px, transparent 1px), radial-gradient(circle at 84% 22%, #fff 0.5px, transparent 1px)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0">
        {/* image */}
        <div
          className="relative h-[260px] md:h-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <ImageWithFallback
            src={image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span
            className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              background: "linear-gradient(135deg, #ff2419 0%, #b91c1c 100%)",
              color: "#fff",
              fontFamily: "var(--font-family-inter)",
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              boxShadow: "0 6px 16px -4px rgba(255,36,25,0.6)",
            }}
          >
            <Rocket size={11} strokeWidth={2.6} />
            Pré-venda
          </span>

          {isHot && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2 py-1"
              style={{
                background: "linear-gradient(135deg, #facc15 0%, #f97316 100%)",
                color: "#1a0608",
                fontFamily: "var(--font-family-inter)",
                fontSize: "9.5px",
                fontWeight: 900,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                boxShadow: "0 6px 16px -4px rgba(250,204,21,0.6)",
              }}
            >
              <Flame size={10} strokeWidth={2.8} />
              Esgotando
            </motion.span>
          )}
        </div>

        {/* details */}
        <div className="p-5 md:p-6 flex flex-col">
          <p
            className="text-white/45 mb-1.5"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "10.5px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            // {product.category}
          </p>
          <h3
            className="text-white mb-3 line-clamp-2"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h3>

          <p
            className="text-white/65 mb-4"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "12.5px",
              lineHeight: 1.45,
            }}
          >
            <Zap size={12} className="inline mr-1.5 -mt-0.5 text-[#facc15]" strokeWidth={2.4} />
            {info.highlight}
          </p>

          {/* countdown row */}
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {[
              { v: days, l: "D" },
              { v: hours, l: "H" },
              { v: minutes, l: "M" },
              { v: seconds, l: "S" },
            ].map((unit) => (
              <div
                key={unit.l}
                className="flex items-baseline justify-center gap-1 py-2"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                }}
              >
                <span
                  className="text-white tabular-nums"
                  style={{
                    fontFamily: "var(--font-family-figtree)",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {pad(unit.v)}
                </span>
                <span
                  className="text-white/40"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "9.5px",
                    fontWeight: 700,
                  }}
                >
                  {unit.l}
                </span>
              </div>
            ))}
          </div>

          {/* progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-white/55"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Reservas
              </span>
              <span
                className="text-white tabular-nums"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "11.5px",
                  fontWeight: 700,
                }}
              >
                {reservedPct}%
              </span>
            </div>
            <div
              className="relative h-1.5 w-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", borderRadius: "999px" }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${reservedPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0"
                style={{
                  background: "linear-gradient(90deg, #ff2419 0%, #facc15 100%)",
                  borderRadius: "999px",
                  boxShadow: "0 0 14px rgba(255,36,25,0.55)",
                }}
              />
            </div>
          </div>

          {/* footer row */}
          <div className="flex items-end justify-between gap-3 mt-auto">
            <div>
              <p
                className="text-white/45 mb-0.5"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {isImminent ? "Chega em breve" : "Entrega"} · {formatReleaseDate(info.releaseDate)}
              </p>
              <p
                className="text-white leading-none"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {info.preOrderPrice ?? product.price}
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1 h-10 px-4 rounded-full text-white transition-transform group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff2419 0%, #b91c1c 100%)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                boxShadow: "0 12px 28px -8px rgba(255,36,25,0.6)",
              }}
            >
              Reservar
              <ChevronRight size={13} strokeWidth={2.6} />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function HeroSection({
  totalProducts,
  totalReservations,
  avgReservedPct,
}: {
  totalProducts: number;
  totalReservations: number;
  avgReservedPct: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.35]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        minHeight: "78vh",
        background: "linear-gradient(180deg, #050505 0%, #0a0506 60%, var(--color-background) 100%)",
      }}
    >
      {/* parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale,
          opacity,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.42) saturate(1.15) contrast(1.1)",
        }}
      />

      {/* gradient overlay top + bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.35) 35%, rgba(5,5,5,0.55) 70%, rgba(10,5,6,1) 100%)",
        }}
      />

      {/* radial red glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 30%, rgba(255,36,25,0.32) 0%, transparent 55%), radial-gradient(circle at 82% 70%, rgba(255,200,90,0.14) 0%, transparent 50%)",
        }}
      />

      {/* grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />

      {/* starfield */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, #fff 0.6px, transparent 1.2px), radial-gradient(circle at 38% 78%, #fde68a 0.5px, transparent 1px), radial-gradient(circle at 64% 30%, #fff 0.5px, transparent 1px), radial-gradient(circle at 84% 65%, #fde68a 0.6px, transparent 1.2px), radial-gradient(circle at 22% 88%, #fff 0.5px, transparent 1px), radial-gradient(circle at 92% 18%, #fff 0.5px, transparent 1px)",
        }}
      />

      <div className="relative max-w-[1760px] mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-10 md:pb-12 flex flex-col justify-center" style={{ minHeight: "78vh" }}>
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link
            to="/"
            className="text-white/40 hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px" }}
          >
            Home
          </Link>
          <span className="text-white/20" style={{ fontSize: "10px" }}>›</span>
          <span
            className="text-white/70"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 600 }}
          >
            Pré-venda
          </span>
        </motion.div>

        {/* badge animated */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6"
        >
          <span
            className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: "linear-gradient(135deg, #ff2419 0%, #b91c1c 100%)",
              color: "#fff",
              fontFamily: "var(--font-family-inter)",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              boxShadow: "0 10px 28px -8px rgba(255,36,25,0.65)",
            }}
          >
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(255,36,25,0.45)", animationDuration: "2.4s" }}
            />
            <Rocket size={12} strokeWidth={2.6} className="relative" />
            <span className="relative">Pré-venda PCYES</span>
          </span>
        </motion.div>

        {/* title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 max-w-[1100px]"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "clamp(42px, 6.5vw, 88px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 0.98,
            color: "#fff",
          }}
        >
          O futuro chega <br />
          <span
            style={{
              backgroundImage: "linear-gradient(120deg, #ff2419 0%, #facc15 65%, #ff2419 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
              display: "inline-block",
            }}
          >
            antes pra você.
          </span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 max-w-[640px] mb-9"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.55,
          }}
        >
          Lançamentos exclusivos, edições limitadas e tecnologia de ponta em
          primeira mão. Reserve sem custo. Pague só quando despacharmos.
        </motion.p>

        {/* feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {[
            { icon: ShieldCheck, label: "Cancelamento livre antes do envio" },
            { icon: Clock, label: "Sem cobrança até o despacho" },
            { icon: Zap, label: "Entrega prioritária no lançamento" },
          ].map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-white/85 transition-colors hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "12px",
                fontWeight: 600,
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-[#ff2419]">
                <f.icon size={13} strokeWidth={2.4} />
              </span>
              {f.label}
            </span>
          ))}
        </motion.div>

        {/* stats row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 max-w-[680px]"
          style={{
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            backdropFilter: "blur(12px)",
          }}
        >
          {[
            { v: totalProducts, l: "Lançamentos", suffix: "" },
            { v: totalReservations.toLocaleString("pt-BR"), l: "Reservas ativas", suffix: "" },
            { v: avgReservedPct, l: "Adesão média", suffix: "%" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`px-5 py-4 ${i > 0 ? "border-l border-white/10" : ""}`}
            >
              <p
                className="text-white tabular-nums leading-none mb-1.5"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(24px, 2.4vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.v}
                {s.suffix}
              </p>
              <p
                className="text-white/55"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "10.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span
          className="text-white/40"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Role
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-7"
          style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.7), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

function FiltersBar({
  categories,
  activeCategory,
  setActiveCategory,
  delivery,
  setDelivery,
  sort,
  setSort,
  search,
  setSearch,
  resultCount,
}: {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  delivery: DeliveryFilter;
  setDelivery: (v: DeliveryFilter) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  search: string;
  setSearch: (v: string) => void;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);
  const deliveryLabels: Record<DeliveryFilter, string> = {
    all: "Todas",
    month: "Este mês",
    quarter: "Próx. 3 meses",
    later: "Mais tarde",
  };
  const sortLabels: Record<SortKey, string> = {
    soonest: "Lançamento mais próximo",
    "most-reserved": "Mais reservados",
    "price-asc": "Menor preço",
    "price-desc": "Maior preço",
  };

  const activeFilters =
    (activeCategory !== "all" ? 1 : 0) +
    (delivery !== "all" ? 1 : 0) +
    (search.trim().length > 0 ? 1 : 0);

  return (
    <div
      className="sticky z-40"
      style={{
        top: "64px",
        background: "rgba(10,5,6,0.85)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1760px] mx-auto px-5 md:px-8 py-3.5 flex items-center gap-3 flex-wrap">
        {/* search */}
        <div
          className="flex items-center gap-2 px-3.5 h-10 flex-1 min-w-[200px] max-w-[340px]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
          }}
        >
          <Search size={14} className="text-white/45" strokeWidth={2.2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar lançamento..."
            className="bg-transparent outline-none flex-1 text-white placeholder:text-white/35"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "13px",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-white/40 hover:text-white cursor-pointer">
              <X size={13} strokeWidth={2.4} />
            </button>
          )}
        </div>

        {/* category chips (desktop) */}
        <div className="hidden md:flex items-center gap-1.5 flex-wrap">
          {["all", ...categories].map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 h-10 rounded-full transition-all cursor-pointer"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #ff2419 0%, #b91c1c 100%)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(255,36,25,0.55)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  boxShadow: isActive ? "0 8px 24px -8px rgba(255,36,25,0.6)" : "none",
                }}
              >
                {cat === "all" ? "Todas" : cat}
              </button>
            );
          })}
        </div>

        {/* mobile filter toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center gap-2 h-10 px-3.5 rounded-full text-white cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            fontFamily: "var(--font-family-inter)",
            fontSize: "12.5px",
            fontWeight: 600,
          }}
        >
          <Filter size={13} strokeWidth={2.4} />
          Filtros
          {activeFilters > 0 && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full"
              style={{
                background: "#ff2419",
                fontSize: "10px",
                fontWeight: 900,
              }}
            >
              {activeFilters}
            </span>
          )}
        </button>

        <div className="flex-1" />

        {/* sort dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none h-10 pl-9 pr-8 rounded-full text-white cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontFamily: "var(--font-family-inter)",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <option key={k} value={k} style={{ background: "#0a0506", color: "#fff" }}>
                {sortLabels[k]}
              </option>
            ))}
          </select>
          <ArrowDownUp
            size={13}
            strokeWidth={2.2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/55 pointer-events-none"
          />
        </div>
      </div>

      {/* delivery chips row + mobile filters */}
      <AnimatePresence>
        {(open || true) && (
          <motion.div
            initial={false}
            className="max-w-[1760px] mx-auto px-5 md:px-8 pb-3 flex items-center gap-2.5 flex-wrap"
          >
            <span
              className="text-white/45"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <CalendarDays size={11} className="inline -mt-0.5 mr-1.5" strokeWidth={2.4} />
              Entrega
            </span>
            {(Object.keys(deliveryLabels) as DeliveryFilter[]).map((d) => {
              const isActive = delivery === d;
              return (
                <button
                  key={d}
                  onClick={() => setDelivery(d)}
                  className="px-3 h-8 rounded-full transition-all cursor-pointer"
                  style={{
                    background: isActive
                      ? "rgba(255,36,25,0.15)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? "1px solid rgba(255,36,25,0.45)"
                      : "1px solid rgba(255,255,255,0.06)",
                    color: isActive ? "#ff7770" : "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "11.5px",
                    fontWeight: 600,
                  }}
                >
                  {deliveryLabels[d]}
                </button>
              );
            })}

            {/* mobile category chips */}
            <div className="md:hidden flex items-center gap-2 flex-wrap w-full mt-1.5">
              {["all", ...categories].map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-3 h-8 rounded-full transition-all cursor-pointer"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #ff2419 0%, #b91c1c 100%)"
                        : "rgba(255,255,255,0.04)",
                      border: isActive
                        ? "1px solid rgba(255,36,25,0.55)"
                        : "1px solid rgba(255,255,255,0.08)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "11.5px",
                      fontWeight: 600,
                    }}
                  >
                    {cat === "all" ? "Todas" : cat}
                  </button>
                );
              })}
            </div>

            <div className="flex-1" />

            <span
              className="text-white/55 tabular-nums"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "11.5px",
                fontWeight: 600,
              }}
            >
              <TrendingUp size={11} className="inline -mt-0.5 mr-1.5 text-[#facc15]" strokeWidth={2.4} />
              {resultCount} {resultCount === 1 ? "produto" : "produtos"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PreOrderPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [delivery, setDelivery] = useState<DeliveryFilter>("all");
  const [sort, setSort] = useState<SortKey>("soonest");
  const [search, setSearch] = useState<string>("");

  // join with product data once
  const enriched = useMemo(() => {
    return PRE_ORDER_ITEMS.map((info) => {
      const product = allProducts.find((p) => p.id === info.productId);
      return { info, product };
    }).filter((x) => x.product);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    enriched.forEach((x) => x.product && set.add(x.product.category));
    return Array.from(set);
  }, [enriched]);

  const totalReservations = useMemo(
    () => enriched.reduce((sum, x) => sum + x.info.reservedUnits, 0),
    [enriched],
  );

  const avgReservedPct = useMemo(() => {
    if (!enriched.length) return 0;
    const total = enriched.reduce(
      (sum, x) => sum + (x.info.reservedUnits / x.info.totalUnits) * 100,
      0,
    );
    return Math.round(total / enriched.length);
  }, [enriched]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const month = 30 * 86_400_000;
    const quarter = 90 * 86_400_000;

    let list = enriched.filter(({ info, product }) => {
      if (!product) return false;
      if (activeCategory !== "all" && product.category !== activeCategory) return false;

      if (delivery !== "all") {
        const delta = new Date(info.releaseDate).getTime() - now;
        if (delivery === "month" && delta > month) return false;
        if (delivery === "quarter" && (delta <= month || delta > quarter)) return false;
        if (delivery === "later" && delta <= quarter) return false;
      }

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${product.name} ${product.category} ${info.highlight}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "soonest":
          return (
            new Date(a.info.releaseDate).getTime() - new Date(b.info.releaseDate).getTime()
          );
        case "most-reserved":
          return (
            b.info.reservedUnits / b.info.totalUnits -
            a.info.reservedUnits / a.info.totalUnits
          );
        case "price-asc":
          return parsePrice(a.info.preOrderPrice ?? a.product!.price) -
            parsePrice(b.info.preOrderPrice ?? b.product!.price);
        case "price-desc":
          return parsePrice(b.info.preOrderPrice ?? b.product!.price) -
            parsePrice(a.info.preOrderPrice ?? a.product!.price);
        default:
          return 0;
      }
    });

    return list;
  }, [enriched, activeCategory, delivery, search, sort]);

  const clearFilters = () => {
    setActiveCategory("all");
    setDelivery("all");
    setSearch("");
    setSort("soonest");
  };

  return (
    <div className="pt-[64px] min-h-screen bg-background">
      <HeroSection
        totalProducts={enriched.length}
        totalReservations={totalReservations}
        avgReservedPct={avgReservedPct}
      />

      <FiltersBar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        delivery={delivery}
        setDelivery={setDelivery}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        resultCount={filtered.length}
      />

      {/* grid */}
      <section className="max-w-[1760px] mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <p
              className="text-white/45 mb-1.5"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              // Catálogo
            </p>
            <h2
              className="text-foreground"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(22px, 2.6vw, 32px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Lançamentos em pré-venda
            </h2>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.10)",
              borderRadius: "22px",
            }}
          >
            <Search size={28} className="text-white/35 mb-4" strokeWidth={1.8} />
            <h3
              className="text-white mb-2"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Nenhum lançamento encontrado
            </h3>
            <p
              className="text-white/50 mb-5 max-w-[360px]"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              Tente ajustar os filtros ou voltar para ver todos os lançamentos disponíveis.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 h-10 rounded-full text-white cursor-pointer transition-colors"
              style={{
                background: "linear-gradient(135deg, #ff2419 0%, #b91c1c 100%)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                boxShadow: "0 12px 28px -8px rgba(255,36,25,0.5)",
              }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            {filtered.map(({ info }) => (
              <PreOrderCard key={info.productId} info={info} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
