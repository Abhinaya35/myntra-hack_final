import React from 'react';
import { motion } from 'framer-motion';

/**
 * Generic reusable Framer Motion PageTransition wrapper
 */
export const PageTransition = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
