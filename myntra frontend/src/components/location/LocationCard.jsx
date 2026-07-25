import React from 'react';
import { motion } from 'framer-motion';

/**
 * LocationCard Component
 * Centered glassmorphic card container for location experience views.
 */
export const LocationCard = ({ children, maxWidth = 'max-w-[560px]' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative z-10 w-full ${maxWidth} mx-auto bg-surface/90 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-10 shadow-elevated text-center overflow-hidden`}
    >
      {children}
    </motion.div>
  );
};

export default LocationCard;
