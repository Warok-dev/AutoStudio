import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  primaryColor?: string;
  accentColor?: string;
};

export default function Button({
  children,
  variant = "primary",
  primaryColor = "#111827",
  accentColor = "#4B5563",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const styles =
    variant === "primary"
      ? { backgroundColor: primaryColor, color: "#ffffff" }
      : { borderColor: accentColor, color: accentColor };

  const variantClass =
    variant === "primary"
      ? "shadow-sm hover:brightness-95 active:brightness-90 focus-visible:ring-zinc-500"
      : "border bg-white transition-all hover:bg-zinc-100 focus-visible:ring-zinc-400";

  return (
    <button type={type} className={`${base} ${variantClass} ${className}`.trim()} style={styles} {...props}>
      {children}
    </button>
  );
}
