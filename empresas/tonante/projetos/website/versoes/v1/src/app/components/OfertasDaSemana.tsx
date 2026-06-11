"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { allProducts, type Product } from "./productsData";
import { getVisibleCatalogProducts, getPrimaryProductImage } from "./productPresentation";
import {
  getEconomy, getPixPrice, formatBRL, getDiscountPct,
  getInstallmentCount, getInstallmentValue,
} from "./productEnhancements";
import { useCart } from "./CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader, DiscountBadge } from "./section";

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
      // hero + 2 deals (rail em 1 linha): altura do hero ≈ 1 card, imagem
      // preenche em vez de boiar num poço de 2 linhas. "Ver todas" cobre o resto.
      .slice(0, 3)
      .map(withGuaranteedDiscount);
  }, []);

  if (picks.length === 0) return null;

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

        {/* 3 cards iguais, cada um com countdown — padrão consistente (sem hero largo) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p) => (
            <DealCard key={p.id} product={p} weekEnd={weekEnd} onAdd={add} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Card de oferta uniforme: imagem, nome, rating, preço, countdown e CTA. */
function DealCard({ product, weekEnd, onAdd }: { product: Product; weekEnd: number; onAdd: (p: Product) => void }) {
  const img = getPrimaryProductImage(product);
  const economy = getEconomy(product);
  const pix = getPixPrice(product);
  const n = getInstallmentCount(product.priceNum);
  const discount = getDiscountPct(product);
  return (
    <article
      className="deal-card-img flex h-full flex-col overflow-hidden rounded-card-lg border bg-surface-1"
      style={{ borderColor: "var(--edge)" }}
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div className="deal-image-bg relative aspect-[4/3] overflow-hidden p-5">
          <ImageWithFallback
            src={img}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-[7%] transition-transform duration-500 hover:scale-[1.04]"
            style={{ mixBlendMode: "multiply" }}
          />
          {discount > 0 && <DiscountBadge percent={discount} className="absolute left-3.5 top-3.5" />}
          {economy > 0 && (
            <span
              className="num absolute right-3.5 top-3.5 rounded-pill"
              style={{
                background: "var(--gradient-buy)", color: "#fff", fontWeight: 700,
                fontFamily: "var(--font-family-inter)", fontSize: "12px", padding: "5px 11px",
                boxShadow: "var(--shadow-buy-cta-sm)",
              }}
            >
              Economize {formatBRL(economy)}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Link to={`/produto/${product.id}`}>
          <h3
            className="line-clamp-2"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-product-name)", fontWeight: 600, lineHeight: 1.35, color: "var(--ink-strong)" }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5" aria-label={`Avaliação ${product.rating.toFixed(1)} de 5, ${product.reviews} avaliações`}>
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={13}
                strokeWidth={1.5}
                fill={product.rating - i >= 0.5 ? "var(--amber)" : "none"}
                stroke={product.rating - i >= 0.5 ? "var(--amber)" : "rgba(26,23,20,0.3)"}
              />
            ))}
          </span>
          <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
            {product.rating.toFixed(1)} · {product.reviews}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline gap-2">
          {product.oldPriceNum && (
            <span className="line-through num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
              {product.oldPrice}
            </span>
          )}
          <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-price-lg)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--amber-deep)" }}>
            {product.price}
          </span>
        </div>
        <div className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-soft)" }}>
          No PIX <strong style={{ color: "var(--amber-deep)" }}>{formatBRL(pix)}</strong> · ou {n}x de {formatBRL(getInstallmentValue(product.priceNum))}
        </div>

        {/* countdown + CTA fixos no rodapé do card (mt-auto alinha os 3) */}
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <Countdown target={weekEnd} />
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill cursor-pointer"
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
  );
}
