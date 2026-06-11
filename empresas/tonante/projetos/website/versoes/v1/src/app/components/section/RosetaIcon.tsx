import type { CSSProperties } from "react";

/**
 * RosetaIcon — ornamento de roseta (padrão geométrico da boca do violão).
 * Meio-arco concêntrico com ticks radiais. Assinatura Tonante (§3.3): ícone
 * default dos eyebrows de seção, no lugar de ícones genéricos lucide.
 */
export function RosetaIcon({
  size = 16,
  color = "var(--amber-deep)",
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* anéis concêntricos da roseta */}
      <circle cx="8" cy="8" r="6.2" stroke={color} strokeWidth="1" opacity="0.55" />
      <circle cx="8" cy="8" r="3.6" stroke={color} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="1.2" fill={color} />
      {/* ticks radiais (12 raios — padrão de marchetaria) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        const x1 = 8 + Math.cos(a) * 4.2;
        const y1 = 8 + Math.sin(a) * 4.2;
        const x2 = 8 + Math.cos(a) * 5.6;
        const y2 = 8 + Math.sin(a) * 5.6;
        return (
          <line
            key={i}
            x1={x1.toFixed(2)}
            y1={y1.toFixed(2)}
            x2={x2.toFixed(2)}
            y2={y2.toFixed(2)}
            stroke={color}
            strokeWidth="0.85"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}
