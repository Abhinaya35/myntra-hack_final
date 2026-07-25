import React, { useState, useEffect } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';

/**
 * AuthenticationPage Component (Route: /auth)
 * Unified single-page authentication view offering seamless switching between Login and Register modes.
 * UI-only presentation (No API/Auth logic implemented).
 */
export const AuthenticationPage = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <AuthLayout>
      <AuthCard mode={mode} onToggleMode={handleToggleMode} />
    </AuthLayout>
  );
};

export default AuthenticationPage;
