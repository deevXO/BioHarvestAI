"use client";
import { useMemo } from "react";
import { useBioStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function impactClass(impact: "enhance" | "neutral" | "impair") {
  if (impact === "enhance") return "bg-primary/20 text-primary border-primary/40";
  if (impact === "neutral") return "bg-amber-500/20 text-amber-400 border-amber-700/40";
  return "bg-red-500/20 text-red-400 border-red-700/40";
}

export function PredictionHistory() {
  const predictions = useBioStore((s) => s.predictions);
  const rows = useMemo(() => predictions.slice(0, 10), [predictions]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prediction History</CardTitle>
        <Button size="sm" variant="secondary" onClick={() => useBioStore.getState().clearPredictions()}>Clear</Button>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-muted-foreground text-sm">No predictions yet.</p>
        ) : (
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gene</TableHead>
                  <TableHead>Mutation</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.geneId}</TableCell>
                    <TableCell>
                      {r.original}{r.position}{r.mutated}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={impactClass(r.impact)}>{r.impact}</Badge>
                    </TableCell>
                    <TableCell>{r.confidence}</TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleTimeString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


