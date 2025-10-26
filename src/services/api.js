import axios from 'axios';

// 1. Creamos la instancia de Axios
const api = axios.create({
  // La URL base de tu API de backend
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Petición (La Magia)
// Esta función se ejecuta ANTES de que CUALQUIER petición sea enviada.
api.interceptors.request.use(
  (config) => {
    // Lee el estado de autenticación guardado por Zustand en localStorage
    const authState = JSON.parse(localStorage.getItem('auth-storage'));
    const token = authState?.state?.token;

    // Si existe un token, lo inyecta en la cabecera 'Authorization'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejo de errores de la configuración de la petición
    return Promise.reject(error);
  }
);

export default api;