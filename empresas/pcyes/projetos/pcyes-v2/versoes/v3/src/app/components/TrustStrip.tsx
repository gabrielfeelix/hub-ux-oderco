import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Truck, CreditCard, ShieldCheck, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Frete grátis",
    desc: "Acima de R$ 299 pra todo Brasil",
  },
  {
    icon: CreditCard,
    title: "Até 12x sem juros",
    desc: "Em todos os cartões",
  },
  {
    icon: ShieldCheck,
    title: "Compra 100% segura",
    desc: "Pagamento criptografado",
  },
  {
    icon: RefreshCcw,
    title: "Troca grátis",
    desc: "7 dias para devolver",
  },
];

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="border-y border-white/5 px-5 py-6 md:px-[72px] md:py-12"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-x-6 md:gap-y-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06 * i }}
            className="group flex flex-col items-center justify-start gap-2 text-center md:flex-row md:items-center md:gap-4 md:text-left"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 md:h-14 md:w-14">
              <f.icon
                strokeWidth={1.6}
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
              {/* Description only shows from md up — keeps mobile compact while desktop keeps the E-EAT detail. */}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
