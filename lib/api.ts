import { supabase } from './supabase'; 

/**
 * Contrato de respuesta del Backend (Call Inversion Engine)
 */
export interface InversionResponse {
  resultados: {
    añosEstimados: number;
    rentabilidadMediaAplicada: string;
    peorCaidaEstimada: string;
  };
  cartera: Array<{
    simbolo: string;
    nombre: string;
    rentabilidadAsignada: string;
    pesoCartera: string;
    capitalAsignado: string;
  }>;
  historicoGrafica: Array<{
    año: number;
    valor: number;
  }>;
}

/**
 * FUNCIÓN MAESTRA DE CÁLCULO
 * Se encarga de: 
 * 1. Obtener el token de Supabase.
 * 2. Enviar los datos al Backend (Node.js).
 * 3. Manejar errores de seguridad o de cálculo.
 */
export const fetchProyeccionInversion = async (formData: any): Promise<InversionResponse> => {
  
  // 1. Obtener la sesión activa de Supabase para sacar el JWT
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  
  if (authError || !session?.access_token) {
    throw new Error("Sesión no válida. Por favor, inicia sesión de nuevo.");
  }

  const token = session.access_token;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';

  // 2. Petición al Backend usando fetch 
  const response = await fetch(`${API_URL}/calculadora`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // El escudo que programaste en el middleware
    },
    body: JSON.stringify(formData),
  });

  // 3. Gestión de errores de respuesta
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error en el motor de cálculo del backend");
  }

  // 4. Devolvemos los datos tipados
  return response.json();
};