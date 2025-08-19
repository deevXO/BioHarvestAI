"use client";
import Link from "next/link";
import { FlaskConical, Dna, Leaf, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-32 w-32 bg-emerald-400/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-24 w-24 bg-cyan-400/20 rounded-full blur-xl" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  BioHarvest AI
                </h3>
                <p className="text-emerald-200/80 text-sm font-medium">Genetic Intelligence Platform</p>
              </div>
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              Accelerating sustainable agriculture through AI-powered genetic analysis. 
              Empowering researchers to develop climate-resilient crops for a better tomorrow.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/deevXO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/deevbuilds" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/deevanshu-kapoor-a71098289" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Research Focus */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-300 flex items-center gap-2">
              <Dna className="h-5 w-5" />
              Research Focus
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-slate-300 hover:text-emerald-300 transition-colors">Drought Tolerance</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-emerald-300 transition-colors">Salt Resistance</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-emerald-300 transition-colors">Yield Enhancement</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-emerald-300 transition-colors">Disease Resistance</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-emerald-300 transition-colors">Nutritional Content</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-300 flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Platform
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/genes" className="text-slate-300 hover:text-emerald-300 transition-colors">Gene Explorer</Link></li>
              <li><Link href="/history" className="text-slate-300 hover:text-emerald-300 transition-colors">Analysis History</Link></li>
              <li><Link href="/docs" className="text-slate-300 hover:text-emerald-300 transition-colors">Documentation</Link></li>
              <li><Link href="/about" className="text-slate-300 hover:text-emerald-300 transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-emerald-300 transition-colors">API Access</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} BioHarvest AI. Advancing sustainable agriculture through genetic intelligence.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-slate-400 hover:text-emerald-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-400 hover:text-emerald-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-slate-400 hover:text-emerald-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


