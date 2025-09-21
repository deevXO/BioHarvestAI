"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Search, Dna, Droplet, Leaf, FlaskConical, Filter, Zap, Download, Share2, Eye, BookOpen, BarChart3 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEMO_GENES } from "@/lib/demo-data";
import { simulateGeneSearch } from "@/lib/ai-service";

type Gene = typeof DEMO_GENES[0];

const getTraitColor = (trait: string) => {
  switch (trait) {
    case "Drought Tolerance":
      return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", icon: Droplet };
    case "Salt Tolerance":
      return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", icon: Zap };
    case "Heat Tolerance":
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
    id: gene.id,
    name: gene.name,
    scientificName: gene.scientificName,
    organism: gene.organism,
    traits: gene.traits,
    description: gene.description,
    confidence: gene.confidence,
    sequence: gene.sequence,
    applications: gene.applications,
    exportedAt: new Date().toISOString(),
    exportedBy: "BioHarvest AI Platform"
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${gene.id}_gene_data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const shareGene = async (gene: Gene) => {
  const shareData = {
    title: `${gene.name} - BioHarvest AI`,
    text: `Check out this ${gene.traits[0]} gene: ${gene.name} (${gene.organism}) - ${gene.description}`,
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
  const [traitFilter, setTraitFilter] = useState<"All" | string>("All");
  const [organismFilter, setOrganismFilter] = useState<"All" | string>("All");
  const [searchResults, setSearchResults] = useState<Gene[]>(DEMO_GENES);
  const [isSearching, setIsSearching] = useState(false);

  const filteredGenes = useMemo(() => {
    return searchResults.filter((gene) => {
      const matchesQuery = query === "" || 
        gene.name.toLowerCase().includes(query.toLowerCase()) ||
        gene.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        gene.traits.some(trait => trait.toLowerCase().includes(query.toLowerCase())) ||
        gene.organism.toLowerCase().includes(query.toLowerCase()) ||
        gene.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesTrait = traitFilter === "All" || gene.traits.includes(traitFilter);
      const matchesOrganism = organismFilter === "All" || gene.organism === organismFilter;
      
      return matchesQuery && matchesTrait && matchesOrganism;
    });
  }, [searchResults, query, traitFilter, organismFilter]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults(DEMO_GENES);
      return;
    }

    setIsSearching(true);
    try {
      // Simulate AI-powered gene search
      const results = await simulateGeneSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults(DEMO_GENES.filter(gene => 
        gene.name.toLowerCase().includes(query.toLowerCase()) ||
        gene.description.toLowerCase().includes(query.toLowerCase())
      ));
    } finally {
      setIsSearching(false);
    }
  };

  // Get unique organisms and traits for filters
  const organisms = ["All", ...Array.from(new Set(DEMO_GENES.map(gene => gene.organism)))];
  const allTraits = DEMO_GENES.flatMap(gene => gene.traits);
  const traits = ["All", ...Array.from(new Set(allTraits))];

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
            AI-Powered Gene Discovery
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
            Gene Explorer
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Discover and analyze climate-resilient genes with our comprehensive database of validated genetic targets for sustainable agriculture.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Total Genes", value: DEMO_GENES.length, icon: Dna, color: "emerald" },
            { label: "Organisms", value: organisms.length - 1, icon: Leaf, color: "green" },
            { label: "Avg Confidence", value: `${Math.round(DEMO_GENES.reduce((acc, gene) => acc + gene.confidence, 0) / DEMO_GENES.length * 100)}%`, icon: BarChart3, color: "blue" },
            { label: "Applications", value: Math.round(DEMO_GENES.reduce((acc, gene) => acc + gene.applications.length, 0) / DEMO_GENES.length), icon: BookOpen, color: "teal" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border-slate-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-emerald-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Search className="h-5 w-5" />
                AI-Powered Gene Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
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
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-slate-700">Filter by Trait</Label>
                  <Select value={traitFilter} onValueChange={setTraitFilter}>
                    <SelectTrigger className="mt-2 border-slate-200 focus:border-emerald-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {traits.map(trait => (
                        <SelectItem key={trait} value={trait}>{trait}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-700">Filter by Organism</Label>
                  <Select value={organismFilter} onValueChange={setOrganismFilter}>
                    <SelectTrigger className="mt-2 border-slate-200 focus:border-emerald-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {organisms.map(organism => (
                        <SelectItem key={organism} value={organism}>{organism}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    {isSearching ? "Searching..." : "AI Search"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {filteredGenes.length} Gene{filteredGenes.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">
                {query && `"${query}" • `}
                {traitFilter !== "All" && `${traitFilter} • `}
                {organismFilter !== "All" && `${organismFilter}`}
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGenes.map((gene, index) => {
              const traitStyle = getTraitColor(gene.traits[0]);
              return (
                <motion.div
                  key={gene.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full border-slate-200 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 rounded-xl ${traitStyle.bg} flex items-center justify-center`}>
                            <traitStyle.icon className={`h-6 w-6 ${traitStyle.text}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
                              {gene.name}
                            </CardTitle>
                            <p className="text-sm text-slate-600">{gene.organism}</p>
                          </div>
                        </div>
                        <Badge className={`${traitStyle.bg} ${traitStyle.text} ${traitStyle.border}`} variant="outline">
                          {gene.traits[0]}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-slate-700 mb-4 line-clamp-3">
                        {gene.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Confidence:</span>
                          <span className="font-medium text-emerald-600">
                            {Math.round(gene.confidence * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Applications:</span>
                          <span className="font-medium">{gene.applications.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Organism:</span>
                          <span className="font-medium">{gene.organism}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportGeneData(gene)}
                            className="border-slate-300 hover:bg-slate-50"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => shareGene(gene)}
                            className="border-slate-300 hover:bg-slate-50"
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Link href={`/genes/${gene.id}`}>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredGenes.length === 0 && (
            <Card className="border-slate-200 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No genes found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search query or filters to find relevant genes.
                </p>
                <Button 
                  onClick={() => {
                    setQuery("");
                    setTraitFilter("All");
                    setOrganismFilter("All");
                    setSearchResults(DEMO_GENES);
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}