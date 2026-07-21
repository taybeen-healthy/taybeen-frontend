import React from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { FounderData } from "@/data/user/ourStoryData";

interface FounderNoteSectionProps {
  data: FounderData;
}

export const FounderNoteSection: React.FC<FounderNoteSectionProps> = ({ data }) => {
  return (
    <Section bg="cream" className="py-16 sm:py-20 md:py-24" id="founders-note">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-16 xl:gap-24 items-center">
        <h2 className="lg:hidden text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown leading-tight w-full text-left">
          {data.title}
        </h2>

        <div className="w-full lg:max-w-[460px] xl:max-w-[500px] mx-auto lg:mx-0 relative pb-8 lg:pb-0">
          <div className="w-full aspect-[10/11] sm:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 shadow-md relative border border-brand-brown/10">
            <Image
              src={data.imagePath}
              alt="Founder"
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 lg:-right-10 bg-white border border-[#5A3E2B]/10 rounded-xl p-4 shadow-premium z-10 text-left min-w-[300px] sm:min-w-[360px]">
            <h4 className="font-serif font-bold text-[#5A3E2B] text-sm sm:text-base leading-tight whitespace-nowrap">
              {data.name}
            </h4>
            <p className="text-[#768C3A] font-poppins text-[10px] sm:text-xs font-semibold mt-0.5 whitespace-nowrap">
              {data.role}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="hidden lg:block text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown leading-tight">
            {data.title}
          </h2>

          <span className="text-[#F7A503] font-serif text-6xl md:text-7xl leading-none select-none block -mb-6">
            “
          </span>

          <div className="space-y-4 font-poppins text-sm sm:text-base text-brand-brown/85 leading-relaxed">
            <p>{data.quote}</p>
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FounderNoteSection;
