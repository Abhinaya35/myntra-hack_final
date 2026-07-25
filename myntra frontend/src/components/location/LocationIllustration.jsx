import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

/**
 * LocationIllustration Component
 * Premium ambient illustration featuring a glowing location pin with pulsing radar halo rings.
 */
export const LocationIllustration = () => {
  return (
    <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-6">
      {/* Outer Pulse Ring 1 */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-primary/20 blur-md"
      />

      {/* Outer Pulse Ring 2 */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute inset-2 rounded-full bg-secondary/20 blur-sm"
      />

      {/* Glassmorphic Core Badge */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-20 h-20 rounded-3xl bg-surface/90 border border-border/80 shadow-elevated backdrop-blur-xl flex items-center justify-center"
      >
        <MapPin className="w-10 h-10 text-primary drop-shadow-sm" />
        
        {/* Floating Sparkle Detail */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1 -right-1 p-1 rounded-full bg-accent/20 border border-accent/40 text-accent"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocationIllustration;
