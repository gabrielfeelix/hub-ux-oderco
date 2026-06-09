import { Award, BadgeCheck, Heart, type LucideIcon } from "lucide-react";

// Pillars — 3 pilares de marca (porta _ref/src/home_sections.jsx Pillars).
type Pillar = { icon: LucideIcon; title: string; sub: string };

const pillars: Pillar[] = [
  { icon: Award, title: "Desde 1954", sub: "Mais de 70 anos fazendo instrumentos que viram história." },
  { icon: BadgeCheck, title: "Garantia de 2 anos", sub: "Qualidade que a gente assina embaixo, em cada produto." },
  { icon: Heart, title: "Música pra todos", sub: "Do primeiro acorde ao palco — preço justo e suporte de verdade." },
];

export function Pillars() {
  return (
    <section className="px-5 md:px-[72px]" style={{ background: "var(--surface-0)", paddingTop: "var(--space-section-md)" }}>
      <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3" style={{ maxWidth: "1600px" }}>
        {pillars.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-start gap-4"
            style={{ padding: "26px 24px", background: "var(--surface-1)", border: "1px solid #e4dccc", borderRadius: "var(--radius-card-lg)" }}
          >
            <span className="grid flex-shrink-0 place-items-center rounded-full" style={{ width: 48, height: 48, background: "rgba(200,120,0,.12)" }}>
              <Icon size={24} strokeWidth={1.8} style={{ color: "var(--amber-deep)" }} />
            </span>
            <div>
              <h3 className="text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "21px", fontWeight: 600, margin: 0 }}>
                {title}
              </h3>
              <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.5, margin: "6px 0 0" }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
