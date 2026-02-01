
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'interactive';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverable = false, 
  onClick,
  variant = 'default'
}) => {
  const baseClasses = "glass-effect rounded-2xl p-6 transition-all duration-300 relative overflow-hidden";
  const hoverClasses = hoverable 
    ? "hover:bg-slate-800/80 hover:scale-[1.01] hover:shadow-2xl cursor-pointer" 
    : "";
  
  const variantStyles = {
    default: "border-slate-700/50",
    elevated: "shadow-lg bg-slate-800/40",
    interactive: "border-primary/20 hover:border-primary/50 group"
  };

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </div>
  );
};

export default GlassCard;
