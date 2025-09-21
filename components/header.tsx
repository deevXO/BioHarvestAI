"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Dna, FlaskConical, History, BookOpen, Sparkles, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/genes", label: "Explore Genes", icon: Dna },
  { href: "/lab", label: "In-Silico Lab", icon: Microscope },
  { href: "/history", label: "History", icon: History },
  { href: "/docs", label: "Docs", icon: BookOpen },
];

export function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/30 bg-gradient-to-r from-emerald-50/95 via-teal-50/95 to-cyan-50/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <FlaskConical className="h-5 w-5" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">BioHarvest AI</span>
            <span className="text-xs text-emerald-600/70 font-medium">Genetic Intelligence Platform</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg hover:bg-emerald-100/50",
                  pathname === item.href 
                    ? "text-emerald-700 bg-emerald-100/70 shadow-sm" 
                    : "text-slate-600 hover:text-emerald-700"
                )}
              >
                <IconComponent className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-emerald-100/50"
          onClick={() => setMobileOpen(v => !v)}
          title="Open navigation menu"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6 text-emerald-700" />
        </button>
        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50" onClick={signOut}>
              {user.name}
            </Button>
          ) : (
            <Link href="/auth/sign-in">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Sign In
              </Button>
            </Link>
          )}
          <Link href="/genes">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <Dna className="mr-2 h-4 w-4" />
              Start Analysis
            </Button>
          </Link>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50 border-b border-emerald-200">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-base font-medium px-3 py-2 rounded-lg hover:bg-emerald-100/50",
                    pathname === item.href 
                      ? "text-emerald-700 bg-emerald-100/70 shadow-sm" 
                      : "text-slate-600 hover:text-emerald-700"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            {user ? (
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 mt-2" onClick={signOut}>
                {user.name}
              </Button>
            ) : (
              <Link href="/auth/sign-in">
                <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 mt-2" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/genes">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 mt-2" onClick={() => setMobileOpen(false)}>
                <Dna className="mr-2 h-4 w-4" />
                Start Analysis
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}


