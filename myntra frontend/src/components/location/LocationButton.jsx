import React from 'react';
import { motion } from 'framer-motion';

/**
 * LocationButton Component
 * Reusable action button supporting primary, secondary, and ghost variants.
 */
export const LocationButton = ({
  children,
  onClick,
  variant = 'primary',
  fullWidth = true,
  icon: Icon,
  disabled = false,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover shadow-subtle hover:shadow-card focus:ring-4 focus:ring-primary/20',
    secondary:
      'bg-surface border border-border/80 text-text-primary hover:border-primary/40 hover:bg-background/80 shadow-subtle',
    ghost:
      'bg-transparent text-text-muted hover:text-text-primary hover:bg-background/50',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default LocationButton;
