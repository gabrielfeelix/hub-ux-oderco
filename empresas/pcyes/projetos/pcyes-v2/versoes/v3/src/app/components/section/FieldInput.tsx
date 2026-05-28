import { forwardRef, type ComponentProps, type CSSProperties } from "react";

type FieldInputProps = ComponentProps<"input">;

const BASE_STYLE: CSSProperties = {
  padding: "11px 13px",
  borderRadius: "10px",
  border: "1px solid rgba(var(--foreground-rgb), 0.08)",
  background: "rgba(var(--foreground-rgb), 0.03)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "13px",
  fontWeight: 500,
  color: "rgb(var(--foreground-rgb))",
  width: "100%",
  outline: "none",
};

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(function FieldInput(
  { style, className = "", ...props },
  ref,
) {
  return <input ref={ref} {...props} className={className} style={{ ...BASE_STYLE, ...style }} />;
});
