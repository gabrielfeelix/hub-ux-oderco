import visaLogo from "./icons/visa-logo.svg";
import mastercardLogo from "./icons/mastercard-logo.svg";

const LOGOS: Record<string, string> = {
  visa: visaLogo,
  mastercard: mastercardLogo,
};

export function CardBrandLogo({ brand, className, style }: { brand: string; className?: string; style?: React.CSSProperties }) {
  const key = brand.toLowerCase().replace(/\s+/g, "");
  const src = LOGOS[key];
  if (!src) {
    return (
      <div className={className} style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
          {brand}
        </span>
      </div>
    );
  }
  return <img src={src} alt={brand} className={className} style={style} />;
}
