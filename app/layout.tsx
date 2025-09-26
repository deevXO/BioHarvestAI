import type { Metadata } from "next";
import { Alexandria, Artifika, B612_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/lib/auth-context";

const alexandria = Alexandria({ subsets: ["latin"], variable: "--font-alexandria" });
const artifika = Artifika({ subsets: ["latin"], weight: ["400"], variable: "--font-artifika" });
const b612mono = B612_Mono({ subsets: ["latin"], weight: ["400","700"], variable: "--font-b612-mono" });

export const metadata: Metadata = {
  title: "BioHarvest AI",
  description: "Accelerate climate-resilient crops with AI",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#10b981" />
        <script src="https://3Dmol.org/build/3Dmol-min.js" async></script>
      </head>
      <body className={`${alexandria.variable} ${artifika.variable} ${b612mono.variable} font-sans antialiased bg-white text-slate-900 min-h-screen`}>
        <AuthProvider>
          <TooltipProvider>
            <Header />
            <main className="relative">{children}</main>
            <Footer />
            <Toaster richColors closeButton position="top-right" />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
