"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * StringDivider — divisor de 6 cordas (assinatura Tonante §3.1).
 * Espessuras 0.5→1.5px (mizinha→bordão); a 3ª corda em --amber-deep.
 * Entrada no viewport: ondulação única em stagger ("alguém passou o dedo").
 * Hover (desktop): a corda sob o cursor vibra. reduced-motion: estático.
 * Decorativo — aria-hidden. Máx. 3 por página.
 */
const N = 6;
const GAP = 7;
const PAD = 6;
const H = PAD * 2 + GAP * (N - 1);

export function StringDivider({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(-1);

  return (
    <div ref={ref} className={className} style={{ width: "100%", ...style }} aria-hidden="true">
      <svg width="100%" height={H} viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" role="presentation">
        {Array.from({ length: N }).map((_, i) => {
          const y = PAD + i * GAP;
          const sw = 0.5 + (i / (N - 1)) * 1.0; // 0.5 → 1.5
          const isAmber = i === 2;
          const active = hover === i && !reduce;
          const ripple = !reduce && inView ? { y: [0, -4, 3, -2, 1, 0] } : { y: 0 };
          return (
            <motion.line
              key={i}
              x1="0"
              x2="1000"
              y1={y}
              y2={y}
              stroke={isAmber ? "var(--amber-deep)" : "var(--edge)"}
              strokeWidth={sw}
              strokeLinecap="round"
              initial={{ y: 0 }}
              animate={active ? { y: [0, -3.5, 2.5, -1.5, 0.5, 0] } : ripple}
              transition={
                active
                  ? { duration: 0.5, ease: "easeOut" }
                  : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }
              }
            />
          );
        })}
        {/* faixas transparentes p/ captar hover por corda */}
        {Array.from({ length: N }).map((_, i) => {
          const y = PAD + i * GAP;
          return (
            <line
              key={`hit-${i}`}
              x1="0"
              x2="1000"
              y1={y}
              y2={y}
              stroke="transparent"
              strokeWidth={GAP}
              style={{ pointerEvents: "stroke", cursor: "pointer" }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? -1 : h))}
            />
          );
        })}
      </svg>
    </div>
  );
}
