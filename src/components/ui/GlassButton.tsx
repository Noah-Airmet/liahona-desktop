"use client";

import { forwardRef } from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  active?: boolean;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ variant = "default", size = "md", active = false, className = "", children, ...props }, ref) => {
    const variantStyles = {
      default: `
        bg-glass-bg border-glass-border
        hover:bg-glass-bg-hover hover:border-glass-border-strong
        active:bg-glass-bg-active
      `,
      accent: `
        bg-accent/15 border-accent/30 text-accent
        hover:bg-accent/25 hover:border-accent/50
        active:bg-accent/35
      `,
      ghost: `
        bg-transparent border-transparent
        hover:bg-glass-bg hover:border-glass-border
        active:bg-glass-bg-hover
      `,
    };

    const sizeStyles = {
      sm: "px-2.5 py-1 text-xs gap-1.5",
      md: "px-3.5 py-2 text-sm gap-2",
      lg: "px-5 py-2.5 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${active ? "bg-glass-bg-active border-glass-border-strong" : ""}
          inline-flex items-center justify-center
          border backdrop-blur-sm rounded-xl
          text-foreground font-medium
          transition-all duration-150
          cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
export type { GlassButtonProps };
