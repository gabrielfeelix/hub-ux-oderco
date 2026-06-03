import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { Truck, CreditCard, ShieldCheck, RefreshCcw, type LucideIcon } from "lucide-react";

type Feature = { icon: LucideIcon; title: string; desc: string };

const features: Feature[] = [
  { icon: Truck,        title: "Frete grátis",       desc: "Acima de R$ 299 pra todo Brasil" },
  { icon: CreditCard,   title: "Até 12x sem juros",  desc: "Em todos os cartões" },
  { icon: ShieldCheck,  title: "Compra 100% segura", desc: "Pagamento criptografado" },
  { icon: RefreshCcw,   title: "Troca grátis",       desc: "7 dias para devolver" },
];

const ROTATE_MS = 4500;
// Pair features into two-item slides for the mobile carousel.
const mobilePages: Feature[][] = [features.slice(0, 2), features.slice(2, 4)];

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div className="group flex flex-col items-center justify-start gap-2 text-center md:flex-row md:items-center md:gap-4 md:text-left">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 md:h-14 md:w-14">
        <f.icon
          strokeWidth={1.6}
          aria-hidden="true"
          className="size-4 text-white/55 transition-colors duration-300 group-hover:text-primary md:size-[22px]"
        />
      </div>
      <div className="min-w-0">
        <p
          className="text-white leading-tight"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "clamp(13px, 3.4vw, 16px)",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {f.title}
        </p>
        {/* Description shows from md+ only — keeps mobile compact while desktop keeps the E-EAT detail. */}
        <p
          className="hidden md:block text-white/45"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "13px",
            lineHeight: 1.4,
          }}
        >
          {f.desc}
        </p>
      </div>
    </div>
  );
}

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  // Mobile carousel state — paged 2-by-2.
  const [page, setPage] = useState(0);
  const [hasFocus, setHasFocus] = useState(false);
  const isAutoplayDisabled = hasFocus || !!prefersReducedMotion;

  useEffect(() => {
    if (isAutoplayDisabled) return;
    const id = setInterval(() => setPage((p) => (p + 1) % mobilePages.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [isAutoplayDisabled]);

  return (
    <section
      ref={ref}
      className="border-y border-white/5 px-5 py-6 md:px-[72px] md:py-12"
      style={{ background: "#0a0a0a" }}
    >
      {/* Mobile: paged carousel (2 cards per page, auto-rotate). */}
      <div
        className="md:hidden mx-auto max-w-[640px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Vantagens PCYES"
        onFocus={() => setHasFocus(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHasFocus(false); }}
        onMouseEnter={() => setHasFocus(true)}
        onMouseLeave={() => setHasFocus(false)}
      >
        <div className="relative min-h-[120px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-x-4 gap-y-5"
              aria-live="polite"
              aria-atomic="true"
            >
              {mobilePages[page].map((f) => (
                <FeatureCard key={f.title} f={f} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {mobilePages.map((_, i) => {
            const active = i === page;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Mostrar página ${i + 1} de ${mobilePages.length}`}
                aria-current={active ? "true" : undefined}
                className="inline-flex h-10 min-w-10 items-center justify-center px-1.5 focus-visible:outline-none cursor-pointer"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    height: "6px",
                    width: active ? "28px" : "8px",
                    background: active ? "var(--primary)" : "rgba(255,255,255,0.25)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop / tablet: full 4-up grid, no carousel. */}
      <div className="hidden mx-auto max-w-[1200px] md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06 * i }}
          >
            <FeatureCard f={f} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
