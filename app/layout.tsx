import type { Metadata } from "next";
import { Alexandria, Artifika, B612_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const alexandria = Alexandria({ subsets: ["latin"], variable: "--font-alexandria" });
const artifika = Artifika({ subsets: ["latin"], weight: ["400"], variable: "--font-artifika" });
const b612mono = B612_Mono({ subsets: ["latin"], weight: ["400","700"], variable: "--font-b612-mono" });

export const metadata: Metadata = {
  title: "BioHarvest AI",
  description: "Accelerate climate-resilient crops with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alexandria.variable} ${artifika.variable} ${b612mono.variable} antialiased bg-white text-slate-900 min-h-screen`}>
        <TooltipProvider>
          <Header />
          <main className="relative">{children}</main>
          <Footer />
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  );
}
