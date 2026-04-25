// Pagina de resultados

// Indica que este archivo es un componente del lado del cliente en Next.js
"use client";

// Importaciones de librerías y componentes UI
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar, TrendingUp, TrendingDown, ArrowLeft,
  Download, Share2, RefreshCw, PieChart as PieIcon
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
// Importamos la función para llamar al backend y el tipo de respuesta
import { InversionResponse } from "@/lib/api";

export default function ResultsPage() {
  const router = useRouter();

  // 1. Estado para los datos REALES
  const [data, setData] = useState<InversionResponse | null>(null);

  useEffect(() => {
    // 2. Recuperamos el cálculo del localStorage
    const savedData = localStorage.getItem("lastResult");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      router.push("/dashboard"); // Si no hay datos, volvemos atrás
    }
  }, [router]);

  if (!data) {
    return <div className="flex h-screen items-center justify-center">Cargando resultados...</div>;
  }

  // 3. Adaptamos los datos para el gráfico de Pastel (PieChart)
  // Mapeamos los activos de la cartera al formato que necesita Recharts
  const pieData = data.cartera.map((asset, index) => ({
    name: asset.simbolo,
    value: parseFloat(asset.pesoCartera.replace('%', '')),
    color: `var(--chart-${(index % 5) + 1})` // Cicla entre los colores definidos en tu CSS
  }));


  // Componente principal de la página de resultados del portafolio
  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado de la página con acciones rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          {/* Enlace para volver a la calculadora */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Atras a la calculadora
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Resultados del Portafolio</h1>
          <p className="text-muted-foreground mt-1">
            Asignación optimizada de su portafolio según la paridad de riesgo
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Botón para recalcular */}
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recalcular
            </Button>
          </Link>
          {/* Botón para compartir */}
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          {/* Botón para exportar */}
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </motion.div>

      {/* Tarjetas de KPIs principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4 mb-8"
      >
        {/* Tarjeta: Horizonte de inversión */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Horizonte de Inversión</p>
                <p className="text-3xl font-bold text-foreground">
                  {data.resultados.añosEstimados}
                </p>
                <p className="text-sm text-muted-foreground mt-1">años</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Calendar className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta: Rentabilidad media */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rentabilidad Media</p>
                <p className="text-3xl font-bold text-chart-1">
                  {data.resultados.rentabilidadMediaAplicada}
                </p>
                <p className="text-sm text-muted-foreground mt-1">anualmente</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta: Peor caída estimada */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Peor Caída Estimada</p>
                <p className="text-3xl font-bold text-destructive">
                  {data.resultados.peorCaidaEstimada}
                </p>
                <p className="text-sm text-muted-foreground mt-1">peor caso</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fila de gráficos: crecimiento y distribución */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid lg:grid-cols-10 gap-6 mb-8"
      >
        {/* Gráfico de área: crecimiento de la inversión */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Crecimiento de la Inversión</CardTitle>
            <CardDescription>Valor proyectado del portafolio a lo largo del tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.historicoGrafica}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="año"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `Y${value}`}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: "var(--foreground)", fontWeight: "600" }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, "Portfolio Value"]}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de pastel: distribución de activos */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribución de Activos</CardTitle>
            <CardDescription>Distribución del portafolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="70%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Weight"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Leyenda de colores para los activos */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabla de detalles del portafolio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Portafolio</CardTitle>
            <CardDescription>Desglose detallado de la asignación de activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">Símbolo</TableHead>
                    <TableHead className="font-semibold">Nombre</TableHead>
                    <TableHead className="font-semibold text-right">Peso</TableHead>
                    <TableHead className="font-semibold text-right">Capital Asignado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.cartera.map((asset, index) => (
                    <TableRow key={index} className="hover:bg-secondary/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground"
                            style={{ backgroundColor: pieData[index]?.color || "var(--primary)" }}
                          >
                            {asset.simbolo.charAt(0)}
                          </div>
                          <span className="font-semibold">{asset.simbolo}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{asset.nombre}</TableCell>
                      <TableCell className="text-right font-medium">{asset.pesoCartera}</TableCell>
                      <TableCell className="text-right font-semibold">{asset.capitalAsignado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Fila de total del portafolio  */}
            <div className="flex items-center justify-between mt-4 p-4 rounded-lg bg-primary text-primary-foreground">
              <span className="font-semibold">Valor Total del Portafolio</span>
              <span className="text-2xl font-bold">€10,000</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Aviso legal / disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto"
      >
        Esta es una simulación basada en datos históricos y principios de paridad de riesgo.
        El rendimiento pasado no garantiza resultados futuros. Por favor, consulte con un
        asesor financiero antes de tomar decisiones de inversión.
      </motion.p>
    </div>
  );
}
