"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Dna, FlaskConical, Sparkles, Search, Brain, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/genes/explore", label: "Research", icon: Search },
  { href: "/lab", label: "AI Lab", icon: FlaskConical },
  { href: "/genes", label: "Gene Database", icon: Dna },
  { href: "/about", label: "About", icon: Sparkles },
];

export function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLandingPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        isLandingPage 
          ? scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50"
            : "bg-transparent"
          : scrolled 
            ? "border-emerald-200/50 bg-white/80 backdrop-blur-xl shadow-lg shadow-emerald-500/10" 
            : "border-emerald-200/30 bg-gradient-to-r from-emerald-50/95 via-teal-50/95 to-cyan-50/95 backdrop-blur-xl shadow-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Leaf className="h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <div className={cn(
              "text-xl font-bold transition-colors",
              isLandingPage 
                ? scrolled ? "text-slate-800" : "text-white"
                : "text-slate-800"
            )}>
              BioHarvest<span className="text-emerald-500">AI</span>
            </div>
            <div className={cn(
              "text-xs transition-colors",
              isLandingPage 
                ? scrolled ? "text-slate-500" : "text-slate-300"
                : "text-emerald-600/70"
            )}>
              Next-Gen Agriculture
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              <Link href={item.href}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300",
                    pathname === item.href && "bg-emerald-100 text-emerald-700",
                    isLandingPage
                      ? scrolled 
                        ? "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50" 
                        : "text-slate-200 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <Link href="/lab">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6">
                <Brain className="mr-2 h-4 w-4" />
                Try AI Lab
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              <span className={cn(
                "text-sm font-medium",
                isLandingPage 
                  ? scrolled ? "text-slate-700" : "text-white"
                  : "text-slate-700"
              )}>
                Welcome, {user.displayName || user.email}
              </span>
              <Button
                variant="outline"
                onClick={signOut}
                className={cn(
                  "text-sm",
                  isLandingPage && !scrolled && "border-white/30 text-white hover:bg-white/10"
                )}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className={cn(
            "md:hidden p-2",
            isLandingPage 
              ? scrolled ? "text-slate-800" : "text-white"
              : "text-slate-800"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "md:hidden border-t",
              isLandingPage
                ? "bg-white/95 backdrop-blur-lg border-slate-200/50"
                : "bg-white/95 backdrop-blur-lg border-emerald-200/50"
            )}
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-emerald-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4 ml-auto opacity-50" />
                  </Button>
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200/20">
                {!user ? (
                  <Link href="/lab">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
                      <Brain className="mr-2 h-4 w-4" />
                      Try AI Lab
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600 px-4">
                      Welcome, {user.displayName || user.email}
                    </div>
                    <Button
                      variant="outline"
                      onClick={signOut}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
