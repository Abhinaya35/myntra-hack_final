import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Location & Geocoding Service Module
 * Handles reverse-geocoding coordinates to structured address properties via FastAPI backend.
 */
export const locationService = {
  /**
   * Reverse geocode latitude and longitude to address properties
   * POST /address/reverse-geocode
   * @param {number} latitude - User latitude coordinate
   * @param {number} longitude - User longitude coordinate
   * @returns {Promise<Object>} ReverseGeocodeResponse { house_number, street, landmark, city, state, pincode, country, formatted_address, display_name, latitude, longitude, cached }
   */
  reverseGeocode: async (latitude, longitude) => {
    return await apiClient.post(API_ENDPOINTS.ADDRESS_REVERSE_GEOCODE, {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  },

  /**
   * Geocode a raw address string to coordinates
   * POST /address/geocode
   * @param {string} addressText - The full raw address to resolve coordinates for
   * @returns {Promise<Object>} AddressResponse containing resolved latitude, longitude and cached status
   */
  geocode: async (addressText) => {
    return await apiClient.post(API_ENDPOINTS.ADDRESS_GEOCODE, {
      address: addressText,
    });
  },
};

export default locationService;
