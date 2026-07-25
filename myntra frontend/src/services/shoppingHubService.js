import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Shopping Hub & State Directory Service Module
 * Interacts with FastAPI backend endpoints:
 * - GET /states
 * - GET /shopping-hubs
 * - GET /shopping-hubs/search?query=...
 * - GET /shopping-hubs/{hubId}
 * - GET /shopping-hubs/{hubId}/stores
 */
export const shoppingHubService = {
  /**
   * Fetch all states
   * GET /states
   */
  getStates: async () => {
    return await apiClient.get(API_ENDPOINTS.STATES);
  },

  /**
   * Fetch shopping hubs with optional state or featured filters
   * GET /shopping-hubs?state=...&featured=...
   */
  getShoppingHubs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.state) query.append('state', params.state);
    if (params.featured !== undefined) query.append('featured', params.featured);
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    const url = queryString ? `${API_ENDPOINTS.SHOPPING_HUBS}?${queryString}` : API_ENDPOINTS.SHOPPING_HUBS;
    return await apiClient.get(url);
  },

  /**
   * Search shopping hubs by query string
   * GET /shopping-hubs/search?query=...
   */
  searchHubs: async (query) => {
    return await apiClient.get(`${API_ENDPOINTS.SHOPPING_HUB_SEARCH}?query=${encodeURIComponent(query)}`);
  },

  /**
   * Get single shopping hub details by ID
   * GET /shopping-hubs/{hubId}
   */
  getHubById: async (hubId) => {
    return await apiClient.get(API_ENDPOINTS.SHOPPING_HUB_DETAILS(hubId));
  },

  /**
   * Get all trusted retail stores belonging to a shopping hub
   * GET /shopping-hubs/{hubId}/stores
   */
  getHubStores: async (hubId) => {
    return await apiClient.get(API_ENDPOINTS.SHOPPING_HUB_STORES(hubId));
  },
};

export default shoppingHubService;
