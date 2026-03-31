
// Importa la librería axios para hacer peticiones HTTP
import axios from 'axios';


// Define una función asíncrona para enviar datos al backend y obtener el resultado del cálculo
export const fetchCalculation = async (formData: any) => {
  // Realiza una petición POST al endpoint de la calculadora con los datos del formulario
  const { data } = await axios.post('http://127.0.0.1:8080/api/calculadora', formData);
  // Retorna la respuesta recibida del backend
  return data;
};