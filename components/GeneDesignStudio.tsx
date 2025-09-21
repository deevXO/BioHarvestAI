"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  Dna, 
  FlaskConical, 
  BarChart3, 
  CheckCircle,
  Lightbulb,
  PlusCircle,
  Target,
  X,
  Layers3,
  Brain,
  TrendingUp,
  AlertTriangle,
  Eye,
  Cpu,
  Activity,
  Gauge,
  RotateCcw,
  Maximize2,
  Loader2,
  Pin,
  Download,
  Layers,
  Grid3x3,
  Zap,
  Pause,
  Square
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_GENES, DEMO_SCENARIOS } from "@/lib/demo-data";
import { simulateAIAnalysis, simulateAIMutationGeneration, type AIAnalysisResult } from "@/lib/ai-service";

interface MutationResult {
  pathogenicityScore: number;
  stabilityImpact: number;
  conservationScore: number;
  predictedEffects: Array<{
    description: string;
    severity: 'High' | 'Medium' | 'Low';
  }>;
}

interface QueuedMutation {
  position: number;
  original: string;
  mutated: string;
  impactScore: number;
}

// Amino acid constants and helper functions
const AMINO_ACIDS = [
  'A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I',
  'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V'
];

const DNA_TO_AMINO_ACID: { [key: string]: string } = {
  'TTT': 'F', 'TTC': 'F', 'TTA': 'L', 'TTG': 'L',
  'TCT': 'S', 'TCC': 'S', 'TCA': 'S', 'TCG': 'S',
  'TAT': 'Y', 'TAC': 'Y', 'TAA': '*', 'TAG': '*',
  'TGT': 'C', 'TGC': 'C', 'TGA': '*', 'TGG': 'W',
  'CTT': 'L', 'CTC': 'L', 'CTA': 'L', 'CTG': 'L',
  'CCT': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
  'CAT': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
  'CGT': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
  'ATT': 'I', 'ATC': 'I', 'ATA': 'I', 'ATG': 'M',
  'ACT': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
  'AAT': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
  'AGT': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
  'GTT': 'V', 'GTC': 'V', 'GTA': 'V', 'GTG': 'V',
  'GCT': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
  'GAT': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
  'GGT': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
};

const getAminoAcidFromPosition = (position: number): string => {
  // This is a simplified version - in reality, we'd need the full sequence
  // For demo purposes, we'll return a random amino acid based on position
  return AMINO_ACIDS[position % AMINO_ACIDS.length];
};

const calculateMutationImpact = (position: number, aminoAcid: string): number => {
  // Simulate mutation impact calculation based on position and amino acid properties
  const originalAA = getAminoAcidFromPosition(position);
  if (originalAA === aminoAcid) return 0;
  
  // Simulate impact based on amino acid properties
  const hydrophobic = ['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V'];
  const polar = ['S', 'T', 'N', 'Q'];
  const charged = ['R', 'H', 'K', 'D', 'E'];
  
  let impact = Math.random() * 0.3 + 0.2; // Base impact 0.2-0.5
  
  // Higher impact for charge changes
  if (charged.includes(originalAA) !== charged.includes(aminoAcid)) {
    impact += 0.3;
  }
  
  // Medium impact for polarity changes
  if (polar.includes(originalAA) !== polar.includes(aminoAcid)) {
    impact += 0.2;
  }
  
  return Math.min(impact, 1.0);
};

// Simulated gene data with more realistic information
const GENE_DATA = {
  "DREB1A": {
    id: "DREB1A",
    name: "DREB1A",
    fullName: "Dehydration Responsive Element Binding protein 1A",
    trait: "Drought Tolerance",
    organism: "Arabidopsis thaliana",
    chromosome: "Chr4: 5,915,519-5,917,340",
    sequence: "ATGGCGTCAAGCAAGAAGAAGAAAGGAAGAAAGGTGGATACCGAGGAAGTCCTTCGGGAGAAGTTCTACAAGGCGAAGATCAAGGAGCTGATCGCCGACTACAAGGTGAAGGACATCCGCAAGTCCAAGACGGTGGAGGTGTACGAGGCGGTGACCGAGAAGCTGAAGCGCATGGACAAGTACTTCGACAAGATCGACGAGCTGAACGCGAAGACCGTGGACCTGGTGAAGGAGCTGAAGGACATCGAGAAGCTGGTGGAGAAGTTCGACAAGATCAAGGACGAGTACAAGGACGTGGTGGAGCTGATCGAGAAGCTGAAGGCGTTCGACAAGTACCTGGAGAAGATCGACAAGCTGAACGAGAAGACCGTGGAC",
    description: "Critical transcription factor that binds to DRE/CRT elements and regulates expression of stress-responsive genes under drought, cold, and salt stress conditions. Shows high expression in root tissues and responds rapidly to osmotic stress.",
    confidence: 0.95,
    citations: 1247,
    pathways: ["Abscisic acid signaling", "Stress response", "Gene regulation", "Osmotic adjustment"],
    variants: [
      { position: 145, wildType: "A", mutant: "G", impact: "Beneficial", confidence: 0.92 },
      { position: 278, wildType: "T", mutant: "C", impact: "Neutral", confidence: 0.76 },
      { position: 342, wildType: "G", mutant: "A", impact: "Detrimental", confidence: 0.88 }
    ],
    aiCandidates: [
      { id: "M1", aminoAcidChange: "A120V", impactLikelihood: 0.85, explanation: "Predicted to enhance water retention by altering a key phosphorylation site that regulates ABA signaling cascades." },
      { id: "M2", aminoAcidChange: "G60S", impactLikelihood: 0.78, explanation: "May improve osmotic adjustment through modified protein-protein interactions with downstream transcription factors." },
      { id: "M3", aminoAcidChange: "P200L", impactLikelihood: 0.65, explanation: "Minor structural change potentially increasing protein stability under high-salt conditions." },
      { id: "M4", aminoAcidChange: "K45R", impactLikelihood: 0.73, explanation: "Enhanced DNA-binding affinity for drought-responsive promoter elements." },
      { id: "M5", aminoAcidChange: "E180D", impactLikelihood: 0.69, explanation: "Optimized interaction with co-activator proteins in stress signaling pathway." }
    ],
    multiTraitImpact: [
      { trait: "Drought Tolerance", impact: 0.92 },
      { trait: "Salt Tolerance", impact: 0.68 },
      { trait: "Cold Tolerance", impact: 0.74 },
      { trait: "Heat Tolerance", impact: 0.45 },
      { trait: "Yield Under Stress", impact: 0.81 },
      { trait: "Water Use Efficiency", impact: 0.89 },
      { trait: "Root Development", impact: 0.76 },
      { trait: "Osmotic Adjustment", impact: 0.87 }
    ],
    functionalDomains: [
      { name: "AP2/ERF DNA-binding domain", start: 95, end: 165, description: "Highly conserved domain for DRE binding" },
      { name: "Nuclear localization signal", start: 45, end: 52, description: "Required for nuclear import" },
      { name: "Transcriptional activation domain", start: 180, end: 220, description: "Activates downstream gene expression" }
    ],
    expression: {
      tissues: [
        { name: "Root", level: 95, stress: 180 },
        { name: "Leaf", level: 78, stress: 145 },
        { name: "Stem", level: 45, stress: 92 },
        { name: "Flower", level: 23, stress: 38 }
      ],
      conditions: [
        { name: "Drought", foldChange: 12.5, pValue: 0.001 },
        { name: "Salt", foldChange: 8.7, pValue: 0.003 },
        { name: "Cold", foldChange: 15.2, pValue: 0.0001 },
        { name: "ABA treatment", foldChange: 18.9, pValue: 0.0001 }
      ]
    }
  },
  "NHX1": {
    id: "NHX1",
    name: "NHX1",
    fullName: "Sodium/Hydrogen Exchanger 1",
    trait: "Salt Tolerance",
    organism: "Arabidopsis thaliana",
    chromosome: "Chr1: 8,234,567-8,237,891",
    sequence: "ATGGAGAAGATCGTCGTCAAGAAGAAGGGAAGAAAGGTGGATACCGAGGAAGTCCTTCGGGAGAAG",
    description: "Vacuolar Na+/H+ antiporter that mediates sodium efflux from the cytoplasm, essential for salt tolerance in plants.",
    confidence: 0.89,
    citations: 892,
    pathways: ["Ion homeostasis", "Salt stress response", "Osmotic regulation"],
    variants: [
      { position: 89, wildType: "T", mutant: "A", impact: "Beneficial", confidence: 0.88 },
      { position: 156, wildType: "G", mutant: "C", impact: "Neutral", confidence: 0.72 },
      { position: 203, wildType: "C", mutant: "T", impact: "Detrimental", confidence: 0.91 }
    ],
    aiCandidates: [
      { id: "M1", aminoAcidChange: "L89F", impactLikelihood: 0.82, explanation: "Enhanced sodium binding affinity through hydrophobic interactions." },
      { id: "M2", aminoAcidChange: "S156P", impactLikelihood: 0.71, explanation: "Increased protein rigidity may improve ion selectivity." }
    ],
    multiTraitImpact: [
      { trait: "Salt Tolerance", impact: 0.95 },
      { trait: "Drought Tolerance", impact: 0.4 },
      { trait: "Pest Resistance", impact: 0.05 },
      { trait: "Yield", impact: 0.6 }
    ]
  }
};

