import React from "react";
import Image from "next/image";
import { ContactHeroContent } from "@/data/contactData";

interface ContactHeroProps {
  data: ContactHeroContent;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ data }) => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[380px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src={data.backgroundImage}
          alt="Botanical Background"
          fill
          className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
          priority
        />
      </div>

      <section className="h-[46vh] min-h-[380px] lg:h-[48vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 pt-16 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#5A3E2B] leading-tight">
          {data.title}
        </h1>
        <p className="text-brand-green font-poppins text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mt-4">
          {data.description}
        </p>
      </section>
    </>
  );
};

export default ContactHero;
