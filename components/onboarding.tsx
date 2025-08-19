"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export function Onboarding() {
  useEffect(() => {
    try {
      const key = "bh-onboarded";
      if (typeof window === "undefined") return;
      if (!localStorage.getItem(key)) {
        toast.message("Welcome to BioHarvest AI", {
          description: "Start by exploring genes and trying a mutation.",
          action: {
            label: "Explore Genes",
            onClick: () => (window.location.href = "/genes"),
          },
        });
        localStorage.setItem(key, "1");
      }
    } catch {}
  }, []);
  return null;
}


