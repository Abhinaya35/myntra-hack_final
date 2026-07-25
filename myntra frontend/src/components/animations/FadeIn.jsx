import React from 'react';
import { motion } from 'framer-motion';

/**
 * Generic reusable Framer Motion FadeIn animation wrapper
 */
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.3,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  className = '',
  ...props
}) => {
  const directions = {
    up: { y: 16, x: 0 },
    down: { y: -16, x: 0 },
    left: { x: 16, y: 0 },
    right: { x: -16, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
