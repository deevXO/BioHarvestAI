"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Dna, 
  Microscope,      
  Sprout, 
  Globe,
  Zap,
  CheckCircle,
  TrendingUp,
  Droplets,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Award,
  Shield,
  Target,
  Brain,
  Activity,
  Waves,
  Thermometer,
  Beaker
} from "lucide-react";

// Optimized Hero Section with minimal animations
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const achievements = useMemo(() => [
    { text: "15K+ Plant Genes", icon: Dna, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { text: "95% Accuracy", icon: Target, color: "text-blue-400", bg: "bg-blue-500/20" },
    { text: "AI Powered", icon: Brain, color: "text-purple-400", bg: "bg-purple-500/20" },
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      {/* Static Background - No heavy animations */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.2),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-10 text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium text-sm lg:text-base">AI-Powered • Climate-Ready</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                Engineer the Future
              </span>
              <br />
              <span className="text-emerald-300">of Agriculture</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Design climate-resilient crops with generative AI. From genome analysis to field deployment 
              — revolutionizing agriculture for a sustainable planet.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/genes/explore">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 group text-base sm:text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/lab">
                <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 group text-base sm:text-lg">
                  <Brain className="mr-2 h-5 w-5" />
                  AI Lab Demo
                </Button>
              </Link>
            </motion.div>

            {/* Achievement Badges - Static */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${achievement.bg} backdrop-blur-sm border border-white/10`}
                >
                  <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                  <span className="text-white text-xs sm:text-sm font-medium">{achievement.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Simplified Visual */}
          <motion.div 
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Simplified 3D Visual */}
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-60 h-60 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Dna className="h-24 w-24 text-white" />
                </div>
              </div>
              
              {/* Static floating elements - no animations */}
              <div className="absolute top-10 right-10 w-12 h-12 bg-emerald-400/30 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-emerald-200" />
              </div>
              <div className="absolute bottom-10 left-10 w-10 h-10 bg-teal-400/30 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-teal-200" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Optimized Global Impact Dashboard with cleaner animations
const GlobalImpactDashboard = () => {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const metrics = useMemo(() => [
    {
      id: "crops-enhanced",
      value: "2.5M+",
      label: "Crops Enhanced",
      change: "+34%",
      icon: Sprout,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      details: {
        description: "Climate-resilient crops developed using our AI platform",
        breakdown: [
          { label: "Drought Resistant", value: "1.2M" },
          { label: "Salt Tolerant", value: "800K" },
          { label: "Heat Resistant", value: "500K" }
        ]
      }
    },
    {
      id: "water-saved",
      value: "1.8B",
      label: "Liters Water Saved",
      change: "+28%",
      icon: Droplets,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      details: {
        description: "Water conservation achieved through drought-tolerant crop varieties",
        breakdown: [
          { label: "Agricultural Use", value: "1.2B L" },
          { label: "Irrigation Systems", value: "400M L" },
          { label: "Processing", value: "200M L" }
        ]
      }
    },
    {
      id: "co2-reduced",
      value: "500K",
      label: "Tons CO₂ Reduced",
      change: "+42%",
      icon: Globe,
      color: "green",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      details: {
        description: "Carbon footprint reduction through optimized agricultural practices",
        breakdown: [
          { label: "Reduced Fertilizer", value: "300K T" },
          { label: "Efficient Transport", value: "150K T" },
          { label: "Sustainable Practices", value: "50K T" }
        ]
      }
    },
    {
      id: "farmers-empowered",
      value: "50K+",
      label: "Farmers Empowered",
      change: "+67%",
      icon: Users,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      details: {
        description: "Agricultural professionals utilizing our genetic solutions",
        breakdown: [
          { label: "Small Scale", value: "32K" },
          { label: "Commercial", value: "15K" },
          { label: "Research Labs", value: "3K" }
        ]
      }
    }
  ], []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <Badge className="mb-6 px-4 sm:px-6 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
            <TrendingUp className="mr-2 h-4 w-4" />
            Global Impact
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 sm:mb-8 leading-tight">
            Transforming Agriculture
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Across the Globe
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Real-time impact metrics from our AI-powered genetic solutions deployed worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card 
                className={`relative overflow-hidden bg-gradient-to-br ${metric.bgGradient} border-2 border-transparent hover:border-${metric.color}-200 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl`}
                onClick={() => setExpandedMetric(expandedMetric === metric.id ? null : metric.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.gradient} shadow-lg`}>
                      <metric.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className={`text-sm font-semibold px-2 py-1 rounded-full bg-${metric.color}-100 text-${metric.color}-700`}>
                      {metric.change}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                      {metric.value}
                    </div>
                    <div className="text-slate-600 font-medium text-sm sm:text-base">
                      {metric.label}
                    </div>
                  </div>
                </CardContent>

                <AnimatePresence>
                  {expandedMetric === metric.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/60 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="p-4 space-y-3">
                        <p className="text-xs sm:text-sm text-slate-600">
                          {metric.details.description}
                        </p>
                        <div className="space-y-2">
                          {metric.details.breakdown.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-xs text-slate-500">{item.label}</span>
                              <span className={`text-xs font-semibold text-${metric.color}-600`}>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Optimized How It Works Carousel with reduced animations
const HowItWorksCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const steps = useMemo(() => [
    {
      title: "Discover",
      subtitle: "Genomic Intelligence",
      description: "Explore vast genetic databases with AI-powered search. Discover genes linked to climate resilience across thousands of plant species.",
      icon: Microscope,
      gradient: "from-blue-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-blue-500/10 to-cyan-500/20",
      features: ["15,000+ Plant Genes", "Multi-trait Analysis", "Pathway Mapping", "Cross-species Transfer"],
    },
    {
      title: "Design", 
      subtitle: "AI Genetic Engineering",
      description: "Generate optimal mutations using advanced AI models. Predict structural and functional impacts with unprecedented accuracy.",
      icon: Dna,
      gradient: "from-emerald-500 to-teal-500",
      bgPattern: "bg-gradient-to-br from-emerald-500/10 to-teal-500/20",
      features: ["Generative AI Mutations", "3D Protein Modeling", "Impact Prediction", "Multi-trait Optimization"],
    },
    {
      title: "Cultivate",
      subtitle: "Lab-to-Field Pipeline", 
      description: "Streamlined protocols for CRISPR design, validation experiments, and field deployment of climate-resilient crops.",
      icon: Sprout,
      gradient: "from-green-500 to-emerald-500",
      bgPattern: "bg-gradient-to-br from-green-500/10 to-emerald-500/20",
      features: ["CRISPR Protocols", "Validation Experiments", "Resource Optimization", "Field Deployment"],
    }
  ], []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  }, [steps.length]);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(nextStep, 5000);
    return () => clearInterval(interval);
  }, [nextStep, isAutoPlay]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <Badge className="mb-6 px-4 sm:px-6 py-2 bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
            <Zap className="mr-2 h-4 w-4" />
            Powered by Advanced AI
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            From Genome to Harvest
            <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              in Three Steps
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Revolutionary workflow powered by generative AI and cutting-edge biotechnology.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
              {/* Left Side - Content */}
              <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 bg-gradient-to-r ${steps[currentStep].gradient} rounded-2xl shadow-lg`}>
                          {React.createElement(steps[currentStep].icon, { 
                            className: "h-8 w-8 text-white" 
                          })}
                        </div>
                        
                        <div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            {steps[currentStep].title}
                          </h3>
                          <p className="text-emerald-300 text-lg sm:text-xl font-medium">
                            {steps[currentStep].subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                        {steps[currentStep].description}
                      </p>
                    </div>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {steps[currentStep].features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-slate-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Visual */}
              <div className={`relative ${steps[currentStep].bgPattern} flex items-center justify-center p-8`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className={`w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r ${steps[currentStep].gradient} rounded-full flex items-center justify-center shadow-2xl`}>
                      {React.createElement(steps[currentStep].icon, { 
                        className: "h-20 w-20 sm:h-32 sm:w-32 text-white" 
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 sm:mt-12">
            <Button 
              variant="outline" 
              onClick={prevStep}
              className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 px-4 sm:px-6 py-3 backdrop-blur-sm group"
            >
              <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex space-x-2 sm:space-x-4">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`relative px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium transition-all ${
                    index === currentStep 
                      ? 'text-white bg-emerald-500/20 border border-emerald-400/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10 text-xs sm:text-sm">{step.title}</span>
                  {index === currentStep && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-10 rounded-xl`} />
                  )}
                </button>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={nextStep}
              className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 px-4 sm:px-6 py-3 backdrop-blur-sm group"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm text-slate-400 hover:text-white transition-colors"
            >
              {isAutoPlay ? (
                <>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm">Auto-playing</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="text-sm">Paused</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Optimized Featured Genes Section with cleaner modal system
const FeaturedGenesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featuredGenes = useMemo(() => [
    {
      id: "DREB1A",
      name: "DREB1A",
      fullName: "Dehydration Responsive Element Binding protein 1A",
      trait: "Drought Tolerance",
      organism: "Arabidopsis thaliana",
      impact: 0.92,
      description: "Revolutionary transcription factor enabling 40% water usage reduction with enhanced cellular protection mechanisms.",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      applications: ["Wheat", "Corn", "Rice", "Soybean"],
      stats: [
        { label: "Water Savings", value: "40%" },
        { label: "Yield Increase", value: "25%" }
      ],
      icon: Droplets
    },
    {
      id: "NHX1", 
      name: "NHX1",
      fullName: "Sodium/Hydrogen Exchanger 1",
      trait: "Salt Tolerance",
      organism: "Arabidopsis thaliana", 
      impact: 0.87,
      description: "Breakthrough antiporter for cultivation in saline soils, enabling agriculture in previously unusable lands.",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      applications: ["Cotton", "Tomato", "Barley", "Quinoa"],
      stats: [
        { label: "Salt Tolerance", value: "300mM" },
        { label: "Crop Expansion", value: "35%" }
      ],
      icon: Waves
    },
    {
      id: "LEA14",
      name: "LEA14",
      fullName: "Late Embryogenesis Abundant protein 14",
      trait: "Heat Tolerance", 
      organism: "Gossypium hirsutum",
      impact: 0.78,
      description: "Protective protein enabling sustained growth at extreme temperatures up to 45°C+ with maintained yield quality.",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      applications: ["Cotton", "Sunflower", "Maize", "Millet"],
      stats: [
        { label: "Heat Tolerance", value: "45°C+" },
        { label: "Protein Stability", value: "98%" }
      ],
      icon: Thermometer
    }
  ], []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <Badge className="mb-6 px-6 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
            <Dna className="mr-2 h-4 w-4" />
            Breakthrough Discoveries
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 sm:mb-8 leading-tight">
            Featured Genetic
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Explore breakthrough genes powering the next generation of climate-resilient crops.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredGenes.map((gene, index) => (
            <motion.div
              key={gene.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(gene.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <Link href={`/genes/${gene.id}`}>
                <Card className={`relative overflow-hidden bg-gradient-to-br ${gene.bgGradient} border-2 border-transparent hover:border-${gene.color}-200 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-2`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${gene.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${gene.gradient} shadow-lg`}>
                        <gene.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      
                      <Badge className={`bg-${gene.color}-100 text-${gene.color}-700 border-${gene.color}-200 px-3 py-1 font-semibold shadow-sm`}>
                        {gene.trait}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className={`text-xl sm:text-2xl font-bold group-hover:text-${gene.color}-700 transition-colors duration-300`}>
                        {gene.name}
                      </CardTitle>
                      <p className="text-slate-600 text-xs sm:text-sm font-medium leading-tight">
                        {gene.fullName}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 sm:space-y-6 relative z-10">
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                      {gene.description}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                      {gene.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="text-center p-2 sm:p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/80"
                        >
                          <div className={`text-base sm:text-lg font-bold text-${gene.color}-600`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Applications Tags */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Applications</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {gene.applications.map((app, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 bg-white/80 text-slate-600 text-xs font-medium rounded-full border border-slate-200"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Impact Score */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/60">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-sm text-slate-500 italic">{gene.organism}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">Impact</span>
                        <div className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${gene.gradient} bg-clip-text text-transparent`}>
                          {(gene.impact * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${gene.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${gene.impact * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 space-y-6 sm:space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
              Discover More Genetic Solutions
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto px-4 sm:px-0">
              Explore our comprehensive database of over 15,000+ genes with detailed analysis.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/genes/explore">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all group">
                Explore Database
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/lab">
              <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6 sm:px-8 py-4 rounded-full transition-all group">
                <Beaker className="mr-2 h-4 w-4" />
                Try AI Lab
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Landing Page Component - Optimized
export default function OptimizedLandingPage() {
  return (
    <div className="relative">
      <HeroSection />
      <GlobalImpactDashboard />
      <HowItWorksCarousel />
      <FeaturedGenesSection />
      
      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Agriculture?
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto px-4 sm:px-0">
              Join the revolution in sustainable food production. Start designing climate-resilient crops today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/genes/explore">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold rounded-full transition-all">
                  Start Your Research
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 text-base sm:text-lg rounded-full transition-all">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}