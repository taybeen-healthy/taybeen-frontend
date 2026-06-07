/**
 * Taybeen Landing Page — Main page component.
 *
 * Composes all section components to create the single-page landing
 * experience within the Next.js App Router.
 *
 * Marked as "use client" because child components use:
 *   - useState (Navbar mobile menu toggle)
 *   - framer-motion (Hero floating card animations)
 */

"use client";

/* ── Section Component Imports ── */
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturesBar } from "@/components/sections/FeaturesBar";
import { BestSellers } from "@/components/sections/BestSellers";
import { OurStory } from "@/components/sections/OurStory";
import { SpecialOffer } from "@/components/sections/SpecialOffer";
import { Gifting } from "@/components/sections/Gifting";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    /* Root container */
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
