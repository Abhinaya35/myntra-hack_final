import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthHeader from './AuthHeader';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthFooter from './AuthFooter';

/**
 * AuthCard Component
 * Centered glassmorphic container managing mode transitions between Login and Register.
 */
export const AuthCard = ({ mode, onToggleMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-[440px] mx-auto bg-surface/90 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-8 shadow-elevated overflow-hidden"
    >
      {/* Header */}
      <AuthHeader mode={mode} />

      {/* Dynamic Animated Form Swap */}
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <LoginForm onToggleMode={onToggleMode} />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <RegisterForm onToggleMode={onToggleMode} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Skip Button */}
      <AuthFooter />
    </motion.div>
  );
};

export default AuthCard;
