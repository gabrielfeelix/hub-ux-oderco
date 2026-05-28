import { Minus, Plus } from "lucide-react";

type Size = "sm" | "md";

type QtyStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: Size;
  disabled?: boolean;
  className?: string;
};

const SIZE_MAP: Record<Size, { btn: string; num: string; numFontSize: string; iconSize: number }> = {
  sm: { btn: "w-7 h-7", num: "w-8 h-7", numFontSize: "12px", iconSize: 12 },
  md: { btn: "w-8 h-9", num: "w-9 h-9", numFontSize: "13px", iconSize: 12 },
};

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max,
  size = "md",
  disabled,
  className = "",
}: QtyStepperProps) {
  const s = SIZE_MAP[size];
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1);

  return (
    <div
      className={`inline-flex items-center border border-foreground/12 overflow-hidden ${className}`}
      style={{ borderRadius: "var(--radius-button)" }}
    >
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        className={`${s.btn} flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Diminuir quantidade"
      >
        <Minus size={s.iconSize} />
      </button>
      <span
        className={`${s.num} flex items-center justify-center text-foreground border-x border-foreground/10 select-none tabular-nums`}
        style={{ fontFamily: "var(--font-family-inter)", fontSize: s.numFontSize, fontWeight: 600 }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={disabled || (max !== undefined && value >= max)}
        className={`${s.btn} flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Aumentar quantidade"
      >
        <Plus size={s.iconSize} />
      </button>
    </div>
  );
}
