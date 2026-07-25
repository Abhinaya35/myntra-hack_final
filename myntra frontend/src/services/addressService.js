import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const addressService = {
    /**
     * Fetch all saved addresses for the current user
     * GET /address
     */
    fetchAddresses: async () => {
        return await apiClient.get(API_ENDPOINTS.ADDRESSES);
    },

    /**
     * Create and geocode a new address
     * POST /address/geocode
     * @param {Object} payload - { label, isDefault, house_number, street, landmark, city, state, pincode, country }
     */
    createAddress: async (payload) => {
        return await apiClient.post(API_ENDPOINTS.ADDRESS_GEOCODE, payload);
    },

    /**
     * Update an existing address
     * PUT /address/{id}
     * @param {string} id
     * @param {Object} payload - { label, isDefault, house_number, street, landmark, city, state, pincode, country }
     */
    updateAddress: async (id, payload) => {
        return await apiClient.put(API_ENDPOINTS.ADDRESS_DETAILS(id), payload);
    },

    /**
     * Delete a saved address
     * DELETE /address/{id}
     * @param {string} id
     */
    deleteAddress: async (id) => {
        return await apiClient.delete(API_ENDPOINTS.ADDRESS_DETAILS(id));
    },

    /**
     * Mark an address as default
     * PATCH /address/default/{id}
     * @param {string} id
     */
    setDefaultAddress: async (id) => {
        return await apiClient.patch(API_ENDPOINTS.SET_DEFAULT_ADDRESS(id));
    }
};

export default addressService;
