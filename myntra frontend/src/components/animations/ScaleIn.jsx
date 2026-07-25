import React from 'react';
import { motion } from 'framer-motion';

/**
 * Generic reusable Framer Motion ScaleIn animation wrapper
 */
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.25,
  initialScale = 0.95,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
