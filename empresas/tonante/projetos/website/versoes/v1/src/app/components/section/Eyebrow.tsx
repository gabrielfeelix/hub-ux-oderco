import type { CSSProperties, ReactNode } from "react";
import { RosetaIcon } from "./RosetaIcon";

type EyebrowProps = {
  children: ReactNode;
  /** undefined → roseta default (§3.3); null → sem ícone; ReactNode → custom. */
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Eyebrow({ children, icon, className = "", style }: EyebrowProps) {
  const resolvedIcon = icon === undefined ? <RosetaIcon size={14} /> : icon;
  return (
    <span
      className={`inline-flex items-center gap-2 text-primary ${className}`}
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 700,
        letterSpacing: "0.3em",
        ...style,
      }}
    >
      {resolvedIcon}
      {children}
    </span>
  );
}
