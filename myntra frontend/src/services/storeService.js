import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Store Service Module
 * Handles API calls to FastAPI backend for Store profiles and operations:
 * - GET /stores
 * - GET /stores/{id}
 * - GET /stores/search
 * - GET /stores/nearby
 * - GET /stores/{storeId}/products
 * - GET /stores/{storeId}/collections
 * - POST /stores/{storeId}/check-delivery
 */
export const storeService = {
  /**
   * Fetch all trusted regional stores
   * GET /stores
   */
  getAllStores: async () => {
    return await apiClient.get(API_ENDPOINTS.STORES);
  },

  /**
   * Fetch single store profile by ID
   * GET /stores/{id}
   * @param {string} storeId - Store ObjectId
   */
  getStoreById: async (storeId) => {
    return await apiClient.get(API_ENDPOINTS.STORE_DETAILS(storeId));
  },

  /**
   * Fetch single store profile by name (and optional city).
   * GET /stores/by-name?name=...&city=...
   * Used when the frontend has a store name but no ObjectId.
   * @param {string} name - Store name (exact, case-insensitive on the backend)
   * @param {string} [city] - Optional city to narrow results
   */
  getStoreByName: async (name, city) => {
    return await apiClient.get(API_ENDPOINTS.STORE_BY_NAME(name, city));
  },

  /**
   * Search stores by query string
   * GET /stores/search?query=...
   */
  searchStores: async (query, latitude, longitude) => {
    let url = `${API_ENDPOINTS.STORE_SEARCH}?query=${encodeURIComponent(query)}`;
    if (latitude && longitude) {
      url += `&latitude=${latitude}&longitude=${longitude}`;
    }
    return await apiClient.get(url);
  },

  /**
   * Fetch nearby stores within radius
   * GET /stores/nearby?latitude=...&longitude=...&radius=...
   */
  getNearbyStores: async (latitude, longitude, radius = 150) => {
    const url = `${API_ENDPOINTS.NEARBY_STORES}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    return await apiClient.get(url);
  },

  /**
   * Fetch store products
   * GET /stores/{storeId}/products
   */
  getStoreProducts: async (storeId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query
      ? `${API_ENDPOINTS.STORE_PRODUCTS(storeId)}?${query}`
      : API_ENDPOINTS.STORE_PRODUCTS(storeId);
    return await apiClient.get(url);
  },

  /**
   * Fetch store collections
   * GET /stores/{storeId}/collections
   */
  getStoreCollections: async (storeId) => {
    return await apiClient.get(API_ENDPOINTS.STORE_COLLECTIONS(storeId));
  },

  /**
   * Check store delivery availability
   * POST /stores/{storeId}/check-delivery
   */
  checkDelivery: async (storeId, addressPayload) => {
    return await apiClient.post(API_ENDPOINTS.CHECK_STORE_DELIVERY(storeId), addressPayload);
  },
};

export default storeService;
