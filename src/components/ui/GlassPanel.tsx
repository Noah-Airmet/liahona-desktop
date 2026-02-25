"use client";

import { forwardRef } from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle";
  noPadding?: boolean;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ variant = "default", noPadding = false, className = "", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-glass-bg border-glass-border",
      strong: "bg-glass-bg-hover border-glass-border-strong",
      subtle: "bg-glass-bg/50 border-glass-border/50",
    };

    return (
      <div
        ref={ref}
        className={`
          ${variantStyles[variant]}
          border backdrop-blur-xl rounded-2xl
          shadow-[var(--shadow-md)]
          ${noPadding ? "" : "p-4"}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
export type { GlassPanelProps };
