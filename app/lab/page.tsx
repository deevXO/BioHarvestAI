"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  FlaskConical, 
  Dna, 
  Scissors, 
  Target, 
  Calendar,
  DollarSign,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Brain,
  Activity,
  Gauge,
  TrendingUp,
  Microscope,
  Beaker,
  ShieldCheck,
  Zap,
  Settings,
  FileText,
  Download,
  Play
} from "lucide-react";
import Link from "next/link";

// CRISPR Components and Guide RNA Data
const CRISPR_SYSTEMS = [
  {
    id: "cas9",
    name: "Cas9",
    description: "High precision, widely used",
    efficiency: 92,
    specificity: 89,
    deliveryMethods: ["Agrobacterium", "Particle bombardment", "Protoplast fusion"],
    targetSize: "20 bp",
    pamSequence: "NGG"
  },
  {
    id: "cas12",
    name: "Cas12a (Cpf1)",
    description: "Single guide RNA, minimal off-targets",
    efficiency: 87,
    specificity: 94,
    deliveryMethods: ["Agrobacterium", "Viral vectors"],
    targetSize: "20-23 bp", 
    pamSequence: "TTTV"
  },
  {
    id: "base-editing",
    name: "Base Editing",
    description: "Precise single nucleotide changes",
    efficiency: 78,
    specificity: 96,
    deliveryMethods: ["Agrobacterium", "Protoplast transfection"],
    targetSize: "Variable",
    pamSequence: "Context dependent"
  }
];

const EXPERIMENT_TEMPLATES = [
  {
    id: "drought-resistance",
    name: "Drought Resistance Enhancement",
    description: "Enhance drought tolerance through DREB gene modification",
    duration: "12 weeks",
    cost: "$15,000",
    difficulty: "Intermediate",
    success_rate: 78,
    materials: ["Seeds", "Growth media", "CRISPR reagents", "Greenhouse space"],
    steps: [
      "Design guide RNAs for DREB1A gene",
      "Prepare transformation vectors",
      "Transform plant tissue",
      "Screen transformants",
      "Drought stress testing",
      "Molecular confirmation"
    ]
  },
  {
    id: "yield-optimization",
    name: "Yield Enhancement Project",
    description: "Multi-gene approach to increase crop yield",
    duration: "16 weeks",
    cost: "$25,000",
    difficulty: "Advanced",
    success_rate: 65,
    materials: ["Multi-gene constructs", "Field plots", "Advanced analytics"],
    steps: [
      "Multi-gene target identification",
      "Multiplexed CRISPR design",
      "Stacked transformation",
      "Field trials",
      "Yield analysis",
      "Regulatory assessment"
    ]
  },
  {
    id: "pathogen-resistance",
    name: "Pathogen Resistance Development",
    description: "Engineer resistance against plant pathogens",
    duration: "14 weeks",
    cost: "$18,000",
    difficulty: "Advanced",
    success_rate: 71,
    materials: ["Pathogen cultures", "Resistance genes", "Containment facilities"],
    steps: [
      "Pathogen characterization",
      "Resistance gene selection",
      "CRISPR knock-in design",
      "Transformation protocol",
      "Pathogen challenge tests",
      "Resistance validation"
    ]
  }
];

type ExperimentPlan = {
  id: string;
  name: string;
  objective: string;
  targetGenes: string[];
  crisprSystem: string;
  timeline: {
    phase: string;
    duration: string;
    tasks: string[];
  }[];
  resources: {
    personnel: number;
    budget: number;
    equipment: string[];
    materials: string[];
  };
  riskAssessment: {
    level: "Low" | "Medium" | "High";
    factors: string[];
    mitigation: string[];
  };
};

type GuideRNA = {
  id: number;
  sequence: string;
  pamSite: string;
  position: number;
  specificity: number;
  efficiency: number;
  offTargets: number;
};

type OptimizationResult = {
  id: string;
  type: "codon" | "promoter" | "sequence";
  original: string;
  optimized: string;
  improvement: number;
  metrics: {
    cai: number;
    gc_content: number;
    expression: number;
  };
};

type PrimerDesign = {
  id: number;
  name: string;
  sequence: string;
  tm: number;
  gc_content: number;
  length: number;
  type: "forward" | "reverse";
};

type AnalysisResult = {
  id: string;
  type: "phylogenetic" | "structure" | "expression" | "interaction";
  result: {
    score: number;
    details: string;
  };
  confidence: number;
  timestamp: string;
};

