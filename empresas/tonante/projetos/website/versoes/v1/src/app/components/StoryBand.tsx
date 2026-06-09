import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

// StoryBand — faixa de herança 1954 (porta _ref/src/home.jsx StoryBand).
// Stage escuro quente, glow âmbar, símbolo gigante, headline serif com acento.
export function StoryBand() {
  return (
    <section className="px-5 md:px-[72px]" style={{ background: "var(--surface-0)", paddingTop: "var(--space-section-md)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div
          data-keep-dark
          className="grain relative overflow-hidden"
          style={{
            borderRadius: "var(--radius-card-xl)",
            background: "linear-gradient(120deg, #16130f, #241d14)",
            color: "#f3ebde",
            padding: "clamp(34px,6vw,72px)",
          }}
        >
          <div
            className="pointer-events-none absolute"
            style={{ right: "-4%", bottom: "-30%", width: 480, height: 480, background: "radial-gradient(circle, rgba(200,120,0,.30), transparent 65%)" }}
          />
          <img
            src="/brand/tonante-symbol-amber.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute hidden select-none md:block"
            style={{ right: "6%", top: "50%", transform: "translateY(-50%)", width: 220, opacity: 0.35 }}
          />
          <div className="relative z-[2]" style={{ maxWidth: 600 }}>
            <p className="label" style={{ color: "var(--amber)", marginBottom: 18 }}>
              Nossa história · 1954
            </p>
            <h2
              style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(30px,4.6vw,54px)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0 }}
            >
              Dois irmãos, um plano:
              <br />
              <span style={{ fontStyle: "italic", color: "var(--amber)" }}>música para todos.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "17px", lineHeight: 1.65, color: "#d8cdba", margin: "22px 0 0", maxWidth: 500 }}>
              Numa época em que a música chegava a muitos, mas os instrumentos a poucos, a Tonante
              nasceu para mudar isso. Mais de meio século depois, seguimos com o mesmo desejo — agora
              com muito mais experiência.
            </p>
            <Link
              to="/quem-somos"
              className="mt-8 inline-flex items-center gap-2 rounded-pill cursor-pointer transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--primary)", color: "#fff", padding: "15px 28px", fontFamily: "var(--font-family-inter)", fontWeight: 600, fontSize: "16px" }}
            >
              Faça parte da história <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
