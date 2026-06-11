import { Guitar, Ruler, Disc3, AudioWaveform, Layers, Hand, Music2 } from "lucide-react";
import type { Product } from "./productsData";
import { getLuthier } from "./productEnhancements";
import { getProductAttributes } from "./productAttributes";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* Blocos musicais da PDP (V3 §8.2/§8.3):
   - SpecTiles: 3–6 specs decisivas em tiles, acima da descrição.
     Compra considerada decide por spec (princípio V2 §2.6). Dados de
     getProductAttributes (derivados do nome do produto — fonte real do
     catálogo; specs da tabela são administrativas). <3 specs → não renderiza.
   - LuthierBlock: "Quem assina este instrumento". Renderiza só quando
     getLuthier() devolve algo. */

export function SpecTiles({ product }: { product: Product }) {
  const a = getProductAttributes(product);
  const candidates: { label: string; value?: string; icon: typeof Guitar }[] = [
    { label: "Cordas", value: a.corda ?? a.material ?? (a.cordas ? `${a.cordas} cordas` : undefined), icon: AudioWaveform },
    { label: "Tampo", value: a.tampo, icon: Layers },
    { label: "Tipo", value: a.tipo ?? a.config, icon: Guitar },
    { label: "Tamanho", value: a.tamanho ?? a.gauge, icon: Ruler },
    { label: "Linha", value: a.linha, icon: Music2 },
    { label: "Captação", value: a.eq ?? (a.cutaway ? "Cutaway" : undefined), icon: Disc3 },
    { label: "Acabamento", value: a.cor, icon: Hand },
    { label: "Para", value: a.alvo, icon: Guitar },
  ];
  const tiles = candidates.filter((t): t is { label: string; value: string; icon: typeof Guitar } => Boolean(t.value)).slice(0, 6);
  if (tiles.length < 3) return null; // poucos dados musicais → tabela completa basta

  return (
    <section aria-label="Especificações principais" className="mb-10">
      <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 14 }}>
        O que define este som
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className="flex flex-col gap-2 p-4"
              style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-card-md)", background: "var(--surface-1)" }}
            >
              <Icon size={18} strokeWidth={1.6} style={{ color: "var(--amber-deep)" }} />
              <span style={{ fontFamily: "var(--font-family-inter)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-meta)" }}>
                {t.label}
              </span>
              <span className="line-clamp-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: 13.5, fontWeight: 600, color: "var(--ink-strong)", lineHeight: 1.3 }}>
                {t.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function LuthierBlock({ product }: { product: Product }) {
  const luthier = getLuthier(product);
  if (!luthier) return null;

  return (
    <section
      aria-label="Quem assina este instrumento"
      className="my-10 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center md:p-8"
      style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-card-xl)", background: "var(--surface-2)" }}
    >
      {luthier.photo && (
        <span className="relative block h-16 w-16 flex-shrink-0 overflow-hidden rounded-full" style={{ border: "2px solid var(--amber)", padding: 0 }}>
          <ImageWithFallback
            src={luthier.photo}
            alt={luthier.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "grayscale(1)" }}
          />
        </span>
      )}
      <div className="min-w-0">
        <p className="label" style={{ color: "var(--amber-deep)", marginBottom: 6 }}>
          Quem assina este instrumento
        </p>
        <p style={{ fontFamily: "var(--font-family-figtree)", fontSize: 22, fontWeight: 700, color: "var(--ink-strong)", margin: 0, lineHeight: 1.15 }}>
          {luthier.name}
        </p>
        <p style={{ fontFamily: "var(--font-family-inter)", fontSize: 13, color: "var(--ink-meta)", margin: "3px 0 0" }}>
          {luthier.title}
        </p>
        {luthier.bio && (
          <p style={{ fontFamily: "var(--font-family-inter)", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: "10px 0 0", maxWidth: 560 }}>
            {luthier.bio}
          </p>
        )}
      </div>
    </section>
  );
}
