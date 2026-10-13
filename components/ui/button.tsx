import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
      "bg-primary text-white hover:bg-primary-hover",
  secondary:
      "border border-border bg-surface hover:bg-surface-hover",
  ghost:
      "text-muted hover:bg-surface-hover hover:text-foreground",
};

export function Button({
                         variant = "primary",
                         className = "",
                         type = "button",
                         ...props
                       }: ButtonProps) {
  return (
      <button
          type={type}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
          {...props}
      />
  );
}