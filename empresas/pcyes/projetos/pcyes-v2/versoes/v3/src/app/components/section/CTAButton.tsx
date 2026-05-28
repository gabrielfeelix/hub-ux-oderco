import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill text-white whitespace-nowrap transition-transform disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.97] outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        buy:      "bg-[var(--gradient-buy)] shadow-[var(--shadow-buy-cta)] tracking-[0.04em]",
        "buy-sm": "bg-[var(--gradient-buy)] shadow-[var(--shadow-buy-cta-sm)] tracking-[0.04em]",
        brand:    "bg-[var(--gradient-brand)] shadow-[var(--shadow-brand-cta)] tracking-[0.05em] uppercase",
        "brand-pill": "bg-[var(--gradient-brand)] shadow-[var(--shadow-brand-pill)] tracking-[0.05em] uppercase",
        preorder: "bg-[var(--gradient-preorder-orange)] shadow-[var(--shadow-preorder-cta)] tracking-[0.04em]",
      },
      size: {
        sm: "h-10 px-6 text-[11px] font-bold",
        md: "h-11 px-8 text-[12px] font-bold",
        lg: "h-12 px-10 text-[13px] font-bold",
        xl: "h-12 px-10 text-[14px] font-bold",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "buy", size: "lg", block: false },
  }
);

type CTAButtonProps = ComponentProps<"button"> & VariantProps<typeof ctaVariants>;

export function CTAButton({ className, variant, size, block, ...props }: CTAButtonProps) {
  return <button {...props} className={cn(ctaVariants({ variant, size, block, className }))} />;
}

export { ctaVariants };
