import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
});

const playfair = localFont({
  src: [
    {
      path: "../../public/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/Playfair_Display/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
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
          dmSans.variable,
          playfair.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
