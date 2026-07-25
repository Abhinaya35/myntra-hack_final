import React from 'react';
import { motion } from 'framer-motion';

/**
 * AuthHeader Component
 * Dynamically displays editorial title & subtitle based on active auth mode ('login' vs 'register').
 */
export const AuthHeader = ({ mode }) => {
  const isLogin = mode === 'login';

  return (
    <div className="text-center space-y-3 mb-6 sm:mb-8">
      {/* Brand Badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary shadow-subtle mb-1"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2L18 8v8l-6 3.8L6 16V8l6-3.8z" />
        </svg>
        <span className="tracking-wider uppercase text-[11px]">
          Regional Fashion Icons
        </span>
      </motion.div>

      {/* Main Heading */}
      <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h1>

      {/* Subheading */}
      <p className="text-xs sm:text-sm text-text-muted font-normal max-w-sm mx-auto leading-relaxed">
        {isLogin
          ? 'Sign in to continue your fashion journey.'
          : "Join to discover India's most trusted regional fashion stores."}
      </p>
    </div>
  );
};

export default AuthHeader;
