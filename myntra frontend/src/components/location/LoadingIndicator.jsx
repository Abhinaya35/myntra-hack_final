import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  'Finding your location...',
  'Looking for trusted regional stores...',
  'Preparing your recommendations...',
];

/**
 * LoadingIndicator Component
 * Renders an animated progress indicator with cycling status messages.
 */
export const LoadingIndicator = ({ duration = 2200 }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalTime = duration / LOADING_MESSAGES.length;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="w-full max-w-xs mx-auto space-y-3">
      {/* Animated Progress Bar */}
      <div className="w-full h-1.5 bg-border/60 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: duration / 1000, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
        />
      </div>

      {/* Cycling Status Message */}
      <div className="h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-semibold tracking-wider uppercase text-text-muted text-center"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingIndicator;
