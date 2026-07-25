import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Explore & State Travel Guide Service Module
 * Connects frontend state exploration features to FastAPI backend endpoints:
 * - GET /states
 * - GET /shopping-hubs?state={stateName}
 */
export const exploreService = {
  /**
   * Fetch all states containing regional fashion shopping hubs
   * GET /states
   * @returns {Promise<Array>} List[StateCardResponse] [ { id, name, image, shopping_hub_count } ]
   */
  getStates: async () => {
    return await apiClient.get(API_ENDPOINTS.STATES);
  },

  /**
   * Fetch shopping hubs for a specific state
   * GET /shopping-hubs?state={stateName}
   * @param {string} stateName - Capitalized or exact name of the state (e.g. 'Telangana')
   * @returns {Promise<Array>} List[ShoppingHubCardResponse]
   */
  getShoppingHubsByState: async (stateName) => {
    const url = stateName
      ? `${API_ENDPOINTS.SHOPPING_HUBS}?state=${encodeURIComponent(stateName)}`
      : API_ENDPOINTS.SHOPPING_HUBS;
    return await apiClient.get(url);
  },
};

export default exploreService;
