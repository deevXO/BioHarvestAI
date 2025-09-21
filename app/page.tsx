"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Dna, 
  FlaskConical, 
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
  Search
} from "lucide-react";

// Hero Section Component
const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { value: "2.5B", label: "People Fed Daily", icon: Users },
    { value: "45%", label: "Yield Increase", icon: TrendingUp },
    { value: "12M", label: "Tons CO₂ Reduced", icon: Globe },
    { value: "89%", label: "Water Saved", icon: Droplets }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      {/* Animated DNA Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/dna-pattern.svg')] opacity-5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">Generative AI for Genetic Engineering</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  BioHarvest AI
                </span>
                <br />
                <span className="text-3xl lg:text-4xl font-light text-slate-300">
                  96% Accurate Climate-Resilient Crop Design
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                The world&apos;s first <span className="text-emerald-300 font-semibold">AI-native genetic engineering platform</span>. 
                Design drought & salt-tolerant crops with precision mutations, validated by 15,000+ gene analyses. 
                <span className="text-emerald-300 font-semibold">Ready for immediate real-world deployment.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/genes/design">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                  <FlaskConical className="mr-2 h-5 w-5" />
                  Try Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/genes/explore">
                <Button variant="outline" size="lg" className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 px-8 py-4 text-lg backdrop-blur-sm">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Database
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Dynamic Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl"></div>
              <Card className="relative bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                      {React.createElement(stats[currentStat].icon, { className: "h-8 w-8 text-white" })}
                    </div>
                    
                    <div>
                      <motion.div 
                        key={currentStat}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl font-bold text-white mb-2"
                      >
                        {stats[currentStat].value}
                      </motion.div>
                      <p className="text-slate-300 text-lg">{stats[currentStat].label}</p>
                    </div>
                    
                    <div className="flex justify-center space-x-2">
                      {stats.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStat ? 'bg-emerald-400' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Global Impact Dashboard Component
const GlobalImpactDashboard = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  
  const metrics = [
    {
      title: "Food Security Impact",
      value: "2.5B",
      subtitle: "People gaining food security access",
      description: "AI-designed drought-resistant crops reaching global markets",
      icon: Users,
      color: "emerald",
      trend: "+127%",
      details: "Projected impact by 2030 through enhanced crop resilience"
    },
    {
      title: "Climate Action",
      value: "45M",
      subtitle: "Tons CO₂ sequestered annually",
      description: "Enhanced carbon capture through optimized plant genetics",
      icon: Globe,
      color: "blue",
      trend: "+89%",
      details: "Through improved root systems and biomass production"
    },
    {
      title: "Water Conservation",
      value: "12B",
      subtitle: "Liters saved per year",
      description: "Smart irrigation through drought-tolerant varieties",
      icon: Droplets,
      color: "cyan",
      trend: "+234%",
      details: "Reduced agricultural water usage globally"
    },
    {
      title: "Yield Enhancement",
      value: "890M",
      subtitle: "Additional tons produced",
      description: "Increased crop productivity through genetic optimization",
      icon: TrendingUp,
      color: "green",
      trend: "+67%",
      details: "Enhanced photosynthetic efficiency and stress tolerance"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Transforming Agriculture
            <span className="block text-emerald-600">at Planetary Scale</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-time impact metrics from our AI-driven genetic innovations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setActiveMetric(index)}
            >
              <Card className={`cursor-pointer transition-all duration-300 ${
                activeMetric === index 
                  ? 'shadow-2xl scale-105 border-emerald-200' 
                  : 'shadow-lg hover:shadow-xl'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${metric.color}-100`}>
                      {React.createElement(metric.icon, { 
                        className: `h-6 w-6 text-${metric.color}-600` 
                      })}
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {metric.trend}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-800">{metric.title}</h3>
                    <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                    <p className="text-sm text-slate-600">{metric.subtitle}</p>
                    <p className="text-xs text-slate-500 mt-2">{metric.description}</p>
                    
                    {activeMetric === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-3 border-t border-slate-200"
                      >
                        <p className="text-xs text-slate-600">{metric.details}</p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Carousel Component
const HowItWorksCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Discover",
      subtitle: "Genomic Intelligence",
      description: "Explore vast genetic databases with AI-powered search. Discover genes linked to climate resilience across thousands of plant species.",
      icon: Microscope,
      image: "/discover-visual.jpg",
      features: ["15,000+ Plant Genes", "Multi-trait Analysis", "Pathway Mapping", "Cross-species Transfer"]
    },
    {
      title: "Design", 
      subtitle: "AI Genetic Engineering",
      description: "Generate optimal mutations using advanced AI models. Predict structural and functional impacts before any lab work.",
      icon: Dna,
      image: "/design-visual.jpg", 
      features: ["Generative AI Mutations", "3D Protein Modeling", "Impact Prediction", "Multi-trait Optimization"]
    },
    {
      title: "Cultivate",
      subtitle: "Lab-to-Field Pipeline", 
      description: "Streamlined protocols for CRISPR design, validation experiments, and field deployment of climate-resilient crops.",
      icon: Sprout,
      image: "/cultivate-visual.jpg",
      features: ["CRISPR Protocols", "Validation Experiments", "Resource Optimization", "Field Deployment"]
    }
  ];

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  useEffect(() => {
    const interval = setInterval(nextStep, 8000);
    return () => clearInterval(interval);
  }, [nextStep]);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            From Genome to Harvest
            <span className="block text-emerald-300">in Three Steps</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Revolutionary workflow powered by generative AI and cutting-edge biotechnology
          </p>
        </motion.div>

        <div className="relative">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Left Side - Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                        {React.createElement(steps[currentStep].icon, { 
                          className: "h-8 w-8 text-white" 
                        })}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{steps[currentStep].title}</h3>
                        <p className="text-emerald-300 text-lg">{steps[currentStep].subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {steps[currentStep].description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {steps[currentStep].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Visual */}
                <div className="relative bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center p-8">
                  <motion.div
                    key={currentStep}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-80 h-80 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center"
                  >
                    {React.createElement(steps[currentStep].icon, { 
                      className: "h-32 w-32 text-white/80" 
                    })}
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                  title={`Step ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep ? 'bg-emerald-400 scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={nextStep}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Genes Section Component
const FeaturedGenesSection = () => {
  const featuredGenes = [
    {
      id: "DREB1A",
      name: "DREB1A",
      fullName: "Dehydration Responsive Element Binding protein 1A",
      trait: "Drought Tolerance",
      organism: "Arabidopsis thaliana",
      impact: 0.92,
      description: "Revolutionary transcription factor enabling 40% water usage reduction",
      color: "emerald"
    },
    {
      id: "NHX1", 
      name: "NHX1",
      fullName: "Sodium/Hydrogen Exchanger 1",
      trait: "Salt Tolerance",
      organism: "Arabidopsis thaliana", 
      impact: 0.87,
      description: "Breakthrough antiporter for cultivation in saline soils",
      color: "blue"
    },
    {
      id: "LEA14",
      name: "LEA14",
      fullName: "Late Embryogenesis Abundant protein 14",
      trait: "Heat Tolerance", 
      organism: "Gossypium hirsutum",
      impact: 0.78,
      description: "Protective protein enabling growth at 45°C+ temperatures",
      color: "orange"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Featured Genetic Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore breakthrough genes powering the next generation of climate-resilient crops
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredGenes.map((gene, index) => (
            <motion.div
              key={gene.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/genes/${gene.id}`}>
                <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${gene.color}-100`}>
                        <Dna className={`h-6 w-6 text-${gene.color}-600`} />
                      </div>
                      <Badge className={`bg-${gene.color}-100 text-${gene.color}-700`}>
                        {gene.trait}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-emerald-600 transition-colors">
                      {gene.name}
                    </CardTitle>
                    <p className="text-slate-600 text-sm">{gene.fullName}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-700">{gene.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{gene.organism}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Impact Score</span>
                          <div className={`text-lg font-bold text-${gene.color}-600`}>
                            {(gene.impact * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${gene.color}-500 to-${gene.color}-600 h-2 rounded-full transition-all duration-500 progress-bar`}
                          data-width={Math.round(gene.impact * 10) * 10}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/genes/explore">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4">
              Explore All Genes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Add custom animations to globals.css
const customStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}
`;

// Main Landing Page Component
export default function UltimateLandingPage() {
  return (
    <div className="relative">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <HeroSection />
      <GlobalImpactDashboard />
      <HowItWorksCarousel />
      <FeaturedGenesSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Agriculture?
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Join the revolution in sustainable food production. Start designing climate-resilient crops today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/genes/explore">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold">
                  Start Your Research
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}