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
                  className="group/chip inline-flex items-center gap-2 rounded-pill transition-all hover:-translate-y-0.5"
                  style={{
                    minHeight: 44,
                    padding: "10px 18px",
                    fontFamily: "var(--font-family-inter)",
                    fontWeight: 600,
                    fontSize: "14px",
                    // não-cta: pill ink sólido (preto, rock) com texto creme;
                    // cta "Ofertas": âmbar de marca. Sem look "vazadinho".
                    background: c.cta ? "var(--gradient-brand)" : "var(--ink-strong)",
                    color: c.cta ? "#fff" : "#f4f1ec",
                    border: "1px solid transparent",
                    boxShadow: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!c.cta) e.currentTarget.style.background = "#000";
                  }}
                  onMouseLeave={(e) => {
                    if (!c.cta) e.currentTarget.style.background = "var(--ink-strong)";
                  }}
                >
                  <Icon size={18} strokeWidth={1.6} style={{ color: c.cta ? "#fff" : "var(--amber-bright)" }} />
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
