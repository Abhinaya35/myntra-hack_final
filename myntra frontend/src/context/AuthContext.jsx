import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext({
  user: null,
  accessToken: null,
  loading: true,
  isAuthenticated: false,
  authError: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  restoreSession: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('rfi_auth_token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Restore user session from localStorage rfi_auth_token via GET /auth/me
   */
  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem('rfi_auth_token');

    if (!token) {
      setUser(null);
      setAccessToken(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userProfile = await authService.getCurrentUser();
      setUser(userProfile);
      setAccessToken(token);
      setAuthError(null);
    } catch (err) {
      console.warn('Session restoration failed:', err.message || err);
      authService.logout();
      setUser(null);
      setAccessToken(null);
      setAuthError(err.message || 'Session expired. Please log in again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore session automatically on app startup
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  /**
   * Authenticate user with email & password
   * POST /auth/login
   */
  const login = async (email, password) => {
    setAuthError(null);
    try {
      const response = await authService.login({ email, password });
      const { access_token, user: userProfile } = response;

      if (!access_token) {
        throw new Error('Access token missing from login response');
      }

      localStorage.setItem('rfi_auth_token', access_token);
      setAccessToken(access_token);
      setUser(userProfile);

      return response;
    } catch (err) {
      const errorMsg = err.message || 'Login failed. Please check your credentials.';
      setAuthError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  /**
   * Register account and auto-login
   * POST /auth/register -> POST /auth/login
   */
  const register = async (name, email, password) => {
    setAuthError(null);
    try {
      const registerResponse = await authService.register({ name, email, password });
      
      // Seamless auto-login following successful registration
      const loginResponse = await login(email, password);

      return { registerResponse, loginResponse };
    } catch (err) {
      const errorMsg = err.message || 'Registration failed. Please try again.';
      setAuthError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  /**
   * Terminate active user session
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setAccessToken(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        isAuthenticated: !!user && !!accessToken,
        authError,
        login,
        register,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
