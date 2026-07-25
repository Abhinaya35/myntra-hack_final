const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // States
  STATES: `${API_BASE_URL}/states`,

  // Shopping Hubs
  SHOPPING_HUBS: `${API_BASE_URL}/shopping-hubs`,
  SHOPPING_HUB_DETAILS: (id) => `${API_BASE_URL}/shopping-hubs/${id}`,
  SHOPPING_HUB_STORES: (id) => `${API_BASE_URL}/shopping-hubs/${id}/stores`,
  SHOPPING_HUB_SEARCH: `${API_BASE_URL}/shopping-hubs/search`,

  // Stores
  STORES: `${API_BASE_URL}/stores`,
  STORE_DETAILS: (id) => `${API_BASE_URL}/stores/${id}`,
  NEARBY_STORES: `${API_BASE_URL}/stores/nearby`,
  STORE_SEARCH: `${API_BASE_URL}/stores/search`,
  STORE_PRODUCTS: (id) => `${API_BASE_URL}/stores/${id}/products`,
  STORE_COLLECTIONS: (id) => `${API_BASE_URL}/stores/${id}/collections`,
  CHECK_STORE_DELIVERY: (id) => `${API_BASE_URL}/stores/${id}/check-delivery`,

  // Products & Recommendations
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_DETAILS: (id) => `${API_BASE_URL}/products/${id}`,
  SIMILAR_RECOMMENDATIONS: (id) => `${API_BASE_URL}/products/${id}/recommendations/similar`,
  STORE_RECOMMENDATIONS: (id) => `${API_BASE_URL}/products/${id}/recommendations/store`,
  FASHION_PULSE: `${API_BASE_URL}/recommendations/fashion-pulse`,
  FASHION_PULSE_CATEGORY: (categoryId) => `${API_BASE_URL}/recommendations/fashion-pulse/${categoryId}`,

  // Auth & User Profile
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_ME: `${API_BASE_URL}/auth/me`,

  // Address & Geocoding
  ADDRESS_GEOCODE: `${API_BASE_URL}/address/geocode`,
  ADDRESS_REVERSE_GEOCODE: `${API_BASE_URL}/address/reverse-geocode`,
  ADDRESSES: `${API_BASE_URL}/address`,
  ADDRESS_DETAILS: (id) => `${API_BASE_URL}/address/${id}`,
  SET_DEFAULT_ADDRESS: (id) => `${API_BASE_URL}/address/default/${id}`,
};

export default API_ENDPOINTS;

