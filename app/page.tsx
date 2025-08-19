"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Dna, Leaf, FlaskConical, Microscope, Sprout, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Onboarding } from "@/components/onboarding";

export default function Home() {
  return (
    <div className="relative">
      <Onboarding />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none select-none absolute -top-40 left-1/2 -translate-x-1/2 h-[800px] w-[1400px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_60%)]" />
          <div className="pointer-events-none select-none absolute top-20 left-20 h-64 w-64 rotate-12 bg-[conic-gradient(from_90deg,transparent,rgba(34,197,94,0.08),transparent)] blur-3xl" />
          <div className="pointer-events-none select-none absolute bottom-20 right-20 h-64 w-64 -rotate-12 bg-[conic-gradient(from_270deg,transparent,rgba(6,182,212,0.08),transparent)] blur-3xl" />
          
          {/* DNA Helix Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,25 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M0,50 Q25,75 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <motion.div 
                initial={{opacity:0,y:20}} 
                animate={{opacity:1,y:0}} 
                transition={{duration:0.6}}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                  <FlaskConical className="h-4 w-4" />
                  Next-Generation Agricultural Intelligence
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent leading-tight">
                  Decode Genetics for 
                  <span className="block">Climate Resilience</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Harness the power of AI to predict genetic mutations that enhance crop tolerance to drought, salinity, and extreme weather conditions. Build the sustainable food systems of tomorrow.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{opacity:0,y:20}} 
                animate={{opacity:1,y:0}} 
                transition={{duration:0.6,delay:0.1}}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/genes">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <Dna className="mr-2 h-5 w-5" />
                    Start Genetic Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3">
                  <Microscope className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{opacity:0,y:20}} 
                animate={{opacity:1,y:0}} 
                transition={{duration:0.6,delay:0.2}}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-700">50K+</div>
                  <div className="text-sm text-slate-600">Genes Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-700">95%</div>
                  <div className="text-sm text-slate-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-700">1K+</div>
                  <div className="text-sm text-slate-600">Research Labs</div>
                </div>
              </motion.div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div 
                initial={{opacity:0,x:20}} 
                animate={{opacity:1,x:0}} 
                transition={{duration:0.6,delay:0.1}}
              >
                <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                      <Dna className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-emerald-800">Genetic Impact Prediction</CardTitle>
                    <CardDescription className="text-slate-600">
                      Model mutation effects on key agricultural traits with unprecedented accuracy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">
                    Real-time insights with interactive visualizations and comprehensive analysis reports.
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{opacity:0,x:20}} 
                animate={{opacity:1,x:0}} 
                transition={{duration:0.6,delay:0.15}}
              >
                <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-teal-800">Climate Adaptation</CardTitle>
                    <CardDescription className="text-slate-600">
                      Identify genetic pathways for enhanced drought and salt tolerance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">
                    Focus on sustainable agriculture solutions for changing climate conditions.
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{opacity:0,x:20}} 
                animate={{opacity:1,x:0}} 
                transition={{duration:0.6,delay:0.2}}
              >
                <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-cyan-800">Advanced Analytics</CardTitle>
                    <CardDescription className="text-slate-600">
                      Comprehensive data analysis with machine learning insights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">
                    Statistical models and predictive algorithms for informed decision-making.
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{opacity:0,x:20}} 
                animate={{opacity:1,x:0}} 
                transition={{duration:0.6,delay:0.25}}
              >
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                      <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-green-800">Yield Optimization</CardTitle>
                    <CardDescription className="text-slate-600">
                      Enhance crop productivity through targeted genetic modifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">
                    Maximize agricultural output while maintaining environmental sustainability.
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Featured Genes Section */}
          <motion.div 
            initial={{opacity:0,y:20}} 
            animate={{opacity:1,y:0}} 
            transition={{duration:0.6,delay:0.3}}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Featured Research Targets</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Explore our curated collection of climate-resilience genes that are revolutionizing sustainable agriculture.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {id:"DREB1A", trait:"Drought Tolerance", description:"Transcription factor regulating stress-responsive genes", color:"emerald"},
                {id:"NHX1", trait:"Salt Tolerance", description:"Sodium/hydrogen antiporter for salinity resistance", color:"teal"},
                {id:"LEA", trait:"Water Retention", description:"Late embryogenesis abundant proteins", color:"cyan"}
              ].map((gene, index) => (
                <motion.div
                  key={gene.id}
                  initial={{opacity:0,y:20}} 
                  animate={{opacity:1,y:0}} 
                  transition={{duration:0.6,delay:0.4 + index * 0.1}}
                >
                  <Card className={`border-${gene.color}-200 bg-gradient-to-br from-${gene.color}-50 to-${gene.color}-100/50 hover:shadow-lg transition-all duration-300 group`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className={`text-${gene.color}-800 text-xl`}>{gene.id}</CardTitle>
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-br from-${gene.color}-500 to-${gene.color}-600 flex items-center justify-center`}>
                          <Dna className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <CardDescription className={`text-${gene.color}-700 font-medium`}>{gene.trait}</CardDescription>
                      <p className="text-sm text-slate-600 mt-2">{gene.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/genes/${gene.id}`}>
                        <Button className={`w-full bg-gradient-to-r from-${gene.color}-600 to-${gene.color}-700 hover:from-${gene.color}-700 hover:to-${gene.color}-800 text-white font-medium group-hover:shadow-lg transition-all duration-300`}>
                          <FlaskConical className="mr-2 h-4 w-4" />
                          Analyze {gene.id}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
