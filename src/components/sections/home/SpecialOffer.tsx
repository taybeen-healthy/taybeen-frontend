import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { homeData } from "@/data/homeData";

export const SpecialOffer: React.FC = () => {
  const { specialOffer } = homeData;

  return (
    <Section bg="cream">
      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-16 xl:gap-20">

        <div className="flex-1 space-y-5 md:space-y-6 lg:space-y-7 text-center lg:text-left">
          <h4 className="text-brand-primary font-poppins font-bold text-lg sm:text-xl md:text-2xl">
            {specialOffer.tag}
          </h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] 2xl:text-6xl font-serif font-bold text-brand-brown leading-[1.1] -tracking-[0.025em]">
            {specialOffer.heading}
          </h2>
          <p className="text-brand-green mx-auto lg:mx-0 font-poppins text-sm sm:text-base lg:text-base xl:text-lg leading-relaxed max-w-xl">
            {specialOffer.description}
          </p>
        </div>

        <div className="w-full lg:w-auto lg:flex-shrink-0 max-w-[300px] sm:max-w-[340px] lg:max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] aspect-square rounded-xl overflow-hidden relative">
          <Image
            src={specialOffer.imageUrl}
            alt="Dates Bowl"
            fill
            sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, (max-width: 1024px) 320px, 400px"
            className="object-cover scale-125"
          />
        </div>
      </div>
    </Section>
  );
};