export default function ExperimentPlannerLab() {
  const [selectedSystem, setSelectedSystem] = useState<string>("cas9");
  const [experimentPlan, setExperimentPlan] = useState<ExperimentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetSequence, setTargetSequence] = useState("");
  const [guideRNAs, setGuideRNAs] = useState<GuideRNA[]>([]);

  // New state for enhanced features
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([]);
  const [primers, setPrimers] = useState<PrimerDesign[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>("structure");
  const [optimizationTarget, setOptimizationTarget] = useState<string>("");
  const [primerTarget, setPrimerTarget] = useState<string>("");
  const [analysisInput, setAnalysisInput] = useState<string>("");
  
  // Error states for validation
  const [sequenceError, setSequenceError] = useState<string>("");
  const [optimizationError, setOptimizationError] = useState<string>("");
  const [primerError, setPrimerError] = useState<string>("");
  const [analysisError, setAnalysisError] = useState<string>("");

  // Custom experiment form data
  const [customExperiment, setCustomExperiment] = useState({
    objective: "",
    targetGenes: "",
    organism: "",
    deliveryMethod: "",
    timeline: "",
    budget: ""
  });

  // Sequence validation functions
  const validateDNASequence = (sequence: string): string => {
    if (!sequence.trim()) return "";
    const cleanSeq = sequence.replace(/\s+/g, '').toUpperCase();
    const validDNA = /^[ATGCN]+$/;
    if (!validDNA.test(cleanSeq)) {
      return "Invalid DNA sequence. Only A, T, G, C, and N characters are allowed.";
    }
    if (cleanSeq.length < 20) {
      return "DNA sequence too short. Minimum 20 nucleotides required.";
    }
    return "";
  };

  const validateProteinSequence = (sequence: string): string => {
    if (!sequence.trim()) return "";
    const cleanSeq = sequence.replace(/\s+/g, '').toUpperCase();
    const validProtein = /^[ACDEFGHIKLMNPQRSTVWY*]+$/;
    if (!validProtein.test(cleanSeq)) {
      return "Invalid protein sequence. Only standard amino acid codes are allowed.";
    }
    if (cleanSeq.length < 10) {
      return "Protein sequence too short. Minimum 10 amino acids required.";
    }
    return "";
  };

  const validateSequenceByType = (sequence: string, type: "dna" | "protein"): string => {
    if (type === "dna") return validateDNASequence(sequence);
    return validateProteinSequence(sequence);
  };

  const handleSequenceChange = (value: string, setter: (val: string) => void, errorSetter: (err: string) => void, type: "dna" | "protein") => {
    setter(value);
    const error = validateSequenceByType(value, type);
    errorSetter(error);
  };

  // Sample sequences for testing
  const insertSampleSequence = (type: "dna" | "protein", field: "target" | "optimization" | "primer" | "analysis") => {
    const sampleDNA = "ATGGCTAGCAAGGCTTTCGAGACCTTGTACAAGCACGTCAAGTTGCTGAAAGCTCAGTGCATCGTAGCTGAATCCCGAA";
    const sampleProtein = "MKLAVLRKLYGVDPGAKYEELFTGVVPILVELDGDVNGHKFSVSGEGEGDATYGKLTLKFICTTGKLPVPWPTLVTTFSYGVQCFSRYPDHMKQHDFFKSAMPEGYVQERTISFKDDGNYKTRAEVKFEGDTLVNRIELKGIDFKEDGNILGHKLEYNYNSHNVYIMADKQKNGIKVNFKIRHNIEDGSVQLADHYQQNTPIGDGPVLLPDNHYLSTQSALSKDPNEKRDHMVLLEFVTAAGITHGMDELYK";
    
    if (type === "dna") {
      if (field === "target") {
        setTargetSequence(sampleDNA);
        setSequenceError("");
      } else if (field === "optimization") {
        setOptimizationTarget(sampleDNA);
        setOptimizationError("");
      } else if (field === "primer") {
        setPrimerTarget(sampleDNA);
        setPrimerError("");
      } else if (field === "analysis") {
        setAnalysisInput(sampleDNA);
        setAnalysisError("");
      }
    } else {
      if (field === "analysis") {
        setAnalysisInput(sampleProtein);
        setAnalysisError("");
      }
    }
  };

  const generateGuideRNAs = async () => {
    if (!targetSequence || targetSequence.length < 50) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockGuideRNAs = [
      {
        id: 1,
        sequence: "GCATGCTAAGCTTGCTAGCT",
        pamSite: "GGG",
        position: 145,
        specificity: 94,
        efficiency: 87,
        offTargets: 2
      },
      {
        id: 2,
        sequence: "TTGCACGTCAAGTTGCTGAA",
        pamSite: "AGG",
        position: 234,
        specificity: 91,
        efficiency: 92,
        offTargets: 1
      },
      {
        id: 3,
        sequence: "AGCTCAGTGCATCGTAGCTG",
        pamSite: "TGG",
        position: 367,
        specificity: 89,
        efficiency: 85,
        offTargets: 3
      }
    ];
    
    setGuideRNAs(mockGuideRNAs);
    setIsGenerating(false);
  };

  const generateExperimentPlan = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockPlan: ExperimentPlan = {
      id: "exp-001",
      name: customExperiment.objective || "Custom Genetic Modification",
      objective: customExperiment.objective,
      targetGenes: customExperiment.targetGenes.split(",").map(g => g.trim()),
      crisprSystem: selectedSystem,
      timeline: [
        {
          phase: "Design & Preparation",
          duration: "2 weeks",
          tasks: ["Design guide RNAs", "Prepare vectors", "Order materials"]
        },
        {
          phase: "Transformation",
          duration: "3 weeks", 
          tasks: ["Plant transformation", "Selection", "Initial screening"]
        },
        {
          phase: "Validation",
          duration: "4 weeks",
          tasks: ["Molecular confirmation", "Phenotype analysis", "Stability testing"]
        },
        {
          phase: "Analysis",
          duration: "3 weeks",
          tasks: ["Data collection", "Statistical analysis", "Report generation"]
        }
      ],
      resources: {
        personnel: 4,
        budget: parseInt(customExperiment.budget) || 20000,
        equipment: ["PCR machine", "Gel electrophoresis", "Growth chambers", "Microscopes"],
        materials: ["CRISPR reagents", "Plant tissue culture media", "Antibiotics", "Primers"]
      },
      riskAssessment: {
        level: "Medium",
        factors: ["Off-target effects", "Low transformation efficiency", "Tissue culture contamination"],
        mitigation: ["Multiple guide RNA validation", "Optimize protocols", "Sterile technique training"]
      }
    };
    
    setExperimentPlan(mockPlan);
    setIsGenerating(false);
  };

  // New functions for enhanced features
  const optimizeSequence = async () => {
    if (!optimizationTarget) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: OptimizationResult[] = [
      {
        id: "opt-001",
        type: "codon",
        original: optimizationTarget.substring(0, 30) + "...",
        optimized: "ATGGCTAGCAAGGCTTTCGAG...",
        improvement: 23,
        metrics: {
          cai: 0.87,
          gc_content: 0.52,
          expression: 1.8
        }
      },
      {
        id: "opt-002", 
        type: "promoter",
        original: "Basic promoter region",
        optimized: "CaMV 35S enhanced promoter",
        improvement: 45,
        metrics: {
          cai: 0.92,
          gc_content: 0.48,
          expression: 2.3
        }
      }
    ];
    
    setOptimizationResults(mockResults);
    setIsGenerating(false);
  };

  const designPrimers = async () => {
    if (!primerTarget) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockPrimers: PrimerDesign[] = [
      {
        id: 1,
        name: "Forward Primer 1",
        sequence: "ATGGCTAGCAAGGCTTTCGAG",
        tm: 58.2,
        gc_content: 55,
        length: 20,
        type: "forward"
      },
      {
        id: 2,
        name: "Reverse Primer 1", 
        sequence: "CTCGAAAGCCTTGCTAGCCAT",
        tm: 58.5,
        gc_content: 55,
        length: 21,
        type: "reverse"
      },
      {
        id: 3,
        name: "Forward Primer 2",
        sequence: "GCTAGCAAGGCTTTCGAGAC",
        tm: 60.1,
        gc_content: 60,
        length: 20,
        type: "forward"
      }
    ];
    
    setPrimers(mockPrimers);
    setIsGenerating(false);
  };

  const runAnalysis = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis: AnalysisResult = {
      id: `analysis-${Date.now()}`,
      type: selectedAnalysisType as "phylogenetic" | "structure" | "expression" | "interaction",
      result: {
        score: Math.random() * 0.4 + 0.6,
        details: selectedAnalysisType === "structure" 
          ? "Protein structure shows high stability with RMSD < 2.0Å"
          : selectedAnalysisType === "phylogenetic"
          ? "High conservation across plant species (85% identity)"
          : selectedAnalysisType === "expression"
          ? "Expression level increased 2.3-fold in stressed conditions"
          : "Strong interaction with transcription factor binding sites"
      },
      confidence: Math.random() * 0.2 + 0.8,
      timestamp: new Date().toLocaleString()
    };
    
    setAnalysisResults(prev => [mockAnalysis, ...prev]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Enhanced Green Tech Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(34,197,94,0.2),transparent_50%)]"></div>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dna-helix" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q10,5 20,10 Q10,15 0,10" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" fill="none" />
              <path d="M0,10 Q10,15 20,10 Q10,5 0,10" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-helix)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.6}}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="outline" className="mb-6 border-violet-200 text-violet-700 hover:bg-violet-50">
              <FlaskConical className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200/50">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-shrink-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Microscope className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-800 mb-3">In-Silico Laboratory</h1>
                <p className="text-xl text-slate-600 mb-4">Advanced CRISPR Design, Experiment Planning & Resource Optimization</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 px-3 py-1">
                    <Scissors className="mr-1 h-3 w-3" />
                    CRISPR-Cas Systems
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                    <Brain className="mr-1 h-3 w-3" />
                    AI-Powered Design
                  </Badge>
                  <Badge className="bg-teal-100 text-teal-700 border-teal-300 px-3 py-1">
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Resource Optimization
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Laboratory Interface */}
        <Tabs defaultValue="crispor" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="crispor" className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              <Scissors className="h-4 w-4" />
              <span className="hidden sm:inline">CRISPOR</span>
              <span className="sm:hidden">CRISPOR</span>
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Dna className="h-4 w-4" />
              <span className="hidden sm:inline">Optimizer</span>
              <span className="sm:hidden">Optimize</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Design Tools</span>
              <span className="sm:hidden">Design</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
              <span className="sm:hidden">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
              <span className="sm:hidden">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Planner</span>
              <span className="sm:hidden">Planner</span>
            </TabsTrigger>
          </TabsList>

          {/* CRISPOR Design Panel */}
          <TabsContent value="crispor" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* CRISPR System Selection */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <Scissors className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>CRISPOR Design System</div>
                      <div className="text-sm font-normal text-slate-600">Professional CRISPR guide RNA design</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    {CRISPR_SYSTEMS.map((system) => (
                      <motion.div
                        key={system.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedSystem === system.id
                            ? "border-green-500 bg-green-50 shadow-lg"
                            : "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50"
                        }`}
                        onClick={() => setSelectedSystem(system.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">{system.name}</h4>
                            <p className="text-sm text-slate-600 mb-3">{system.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500">Efficiency:</span>
                                <span className="ml-2 font-medium text-green-700">{system.efficiency}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Specificity:</span>
                                <span className="ml-2 font-medium text-blue-700">{system.specificity}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Target:</span>
                                <span className="ml-2 font-mono text-xs text-slate-700">{system.targetSize}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">PAM:</span>
                                <span className="ml-2 font-mono text-xs text-slate-700">{system.pamSequence}</span>
                              </div>
                            </div>
                          </div>
                          {selectedSystem === system.id && (
                            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CRISPOR Settings */}
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-3">CRISPOR Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="off-target">Off-target Analysis</Label>
                        <Select defaultValue="comprehensive">
                          <SelectTrigger className="w-36 bg-white/90 border-slate-200 focus:border-green-500 focus:ring-green-500/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                            <SelectItem value="ultra">Ultra-sensitive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="organism">Target Organism</Label>
                        <Select defaultValue="arabidopsis">
                          <SelectTrigger className="w-36 bg-white/90 border-slate-200 focus:border-green-500 focus:ring-green-500/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="arabidopsis">Arabidopsis</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="maize">Maize</SelectItem>
                            <SelectItem value="tomato">Tomato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide RNA Design */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Guide RNA Design</div>
                      <div className="text-sm font-normal text-slate-600">AI-powered target selection</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-sequence">Target DNA Sequence</Label>
                      <Textarea
                        id="target-sequence"
                        placeholder="Enter target DNA sequence (minimum 50 bp)...
Example: ATGGCTAGCAAGGCTTTCGAGACCTTGTACAAGCACGTCAAGTTGCTGAAAGCTCAG"
                        value={targetSequence}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleSequenceChange(e.target.value, setTargetSequence, setSequenceError, "dna")}
                        className={`h-32 font-mono text-sm bg-slate-800 text-white border-2 transition-colors placeholder:text-slate-300 ${
                          sequenceError 
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-slate-600 focus:border-blue-400 focus:ring-blue-400/20"
                        }`}
                      />
                      {sequenceError && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          {sequenceError}
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <div className="flex gap-4">
                          <span>Length: {targetSequence.length} bp</span>
                          <span>GC Content: {targetSequence ? ((targetSequence.match(/[GC]/gi) || []).length / targetSequence.length * 100).toFixed(1) : 0}%</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => insertSampleSequence("dna", "target")}
                          className="h-6 px-2 text-xs"
                        >
                          Insert Sample
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={generateGuideRNAs}
                      disabled={!targetSequence || targetSequence.length < 50 || isGenerating}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Running CRISPOR Analysis...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Cpu className="mr-2 h-4 w-4" />
                          Design Guide RNAs with CRISPOR
                        </div>
                      )}
                    </Button>

                    {/* Guide RNA Results */}
                    {guideRNAs.length > 0 && (
                      <motion.div 
                        initial={{opacity:0,scale:0.95}} 
                        animate={{opacity:1,scale:1}}
                        className="space-y-3 pt-4 border-t border-slate-200"
                      >
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <Dna className="h-4 w-4 text-blue-600" />
                          CRISPOR Results - Top Guide RNAs
                        </h4>
                        {guideRNAs.map((gRNA, index) => (
                          <div key={gRNA.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-blue-600 text-white">#{index + 1}</Badge>
                                <span className="font-mono text-sm font-bold text-blue-800">
                                  {gRNA.sequence}-{gRNA.pamSite}
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Position {gRNA.position}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div className="text-center p-2 bg-white rounded-lg">
                                <div className="text-lg font-bold text-green-700">{gRNA.specificity}%</div>
                                <div className="text-xs text-slate-500">Specificity</div>
                              </div>
                              <div className="text-center p-2 bg-white rounded-lg">
                                <div className="text-lg font-bold text-blue-700">{gRNA.efficiency}%</div>
                                <div className="text-xs text-slate-500">Efficiency</div>
                              </div>
                              <div className="text-center p-2 bg-white rounded-lg">
                                <div className="text-lg font-bold text-amber-700">{gRNA.offTargets}</div>
                                <div className="text-xs text-slate-500">Off-targets</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Download className="mr-1 h-3 w-3" />
                                Export
                              </Button>
                              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                <Play className="mr-1 h-3 w-3" />
                                Use This gRNA
                              </Button>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sequence Optimizer Panel */}
          <TabsContent value="optimizer" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Optimization Input */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                      <Dna className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Sequence Optimizer</div>
                      <div className="text-sm font-normal text-slate-600">AI-powered sequence enhancement</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="optimization-target">Input Sequence</Label>
                      <Textarea
                        id="optimization-target"
                        placeholder="Enter sequence to optimize...
DNA Example: ATGAAAGCTATTCTCGCCAAGCTGGCGCTAAAGGAGTTCGAG
Protein Example: MKAILIRLALGILAAA"
                        value={optimizationTarget}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleSequenceChange(e.target.value, setOptimizationTarget, setOptimizationError, "dna")}
                        className={`h-24 font-mono text-sm bg-slate-800 text-white border-2 transition-colors placeholder:text-slate-300 ${
                          optimizationError 
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-slate-600 focus:border-purple-400 focus:ring-purple-400/20"
                        }`}
                      />
                      {optimizationError && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          {optimizationError}
                        </div>
                      )}
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => insertSampleSequence("dna", "optimization")}
                          className="h-6 px-2 text-xs"
                        >
                          Insert Sample DNA
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Optimization Type</Label>
                        <Select defaultValue="codon">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="codon">Codon Optimization</SelectItem>
                            <SelectItem value="promoter">Promoter Enhancement</SelectItem>
                            <SelectItem value="expression">Expression Optimization</SelectItem>
                            <SelectItem value="stability">mRNA Stability</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Target Organism</Label>
                        <Select defaultValue="arabidopsis">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="arabidopsis">Arabidopsis</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="ecoli">E. coli</SelectItem>
                            <SelectItem value="yeast">S. cerevisiae</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={optimizeSequence}
                      disabled={!optimizationTarget || isGenerating}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Optimizing Sequence...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Zap className="mr-2 h-4 w-4" />
                          Optimize Sequence
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Results */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Optimization Results</div>
                      <div className="text-sm font-normal text-slate-600">Enhanced sequence analysis</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {optimizationResults.length > 0 ? (
                    <div className="space-y-4">
                      {optimizationResults.map((result) => (
                        <motion.div
                          key={result.id}
                          initial={{opacity:0,y:20}}
                          animate={{opacity:1,y:0}}
                          className="p-4 bg-emerald-50 rounded-xl border border-emerald-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={`${
                              result.type === "codon" ? "bg-purple-100 text-purple-700" :
                              result.type === "promoter" ? "bg-blue-100 text-blue-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)} Optimization
                            </Badge>
                            <Badge className="bg-emerald-100 text-emerald-700">
                              +{result.improvement}% improvement
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs text-slate-500">Original:</Label>
                              <div className="font-mono text-sm bg-white p-2 rounded border">
                                {result.original}
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-slate-500">Optimized:</Label>
                              <div className="font-mono text-sm bg-white p-2 rounded border">
                                {result.optimized}
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-300">
                              <div className="text-center">
                                <div className="text-sm font-bold text-emerald-700">{result.metrics.cai}</div>
                                <div className="text-xs text-slate-500">CAI</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-emerald-700">{(result.metrics.gc_content * 100).toFixed(0)}%</div>
                                <div className="text-xs text-slate-500">GC Content</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-emerald-700">{result.metrics.expression}x</div>
                                <div className="text-xs text-slate-500">Expression</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Dna className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a sequence and click optimize to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Design Tools Panel */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Primer Design */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Primer Design Studio</div>
                      <div className="text-sm font-normal text-slate-600">Professional PCR primer design</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primer-target">Target Template</Label>
                      <Textarea
                        id="primer-target"
                        placeholder="Enter template DNA sequence for primer design...
Example: ATGGCTAGCAAGGCTTTCGAGACCTTGTACAAGCACGTC"
                        value={primerTarget}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleSequenceChange(e.target.value, setPrimerTarget, setPrimerError, "dna")}
                        className={`h-20 font-mono text-sm bg-slate-800 text-white border-2 transition-colors placeholder:text-slate-300 ${
                          primerError 
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-slate-600 focus:border-indigo-400 focus:ring-indigo-400/20"
                        }`}
                      />
                      {primerError && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          {primerError}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Product Size</Label>
                        <Select defaultValue="200-500">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100-300">100-300 bp</SelectItem>
                            <SelectItem value="200-500">200-500 bp</SelectItem>
                            <SelectItem value="400-800">400-800 bp</SelectItem>
                            <SelectItem value="800-1500">800-1500 bp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Primer Type</Label>
                        <Select defaultValue="pcr">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pcr">PCR Amplification</SelectItem>
                            <SelectItem value="sequencing">DNA Sequencing</SelectItem>
                            <SelectItem value="qpcr">Quantitative PCR</SelectItem>
                            <SelectItem value="cloning">Cloning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={designPrimers}
                      disabled={!primerTarget || isGenerating}
                      className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Designing Primers...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Target className="mr-2 h-4 w-4" />
                          Design Primers
                        </div>
                      )}
                    </Button>

                    {/* Primer Results */}
                    {primers.length > 0 && (
                      <motion.div 
                        initial={{opacity:0,scale:0.95}} 
                        animate={{opacity:1,scale:1}}
                        className="space-y-3 pt-4 border-t border-slate-200"
                      >
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <Target className="h-4 w-4 text-orange-600" />
                          Designed Primers
                        </h4>
                        {primers.map((primer) => (
                          <div key={primer.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-orange-800">{primer.name}</span>
                              <Badge className={`${
                                primer.type === "forward" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                              }`}>
                                {primer.type}
                              </Badge>
                            </div>
                            <div className="font-mono text-sm bg-white p-2 rounded border mb-2">
                              {primer.sequence}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <span className="text-slate-500">Tm:</span>
                                <span className="ml-1 font-medium text-orange-700">{primer.tm}°C</span>
                              </div>
                              <div>
                                <span className="text-slate-500">GC:</span>
                                <span className="ml-1 font-medium text-blue-700">{primer.gc_content}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Length:</span>
                                <span className="ml-1 font-medium text-slate-700">{primer.length} bp</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Vector Construction */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Vector Construction</div>
                      <div className="text-sm font-normal text-slate-600">Automated plasmid design</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Vector Backbone</Label>
                        <Select defaultValue="puc19">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="puc19">pUC19</SelectItem>
                            <SelectItem value="pbluescript">pBluescript</SelectItem>
                            <SelectItem value="pcambia">pCAMBIA1300</SelectItem>
                            <SelectItem value="pbi121">pBI121</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Selection Marker</Label>
                        <Select defaultValue="ampicillin">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ampicillin">Ampicillin</SelectItem>
                            <SelectItem value="kanamycin">Kanamycin</SelectItem>
                            <SelectItem value="hygromycin">Hygromycin</SelectItem>
                            <SelectItem value="chloramphenicol">Chloramphenicol</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Insert Sequence</Label>
                      <Textarea
                        placeholder="Enter gene or sequence to clone..."
                        className="h-20 font-mono text-sm bg-slate-800 text-white border-2 border-slate-600 focus:border-emerald-400 focus:ring-emerald-400/20 placeholder:text-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>5&apos; Restriction Site</Label>
                        <Select defaultValue="ecori">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecori">EcoRI</SelectItem>
                            <SelectItem value="bamhi">BamHI</SelectItem>
                            <SelectItem value="hindiii">HindIII</SelectItem>
                            <SelectItem value="xbai">XbaI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>3&apos; Restriction Site</Label>
                        <Select defaultValue="hindiii">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecori">EcoRI</SelectItem>
                            <SelectItem value="bamhi">BamHI</SelectItem>
                            <SelectItem value="hindiii">HindIII</SelectItem>
                            <SelectItem value="xbai">XbaI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Construct Vector
                    </Button>

                    {/* Vector Preview */}
                    <div className="mt-4 p-4 bg-violet-50 rounded-lg border border-violet-200">
                      <h5 className="font-semibold text-violet-800 mb-3">Vector Preview</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Total Size:</span>
                          <span className="font-mono text-violet-700">4,247 bp</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Insert Size:</span>
                          <span className="font-mono text-violet-700">1,245 bp</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Copy Number:</span>
                          <span className="font-mono text-violet-700">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tools Panel */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Analysis Input */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Bioinformatics Analysis</div>
                      <div className="text-sm font-normal text-slate-600">Comprehensive sequence analysis</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Analysis Type</Label>
                      <Select 
                        value={selectedAnalysisType} 
                        onValueChange={setSelectedAnalysisType}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="structure">Protein Structure Prediction</SelectItem>
                          <SelectItem value="phylogenetic">Phylogenetic Analysis</SelectItem>
                          <SelectItem value="expression">Gene Expression Analysis</SelectItem>
                          <SelectItem value="interaction">Protein-Protein Interaction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Input Data</Label>
                      <Textarea
                        placeholder={
                          selectedAnalysisType === "structure" 
                            ? "Enter protein sequence (FASTA format)...\nExample: MKLAVLRKLYGVDPGAKYEE"
                            : selectedAnalysisType === "phylogenetic"
                            ? "Enter multiple sequences for phylogenetic analysis...\nExample: >Species1\nATGGCTAGC...\n>Species2\nATGGCCAGC..."
                            : selectedAnalysisType === "expression"
                            ? "Enter gene expression data or gene IDs...\nExample: AT1G01010, AT1G01020"
                            : "Enter protein sequences for interaction analysis...\nExample: MKLAVLRKLYGVDPGAKYEE"
                        }
                        onChange={(e) => handleSequenceChange(e.target.value, setAnalysisInput, setAnalysisError, selectedAnalysisType === "structure" || selectedAnalysisType === "interaction" ? "protein" : "dna")}
                        className={`h-32 font-mono text-sm bg-slate-800 text-white border-2 transition-colors placeholder:text-slate-300 ${
                          analysisError 
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-slate-600 focus:border-teal-400 focus:ring-teal-400/20"
                        }`}
                      />
                      {analysisError && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          {analysisError}
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={runAnalysis}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Running Analysis...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Run {selectedAnalysisType.charAt(0).toUpperCase() + selectedAnalysisType.slice(1)} Analysis
                        </div>
                      )}
                    </Button>

                    {/* Analysis Parameters */}
                    <div className="pt-4 border-t border-slate-200">
                      <h5 className="font-semibold text-slate-800 mb-3">Analysis Parameters</h5>
                      <div className="space-y-3">
                        {selectedAnalysisType === "structure" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Template Database</Label>
                              <Select defaultValue="pdb">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pdb">PDB</SelectItem>
                                  <SelectItem value="alphafold">AlphaFold</SelectItem>
                                  <SelectItem value="swiss">Swiss-Model</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Confidence Threshold</Label>
                              <Select defaultValue="high">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low (&gt;50%)</SelectItem>
                                  <SelectItem value="medium">Medium (&gt;70%)</SelectItem>
                                  <SelectItem value="high">High (&gt;90%)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        {selectedAnalysisType === "phylogenetic" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Tree Method</Label>
                              <Select defaultValue="ml">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ml">Maximum Likelihood</SelectItem>
                                  <SelectItem value="nj">Neighbor Joining</SelectItem>
                                  <SelectItem value="mp">Maximum Parsimony</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Bootstrap</Label>
                              <Select defaultValue="1000">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="100">100</SelectItem>
                                  <SelectItem value="500">500</SelectItem>
                                  <SelectItem value="1000">1000</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Analysis Results</div>
                      <div className="text-sm font-normal text-slate-600">Computational insights</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {analysisResults.length > 0 ? (
                    <div className="space-y-4">
                      {analysisResults.map((result) => (
                        <motion.div
                          key={result.id}
                          initial={{opacity:0,y:20}}
                          animate={{opacity:1,y:0}}
                          className="p-4 bg-emerald-50 rounded-xl border border-emerald-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-emerald-100 text-emerald-700">
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)} Analysis
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700">
                              {(result.confidence * 100).toFixed(0)}% confidence
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-slate-800 mb-2">Results</h5>
                              <div className="bg-white p-3 rounded border">
                                <div className="text-2xl font-bold text-emerald-700 mb-1">
                                  {(result.result.score * 100).toFixed(1)}%
                                </div>
                                <p className="text-sm text-slate-600">{result.result.details}</p>
                              </div>
                            </div>

                            <div className="text-xs text-slate-500 border-t pt-2">
                              Completed: {result.timestamp}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Run an analysis to see results here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {EXPERIMENT_TEMPLATES.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg flex-shrink-0">
                          <Beaker className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-800 mb-1">{template.name}</h3>
                          <p className="text-sm text-slate-600">{template.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <Clock className="h-5 w-5 mx-auto text-slate-600 mb-1" />
                          <div className="text-sm font-medium text-slate-800">{template.duration}</div>
                          <div className="text-xs text-slate-500">Duration</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <DollarSign className="h-5 w-5 mx-auto text-slate-600 mb-1" />
                          <div className="text-sm font-medium text-slate-800">{template.cost}</div>
                          <div className="text-xs text-slate-500">Estimated Cost</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={`${
                          template.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                          template.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {template.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Gauge className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-700">
                            {template.success_rate}% success
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 mb-2">Key Steps:</h4>
                        <ul className="space-y-1">
                          {template.steps.slice(0, 3).map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              {step}
                            </li>
                          ))}
                          {template.steps.length > 3 && (
                            <li className="text-xs text-slate-500 ml-3.5">
                              +{template.steps.length - 3} more steps...
                            </li>
                          )}
                        </ul>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        onClick={() => console.log(`Selected template: ${template.id}`)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Experiment Planner Panel */}
          <TabsContent value="planner" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Custom Experiment Form */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Custom Experiment Design</div>
                      <div className="text-sm font-normal text-slate-600">Build your research plan</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="objective">Research Objective</Label>
                      <Textarea
                        id="objective"
                        placeholder="Describe your research objective..."
                        value={customExperiment.objective}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomExperiment(prev => ({...prev, objective: e.target.value}))}
                        className="h-20 bg-slate-800 text-white border-2 border-slate-600 focus:border-amber-400 focus:ring-amber-400/20 placeholder:text-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target-genes">Target Genes</Label>
                        <Input
                          id="target-genes"
                          placeholder="DREB1A, WRKY70..."
                          value={customExperiment.targetGenes}
                          onChange={(e) => setCustomExperiment(prev => ({...prev, targetGenes: e.target.value}))}
                          className="bg-white text-slate-900 border-2 border-slate-300 focus:border-amber-500 focus:ring-amber-500/20 placeholder:text-slate-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organism">Target Organism</Label>
                        <Select 
                          value={customExperiment.organism} 
                          onValueChange={(value) => setCustomExperiment(prev => ({...prev, organism: value}))}
                        >
                          <SelectTrigger className="bg-white/90 border-slate-200 focus:border-amber-500 focus:ring-amber-500/20">
                            <SelectValue placeholder="Select organism" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="arabidopsis">Arabidopsis thaliana</SelectItem>
                            <SelectItem value="rice">Rice (Oryza sativa)</SelectItem>
                            <SelectItem value="wheat">Wheat (Triticum aestivum)</SelectItem>
                            <SelectItem value="maize">Maize (Zea mays)</SelectItem>
                            <SelectItem value="tomato">Tomato (Solanum lycopersicum)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Expected Timeline</Label>
                        <Select 
                          value={customExperiment.timeline} 
                          onValueChange={(value) => setCustomExperiment(prev => ({...prev, timeline: value}))}
                        >
                          <SelectTrigger className="bg-white/90 border-slate-200 focus:border-amber-500 focus:ring-amber-500/20">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8-weeks">8-12 weeks</SelectItem>
                            <SelectItem value="12-weeks">12-16 weeks</SelectItem>
                            <SelectItem value="16-weeks">16-20 weeks</SelectItem>
                            <SelectItem value="20-weeks">20+ weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (USD)</Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="20000"
                          value={customExperiment.budget}
                          onChange={(e) => setCustomExperiment(prev => ({...prev, budget: e.target.value}))}
                          className="bg-white text-slate-800 border-2 border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={generateExperimentPlan}
                      disabled={!customExperiment.objective || !customExperiment.targetGenes || isGenerating}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating Plan...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Brain className="mr-2 h-4 w-4" />
                          Generate Experiment Plan
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Generated Experiment Plan */}
              {experimentPlan && (
                <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div>Generated Plan</div>
                        <div className="text-sm font-normal text-slate-600">{experimentPlan.name}</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Timeline */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        Project Timeline
                      </h4>
                      <div className="space-y-3">
                        {experimentPlan.timeline.map((phase, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-slate-800">{phase.phase}</h5>
                                <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                              </div>
                              <ul className="text-sm text-slate-600 space-y-1">
                                {phase.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className="flex items-start gap-2">
                                    <div className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Settings className="h-4 w-4 text-emerald-600" />
                        Resource Requirements
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <Users className="h-5 w-5 mx-auto text-slate-600 mb-1" />
                          <div className="text-lg font-bold text-slate-800">{experimentPlan.resources.personnel}</div>
                          <div className="text-xs text-slate-500">Personnel</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <DollarSign className="h-5 w-5 mx-auto text-slate-600 mb-1" />
                          <div className="text-lg font-bold text-slate-800">${experimentPlan.resources.budget.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">Budget</div>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        Risk Assessment
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">Risk Level</span>
                          <Badge className={`${
                            experimentPlan.riskAssessment.level === "Low" ? "bg-green-100 text-green-700" :
                            experimentPlan.riskAssessment.level === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {experimentPlan.riskAssessment.level}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Key Risk Factors:</p>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {experimentPlan.riskAssessment.factors.map((factor, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        <Download className="mr-2 h-4 w-4" />
                        Export Plan
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Resource Optimization Panel */}
          <TabsContent value="optimization" className="space-y-6">
            <motion.div 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.6}}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Cost Optimization */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Resource Optimization</div>
                      <div className="text-sm font-normal text-slate-600">Cost & efficiency analysis</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-700 mb-1">32%</div>
                      <div className="text-sm font-medium text-slate-700">Cost Reduction</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700 mb-1">18%</div>
                      <div className="text-sm font-medium text-slate-700">Time Savings</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Optimization Suggestions</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                        <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-teal-800 mb-1">Batch Processing</p>
                          <p className="text-xs text-teal-700">Process multiple samples simultaneously to reduce reagent costs by 25%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 mb-1">Equipment Sharing</p>
                          <p className="text-xs text-blue-700">Share expensive equipment with other labs to reduce overhead by 40%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <Zap className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-purple-800 mb-1">Protocol Optimization</p>
                          <p className="text-xs text-purple-700">Streamlined protocols can reduce total time by 3-4 weeks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Prediction */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Success Prediction</div>
                      <div className="text-sm font-normal text-slate-600">AI-powered outcome forecasting</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                        />
                        <motion.path
                          initial={{ strokeDasharray: "0 100" }}
                          animate={{ strokeDasharray: "85 100" }}
                          transition={{ duration: 2, delay: 0.5 }}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="url(#successGradient)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F43F5E" />
                            <stop offset="100%" stopColor="#EC4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-slate-800">85%</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-slate-800 mb-2">Success Probability</p>
                    <p className="text-sm text-slate-600">Based on historical data and current parameters</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Success Factors</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Guide RNA Specificity</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full">
                            <div className="w-14 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-green-700">92%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Transformation Efficiency</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full">
                            <div className="w-12 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-blue-700">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Protocol Optimization</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full">
                            <div className="w-15 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-purple-700">89%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}