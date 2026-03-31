
// Importa la función createClient desde el paquete de Supabase
import { createClient } from '@supabase/supabase-js';

/**
 * Cliente único de Supabase para toda la aplicación.
 * Utiliza variables de entorno para mayor seguridad.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);