import axios from 'axios';

// Définir l'URL de base pour les requêtes API
// En développement, on utilise un proxy vers le serveur local
// En production, les requêtes iront au même serveur qui sert l'application
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Créer une instance axios avec des configurations par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  // ... autres méthodes d'authentification
};

// Services de gestion des produits
export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  // ... autres méthodes de gestion des produits
};

// Services de gestion des employés
export const employeeService = {
  getEmployees: async () => {
    const response = await api.get('/employees');
    return response.data;
  },
  // ... autres méthodes de gestion des employés
};

export default api;