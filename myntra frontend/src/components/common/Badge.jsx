import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Badge component for specializations, verification, and tags
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium tracking-wide uppercase rounded-full border transition-colors";

  const variants = {
    default: "bg-background border-border text-text-muted",
    verified: "bg-emerald-50 border-emerald-200 text-emerald-700",
    regional: "bg-primary-light/60 border-primary/20 text-primary font-semibold",
    iconic: "bg-accent-light border-accent/40 text-amber-900 font-semibold",
    outline: "bg-transparent border-border text-text-primary",
    secondary: "bg-secondary-light/60 border-secondary/20 text-secondary font-semibold",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
};

export default Badge;
