"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Search, Dna, Droplet, Leaf, FlaskConical, Filter, Zap, Download, Share2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Gene = {
  id: string;
  name: string;
  trait: "Drought Tolerance" | "Salt Tolerance" | "Heat Resistance" | "Disease Resistance";
  description: string;
  organism: string;
  chromosome: string;
  confidence: number;
  citations: number;
};

const GENES: Gene[] = [
  {
    id: "DREB1A",
    name: "DREB1A",
    trait: "Drought Tolerance",
    description: "Key transcription factor regulating stress-responsive gene expression under drought conditions.",
    organism: "Arabidopsis thaliana",
    chromosome: "Chr1",
    confidence: 0.95,
    citations: 1247
  },
  {
    id: "NHX1",
    name: "NHX1",
    trait: "Salt Tolerance",
    description: "Vacuolar Na+/H+ antiporter essential for cellular salt tolerance and osmotic adjustment.",
    organism: "Oryza sativa",
    chromosome: "Chr5",
    confidence: 0.92,
    citations: 892
  },
  {
    id: "HSP70",
    name: "HSP70",
    trait: "Heat Resistance",
    description: "Heat shock protein providing thermotolerance through protein folding assistance.",
    organism: "Zea mays",
    chromosome: "Chr3",
    confidence: 0.88,
    citations: 654
  },
  {
    id: "RPM1",
    name: "RPM1",
    trait: "Disease Resistance",
    description: "Resistance protein conferring immunity against bacterial and fungal pathogens.",
    organism: "Solanum lycopersicum",
    chromosome: "Chr6",
    confidence: 0.90,
    citations: 743
  },
  {
    id: "LEA14",
    name: "LEA14",
    trait: "Drought Tolerance",
    description: "Late embryogenesis abundant protein protecting cells during water stress.",
    organism: "Triticum aestivum",
    chromosome: "Chr2",
    confidence: 0.87,
    citations: 521
  },
  {
    id: "SOS1",
    name: "SOS1",
    trait: "Salt Tolerance",
    description: "Salt overly sensitive protein regulating sodium efflux and ionic homeostasis.",
    organism: "Glycine max",
    chromosome: "Chr8",
    confidence: 0.93,
    citations: 976
  }
];

const getTraitColor = (trait: Gene["trait"]) => {
  switch (trait) {
    case "Drought Tolerance":
      return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", icon: Droplet };
    case "Salt Tolerance":
      return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", icon: Zap };
    case "Heat Resistance":
      return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", icon: FlaskConical };
    case "Disease Resistance":
      return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", icon: Leaf };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", icon: Dna };
  }
};

// Export and Share Functions
const exportGeneData = (gene: Gene) => {
  const data = {
    name: gene.name,
    organism: gene.organism,
    trait: gene.trait,
    description: gene.description,
    chromosome: gene.chromosome,
    confidence: gene.confidence,
    citations: gene.citations,
    exportedAt: new Date().toISOString(),
    exportedBy: "BioHarvest AI Platform"
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${gene.name}_gene_data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const shareGene = async (gene: Gene) => {
  const shareData = {
    title: `${gene.name} - BioHarvest AI`,
    text: `Check out this ${gene.trait} gene: ${gene.name} (${gene.organism}) - ${gene.description}`,
    url: `${window.location.origin}/genes/${gene.id}`
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      console.log('Sharing cancelled');
    }
  } else {
    // Fallback: copy to clipboard
    const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    await navigator.clipboard.writeText(text);
    alert('Gene information copied to clipboard!');
  }
};

export default function GeneExplorerPage() {
  const [query, setQuery] = useState("");
  const [traitFilter, setTraitFilter] = useState<"All" | Gene["trait"]>("All");
  const [sortBy, setSortBy] = useState<"name" | "confidence" | "citations">("confidence");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = GENES.filter((g) =>
      traitFilter === "All" ? true : g.trait === traitFilter
    );
    
    if (q) {
      base = base.filter(
        (g) => 
          g.name.toLowerCase().includes(q) || 
          g.trait.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.organism.toLowerCase().includes(q)
      );
    }

    // Sort results
    base.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "confidence":
          return b.confidence - a.confidence;
        case "citations":
          return b.citations - a.citations;
        default:
          return 0;
      }
    });

    return base;
  }, [query, traitFilter, sortBy]);

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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <Dna className="h-4 w-4" />
            Climate-Resilience Gene Database
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
            Explore Crop Genes
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Discover and analyze genes that enhance crop resilience to environmental stresses. 
            Our curated database contains validated genetic targets for sustainable agriculture.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Search className="h-5 w-5" />
                Search & Filter Genes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search" className="text-slate-700">Search Genes</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Search by gene name, trait, or organism..."
                      className="pl-10 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-slate-700">Filter by Trait</Label>
                  <Select value={traitFilter} onValueChange={(v) => setTraitFilter(v as "All" | Gene["trait"])}>
                    <SelectTrigger className="mt-2 border-slate-200 focus:border-emerald-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Traits</SelectItem>
                      <SelectItem value="Drought Tolerance">Drought Tolerance</SelectItem>
                      <SelectItem value="Salt Tolerance">Salt Tolerance</SelectItem>
                      <SelectItem value="Heat Resistance">Heat Resistance</SelectItem>
                      <SelectItem value="Disease Resistance">Disease Resistance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-700">Sort by</Label>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as "name" | "confidence" | "citations")}>
                    <SelectTrigger className="mt-2 border-slate-200 focus:border-emerald-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confidence">Confidence</SelectItem>
                      <SelectItem value="citations">Citations</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Showing {filtered.length} of {GENES.length} genes
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => { setQuery(""); setTraitFilter("All"); setSortBy("confidence"); }}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gene Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((gene, index) => {
            const traitStyle = getTraitColor(gene.trait);
            const IconComponent = traitStyle.icon;
            
            return (
              <motion.div
                key={gene.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-slate-200 bg-white/90 backdrop-blur-sm h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-xl ${traitStyle.bg} flex items-center justify-center`}>
                          <IconComponent className={`h-6 w-6 ${traitStyle.text}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-slate-800 group-hover:text-emerald-700 transition-colors">
                            {gene.name}
                          </CardTitle>
                          <div className="text-sm text-slate-500 font-mono">{gene.organism}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            exportGeneData(gene);
                          }}
                          className="h-8 w-8 p-0 hover:bg-emerald-100"
                        >
                          <Download className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            shareGene(gene);
                          }}
                          className="h-8 w-8 p-0 hover:bg-emerald-100"
                        >
                          <Share2 className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Link href={`/genes/${gene.id}`}>
                          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <Link href={`/genes/${gene.id}`}>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {gene.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={`${traitStyle.bg} ${traitStyle.text} ${traitStyle.border} font-medium`} variant="outline">
                          {gene.trait}
                        </Badge>
                        <div className="text-xs text-slate-500">
                          {gene.chromosome}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-slate-600">
                            <span className="font-medium text-emerald-700">{(gene.confidence * 100).toFixed(0)}%</span>
                            <span className="text-slate-500 ml-1">confidence</span>
                          </div>
                          <div className="text-slate-600">
                            <span className="font-medium text-slate-700">{gene.citations}</span>
                            <span className="text-slate-500 ml-1">citations</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No genes found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search terms or filters</p>
            <Button onClick={() => { setQuery(""); setTraitFilter("All"); }}>
              Clear Search
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}


