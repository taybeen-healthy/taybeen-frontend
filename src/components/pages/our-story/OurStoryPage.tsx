"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ourStoryData } from "@/data/ourStoryData";
import {
  HeroSection,
  WhyDatesSection,
  MissionSection,
  FounderNoteSection,
  FAQSection
} from "@/components/sections/our-story";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <HeroSection data={ourStoryData.hero} />
          <WhyDatesSection data={ourStoryData.whyDates} />
          <MissionSection data={ourStoryData.mission} />
          <FounderNoteSection data={ourStoryData.founder} />
          <FAQSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}
