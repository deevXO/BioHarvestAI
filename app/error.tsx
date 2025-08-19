"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">An unexpected error occurred. You can try again.</p>
      <div className="mt-6">
        <Button onClick={() => reset()} className="bg-primary hover:bg-primary/90 text-primary-foreground">Try again</Button>
      </div>
    </div>
  );
}


