import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useTheme } from "./ThemeProvider";
import { Star, Check, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface ReviewItem {
  name: string;
  image: string;
  price: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: string;
  items: ReviewItem[];
  onSubmit: (review: { ratings: Record<string, number>; comment: string }) => void;
}

const RATING_LABELS = ["", "Péssimo", "Ruim", "Ok", "Bom", "Excelente"];

export function ReviewModal({ open, onClose, orderId, items, onSubmit }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [hoverRatings, setHoverRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    if (open) {
      setRatings({});
      setHoverRatings({});
      setComment("");
      setSubmitted(false);
      setEarnedPoints(0);
    }
  }, [open]);

  const rated = Object.keys(ratings).length;
  const total = items.length;
  const allRated = rated === total && total > 0;
  const avgRating = rated > 0 ? Object.values(ratings).reduce((a, b) => a + b, 0) / rated : 0;

  const handleSubmit = () => {
    if (!allRated) return;
    const pts = total * 5;
    setEarnedPoints(pts);
    onSubmit({ ratings, comment });
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        className="!max-w-[560px] !p-0 !gap-0 !border-0"
        style={{
          background: isDark ? "#161617" : "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          color: isDark ? "#fafafa" : "#0a0a0a",
        }}
      >
        {!submitted ? (
          <>
            <div className="px-6 pt-6 pb-4 flex items-start gap-3" style={{ borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(250,204,21,0.14)" }}>
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle style={{ fontFamily: "var(--font-family-figtree)", fontSize: "17px", fontWeight: 600, color: isDark ? "#fafafa" : "#0a0a0a" }}>
                  Avaliar pedido {orderId}
                </DialogTitle>
                <DialogDescription style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", marginTop: 4, color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>
                  Sua nota ajuda outros gamers a escolherem · Ganhe <span style={{ color: "#facc15", fontWeight: 700 }}>+{total * 5} pts</span>
                </DialogDescription>
              </div>
            </div>

            <div className="px-6 py-4 max-h-[55vh] overflow-y-auto">
              <div className="space-y-3">
                {items.map((item, i) => {
                  const key = `${i}-${item.name}`;
                  const rating = ratings[key] ?? 0;
                  const hover = hoverRatings[key] ?? 0;
                  const display = hover || rating;
                  return (
                    <div key={key} className="flex items-center gap-3 p-3" style={{ borderRadius: "12px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden border border-foreground/5" style={{ borderRadius: "8px", background: isDark ? "#1a1a1c" : "#f5f5f5" }}>
                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: "var(--font-weight-medium)", color: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.92)" }}>{item.name}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const filled = display >= star;
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onMouseEnter={() => setHoverRatings((h) => ({ ...h, [key]: star }))}
                                  onMouseLeave={() => setHoverRatings((h) => ({ ...h, [key]: 0 }))}
                                  onClick={() => setRatings((r) => ({ ...r, [key]: star }))}
                                  className="cursor-pointer p-0.5 transition-transform hover:scale-110"
                                >
                                  <Star size={20} className={filled ? "fill-yellow-400 text-yellow-400" : ""} style={!filled ? { color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" } : undefined} strokeWidth={1.5} />
                                </button>
                              );
                            })}
                          </div>
                          {display > 0 && (
                            <span className="ml-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 600, color: "#facc15" }}>{RATING_LABELS[display]}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <label className="block mb-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>
                  Comentário <span style={{ fontWeight: 500, letterSpacing: "0.04em", color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>(opcional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conta pra galera o que achou do produto, entrega, qualidade..."
                  rows={3}
                  className="w-full focus:outline-none focus:border-primary/40 transition-all resize-none"
                  style={{
                    padding: "11px 13px",
                    borderRadius: "10px",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "13px",
                    color: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.92)",
                    lineHeight: 1.5,
                  }}
                />
                <p className="mt-1 text-right" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px", color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>{comment.length}/500</p>
              </div>
            </div>

            <div className="px-6 pb-5 pt-3 flex items-center justify-between gap-2.5" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
              <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px", color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>
                {allRated ? <><Check size={11} className="inline" /> Pronto pra enviar</> : `${rated}/${total} ${rated === 1 ? "item avaliado" : "itens avaliados"}`}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 cursor-pointer hover:brightness-110 transition-all"
                  style={{ borderRadius: 10, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 600, color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)" }}>
                  Cancelar
                </button>
                <button type="button" onClick={handleSubmit} disabled={!allRated}
                  className="px-4 py-2 bg-primary text-primary-foreground transition-all"
                  style={{ borderRadius: 10, fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 700, opacity: allRated ? 1 : 0.45, cursor: allRated ? "pointer" : "not-allowed" }}>
                  Enviar avaliação
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: 9999, background: "rgba(34,197,94,0.12)" }}>
              <Check size={28} className="text-green-500" strokeWidth={2.5} />
            </div>
            <h3 style={{ fontFamily: "var(--font-family-figtree)", fontSize: "20px", fontWeight: 600, color: isDark ? "#fafafa" : "#0a0a0a" }}>
              Valeu pela avaliação!
            </h3>
            <p className="mt-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "13px", color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>
              Nota média {avgRating.toFixed(1)} ⭐ · Sua opinião vai ajudar a galera
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2.5" style={{ borderRadius: "12px", background: "rgba(250,204,21,0.10)", border: "1px solid rgba(250,204,21,0.28)" }}>
              <Sparkles size={14} style={{ color: "#facc15" }} />
              <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "12.5px", fontWeight: 700, color: "#facc15" }}>
                +{earnedPoints} PCYES Points creditados
              </span>
            </div>
            <div className="mt-6">
              <button type="button" onClick={onClose} className="px-5 py-2.5 bg-primary text-primary-foreground hover:brightness-110 transition-all cursor-pointer"
                style={{ borderRadius: 10, fontFamily: "var(--font-family-inter)", fontSize: "13px", fontWeight: 700 }}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
