import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Taybeen | Coming Soon",
  description: "Taybeen is a premium date brand dedicated to purity, taste, and natural nutrition. Every pack is carefully sourced and thoughtfully packed to bring you the finest quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", poppins.variable, poppins.className)}>
        {children}
      </body>
    </html>
  );
}
