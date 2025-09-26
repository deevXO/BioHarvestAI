// Demo data for BioHarvest AI prototype - Hackathon MVP
// Pre-computed AI results for smooth demo experience

export interface DemoGene {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  sequence: string;
  organism: string;
  traits: string[];
  confidence: number;
  applications: string[];
  mutationHotspots: { position: number; originalAA: string; suggestedAA: string; impact: string }[];
}

export interface DemoMutation {
  id: string;
  geneId: string;
  position: number;
  originalAA: string;
  mutatedAA: string;
  mutation: string;
  prediction: "beneficial" | "neutral" | "detrimental";
  confidence: number;
  traits: {
    droughtTolerance: number;
    saltTolerance: number;
    heatResistance: number;
    yieldPotential: number;
    nutritionalValue: number;
    diseaseResistance: number;
  };
  xaiExplanation: string;
  validationData: {
    labTested: boolean;
    fieldTested: boolean;
    crossSpecies: string[];
    citations: number;
  };
}

export interface DemoAnalysis {
  mutationId: string;
  processingTime: string;
  algorithm: string;
  dataPoints: number;
  researcher: string;
  methodology: string;
  ethicalScore: number;
  riskAssessment: string;
  recommendations: string[];
}

// Key demo genes for the prototype
export const DEMO_GENES: DemoGene[] = [
  {
    id: "DREB1A",
    name: "DREB1A",
    scientificName: "Dehydration-responsive element-binding protein 1A",
    description: "Master regulator of drought stress response in plants. Controls expression of over 200 stress-responsive genes through DRE/CRT element binding. Shows remarkable enhancement potential across multiple stress tolerance traits.",
    sequence: "ATGGATAAGGCCGACAAGCGCACGTCCGACAAGAAGAAGAAGGACGAGGAGTTCGACGAGGAGGGCGGCAAGGAGAAGAAGGCCGACGACGAGGCCGAGAAGAAGGCCAAGCGCGAGGCCGACAAGCGCACGTCCGACAAGAAGAAGAAGGACGAGGAGTTCGACGAGGAGGGCGGCAAGGAGAAGAAG",
    organism: "Arabidopsis thaliana",
    traits: ["Drought Tolerance", "Cold Tolerance", "Salt Tolerance", "Heat Tolerance", "Osmotic Adjustment"],
    confidence: 0.95,
    applications: ["Rice", "Wheat", "Maize", "Soybean", "Cotton", "Barley"],
    mutationHotspots: [
      { position: 120, originalAA: "A", suggestedAA: "V", impact: "Enhanced DNA binding affinity (+34%)" },
      { position: 158, originalAA: "L", suggestedAA: "F", impact: "Improved thermostability and heat tolerance" },
      { position: 203, originalAA: "R", suggestedAA: "K", impact: "Better transcriptional activation under stress" },
      { position: 89, originalAA: "S", suggestedAA: "T", impact: "Enhanced ABA-responsive phosphorylation" },
      { position: 45, originalAA: "K", suggestedAA: "R", impact: "Improved nuclear localization efficiency" }
    ]
  },
  {
    id: "NHX1",
    name: "NHX1", 
    scientificName: "Sodium/hydrogen exchanger 1",
    description: "Key vacuolar Na+/H+ antiporter that regulates ionic homeostasis in plant cells under salt stress. Essential for salt tolerance and osmotic adjustment, with significant potential for engineering salt-resistant crops.",
    sequence: "ATGAGCGAGCTGAAGAAGCTGGTGCACATCGTGGGCATCCTGCTGTTCCTGCTGTCCATCGTGCTGGGCATCATCGTGCTGAAGAAGCTGGTGCACATCGTGGGCATCCTGCTGTTCCTGCTGTCCATCGTGCTGGGCATCATCGTGCTGAAGAAGCTGGTGCACATCGTGGGCATCCTGCTGTTCCTGCTGTCCATCGTGCTGGGCATCATCGTGCTGAAGAAGCTGGTGCACATCGTGGGCATCCTGCTGTTCCTGCTGTCCATCGTGCTGGGCATCATCGTGCTG",
    organism: "Arabidopsis thaliana",
    traits: ["Salt Tolerance", "Ion Homeostasis", "Osmotic Balance", "pH Regulation", "Drought Tolerance"],
    confidence: 0.91,
    applications: ["Rice", "Tomato", "Barley", "Cotton", "Quinoa", "Sugar Beet"],
    mutationHotspots: [
      { position: 87, originalAA: "G", suggestedAA: "A", impact: "Enhanced salt exclusion mechanisms (+67% reduction in Na+ accumulation)" },
      { position: 142, originalAA: "V", suggestedAA: "I", impact: "Improved membrane stability and ion selectivity" },
      { position: 276, originalAA: "S", suggestedAA: "T", impact: "Better Na+/K+ discrimination and transport efficiency" },
      { position: 203, originalAA: "A", suggestedAA: "V", impact: "Increased protein rigidity under extreme salinity" },
      { position: 156, originalAA: "F", suggestedAA: "Y", impact: "Enhanced aromatic stacking and transmembrane stability" }
    ]
  },
  {
    id: "LEA14",
    name: "LEA14",
    scientificName: "Late Embryogenesis Abundant protein 14", 
    description: "Protective protein that prevents cellular damage during drought and extreme temperatures.",
    sequence: "ATGAAGGTGAAGAAGGCCGACGACGAGGCCGAGAAGAAGGCCAAGCGCGAGGCCGACAAGCGCACGTCCGACAAGAAGAAGAAGGACGAGGAGTTCGACGAGGAGGGCGGCAAGGAGAAGAAGGTGAAGAAGGCCGACGACGAGGCCGAGAAG",
    organism: "Multiple species",
    traits: ["Drought Tolerance", "Temperature Stress", "Cellular Protection"],
    confidence: 0.88,
    applications: ["Wheat", "Maize", "Sorghum", "Millet"],
    mutationHotspots: [
      { position: 167, originalAA: "T", suggestedAA: "A", impact: "Enhanced protein stability" },
      { position: 198, originalAA: "K", suggestedAA: "E", impact: "Better cellular protection" }
    ]
  }
];

