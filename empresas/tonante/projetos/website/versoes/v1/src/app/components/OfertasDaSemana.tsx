"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ShoppingBag, ArrowRight, Star, Check } from "lucide-react";
import { allProducts, type Product } from "./productsData";
import { getVisibleCatalogProducts, getPrimaryProductImage } from "./productPresentation";
import {
  getEconomy, getPixPrice, formatBRL, getDiscountPct,
  getInstallmentCount, getInstallmentValue,
} from "./productEnhancements";
import { useCart } from "./CartContext";
import { ProductCard } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader, SeloTonante } from "./section";

/**
 * OfertasDaSemana — funde DropDoDia + FlashDealsStrip (§6.5). UMA temporalidade:
 * semanal. UM único countdown na página (até domingo 23:59). Deal Hero à esquerda
 * com SeloTonante "destaque"; rail dos demais à direita. Substitui o PromoPanel
 * (link "Ver todas" → /promocoes).
 */

function withGuaranteedDiscount(p: Product): Product {
  if (p.oldPriceNum && p.oldPriceNum > p.priceNum) return p;
  const pct = 15 + (p.id % 10);
  const oldPriceNum = Math.round((p.priceNum / (1 - pct / 100)) * 100) / 100;
  return { ...p, oldPriceNum, oldPrice: `R$ ${oldPriceNum.toFixed(2).replace(".", ",")}` };
}

/** Fim da semana comercial: domingo 23:59:59 (hoje, se já for domingo). */
function getWeekEnd() {
  const d = new Date();
  const daysUntilSun = (7 - d.getDay()) % 7;
  d.setDate(d.getDate() + daysUntilSun);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
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
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function Countdown({ target }: { target: number }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const units = [
    { label: "dias", value: pad(days) },
    { label: "h", value: pad(hours) },
    { label: "min", value: pad(minutes) },
    { label: "s", value: pad(seconds) },
  ];
  return (
    <div className="inline-flex items-center gap-1.5" role="timer">
      {/* leitor de tela: só muda a cada minuto (sem segundos) → anúncio por minuto */}
      <span className="sr-only" aria-live="polite">
        {`Oferta termina em ${days} dias ${hours} horas e ${minutes} minutos`}
      </span>
      {units.map((u, i) => (
        <span key={u.label} className="inline-flex items-center gap-1.5" aria-hidden="true">
          <span
            className="num inline-flex flex-col items-center justify-center rounded-[10px]"
            style={{
              minWidth: 44, padding: "6px 8px",
              background: "var(--surface-2)", border: "1px solid var(--edge)",
            }}
          >
            <span style={{ fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "18px", lineHeight: 1, color: "var(--ink-strong)" }}>
              {u.value}
            </span>
            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-meta)", marginTop: 2 }}>
              {u.label}
            </span>
          </span>
          {i < units.length - 1 && <span style={{ color: "var(--ink-subtle)", fontWeight: 700 }}>:</span>}
        </span>
      ))}
    </div>
  );
}

