import React from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionContent } from "@/data/user/ourStoryData";

interface WhyDatesSectionProps {
  data: SectionContent;
}

export const WhyDatesSection: React.FC<WhyDatesSectionProps> = ({ data }) => {
  return (
    <Section bg="cream" className="py-16 sm:py-20 md:py-24" id="why-dates">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-20 items-center">
        <div className="space-y-6 text-left">
          {data.pillText && (
            <div className="inline-flex items-center gap-1.5 bg-[#FFEABF] text-[#5A3E2B] font-poppins font-bold text-[10px] sm:text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-green" />
              <span>{data.pillText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown leading-tight">
            {data.title}
          </h2>

          {data.paragraphs && (
            <div className="space-y-4 font-poppins text-sm sm:text-base text-brand-brown/85 leading-relaxed">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        <div className="w-full relative flex justify-center lg:justify-end">
          {data.imagePath && (
            <div className="w-full max-w-[550px] aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 shadow-md relative border border-brand-brown/10">
              <Image
                src={data.imagePath}
                alt={data.title}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default WhyDatesSection;
