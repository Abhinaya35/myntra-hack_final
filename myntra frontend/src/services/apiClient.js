import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Automatically attach Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rfi_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format error messages & extract data
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let detailMsg = error.response?.data?.detail;

    // Handle Pydantic validation error arrays (422)
    if (Array.isArray(detailMsg)) {
      detailMsg = detailMsg.map((item) => item.msg || item.message || JSON.stringify(item)).join(', ');
    } else if (typeof detailMsg === 'object' && detailMsg !== null) {
      detailMsg = JSON.stringify(detailMsg);
    }

    const customError = {
      message: detailMsg || error.message || 'An unexpected error occurred.',
      status: error.response?.status || 500,
      raw: error,
    };

    console.error('API Error:', customError);
    return Promise.reject(customError);
  }
);

export default apiClient;
