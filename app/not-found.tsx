import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-muted-foreground">The page you are looking for doesn’t exist or has been moved.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Go home</Button>
        </Link>
        <Link href="/genes">
          <Button variant="secondary">Explore genes</Button>
        </Link>
      </div>
    </div>
  );
}


