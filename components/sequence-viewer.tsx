"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SequenceViewer({ sequence, highlightIndex, scrollToIndex }: { sequence: string; highlightIndex?: number; scrollToIndex?: number }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(sequence);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  const lines = useMemo(() => {
    const chunk = 60;
    const chars = sequence.split("");
    const out: string[] = [];
    for (let i = 0; i < chars.length; i += chunk) {
      out.push(chars.slice(i, i + chunk).join(""));
    }
    return out;
  }, [sequence]);

  useEffect(() => {
    if (typeof scrollToIndex !== "number") return;
    const el = document.querySelector(`[data-aa-index="${scrollToIndex}"]`);
    if (el && "scrollIntoView" in el) {
      (el as HTMLElement).scrollIntoView({ block: "center", inline: "center" });
    }
  }, [scrollToIndex]);

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" variant="secondary" onClick={onCopy} aria-label="Copy sequence">{copied ? "Copied" : "Copy"}</Button>
      </div>
      <div className="grid gap-1">
        {lines.map((ln, idx) => (
          <div className="grid grid-cols-[60px_1fr] items-start gap-3" key={idx}>
            <div className="text-xs text-muted-foreground tabular-nums">{idx * 60 + 1}</div>
            <div className="font-mono text-sm leading-6 break-all">
              {ln.split("").map((ch, i) => {
                const globalIndex = idx * 60 + i;
                const isHL = typeof highlightIndex === "number" && globalIndex === highlightIndex;
                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <span
                        data-aa-index={globalIndex}
                        className={`inline-block rounded ${isHL ? "bg-emerald-700/40 ring-1 ring-emerald-500/60 px-1" : ""}`}
                      >
                        {ch}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{aaInfo(ch)}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function aaInfo(ch: string) {
  const map: Record<string, string> = {
    A: "Alanine — Hydrophobic",
    C: "Cysteine — Polar",
    D: "Aspartic acid — Negative",
    E: "Glutamic acid — Negative",
    F: "Phenylalanine — Hydrophobic",
    G: "Glycine — Small",
    H: "Histidine — Positive",
    I: "Isoleucine — Hydrophobic",
    K: "Lysine — Positive",
    L: "Leucine — Hydrophobic",
    M: "Methionine — Hydrophobic",
    N: "Asparagine — Polar",
    P: "Proline — Cyclic",
    Q: "Glutamine — Polar",
    R: "Arginine — Positive",
    S: "Serine — Polar",
    T: "Threonine — Polar",
    V: "Valine — Hydrophobic",
    W: "Tryptophan — Hydrophobic",
    Y: "Tyrosine — Polar",
  };
  return map[(ch || "").toUpperCase()] || ch;
}

