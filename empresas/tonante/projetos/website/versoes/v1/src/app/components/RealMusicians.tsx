import { Instagram } from "lucide-react";

// RealMusicians — "Tonante por aí" (porta _ref/src/home_sections.jsx).
// Cards UGC com tons quentes + símbolo + handle. Placeholder até entrarem fotos reais.
const shots: { h: number; tone: [string, string]; handle: string }[] = [
  { h: 360, tone: ["#b5793c", "#6e4220"], handle: "@joaoviolao" },
  { h: 300, tone: ["#7e3a24", "#3e160e"], handle: "@bandadaesquina" },
  { h: 400, tone: ["#3a352f", "#16130f"], handle: "@luiza.strings" },
  { h: 320, tone: ["#a8772f", "#6a4516"], handle: "@studio.norte" },
  { h: 370, tone: ["#d2a86a", "#9a6a33"], handle: "@pedro.live" },
];

export function RealMusicians() {
  return (
    <section className="px-5 md:px-[72px]" style={{ background: "var(--surface-0)", paddingTop: "var(--space-section-md)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-8">
          <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 12 }}>
            Tonante por aí
          </p>
          <h2 className="text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(28px,3.8vw,46px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>
            Músicos de verdade, palcos de verdade
          </h2>
        </div>

        <div className="no-bar -mx-1 flex items-end gap-4 overflow-x-auto px-1 pb-2">
          {shots.map((s, i) => (
            <div
              key={i}
              data-keep-dark
              className="grain relative overflow-hidden"
              style={{ flex: "0 0 280px", height: s.h, borderRadius: "var(--radius-card-lg)", background: `radial-gradient(120% 120% at 40% 20%, ${s.tone[0]}, ${s.tone[1]})` }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,.5))" }} />
              <img src="/brand/tonante-symbol-white.png" alt="" aria-hidden="true" className="pointer-events-none absolute select-none" style={{ left: "50%", top: "44%", transform: "translate(-50%,-50%)", width: "44%", opacity: 0.8 }} />
              <div className="absolute bottom-3.5 left-4 z-[2] flex items-center gap-2" style={{ color: "#fff" }}>
                <Instagram size={16} strokeWidth={1.8} />
                <span style={{ fontFamily: "var(--font-family-inter)", fontWeight: 600, fontSize: "13.5px" }}>{s.handle}</span>
              </div>
              <span className="label absolute right-3.5 top-3.5 z-[2]" style={{ color: "rgba(255,255,255,.7)", fontSize: "8.5px" }}>
                Foto real aqui
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