// Pre-computed AI predictions for demo scenarios
export const DEMO_MUTATIONS: DemoMutation[] = [
  {
    id: "DREB1A_A120V",
    geneId: "DREB1A",
    position: 120,
    originalAA: "A",
    mutatedAA: "V", 
    mutation: "A120V",
    prediction: "beneficial",
    confidence: 0.96,
    traits: {
      droughtTolerance: 85,
      saltTolerance: 78,
      heatResistance: 72,
      yieldPotential: 68,
      nutritionalValue: 45,
      diseaseResistance: 52
    },
    xaiExplanation: "The A120V mutation enhances DNA binding affinity by 34% through improved hydrophobic interactions in the AP2 domain. This strengthens transcriptional activation of downstream stress-response genes, particularly those involved in osmotic adjustment and cellular protection. The valine substitution creates a more stable protein conformation under stress conditions, leading to sustained drought tolerance even at 40°C ambient temperature.",
    validationData: {
      labTested: true,
      fieldTested: true,
      crossSpecies: ["Rice", "Wheat", "Maize"],
      citations: 127
    }
  },
  {
    id: "DREB1A_L158F",
    geneId: "DREB1A",
    position: 158,
    originalAA: "L",
    mutatedAA: "F", 
    mutation: "L158F",
    prediction: "beneficial",
    confidence: 0.91,
    traits: {
      droughtTolerance: 79,
      saltTolerance: 65,
      heatResistance: 88,
      yieldPotential: 72,
      nutritionalValue: 48,
      diseaseResistance: 58
    },
    xaiExplanation: "The L158F mutation improves protein thermostability by introducing aromatic stacking interactions that stabilize the AP2/ERF domain structure. This enhances heat tolerance while maintaining drought response functionality, making it particularly valuable for crops facing combined heat-drought stress scenarios.",
    validationData: {
      labTested: true,
      fieldTested: false,
      crossSpecies: ["Rice", "Wheat"],
      citations: 89
    }
  },
  {
    id: "DREB1A_R203K",
    geneId: "DREB1A",
    position: 203,
    originalAA: "R",
    mutatedAA: "K", 
    mutation: "R203K",
    prediction: "beneficial",
    confidence: 0.83,
    traits: {
      droughtTolerance: 92,
      saltTolerance: 71,
      heatResistance: 55,
      yieldPotential: 81,
      nutritionalValue: 42,
      diseaseResistance: 49
    },
    xaiExplanation: "The R203K mutation optimizes the transcriptional activation domain by fine-tuning electrostatic interactions with co-activator proteins. This leads to enhanced recruitment of the transcriptional machinery and improved expression of drought-responsive genes under stress conditions.",
    validationData: {
      labTested: true,
      fieldTested: true,
      crossSpecies: ["Rice", "Wheat", "Maize", "Soybean"],
      citations: 156
    }
  },
  {
    id: "NHX1_G87A",
    geneId: "NHX1",
    position: 87,
    originalAA: "G",
    mutatedAA: "A",
    mutation: "G87A",
    prediction: "beneficial", 
    confidence: 0.92,
    traits: {
      droughtTolerance: 45,
      saltTolerance: 91,
      heatResistance: 38,
      yieldPotential: 73,
      nutritionalValue: 41,
      diseaseResistance: 29
    },
    xaiExplanation: "The G87A mutation significantly improves salt exclusion mechanisms by altering the selectivity filter of the Na+/H+ exchanger. This reduces cytotoxic sodium accumulation by 67% while maintaining essential potassium levels. The alanine substitution stabilizes the transmembrane domain, enabling sustained function even at 200mM NaCl concentrations that would typically cause cellular damage.",
    validationData: {
      labTested: true,
      fieldTested: true,
      crossSpecies: ["Rice", "Wheat", "Barley"],
      citations: 142
    }
  },
  {
    id: "NHX1_V142I",
    geneId: "NHX1",
    position: 142,
    originalAA: "V",
    mutatedAA: "I",
    mutation: "V142I",
    prediction: "beneficial", 
    confidence: 0.84,
    traits: {
      droughtTolerance: 52,
      saltTolerance: 87,
      heatResistance: 41,
      yieldPotential: 69,
      nutritionalValue: 44,
      diseaseResistance: 32
    },
    xaiExplanation: "The V142I mutation enhances membrane stability and improves ion selectivity under high salinity conditions. The isoleucine substitution creates a more hydrophobic environment that stabilizes the protein in the lipid bilayer, leading to improved Na+/H+ exchange efficiency and better salt tolerance.",
    validationData: {
      labTested: true,
      fieldTested: false,
      crossSpecies: ["Tomato", "Barley"],
      citations: 78
    }
  },
  {
    id: "NHX1_S276T",
    geneId: "NHX1",
    position: 276,
    originalAA: "S",
    mutatedAA: "T",
    mutation: "S276T",
    prediction: "beneficial", 
    confidence: 0.79,
    traits: {
      droughtTolerance: 48,
      saltTolerance: 83,
      heatResistance: 44,
      yieldPotential: 65,
      nutritionalValue: 39,
      diseaseResistance: 35
    },
    xaiExplanation: "The S276T mutation improves ion selectivity through optimized transmembrane domain structure. The threonine substitution provides better hydrogen bonding patterns that enhance the discrimination between Na+ and K+ ions, leading to more efficient salt exclusion.",
    validationData: {
      labTested: true,
      fieldTested: false,
      crossSpecies: ["Cotton", "Rice"],
      citations: 64
    }
  },
  {
    id: "LEA14_T167A",
    geneId: "LEA14", 
    position: 167,
    originalAA: "T",
    mutatedAA: "A",
    mutation: "T167A",
    prediction: "neutral",
    confidence: 0.65,
    traits: {
      droughtTolerance: 55,
      saltTolerance: 48,
      heatResistance: 62,
      yieldPotential: 42,
      nutritionalValue: 38,
      diseaseResistance: 44
    },
    xaiExplanation: "The T167A mutation shows marginal impact on protein function. While it slightly improves thermostability of the LEA domain, the effect on overall cellular protection is limited. This position appears to be in a flexible loop region that tolerates amino acid substitutions without significant functional consequences.",
    validationData: {
      labTested: true,
      fieldTested: false,
      crossSpecies: ["Wheat"],
      citations: 23
    }
  }
];

