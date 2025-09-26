"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Dna, 
  ExternalLink, 
  ArrowRight,
  Microscope,
  BarChart3,
  Database,
  Star,
  Clock
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GENE_DATABASE } from "@/lib/demo-data";
import { simulateGeneSearch } from "@/lib/ai-service";

// Type definitions
interface Gene {
  id: string;
  name: string;
  fullName?: string;
  scientificName?: string;
  organism: string;
  description: string;
  traits: string[];
  confidence: number;
  proteinFamily?: string;
  integratedScore?: number;
  citations?: number;
  keyFeatures?: string[];
  trait?: string;
  externalLinks?: {
    uniprot?: string;
    ncbi?: string;
    pfam?: string;
  };
  tags?: string[];
  recentUpdates?: string;
}

// Advanced gene database with comprehensive information - replaced with GENE_DATABASE from demo-data

// Gene Card Component  
const GeneCard = ({ gene }: { gene: Gene }) => {
  const traitColors: Record<string, string> = {
    "Drought Tolerance": "emerald",
    "Salt Tolerance": "blue", 
    "Heat Tolerance": "orange",
    "Cold Tolerance": "cyan",
    "Disease Resistance": "purple",
    "Photosynthetic Efficiency": "green"
  };

  const color = traitColors[gene.trait || ""] || "slate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/genes/${gene.id}`}>
        <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group h-full">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-xl bg-${color}-100 group-hover:scale-110 transition-transform`}>
                <Dna className={`h-6 w-6 text-${color}-600`} />
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`bg-${color}-100 text-${color}-700 border-${color}-200`}>
                  {gene.trait}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{gene.integratedScore}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                {gene.name}
              </CardTitle>
              <p className="text-sm text-slate-600 line-clamp-1">{gene.fullName}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="font-medium">{gene.organism}</span>
                <span>{gene.proteinFamily}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
              {gene.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {gene.keyFeatures?.map((feature: string, idx: number) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    {gene.citations} citations
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {(gene.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated {gene.recentUpdates ? new Date(gene.recentUpdates).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-auto">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  UniProt
                </Button>
                <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-auto">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  NCBI
                </Button>
              </div>
              <Button size="sm" className="text-xs px-3 py-1 h-auto bg-emerald-600 hover:bg-emerald-700">
                Analyze
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

// Advanced Search Bar Component
type Filters = {
  trait: string;
  organism: string;
  confidence: string;
  proteinFamily: string;
  peerReviewed: string;
};

const AdvancedSearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  filters, 
  setFilters 
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Main Search */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-slate-800">Search Genes</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by gene name, ID, or function..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-white border-2 border-slate-200 focus:border-emerald-500"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Target Trait</Label>
              <Select value={filters.trait} onValueChange={(value) => setFilters({...filters, trait: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All traits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Traits</SelectItem>
                  <SelectItem value="Drought Tolerance">Drought Tolerance</SelectItem>
                  <SelectItem value="Salt Tolerance">Salt Tolerance</SelectItem>
                  <SelectItem value="Heat Tolerance">Heat Tolerance</SelectItem>
                  <SelectItem value="Cold Tolerance">Cold Tolerance</SelectItem>
                  <SelectItem value="Disease Resistance">Disease Resistance</SelectItem>
                  <SelectItem value="Photosynthetic Efficiency">Photosynthetic Efficiency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Organism</Label>
              <Select value={filters.organism} onValueChange={(value) => setFilters({...filters, organism: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All organisms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organisms</SelectItem>
                  <SelectItem value="Arabidopsis thaliana">Arabidopsis thaliana</SelectItem>
                  <SelectItem value="Zea mays">Zea mays</SelectItem>
                  <SelectItem value="Gossypium hirsutum">Gossypium hirsutum</SelectItem>
                  <SelectItem value="Nicotiana tabacum">Nicotiana tabacum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Protein Family</Label>
              <Select value={filters.proteinFamily} onValueChange={(value) => setFilters({...filters, proteinFamily: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All families" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Families</SelectItem>
                  <SelectItem value="AP2/ERF">AP2/ERF</SelectItem>
                  <SelectItem value="NHE">NHE</SelectItem>
                  <SelectItem value="LEA">LEA</SelectItem>
                  <SelectItem value="COR">COR</SelectItem>
                  <SelectItem value="PR1">PR1</SelectItem>
                  <SelectItem value="Photosystem II">Photosystem II</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Data Quality</Label>
              <Select value={filters.peerReviewed} onValueChange={(value) => setFilters({...filters, peerReviewed: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="peer-reviewed">Peer-Reviewed Only</SelectItem>
                  <SelectItem value="high-confidence">High Confidence (&gt;80%)</SelectItem>
                  <SelectItem value="well-characterized">Well Characterized (&gt;500 citations)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setFilters({ trait: "all", organism: "all", confidence: "all", proteinFamily: "all", peerReviewed: "all" });
              }}
            >
              Clear Filters
            </Button>
            <div className="text-sm text-slate-600">
              Showing results from our curated database of <strong>15,000+</strong> plant genes
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Genomic Research Hub Component
export default function GenomicResearchHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(GENE_DATABASE);
  const [filters, setFilters] = useState({
    trait: "all",
    organism: "all",
    confidence: "all",
    proteinFamily: "all",
    peerReviewed: "all"
  });
  const [sortBy, setSortBy] = useState("score");

  // Simulate realistic search with loading
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim() && Object.values(filters).every(f => f === "all")) {
        setSearchResults(GENE_DATABASE);
        return;
      }
      
      try {
        const results = await simulateGeneSearch(searchQuery, filters);
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults(GENE_DATABASE);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filters]);

  // Convert demo genes to the expected format for display
  const displayGenes = searchResults.map(gene => ({
    ...gene,
    fullName: gene.scientificName,
    trait: gene.traits[0] || "Unknown trait",
    pathway: gene.traits[0] || "Unknown pathway",
    proteinFamily: "Demo Family",
    integratedScore: Math.round(gene.confidence * 100),
    citations: Math.floor(gene.confidence * 1500),
    keyFeatures: gene.traits,
    externalLinks: {
      uniprot: `Q9FHQ${Math.floor(Math.random() * 9)}`,
      ncbi: `${Math.floor(Math.random() * 900000) + 100000}`,
      pfam: `PF${Math.floor(Math.random() * 90000) + 10000}`
    },
    tags: gene.traits.map(t => t.toLowerCase()),
    recentUpdates: "2024-09-20"
  }));

  // Sort display genes
  const sortedGenes = [...displayGenes].sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.integratedScore - a.integratedScore;
      case "citations":
        return b.citations - a.citations;
      case "confidence":
        return b.confidence - a.confidence;
      case "name":
        return a.name.localeCompare(b.name);
      case "updated":
        return new Date(b.recentUpdates).getTime() - new Date(a.recentUpdates).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Microscope className="h-5 w-5" />
              <span className="font-medium">Genomic Research Hub</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Discover Genetic Solutions
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-emerald-200 mt-2">
                for Climate Resilience
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto px-4 sm:px-0">
              Explore our comprehensive database of climate-adaptive genes with AI-powered insights, 
              cross-species analysis, and integrated research data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search and Filters */}
          <AdvancedSearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
          />
          
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {sortedGenes.length} genes found
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {searchQuery && `Results for "${searchQuery}"`}
                {filters.trait !== "all" && ` • ${filters.trait}`}
                {filters.organism !== "all" && ` • ${filters.organism}`}
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Label className="text-sm font-medium hidden sm:inline">Sort by:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Integrated Score</SelectItem>
                  <SelectItem value="citations">Citations</SelectItem>
                  <SelectItem value="confidence">Confidence</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="updated">Recently Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Gene Grid */}
          {sortedGenes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedGenes.map((gene, index) => (
                <motion.div
                  key={gene.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GeneCard gene={gene} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <Microscope className="h-16 w-16 text-slate-400 mx-auto" />
                <h3 className="text-xl font-semibold text-slate-700">No genes found</h3>
                <p className="text-slate-600">
                  Try adjusting your search criteria or filters to find relevant genes.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ trait: "all", organism: "all", confidence: "all", proteinFamily: "all", peerReviewed: "all" });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}