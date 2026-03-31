
// Indica que este archivo es un componente del lado del cliente en Next.js
"use client";

// Importaciones de librerías y componentes UI
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, TrendingUp, TrendingDown, ArrowLeft, Download, Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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


// Datos simulados de ejemplo para mostrar resultados de portafolio
const portfolioData = {
  resultados: {
    añosEstimados: 11, // Horizonte de inversión en años
    rentabilidadMediaAplicada: "9.45%", // Rentabilidad media anual
    peorCaidaEstimada: "-17.18%" // Peor caída estimada
  },
  cartera: [
    { simbolo: "KO", nombre: "The Coca-Cola Company", pesoCartera: "47.73%", capitalAsignado: "4,772 €" },
    { simbolo: "AAPL", nombre: "Apple Inc.", pesoCartera: "52.27%", capitalAsignado: "5,227 €" }
  ],
  historicoGrafica: [
    { año: 0, valor: 10000 },
    { año: 1, valor: 10945 },
    { año: 2, valor: 11980 },
    { año: 3, valor: 13112 },
    { año: 4, valor: 14352 },
    { año: 5, valor: 15708 },
    { año: 6, valor: 17193 },
    { año: 7, valor: 18817 },
    { año: 8, valor: 20595 },
    { año: 9, valor: 22541 },
    { año: 10, valor: 24671 },
    { año: 11, valor: 27500 }
  ]
};

// Datos para el gráfico de pastel (distribución de activos)
const pieData = [
  { name: "KO", value: 47.73, color: "var(--chart-1)" },
  { name: "AAPL", value: 52.27, color: "var(--chart-2)" },
];

// Configuración de animación para los componentes
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};


// Componente principal de la página de resultados del portafolio
export default function ResultsPage() {
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
            Back to Calculator
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Results</h1>
          <p className="text-muted-foreground mt-1">
            Your optimized risk parity portfolio allocation
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Botón para recalcular */}
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recalculate
            </Button>
          </Link>
          {/* Botón para compartir */}
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          {/* Botón para exportar */}
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
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
                <p className="text-sm text-muted-foreground mb-1">Investment Horizon</p>
                <p className="text-3xl font-bold text-foreground">
                  {portfolioData.resultados.añosEstimados}
                </p>
                <p className="text-sm text-muted-foreground mt-1">years</p>
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
                <p className="text-sm text-muted-foreground mb-1">Mean Return</p>
                <p className="text-3xl font-bold text-chart-1">
                  {portfolioData.resultados.rentabilidadMediaAplicada}
                </p>
                <p className="text-sm text-muted-foreground mt-1">annually</p>
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
                <p className="text-sm text-muted-foreground mb-1">Max Drawdown</p>
                <p className="text-3xl font-bold text-destructive">
                  {portfolioData.resultados.peorCaidaEstimada}
                </p>
                <p className="text-sm text-muted-foreground mt-1">worst case</p>
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
            <CardTitle>Investment Growth</CardTitle>
            <CardDescription>Projected portfolio value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={portfolioData.historicoGrafica}
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
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Portfolio distribution</CardDescription>
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
            <CardTitle>Portfolio Details</CardTitle>
            <CardDescription>Detailed breakdown of your asset allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">Symbol</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold text-right">Weight</TableHead>
                    <TableHead className="font-semibold text-right">Capital Allocated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioData.cartera.map((asset, index) => (
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

            {/* Fila de total del portafolio */}
            <div className="flex items-center justify-between mt-4 p-4 rounded-lg bg-primary text-primary-foreground">
              <span className="font-semibold">Total Portfolio Value</span>
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
        This is a simulation based on historical data and risk parity principles. 
        Past performance does not guarantee future results. Please consult with a 
        financial advisor before making investment decisions.
      </motion.p>
    </div>
  );
}
