
// Importa la función clsx y el tipo ClassValue de la librería 'clsx' para manejar clases condicionales
import { clsx, type ClassValue } from 'clsx'
// Importa la función twMerge de 'tailwind-merge' para combinar clases de Tailwind evitando duplicados/conflictos
import { twMerge } from 'tailwind-merge'


// Define una función utilitaria para combinar clases CSS de forma segura con Tailwind y clsx
export function cn(...inputs: ClassValue[]) {
  // Combina las clases usando clsx y luego las fusiona con twMerge para evitar conflictos de Tailwind
  return twMerge(clsx(inputs))
}
