import React from 'react';

interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPane: React.FC<GlassPaneProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-glass-surface 
      backdrop-blur-xl 
      border border-glass-border 
      rounded-2xl 
      shadow-2xl 
      glass-edge
      overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  );
};
