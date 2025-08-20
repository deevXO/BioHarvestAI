"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Dna, 
  FlaskConical, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Zap,
  Clock,
  Download,
  BookOpen,
  Target,
  X
} from "lucide-react";

// Simulated gene data with more realistic information
const GENE_DATA = {
  "DREB1A": {
    id: "DREB1A",
    name: "DREB1A",
    fullName: "Dehydration Responsive Element Binding protein 1A",
    trait: "Drought Tolerance",
    organism: "Arabidopsis thaliana",
    chromosome: "Chr1: 2,845,123-2,847,891",
    sequence: "ATGGCGTCAAGCAAGAAGAAGAAAGGAAGAAAGGTGGATACCGAGGAAGTCCTTCGGGAGAAGTTC",
    description: "Key transcription factor that binds to DRE/CRT elements and regulates expression of stress-responsive genes under drought, cold, and salt stress conditions.",
    confidence: 0.95,
    citations: 1247,
    pathways: ["Abscisic acid signaling", "Stress response", "Gene regulation"],
    variants: [
      { position: 145, wildType: "A", mutant: "G", impact: "Beneficial", confidence: 0.92 },
      { position: 278, wildType: "T", mutant: "C", impact: "Neutral", confidence: 0.76 },
      { position: 342, wildType: "G", mutant: "A", impact: "Detrimental", confidence: 0.88 }
    ]
  },
  "NHX1": {
    id: "NHX1",
    name: "NHX1",
    fullName: "Sodium/Hydrogen Exchanger 1",
    trait: "Salt Tolerance",
    organism: "Arabidopsis thaliana",
    chromosome: "Chr1: 8,234,567-8,237,891",
    sequence: "ATGGCCTCCAAGAAGGAGGAGGAGAAGGGAGGAAAGGTGGATGCCGAGGAAGTTCTTCGGGAGAAGTTC",
    description: "Vacuolar Na+/H+ antiporter that mediates sodium efflux from the cytoplasm, essential for salt tolerance in plants.",
    confidence: 0.89,
    citations: 892,
    pathways: ["Ion transport", "Salt stress response", "Vacuolar pH regulation"],
    variants: [
      { position: 67, wildType: "V", mutant: "I", impact: "Beneficial", confidence: 0.85 },
      { position: 123, wildType: "L", mutant: "F", impact: "Neutral", confidence: 0.72 },
      { position: 198, wildType: "D", mutant: "N", impact: "Detrimental", confidence: 0.91 }
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

const generatePrediction = (sequence: string, position: number, mutation: string): PredictionResult => {
  const wildType = sequence[position - 1];
  let impact: "Beneficial" | "Neutral" | "Detrimental";
  let confidence: number;
  let score: number;
  let explanation: string;
  let recommendations: string[];

  // Simple heuristic based on amino acid properties
  const beneficial = ["A", "G", "S", "T", "V"];
  const detrimental = ["P", "C", "M", "W"];

  if (beneficial.includes(mutation) && !beneficial.includes(wildType)) {
    impact = "Beneficial";
    confidence = 0.80 + Math.random() * 0.15;
    score = 75 + Math.random() * 20;
    explanation = `This mutation is predicted to be beneficial. The ${wildType} to ${mutation} substitution at position ${position} may improve protein stability or function.`;
    recommendations = [
      "Consider for breeding programs",
      "Validate through experimental studies",
      "Monitor for improved trait expression"
    ];
  } else if (Math.random() > 0.6) {
    impact = "Neutral";
    confidence = 0.65 + Math.random() * 0.25;
    score = 40 + Math.random() * 20;
    explanation = `This mutation appears to have neutral impact. The ${wildType} to ${mutation} substitution at position ${position} is unlikely to significantly affect protein function.`;
    recommendations = [
      "Monitor for unexpected phenotypes",
      "Consider as control variant",
      "Monitor for unexpected effects"
    ];
  } else {
    impact = "Detrimental";
    confidence = 0.75 + Math.random() * 0.20;
    score = 15 + Math.random() * 25;
    explanation = `This mutation is predicted to be harmful to protein function. The ${wildType} to ${mutation} substitution at position ${position} may disrupt critical protein domains or binding sites.`;
    recommendations = [
      "Avoid this mutation in breeding programs",
      "Consider compensatory mutations",
      "Further structural analysis recommended"
    ];
  }

  return {
    wildType,
    mutant: mutation,
    position,
    confidence,
    impact,
    score,
    explanation,
    recommendations
  };
};

export default function GeneDetailPage() {
  const params = useParams();
  const geneId = params.geneId as string;
  
  const [positionInput, setPositionInput] = useState("");
  const [mutationInput, setMutationInput] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<PredictionResult[]>([]);

  const gene = GENE_DATA[geneId as keyof typeof GENE_DATA];

  const handlePredict = async () => {
    if (!positionInput || !mutationInput) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = generatePrediction(
      gene?.sequence || "",
      parseInt(positionInput),
      mutationInput.toUpperCase()
    );
    
    setPrediction(result);
    setAnalysisHistory(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 predictions
    setIsAnalyzing(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Beneficial":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" };
      case "Neutral":
        return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" };
      case "Detrimental":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    }
  };

  if (!gene) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Gene Not Found</h1>
          <p className="text-slate-600 mb-6">The requested gene could not be found in our database.</p>
          <Link href="/genes">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gene Explorer
            </Button>
          </Link>
        </div>
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <motion.div 
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.6}}
          className="mb-12"
        >
          <Link href="/genes">
            <Button variant="outline" className="mb-6 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gene Explorer
            </Button>
          </Link>

          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
              <Dna className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-slate-800 mb-3">{gene.name}</h1>
              <h2 className="text-xl text-slate-600 mb-4">{gene.fullName}</h2>
              <p className="text-slate-600 mb-6 max-w-3xl leading-relaxed">{gene.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
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

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* AI Prediction Tool */}
          <motion.div 
            initial={{opacity:0,x:-20}} 
            animate={{opacity:1,x:0}} 
            transition={{duration:0.6,delay:0.1}}
            className="lg:col-span-2"
          >
            <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FlaskConical className="h-7 w-7 text-emerald-600" />
                  AI Mutation Impact Predictor
                </CardTitle>
                <p className="text-slate-600">
                  Predict the functional impact of genetic mutations on {gene.trait.toLowerCase()}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="position" className="text-slate-700 font-medium">
                      Amino Acid Position
                    </Label>
                    <Input
                      id="position"
                      type="number"
                      placeholder="e.g., 145"
                      min={1}
                      max={gene.sequence.length}
                      value={positionInput}
                      onChange={(e) => setPositionInput(e.target.value)}
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Range: 1-{gene.sequence.length}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="mutation" className="text-slate-700 font-medium">
                      Mutant Amino Acid
                    </Label>
                    <Input
                      id="mutation"
                      placeholder="e.g., V"
                      maxLength={1}
                      value={mutationInput}
                      onChange={(e) => setMutationInput(e.target.value.toUpperCase())}
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Single letter amino acid code
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handlePredict}
                  disabled={isAnalyzing || !positionInput || !mutationInput}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 text-lg shadow-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing Mutation Impact...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-3 h-5 w-5" />
                      Predict Impact
                    </>
                  )}
                </Button>

                {/* Prediction Results */}
                {prediction && (
                  <motion.div 
                    initial={{opacity:0,y:20}} 
                    animate={{opacity:1,y:0}} 
                    transition={{duration:0.5}}
                    className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <BarChart3 className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Prediction Results</h3>
                        <p className="text-slate-600">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-700">Mutation:</span>
                          <Badge variant="outline" className="font-mono text-lg px-3 py-1">
                            {prediction.wildType}{prediction.position}{prediction.mutant}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-700">Impact:</span>
                          <Badge className={`${getImpactColor(prediction.impact).bg} ${getImpactColor(prediction.impact).text} ${getImpactColor(prediction.impact).border} px-3 py-1`}>
                            {prediction.impact}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-700">Score:</span>
                          <span className="text-lg font-bold text-slate-800">{prediction.score.toFixed(1)}/100</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={prediction.impact === "Beneficial" ? "#10b981" : prediction.impact === "Neutral" ? "#f59e0b" : "#ef4444"}
                              strokeWidth="2"
                              strokeDasharray={`${prediction.score}, 100`}
                              className="transition-all duration-1000 ease-in-out"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-slate-800">{prediction.score.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-slate-200 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-slate-600" />
                        <span className="font-semibold text-slate-800">AI Explanation</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{prediction.explanation}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span className="font-semibold text-slate-800">Recommendations</span>
                      </div>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-600">
                            <span className="text-emerald-600 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Gene Information Sidebar */}
          <motion.div 
            initial={{opacity:0,x:20}} 
            animate={{opacity:1,x:0}} 
            transition={{duration:0.6,delay:0.2}}
            className="space-y-6"
          >
            {/* Sequence Viewer */}
            <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Protein Sequence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-sm text-slate-600 mb-2">
                    Length: {gene.sequence.length} amino acids
                  </div>
                  <Progress value={(gene.sequence.length / 1000) * 100} className="h-2" />
                </div>
                
                <div className="font-mono text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 max-h-40 overflow-y-auto leading-relaxed break-all">
                  {gene.sequence}
                </div>
              </CardContent>
            </Card>

            {/* Known Variants */}
            <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Known Variants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gene.variants.map((variant, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="font-mono">
                          {variant.wildType}{variant.position}{variant.mutant}
                        </Badge>
                        <Badge className={`${getImpactColor(variant.impact).bg} ${getImpactColor(variant.impact).text} ${getImpactColor(variant.impact).border}`}>
                          {variant.impact}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-600">
                        Confidence: {(variant.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Biological Pathways */}
            <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-purple-600" />
                  Biological Pathways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gene.pathways.map((pathway, idx) => (
                    <div key={idx} className="text-sm text-slate-600 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                      {pathway}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Prediction History */}
        <motion.div 
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.6,delay:0.4}}
          className="mt-16"
        >
          <PredictionHistory geneId={geneId} />
        </motion.div>
      </div>
    </div>
  );
}

// Prediction History Component
function PredictionHistory({ geneId }: { geneId: string }) {
  const [viewMode, setViewMode] = useState<"summary" | "detailed">("summary");
  
  const mockPredictions = [
    {
      id: "pred_001",
      date: "2024-01-15",
      mutation: "L145F",
      trait: "Drought Tolerance",
      prediction: "Enhanced",
      confidence: 92,
      user: "Dr. Sarah Chen",
      lab: "Plant Genomics Lab"
    },
    {
      id: "pred_002", 
      date: "2024-01-12",
      mutation: "R278K",
      trait: "Salt Tolerance",
      prediction: "Neutral",
      confidence: 76,
      user: "Prof. Michael Zhang",
      lab: "Crop Research Institute"
    },
    {
      id: "pred_003",
      date: "2024-01-08",
      mutation: "G342A",
      trait: "Heat Resistance",
      prediction: "Impaired",
      confidence: 88,
      user: "Dr. Elena Rodriguez",
      lab: "Climate Adaptation Lab"
    }
  ];

  const exportPredictionData = (prediction: typeof mockPredictions[0]) => {
    const data = {
      gene: geneId,
      predictionId: prediction.id,
      mutation: prediction.mutation,
      trait: prediction.trait,
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      date: prediction.date,
      researcher: prediction.user,
      laboratory: prediction.lab,
      exportedAt: new Date().toISOString(),
      exportedBy: "BioHarvest AI Platform"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${geneId}_${prediction.mutation}_prediction.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAllPredictions = () => {
    const data = {
      gene: geneId,
      totalPredictions: mockPredictions.length,
      predictions: mockPredictions,
      exportedAt: new Date().toISOString(),
      exportedBy: "BioHarvest AI Platform"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${geneId}_all_predictions.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-slate-200 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-slate-800">Prediction History</CardTitle>
              <p className="text-slate-600">Recent analyses for {geneId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "summary" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("summary")}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
            >
              Summary
            </Button>
            <Button
              variant={viewMode === "detailed" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("detailed")}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              Detailed
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportAllPredictions}
              className="border-slate-300 hover:bg-slate-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewMode === "summary" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockPredictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="font-mono text-sm bg-slate-100 text-slate-700">
                    {prediction.mutation}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => exportPredictionData(prediction)}
                      className="h-6 w-6 p-0 hover:bg-emerald-100"
                    >
                      <Download className="h-3 w-3 text-slate-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewMode("detailed")}
                      className="h-6 w-6 p-0 hover:bg-emerald-100"
                    >
                      <BarChart3 className="h-3 w-3 text-slate-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{prediction.trait}</span>
                    <Badge className={
                      prediction.prediction === "Enhanced" 
                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                        : prediction.prediction === "Neutral"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : "bg-red-100 text-red-700 border-red-300"
                    }>
                      {prediction.prediction}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Confidence</span>
                    <span className="text-sm font-medium text-slate-700">{prediction.confidence}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Date</span>
                    <span className="text-sm text-slate-600">{prediction.date}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-500">{prediction.user}</div>
                    <div className="text-xs text-slate-400">{prediction.lab}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Mutation</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Trait</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Prediction</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Confidence</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Researcher</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPredictions.map((prediction) => (
                    <tr key={prediction.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-600">{prediction.date}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="font-mono text-sm">
                          {prediction.mutation}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{prediction.trait}</td>
                      <td className="py-3 px-4">
                        <Badge className={
                          prediction.prediction === "Enhanced" 
                            ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                            : prediction.prediction === "Neutral"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                            : "bg-red-100 text-red-700 border-red-300"
                        }>
                          {prediction.prediction}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-700">{prediction.confidence}%</td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        <div>{prediction.user}</div>
                        <div className="text-xs text-slate-400">{prediction.lab}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportPredictionData(prediction)}
                            className="border-slate-300 hover:bg-slate-50"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          >
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
