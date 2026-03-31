
// Importa la librería axios para hacer peticiones HTTP
import axios from 'axios';
import { supabase } from './supabase'; // Importamos Supabase

/**
 * Envía los datos del formulario al backend (Node.js) para calcular la cartera.
 * Incluye el Token JWT de Supabase para autenticar la petición.
 * * @param formData - Los datos introducidos por el usuario (capital, riesgo, etc.)
 * @returns El JSON con los resultados de la API
 */
export const fetchCalculation = async (formData: any) => {
  // 1. Le pedimos a Supabase la sesión actual (El token JWT está dentro de la sesión)
  const { data: { session } } = await supabase.auth.getSession();
  
  // 2. Extraemos el Token JWT
  const token = session?.access_token;

  // Validación de seguridad: Si no hay token, cortamos la ejecución aquí mismo
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión de nuevo.");
  }

  // 3. Enviamos la petición al backend anexando el Token en la cabecera
  const { data } = await axios.post('http://127.0.0.1:8080/api/calculadora', formData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Aquí le enseñamos el token al backend
    }
  });

  // 4. Retorna la respuesta recibida del backend
  return data;
};