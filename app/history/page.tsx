"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { History, Search, Download, Trash2, Calendar, Dna, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

type PredictionResult = {
  id: string;
  geneId: string;
  mutation: string;
  trait: string;
  prediction: "beneficial" | "neutral" | "harmful";
  confidence: number;
  timestamp: string;
  status: "completed" | "processing" | "failed";
};

const mockHistory: PredictionResult[] = [
  {
    id: "pred_001",
    geneId: "DREB1A",
    mutation: "A142V",
    trait: "Drought Tolerance",
    prediction: "beneficial",
    confidence: 0.87,
    timestamp: "2025-08-19T10:30:00Z",
    status: "completed"
  },
  {
    id: "pred_002",
    geneId: "NHX1",
    mutation: "L89F",
    trait: "Salt Tolerance",
    prediction: "harmful",
    confidence: 0.92,
    timestamp: "2025-08-19T09:15:00Z",
    status: "completed"
  },
  {
    id: "pred_003",
    geneId: "HSP70",
    mutation: "G45R",
    trait: "Heat Resistance",
    prediction: "beneficial",
    confidence: 0.78,
    timestamp: "2025-08-19T08:45:00Z",
    status: "completed"
  },
  {
    id: "pred_004",
    geneId: "LEA14",
    mutation: "T167A",
    trait: "Drought Tolerance",
    prediction: "neutral",
    confidence: 0.65,
    timestamp: "2025-08-19T08:00:00Z",
    status: "processing"
  },
  {
    id: "pred_005",
    geneId: "SOS1",
    mutation: "K234E",
    trait: "Salt Tolerance",
    prediction: "beneficial",
    confidence: 0.91,
    timestamp: "2025-08-18T16:20:00Z",
    status: "completed"
  },
  {
    id: "pred_006",
    geneId: "RPM1",
    mutation: "D78N",
    trait: "Disease Resistance",
    prediction: "harmful",
    confidence: 0.83,
    timestamp: "2025-08-18T14:10:00Z",
    status: "failed"
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

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredHistory = mockHistory.filter(item =>
    item.geneId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mutation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.trait.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedItems([]);

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
              <Card className={`border-${stat.color}-200 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold text-${stat.color}-700`}>{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg bg-${stat.color}-200 flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by gene, mutation, or trait..."
                    className="pl-10 border-slate-200 focus:border-emerald-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  {selectedItems.length > 0 && (
                    <>
                      <span className="text-sm text-slate-600">
                        {selectedItems.length} selected
                      </span>
                      <Button size="sm" variant="outline" onClick={clearSelection}>
                        Clear
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item, index) => {
            const predictionStyle = getPredictionColor(item.prediction);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className={`border-slate-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${selectedItems.includes(item.id) ? 'ring-2 ring-emerald-400' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          title={`Select prediction ${item.id}`}
                          aria-label={`Select prediction ${item.id}`}
                        />
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Dna className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-800">{item.geneId}</h3>
                              <Badge variant="outline" className="text-xs">
                                {item.mutation}
                              </Badge>
                              {getStatusIcon(item.status)}
                            </div>
                            <p className="text-sm text-slate-600">{item.trait}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <Badge 
                            className={`${predictionStyle.bg} ${predictionStyle.text} ${predictionStyle.border} font-medium`}
                            variant="outline"
                          >
                            {item.prediction}
                          </Badge>
                          <div className="text-sm text-slate-500 mt-1">
                            {(item.confidence * 100).toFixed(0)}% confidence
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Calendar className="h-4 w-4" />
                            {formatDate(item.timestamp)}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            ID: {item.id}
                          </div>
                        </div>

                        <Button size="sm" variant="outline" className="hover:bg-emerald-50">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredHistory.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <History className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No predictions found</h3>
            <p className="text-slate-500 mb-6">Start analyzing genes to build your prediction history</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Dna className="h-4 w-4 mr-2" />
              Start New Analysis
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}


