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

export default function ExperimentPlannerLab() {
  const [selectedSystem, setSelectedSystem] = useState<string>("cas9");
  const [experimentPlan, setExperimentPlan] = useState<ExperimentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetSequence, setTargetSequence] = useState("");
  const [guideRNAs, setGuideRNAs] = useState<GuideRNA[]>([]);

  // Custom experiment form data
  const [customExperiment, setCustomExperiment] = useState({
    objective: "",
    targetGenes: "",
    organism: "",
    deliveryMethod: "",
    timeline: "",
    budget: ""
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,25 Q25,0 50,25 T100,25" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M0,75 Q25,100 50,75 T100,75" stroke="currentColor" strokeWidth="0.5" fill="none" />
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

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-shrink-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Microscope className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-800 mb-3">In-Silico Laboratory</h1>
                <p className="text-xl text-slate-600 mb-4">Advanced CRISPR Design, Experiment Planning & Resource Optimization</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-violet-100 text-violet-700 border-violet-300 px-3 py-1">
                    <Scissors className="mr-1 h-3 w-3" />
                    CRISPR-Cas Systems
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300 px-3 py-1">
                    <Brain className="mr-1 h-3 w-3" />
                    AI-Powered Design
                  </Badge>
                  <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300 px-3 py-1">
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Resource Optimization
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Laboratory Interface */}
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              <span className="hidden sm:inline">CRISPR Design</span>
              <span className="sm:hidden">Design</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
              <span className="sm:hidden">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Experiment Planner</span>
              <span className="sm:hidden">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Optimization</span>
              <span className="sm:hidden">Optimize</span>
            </TabsTrigger>
          </TabsList>

          {/* CRISPR Design Panel */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* CRISPR System Selection */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <Scissors className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>CRISPR System Selection</div>
                      <div className="text-sm font-normal text-slate-600">Choose optimal editing system</div>
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
                        placeholder="Enter target DNA sequence (minimum 50 bp)..."
                        value={targetSequence}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTargetSequence(e.target.value)}
                        className="h-24 font-mono text-sm"
                      />
                    </div>
                    
                    <Button 
                      onClick={generateGuideRNAs}
                      disabled={!targetSequence || targetSequence.length < 50 || isGenerating}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Designing Guide RNAs...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Cpu className="mr-2 h-4 w-4" />
                          Generate Guide RNAs
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
                          Recommended Guide RNAs
                        </h4>
                        {guideRNAs.map((gRNA) => (
                          <div key={gRNA.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm font-bold text-blue-800">
                                {gRNA.sequence}-{gRNA.pamSite}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                Pos {gRNA.position}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <span className="text-slate-500">Specificity:</span>
                                <span className="ml-1 font-medium text-green-700">{gRNA.specificity}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Efficiency:</span>
                                <span className="ml-1 font-medium text-blue-700">{gRNA.efficiency}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Off-targets:</span>
                                <span className="ml-1 font-medium text-amber-700">{gRNA.offTargets}</span>
                              </div>
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

          {/* Experiment Templates Panel */}
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
                        className="h-20"
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organism">Target Organism</Label>
                        <Select 
                          value={customExperiment.organism} 
                          onValueChange={(value) => setCustomExperiment(prev => ({...prev, organism: value}))}
                        >
                          <SelectTrigger>
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
                          <SelectTrigger>
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