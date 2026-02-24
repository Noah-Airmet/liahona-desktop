import React from 'react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  // Base classes: Backdrop blur, rounded corners, transitions
  const baseClasses = "relative overflow-hidden rounded-xl font-medium transition-all duration-200 backdrop-blur-md glass-edge active:glass-edge-active flex items-center justify-center gap-2";
  
  // Size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Color variants (applying our semantic tailwind config)
  const variantClasses = {
    primary: "bg-primary/20 border border-primary/30 text-white hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]",
    secondary: "bg-glass-surface border border-glass-border text-slate-200 hover:bg-glass-hover",
    danger: "bg-rose-500/20 border border-rose-500/30 text-rose-200 hover:bg-rose-500/30",
  };

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Optional: Adds that glossy top-half gradient overlay classic to Vista/iOS */}
      <div className="absolute inset-0 h-1/2 bg-glass-gradient pointer-events-none rounded-t-xl opacity-50"></div>
      
      {/* Relative span to keep text above the glare */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
