
// Página principal (Landing Page) de la aplicación 
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, PieChart, BarChart3, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";


// Animaciones para los componentes con Framer Motion
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ======= Barra de navegación superior ======= */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo y nombre */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Call-Inversion</span>
          </Link>
          {/* Enlaces de navegación */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Cómo funciona
            </Link>
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Características
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Iniciar sesión
            </Link>
          </div>
          {/* Botón destacado para empezar */}
          <Link href="/login">
            <Button className="hidden md:flex">
              Comenzar <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </motion.header>

      {/* ======= Sección principal (Hero) ======= */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            Gestión inteligente de carteras
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance"
          >
            Domine su riqueza con
            <br />
            <span className="text-muted-foreground">Call-Inversion</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Construya carteras equilibradas utilizando estrategias de paridad de riesgo probadas. 
            Nuestro simulador le ayuda a comprender y optimizar su asignación de inversiones 
            para obtener mejores rendimientos ajustados al riesgo.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <Button size="lg" className="text-base px-8 py-6">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base px-8 py-6">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ======= Sección de estadísticas rápidas ======= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Estadísticas destacadas de la plataforma */}
            {[
              { value: "10K+", label: "Active Users" },
              { value: "$500M+", label: "Assets Analyzed" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "User Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ======= Sección "Cómo funciona" ======= */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo Funciona
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tres sencillos pasos para crear tu cartera optimizada
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Target,
                step: "01",
                title: "Define tus objetivos",
                description: "Introduce tu capital inicial, el retorno esperado y tu nivel de tolerancia al riesgo para definir los parámetros de tu inversión."
              },
              {
                icon: PieChart,
                step: "02",
                title: "Calcula tu cartera",
                description: "Nuestro algoritmo analiza tus datos y genera una cartera optimizada utilizando principios de paridad de riesgo."
              },
              {
                icon: BarChart3,
                step: "03",
                title: "Revisa los resultados",
                description: "Explora analíticas detalladas, incluyendo el crecimiento proyectado, la asignación de activos y métricas de rendimiento."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="absolute -top-4 left-8 px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-6 mt-2">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======= Sección de características ======= */}
      <section id="features" className="py-24 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Diseñado para inversores inteligentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
             Potentes funciones para ayudarte a tomar decisiones de inversión informadas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Gestión de Riesgos",
                description: "Optimice su cartera basada en principios de paridad de riesgo para una mejor diversificación."
              },
              {
                icon: TrendingUp,
                title: "Proyecciones de Crecimiento",
                description: "Visualice el crecimiento potencial de su inversión en horizontes de tiempo personalizables."
              },
              {
                icon: PieChart,
                title: "Asignación de Activos",
                description: "Vea exactamente cómo se distribuye su capital entre diferentes activos."
              },
              {
                icon: BarChart3,
                title: "Métricas de Rendimiento",
                description: "Realice un seguimiento de los indicadores clave, incluidos el rendimiento medio y la máxima caída."

              },
              {
                icon: Zap,
                title: "Resultados Instantáneos",
                description: "Obtenga recomendaciones de cartera en segundos con nuestro motor de cálculo rápido."
              },
              {
                icon: Target,
                title: "Planificación Basada en Objetivos",
                description: "Alinee su cartera con sus objetivos financieros específicos y su cronograma."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= Sección de llamada a la acción (CTA) ======= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-6"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Listo para optimizar tu cartera?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Únase a miles de inversores que utilizan estrategias de paridad de riesgo para construir carteras equilibradas y resilientes.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-base px-10 py-6">
              Comenzar <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* ======= Footer ======= */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo y nombre en el footer */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Call-Inversion</span>
            </div>
            {/* Enlaces legales y de contacto */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Términos</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contacto</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Call Inversion. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
