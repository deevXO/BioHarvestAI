// Simulated AI service for BioHarvest AI prototype
// Provides realistic loading animations and instant results for demo

import { DEMO_GENES, DEMO_MUTATIONS, DEMO_ANALYSES, type DemoMutation, type DemoAnalysis, type DemoGene } from './demo-data';

export interface AIAnalysisResult {
  success: boolean;
  mutation: DemoMutation;
  analysis: DemoAnalysis;
  processingTime: string;
  loadingSteps: string[];
}

export interface AIGenerationResult {
  success: boolean;
  mutations: DemoMutation[];
  totalTime: string;
  confidence: number;
}

// Simulated AI delay for realistic experience
const SIMULATION_DELAY = 1500; // 1.5 seconds for perfect demo timing
const STEP_DELAY = 200; // 200ms between loading steps

// Simulate realistic AI processing with loading steps
export const simulateAIAnalysis = async (
  geneId: string, 
  mutation: string,
  onLoadingStep?: (step: string) => void
): Promise<AIAnalysisResult> => {
  
  // Find the demo mutation
  const demoMutation = DEMO_MUTATIONS.find(m => 
    m.geneId === geneId && m.mutation === mutation
  );
  
  if (!demoMutation) {
    throw new Error(`Demo mutation not found: ${geneId} ${mutation}`);
  }
  
  const analysis = DEMO_ANALYSES[demoMutation.id];
  const loadingSteps: string[] = [];
  
  // Simulate loading steps with callbacks
  const steps = [
    "Initializing AI analysis...",
    "Loading protein structure data...", 
    "Running molecular dynamics simulation...",
    "Analyzing binding affinities...",
    "Cross-referencing with validation database...",
    "Generating explainable AI insights...",
    "Finalizing comprehensive analysis..."
  ];
  
  for (const step of steps) {
    loadingSteps.push(step);
    if (onLoadingStep) {
      onLoadingStep(step);
    }
    await new Promise(resolve => setTimeout(resolve, STEP_DELAY));
  }
  
  // Final processing delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    mutation: demoMutation,
    analysis,
    processingTime: analysis.processingTime,
    loadingSteps
  };
};

// Simulate AI mutation generation
export const simulateAIMutationGeneration = async (
  geneId: string,
  targetTrait: string,
  desiredImpact: number,
  onLoadingStep?: (step: string) => void
): Promise<AIGenerationResult> => {
  
  // Filter mutations by gene and trait
  const relevantMutations = DEMO_MUTATIONS.filter(m => 
    m.geneId === geneId && 
    (targetTrait === "all" || m.traits.droughtTolerance > 60 || m.traits.saltTolerance > 60)
  );
  
  const loadingSteps = [
    "Scanning genetic sequence...",
    "Identifying optimization targets...",
    "Generating mutation candidates...", 
    "Evaluating structural impact...",
    "Ranking by predicted benefit...",
    "Selecting optimal mutations..."
  ];
  
  for (const step of loadingSteps) {
    if (onLoadingStep) {
      onLoadingStep(step);
    }
    await new Promise(resolve => setTimeout(resolve, STEP_DELAY));
  }
  
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Sort by confidence and return top results
  const sortedMutations = relevantMutations.sort((a, b) => b.confidence - a.confidence);
  
  return {
    success: true,
    mutations: sortedMutations.slice(0, 3), // Top 3 mutations
    totalTime: `${(SIMULATION_DELAY / 1000).toFixed(1)} seconds`,
    confidence: Math.max(...sortedMutations.map(m => m.confidence))
  };
};

// Simulate batch analysis for multiple mutations
export const simulateBatchAnalysis = async (
  mutations: Array<{geneId: string, mutation: string}>,
  onProgress?: (progress: number, currentMutation: string) => void
): Promise<AIAnalysisResult[]> => {
  
  const results: AIAnalysisResult[] = [];
  
  for (let i = 0; i < mutations.length; i++) {
    const { geneId, mutation } = mutations[i];
    
    if (onProgress) {
      onProgress((i / mutations.length) * 100, `${geneId} ${mutation}`);
    }
    
    const result = await simulateAIAnalysis(geneId, mutation);
    results.push(result);
    
    // Short delay between analyses
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  if (onProgress) {
    onProgress(100, "Complete");
  }
  
  return results;
};

// Generate realistic processing status updates
export const getProcessingStatus = (progress: number): string => {
  if (progress < 20) return "Initializing analysis pipeline...";
  if (progress < 40) return "Processing molecular structures...";  
  if (progress < 60) return "Running AI predictions...";
  if (progress < 80) return "Validating results...";
  if (progress < 95) return "Generating insights...";
  return "Finalizing analysis...";
};

// Simulate real-time gene search
export const simulateGeneSearch = async (
  query: string,
  filters: Record<string, string> = {}
): Promise<DemoGene[]> => {
  
  // Short delay for search
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let results = [...DEMO_GENES];
  
  // Apply search query
  if (query.trim()) {
    results = results.filter(gene => 
      gene.name.toLowerCase().includes(query.toLowerCase()) ||
      gene.description.toLowerCase().includes(query.toLowerCase()) ||
      gene.traits.some(trait => trait.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  // Apply filters
  if (filters.organism && filters.organism !== "all") {
    results = results.filter(gene => gene.organism.includes(filters.organism));
  }
  
  if (filters.trait && filters.trait !== "all") {
    results = results.filter(gene => 
      gene.traits.some(trait => trait.toLowerCase().includes(filters.trait.toLowerCase()))
    );
  }
  
  if (filters.confidence && filters.confidence !== "all") {
    const minConfidence = filters.confidence === "high" ? 0.9 : 0.7;
    results = results.filter(gene => gene.confidence >= minConfidence);
  }
  
  return results;
};

// Simulate combinatorial mutation analysis
export const simulateCombinatorialAnalysis = async (
  mutations: string[],
  onLoadingStep?: (step: string) => void
): Promise<{
  combinedEffect: number;
  synergies: string[];
  warnings: string[];
  confidence: number;
}> => {
  
  const steps = [
    "Analyzing mutation interactions...",
    "Calculating synergistic effects...",
    "Checking for negative interactions...",
    "Computing combined confidence...",
    "Generating optimization recommendations..."
  ];
  
  for (const step of steps) {
    if (onLoadingStep) {
      onLoadingStep(step);
    }
    await new Promise(resolve => setTimeout(resolve, STEP_DELAY));
  }
  
  // Simulate combinatorial effects
  const baseEffect = mutations.length * 0.15;
  const synergisticBonus = Math.random() * 0.3;
  const combinedEffect = Math.min(0.95, baseEffect + synergisticBonus);
  
  return {
    combinedEffect,
    synergies: [
      "DREB1A + NHX1: Enhanced osmotic stress resistance",
      "LEA14 + HSP70: Improved protein stability under stress"
    ],
    warnings: mutations.length > 3 ? ["High mutation load may affect plant fitness"] : [],
    confidence: 0.87
  };
};

// Export utility functions for components
export const formatProcessingTime = (seconds: number): string => {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
  return `${seconds.toFixed(1)}s`;
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.9) return "text-emerald-500";
  if (confidence >= 0.7) return "text-yellow-500"; 
  return "text-red-500";
};

export const getTraitColor = (trait: string): string => {
  const colorMap: Record<string, string> = {
    "Drought Tolerance": "emerald",
    "Salt Tolerance": "blue",
    "Heat Tolerance": "red",
    "Disease Resistance": "purple",
    "Nutritional Value": "orange"
  };
  return colorMap[trait] || "gray";
};