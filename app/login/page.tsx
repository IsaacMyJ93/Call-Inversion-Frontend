// Esta es la pagina para login y registro de usuarios.
// "use client" es necesario para usar hooks y estado en este componente, ya que Next.js 13+ tiene un enfoque de renderizado híbrido (server + client).
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, ArrowLeft, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// IMPORTANTE: Importamos Supabase y los Toasts para login de supabase
import { supabase } from "@/lib/supabase";
import toast from 'react-hot-toast';


export default function LoginPage() {
  const router = useRouter();

  // 1. Estados para guardar lo que el usuario escribe
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // 2. Función para INICIAR SESIÓN 
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Si hay un error, lo interceptamos antes de que caiga al catch
      if (error) {
        console.log("Error de Supabase:", error);
        throw error;
      }

      toast.success("¡Bienvenido de nuevo!", {
        duration: 4000,
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error capturado en el catch:", error);
      toast.error("Usuario no registrado o credenciales incorrectas", {
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Función para REGISTRARSE 
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDACIÓN: Si no está marcado el checkbox, lanzamos toast y cortamos
    if (!acceptedTerms) {
      toast.error("Debes aceptar las condiciones y términos de privacidad para registrarte.", {
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name } // Guardamos el nombre también
        }
      });

      if (error?.message?.includes("Password should be at least 8 characters")) {
        toast.error("La contraseña debe tener al menos 8 caracteres.", {
          duration: 5000,
        });
        setIsLoading(false);
        return;
      } else { // Por si encuentro otros errores de Supabase, para depuración
        console.log("Respuesta de Supabase:", { data, error });
      }

      if (error) throw error;

      toast.success("Usuario registrado correctamente. ¡Confirma el enlace de verificación en tu correo electrónico!", {
        duration: 7000,
      });

      // 2. LIMPIEZA: todos los campos 
      setEmail("");
      setPassword("");
      setName("");
      setAcceptedTerms(false);

    } catch (error: any) {
      console.error("Error capturado:", error.message);
      toast.error(error.message || "Error al registrar usuario", {
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Función para LOGIN CON GOOGLE
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Esto le dice a Supabase a dónde volver después de que el usuario acepte en Google
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      // No ponemos toast de éxito aquí porque la página se redirigirá a la de Google automáticamente
    } catch (error: any) {
      toast.error(error.message || "Error al conectar con Google", {
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* --- PANEL IZQUIERDO (Branding) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-primary-foreground">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold">CALL INVERSION</span>
          </Link>
        </div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Invierte Inteligentemente,
            <br />
            No lo hagas difícil.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary-foreground/80 text-lg max-w-md"
          >
            Únete a miles de inversores que utilizan estrategias de paridad de riesgo para construir
            carteras equilibradas y alcanzar sus objetivos financieros.
          </motion.p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary flex items-center justify-center"
              >
                <User className="w-5 h-5 text-primary-foreground/60" />
              </div>
            ))}
          </div>
          <p className="text-primary-foreground/70 text-sm">
            <span className="text-primary-foreground font-semibold">10,000+</span> inversores confían en nosotros
          </p>
        </div>
      </div>

      {/*Panel derecho - Formulario de autenticación */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 lg:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">Call-Inversion</span>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Acceso</TabsTrigger>
                <TabsTrigger value="signup">Registro</TabsTrigger>
              </TabsList>
              {/* ======================================= */}
              {/*  LOGIN                                  */}
              {/* ======================================= */}
              <TabsContent value="login">
                <Card className="border-0 shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl text-center">Bienvenido</CardTitle>
                    <CardDescription className="text-center">
                      Introduce tus credenciales para acceder a tu cartera.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 pb-0">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Link
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          O también puedes acceder o registrarte automáticamente con
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
                        <Chrome className="mr-2 w-4 h-4" />
                        Google
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* ======================================= */}
              {/*  SIGN UP                                */}
              {/* ======================================= */}
              <TabsContent value="signup">
                <Card className="border-0 shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl text-center">Crear una Cuenta</CardTitle>
                    <CardDescription className="text-center">
                      Comienza a construir tu cartera optimizada hoy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 pb-0">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Nombre completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Nombre Apellidos"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Correo</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Contraseña</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {/* Contenedor del Checkbox */}
                      <div className="flex items-start space-x-2 mt-4 mb-6">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                          Al registrarte, aceptas nuestros{" "}
                          <Link href="/terms" target="_blank" className="underline hover:text-primary transition-colors">
                            términos de servicios
                          </Link>{" "}
                          y nuestra{" "}
                          <Link href="/privacy-policy" prefetch={true} target="_blank" className="underline hover:text-primary transition-colors">
                            política de privacidad
                          </Link>
                          .
                        </label>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          O continuar con
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
                        <Chrome className="mr-2 w-4 h-4" />
                        Google
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
