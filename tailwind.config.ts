/** Tailwind CSS configuration — brand design tokens, fonts, and custom utilities. */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Font Families ── */
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        dm: ["var(--font-dm)", "DM Sans", "sans-serif"],
      },

      /* ── Brand Color Palette ── */
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          bg: "#FDFAF3",
          primary: "#F7A503",
          green: "#4A5E28",
          "green-light": "#768C3A",
          "green-pale": "#F0F4D8",
          "green-dark": "#3A2418",
          brown: "#5A3E2B",
          "brown-dark": "#3A2418",
          gold: "#D4AF37",
        },
      },

      /* ── Custom Border Radii ── */
      borderRadius: {
        "3xl": "24px",
        "4xl": "48px",
      },

      /* ── Custom Box Shadows ── */
      boxShadow: {
        premium: "0px 40px 100px 0px rgba(44, 58, 26, 0.22)",
        card: "0px 16px 48px 0px rgba(44, 58, 26, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
