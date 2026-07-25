import apiClient from './apiClient';

export const profileService = {
    /**
     * Fetch active user profile from backend (GET /profile)
     */
    getProfile: async () => {
        return await apiClient.get('/profile');
    },

    /**
     * Update active user profile inside backend (PUT /profile)
     * @param {Object} profileData - { full_name, email, gender, date_of_birth }
     */
    updateProfile: async (profileData) => {
        return await apiClient.put('/profile', profileData);
    }
};

export default profileService;
