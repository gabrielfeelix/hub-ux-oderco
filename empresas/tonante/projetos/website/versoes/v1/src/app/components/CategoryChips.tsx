"use client";

import { Link } from "react-router";
import { Guitar, AudioLines, Cable, Mic, Tag, type LucideIcon } from "lucide-react";
import { getCatalogHref } from "./productPresentation";

/**
 * CategoryChips — wayfinding sob o hero (§6.3). Linha única de chips-pill,
 * scroll-x no mobile. Leva direto às rotas de categoria; chip "Ofertas" destacado.
 * Compra de instrumento é considerada → navegação categoria-first na 1ª dobra.
 */
type Chip = { label: string; icon: LucideIcon; href: string; cta?: boolean };

const CHIPS: Chip[] = [
  { label: "Violões", icon: Guitar, href: getCatalogHref({ category: "Violões" }) },
  { label: "Guitarras", icon: Guitar, href: getCatalogHref({ category: "Guitarras" }) },
  { label: "Contrabaixos", icon: Guitar, href: getCatalogHref({ category: "Contrabaixos" }) },
  { label: "Cordas", icon: AudioLines, href: getCatalogHref({ category: "Cordas & Encordoamentos" }) },
  { label: "Acessórios", icon: Cable, href: getCatalogHref({ category: "Acessórios" }) },
  { label: "Suportes", icon: Mic, href: getCatalogHref({ category: "Suportes" }) },
  { label: "Ofertas", icon: Tag, href: "/produtos?promo=1", cta: true },
];

export function CategoryChips() {
  return (
    <nav
      aria-label="Categorias"
      className="px-5 pt-5 md:px-[72px] md:pt-6"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <ul className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible category-track">
          {CHIPS.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.label} className="shrink-0">
                <Link
                  to={c.href}
                  className="inline-flex items-center gap-2 rounded-pill transition-all hover:-translate-y-0.5"
                  style={{
                    minHeight: 44,
                    padding: "10px 16px",
                    fontFamily: "var(--font-family-inter)",
                    fontWeight: 600,
                    fontSize: "13px",
                    background: c.cta ? "var(--gradient-buy)" : "var(--surface-1)",
                    color: c.cta ? "#fff" : "var(--ink-strong)",
                    border: c.cta ? "1px solid transparent" : "1px solid var(--edge)",
                    boxShadow: c.cta ? "var(--shadow-buy-cta-sm)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!c.cta) {
                      e.currentTarget.style.borderColor = "rgba(200,120,0,0.5)";
                      e.currentTarget.style.boxShadow = "var(--shadow-deal-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!c.cta) {
                      e.currentTarget.style.borderColor = "var(--edge)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: c.cta ? "#fff" : "var(--amber-deep)" }} />
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
