import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import {
  MOCK_FASHION_PULSE_TRENDS,
  getCategoryDetailsMock,
} from '../data/fashionPulse';

/**
 * Service for Bharat Fashion Pulse Regional Recommendations
 * 
 * EXPECTED BACKEND ENDPOINTS:
 * 1. Homepage Trends List:
 *    GET /recommendations/fashion-pulse
 *    GET /recommendations/fashion-pulse?state=Telangana
 *    Response format:
 *    [
 *      {
 *        "id": "pulse_001",
 *        "state": "Telangana",
 *        "category": "Temple Jewellery",
 *        "growth_percentage": 35,
 *        "reason": "Bonalu celebrations are increasing demand.",
 *        "icon": "temple_jewellery"
 *      }
 *    ]
 * 
 * 2. Category Details & Trending Products:
 *    GET /recommendations/fashion-pulse/{categoryId}
 *    Response format:
 *    {
 *      "category": "Temple Jewellery",
 *      "growth_percentage": 35,
 *      "reason": "Bonalu celebrations have increased demand...",
 *      "products": [ ... ]
 *    }
 */
export const fashionPulseService = {
  /**
   * Fetch trending fashion pulse cards for the homepage
   * @param {string} [state] Optional state filter name
   * @returns {Promise<Array>} List of trend objects
   */
  getFashionPulse: async (state = '') => {
    try {
      const url = state
        ? `${API_ENDPOINTS.FASHION_PULSE}?state=${encodeURIComponent(state)}`
        : API_ENDPOINTS.FASHION_PULSE;
      const data = await apiClient.get(url);
      if (data && Array.isArray(data) && data.length > 0) {
        return data;
      }
      throw new Error('No backend data available, using mock fallback.');
    } catch (err) {
      console.info('[FashionPulseService] Backend endpoint unreachable or unpopulated. Using isolated mock data.', err.message);
      // Filter mock data locally if state parameter provided
      if (state && state.toLowerCase() !== 'all') {
        return MOCK_FASHION_PULSE_TRENDS.filter(
          (t) => t.state.toLowerCase() === state.toLowerCase()
        );
      }
      return MOCK_FASHION_PULSE_TRENDS;
    }
  },

  /**
   * Fetch category details and products for a specific category ID
   * @param {string} categoryId Category identifier
   * @returns {Promise<Object>} Category details and products array
   */
  getCategoryDetails: async (categoryId) => {
    try {
      const url = API_ENDPOINTS.FASHION_PULSE_CATEGORY(categoryId);
      const data = await apiClient.get(url);
      if (data && data.category) {
        return data;
      }
      throw new Error('No category data available, using mock fallback.');
    } catch (err) {
      console.info(`[FashionPulseService] Backend endpoint for category '${categoryId}' unreachable. Using isolated mock data.`, err.message);
      return getCategoryDetailsMock(categoryId);
    }
  },
};

export default fashionPulseService;
