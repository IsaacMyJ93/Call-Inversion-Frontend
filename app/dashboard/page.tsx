/**
 *   portfolio calculator
 */
// Indica que este archivo es un componente del lado del cliente en Next.js
"use client";


// Importaciones de React y hooks
import { useState } from "react";
import { useRouter } from "next/navigation";

// Animaciones con Framer Motion
import { motion } from "framer-motion";

// Iconos de Lucide React
import { Calculator, Euro, Percent, AlertTriangle, ArrowRight, TrendingUp, Shield, Target } from "lucide-react";

// Componentes UI personalizados
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import React from 'react';

// Importamos la función para llamar al backend y el tipo de respuesta
import { fetchProyeccionInversion } from "@/lib/api"



// Componente principal de la página de la calculadora de portafolio
export default function CalculatorPage() {
  // Hook para navegación programática
  const router = useRouter();

  // Estado para mostrar el spinner de cálculo ("Calculando..." )
  const [isCalculating, setIsCalculating] = useState(false);

  // Estado para los datos del formulario, se actualiza a medida que el usuario interactúa con los inputs
  const [formData, setFormData] = useState({
    initialCapital: "10000", 
    expectedReturn: "10",    
    riskLevel: "Medium"      
  });

  // Estado para el valor del slider de retorno esperado
  const [returnSlider, setReturnSlider] = useState([10]); // Valor inicial del slider (10%)

  // Maneja el envío del formulario para calcular el portafolio
  const handleCalculate = async (e: React.FormEvent<HTMLFormElement>) => { // le estás diciendo a Ts exactamente qué elemento está disparando el evento
    e.preventDefault();
    setIsCalculating(true);

    try {
      // --- CONVERSIÓN DE PORCENTAJE A EUROS ---
      const capitalNum = Number(formData.initialCapital);
      const porcentaje = Number(formData.expectedReturn);

      // Ejemplo: 10.000€ * (10 / 100) = 1.000€ de beneficio esperado
      const beneficioEnEuros = (capitalNum * porcentaje) / 100;

      // 1. Mapeamos los datos al formato que espera el servidor 
      const payload = {
        capital: capitalNum,
        beneficioEsperado: beneficioEnEuros,
        // El servidor espera "Low", "Medium" o "High", asi que la primera letra en mayúscula y el resto en minúscula
        riesgo: formData.riskLevel.charAt(0).toUpperCase() + formData.riskLevel.slice(1)
      };

      // Para depuración, mostramos el payload que se enviará al backend
      console.log("Enviando al backend:", payload);

      // 2. Llamada real a tu API (lib/api.ts ya gestiona el Token de Supabase solo)
      const result = await fetchProyeccionInversion(payload);

      console.log("¡Cálculo exitoso!", result);

      // 3. Guardamos datos en storage para que al cambiar de URL no se pierdan.
      localStorage.setItem("lastResult", JSON.stringify(result));

      // 4. Navegación a la pagina de resultados
      router.push("/dashboard/results");

    } catch (error: any) {
      console.error("Fallo en el motor:", error);
      // Notificamos al usuario si el servidor está apagado o el token falló
      alert(error.message || "Error al conectar con el servidor 8080");
    } finally {
      setIsCalculating(false);
    }
  };

  // Opciones de nivel de riesgo para el usuario
  const riskLevels = [
    { value: "Low", label: "Bajo", description: "Enfoque conservador, rentabilidad estable, caídas mínimas.", icon: Shield },
    { value: "Medium", label: "Medio", description: "Crecimiento equilibrado y estabilidad, caídas moderadas.", icon: Target },
    { value: "High", label: "Alto", description: "Potencial de crecimiento agresivo, caídas significativas.", icon: TrendingUp },
  ];

  // Renderizado del formulario y tarjetas
  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado animado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Calculadora de cartera</h1>
        <p className="text-muted-foreground">
          Configure sus parámetros de inversión para generar una cartera de riesgo paritario optimizada.
        </p>
      </motion.div>

      {/* Formulario principal */}
      <form onSubmit={handleCalculate}>
        <div className="grid gap-6">
          {/* Tarjeta: Capital inicial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-muted-foreground" />
                  Capital Inicial
                </CardTitle>
                <CardDescription>
                  Ingrese la cantidad que desea invertir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    {/* Símbolo de euro en el input */}
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      €
                    </span>
                    <Input
                      type="number"
                      value={formData.initialCapital}
                      onChange={(e) => setFormData({ ...formData, initialCapital: e.target.value })}
                      className="pl-8 text-lg h-14 font-semibold"
                      placeholder="10,000"
                      min="1000"
                      required
                    />
                  </div>
                  {/* Botones rápidos para seleccionar capital inicial */}
                  <div className="flex gap-2">
                    {[5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000,
                      50000].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, initialCapital: amount.toString() })}
                          className={formData.initialCapital === amount.toString() ? "border-primary bg-primary/5" : ""}
                        >
                          €{amount.toLocaleString()}
                        </Button>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tarjeta: Retorno esperado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-muted-foreground" />
                  Retorno esperado
                </CardTitle>
                <CardDescription>
                  Su porcentaje de rentabilidad anual objetivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {/* Slider para seleccionar el retorno esperado */}
                    <Slider
                      value={returnSlider}
                      onValueChange={(value) => {
                        setReturnSlider(value);
                        setFormData({ ...formData, expectedReturn: value[0].toString() });
                      }}
                      max={100}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <div className="w-24 flex items-center gap-1">
                      {/* Input numérico sincronizado con el slider */}
                      <Input
                        type="number"
                        value={formData.expectedReturn}
                        onChange={(e) => {
                          setFormData({ ...formData, expectedReturn: e.target.value });
                          setReturnSlider([parseFloat(e.target.value) || 0]);
                        }}
                        className="text-center font-semibold"
                        min="1"
                        max="100"
                        step="1"
                        required
                      />
                      <span className="text-muted-foreground font-medium">%</span>
                    </div>
                  </div>
                  {/* Etiquetas de referencia para el slider */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservador (10%)</span>
                    <span>Moderado (50%)</span>
                    <span>Agresivo (100%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tarjeta: Nivel de riesgo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  Nivel de riesgo
                </CardTitle>
                <CardDescription>
                  Seleccione su tolerancia al riesgo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Botones para seleccionar el nivel de riesgo */}
                  {riskLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, riskLevel: level.value })}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${formData.riskLevel === level.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.riskLevel === level.value ? "bg-primary text-primary-foreground" : "bg-secondary"
                          }`}>
                          <level.icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-foreground">{level.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tarjeta: Resumen e iniciar cálculo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-primary-foreground/70 text-sm">Resumen de inversión</p>
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <span className="text-2xl font-bold">
                        €{parseInt(formData.initialCapital || "0").toLocaleString()}
                      </span>
                      <span className="text-primary-foreground/70">
                        al {formData.expectedReturn}% retorno objetivo
                      </span>
                      <span className="text-primary-foreground/70 capitalize">
                        {/*• {formData.riskLevel} Riesgo.*/}
                         {/* De esta otra forma muestro el valor de la UI no el valor interno */}
                        • {riskLevels.find(level => level.value === formData.riskLevel)?.label} Riesgo.
                      </span>
                    </div>
                  </div>
                  {/* Botón para calcular el portafolio */}
                  <Button
                    type="submit"
                    size="lg"
                    variant="secondary"
                    className="min-w-[200px] h-12"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <Calculator className="mr-2 w-5 h-5 animate-pulse" />
                        Calculando...
                      </>
                    ) : (
                      <>
                        Calcular Portafolio
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  );
}