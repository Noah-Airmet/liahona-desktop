interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

const GlassBadge = ({ children, variant = "default", className = "" }: GlassBadgeProps) => {
  const variantStyles = {
    default: "bg-glass-bg border-glass-border text-foreground-muted",
    accent: "bg-accent/10 border-accent/20 text-accent",
  };

  return (
    <span
      className={`
        ${variantStyles[variant]}
        inline-flex items-center
        border rounded-lg
        px-2 py-0.5 text-xs font-medium
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export { GlassBadge };
export type { GlassBadgeProps };
