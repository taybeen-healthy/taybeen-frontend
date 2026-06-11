"use client";

import React from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { FaqSection } from "@/components/sections/our-story/FaqSection";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* 1. Hero / Banner Section */}
        <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-start overflow-hidden pt-36 sm:pt-40 md:pt-44 pb-16 md:pb-24">
          <Image
            src="/ComingSoon Dates.png"
            alt="A Gift from the Desert background"
            fill
            className="object-cover object-center pointer-events-none"
            priority
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40 z-0" />
          
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 w-full text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-1.5 bg-[#5A3E2B]/50 border border-[#F6EBDA]/30 backdrop-blur-sm text-[#FFDA8C] font-poppins text-[10px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span>Started in 2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold text-white leading-[1.1] max-w-xl">
              A Gift <br />
              from the <br />
              <span className="text-[#F7A503] italic font-serif">Desert.</span>
            </h1>
            
            <p className="max-w-md md:max-w-lg text-sm sm:text-base md:text-lg font-poppins text-white/95 leading-relaxed">
              Inspired by the desert&apos;s most treasured fruit — TAYBEEN brings premium dates and date-based creations to everyday life.
            </p>
            
            <div className="border-l-2 border-[#F7A503] pl-3">
              <p className="text-[#F7A503] font-serif italic text-sm sm:text-base md:text-lg">
                A Gift from the Desert, shared with the world.
              </p>
            </div>
          </div>
        </section>

        <main>
          {/* 2. Why Dates? Section */}
          <Section bg="cream" className="py-16 sm:py-20 md:py-24" id="why-dates">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-20 items-center">
              
              {/* Left Column: Content */}
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 bg-[#FFEABF] text-[#5A3E2B] font-poppins font-bold text-[10px] sm:text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
                  <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-green" />
                  <span>The Fruit Behind the Brand</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown leading-tight">
                  Why Dates?
                </h2>
                
                <div className="space-y-4 font-poppins text-sm sm:text-base text-brand-brown/85 leading-relaxed">
                  <p>
                    Because no other natural food does what a date does. One or two a day and you&apos;ve covered your quick energy, your fibre, your iron, and your potassium — with zero processing involved.
                  </p>
                  <p>
                    Dates aren&apos;t a trend. They&apos;re one of the oldest cultivated fruits on earth. We just think it&apos;s time more people in India discovered how extraordinary a really good date can taste.
                  </p>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="w-full relative flex justify-center lg:justify-end">
                <div className="w-full max-w-[550px] aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 shadow-md relative border border-brand-brown/10">
                  <Image
                    src="/7844d57c9be79ee5e7b88ccbc592df37 1.png"
                    alt="Why Dates"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

            </div>
          </Section>

          {/* 3. Mission Section */}
          <section className="py-6 sm:py-8 md:py-10 lg:py-12">
            <div className="max-w-[1440px] mx-auto px-0 lg:px-10 xl:px-12">
              <div className="relative w-full py-24 sm:py-28 md:py-36 overflow-hidden flex items-center justify-center text-center">
                <Image
                  src="/Image (Premium dates on a plate).png"
                  alt="Our Mission background"
                  fill
                  className="object-cover object-center pointer-events-none"
                  priority
                />
                {/* Cinematic dark overlay with olive undertones */}
                <div className="absolute inset-0 bg-[#2C3A1A]/40 mix-blend-multiply z-0" />
                <div className="absolute inset-0 bg-black/35 z-0" />
                
                <div className="relative z-10 w-full space-y-4 sm:space-y-6 px-6 sm:px-12 md:px-16">
                  <div className="inline-block bg-[#F7A503] text-[#5A3E2B] font-poppins font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-2">
                    OUR MISSION
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-bold text-white max-w-4xl mx-auto leading-[1.3]">
                    To help people rediscover dates — not only as a symbol of tradition and generosity, but as a{" "}
                    <span className="text-[#F7A503] italic font-serif">wholesome part of modern living.</span>
                  </h2>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Founder's Note Section */}
          <Section bg="cream" className="py-16 sm:py-20 md:py-24" id="founders-note">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 xl:gap-24 items-center">
              
              {/* Left Column: Image with Signature Box */}
              <div className="w-full relative pb-8 lg:pb-0">
                <div className="w-full max-w-[480px] mx-auto lg:max-w-none aspect-[10/11] sm:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 shadow-md relative border border-brand-brown/10">
                  <Image
                    src="/Image (Pile of premium dates).png"
                    alt="Founder stuffed dates"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Overlaid Signature nameplate - Right-aligned on desktop screens (lg) */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 lg:-right-6 bg-white border border-[#5A3E2B]/10 rounded-xl p-4 sm:p-5 shadow-premium z-10 text-left sm:min-w-[280px]">
                  <h4 className="font-serif font-bold text-[#5A3E2B] text-lg sm:text-xl leading-tight">
                    Mohd Arif
                  </h4>
                  <p className="text-[#768C3A] font-poppins text-xs sm:text-sm font-semibold mt-1">
                    Founder &amp; CEO, Taybeen
                  </p>
                </div>
              </div>

              {/* Right Column: Founder Note Content */}
              <div className="space-y-6 text-left mt-6 lg:mt-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown leading-tight">
                  Founder&apos;s Note
                </h2>
                
                {/* Styled Quote Icon */}
                <span className="text-[#F7A503] font-serif text-6xl md:text-7xl leading-none select-none block -mb-6">“</span>
                
                <div className="space-y-4 font-poppins text-sm sm:text-base text-brand-brown/85 leading-relaxed">
                  <p>
                    I started Taybeen because I was tired of compromising. Tired of snacks that claimed to be natural but came with a list of ingredients that read like a chemistry paper.
                  </p>
                  <p>
                    Dates were always the answer for me — but finding good dates in India felt impossible. The ones at supermarkets were old, or coated, or just... sad. So I decided to go find the good ones myself.
                  </p>
                  <p>
                    We&apos;re still a small team. That&apos;s intentional. It means I can still personally approve every supplier. Every variety we add to the range has been tasted, tested, and obsessed over.
                  </p>
                </div>
              </div>

            </div>
          </Section>

          {/* 5. FAQ Accordion Section */}
          <FaqSection />
        </main>
      </div>

      <Footer />
    </div>
  );
}
