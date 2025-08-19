import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ImpactLevel = "enhance" | "neutral" | "impair";
export type ConfidenceLevel = "Low" | "Medium" | "High";

export type GeneInfo = {
  id: string;
  name: string;
  trait: "Drought Tolerance" | "Salt Tolerance";
  description: string;
  sequence: string;
};

export type Prediction = {
  id: string;
  geneId: string;
  position: number;
  original: string;
  mutated: string;
  impact: ImpactLevel;
  confidence: ConfidenceLevel;
  createdAt: number;
};

type BioHarvestState = {
  genes: Record<string, GeneInfo>;
  predictions: Prediction[];
  addPrediction: (p: Omit<Prediction, "id" | "createdAt"> & Partial<Pick<Prediction, "id" | "createdAt">>) => Prediction;
  clearPredictions: () => void;
};

export const useBioStore = create<BioHarvestState>()(
  persist(
    (set) => ({
      genes: {
        DREB1A: {
          id: "DREB1A",
          name: "DREB1A",
          trait: "Drought Tolerance",
          description: "Key transcription factor in plant stress response.",
          sequence:
            "MADSKEEDKSTTSSSSSSSSSSSSSSNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNMTEYKLVVVGAGGVGKTCLLISYTTNQFVKQHFKVDKCPNVTPIILVGNKVDLKSQKSIADYLVGQNNLDKIRDLPMKSVKSTVGIDVIDAGDGVVIRVDRNKDNTKLDLQFAGQGDTQVIDSNTKST",
        },
        NHX1: {
          id: "NHX1",
          name: "NHX1",
          trait: "Salt Tolerance",
          description: "Vacuolar Na+/H+ antiporter linked to salinity tolerance.",
          sequence:
            "MALWMRLLPLLALLALWGPGPGAGGQGKRKRRQKRPQGIVGGYIGAGSTVANQLLLEKQGKKVVLKSDKTNVNVIVATDKKDGKVRGITKDGKTTWTPELSTHVLKDGK",
        },
      },
      predictions: [],
      addPrediction: (p) => {
        const withIds: Prediction = {
          id:
            p.id ||
            (typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random()}`),
          createdAt: p.createdAt || Date.now(),
          geneId: p.geneId,
          position: p.position,
          original: p.original,
          mutated: p.mutated,
          impact: p.impact,
          confidence: p.confidence,
        };
        set((s) => ({ predictions: [withIds, ...s.predictions].slice(0, 25) }));
        return withIds;
      },
      clearPredictions: () => set({ predictions: [] }),
    }),
    {
      name: "bh-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ predictions: state.predictions }),
    }
  )
);


