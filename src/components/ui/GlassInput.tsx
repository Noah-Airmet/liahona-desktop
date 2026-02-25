"use client";

import { forwardRef } from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-glass-bg border border-glass-border
            backdrop-blur-xl rounded-xl
            text-foreground placeholder:text-foreground-subtle
            focus:outline-none focus:border-accent/40 focus:shadow-[var(--shadow-glow)]
            transition-all duration-200
            ${icon ? "pl-10 pr-4" : "px-4"} py-2.5 text-sm
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

export { GlassInput };
export type { GlassInputProps };
