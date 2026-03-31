"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, PieChart, BarChart3, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">RiskParity</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
          </div>
          <Link href="/login">
            <Button className="hidden md:flex">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            Smart Portfolio Management
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance"
          >
            Master Your Wealth with
            <br />
            <span className="text-muted-foreground">Risk Parity</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Build balanced portfolios using proven risk parity strategies. 
            Our simulator helps you understand and optimize your investment allocation 
            for better risk-adjusted returns.
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

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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

      {/* How it Works Section */}
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
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to build your optimized portfolio
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
                title: "Set Your Goals",
                description: "Enter your initial capital, expected returns, and risk tolerance level to define your investment parameters."
              },
              {
                icon: PieChart,
                step: "02",
                title: "Calculate Portfolio",
                description: "Our algorithm analyzes your inputs and generates an optimized portfolio using risk parity principles."
              },
              {
                icon: BarChart3,
                step: "03",
                title: "Review Results",
                description: "Explore detailed analytics including projected growth, asset allocation, and performance metrics."
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

      {/* Features Section */}
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
              Built for Smart Investors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you make informed investment decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Risk Management",
                description: "Optimize your portfolio based on risk parity principles for better diversification."
              },
              {
                icon: TrendingUp,
                title: "Growth Projections",
                description: "Visualize your potential investment growth over customizable time horizons."
              },
              {
                icon: PieChart,
                title: "Asset Allocation",
                description: "See exactly how your capital is distributed across different assets."
              },
              {
                icon: BarChart3,
                title: "Performance Metrics",
                description: "Track key indicators including mean return and maximum drawdown."
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get portfolio recommendations in seconds with our fast calculation engine."
              },
              {
                icon: Target,
                title: "Goal-Based Planning",
                description: "Align your portfolio with your specific financial goals and timeline."
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

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 px-6"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Optimize Your Portfolio?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of investors using risk parity strategies to build balanced, 
            resilient portfolios.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-base px-10 py-6">
              Start Calculating <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">RiskParity</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RiskParity. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
