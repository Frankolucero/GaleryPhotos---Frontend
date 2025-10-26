import { create } from 'zustand';
// 'persist' es el middleware para guardar en localStorage
import { persist, createJSONStorage } from 'zustand/middleware';
// Importamos las funciones "mensajeras"
import { loginRequest, getProfileRequest } from '../services/auth.service';

// Creamos el store
export const useAuthStore = create(
  // Usamos el middleware 'persist' para guardar el estado
  persist(
    (set, get) => ({
      // --- 1. ESTADO INICIAL ---
      token: null,          // Aquí guardaremos el JWT
      user: null,           // Aquí guardaremos los datos del usuario (email, id)
      isAuthenticated: false, // Para saber si mostrar la app o el login

      // --- 2. ACCIONES (Lógica de Negocio) ---

      /**
       * Acción principal de Login
       */
      login: async (email, password) => {
        try {
          // 2a. Llama al servicio de API
          const res = await loginRequest(email, password);
          const token = res.data.token; // El backend nos devuelve el token

          // 2b. Guarda el estado en Zustand
          set({ token: token, isAuthenticated: true });

          // 2c. Busca los datos del usuario (¡buena práctica!)
          await get().fetchProfile();
          
        } catch (error) {
          console.error("Error en login:", error.response.data.message);
          // Lanza el error para que la UI (el formulario) lo atrape
          throw error.response.data.message;
        }
      },

      /**
       * Busca el perfil del usuario usando el token (que el interceptor ya tiene)
       */
      fetchProfile: async () => {
        try {
          const res = await getProfileRequest();
          set({ user: res.data }); // Guarda los datos del usuario
        } catch (error) {
          console.error("Error obteniendo perfil:", error);
          // Si el token es inválido, limpiamos todo
          set({ token: null, user: null, isAuthenticated: false });
        }
      },

      /**
       * Cierra la sesión
       */
      logout: () => {
        // Simplemente limpia el estado. 'persist' borrará el localStorage.
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    
    // --- 3. CONFIGURACIÓN DE PERSISTENCIA ---
    {
      name: 'auth-storage', // Nombre de la 'caja' en localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage
    }
  )
);