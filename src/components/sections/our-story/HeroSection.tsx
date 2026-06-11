import React from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { SectionContent } from "@/data/ourStoryData";

interface HeroSectionProps {
  data: SectionContent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center justify-start overflow-hidden pt-36 sm:pt-40 md:pt-44 pb-16 md:pb-24">
      {data.imagePath && (
        <Image
          src={data.imagePath}
          alt={data.title}
          fill
          className="object-cover object-center pointer-events-none"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 w-full text-left space-y-6 sm:space-y-8">
        {data.pillText && (
          <div className="inline-flex items-center gap-1.5 bg-[#5A3E2B]/50 border border-[#F6EBDA]/30 backdrop-blur-sm text-[#FFDA8C] font-poppins text-[10px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{data.pillText}</span>
          </div>
        )}
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold text-white leading-[1.1] max-w-xl">
          A Gift <br />
          from the <br />
          <span className="text-[#F7A503] italic font-serif">Desert.</span>
        </h1>
        
        {data.description && (
          <p className="max-w-md md:max-w-lg text-sm sm:text-base md:text-lg font-poppins text-white/95 leading-relaxed">
            {data.description}
          </p>
        )}
        
        {data.tagline && (
          <div className="border-l-2 border-[#F7A503] pl-3">
            <p className="text-[#F7A503] font-serif italic text-sm sm:text-base md:text-lg">
              {data.tagline}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
