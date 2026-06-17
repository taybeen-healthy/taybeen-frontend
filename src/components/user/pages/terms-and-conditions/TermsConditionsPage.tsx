"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { legalData } from "@/data/user/legalData";

export const TermsConditionsPage: React.FC = () => {
  const { title, paragraphs } = legalData.termsConditions;

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Reusable Header Image Banner */}
        <Hero src="/OurProducts Header.png" alt="Terms & Conditions Header Banner" />

        {/* Page Content Container */}
        <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 sm:py-16 md:py-20 text-left font-poppins">
          <h1 className="font-serif font-bold text-brand-brown text-3xl sm:text-4xl md:text-5xl leading-tight mb-10 pb-5 border-b border-[#C4A482]/25">
            {title}
          </h1>

          <div className="space-y-6 text-brand-green/90 text-sm sm:text-base leading-[1.8]">
            {paragraphs.map((p, idx) => {
              if (p.includes("contactus@taybeen.com")) {
                const parts = p.split("contactus@taybeen.com");
                return (
                  <p key={idx}>
                    {parts[0]}
                    <a href="mailto:contactus@taybeen.com" className="text-brand-primary hover:underline font-medium">
                      contactus@taybeen.com
                    </a>
                    {parts[1]}
                  </p>
                );
              }
              return <p key={idx}>{p}</p>;
            })}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
