"use client";
import { motion } from "framer-motion";

export function BiotechBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* DNA Helix Pattern */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="dna-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0,20 Q10,10 20,20 T40,20" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M0,20 Q10,30 20,20 T40,20" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="10" cy="15" r="1" fill="currentColor" />
              <circle cx="30" cy="25" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-pattern)" />
        </svg>
      </motion.div>

      {/* Floating Molecules */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Genetic Code Streams */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
            style={{
              width: '200px',
              top: `${20 + i * 15}%`,
              left: '-200px',
            }}
            animate={{
              x: ['0px', '100vw'],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Cellular Structures */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-radial from-emerald-400/5 to-transparent animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-gradient-radial from-teal-400/5 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-28 h-28 rounded-full bg-gradient-radial from-cyan-400/5 to-transparent animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
}
