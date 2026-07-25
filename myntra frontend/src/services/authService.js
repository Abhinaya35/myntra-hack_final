import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Authentication Service Module
 * Handles login, registration, profile lookup, and token cleanup.
 */
export const authService = {
  /**
   * Submit login credentials
   * POST /auth/login
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} { message, access_token, token_type, expires_in, user }
   */
  login: async (credentials) => {
    return await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, credentials);
  },

  /**
   * Register a new user account
   * POST /auth/register
   * @param {Object} data - { name, email, password }
   * @returns {Promise<Object>} { message, user }
   */
  register: async (data) => {
    return await apiClient.post(API_ENDPOINTS.AUTH_REGISTER, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
  },

  /**
   * Fetch active authenticated user profile
   * GET /auth/me
   * Requires Authorization: Bearer <token>
   * @returns {Promise<Object>} { id, name, email, role, createdAt }
   */
  getCurrentUser: async () => {
    return await apiClient.get(API_ENDPOINTS.AUTH_ME);
  },

  /**
   * Clear authentication token from local storage
   */
  logout: () => {
    localStorage.removeItem('rfi_auth_token');
  },
};

export default authService;
