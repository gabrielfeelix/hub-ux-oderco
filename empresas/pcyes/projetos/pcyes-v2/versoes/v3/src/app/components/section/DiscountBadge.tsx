import type { CSSProperties } from "react";

type Size = "sm" | "lg";

type DiscountBadgeProps = {
  percent: number;
  size?: Size;
  className?: string;
  style?: CSSProperties;
};

const RECIPES: Record<Size, CSSProperties> = {
  lg: {
    padding: "6px 12px",
    borderRadius: "10px",
    background: "var(--gradient-discount)",
    fontFamily: "var(--font-family-figtree)",
    fontSize: "15px",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    boxShadow: "var(--shadow-discount-badge)",
  },
  sm: {
    padding: "2px 6px",
    borderRadius: "var(--radius-md)",
    background: "var(--gradient-discount)",
    fontFamily: "var(--font-family-inter)",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    boxShadow: "var(--shadow-discount-sm)",
    lineHeight: 1,
  },
};

export function DiscountBadge({ percent, size = "lg", className = "", style }: DiscountBadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-white ${className}`}
      style={{ ...RECIPES[size], ...style }}
    >
      -{percent}%
    </span>
  );
}
