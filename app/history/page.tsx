"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Search,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  RefreshCw,
  TrendingUp,
  History,
  Dna,
  Eye,
  X,
  User,
  Calendar as CalendarIcon
} from "lucide-react";

// Import the prediction history data (this would normally come from the API)
const PREDICTION_HISTORY = {
  "totalPredictions": 4,
  "predictions": [
    {
      "id": "pred_004",
      "geneId": "LEA14",
      "geneName": "Late Embryogenesis Abundant protein 14",
      "mutation": "T167A",
      "trait": "Drought Tolerance",
      "prediction": "neutral",
      "confidence": 0.65,
      "timestamp": "2025-08-19T08:00:00Z",
      "status": "processing",
      "details": {
        "algorithm": "DeepProtein AI v3.2",
        "processingTime": "Processing...",
        "dataPoints": 0,
        "researcher": "Dr. James Wilson",
        "methodology": "Comprehensive multi-factor analysis",
        "notes": "Analysis in progress..."
      }
    },
    {
      "id": "pred_003",
      "geneId": "DREB1A",
      "geneName": "Dehydration Responsive Element Binding protein 1A", 
      "mutation": "A120V",
      "trait": "Drought Tolerance",
      "prediction": "beneficial",
      "confidence": 0.96,
      "timestamp": "2025-08-18T14:30:00Z",
      "status": "completed",
      "details": {
        "algorithm": "BioHarvest DeepProtein v4.2",
        "processingTime": "1.3 seconds",
        "dataPoints": 15247,
        "researcher": "Dr. Sarah Chen",
        "methodology": "Multi-modal transformer with protein folding prediction",
        "notes": "High confidence prediction validated across multiple species"
      }
    },
    {
      "id": "pred_002", 
      "geneId": "NHX1",
      "geneName": "Sodium/Hydrogen Exchanger 1",
      "mutation": "G87A",
      "trait": "Salt Tolerance", 
      "prediction": "beneficial",
      "confidence": 0.92,
      "timestamp": "2025-08-18T10:15:00Z",
      "status": "completed",
      "details": {
        "algorithm": "BioHarvest DeepProtein v4.2",
        "processingTime": "0.9 seconds",
        "dataPoints": 12891,
        "researcher": "Dr. Ahmed Hassan",
        "methodology": "Structure-function analysis with molecular dynamics",
        "notes": "Significant improvement in salt exclusion mechanism predicted"
      }
    },
    {
      "id": "pred_001",
      "geneId": "HSP70",
      "geneName": "Heat Shock Protein 70",
      "mutation": "K394R", 
      "trait": "Heat Tolerance",
      "prediction": "beneficial",
      "confidence": 0.78,
      "timestamp": "2025-08-17T16:45:00Z",
      "status": "completed",
      "details": {
        "algorithm": "BioHarvest DeepProtein v4.1",
        "processingTime": "2.1 seconds",
        "dataPoints": 8934,
        "researcher": "Dr. Maria Rodriguez",
        "methodology": "Thermal stability analysis",
        "notes": "Enhanced chaperone activity under heat stress conditions"
      }
    }
  ],
  "exportedAt": "2025-09-19T09:20:58.425Z",
  "exportedBy": "BioHarvest AI Platform"
};

export default function PredictionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [predictionFilter, setPredictionFilter] = useState("all");
  const [selectedPrediction, setSelectedPrediction] = useState<typeof PREDICTION_HISTORY.predictions[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "beneficial":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "neutral":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "detrimental":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-emerald-600";
    if (confidence >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredPredictions = PREDICTION_HISTORY.predictions.filter(pred => {
    const matchesSearch = searchQuery === "" ||
      pred.geneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pred.mutation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pred.trait.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || pred.status === statusFilter;
    const matchesPrediction = predictionFilter === "all" || pred.prediction === predictionFilter;
    
    return matchesSearch && matchesStatus && matchesPrediction;
  });

  const exportData = () => {
    const dataStr = JSON.stringify(PREDICTION_HISTORY, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bioharvest_prediction_history.json";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <History className="h-4 w-4" />
                Analysis History & Results
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Prediction History
              </h1>
              <p className="text-slate-600 text-lg mt-2">
                Track and analyze your genetic mutation predictions and AI insights
              </p>
            </div>
            <Button
              onClick={exportData}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Predictions</p>
                    <p className="text-2xl font-bold text-emerald-600">{PREDICTION_HISTORY.totalPredictions}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {PREDICTION_HISTORY.predictions.filter(p => p.status === "completed").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Processing</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {PREDICTION_HISTORY.predictions.filter(p => p.status === "processing").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Beneficial</p>
                    <p className="text-2xl font-bold text-teal-600">
                      {PREDICTION_HISTORY.predictions.filter(p => p.prediction === "beneficial").length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-teal-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by gene name, mutation, or trait..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur border-slate-200"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white/80 backdrop-blur text-sm"
              title="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={predictionFilter}
              onChange={(e) => setPredictionFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white/80 backdrop-blur text-sm"
              title="Filter by prediction type"
            >
              <option value="all">All Predictions</option>
              <option value="beneficial">Beneficial</option>
              <option value="neutral">Neutral</option>
              <option value="detrimental">Detrimental</option>
            </select>
          </div>
        </motion.div>

        {/* Predictions List */}
        <div className="space-y-4">
          {filteredPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 backdrop-blur border-slate-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(prediction.status)}
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {prediction.geneName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {prediction.geneId} • {prediction.mutation}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getPredictionColor(prediction.prediction)} variant="outline">
                        {prediction.prediction}
                      </Badge>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${getConfidenceColor(prediction.confidence)}`}>
                          {Math.round(prediction.confidence * 100)}% confidence
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(prediction.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPrediction(prediction)}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-slate-600 mb-1">Target Trait</p>
                      <p className="text-sm text-slate-800">{prediction.trait}</p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-slate-600 mb-1">Algorithm</p>
                      <p className="text-sm text-slate-800">{prediction.details.algorithm}</p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-slate-600 mb-1">Researcher</p>
                      <p className="text-sm text-slate-800">{prediction.details.researcher}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-medium text-slate-600 mb-1">Analysis Notes</p>
                    <p className="text-sm text-slate-700">{prediction.details.notes}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Processing Time: {prediction.details.processingTime}</span>
                    <span>Data Points: {prediction.details.dataPoints.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPredictions.length === 0 && (
          <Card className="bg-white/80 backdrop-blur border-slate-200">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No predictions found</h3>
              <p className="text-slate-600">
                Try adjusting your search query or filters to find relevant predictions.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Export Info */}
        <Card className="mt-8 bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  Data exported on {new Date(PREDICTION_HISTORY.exportedAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-emerald-600">
                  Generated by {PREDICTION_HISTORY.exportedBy}
                </p>
              </div>
              <RefreshCw className="h-4 w-4 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
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
                      <Badge className={getPredictionColor(selectedPrediction.prediction)}>
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

              {/* Analysis Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-800">Analysis Details</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div><span className="font-medium">Algorithm:</span> {selectedPrediction.details.algorithm}</div>
                  <div><span className="font-medium">Researcher:</span> {selectedPrediction.details.researcher}</div>
                  <div><span className="font-medium">Methodology:</span> {selectedPrediction.details.methodology}</div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-slate-500" />
                    <span>{new Date(selectedPrediction.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-800">Analysis Notes</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700">{selectedPrediction.details.notes}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}