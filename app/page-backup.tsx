"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

// Enhanced Hero Section Component
const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  const stats = [
    { value: "2.5B", label: "People Fed Daily", icon: Users, progress: 89, color: "from-blue-500 to-cyan-500" },
    { value: "45%", label: "Yield Increase", icon: TrendingUp, progress: 76, color: "from-emerald-500 to-teal-500" },
    { value: "12M", label: "Tons CO₂ Reduced", icon: Globe, progress: 94, color: "from-green-500 to-emerald-500" },
    { value: "89%", label: "Water Saved", icon: Droplets, progress: 82, color: "from-blue-400 to-blue-600" }
  ];

  const achievements = [
    { icon: Award, text: "96% Prediction Accuracy", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { icon: Shield, text: "Lab-Validated Results", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Target, text: "Real-World Ready", color: "text-teal-400", bg: "bg-teal-500/10" }
  ];

  const features = [
    { title: "AI-Powered", desc: "Advanced machine learning algorithms", icon: Brain },
    { title: "Lab Validated", desc: "15,000+ gene analyses completed", icon: Microscope },
    { title: "Climate Ready", desc: "Drought & salt tolerance optimization", icon: Globe },
    { title: "Precision Design", desc: "Targeted genetic modifications", icon: Target }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background with Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/90 to-teal-900/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(52,211,153,0.1),transparent_50%)]"></div>
      </div>

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        {/* Floating DNA Helixes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <Dna className="h-6 w-6 text-emerald-400/20" />
          </motion.div>
        ))}

        {/* Glowing Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      </motion.div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
        style={{ opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Enhanced Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="space-y-8 lg:space-y-10 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-5 w-5 text-emerald-400" />
              </motion.div>
              <span className="text-emerald-300 font-medium">World&apos;s First AI-Native Genetic Platform</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="h-4 w-4 text-yellow-400" />
              </motion.div>
            </motion.div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <motion.h1 
                className="text-6xl lg:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              >
                <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  BioHarvest
                </span>
                <br />
                <motion.span 
                  className="text-4xl lg:text-5xl font-light text-slate-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Climate-Resilient Agriculture
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Design <span className="text-emerald-300 font-semibold">drought & salt-tolerant crops</span> with 
                precision AI-guided genetic modifications. Validated by 15,000+ gene analyses and ready for 
                <span className="text-teal-300 font-semibold"> immediate deployment</span>.
              </motion.p>
            </div>

            {/* Feature Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
                    <feature.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{feature.title}</div>
                    <div className="text-slate-400 text-xs">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Achievement Badges */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${achievement.bg} backdrop-blur-sm border border-white/10`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ delay: 1.3 + index * 0.1, type: "spring", stiffness: 400, damping: 17 }}
                >
                  <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                  <span className="text-white text-sm font-medium">{achievement.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <Link href="/lab">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Launch AI Lab
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/genes/explore">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 px-8 py-4 text-lg backdrop-blur-sm hover:border-emerald-400/50 transition-all group"
                  >
                    <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Explore Database
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Dynamic Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl scale-110"></div>
              
              <Card className="relative bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center space-y-8">
                    {/* Animated Icon */}
                    <motion.div 
                      className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${stats[currentStat].color} rounded-3xl shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      key={`icon-${currentStat}`}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {React.createElement(stats[currentStat].icon, { className: "h-12 w-12 text-white" })}
                      </motion.div>
                    </motion.div>
                    
                    {/* Stats Content */}
                    <div className="space-y-6">
                      <motion.div 
                        key={`stat-${currentStat}`}
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-2"
                      >
                        <div className="text-7xl font-bold text-white tracking-tight">
                          {stats[currentStat].value}
                        </div>
                        <p className="text-slate-300 text-xl font-medium">{stats[currentStat].label}</p>
                      </motion.div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">Global Impact</span>
                          <span className="text-emerald-300 font-semibold">{stats[currentStat].progress}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={stats[currentStat].progress} 
                            className="h-3 bg-white/20 rounded-full overflow-hidden"
                          />
                          <motion.div
                            className={`absolute inset-0 h-3 bg-gradient-to-r ${stats[currentStat].color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${stats[currentStat].progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Stat Indicators */}
                    <div className="flex justify-center space-x-3">
                      {stats.map((_, index) => (
                        <motion.button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentStat 
                              ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 scale-125' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentStat(index)}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Floating Indicators */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  boxShadow: ["0 4px 20px rgba(251, 191, 36, 0.3)", "0 4px 30px rgba(251, 191, 36, 0.5)", "0 4px 20px rgba(251, 191, 36, 0.3)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Activity className="h-4 w-4 text-yellow-800" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Global Impact Dashboard Component
const GlobalImpactDashboard = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  const metrics = [
    {
      title: "Food Security Impact",
      value: "2.5B",
      subtitle: "People gaining food security access",
      description: "AI-designed drought-resistant crops reaching global markets",
      icon: Users,
      color: "emerald",
      bgGradient: "from-emerald-500 to-teal-500",
      trend: "+127%",
      trendColor: "text-emerald-600",
      details: "Projected impact by 2030 through enhanced crop resilience",
      stats: [
        { label: "Countries Affected", value: "47+" },
        { label: "Crop Varieties", value: "156" },
        { label: "Farms Transformed", value: "2.3M" }
      ]
    },
    {
      title: "Climate Action",
      value: "45M",
      subtitle: "Tons CO₂ sequestered annually",
      description: "Enhanced carbon capture through optimized plant genetics",
      icon: Globe,
      color: "blue",
      bgGradient: "from-blue-500 to-cyan-500",
      trend: "+89%",
      trendColor: "text-blue-600",
      details: "Through improved root systems and biomass production",
      stats: [
        { label: "Carbon Offset", value: "45M tons" },
        { label: "Tree Equivalent", value: "2.1B trees" },
        { label: "Soil Improvement", value: "890K hectares" }
      ]
    },
    {
      title: "Water Conservation",
      value: "12B",
      subtitle: "Liters saved per year",
      description: "Smart irrigation through drought-tolerant varieties",
      icon: Droplets,
      color: "cyan",
      bgGradient: "from-cyan-500 to-blue-500",
      trend: "+234%",
      trendColor: "text-cyan-600",
      details: "Reduced agricultural water usage globally",
      stats: [
        { label: "Water Saved", value: "12B liters" },
        { label: "Irrigation Efficiency", value: "+67%" },
        { label: "Drought Tolerance", value: "89%" }
      ]
    },
    {
      title: "Yield Enhancement",
      value: "890M",
      subtitle: "Additional tons produced",
      description: "Increased crop productivity through genetic optimization",
      icon: TrendingUp,
      color: "green",
      bgGradient: "from-green-500 to-emerald-500",
      trend: "+67%",
      trendColor: "text-green-600",
      details: "Enhanced photosynthetic efficiency and stress tolerance",
      stats: [
        { label: "Yield Increase", value: "+67%" },
        { label: "Protein Content", value: "+23%" },
        { label: "Nutritional Value", value: "+45%" }
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
          }}
          onViewportEnter={() => setIsInView(true)}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: isInView ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 px-6 py-2 bg-emerald-100 text-emerald-700 border-emerald-200">
              <Globe className="mr-2 h-4 w-4" />
              Global Impact Dashboard
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-slate-800 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforming Agriculture
            <motion.span 
              className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              at Planetary Scale
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Real-time impact metrics from our AI-driven genetic innovations, 
            validated by field trials and deployed across continents.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setActiveMetric(index)}
              className="group cursor-pointer"
            >
              <Card className={`transition-all duration-500 border-0 shadow-lg hover:shadow-2xl relative overflow-hidden ${
                activeMetric === index 
                  ? 'ring-2 ring-emerald-200 shadow-2xl bg-white' 
                  : 'hover:shadow-xl bg-white/80 backdrop-blur-sm'
              }`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${metric.bgGradient} opacity-0 group-hover:opacity-20`}
                  initial={{ scale: 0, borderRadius: "100%" }}
                  whileHover={{ 
                    scale: 1, 
                    borderRadius: "0.75rem",
                    transition: { duration: 0.6 }
                  }}
                />

                <CardContent className="p-8 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`p-4 rounded-2xl bg-gradient-to-r ${metric.bgGradient} shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {React.createElement(metric.icon, { 
                        className: "h-7 w-7 text-white"
                      })}
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: activeMetric === index ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className={`${metric.trendColor} bg-white/80 backdrop-blur-sm border font-semibold px-3 py-1`}
                      >
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {metric.trend}
                      </Badge>
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <motion.h3 
                      className="font-bold text-slate-800 text-lg"
                      layoutId={`title-${index}`}
                    >
                      {metric.title}
                    </motion.h3>
                    
                    <motion.div 
                      className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                      initial={{ scale: 0.8 }}
                      animate={{ 
                        scale: activeMetric === index ? 1.1 : 1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {metric.value}
                    </motion.div>
                    
                    <p className="text-sm text-slate-600 font-medium">{metric.subtitle}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{metric.description}</p>
                    
                    {/* Expandable Details */}
                    <AnimatePresence>
                      {activeMetric === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="pt-4 border-t border-slate-200/60"
                        >
                          <p className="text-xs text-slate-600 mb-3 italic">{metric.details}</p>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {metric.stats.map((stat, statIndex) => (
                              <motion.div
                                key={statIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: statIndex * 0.1 }}
                                className="flex justify-between items-center text-xs"
                              >
                                <span className="text-slate-500">{stat.label}</span>
                                <span className={`font-semibold ${metric.trendColor}`}>{stat.value}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100"
                    layoutId={`indicator-${index}`}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">
              Updates in real-time • Validated by independent research • Deployed globally
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// How It Works Carousel Component
const HowItWorksCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const steps = [
    {
      title: "Discover",
      subtitle: "Genomic Intelligence",
      description: "Explore vast genetic databases with AI-powered search. Discover genes linked to climate resilience across thousands of plant species with unparalleled precision.",
      icon: Microscope,
      gradient: "from-blue-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-blue-500/10 to-cyan-500/20",
      features: ["15,000+ Plant Genes", "Multi-trait Analysis", "Pathway Mapping", "Cross-species Transfer"],
      stats: [
        { label: "Species Analyzed", value: "2,847" },
        { label: "Genetic Pathways", value: "12,456" },
        { label: "Success Rate", value: "96.8%" }
      ]
    },
    {
      title: "Design", 
      subtitle: "AI Genetic Engineering",
      description: "Generate optimal mutations using advanced AI models. Predict structural and functional impacts with unprecedented accuracy before any laboratory work begins.",
      icon: Dna,
      gradient: "from-emerald-500 to-teal-500",
      bgPattern: "bg-gradient-to-br from-emerald-500/10 to-teal-500/20",
      features: ["Generative AI Mutations", "3D Protein Modeling", "Impact Prediction", "Multi-trait Optimization"],
      stats: [
        { label: "Mutations Generated", value: "45,892" },
        { label: "3D Models", value: "8,934" },
        { label: "Accuracy Rate", value: "98.2%" }
      ]
    },
    {
      title: "Cultivate",
      subtitle: "Lab-to-Field Pipeline", 
      description: "Streamlined protocols for CRISPR design, validation experiments, and field deployment of climate-resilient crops with full traceability and optimization.",
      icon: Sprout,
      gradient: "from-green-500 to-emerald-500",
      bgPattern: "bg-gradient-to-br from-green-500/10 to-emerald-500/20",
      features: ["CRISPR Protocols", "Validation Experiments", "Resource Optimization", "Field Deployment"],
      stats: [
        { label: "Field Trials", value: "1,234" },
        { label: "Success Rate", value: "89.3%" },
        { label: "Time Reduction", value: "67%" }
      ]
    }
  ];

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
    setProgress(0);
  }, [steps.length]);

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    setProgress(0);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStep();
            return 0;
          }
          return prev + 1;
        });
      }, 80); // 8 second total duration
    }
    return () => clearInterval(interval);
  }, [nextStep, isAutoPlay]);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_70%)]"></div>
        
        {/* Animated Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            Experience the future of agricultural innovation.
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className={`h-full bg-gradient-to-r ${steps[currentStep].gradient}`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
              {/* Left Side - Content */}
              <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -50, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 50, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    {/* Header */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className={`p-4 bg-gradient-to-r ${steps[currentStep].gradient} rounded-2xl shadow-lg`}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {React.createElement(steps[currentStep].icon, { 
                            className: "h-10 w-10 text-white" 
                          })}
                        </motion.div>
                        
                        <div>
                          <h3 className="text-4xl font-bold text-white leading-tight">
                            {steps[currentStep].title}
                          </h3>
                          <p className="text-emerald-300 text-xl font-medium">
                            {steps[currentStep].subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-lg leading-relaxed">
                        {steps[currentStep].description}
                      </p>
                    </div>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {steps[currentStep].features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <CheckCircle className={`h-5 w-5 text-emerald-400 flex-shrink-0`} />
                          <span className="text-sm text-slate-300 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      {steps[currentStep].stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                          <div className={`text-2xl font-bold bg-gradient-to-r ${steps[currentStep].gradient} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Enhanced Visual */}
              <div className={`relative ${steps[currentStep].bgPattern} flex items-center justify-center p-8`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.1, opacity: 0, rotate: 10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Main Icon Circle */}
                    <div className={`w-80 h-80 bg-gradient-to-r ${steps[currentStep].gradient} rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                      {/* Animated Ring */}
                      <motion.div
                        className="absolute inset-4 border-4 border-white/30 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {React.createElement(steps[currentStep].icon, { 
                          className: "h-32 w-32 text-white relative z-10" 
                        })}
                      </motion.div>
                      
                      {/* Floating Particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/60 rounded-full"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${20 + Math.random() * 60}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Orbiting Elements */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-12 h-12 bg-gradient-to-r ${steps[currentStep].gradient} rounded-full shadow-lg flex items-center justify-center`}
                        style={{
                          top: `${30 + i * 20}%`,
                          right: `${10 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        <Star className="h-6 w-6 text-white" />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Navigation */}
          <motion.div 
            className="flex items-center justify-between mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 px-6 py-3 backdrop-blur-sm group"
              >
                <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Previous
              </Button>
            </motion.div>

            {/* Step Indicators */}
            <div className="flex space-x-4">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all ${
                    index === currentStep 
                      ? 'text-white bg-emerald-500/20 border border-emerald-400/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-sm">{step.title}</span>
                  {index === currentStep && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-10 rounded-xl`}
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                onClick={nextStep}
                className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 px-6 py-3 backdrop-blur-sm group"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Auto-play Control */}
          <motion.div 
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Featured Genes Section Component
const FeaturedGenesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featuredGenes = [
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
        { label: "Yield Increase", value: "25%" },
        { label: "Success Rate", value: "92%" }
      ],
      icon: Droplets,
      details: "DREB1A regulates downstream stress-responsive genes and significantly improves plant survival under drought conditions by maintaining cellular water balance and metabolic stability."
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
        { label: "Crop Expansion", value: "35%" },
        { label: "Success Rate", value: "87%" }
      ],
      icon: Waves,
      details: "NHX1 facilitates sodium compartmentalization in vacuoles, allowing plants to maintain ionic homeostasis in high-salinity environments while preserving growth and productivity."
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
        { label: "Protein Stability", value: "98%" },
        { label: "Success Rate", value: "78%" }
      ],
      icon: Thermometer,
      details: "LEA14 prevents protein aggregation and cellular damage during heat stress through intrinsically disordered regions that stabilize cellular components under extreme temperatures."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore breakthrough genes powering the next generation of climate-resilient crops.
            Each solution represents years of advanced research and proven field results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredGenes.map((gene, index) => (
            <motion.div
              key={gene.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              onMouseEnter={() => setHoveredCard(gene.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <Link href={`/genes/${gene.id}`}>
                <motion.div
                  className="relative"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Card className={`cursor-pointer overflow-hidden bg-gradient-to-br ${gene.bgGradient} border-2 border-transparent hover:border-${gene.color}-200 transition-all duration-500 shadow-xl hover:shadow-2xl backdrop-blur-sm group-hover:shadow-${gene.color}-200/20`}>
                    {/* Animated Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${gene.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Floating Particles */}
                    {hoveredCard === gene.id && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${gene.color}-400/60 rounded-full`}
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${20 + Math.random() * 60}%`,
                            }}
                            animate={{
                              y: [0, -15, 0],
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </>
                    )}

                    <CardHeader className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-r ${gene.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {React.createElement(gene.icon, { 
                            className: "h-8 w-8 text-white" 
                          })}
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge className={`bg-${gene.color}-100 text-${gene.color}-700 border-${gene.color}-200 px-3 py-1 font-semibold shadow-sm`}>
                            {gene.trait}
                          </Badge>
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <CardTitle className={`text-2xl font-bold group-hover:text-${gene.color}-700 transition-colors duration-300`}>
                          {gene.name}
                        </CardTitle>
                        <p className="text-slate-600 text-sm font-medium leading-tight">
                          {gene.fullName}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 relative z-10">
                      <p className="text-slate-700 leading-relaxed">
                        {gene.description}
                      </p>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {gene.stats.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            className="text-center p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/80"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.8)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`text-lg font-bold text-${gene.color}-600`}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                              {stat.label}
                            </div>
                          </motion.div>
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
                            <motion.span
                              key={idx}
                              className="px-2 sm:px-3 py-1 bg-white/80 text-slate-600 text-xs font-medium rounded-full border border-slate-200"
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
                              transition={{ duration: 0.2 }}
                            >
                              {app}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Organism Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/60">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                          <span className="text-sm text-slate-500 italic">{gene.organism}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-600">Impact Score</span>
                          <motion.div 
                            className={`text-xl font-bold bg-gradient-to-r ${gene.gradient} bg-clip-text text-transparent`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {(gene.impact * 100).toFixed(0)}%
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className={`bg-gradient-to-r ${gene.gradient} h-2 rounded-full shadow-sm`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${gene.impact * 100}%` }}
                            transition={{ duration: 1.5, delay: index * 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {hoveredCard === gene.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 bg-white/70 rounded-lg border border-white/80 backdrop-blur-sm"
                          >
                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Mechanism of Action:</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {gene.details}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>

                    {/* Hover Effect Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ mixBlendMode: "overlay" }}
                    />
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20 space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">
              Discover More Genetic Solutions
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our comprehensive database of over 15,000+ genes with detailed analysis,
              AI-powered insights, and experimental validation data.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/genes/explore">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all group">
                  Explore Gene Database
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            
            <Link href="/lab">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-full transition-all group">
                  <Beaker className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Try AI Lab
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-8 pt-8 border-t border-slate-200"
          >
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">Peer Reviewed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">Field Tested</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">AI Validated</span>
            </div>
          </motion.div>
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
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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