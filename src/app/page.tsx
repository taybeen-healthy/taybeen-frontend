"use client";

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
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30">
      <Navbar />

      <main>
        <div style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(247, 165, 3, 0.14) 100%)" }}>
          <Hero />
          <FeaturesBar />
        </div>

        <BestSellers />
        <OurStory />
        <SpecialOffer />
        <Gifting />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
