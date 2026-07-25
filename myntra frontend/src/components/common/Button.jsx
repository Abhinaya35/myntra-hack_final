import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Editorial Button component
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary/40 shadow-sm hover:shadow",
    secondary: "bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary/40 shadow-sm",
    accent: "bg-accent text-text-primary hover:bg-accent-hover focus:ring-accent/40 font-semibold shadow-sm",
    outline: "border border-border bg-surface text-text-primary hover:bg-background hover:border-text-primary/20 focus:ring-primary/20",
    ghost: "bg-transparent text-text-primary hover:bg-background/80 focus:ring-primary/20",
    link: "bg-transparent text-primary hover:underline p-0 h-auto font-medium focus:ring-0",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
    icon: "p-2.5 text-sm aspect-square",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
          {children}
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

export default Button;
