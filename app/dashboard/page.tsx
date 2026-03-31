
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";


// Componente principal de la página de la calculadora de portafolio
export default function CalculatorPage() {
  // Hook para navegación programática
  const router = useRouter();

  // Estado para mostrar el spinner de cálculo
  const [isCalculating, setIsCalculating] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    initialCapital: "10000", // Capital inicial por defecto
    expectedReturn: "8",     // Retorno esperado por defecto (%)
    riskLevel: "medium"      // Nivel de riesgo por defecto
  });

  // Estado para el valor del slider de retorno esperado
  const [returnSlider, setReturnSlider] = useState([8]);

  // Maneja el envío del formulario y simula el cálculo
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simula un retardo para el cálculo (por ejemplo, llamada a API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsCalculating(false);
    // Redirige a la página de resultados
    router.push("/dashboard/results");
  };

  // Opciones de nivel de riesgo para el usuario
  const riskLevels = [
    { value: "low", label: "Low Risk", description: "Conservative approach, stable returns", icon: Shield },
    { value: "medium", label: "Medium Risk", description: "Balanced growth and stability", icon: Target },
    { value: "high", label: "High Risk", description: "Aggressive growth potential", icon: TrendingUp },
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Calculator</h1>
        <p className="text-muted-foreground">
          Configure your investment parameters to generate an optimized risk parity portfolio.
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
                  Initial Capital
                </CardTitle>
                <CardDescription>
                  Enter the amount you want to invest
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
                    {[5000, 10000, 25000, 50000].map((amount) => (
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
                  Expected Return
                </CardTitle>
                <CardDescription>
                  Your target annual return percentage
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
                      max={20}
                      min={1}
                      step={0.5}
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
                        max="20"
                        step="0.5"
                        required
                      />
                      <span className="text-muted-foreground font-medium">%</span>
                    </div>
                  </div>
                  {/* Etiquetas de referencia para el slider */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative (1%)</span>
                    <span>Moderate (10%)</span>
                    <span>Aggressive (20%)</span>
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
                  Risk Level
                </CardTitle>
                <CardDescription>
                  Select your risk tolerance
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
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.riskLevel === level.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.riskLevel === level.value ? "bg-primary text-primary-foreground" : "bg-secondary"
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
                    <p className="text-primary-foreground/70 text-sm">Investment Summary</p>
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <span className="text-2xl font-bold">
                        €{parseInt(formData.initialCapital || "0").toLocaleString()}
                      </span>
                      <span className="text-primary-foreground/70">
                        at {formData.expectedReturn}% target return
                      </span>
                      <span className="text-primary-foreground/70 capitalize">
                        • {formData.riskLevel} risk
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
                        Calculating...
                      </>
                    ) : (
                      <>
                        Calculate Portfolio
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