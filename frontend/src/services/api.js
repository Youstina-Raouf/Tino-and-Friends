// API Service Layer
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  register: (name, email, password) =>
    API.post('/auth/register', { name, email, password }),

  login: (email, password) =>
    API.post('/auth/login', { email, password }),

  getProfile: () =>
    API.get('/auth/profile'),

  updateProfile: (name, email) =>
    API.put('/auth/profile', { name, email }),
};

// Product Services
export const productService = {
  getProducts: () =>
    API.get('/products'),

  getProductsByCategory: (category) =>
    API.get(`/products/category/${category}`),

  getProduct: (id) =>
    API.get(`/products/${id}`),

  searchProducts: (query) =>
    API.get('/products/search', { params: { query } }),

  createProduct: (data) =>
    API.post('/products', data),

  updateProduct: (id, data) =>
    API.put(`/products/${id}`, data),

  deleteProduct: (id) =>
    API.delete(`/products/${id}`),
};

// Favorites Services
export const favoritesService = {
  getFavorites: () =>
    API.get('/favorites'),

  addFavorite: (productId) =>
    API.post(`/favorites/${productId}`),

  removeFavorite: (productId) =>
    API.delete(`/favorites/${productId}`),
};

// Order Services
export const orderService = {
  createOrder: (products, shippingAddress) =>
    API.post('/orders', { products, shippingAddress }),

  getUserOrders: () =>
    API.get('/orders/user'),

  getOrder: (id) =>
    API.get(`/orders/${id}`),

  createCheckoutSession: (products, shippingAddress) =>
    API.post('/orders/payment/create-checkout-session', {
      products,
      shippingAddress,
    }),

  verifyPayment: (sessionId) =>
    API.post('/orders/payment/verify', { sessionId }),
};

export default API;
