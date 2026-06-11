"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { Heart, Eye, ShoppingBag, Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts, type Product } from "./productsData";
import { getProductSwatches } from "./productPresentation";
import { getInstallmentCount, getInstallmentValue } from "./productEnhancements";
import { getCardSpecs } from "./productAttributes";
import { DiscountBadge } from "./section";

/**
 * ProductCard — card de produto Tonante (porta o design do protótipo de marca
 * em _ref/src/components.jsx: card creme, badge brick, botão Comprar âmbar no
 * hover, preço em Bodoni com PIX). Mantém a API do template (variant, rank,
 * swatches, favorite, hoverMedia, onAdd).
 */

type ProductCardVariant = "shelf" | "grid";

const fmtBRL = (n: number) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  href?: string;
  rank?: number;
  swatches?: boolean;
  favorite?: boolean;
  hoverMedia?: ReactNode;
  emphasizeDiscount?: boolean;
  onAdd?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
  className?: string;
  style?: CSSProperties;
}

export function ProductCard({
  product,
  href = `/produto/${product.id}`,
  rank,
  swatches = false,
  favorite = false,
  hoverMedia,
  emphasizeDiscount = false,
  onAdd,
  onFavorite,
  className = "",
  style,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedSwatchId, setSelectedSwatchId] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [quickOpen, setQuickOpen] = useState(false);
  const navigate = useNavigate();

  const swatchList = swatches ? getProductSwatches(product) : [];
  const selectedProduct = selectedSwatchId
    ? allProducts.find((p) => p.id === selectedSwatchId) ?? product
    : product;

  const gallery = selectedProduct.images && selectedProduct.images.length
    ? selectedProduct.images.slice(0, 4)
    : [selectedProduct.image];
  const nImg = gallery.length;
  const image = gallery[((imgIdx % nImg) + nImg) % nImg];

  const oldPriceNum =
    product.oldPriceNum ?? (emphasizeDiscount ? product.priceNum * 1.18 : 0);
  const discount =
    oldPriceNum > product.priceNum
      ? Math.round(((oldPriceNum - product.priceNum) / oldPriceNum) * 100)
      : 0;

  const eyebrowBase =
    (product.tags || []).filter((t) => t !== product.category).slice(0, 2).join(" · ") ||
    product.subcategory ||
    product.category;
  // Marca terceira ganha destaque no eyebrow — loja oficial Tonante vende
  // parceiros, mas não os disfarça de linha própria.
  const eyebrow =
    product.brand && product.brand !== "Tonante"
      ? `${product.brand} · ${eyebrowBase}`
      : eyebrowBase;
  const pix = product.priceNum * 0.9;
  const installments = getInstallmentCount(product.priceNum);
  const installmentValue = getInstallmentValue(product.priceNum);
  const cardSpecs = getCardSpecs(product);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite?.(product);
  };
  const cycle = (e: React.MouseEvent, d: number) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i + d + nImg) % nImg);
  };

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-[#e4dccc] bg-surface-1 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d6cbb5] hover:shadow-[0_18px_44px_-20px_rgba(26,23,20,0.30)] ${className}`}
      style={style}
    >
      <Link to={href} className="flex flex-1 flex-col">
        {/* área de imagem (well creme) */}
        <div className="relative p-3">
          <div
            className="relative aspect-square overflow-hidden rounded-[14px]"
            style={{
              // branco-quente limpo — produto destaca como foto premium e não
              // se confunde com o creme da página (multiply fica perfeito sobre branco)
              background: "#fbfaf6",
              boxShadow: "inset 0 0 0 1px rgba(26,23,20,0.07)",
            }}
          >
            <ImageWithFallback
              src={image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-contain p-[7%] transition-transform duration-500 group-hover:scale-[1.05]"
              style={{ mixBlendMode: "multiply" }}
            />
            {hoverMedia}

            {/* badge topo-esquerda: ranking → desconto → badge */}
            <div className="absolute left-3.5 top-3.5 z-20 flex flex-col items-start gap-1.5">
              {rank !== undefined && (
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    // #1 ganha medalhão âmbar (ouro); demais ficam ink
                    background: rank === 1 ? "var(--gradient-buy)" : "var(--ink-strong)",
                    color: rank === 1 ? "#fff" : "var(--background)",
                    boxShadow: rank === 1 ? "var(--shadow-medallion)" : undefined,
                    fontFamily: "var(--font-family-figtree)",
                    fontWeight: 700,
                    fontSize: "15px",
                  }}
                >
                  {rank}
                </span>
              )}
              {rank === undefined && discount > 0 && <DiscountBadge percent={discount} />}
              {rank === undefined && discount === 0 && product.badge && (
                <span
                  className="label rounded-pill"
                  style={{
                    padding: "5px 11px",
                    background: "rgba(26,23,20,0.85)",
                    color: "#f6f2e9",
                    fontSize: "10px",
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* ações topo-direita: favoritar + espiar (hover) */}
            <div className="absolute right-3.5 top-3.5 z-20 flex flex-col gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
              <button
                onClick={handleFavorite}
                aria-label="Favoritar"
                className="flex h-11 w-11 md:h-9 md:w-9 items-center justify-center rounded-full shadow-[0_2px_8px_rgba(26,23,20,0.12)] transition-colors cursor-pointer"
                style={{ background: "rgba(255,255,255,0.92)", color: isFavorited ? "#b3361f" : "#1a1714" }}
              >
                <Heart size={16} strokeWidth={1.8} fill={isFavorited ? "#b3361f" : "none"} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickOpen(true);
                }}
                aria-label="Espiar produto"
                className="flex h-11 w-11 md:h-9 md:w-9 items-center justify-center rounded-full shadow-[0_2px_8px_rgba(26,23,20,0.12)] cursor-pointer"
                style={{ background: "rgba(255,255,255,0.92)", color: "#1a1714" }}
              >
                <Eye size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* setas de imagem (hover, se >1) */}
            {nImg > 1 && (
              <>
                <button
                  onClick={(e) => cycle(e, -1)}
                  aria-label="Imagem anterior"
                  className="absolute left-2 top-[42%] z-20 flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.85)", color: "#1a1714" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={(e) => cycle(e, 1)}
                  aria-label="Próxima imagem"
                  className="absolute right-2 top-[42%] z-20 flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.85)", color: "#1a1714" }}
                >
                  <ChevronRight size={16} />
                </button>
                {/* dots */}
                <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-1.5">
                  {gallery.map((_, i) => (
                    <span
                      key={i}
                      className="h-[5px] rounded-full transition-all"
                      style={{
                        width: imgIdx % nImg === i ? 14 : 5,
                        background: imgIdx % nImg === i ? "#fff" : "rgba(255,255,255,0.55)",
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Comprar (hover, base) — desktop */}
            {onAdd && (
              <div className="absolute inset-x-4 bottom-4 z-30 hidden translate-y-2.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAdd(product);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-pill cursor-pointer"
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "12px 16px",
                    fontFamily: "var(--font-family-inter)",
                    fontWeight: 700,
                    fontSize: "14.5px",
                    boxShadow: "var(--shadow-buy-cta-sm)",
                  }}
                >
                  <ShoppingBag size={17} strokeWidth={2} /> Comprar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* conteúdo */}
        <div className="flex flex-1 flex-col gap-2 px-4 pb-5">
          <span className="label" style={{ fontSize: "var(--text-eyebrow)", color: "var(--amber-deep)" }}>
            {eyebrow}
          </span>
          <h3
            className="line-clamp-2 text-ink-strong"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-product-name)",
              fontWeight: 600,
              lineHeight: 1.35,
              letterSpacing: 0,
            }}
          >
            {product.name}
          </h3>

          {/* specs-chave (derivadas do nome — §4.2.10; oculta se vazio) */}
          {cardSpecs.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {cardSpecs.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}
                >
                  {i > 0 && (
                    <span style={{ width: 3, height: 3, borderRadius: 9999, background: "var(--amber)" }} />
                  )}
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* estrelas */}
          <span className="flex items-center gap-1.5">
            <span className="flex" style={{ color: "var(--amber)" }}>
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
          </span>

          {/* preço */}
          <div className="mt-auto pt-1.5">
            <div className="flex flex-wrap items-baseline gap-2">
              {oldPriceNum > product.priceNum && (
                <span
                  className="line-through num"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}
                >
                  {product.oldPrice ?? fmtBRL(oldPriceNum)}
                </span>
              )}
              <span
                className="num"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-price-lg)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: discount > 0 ? "var(--amber-deep)" : "var(--ink-strong)",
                }}
              >
                {product.price}
              </span>
            </div>
            <div
              className="num"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-soft)", marginTop: 3 }}
            >
              No PIX <strong style={{ color: "var(--amber-deep)" }}>{fmtBRL(pix)}</strong> · ou {installments}x de{" "}
              {fmtBRL(installmentValue)}
            </div>
          </div>
        </div>
      </Link>

      {/* swatches */}
      {swatchList.length > 0 && (
        <div className="flex items-center gap-1.5 px-4 pb-4">
          {swatchList.slice(0, 5).map((s) => (
            <button
              key={s.productId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedSwatchId(s.productId === selectedSwatchId ? null : s.productId);
                setImgIdx(0);
              }}
              className="inline-flex items-center justify-center cursor-pointer transition-all hover:scale-110"
              aria-label={s.label}
              type="button"
            >
              <span
                className="block h-3 w-3 rounded-full"
                style={{
                  background: s.color,
                  border:
                    selectedSwatchId === s.productId
                      ? "2px solid var(--amber)"
                      : "1px solid rgba(26,23,20,0.18)",
                }}
              />
            </button>
          ))}
          {swatchList.length > 5 && (
            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "12px", color: "var(--faint)" }}>
              +{swatchList.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Comprar mobile (abaixo, fora do link) */}
      {onAdd && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd(product);
          }}
          className="mx-4 mb-4 flex items-center justify-center gap-2 rounded-pill cursor-pointer md:hidden"
          style={{
            background: "var(--primary)",
            color: "#fff",
            padding: "11px 16px",
            minHeight: 44,
            fontFamily: "var(--font-family-inter)",
            fontWeight: 700,
            fontSize: "13.5px",
          }}
        >
          <ShoppingBag size={15} strokeWidth={2} /> Comprar
        </button>
      )}

      {/* Quick view (espiar) — portal no body p/ escapar do transform/overflow do card */}
      {quickOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(26,23,20,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setQuickOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden md:grid-cols-2"
            style={{ background: "var(--surface-1)", borderRadius: "var(--radius-card-xl)", boxShadow: "var(--shadow-float)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickOpen(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full cursor-pointer"
              style={{ background: "rgba(255,255,255,0.92)", color: "#1a1714", boxShadow: "0 2px 8px rgba(26,23,20,0.12)" }}
            >
              <X size={17} />
            </button>

            {/* imagem */}
            <div className="relative aspect-square md:aspect-auto" style={{ background: "linear-gradient(160deg, #faf7f0, #efe9dc)" }}>
              <ImageWithFallback src={image} alt={product.name} className="absolute inset-0 h-full w-full object-contain p-8" style={{ mixBlendMode: "multiply" }} />
              {discount > 0 && (
                <span className="absolute left-5 top-5">
                  <DiscountBadge percent={discount} />
                </span>
              )}
            </div>

            {/* info */}
            <div className="flex flex-col gap-3 p-6 md:p-8">
              <span className="label" style={{ fontSize: "10px", color: "var(--amber-deep)" }}>
                {eyebrow}
              </span>
              <h3 style={{ fontFamily: "var(--font-family-inter)", fontSize: "20px", fontWeight: 700, lineHeight: 1.25, letterSpacing: 0, color: "var(--ink-strong)" }}>
                {product.name}
              </h3>
              <span className="flex items-center gap-1.5">
                <span className="flex" style={{ color: "var(--amber)" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} strokeWidth={1.5} fill={product.rating - i >= 0.5 ? "var(--amber)" : "none"} stroke={product.rating - i >= 0.5 ? "var(--amber)" : "rgba(26,23,20,0.3)"} />
                  ))}
                </span>
                <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
                  {product.rating.toFixed(1)} · {product.reviews} avaliações
                </span>
              </span>
              {cardSpecs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {cardSpecs.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-pill"
                      style={{
                        fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", fontWeight: 600,
                        color: "var(--ink-strong)", background: "var(--surface-2)",
                        border: "1px solid var(--edge)", padding: "3px 10px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {product.description && (
                <p className="line-clamp-4" style={{ fontFamily: "var(--font-family-inter)", fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.55 }}>
                  {product.description}
                </p>
              )}
              <div className="mt-auto pt-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  {oldPriceNum > product.priceNum && (
                    <span className="line-through num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-meta)" }}>
                      {product.oldPrice ?? fmtBRL(oldPriceNum)}
                    </span>
                  )}
                  <span className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-price-xl)", fontWeight: 700, letterSpacing: "-0.01em", color: discount > 0 ? "var(--amber-deep)" : "var(--ink-strong)" }}>
                    {product.price}
                  </span>
                </div>
                <div className="num" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-meta)", color: "var(--ink-soft)", marginTop: 3 }}>
                  No PIX <strong style={{ color: "var(--amber-deep)" }}>{fmtBRL(pix)}</strong> · ou {installments}x de {fmtBRL(installmentValue)}
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2.5">
                {onAdd && (
                  <button
                    type="button"
                    onClick={() => {
                      onAdd(product);
                      setQuickOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-pill cursor-pointer"
                    style={{ background: "var(--primary)", color: "#fff", padding: "14px 22px", fontFamily: "var(--font-family-inter)", fontWeight: 700, fontSize: "15px", boxShadow: "var(--shadow-buy-cta-sm)" }}
                  >
                    <ShoppingBag size={17} strokeWidth={2} /> Adicionar à sacola
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setQuickOpen(false);
                    navigate(href);
                  }}
                  className="rounded-pill cursor-pointer"
                  style={{ background: "transparent", color: "var(--ink-strong)", padding: "12px 22px", border: "1.5px solid #d6cbb5", fontFamily: "var(--font-family-inter)", fontWeight: 600, fontSize: "14.5px" }}
                >
                  Ver página completa
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </article>
  );
}
