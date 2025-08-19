"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Database, FlaskConical, Download, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,25 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M0,50 Q25,75 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            API Documentation & Guides
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-6">
            BioHarvest AI Documentation
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
            Comprehensive guides, API references, and tutorials to help you integrate genetic intelligence into your research workflow.
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Quick Start Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Create Account",
                description: "Sign up for your BioHarvest AI research account",
                icon: FlaskConical,
                color: "emerald"
              },
              {
                step: "2",
                title: "Select Gene",
                description: "Choose from our curated database of climate-resilience genes",
                icon: Database,
                color: "teal"
              },
              {
                step: "3",
                title: "Run Analysis",
                description: "Get AI-powered predictions for genetic mutations",
                icon: Code,
                color: "cyan"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className={`border-${item.color}-200 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center text-white font-bold text-lg`}>
                        {item.step}
                      </div>
                      <div>
                        <CardTitle className={`text-${item.color}-800`}>{item.title}</CardTitle>
                        <CardDescription className="text-slate-600">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Reference */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8">API Reference</h2>
          <div className="space-y-8">
            {/* Prediction API */}
            <Card className="border-slate-200 bg-white/80">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800 flex items-center gap-2">
                      <Code className="h-5 w-5 text-emerald-600" />
                      Genetic Prediction API
                    </CardTitle>
                    <CardDescription>
                      Predict the impact of genetic mutations on crop traits
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">POST</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">v1</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Endpoint</h4>
                  <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm relative">
                    <code>POST /api/v1/predict</code>
                    <button
                      onClick={() => copyToClipboard("POST /api/v1/predict", "endpoint")}
                      className="absolute right-2 top-2 p-1 rounded hover:bg-slate-200"
                    >
                      {copiedCode === "endpoint" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Request Body</h4>
                  <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm relative">
                    <pre>{`{
  "geneId": "DREB1A",
  "position": 142,
  "original": "A",
  "mutated": "V",
  "trait": "drought_tolerance"
}`}</pre>
                    <button
                      onClick={() => copyToClipboard(`{
  "geneId": "DREB1A",
  "position": 142,
  "original": "A",
  "mutated": "V",
  "trait": "drought_tolerance"
}`, "request")}
                      className="absolute right-2 top-2 p-1 rounded hover:bg-slate-200"
                    >
                      {copiedCode === "request" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Response</h4>
                  <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm relative">
                    <pre>{`{
  "prediction": {
    "impact": "beneficial",
    "confidence": 0.87,
    "score": 0.73,
    "trait_improvement": 0.15
  },
  "analysis": {
    "structural_changes": "Enhanced protein stability",
    "functional_impact": "Improved transcriptional activity"
  }
}`}</pre>
                    <button
                      onClick={() => copyToClipboard(`{
  "prediction": {
    "impact": "beneficial",
    "confidence": 0.87,
    "score": 0.73,
    "trait_improvement": 0.15
  },
  "analysis": {
    "structural_changes": "Enhanced protein stability",
    "functional_impact": "Improved transcriptional activity"
  }
}`, "response")}
                      className="absolute right-2 top-2 p-1 rounded hover:bg-slate-200"
                    >
                      {copiedCode === "response" ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gene Database API */}
            <Card className="border-slate-200 bg-white/80">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800 flex items-center gap-2">
                      <Database className="h-5 w-5 text-teal-600" />
                      Gene Database API
                    </CardTitle>
                    <CardDescription>
                      Access our curated database of climate-resilience genes
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">GET</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">v1</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Endpoints</h4>
                  <div className="space-y-2">
                    <div className="bg-slate-100 rounded-lg p-3 font-mono text-sm">
                      <code>GET /api/v1/genes</code> - List all available genes
                    </div>
                    <div className="bg-slate-100 rounded-lg p-3 font-mono text-sm">
                      <code>GET /api/v1/genes/{"{geneId}"}</code> - Get specific gene details
                    </div>
                    <div className="bg-slate-100 rounded-lg p-3 font-mono text-sm">
                      <code>GET /api/v1/genes/traits/{"{trait}"}</code> - Filter genes by trait
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* SDK Downloads */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8">SDKs & Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Python SDK",
                description: "Official Python library for BioHarvest AI",
                version: "v1.2.0",
                downloads: "2.5K",
                language: "Python"
              },
              {
                title: "R Package",
                description: "Statistical computing integration for R",
                version: "v1.1.0",
                downloads: "1.8K",
                language: "R"
              },
              {
                title: "CLI Tool",
                description: "Command-line interface for batch processing",
                version: "v1.0.5",
                downloads: "900",
                language: "CLI"
              }
            ].map((sdk, index) => (
              <motion.div
                key={sdk.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="border-slate-200 bg-white/80 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-800">{sdk.title}</CardTitle>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        {sdk.version}
                      </span>
                    </div>
                    <CardDescription>{sdk.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-600">{sdk.downloads} downloads</span>
                      <span className="text-sm text-slate-600">{sdk.language}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Install
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Need Help?</h2>
            <p className="text-lg text-slate-700 mb-6 max-w-2xl mx-auto">
              Our research team is here to help you integrate BioHarvest AI into your workflow. 
              Get support, ask questions, or collaborate on research projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Contact Support
              </Button>
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                Join Community
              </Button>
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                View Examples
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


