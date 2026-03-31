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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-primary-foreground">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold">RiskParity</span>
          </Link>
        </div>
        
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Invest Smarter,
            <br />
            Not Harder.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary-foreground/80 text-lg max-w-md"
          >
            Join thousands of investors using risk parity strategies to build 
            balanced portfolios and achieve their financial goals.
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
            <span className="text-primary-foreground font-semibold">10,000+</span> investors trust us
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 lg:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
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
              <span className="text-xl font-semibold text-foreground">RiskParity</span>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="border-0 shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Link
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" type="button">
                        <Github className="mr-2 w-4 h-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" type="button">
                        <Chrome className="mr-2 w-4 h-4" />
                        Google
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card className="border-0 shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                      Start building your optimized portfolio today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        By signing up, you agree to our{" "}
                        <Link href="#" className="underline hover:text-foreground">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline hover:text-foreground">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" type="button">
                        <Github className="mr-2 w-4 h-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" type="button">
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
