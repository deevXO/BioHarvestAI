"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  History, 
  Search, 
  Download, 
  Dna, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Eye,
  X,
  BarChart3,
  FileText,
  User,
  Calendar as CalendarIcon
} from "lucide-react";

type PredictionResult = {
  id: string;
  geneId: string;
  geneName: string;
  mutation: string;
  trait: string;
  prediction: "beneficial" | "neutral" | "harmful";
  confidence: number;
  timestamp: string;
  status: "completed" | "processing" | "failed";
  details: {
    algorithm: string;
    processingTime: string;
    dataPoints: number;
    researcher: string;
    methodology: string;
    notes: string;
  };
};

const mockHistory: PredictionResult[] = [
  {
    id: "pred_001",
    geneId: "DREB1A",
    geneName: "Dehydration Responsive Element Binding protein 1A",
    mutation: "A142V",
    trait: "Drought Tolerance",
    prediction: "beneficial",
    confidence: 0.87,
    timestamp: "2025-08-19T10:30:00Z",
    status: "completed",
    details: {
      algorithm: "DeepProtein AI v3.2",
      processingTime: "2.3 seconds",
      dataPoints: 15420,
      researcher: "Dr. Sarah Chen",
      methodology: "Structure-based prediction with evolutionary analysis",
      notes: "High confidence due to strong conservation patterns and favorable structural changes."
    }
  },
  {
    id: "pred_002", 
    geneId: "NHX1",
    geneName: "Sodium/Hydrogen Exchanger 1",
    mutation: "L89F",
    trait: "Salt Tolerance", 
    prediction: "harmful",
    confidence: 0.92,
    timestamp: "2025-08-19T09:15:00Z",
    status: "completed",
    details: {
      algorithm: "DeepProtein AI v3.2",
      processingTime: "1.8 seconds",
      dataPoints: 12856,
      researcher: "Prof. Michael Zhang",
      methodology: "Molecular dynamics simulation with machine learning",
      notes: "Mutation disrupts critical ion transport mechanism."
    }
  },
  {
    id: "pred_003",
    geneId: "HSP70",
    geneName: "Heat Shock Protein 70",
    mutation: "G45R",
    trait: "Heat Resistance",
    prediction: "beneficial",
    confidence: 0.78,
    timestamp: "2025-08-19T08:45:00Z",
    status: "completed",
    details: {
      algorithm: "DeepProtein AI v3.1",
      processingTime: "3.1 seconds",
      dataPoints: 18920,
      researcher: "Dr. Elena Rodriguez",
      methodology: "Thermodynamic stability analysis",
      notes: "Moderate confidence due to limited experimental validation."
    }
  },
  {
    id: "pred_004",
    geneId: "LEA14",
    geneName: "Late Embryogenesis Abundant protein 14",
    mutation: "T167A",
    trait: "Drought Tolerance",
    prediction: "neutral",
    confidence: 0.65,
    timestamp: "2025-08-19T08:00:00Z",
    status: "processing",
    details: {
      algorithm: "DeepProtein AI v3.2",
      processingTime: "Processing...",
      dataPoints: 0,
      researcher: "Dr. James Wilson",
      methodology: "Comprehensive multi-factor analysis",
      notes: "Analysis in progress..."
    }
  },
  {
    id: "pred_005",
    geneId: "SOS1", 
    geneName: "Salt Overly Sensitive 1",
    mutation: "K234E",
    trait: "Salt Tolerance",
    prediction: "beneficial",
    confidence: 0.91,
    timestamp: "2025-08-18T16:20:00Z",
    status: "completed",
    details: {
      algorithm: "DeepProtein AI v3.2",
      processingTime: "2.7 seconds",
      dataPoints: 16789,
      researcher: "Dr. Yuki Tanaka",
      methodology: "Functional domain analysis with AI prediction",
      notes: "Strong positive impact on sodium tolerance pathways."
    }
  },
  {
    id: "pred_006",
    geneId: "RPM1",
    geneName: "Resistance to Pseudomonas syringae pv Maculicola 1",
    mutation: "D78N",
    trait: "Disease Resistance",
    prediction: "harmful",
    confidence: 0.83,
    timestamp: "2025-08-18T14:10:00Z",
    status: "failed",
    details: {
      algorithm: "DeepProtein AI v3.1",
      processingTime: "Failed after 45s",
      dataPoints: 0,
      researcher: "Dr. Amanda Foster",
      methodology: "Failed - insufficient sequence data",
      notes: "Analysis failed due to incomplete protein sequence information."
    }
  }
];

