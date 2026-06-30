"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ourStoryData } from "@/data/user/ourStoryData";
import {
  HeroSection,
  WhyDatesSection,
  MissionSection,
  FounderNoteSection,
  FAQSection,
} from "@/components/user/sections/our-story";

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

          <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 pb-16 pt-4 text-left font-poppins">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 border-t-0 sm:border-t border-[#C4A482]/20 pt-6">
              <div className="bg-transparent w-40 h-20 flex items-center justify-center shrink-0">
                <Image
                  src="/Fssai.png"
                  alt="FSSAI Logo"
                  width={140}
                  height={64}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif text-[#5A3E2B] text-lg sm:text-xl md:text-2xl font-bold">
                  Food Safety Certified (FSSAI)
                </h3>
                <p className="text-[#768C3A] text-xs sm:text-sm md:text-base font-semibold">
                  Registration No: 23326011003218
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
