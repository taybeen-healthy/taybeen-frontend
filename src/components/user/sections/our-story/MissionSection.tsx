import React from "react";
import Image from "next/image";
import { SectionContent } from "@/data/user/ourStoryData";

interface MissionSectionProps {
  data: SectionContent;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ data }) => {
  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-0 lg:px-10 xl:px-12">
        <div className="relative w-full py-24 sm:py-28 md:py-36 overflow-hidden flex items-center justify-center text-center">
          {data.imagePath && (
            <Image
              src={data.imagePath}
              alt="Our Mission background"
              fill
              className="object-cover object-center pointer-events-none"
              priority
            />
          )}
          <div className="absolute inset-0 bg-[#2C3A1A]/40 mix-blend-multiply z-0" />
          <div className="absolute inset-0 bg-black/35 z-0" />

          <div className="relative z-10 w-full space-y-4 sm:space-y-6 px-6 sm:px-12 md:px-16">
            {data.pillText && (
              <div className="inline-block bg-[#F7A503] text-[#5A3E2B] font-poppins font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-2">
                {data.pillText}
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-bold text-white max-w-4xl mx-auto leading-[1.3]">
              To help people rediscover dates — not only as a symbol of tradition and generosity, but as a{" "}
              <span className="text-[#F7A503] italic font-serif">wholesome part of modern living.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
