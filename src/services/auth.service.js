import api from './api'; // Importamos nuestra instancia de Axios

/**
 * Llama al endpoint de login del backend
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise} La respuesta de Axios
 */
export const loginRequest = (email, password) => {
  // El backend espera un JSON con email y password
  return api.post('/auth/login', {
    email,
    password,
  });
};

/**
 * Llama al endpoint de registro del backend
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise} La respuesta de Axios
 */
export const registerRequest = (email, password) => {
  return api.post('/auth/register', {
    email,
    password,
  });
};

/**
 * Llama al endpoint de perfil (protegido)
 * El token se adjunta automáticamente gracias al interceptor en api.js
 * @returns {Promise} La respuesta de Axios con los datos del usuario
 */
export const getProfileRequest = () => {
  return api.get('/auth/profile');
};