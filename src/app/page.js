"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuthStore } from '../store/auth.store'; 

export default function Home() {

// --- Estados locales para el formulario ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para mostrar errores del backend
  const [isLoading, setIsLoading] = useState(false); // Para mostrar un spinner

  // --- Hooks ---
  const router = useRouter(); // Para redireccionar
  
  // Traemos la acción 'login' de nuestro store
  const login = useAuthStore((state) => state.login);

  /**
   * Manejador del envío del formulario
   */
  const handleSubmit = async (e) => {
  console.log("handleSubmit se ejecutó!"); // Puedes mantener esto para confirmar
  e.preventDefault();
  setError(null);
  setIsLoading(true);
  console.log("Tipo de login:", typeof login);
  try {
    await login(email, password);
    setIsLoading(false);
    router.push('/main');
  } catch (errorMessage) {
    setIsLoading(false);
    setError(errorMessage);
  }
};

  return (
    <main className="flex justify-center min-h-screen items-center justify-center bg-stone-950">

      <article className="flex">
        <img src="peopleig.png" alt="Gente de IG" className="w-1.7lg" />

        <form onSubmit={handleSubmit} className="flex flex-col  justify-items-center items-center py-5 gap-3 text-white">

          <h2 className="text-2xl text-white font-bold mt-5">Galeria de Fotos</h2>
          <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="rounded text-sm text-gray-400 w-xs px-4 mt-10 border border-gray-400 p-2 focus:outline-none hover:bg-zinc-900 transform transition duration-300" />
          <input type="password" name="password" id="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={isLoading} className=" rounded border border-gray-400 text-sm text-gray-400 w-xs px-4   p-2 focus:outline-none hover:bg-zinc-900 transform transition duration-300"/>

          <button type="submit" disabled={isLoading} className="bg-indigo-500 p-1 w-full rounded-xl border font-bold border-none outline-none hover:bg-indigo-600 transform transition duration-300 cursor-pointer">{isLoading ? 'Cargando...' : 'Entrar'}</button>

          <p className="mt-5 text-xs">¿No tienes cuenta? Registrate</p>
        </form>

      </article>
      
    </main>
  );
}