import { InversionResponse } from "@/lib/api";

/**
 * Exports portfolio data to a CSV file (European format) and triggers a download.
 * @param data Portfolio simulation data
 */
export function exportPortfolioToCSV(data: InversionResponse | null) {
  if (!data) return;

  // 1. Separador europeo
  const separator = ";";

  // 2. Método PRO para forzar a Excel a leer UTF-8 (evita tildes rotas)
  const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);

  let csvContent = "";
  csvContent += "REPORTE DE PORTAFOLIO - CALL-INVERSION\n\n";

  // SECCIÓN 1: KPIs y Parámetros (Añadimos los símbolos al texto, no al número)
  csvContent += `RESUMEN DE SIMULACIÓN\n`;
  csvContent += `Capital Inicial (€)${separator}${data.parametros.capitalInicial}\n`;
  csvContent += `Objetivo (€)${separator}${data.parametros.objetivo}\n`;
  csvContent += `Riesgo Elegido${separator}${data.parametros.riesgoElegido}\n`;
  csvContent += `Años Estimados${separator}${data.resultados.añosEstimados}\n`;
  
  // Limpiamos los porcentajes (de "9.45%" a "9,45") para que sean números matemáticos
  const rentabilidad = data.resultados.rentabilidadMediaAplicada.replace('%', '').replace('.', ',');
  const peorCaida = data.resultados.peorCaidaEstimada.replace('%', '').replace('.', ',');
  
  csvContent += `Rentabilidad Media (%)${separator}${rentabilidad}\n`;
  csvContent += `Peor Caída Estimada (%)${separator}${peorCaida}\n\n`;

  // SECCIÓN 2: Desglose de la Cartera
  // Movemos los símbolos de € y % a la cabecera
  csvContent += `DESGLOSE DE ACTIVOS\n`;
  csvContent += `Símbolo${separator}Nombre${separator}Peso Cartera (%)${separator}Capital Asignado (€)\n`;

  data.cartera.forEach((asset) => {
    // Extraemos solo el número, quitando los símbolos y forzando la coma española
    const peso = asset.pesoCartera.replace('%', '').replace('.', ',');
    const capital = asset.capitalAsignado.replace(/[^0-9.-]+/g, "").replace('.', ',');
    
    csvContent += `${asset.simbolo}${separator}${asset.nombre}${separator}${peso}${separator}${capital}\n`;
  });

  // 3. Crear el archivo inyectando los bytes puros (BOM) junto con el texto
  const blob = new Blob([BOM, csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  // Nombre del archivo con fecha
  const fecha = new Date().toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `portafolio_simulacion_${fecha}.csv`);
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}