// Pre-computed analysis data
export const DEMO_ANALYSES: Record<string, DemoAnalysis> = {
  "DREB1A_A120V": {
    mutationId: "DREB1A_A120V",
    processingTime: "1.3 seconds",
    algorithm: "BioHarvest DeepProtein v4.2",
    dataPoints: 15247,
    researcher: "Dr. Sarah Chen",
    methodology: "Multi-modal transformer with protein folding prediction",
    ethicalScore: 95,
    riskAssessment: "Low risk - natural variant found in wild populations",
    recommendations: [
      "Proceed with greenhouse validation",
      "Test in rice and wheat varieties",
      "Monitor for off-target effects in reproductive tissues",
      "Consider stacking with salt tolerance genes"
    ]
  },
  "NHX1_G87A": {
    mutationId: "NHX1_G87A", 
    processingTime: "0.9 seconds",
    algorithm: "BioHarvest DeepProtein v4.2",
    dataPoints: 12891,
    researcher: "Dr. Ahmed Hassan",
    methodology: "Structure-function analysis with molecular dynamics",
    ethicalScore: 88,
    riskAssessment: "Moderate risk - monitor ion homeostasis carefully",
    recommendations: [
      "Validate sodium exclusion in hydroponic systems",
      "Test interaction with other ion transporters", 
      "Field trials in saline-affected soils",
      "Assess long-term stability of the mutation"
    ]
  },
  "LEA14_T167A": {
    mutationId: "LEA14_T167A",
    processingTime: "2.1 seconds", 
    algorithm: "BioHarvest DeepProtein v4.2",
    dataPoints: 8934,
    researcher: "Dr. James Wilson",
    methodology: "Comprehensive multi-factor analysis",
    ethicalScore: 92,
    riskAssessment: "Very low risk - conservative substitution",
    recommendations: [
      "Consider alternative positions for optimization",
      "Stack with other LEA protein variants",
      "Test under multiple stress conditions",
      "Focus on positions with higher impact scores"
    ]
  }
};

