"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, Calculator, PieChart, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Calculator", icon: Calculator },
  { href: "/dashboard/results", label: "Results", icon: PieChart },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border hidden lg:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">RiskParity</span>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="w-5 h-5 text-sidebar-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Demo User</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">demo@example.com</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="sm" className="flex-1 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">RiskParity</span>
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
