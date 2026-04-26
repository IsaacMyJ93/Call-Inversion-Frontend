import { InversionResponse } from "@/lib/api";

/**
 * Comparte el resumen del portafolio usando la Web Share API o copia al portapapeles.
 * @param data Datos de la respuesta del backend
 * @param onSuccess Callback opcional para ejecutar cuando se copia al portapapeles (ej. mostrar un toast)
 */
export async function sharePortfolio(
  data: InversionResponse | null, 
  onSuccess?: (msg: string) => void
) {
  if (!data) return;

  const rentabilidad = data.resultados.rentabilidadMediaAplicada.replace('.', ',');
  const shareText = `🚀 Acabo de simular mi cartera en Call-Inversion.\n📈 Rentabilidad esperada: ${rentabilidad}%\n🛡️ Riesgo: ${data.parametros.riesgoElegido}\n\n¡Crea tu propia estrategia de inversión aquí! 👇`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Mi Portafolio - Call-Inversion',
        text: shareText,
        url: shareUrl
      });
    } else {
      // Fallback para navegadores de escritorio que no soportan share
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      
      if (onSuccess) {
        onSuccess("¡Resumen copiado al portapapeles!");
      } else {
        alert("¡Resumen copiado al portapapeles!");
      }
    }
  } catch (error) {
    // Solo logueamos si no es un error de "Usuario canceló el envío"
    if ((error as Error).name !== 'AbortError') {
      console.error('Error al compartir:', error);
    }
  }
}