export function OfertasDaSemana() {
  const { addItem } = useCart();
  const weekEnd = useMemo(() => getWeekEnd(), []);
  const add = (p: Product) =>
    addItem({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) });

  const picks = useMemo(() => {
    const visible = getVisibleCatalogProducts(allProducts);
    return [...visible]
      .filter((p) => p.oldPriceNum && p.oldPriceNum > p.priceNum)
      .sort((a, b) => (b.oldPriceNum! - b.priceNum) - (a.oldPriceNum! - a.priceNum))
      .slice(0, 5)
      .map(withGuaranteedDiscount);
  }, []);

  if (picks.length === 0) return null;

  const [hero, ...rail] = picks;
  const heroImg = getPrimaryProductImage(hero);
  const heroEconomy = getEconomy(hero);
  const heroPix = getPixPrice(hero);
  const heroN = getInstallmentCount(hero.priceNum);
  const heroDiscount = getDiscountPct(hero);

  return (
    <section className="px-5 py-12 md:px-[72px] md:py-16" style={{ background: "var(--surface-0)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="OFERTAS DA SEMANA"
            title="O palco é seu"
          />
          <Link
            to="/produtos?promo=1"
            className="group inline-flex items-center gap-1.5 rounded-pill"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "14.5px", fontWeight: 600, color: "var(--ink-strong)" }}
          >
            Ver todas
            <ArrowRight size={16} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" style={{ color: "var(--amber-deep)" }} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Deal Hero */}
          <div className="lg:col-span-5">
            <article
              className="relative flex h-full flex-col overflow-hidden rounded-card-lg border bg-surface-1"
              style={{ borderColor: "var(--edge)" }}
            >
              {/* lg: flex-1 absorve a altura extra do rail (evita vazio sob o conteúdo) */}
              <div className="relative lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
                <div className="deal-image-bg relative aspect-[4/3] overflow-hidden p-6 lg:aspect-auto lg:min-h-[300px] lg:flex-1">
                  <ImageWithFallback
                    src={heroImg}
                    alt={hero.name}
                    className="absolute inset-0 h-full w-full object-contain p-[8%]"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <SeloTonante variant="destaque" size={84} className="absolute left-4 top-4" />
                {heroEconomy > 0 && (
                  <span
                    className="num absolute right-4 top-4 rounded-pill"
                    style={{
                      background: "var(--gradient-buy)", color: "#fff", fontWeight: 700,
                      fontFamily: "var(--font-family-inter)", fontSize: "13px", padding: "6px 12px",
                      boxShadow: "var(--shadow-buy-cta-sm)",
                    }}
                  >
                    Economize {formatBRL(heroEconomy)}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 p-5 md:p-6">
                <Link to={`/produto/${hero.id}`}>
                  <h3
                    className="line-clamp-2"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "18px", fontWeight: 600, lineHeight: 1.3, color: "var(--ink-strong)" }}
                  >
                    {hero.name}
                  </h3>
                </Link>

                {/* Prova social — mesmo padrão de estrelas do ProductCard */}
                <div className="flex items-center gap-1.5" aria-label={`Avaliação ${hero.rating.toFixed(1)} de 5, ${hero.reviews} avaliações`}>
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        strokeWidth={1.5}
                        fill={hero.rating - i >= 0.5 ? "var(--amber)" : "none"}
                        stroke={hero.rating - i >= 0.5 ? "var(--amber)" : "rgba(26,23,20,0.3)"}
                      />
                    ))}
                  </span>
                  <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
                    {hero.rating.toFixed(1)} · {hero.reviews} avaliações
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  {hero.oldPriceNum && (
                    <span className="line-through num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
                      {hero.oldPrice}
                    </span>
                  )}
                  <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-price-xl)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--amber-deep)" }}>
                    {hero.price}
                  </span>
                  {heroDiscount > 0 && (
                    <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 700, color: "var(--amber-deep)" }}>
                      −{heroDiscount}%
                    </span>
                  )}
                </div>
                <div className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-soft)" }}>
                  No PIX <strong style={{ color: "var(--amber-deep)" }}>{formatBRL(heroPix)}</strong> · ou {heroN}x de {formatBRL(getInstallmentValue(hero.priceNum))}
                </div>

                <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Countdown target={weekEnd} />
                  <button
                    type="button"
                    onClick={() => add(hero)}
                    className="inline-flex items-center justify-center gap-2 rounded-pill cursor-pointer"
                    style={{
                      background: "var(--primary)", color: "#fff", padding: "12px 20px",
                      fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "14.5px",
                      boxShadow: "var(--shadow-buy-cta-sm)",
                    }}
                  >
                    <ShoppingBag size={17} strokeWidth={2} /> Comprar
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Rail dos demais deals */}
          <div className="lg:col-span-7">
            <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible deals-track">
              {rail.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  emphasizeDiscount
                  onAdd={add}
                  className="w-[78vw] max-w-[300px] shrink-0 lg:w-auto lg:max-w-none"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
