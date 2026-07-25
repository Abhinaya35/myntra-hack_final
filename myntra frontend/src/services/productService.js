import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Product & Recommendations Service Module
 * Connects frontend product pages to FastAPI backend endpoints:
 * - GET /products/{productId}
 * - GET /products
 * - GET /products/{productId}/recommendations/similar
 * - GET /products/{productId}/recommendations/store
 */
export const productService = {
  /**
   * Fetch complete product details by ID
   * GET /products/{productId}
   * @param {string} productId - Product ID (e.g. 'p_0001' or ObjectId string)
   * @returns {Promise<Object>} { product, pricing, variants, specifications, ratings, store }
   */
  getProductById: async (productId) => {
    return await apiClient.get(API_ENDPOINTS.PRODUCT_DETAILS(productId));
  },

  /**
   * Explore global product catalog
   * GET /products
   */
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${API_ENDPOINTS.PRODUCTS}?${query}` : API_ENDPOINTS.PRODUCTS;
    return await apiClient.get(url);
  },

  /**
   * Get similar product recommendations
   * GET /products/{productId}/recommendations/similar
   */
  getSimilarRecommendations: async (productId, limit = 10) => {
    return await apiClient.get(`${API_ENDPOINTS.SIMILAR_RECOMMENDATIONS(productId)}?limit=${limit}`);
  },

  /**
   * Get store product recommendations
   * GET /products/{productId}/recommendations/store
   */
  getStoreRecommendations: async (productId, limit = 10) => {
    return await apiClient.get(`${API_ENDPOINTS.STORE_RECOMMENDATIONS(productId)}?limit=${limit}`);
  },
};

export default productService;
