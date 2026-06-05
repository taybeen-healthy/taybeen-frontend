/**
 * Taybeen Landing Page — Main page component.
 *
 * This is the primary entry point for the Taybeen e-commerce landing page.
 * It composes all section components in order to create a single-page
 * application experience within the Next.js App Router.
 *
 * Marked as "use client" because child components use:
 *   - useState (Navbar mobile menu toggle)
 *   - framer-motion (Hero floating card animations)
 *
 * Section order (matches original React App.tsx):
 *   1. Navbar       — Fixed top navigation with logo, links, and mobile menu
 *   2. Hero         — Main hero with headline, CTAs, and animated image grid
 *   3. FeaturesBar  — Horizontal bar of four key selling points
 *   4. BestSellers  — Product card grid of top-selling date varieties
 *   5. OurStory     — Brand story with image, description, and highlight cards
 *   6. SpecialOffer — Promotional 50% off banner
 *   7. Gifting      — Premium gifting showcase with multi-card grid
 *   8. Testimonials — Customer review cards with ratings
 *   9. Footer       — Site footer with links, newsletter, and copyright
 *
 * Migrated from TB-Dualite (Vite + React) project with full visual fidelity.
 */

"use client";

/* ── Section Component Imports ── */
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturesBar } from "@/components/sections/FeaturesBar";
import { BestSellers } from "@/components/sections/BestSellers";
import { OurStory } from "@/components/sections/OurStory";
import { SpecialOffer } from "@/components/sections/SpecialOffer";
import { Gifting } from "@/components/sections/Gifting";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    /* Root container — matches the original React App.tsx wrapper div */
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30">

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Main content area — all landing page sections */}
      <main>
        {/* Hero section with headline, CTAs, and animated image grid */}
        <Hero />

        {/* Feature highlights strip (100% Natural, No Additives, etc.) */}
        <FeaturesBar />

        {/* Best selling date product cards */}
        <BestSellers />

        {/* Brand story and values section */}
        <OurStory />

        {/* Special promotional offer banner */}
        <SpecialOffer />

        {/* Premium gifting showcase */}
        <Gifting />

        {/* Customer testimonials / reviews */}
        <Testimonials />
      </main>

      {/* Site footer with navigation, newsletter, and copyright */}
      <Footer />
    </div>
  );
}
