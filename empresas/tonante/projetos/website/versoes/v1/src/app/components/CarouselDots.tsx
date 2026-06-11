import { useEffect, useRef, useState, type RefObject } from "react";

interface CarouselDotsProps {
  /** ref to the horizontally-scrollable track element */
  trackRef: RefObject<HTMLElement>;
  /** extra classes for the wrapper */
  className?: string;
}

/** Acima deste nº de páginas, dots viram barra de progresso (dots demais = ruído). */
const MAX_DOTS = 6;

export function CarouselDots({ trackRef, className = "" }: CarouselDotsProps) {
  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(0);
  const [frac, setFrac] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const recalc = () => {
      const pageW = el.clientWidth;
      const count = pageW > 0 ? Math.ceil(el.scrollWidth / pageW) : 0;
      setPages(count > 1 ? count : 0);
      setActive(pageW > 0 ? Math.round(el.scrollLeft / pageW) : 0);
      const range = el.scrollWidth - el.clientWidth;
      setFrac(range > 0 ? el.scrollLeft / range : 0);
    };

    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(recalc);
    };

    recalc();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [trackRef]);

  if (pages < 2) return null;

  if (pages > MAX_DOTS) {
    // Barra de progresso: thumb proporcional à janela visível.
    const thumb = Math.max(1 / pages, 0.16);
    return (
      <div className={`flex justify-center md:hidden ${className}`}>
        <div
          role="scrollbar"
          aria-controls=""
          aria-valuenow={Math.round(frac * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do carrossel"
          className="relative h-11 w-[160px] cursor-pointer"
          onClick={(e) => {
            const el = trackRef.current;
            if (!el) return;
            const r = e.currentTarget.getBoundingClientRect();
            const t = (e.clientX - r.left) / r.width;
            el.scrollTo({ left: t * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
          }}
        >
          <span
            className="absolute left-0 right-0 top-1/2 block -translate-y-1/2 rounded-full"
            style={{ height: 4, background: "rgba(var(--foreground-rgb), 0.14)" }}
          />
          <span
            className="absolute top-1/2 block -translate-y-1/2 rounded-full"
            style={{
              height: 4,
              width: `${thumb * 100}%`,
              left: `${frac * (1 - thumb) * 100}%`,
              background: "var(--primary)",
              transition: "left 80ms linear",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center gap-2 md:hidden ${className}`}>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          aria-label={`Ir para página ${i + 1}`}
          onClick={() => {
            const el = trackRef.current;
            if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
          }}
          className="flex h-11 w-6 items-center justify-center"
        >
          <span
            className="block rounded-full transition-all"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.2)",
            }}
          />
        </button>
      ))}
    </div>
  );
}
