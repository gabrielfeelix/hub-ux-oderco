import type { CSSProperties, ReactNode } from "react";

type Size = "sm" | "lg";

type DiscountBadgeProps = {
  /** When set, renders "-X%". Ignored if `children` is provided. */
  percent?: number;
  /** Override label (e.g. custom badge string from product data). */
  children?: ReactNode;
  size?: Size;
  className?: string;
  style?: CSSProperties;
};

const RECIPES: Record<Size, CSSProperties> = {
  // Ref claude-design: brick red #b3361f, sans (Hanken) 700, pill. Sem Bodoni
  // pesado (esmagava o "-13%") e sem tracking negativo.
  lg: {
    padding: "5px 11px",
    borderRadius: "var(--radius-pill)",
    background: "#b3361f",
    fontFamily: "var(--font-family-inter)",
    fontSize: "13px",
    fontWeight: 700,
    lineHeight: 1,
    boxShadow: "var(--shadow-discount-sm)",
  },
  sm: {
    padding: "3px 8px",
    borderRadius: "var(--radius-pill)",
    background: "#b3361f",
    fontFamily: "var(--font-family-inter)",
    fontSize: "var(--text-caption)",
    fontWeight: 700,
    lineHeight: 1,
  },
};

export function DiscountBadge({ percent, children, size = "lg", className = "", style }: DiscountBadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-white ${className}`}
      style={{ ...RECIPES[size], ...style }}
    >
      {children ?? (percent !== undefined ? `-${percent}%` : null)}
    </span>
  );
}