const getPredictionColor = (prediction: string) => {
  switch (prediction) {
    case "beneficial":
      return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" };
    case "harmful":
      return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" };
    case "neutral":
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "processing":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "failed":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

export default function PredictionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionResult | null>(null);

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.geneId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.mutation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.trait.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const exportPrediction = (prediction: PredictionResult) => {
    const data = {
      id: prediction.id,
      gene: {
        id: prediction.geneId,
        name: prediction.geneName
      },
      mutation: prediction.mutation,
      trait: prediction.trait,
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      timestamp: prediction.timestamp,
      status: prediction.status,
      details: prediction.details,
      exportedAt: new Date().toISOString(),
      exportedBy: "BioHarvest AI Platform"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prediction.geneId}_${prediction.mutation}_prediction.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAllPredictions = () => {
    const data = {
      totalPredictions: filteredHistory.length,
      predictions: filteredHistory,
      exportedAt: new Date().toISOString(),
      exportedBy: "BioHarvest AI Platform"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bioharvest_prediction_history.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <History className="h-4 w-4" />
            Analysis History & Results
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
            Prediction History
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Track your genetic analysis results, review past predictions, and monitor the confidence levels of your research findings.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Total Predictions", value: mockHistory.length, icon: Dna, color: "emerald" },
            { label: "Completed", value: mockHistory.filter(h => h.status === "completed").length, icon: CheckCircle, color: "green" },
            { label: "Avg Confidence", value: `${Math.round(mockHistory.reduce((acc, h) => acc + h.confidence, 0) / mockHistory.length * 100)}%`, icon: TrendingUp, color: "blue" },
            { label: "Processing", value: mockHistory.filter(h => h.status === "processing").length, icon: Clock, color: "yellow" }
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

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by gene, mutation, or trait..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-300 focus:border-emerald-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:border-emerald-500 focus:outline-none"
                    title="Filter by status"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                  <Button 
                    onClick={exportAllPredictions}
                    variant="outline" 
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Predictions List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          {filteredHistory.map((prediction, index) => {
            const predictionStyle = getPredictionColor(prediction.prediction);
            return (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-slate-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <Dna className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-slate-800">{prediction.geneId}</h3>
                            <Badge variant="outline" className="font-mono text-xs">
                              {prediction.mutation}
                            </Badge>
                            {getStatusIcon(prediction.status)}
                          </div>
                          <p className="text-sm text-slate-600">{prediction.geneName}</p>
                          <p className="text-sm text-slate-500">{prediction.trait}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Badge className={`${predictionStyle.bg} ${predictionStyle.text} ${predictionStyle.border} font-medium`}>
                            {prediction.prediction}
                          </Badge>
                          <p className="text-xs text-slate-500 mt-1">{Math.round(prediction.confidence * 100)}% confidence</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-slate-600">{new Date(prediction.timestamp).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-500">{new Date(prediction.timestamp).toLocaleTimeString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPrediction(prediction)}
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportPrediction(prediction)}
                            className="border-slate-300 hover:bg-slate-50"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredHistory.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No predictions found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search terms or filters</p>
            <Button onClick={() => { setSearchTerm(""); setSelectedStatus("all"); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Details Modal */}
      {selectedPrediction && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Prediction Details</h2>
                  <p className="text-slate-600">{selectedPrediction.geneId} - {selectedPrediction.mutation}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedPrediction(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Dna className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-800">Gene Information</h3>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div><span className="font-medium">ID:</span> {selectedPrediction.geneId}</div>
                    <div><span className="font-medium">Name:</span> {selectedPrediction.geneName}</div>
                    <div><span className="font-medium">Mutation:</span> {selectedPrediction.mutation}</div>
                    <div><span className="font-medium">Trait:</span> {selectedPrediction.trait}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-800">Prediction Results</h3>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Prediction:</span>
                      <Badge className={`${getPredictionColor(selectedPrediction.prediction).bg} ${getPredictionColor(selectedPrediction.prediction).text}`}>
                        {selectedPrediction.prediction}
                      </Badge>
                    </div>
                    <div><span className="font-medium">Confidence:</span> {Math.round(selectedPrediction.confidence * 100)}%</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      {getStatusIcon(selectedPrediction.status)}
                      <span className="capitalize">{selectedPrediction.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-800">Technical Details</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div><span className="font-medium">Algorithm:</span> {selectedPrediction.details.algorithm}</div>
                  <div><span className="font-medium">Processing Time:</span> {selectedPrediction.details.processingTime}</div>
                  <div><span className="font-medium">Data Points:</span> {selectedPrediction.details.dataPoints.toLocaleString()}</div>
                  <div><span className="font-medium">Methodology:</span> {selectedPrediction.details.methodology}</div>
                </div>
              </div>

              {/* Research Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-800">Research Information</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div><span className="font-medium">Researcher:</span> {selectedPrediction.details.researcher}</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Date:</span> 
                    {new Date(selectedPrediction.timestamp).toLocaleDateString()} at {new Date(selectedPrediction.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800">Analysis Notes</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700 leading-relaxed">{selectedPrediction.details.notes}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <Button 
                  onClick={() => exportPrediction(selectedPrediction)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Details
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPrediction(null)}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
