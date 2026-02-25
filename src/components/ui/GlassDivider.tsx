interface GlassDividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const GlassDivider = ({ orientation = "horizontal", className = "" }: GlassDividerProps) => {
  return (
    <div
      className={`
        ${orientation === "horizontal" ? "h-px w-full" : "w-px h-full"}
        bg-glass-border
        ${className}
      `}
    />
  );
};

export { GlassDivider };
export type { GlassDividerProps };