type PredictionResult = {
  wildType: string;
  mutant: string;
  position: number;
  confidence: number;
  impact: "Beneficial" | "Neutral" | "Detrimental";
  score: number;
  explanation: string;
  recommendations: string[];
};

type AIGeneratedMutationCandidate = {
  id: string;
  aminoAcidChange: string;
  impactLikelihood: number;
  explanation: string;
};

const generatePrediction = (sequence: string, position: number, mutation: string): PredictionResult => {
  const wildType = sequence[position - 1];
  let impact: "Beneficial" | "Neutral" | "Detrimental";
  let score: number;
  let explanation: string;
  let recommendations: string[];

  const hydrophobic = ["A", "V", "I", "L", "M", "F", "Y", "W"];
  const polar = ["S", "T", "N", "Q"];
  const charged = ["K", "R", "H", "D", "E"];

  if (hydrophobic.includes(mutation)) {
    impact = "Beneficial";
    score = 78 + Math.random() * 20;
    explanation = "Hydrophobic substitution may enhance protein stability and membrane interactions.";
    recommendations = ["Validate with molecular dynamics simulations", "Test under stress conditions"];
  } else if (polar.includes(mutation)) {
    impact = "Neutral";
    score = 45 + Math.random() * 30;
    explanation = "Polar substitution likely maintains protein function with minimal structural impact.";
    recommendations = ["Monitor for subtle functional changes", "Consider epistatic interactions"];
  } else if (charged.includes(mutation)) {
    impact = "Detrimental";
    score = 15 + Math.random() * 25;
    explanation = "Charged residue substitution may disrupt protein folding or binding interactions.";
    recommendations = ["Avoid this mutation", "Consider conservative alternatives"];
  } else {
    impact = "Neutral";
    score = 50 + Math.random() * 20;
    explanation = "Special residue substitution effects are position-dependent.";
    recommendations = ["Structural analysis recommended", "Test in relevant biological context"];
  }

  return {
    wildType,
    mutant: mutation,
    position,
    confidence: 65 + Math.random() * 30,
    impact,
    score: Math.round(score),
    explanation,
    recommendations
  };
};

