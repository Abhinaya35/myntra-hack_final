export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOCATION_PERMISSION: '/location-permission',
  CHOOSE_CITY: '/choose-city',
  LOCATING: '/locating',
  NEARBY: '/nearby',
  EXPLORE: '/explore',
  STATE_DETAILS: '/state/:stateId',
  HUB_DETAILS: '/hub/:hubId',
  STORE_DETAILS: '/store/:storeId',
  STORE_COLLECTIONS: '/store/:storeId/collections',
  COLLECTIONS: '/collections/:storeId',
  PRODUCT_DETAILS: '/product/:productId',
  SHORTLIST: '/shortlist',
  THREADS_OF_BHARAT: '/threads-of-bharat',
  THREADS_OF_BHARAT_CATEGORY: '/threads-of-bharat/category/:categoryId',
  FASHION_PULSE_CATEGORY: '/threads-of-bharat/category/:categoryId',
  PROFILE: '/profile',
  ADDRESSES: '/addresses',
  NOT_FOUND: '*',
};

export const getHubDetailsPath = (hubId) => `/hub/${hubId}`;
export const getStoreDetailsPath = (storeId) => `/store/${storeId}`;
export const getCollectionsPath = (storeId) => `/store/${storeId}/collections`;
export const getProductDetailsPath = (productId) => `/product/${productId}`;
export const getStateDetailsPath = (stateId) => `/state/${stateId}`;
export const getThreadsOfBharatCategoryPath = (categoryId) => `/threads-of-bharat/category/${categoryId}`;
export const getFashionPulseCategoryPath = (categoryId) => `/threads-of-bharat/category/${categoryId}`;

export default ROUTES;
