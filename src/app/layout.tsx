/**
 * Root layout — configures Poppins and DM Sans fonts via next/font/google,
 * applies global styles, and sets page-level metadata.
 */

import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

/* Poppins — primary font used across the entire site */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

/* DM Sans — secondary font used for small labels and captions */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "Taybeen | Premium Dates — Pure, Natural & Authentic",
  description:
    "Taybeen is a premium date brand dedicated to purity, taste, and natural nutrition. Every pack is carefully sourced and thoughtfully packed to bring you the finest quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          poppins.variable,
          poppins.className,
          dmSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