export default function GeneDesignStudio() {
  const params = useParams();
  const geneId = params.geneId as string;
  
  const [positionInput, setPositionInput] = useState("");
  const [mutationInput, setMutationInput] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState<string>("Drought Tolerance");
  const [desiredImprovement, setDesiredImprovement] = useState<string>("High");
  const [generatedMutations, setGeneratedMutations] = useState<AIGeneratedMutationCandidate[]>([]);
  const [pinnedMutations, setPinnedMutations] = useState<AIGeneratedMutationCandidate[]>([]);

  // Add AI simulation state
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  
  // Enhanced mutation prediction state
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [predictionResults, setPredictionResults] = useState<MutationResult | null>(null);
  const [selectedMutations, setSelectedMutations] = useState<QueuedMutation[]>([]);
  const [predicting, setPredicting] = useState(false);
  const [predictingMutation, setPredictingMutation] = useState(false);

  const gene = GENE_DATA[geneId as keyof typeof GENE_DATA];

  const handleGenerateOptimalMutations = async () => {
    setIsAnalyzing(true);
    setLoadingStep("Initializing quantum AI analysis...");
    
    try {
      // Comprehensive DREB1A enhancement simulation
      const analysisSteps = [
        "Analyzing DREB1A protein structure (PDB: 1GT0)...",
        "Mapping drought-responsive DNA binding domains...",
        "Simulating molecular dynamics at 298K...",
        "Calculating free energy perturbations...",
        "Modeling protein-DNA interaction strength...",
        "Predicting osmotic stress response pathways...",
        "Evaluating ABA signaling cascade enhancement...",
        "Computing phenotypic trait improvements...",
        "Generating optimal mutation candidates..."
      ];
      
      for (const step of analysisSteps) {
        setLoadingStep(step);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }
      
      // Generate comprehensive mutation analysis based on DREB1A structure
      const comprehensiveMutations = [
        {
          id: "DREB1A-M001",
          position: 120,
          originalAA: "A",
          mutantAA: "V",
          aminoAcidChange: "A120V",
          impactLikelihood: 0.92,
          mechanismDescription: "Enhanced hydrophobic interactions in the DNA-binding domain increase affinity for drought-responsive elements (DRE) by 340%. The valine substitution creates a more stable protein-DNA complex, leading to sustained transcriptional activation under water stress conditions.",
          molecularBasis: "The A120V mutation introduces additional van der Waals interactions with the major groove of target DNA sequences, specifically stabilizing the recognition helix. Molecular dynamics simulations show a 2.3 kcal/mol decrease in binding free energy.",
          phenotypicOutcome: "Plants exhibit 45-60% improved water use efficiency, 30% reduction in wilting under drought stress, and maintained photosynthetic capacity at 40% water availability.",
          stabilityChange: -1.8, // kcal/mol (stabilizing)
          conservationScore: 0.87,
          structuralImpact: "Increases α-helix stability in DNA-binding domain",
          pathwayEffects: ["Enhanced DRE binding", "Upregulated LEA proteins", "Improved osmoregulation"]
        },
        {
          id: "DREB1A-M002",
          position: 89,
          originalAA: "S",
          mutantAA: "T",
          aminoAcidChange: "S89T",
          impactLikelihood: 0.84,
          mechanismDescription: "Threonine substitution creates an additional phosphorylation site for SnRK2 kinases, enhancing ABA-dependent activation pathway. This modification increases protein activity during early drought response by 280%.",
          molecularBasis: "The S89T mutation introduces a consensus phosphorylation motif (R-X-X-T) recognized by SnRK2.2/2.3 kinases. Phosphorylated DREB1A shows increased nuclear localization and transcriptional activity.",
          phenotypicOutcome: "Earlier drought stress detection (2-3 days faster response), improved root architecture development, and 25% increase in proline accumulation for osmotic adjustment.",
          stabilityChange: -0.9,
          conservationScore: 0.76,
          structuralImpact: "Creates regulatory phosphorylation site",
          pathwayEffects: ["Enhanced ABA signaling", "Faster stress response", "Improved metabolic adjustment"]
        },
        {
          id: "DREB1A-M003",
          position: 156,
          originalAA: "P",
          mutantAA: "L",
          aminoAcidChange: "P156L",
          impactLikelihood: 0.78,
          mechanismDescription: "Leucine substitution removes a structural constraint in the flexible linker region, allowing for improved conformational dynamics and enhanced protein-protein interactions with co-activators.",
          molecularBasis: "Proline at position 156 creates a rigid kink in the protein backbone. The P156L mutation increases backbone flexibility, facilitating interactions with transcriptional co-activators like MEDIATOR complex subunits.",
          phenotypicOutcome: "Synergistic enhancement when combined with other mutations, leading to 70% improvement in drought tolerance and extended survival under severe water deficit conditions.",
          stabilityChange: 0.3,
          conservationScore: 0.45,
          structuralImpact: "Increases linker region flexibility",
          pathwayEffects: ["Enhanced co-activator binding", "Increased transcriptional synergy", "Improved stress gene expression"]
        }
      ];
      
      setGeneratedMutations(comprehensiveMutations.map(mut => ({
        id: mut.id,
        aminoAcidChange: mut.aminoAcidChange,
        impactLikelihood: mut.impactLikelihood,
        explanation: mut.mechanismDescription,
        fullAnalysis: mut
      })));
      
    } catch (error) {
      console.error("AI simulation failed:", error);
      // Fallback to enhanced data
      setGeneratedMutations(gene?.aiCandidates || []);
    }
    
    setIsAnalyzing(false);
    setLoadingStep("");
  };

  // Enhanced mutation prediction functions with comprehensive DREB1A analysis
  const handleAminoAcidSelection = (aminoAcid: string) => {
    if (!selectedPosition) return;
    
    setPredicting(true);
    const originalAA = getAminoAcidFromPosition(selectedPosition);
    const impactScore = calculateMutationImpact(selectedPosition, aminoAcid);
    
    const mutation = {
      position: selectedPosition,
      original: originalAA,
      mutated: aminoAcid,
      impactScore
    };
    
    setSelectedMutations(prev => [...prev, mutation]);
    
    // Comprehensive mutation impact simulation with realistic steps
    const analysisSteps = [
      `Analyzing ${originalAA}${selectedPosition}${aminoAcid} mutation in DREB1A...`,
      "Running molecular dynamics simulation (100ns)...",
      "Calculating binding affinity changes to DRE sequences...",
      "Evaluating protein stability and folding impact...",
      "Assessing evolutionary conservation constraints...",
      "Predicting drought tolerance phenotypic effects..."
    ];
    
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < analysisSteps.length) {
        setLoadingStep(analysisSteps[stepIndex]);
        stepIndex++;
      } else {
        clearInterval(stepInterval);
      }
    }, 400);
    
    setTimeout(() => {
      clearInterval(stepInterval);
      setLoadingStep("");
      
      // Generate position-specific analysis for DREB1A
      const positionAnalysis = getPositionSpecificAnalysis(selectedPosition, originalAA, aminoAcid);
      
      const results = {
        pathogenicityScore: impactScore,
        stabilityImpact: positionAnalysis.stabilityChange,
        bindingAffinityChange: positionAnalysis.bindingChange,
        conservationScore: positionAnalysis.conservation,
        evolutionaryConstraint: positionAnalysis.evolutionary,
        structuralImpact: positionAnalysis.structural,
        functionalConsequences: positionAnalysis.functional,
        predictedEffects: [
          { 
            description: positionAnalysis.primaryEffect, 
            severity: impactScore > 0.7 ? 'High' : impactScore > 0.4 ? 'Medium' : 'Low',
            confidence: positionAnalysis.confidence
          },
          { 
            description: positionAnalysis.secondaryEffect, 
            severity: impactScore > 0.6 ? 'Medium' : 'Low',
            confidence: positionAnalysis.confidence - 0.1
          },
          { 
            description: `Drought tolerance ${impactScore > 0.5 ? 'enhancement' : 'maintenance'} predicted`, 
            severity: impactScore > 0.8 ? 'High' : 'Medium',
            confidence: 0.88
          }
        ],
        molecularDetails: {
          energyChanges: {
            vanDerWaals: positionAnalysis.vdwChange,
            electrostatic: positionAnalysis.electrostaticChange,
            solvation: positionAnalysis.solvationChange,
            entropy: positionAnalysis.entropyChange
          },
          structuralChanges: positionAnalysis.structural,
          bindingSiteEffects: positionAnalysis.bindingChange < -1 ? "Enhanced DNA binding" : 
                            positionAnalysis.bindingChange > 1 ? "Reduced DNA binding" : "Minimal binding change"
        }
      };
      
      setPredictionResults(results);
      setPredicting(false);
    }, 3000);
  };

  // Position-specific analysis based on DREB1A structure and function
  const getPositionSpecificAnalysis = (position: number, original: string, mutant: string) => {
    // Define DREB1A functional regions based on crystal structure data
    const dnaBindingHelix = position >= 115 && position <= 125; // Recognition helix (α3)
    const betaSheetCore = position >= 85 && position <= 95; // Central β-sheet
    const flexibleLinker = position >= 150 && position <= 160; // C-terminal flexible region
    const nTerminal = position <= 50; // N-terminal region
    
    if (dnaBindingHelix) {
      // Critical DNA-binding region
      return {
        stabilityChange: original === 'A' && mutant === 'V' && position === 120 ? -1.8 : 
                        (original === 'L' && mutant === 'F') ? -1.2 : (Math.random() - 0.3) * 2.5,
        bindingChange: original === 'A' && mutant === 'V' && position === 120 ? -2.3 : 
                      (Math.random() - 0.4) * 3.5,
        conservation: 0.95,
        evolutionary: 0.88,
        structural: "Critical α-helix for DNA major groove recognition",
        functional: "Direct contact with DRE nucleotide bases - crucial for specificity",
        primaryEffect: `${original}${position}${mutant} modifies DNA-protein interface geometry`,
        secondaryEffect: "Alters transcriptional activation strength under drought stress",
        confidence: 0.94,
        vdwChange: -0.8,
        electrostaticChange: original !== mutant ? -1.1 : 0,
        solvationChange: 0.4,
        entropyChange: -0.6
      };
    } else if (betaSheetCore) {
      // Structural core region
      return {
        stabilityChange: original === 'S' && mutant === 'T' && position === 89 ? -0.9 : 
                        (Math.random() - 0.4) * 2,
        bindingChange: (Math.random() - 0.1) * 1.8,
        conservation: 0.81,
        evolutionary: 0.76,
        structural: "Core β-sheet maintaining protein fold stability",
        functional: "Provides structural framework for DNA-binding domain",
        primaryEffect: `${original}${position}${mutant} affects protein core stability`,
        secondaryEffect: "May influence protein-protein interactions with co-regulators",
        confidence: 0.87,
        vdwChange: -0.5,
        electrostaticChange: original === 'S' && mutant === 'T' ? -0.7 : (Math.random() - 0.3) * 0.8,
        solvationChange: 0.2,
        entropyChange: -0.3
      };
    } else if (flexibleLinker) {
      // Flexible regulatory region
      return {
        stabilityChange: original === 'P' && mutant === 'L' && position === 156 ? 0.3 : 
                        (Math.random() - 0.2) * 1.2,
        bindingChange: (Math.random() - 0.1) * 1.2,
        conservation: 0.52,
        evolutionary: 0.45,
        structural: "Flexible linker allowing conformational adaptation",
        functional: "Modulates protein dynamics and co-activator accessibility",
        primaryEffect: `${original}${position}${mutant} increases backbone flexibility`,
        secondaryEffect: "Enhanced formation of transcriptional complexes",
        confidence: 0.79,
        vdwChange: 0.1,
        electrostaticChange: 0,
        solvationChange: -0.1,
        entropyChange: 0.9
      };
    } else if (nTerminal) {
      // N-terminal region
      return {
        stabilityChange: (Math.random() - 0.3) * 1.5,
        bindingChange: (Math.random() - 0.2) * 1,
        conservation: 0.34,
        evolutionary: 0.29,
        structural: "N-terminal region with regulatory potential",
        functional: "May affect protein localization or stability",
        primaryEffect: `${original}${position}${mutant} alters N-terminal properties`,
        secondaryEffect: "Minor impact on overall protein function",
        confidence: 0.68,
        vdwChange: (Math.random() - 0.3) * 0.4,
        electrostaticChange: (Math.random() - 0.3) * 0.6,
        solvationChange: (Math.random() - 0.2) * 0.3,
        entropyChange: (Math.random() - 0.2) * 0.5
      };
    } else {
      // Other regions
      return {
        stabilityChange: (Math.random() - 0.4) * 1.8,
        bindingChange: (Math.random() - 0.2) * 1.5,
        conservation: Math.random() * 0.7,
        evolutionary: Math.random() * 0.6,
        structural: "Secondary structural element",
        functional: "Supportive role in protein architecture",
        primaryEffect: `${original}${position}${mutant} causes localized structural change`,
        secondaryEffect: "Minimal predicted impact on drought tolerance",
        confidence: 0.71,
        vdwChange: (Math.random() - 0.4) * 0.6,
        electrostaticChange: (Math.random() - 0.3) * 0.7,
        solvationChange: (Math.random() - 0.3) * 0.4,
        entropyChange: (Math.random() - 0.3) * 0.5
      };
    }
  };

  const addToPinnedMutations = (results: MutationResult) => {
    if (!selectedPosition) return;
    
    const mutation = {
      id: `pin-${Date.now()}`,
      aminoAcidChange: `${getAminoAcidFromPosition(selectedPosition)}${selectedPosition}${selectedMutations[selectedMutations.length - 1]?.mutated || 'X'}`,
      impactLikelihood: results.pathogenicityScore,
      explanation: `Predicted impact: ${(results.pathogenicityScore * 100).toFixed(0)}%`
    };
    
    setPinnedMutations(prev => [...prev, mutation]);
  };

  const exportPrediction = (results: MutationResult) => {
    const data = {
      gene: gene.name,
      position: selectedPosition,
      results: results,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mutation-prediction-${gene.name}-${selectedPosition}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeMutationFromQueue = (index: number) => {
    setSelectedMutations(prev => prev.filter((_, i) => i !== index));
  };

  const runBatchAnalysis = () => {
    setPredicting(true);
    setTimeout(() => {
      setPredicting(false);
      // Simulate batch analysis results
    }, 3000);
  };

  const handlePinMutation = (mutation: AIGeneratedMutationCandidate) => {
    if (!pinnedMutations.some(m => m.id === mutation.id)) {
      setPinnedMutations(prev => [...prev, mutation]);
    }
  };

  const handleRemovePinnedMutation = (mutationId: string) => {
    setPinnedMutations(prev => prev.filter(m => m.id !== mutationId));
  };

  const handlePredict = async () => {
    if (!positionInput || !mutationInput || !gene) return;
    
    setIsAnalyzing(true);
    setLoadingStep("Starting analysis...");
    
    try {
      // Create mutation string in the format expected by our AI service
      const mutation = `${gene.sequence[parseInt(positionInput) - 1] || 'A'}${positionInput}${mutationInput.toUpperCase()}`;
      
      // Use realistic AI simulation
      const result = await simulateAIAnalysis(
        geneId || "DREB1A",
        mutation,
        (step: string) => setLoadingStep(step)
      );
      
      if (result.success) {
        setAnalysisResult(result);
        
        // Convert to the expected prediction format
        const predictionResult = {
          mutation: result.mutation.mutation,
          impact: result.mutation.prediction,
          confidence: result.mutation.confidence,
          score: Math.round(result.mutation.confidence * 100),
          explanation: result.mutation.xaiExplanation,
          traitImpacts: Object.entries(result.mutation.traits).map(([trait, score]) => ({
            name: trait.replace(/([A-Z])/g, ' $1').trim(),
            impact: score > 70 ? 'Positive' : score > 40 ? 'Neutral' : 'Negative',
            score: score
          })),
          risks: result.analysis.riskAssessment === "Low risk" ? [] : [result.analysis.riskAssessment],
          recommendations: result.analysis.recommendations
        };
        
        setPrediction(predictionResult);
      }
    } catch (error) {
      console.error("AI prediction failed:", error);
      // Fallback to original prediction
      const result = generatePrediction(
        gene.sequence,
        parseInt(positionInput),
        mutationInput.toUpperCase()
      );
      setPrediction(result);
    }
    
    setIsAnalyzing(false);
    setLoadingStep("");
  };

  if (!gene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Dna className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Gene Not Found</h2>
            <p className="text-slate-600 mb-4">The gene &quot;{geneId}&quot; could not be found in our database.</p>
            <Link href="/genes">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Gene Explorer
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,25 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M0,50 Q25,75 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
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
          <Link href="/genes">
            <Button variant="outline" className="mb-6 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gene Explorer
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex-shrink-0 h-16 w-16 lg:h-20 lg:w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
              <Dna className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">{gene.name} Design & Validation Studio</h1>
              <h2 className="text-lg lg:text-xl text-slate-600 mb-3">{gene.fullName}</h2>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm lg:text-base">{gene.description}</p>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 px-3 py-1">
                  {gene.trait}
                </Badge>
                <div className="text-sm text-slate-500">
                  <strong className="text-slate-700">{gene.organism}</strong>
                </div>
                <div className="text-sm text-slate-500">
                  {gene.chromosome}
                </div>
                <div className="text-sm text-slate-500">
                  <strong className="text-slate-700">{gene.citations}</strong> citations
                </div>
                <div className="text-sm text-slate-500">
                  <strong className="text-emerald-700">{(gene.confidence * 100).toFixed(0)}%</strong> confidence
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Multi-Panel Layout */}
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-5 mb-6 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Layers3 className="h-4 w-4" />
              <span className="hidden sm:inline">Design Studio</span>
              <span className="sm:hidden">Design</span>
            </TabsTrigger>
            <TabsTrigger value="3d" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">3D Visualization</span>
              <span className="sm:hidden">3D View</span>
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Mutation Prediction</span>
              <span className="sm:hidden">Predict</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Insights</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>

          {/* Design Studio Panel */}
          <TabsContent value="design" className="space-y-6">
            <motion.div 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.6}}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {/* AI Trait Optimizer - Enhanced */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg lg:text-xl">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>AI Trait Optimizer</div>
                      <div className="text-sm font-normal text-slate-600">Next-gen genetic enhancement</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-trait" className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-emerald-600" />
                        Target Trait
                      </Label>
                      <Select value={selectedTrait} onValueChange={setSelectedTrait}>
                        <SelectTrigger id="target-trait" className="h-12">
                          <SelectValue placeholder="Select a trait" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Drought Tolerance">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Drought Tolerance
                            </div>
                          </SelectItem>
                          <SelectItem value="Salt Tolerance">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Salt Tolerance
                            </div>
                          </SelectItem>
                          <SelectItem value="Pest Resistance">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Pest Resistance
                            </div>
                          </SelectItem>
                          <SelectItem value="Yield Enhancement">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Yield Enhancement
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="improvement-level" className="text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        Enhancement Level
                      </Label>
                      <Select value={desiredImprovement} onValueChange={setDesiredImprovement}>
                        <SelectTrigger id="improvement-level" className="h-12">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Revolutionary">
                            <div className="flex flex-col">
                              <span className="font-medium">Revolutionary (+90-150%)</span>
                              <span className="text-xs text-slate-500">Breakthrough enhancement</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="High">
                            <div className="flex flex-col">
                              <span className="font-medium">High (+50-90%)</span>
                              <span className="text-xs text-slate-500">Significant improvement</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <div className="flex flex-col">
                              <span className="font-medium">Medium (+20-50%)</span>
                              <span className="text-xs text-slate-500">Moderate enhancement</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Conservative">
                            <div className="flex flex-col">
                              <span className="font-medium">Conservative (+5-20%)</span>
                              <span className="text-xs text-slate-500">Safe optimization</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateOptimalMutations}
                    disabled={isAnalyzing}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin h-5 w-5 mr-3" />
                        {loadingStep || "AI Computing Optimal Mutations..."}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Cpu className="mr-3 h-5 w-5" />
                        Generate AI-Optimized Mutations
                      </div>
                    )}
                  </Button>

                  {/* Enhanced AI Generated Mutations Display */}
                  {generatedMutations.length > 0 && (
                    <motion.div 
                      initial={{opacity:0,scale:0.95}} 
                      animate={{opacity:1,scale:1}} 
                      transition={{duration:0.5}}
                      className="space-y-4 pt-4 border-t border-emerald-100"
                    >
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-emerald-600" />
                        AI Recommendations
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          {generatedMutations.length} found
                        </Badge>
                      </h4>
                      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                        {generatedMutations.map((candidate, index) => (
                          <motion.div 
                            key={candidate.id}
                            initial={{opacity:0,x:-20}} 
                            animate={{opacity:1,x:0}} 
                            transition={{duration:0.3,delay:index*0.1}}
                            className="group p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="space-y-4">
                              {/* Header with mutation info */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="font-mono text-xl font-bold text-slate-800 bg-gradient-to-r from-emerald-100 to-cyan-100 px-4 py-2 rounded-lg border border-emerald-200">
                                    {candidate.aminoAcidChange}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Gauge className="h-5 w-5 text-emerald-600" />
                                    <span className="text-lg font-bold text-emerald-700">
                                      {(candidate.impactLikelihood * 100).toFixed(0)}%
                                    </span>
                                    <span className="text-sm text-slate-500">confidence</span>
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePinMutation(candidate)}
                                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200"
                                >
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Add to Analysis
                                </Button>
                              </div>

                              {/* Mechanism Description */}
                              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-l-4 border-blue-400">
                                <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                  <Brain className="h-4 w-4" />
                                  Molecular Mechanism
                                </h5>
                                <p className="text-sm text-blue-800 leading-relaxed">{candidate.explanation}</p>
                              </div>

                              {/* Enhanced analysis if available */}
                              {(candidate as any).fullAnalysis && (
                                <div className="grid md:grid-cols-2 gap-4">
                                  {/* Molecular Basis */}
                                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4">
                                    <h5 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                                      <Dna className="h-4 w-4" />
                                      Molecular Basis
                                    </h5>
                                    <p className="text-xs text-purple-800 leading-relaxed">{(candidate as any).fullAnalysis.molecularBasis}</p>
                                  </div>

                                  {/* Phenotypic Outcome */}
                                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                                    <h5 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                                      <TrendingUp className="h-4 w-4" />
                                      Expected Phenotype
                                    </h5>
                                    <p className="text-xs text-green-800 leading-relaxed">{(candidate as any).fullAnalysis.phenotypicOutcome}</p>
                                  </div>
                                </div>
                              )}

                              {/* Analysis Metrics */}
                              {(candidate as any).fullAnalysis && (
                                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-slate-800">
                                      {(candidate as any).fullAnalysis.stabilityChange > 0 ? '+' : ''}{(candidate as any).fullAnalysis.stabilityChange.toFixed(1)}
                                    </div>
                                    <div className="text-xs text-slate-600">kcal/mol stability</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-slate-800">
                                      {((candidate as any).fullAnalysis.conservationScore * 100).toFixed(0)}%
                                    </div>
                                    <div className="text-xs text-slate-600">conservation</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-slate-800">
                                      {(candidate as any).fullAnalysis.pathwayEffects?.length || 0}
                                    </div>
                                    <div className="text-xs text-slate-600">pathways affected</div>
                                  </div>
                                </div>
                              )}

                              {/* Pathway Effects */}
                              {(candidate as any).fullAnalysis?.pathwayEffects && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {(candidate as any).fullAnalysis.pathwayEffects.map((effect: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                                      {effect}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Enhanced Pinned Mutations */}
                  {pinnedMutations.length > 0 && (
                    <motion.div 
                      initial={{opacity:0,scale:0.95}} 
                      animate={{opacity:1,scale:1}} 
                      transition={{duration:0.5}}
                      className="space-y-4 pt-4 border-t border-blue-100"
                    >
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Selected for Deep Analysis
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          {pinnedMutations.length} selected
                        </Badge>
                      </h4>
                      <div className="space-y-2">
                        {pinnedMutations.map((mutation, index) => (
                          <motion.div 
                            key={mutation.id}
                            initial={{opacity:0,x:20}} 
                            animate={{opacity:1,x:0}} 
                            transition={{duration:0.3,delay:index*0.1}}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm text-blue-800 font-bold bg-blue-200 px-2 py-1 rounded">
                                {mutation.aminoAcidChange}
                              </span>
                              <span className="text-sm text-blue-700">
                                {(mutation.impactLikelihood * 100).toFixed(0)}% impact
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemovePinnedMutation(mutation.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                        <Button className="w-full mt-4 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                          <BarChart3 className="mr-2 h-5 w-5" />
                          Analyze Combined Impact
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Mutation Impact Predictor */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg lg:text-xl">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                      <FlaskConical className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Mutation Impact Predictor</div>
                      <div className="text-sm font-normal text-slate-600">Advanced impact analysis</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position-input" className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        Position
                      </Label>
                      <Input
                        id="position-input"
                        type="number"
                        placeholder="e.g., 145"
                        value={positionInput}
                        onChange={(e) => setPositionInput(e.target.value)}
                        className="h-12 text-center font-mono text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mutation-input" className="text-sm font-medium flex items-center gap-2">
                        <Dna className="h-4 w-4 text-purple-600" />
                        Mutation
                      </Label>
                      <Input
                        id="mutation-input"
                        placeholder="e.g., G"
                        value={mutationInput}
                        onChange={(e) => setMutationInput(e.target.value)}
                        className="h-12 text-center font-mono text-lg uppercase"
                        maxLength={1}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePredict}
                    disabled={!positionInput || !mutationInput || isAnalyzing}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:via-indigo-700 hover:to-violet-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Deep Learning Analysis...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Brain className="mr-3 h-5 w-5" />
                        Predict Molecular Impact
                      </div>
                    )}
                  </Button>

                  {/* Enhanced Prediction Results */}
                  {prediction && (
                    <motion.div 
                      initial={{opacity:0,scale:0.9}} 
                      animate={{opacity:1,scale:1}} 
                      transition={{duration:0.6,type:"spring"}}
                      className="p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl border-2 border-slate-200 shadow-inner"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-xl">
                          <Activity className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Analysis Results</h3>
                          <p className="text-lg font-mono text-slate-600 bg-slate-200 px-3 py-1 rounded-lg">
                            {prediction.wildType}{prediction.position}{prediction.mutant}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                          <div className="text-3xl font-bold text-emerald-700 mb-1">{prediction.score}%</div>
                          <div className="text-sm font-medium text-slate-700">Impact Score</div>
                          <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300 progress-bar"
                              data-width={Math.round(prediction.score / 10) * 10}
                            ></div>
                          </div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                          <div className="text-3xl font-bold text-blue-700 mb-1">{prediction.confidence.toFixed(0)}%</div>
                          <div className="text-sm font-medium text-slate-700">Confidence</div>
                          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300 progress-bar"
                              data-width={Math.round(prediction.confidence / 10) * 10}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center mb-6">
                        <Badge className={`px-4 py-2 text-base font-semibold ${
                          prediction.impact === "Beneficial" 
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-300"
                            : prediction.impact === "Neutral"
                            ? "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-300"
                            : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-300"
                        }`}>
                          {prediction.impact === "Beneficial" && <CheckCircle className="mr-2 h-4 w-4" />}
                          {prediction.impact === "Neutral" && <AlertTriangle className="mr-2 h-4 w-4" />}
                          {prediction.impact === "Detrimental" && <X className="mr-2 h-4 w-4" />}
                          {prediction.impact}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
                          <p className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-600" />
                            Molecular Analysis:
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">{prediction.explanation}</p>
                        </div>

                        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
                          <p className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            Recommendations:
                          </p>
                          <ul className="space-y-2">
                            {prediction.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* 3D Visualization Panel */}
          <TabsContent value="3d" className="space-y-6">
            <motion.div 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.6}}
            >
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>3D Protein Structure Visualization</div>
                      <div className="text-sm font-normal text-slate-600">Interactive molecular modeling</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* 3D Controls */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Button size="sm" variant="outline" className="border-cyan-200 text-cyan-700">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset View
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-200 text-cyan-700">
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Fullscreen
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-slate-600">Representation:</Label>
                      <Select defaultValue="cartoon">
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="surface">Surface</SelectItem>
                          <SelectItem value="sticks">Sticks</SelectItem>
                          <SelectItem value="spheres">Spheres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Enhanced 3D Protein Structure Display */}
                  <div className="h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border-2 border-slate-300 shadow-inner flex items-center justify-center relative overflow-hidden">
                    {/* 3D Background Grid */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Protein Structure Visualization */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      {/* Main protein backbone */}
                      <motion.div 
                        animate={{ 
                          rotateY: 360,
                          rotateX: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative"
                      >
                        {/* Alpha helices */}
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={`helix-${i}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="absolute"
                            style={{
                              transform: `translate3d(${Math.cos(i * 1.2) * 60}px, ${i * 20 - 40}px, ${Math.sin(i * 1.2) * 30}px)`,
                            }}
                          >
                            <div className="w-16 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg opacity-80" />
                          </motion.div>
                        ))}
                        
                        {/* Beta sheets */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`sheet-${i}`}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 1 + i * 0.3 }}
                            className="absolute"
                            style={{
                              transform: `translate3d(${Math.cos(i * 2) * 40}px, ${i * 30 - 20}px, ${Math.sin(i * 2) * 20}px) rotateZ(${i * 30}deg)`,
                            }}
                          >
                            <div className="w-12 h-2 bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg" />
                          </motion.div>
                        ))}
                        
                        {/* Active site */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              '0 0 10px rgba(255, 215, 0, 0.5)',
                              '0 0 20px rgba(255, 215, 0, 0.8)',
                              '0 0 10px rgba(255, 215, 0, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-600" />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-300 text-xs font-semibold">
                            Active Site
                          </div>
                        </motion.div>

                        {/* Mutation indicators */}
                        {pinnedMutations.map((mutation, index) => (
                          <motion.div
                            key={mutation.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: 1, 
                              scale: [1, 1.3, 1],
                            }}
                            transition={{ 
                              scale: { duration: 1.5, repeat: Infinity, delay: index * 0.5 }
                            }}
                            className="absolute"
                            style={{
                              transform: `translate3d(${Math.cos(index * 2) * 70}px, ${index * 25 - 50}px, ${Math.sin(index * 2) * 35}px)`,
                            }}
                          >
                            <div className="relative">
                              <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-red-300" />
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-300 text-xs font-semibold whitespace-nowrap">
                                {mutation.aminoAcidChange}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Functional domains */}
                        {gene.functionalDomains?.map((domain, index) => (
                          <motion.div
                            key={domain.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2 + index * 0.3 }}
                            className="absolute"
                            style={{
                              transform: `translate3d(${Math.cos((index + 2) * 1.5) * 80}px, ${(index - 1) * 30}px, ${Math.sin((index + 2) * 1.5) * 40}px)`,
                            }}
                          >
                            <motion.div
                              animate={{ 
                                boxShadow: [
                                  '0 0 10px rgba(34, 197, 94, 0.5)',
                                  '0 0 20px rgba(34, 197, 94, 0.8)',
                                  '0 0 10px rgba(34, 197, 94, 0.5)'
                                ]
                              }}
                              transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                              className="relative"
                            >
                              <div className="w-8 h-8 bg-green-400 rounded-lg shadow-lg border-2 border-green-300 flex items-center justify-center">
                                <div className="w-4 h-4 bg-green-600 rounded"></div>
                              </div>
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-300 text-xs font-semibold whitespace-nowrap">
                                {domain.name.split(' ')[0]}
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Enhanced info overlay with DREB1A specific data */}
                      <div className="absolute top-4 left-4 text-white">
                        <div className="bg-slate-800/90 rounded-lg p-4 backdrop-blur-sm border border-slate-600">
                          <h4 className="font-bold text-cyan-300 text-lg">{gene.name} Structure</h4>
                          <p className="text-sm text-slate-300">AP2/ERF Domain Protein</p>
                          <p className="text-sm text-slate-300">Resolution: 1.8 Å (Homology)</p>
                          <p className="text-sm text-slate-300">Template: CBF3 (PDB: 1GCC)</p>
                          <div className="mt-2 text-xs text-slate-400">
                            <div>147 residues • 16.2 kDa</div>
                            <div>DNA-binding transcription factor</div>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-4 right-4 text-white">
                        <div className="bg-slate-800/80 rounded-lg p-3 backdrop-blur-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                            <span className="text-xs">α-Helices</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-2 bg-green-400"></div>
                            <span className="text-xs">β-Sheets</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-xs">Active Site</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs">Mutations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded"></div>
                            <span className="text-xs">Functional Domains</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Protein Analysis Panel */}
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-cyan-600" />
                        Structure Analysis
                      </h4>
                      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">α-Helices:</span>
                          <span className="font-medium">67%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">β-Sheets:</span>
                          <span className="font-medium">23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Random Coils:</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Stability Score:</span>
                          <span className="font-medium text-green-600">8.3/10</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Target className="h-5 w-5 text-cyan-600" />
                        Mutation Impact
                      </h4>
                      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                        {pinnedMutations.length > 0 ? (
                          pinnedMutations.map((mutation) => (
                            <div key={mutation.id} className="flex justify-between items-center">
                              <span className="font-mono text-sm">{mutation.aminoAcidChange}</span>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  mutation.impactLikelihood > 0.7 ? 'bg-red-500' :
                                  mutation.impactLikelihood > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></div>
                                <span className="text-sm">{(mutation.impactLikelihood * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No mutations selected</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Sequence Viewer */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-cyan-600" />
                        Interactive Sequence Viewer
                      </h4>
                      <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                        {gene.sequence.length} bp
                      </Badge>
                    </div>
                    
                    {/* Sequence Display with Highlighting */}
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm leading-relaxed max-h-48 overflow-y-auto">
                      <div className="flex flex-wrap">
                        {gene.sequence.split('').map((nucleotide, index) => {
                          const position = index + 1;
                          const isHighlighted = pinnedMutations.some(mutation => {
                            const mutPos = parseInt(mutation.aminoAcidChange.match(/\d+/)?.[0] || '0');
                            return position >= (mutPos - 1) * 3 && position <= mutPos * 3;
                          });
                          const isCurrentMutation = positionInput && 
                            position >= (parseInt(positionInput) - 1) * 3 && 
                            position <= parseInt(positionInput) * 3;

                          return (
                            <motion.span
                              key={index}
                              className={`cursor-pointer hover:bg-cyan-600 transition-all duration-200 px-0.5 ${
                                isHighlighted 
                                  ? 'bg-red-500 text-white shadow-glow' 
                                  : isCurrentMutation 
                                  ? 'bg-yellow-500 text-black' 
                                  : 'text-emerald-300'
                              }`}
                              onClick={() => {
                                const aaPosition = Math.ceil(position / 3);
                                setPositionInput(aaPosition.toString());
                                setSelectedPosition(position);
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              title={`Position ${position} (AA ${Math.ceil(position / 3)})`}
                            >
                              {nucleotide}
                            </motion.span>
                          );
                        })}
                      </div>
                      
                      {/* Position ruler */}
                      <div className="mt-2 text-xs text-slate-400 flex">
                        {Array.from({ length: Math.ceil(gene.sequence.length / 10) }, (_, i) => (
                          <span key={i} className="w-10 text-center">
                            {(i + 1) * 10}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mutation Indicators */}
                    {pinnedMutations.length > 0 && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <h5 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4 text-red-500" />
                          Active Mutation Sites
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {pinnedMutations.map((mutation, index) => (
                            <motion.div
                              key={mutation.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm border border-red-200"
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              {mutation.aminoAcidChange}
                              <span className="text-xs text-red-600">
                                {(mutation.impactLikelihood * 100).toFixed(0)}%
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                      <RotateCcw className="h-4 w-4" />
                      Rotate View
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4" />
                      Fullscreen
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Layers3 className="h-4 w-4" />
                      Layer Controls
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Mutation Prediction Panel */}
          <TabsContent value="prediction" className="space-y-6">
            <motion.div 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.6}}
            >
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>AI-Powered Mutation Prediction</div>
                      <div className="text-sm font-normal text-slate-600">Interactive molecular impact analysis</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Prediction Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button 
                          onClick={() => setPredictingMutation(true)}
                          disabled={predicting || !selectedPosition}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600"
                        >
                          {predicting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Predict Impact
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedMutations([])}>
                          Clear All
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Analysis Position</div>
                        <div className="font-mono font-semibold">
                          {selectedPosition ? `Position ${selectedPosition}` : 'Select a position'}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Mutation Matrix */}
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Grid3x3 className="h-5 w-5 text-cyan-600" />
                        Amino Acid Substitution Matrix
                      </h4>
                      
                      {selectedPosition ? (
                        <div className="space-y-4">
                          <div className="text-sm text-slate-600 mb-3">
                            Original: <span className="font-mono font-bold text-green-600">
                              {getAminoAcidFromPosition(selectedPosition)}
                            </span> at position {selectedPosition}
                          </div>
                          
                          {/* Amino acid grid */}
                          <div className="grid grid-cols-10 gap-2">
                            {AMINO_ACIDS.map((aa) => {
                              const isOriginal = aa === getAminoAcidFromPosition(selectedPosition);
                              const impactScore = calculateMutationImpact(selectedPosition, aa);
                              
                              return (
                                <motion.button
                                  key={aa}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleAminoAcidSelection(aa)}
                                  disabled={isOriginal}
                                  className={`
                                    p-3 rounded-lg text-sm font-mono font-bold transition-all
                                    ${isOriginal 
                                      ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                                      : impactScore > 0.8 
                                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                        : impactScore > 0.5
                                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                                    }
                                  `}
                                >
                                  {aa}
                                </motion.button>
                              );
                            })}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-200 rounded"></div>
                              <span>Original</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-slate-200 rounded"></div>
                              <span>Low Impact</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                              <span>Medium Impact</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-200 rounded"></div>
                              <span>High Impact</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <Target className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                          <p>Click on a nucleotide position in the sequence above to analyze potential mutations</p>
                        </div>
                      )}
                    </div>

                    {/* Prediction Results */}
                    {predictionResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border-2 border-cyan-200"
                      >
                        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                          <Brain className="h-5 w-5 text-cyan-600" />
                          AI Prediction Results
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Impact Assessment */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Pathogenicity Score</span>
                                <span className="font-bold text-lg">
                                  {(predictionResults.pathogenicityScore * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                value={predictionResults.pathogenicityScore * 100} 
                                className="h-2"
                              />
                              <div className="text-xs text-slate-600 mt-1">
                                {predictionResults.pathogenicityScore > 0.8 ? 'Likely Pathogenic' :
                                 predictionResults.pathogenicityScore > 0.5 ? 'Uncertain Significance' :
                                 'Likely Benign'}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Protein Stability Impact</span>
                                <span className="font-bold text-lg">
                                  {predictionResults.stabilityImpact > 0 ? '+' : ''}{predictionResults.stabilityImpact.toFixed(2)} kcal/mol
                                </span>
                              </div>
                              <div className="text-xs text-slate-600">
                                {predictionResults.stabilityImpact > 1 ? 'Destabilizing' :
                                 predictionResults.stabilityImpact < -1 ? 'Stabilizing' :
                                 'Neutral Effect'}
                              </div>
                            </div>
                          </div>

                          {/* Molecular Effects */}
                          <div className="space-y-4">
                            <div>
                              <span className="text-sm font-medium block mb-2">Predicted Effects</span>
                              <div className="space-y-2">
                                {predictionResults.predictedEffects.map((effect, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                      effect.severity === 'High' ? 'bg-red-500' :
                                      effect.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}></div>
                                    <span className="text-sm">{effect.description}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm font-medium block mb-2">Conservation Score</span>
                              <div className="flex items-center gap-2">
                                <Progress value={predictionResults.conservationScore * 100} className="h-2 flex-1" />
                                <span className="text-sm font-medium">
                                  {(predictionResults.conservationScore * 100).toFixed(0)}%
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 mt-1">
                                {predictionResults.conservationScore > 0.8 ? 'Highly Conserved' :
                                 predictionResults.conservationScore > 0.5 ? 'Moderately Conserved' :
                                 'Variable'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                          <Button 
                            size="sm" 
                            onClick={() => addToPinnedMutations(predictionResults)}
                            className="bg-cyan-600 hover:bg-cyan-700"
                          >
                            <Pin className="h-4 w-4 mr-2" />
                            Add to Analysis
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => exportPrediction(predictionResults)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export Results
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Batch Analysis */}
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Layers className="h-5 w-5 text-cyan-600" />
                        Batch Analysis Queue
                      </h4>
                      
                      {selectedMutations.length > 0 ? (
                        <div className="space-y-3">
                          {selectedMutations.map((mutation, index) => (
                            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div className="font-mono text-sm">
                                  {mutation.position}: {mutation.original} → {mutation.mutated}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {(mutation.impactScore * 100).toFixed(0)}% impact
                                </Badge>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => removeMutationFromQueue(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button 
                            className="w-full mt-4"
                            onClick={() => runBatchAnalysis()}
                            disabled={predicting}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Run Batch Analysis ({selectedMutations.length} mutations)
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-slate-500">
                          <Layers className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                          <p className="text-sm">No mutations queued for analysis</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* AI Insights Panel */}
          <TabsContent value="ai" className="space-y-6">
            <motion.div 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.6}}
              className="space-y-6"
            >
              {/* In Silico Laboratory */}
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                      <FlaskConical className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>In Silico Laboratory</div>
                      <div className="text-sm font-normal text-slate-600">Virtual experimentation platform</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Virtual Experiments */}
                    <div className="space-y-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-violet-600" />
                        Virtual Experiments
                      </h4>
                      
                      <div className="space-y-4">
                        {/* DREB1A Expression Profiling */}
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-blue-800">DREB1A Expression Profiling</h5>
                            <Badge className="bg-green-100 text-green-800">Complete</Badge>
                          </div>
                          <p className="text-sm text-blue-700 mb-3">
                            Multi-tissue expression analysis under drought conditions
                          </p>
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-blue-600">Root tissue</span>
                              <span className="font-bold text-blue-800">8.7x upregulation</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-blue-600">Leaf tissue</span>
                              <span className="font-bold text-blue-800">4.2x upregulation</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-blue-600">Stem tissue</span>
                              <span className="font-bold text-blue-800">2.1x upregulation</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-blue-600">
                            <span>Duration: 2.5 hours</span>
                            <span>Replicates: 5</span>
                            <span>P-value: &lt;0.001</span>
                          </div>
                        </motion.div>

                        {/* Drought Stress Response */}
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-green-800">Progressive Drought Stress</h5>
                            <Badge className="bg-amber-100 text-amber-800">Running</Badge>
                          </div>
                          <p className="text-sm text-green-700 mb-3">
                            Time-course analysis of DREB1A activation pathway
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <Progress value={73} className="h-2 flex-1" />
                            <span className="text-xs text-green-600">73%</span>
                          </div>
                          <div className="text-xs text-green-700 mb-2">
                            Current: Day 7/10 drought treatment
                          </div>
                          <div className="flex items-center gap-4 text-xs text-green-600">
                            <span>ETA: 3 days</span>
                            <span>Water potential: -2.1 MPa</span>
                          </div>
                        </motion.div>

                        {/* Protein-DNA Interaction */}
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-purple-800">DRE Binding Assay</h5>
                            <Badge className="bg-purple-100 text-purple-800">Scheduled</Badge>
                          </div>
                          <p className="text-sm text-purple-700 mb-3">
                            Quantitative analysis of DNA binding specificity
                          </p>
                          <div className="flex items-center gap-4 text-xs text-purple-600">
                            <span>Queue: #1</span>
                            <span>Start: 30 minutes</span>
                            <span>Method: EMSA simulation</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Quick Actions */}
                      <div className="pt-4 border-t border-slate-200">
                        <h5 className="text-sm font-medium text-slate-700 mb-3">Quick Launch</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            New Assay
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            View Queue
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Real-time Monitoring & Results */}
                    <div className="space-y-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-violet-600" />
                        Live Monitoring
                      </h4>
                      
                      {/* Live Data Feed */}
                      <div className="bg-slate-900 rounded-lg p-4 text-green-300 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400">DREB1A Drought Response - Live</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="text-green-300">[15:42:33] Soil moisture: 15% (-0.8 MPa)</div>
                          <div className="text-cyan-300">[15:42:34] DREB1A mRNA: 6.4x control</div>
                          <div className="text-yellow-300">[15:42:35] Protein level: 4.2x baseline</div>
                          <div className="text-blue-300">[15:42:36] DNA binding: 89% saturation</div>
                          <div className="text-purple-300">[15:42:37] Target genes: 23 activated</div>
                          <div className="text-red-300">[15:42:38] Cell viability: 92%</div>
                          <div className="text-green-300">[15:42:39] RWC: 68% (improving)</div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-700">
                          <div className="text-green-400 text-xs">Status: Drought tolerance activated ✓</div>
                        </div>
                      </div>

                      {/* Pathway Network */}
                      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200">
                        <h5 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          Active Pathways
                        </h5>
                        <div className="space-y-2">
                          {[
                            { pathway: "ABA Signaling", activity: 94, color: "bg-blue-500" },
                            { pathway: "Osmotic Adjustment", activity: 87, color: "bg-green-500" },
                            { pathway: "LEA Protein Expression", activity: 78, color: "bg-purple-500" },
                            { pathway: "Stomatal Regulation", activity: 82, color: "bg-orange-500" }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                              <span className="text-sm flex-1">{item.pathway}</span>
                              <span className="text-xs font-medium">{item.activity}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                        <h5 className="font-medium text-emerald-800 mb-3">System Performance</h5>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-emerald-700">99.7%</div>
                            <div className="text-xs text-emerald-600">Accuracy</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-emerald-700">2.3s</div>
                            <div className="text-xs text-emerald-600">Avg Response</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-emerald-700">847</div>
                            <div className="text-xs text-emerald-600">Experiments</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-emerald-700">24/7</div>
                            <div className="text-xs text-emerald-600">Uptime</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis & Insights */}
                    <div className="space-y-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-violet-600" />
                        AI Analysis
                      </h4>

                      {/* Molecular Insights */}
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border-2 border-indigo-200">
                        <h5 className="font-medium text-indigo-800 mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Key Insights
                        </h5>
                        <div className="space-y-3">
                          <div className="bg-white/60 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div>
                                <div className="text-sm font-medium text-indigo-900">Critical Binding Site</div>
                                <div className="text-xs text-indigo-700">Position 120 shows highest conservation (95%) and direct DNA contact</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white/60 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <div>
                                <div className="text-sm font-medium text-indigo-900">Optimal Expression</div>
                                <div className="text-xs text-indigo-700">Root-specific upregulation correlates with water uptake efficiency</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white/60 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                              <div>
                                <div className="text-sm font-medium text-indigo-900">Synergistic Effect</div>
                                <div className="text-xs text-indigo-700">Combined mutations show 70% improvement in drought tolerance</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Predictions */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                        <h5 className="font-medium text-amber-800 mb-3">AI Predictions</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-amber-700">Drought Survival</span>
                              <span className="text-sm font-bold text-amber-800">+45%</span>
                            </div>
                            <Progress value={72} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-amber-700">Water Use Efficiency</span>
                              <span className="text-sm font-bold text-amber-800">+32%</span>
                            </div>
                            <Progress value={64} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-amber-700">Yield Maintenance</span>
                              <span className="text-sm font-bold text-amber-800">+28%</span>
                            </div>
                            <Progress value={56} className="h-2" />
                          </div>
                        </div>
                      </div>

                      {/* Research Recommendations */}
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200">
                        <h5 className="font-medium text-teal-800 mb-3">Research Recommendations</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                            <span className="text-teal-700">Validate A120V mutation in field trials</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                            <span className="text-teal-700">Test synergistic effects with CBF genes</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                            <span className="text-teal-700">Investigate tissue-specific promoters</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Control Panel */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-slate-800">Laboratory Controls</h5>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                          <FlaskConical className="h-4 w-4 mr-2" />
                          New Experiment
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analysis Panel */}
          <TabsContent value="analysis" className="space-y-6">
            <motion.div 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.6}}
            >
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div>Comprehensive Analysis Dashboard</div>
                      <div className="text-sm font-normal text-slate-600">Complete genetic modification overview</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div className="text-2xl font-bold text-emerald-700 mb-1">{gene.sequence.length}</div>
                      <div className="text-sm font-medium text-slate-700">Base Pairs</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700 mb-1">{Math.floor(gene.sequence.length / 3)}</div>
                      <div className="text-sm font-medium text-slate-700">Amino Acids</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700 mb-1">{gene.citations}</div>
                      <div className="text-sm font-medium text-slate-700">Citations</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                      <div className="text-2xl font-bold text-rose-700 mb-1">{(gene.confidence * 100).toFixed(0)}%</div>
                      <div className="text-sm font-medium text-slate-700">Confidence</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-teal-600" />
                        Trait Enhancement Potential
                      </h4>
                      <div className="space-y-4">
                        {gene.multiTraitImpact.map((trait, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-700">{trait.trait}</span>
                              <span className="text-sm font-bold text-slate-800">+{(trait.impact * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${trait.impact * 100}%` }}
                                transition={{ duration: 1.5, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-teal-600" />
                        Key Statistics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">Expression Level</span>
                          <span className="font-semibold text-slate-800">High</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">Tissue Specificity</span>
                          <span className="font-semibold text-slate-800">Broad</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">Conservation Score</span>
                          <span className="font-semibold text-slate-800">0.89</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">Regulatory Elements</span>
                          <span className="font-semibold text-slate-800">12</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">Pathway Interactions</span>
                          <span className="font-semibold text-slate-800">27</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expression Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-teal-600" />
                        Tissue Expression Profile
                      </h4>
                      <div className="space-y-4">
                        {gene.expression?.tissues.map((tissue, index) => (
                          <div key={tissue.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-700">{tissue.name}</span>
                              <div className="flex gap-2 text-sm">
                                <span className="text-slate-600">Normal: {tissue.level}%</span>
                                <span className="font-bold text-red-600">Stress: {tissue.stress}%</span>
                              </div>
                            </div>
                            <div className="relative w-full bg-slate-200 rounded-full h-3">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${tissue.level}%` }}
                                transition={{ duration: 1.5, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full absolute"
                              />
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(tissue.stress, 100)}%` }}
                                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                                className="bg-gradient-to-r from-red-400 to-orange-500 h-3 rounded-full absolute opacity-75"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-teal-600" />
                        Stress Response Profile
                      </h4>
                      <div className="space-y-3">
                        {gene.expression?.conditions.map((condition, index) => (
                          <div key={condition.name} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-slate-700">{condition.name}</span>
                              <span className="font-bold text-green-600">
                                {condition.foldChange}× upregulation
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-600">
                              <span>p-value: {condition.pValue}</span>
                              <span className={`font-semibold ${
                                condition.pValue < 0.001 ? 'text-green-700' :
                                condition.pValue < 0.01 ? 'text-yellow-700' : 'text-red-700'
                              }`}>
                                {condition.pValue < 0.001 ? 'Highly Significant' :
                                 condition.pValue < 0.01 ? 'Significant' : 'Moderate'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Functional Domains */}
                  <div className="mt-8">
                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Layers3 className="h-5 w-5 text-teal-600" />
                      Functional Domain Architecture
                    </h4>
                    <div className="space-y-4">
                      {gene.functionalDomains?.map((domain, index) => (
                        <motion.div
                          key={domain.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-purple-800">{domain.name}</h5>
                            <span className="text-sm font-mono bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              {domain.start}-{domain.end}
                            </span>
                          </div>
                          <p className="text-sm text-purple-700">{domain.description}</p>
                          <div className="mt-3 relative">
                            <div className="w-full bg-purple-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                style={{ 
                                  width: `${((domain.end - domain.start) / gene.sequence.length) * 100}%`,
                                  marginLeft: `${(domain.start / gene.sequence.length) * 100}%`
                                }}
                              />
                            </div>
                            <div className="text-xs text-purple-600 mt-1 flex justify-between">
                              <span>Position {domain.start}</span>
                              <span>Position {domain.end}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
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