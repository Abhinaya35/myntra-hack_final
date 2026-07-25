import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

/**
 * LoginForm Component
 * Authenticates user via POST /auth/login and stores session token.
 */
export const LoginForm = ({ onToggleMode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await login(formData.email.trim(), formData.password);
      // On success, redirect to Landing Page
      navigate(ROUTES.HOME);
    } catch (err) {
      setServerError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
      {/* Global Server Error Banner */}
      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-500 flex items-center gap-2 text-left"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </motion.div>
      )}

      {/* Email Address Input */}
      <div className="space-y-1.5 text-left">
        <label className="block text-xs font-semibold text-text-primary">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            disabled={isSubmitting}
            className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-surface border text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 transition-all outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.email
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-border/80 hover:border-primary/40 focus:border-primary'
            }`}
          />
        </div>
        {errors.email && (
          <p className="flex items-center gap-1 text-[11px] font-medium text-red-500 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-text-primary">
            Password
          </label>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isSubmitting}
            className={`w-full pl-10 pr-11 py-3 rounded-2xl bg-surface border text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 transition-all outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.password
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-border/80 hover:border-primary/40 focus:border-primary'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1 text-[11px] font-medium text-red-500 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Primary Submit Button */}
      <div className="pt-2">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.01, y: isSubmitting ? 0 : -1 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          className="w-full py-3.5 px-6 rounded-2xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-subtle hover:shadow-card transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
      </div>

      {/* Toggle to Register Mode */}
      <div className="pt-3 text-center">
        <p className="text-xs text-text-muted font-normal">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            disabled={isSubmitting}
            className="font-semibold text-primary hover:underline transition-all cursor-pointer focus:outline-none"
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
