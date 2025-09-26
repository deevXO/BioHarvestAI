"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, FlaskConical, Leaf, Users, Target, Globe, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,25 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M0,50 Q25,75 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <FlaskConical className="h-4 w-4" />
            Pioneering Agricultural Innovation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-6">
            About BioHarvest AI
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto px-4 sm:px-0">
            Empowering the next generation of sustainable agriculture through cutting-edge AI and genetic intelligence. 
            We&apos;re building the future of climate-resilient crops, one gene at a time.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 sm:mb-20"
        >
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Mission</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  To revolutionize agriculture by providing researchers and breeders with AI-powered tools that predict 
                  the impact of genetic mutations on critical crop traits like drought tolerance, salt resistance, and yield optimization.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Through our intuitive platform, we&apos;re accelerating the development of climate-resilient crops that can 
                  withstand the challenges of tomorrow while ensuring food security for a growing global population.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-6 bg-white/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-700">50K+</div>
                  <div className="text-sm text-slate-600">Genes Analyzed</div>
                </div>
                <div className="text-center p-6 bg-white/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-700">95%</div>
                  <div className="text-sm text-slate-600">Prediction Accuracy</div>
                </div>
                <div className="text-center p-6 bg-white/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-700">1K+</div>
                  <div className="text-sm text-slate-600">Research Partners</div>
                </div>
                <div className="text-center p-6 bg-white/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-700">25+</div>
                  <div className="text-sm text-slate-600">Countries Served</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Dna,
                title: "Scientific Excellence",
                description: "Rigorous research and evidence-based solutions",
                color: "emerald"
              },
              {
                icon: Globe,
                title: "Global Impact",
                description: "Addressing worldwide food security challenges",
                color: "teal"
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Partnering with researchers and institutions globally",
                color: "cyan"
              },
              {
                icon: Leaf,
                title: "Sustainability",
                description: "Environmental stewardship in every solution",
                color: "green"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className={`border-${value.color}-200 bg-gradient-to-br from-${value.color}-50 to-${value.color}-100/50 hover:shadow-lg transition-all duration-300 h-full`}>
                  <CardHeader className="text-center">
                    <div className={`h-16 w-16 rounded-xl bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={`text-${value.color}-800`}>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Focus */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Research Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Target,
                title: "Climate Adaptation",
                description: "Developing crops that thrive in changing environmental conditions",
                features: ["Drought tolerance", "Heat resistance", "Cold adaptation", "Extreme weather resilience"]
              },
              {
                icon: Award,
                title: "Nutritional Enhancement",
                description: "Improving the nutritional profile of staple crops",
                features: ["Vitamin fortification", "Protein optimization", "Mineral enhancement", "Bioavailability"]
              },
              {
                icon: TrendingUp,
                title: "Yield Optimization",
                description: "Maximizing agricultural productivity sustainably",
                features: ["Growth rate enhancement", "Resource efficiency", "Disease resistance", "Harvest optimization"]
              }
            ].map((focus, index) => (
              <motion.div
                key={focus.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="border-slate-200 bg-white/80 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                      <focus.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-800">{focus.title}</CardTitle>
                    <CardDescription className="text-slate-600">
                      {focus.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {focus.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Join Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto mb-8">
              We&apos;re always looking for passionate researchers, developers, and agricultural scientists to join our team. 
              Together, we can build a more sustainable and food-secure future for all.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <Users className="h-5 w-5" />
                <span className="font-medium">Collaborative Environment</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <Globe className="h-5 w-5" />
                <span className="font-medium">Global Impact</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <Award className="h-5 w-5" />
                <span className="font-medium">Cutting-Edge Research</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