// Demo gene database for exploration
export const GENE_DATABASE = [
  ...DEMO_GENES,
  {
    id: "HSP70",
    name: "HSP70",
    scientificName: "Heat shock protein 70",
    description: "Molecular chaperone that protects proteins under heat stress.",
    sequence: "ATGAGCGCCAAGGCCGTGAAGAAGCTGGTGCACATCGTGGGCATCCTG",
    organism: "Multiple species",
    traits: ["Heat Tolerance", "Protein Folding", "Stress Response"],
    confidence: 0.87,
    applications: ["Tomato", "Pepper", "Eggplant"],
    mutationHotspots: []
  },
  {
    id: "WRKY70",
    name: "WRKY70", 
    scientificName: "WRKY transcription factor 70",
    description: "Transcription factor regulating pathogen resistance genes.",
    sequence: "ATGGATAAGGCCGACAAGCGCACGTCCGACAAGAAGAAGAAGGACGAG",
    organism: "Arabidopsis thaliana",
    traits: ["Disease Resistance", "Immunity", "Pathogen Response"],
    confidence: 0.89,
    applications: ["Rice", "Wheat", "Barley"],
    mutationHotspots: []
  }
];

// Simulated loading states for realistic AI experience
export const LOADING_MESSAGES = [
  "Analyzing protein structure...",
  "Running molecular dynamics simulation...",
  "Calculating binding affinities...",
  "Cross-referencing with database...",
  "Generating AI insights...",
  "Validating predictions...",
  "Finalizing analysis..."
];

export const getRandomLoadingMessage = () => {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
};

// Demo scenario configurations for perfect presentations
export const DEMO_SCENARIOS = {
  drought: {
    gene: "DREB1A",
    mutation: "A120V",
    trait: "Drought Tolerance",
    description: "Design drought-resistant crops for climate adaptation"
  },
  salt: {
    gene: "NHX1", 
    mutation: "G87A",
    trait: "Salt Tolerance",
    description: "Engineer salt-tolerant varieties for saline soils"
  },
  stress: {
    gene: "LEA14",
    mutation: "T167A", 
    trait: "General Stress",
    description: "Enhance overall stress resilience"
  }
};