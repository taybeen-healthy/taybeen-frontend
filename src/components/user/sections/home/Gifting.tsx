import React from "react";
import Image from "next/image";
import { homeData } from "@/data/user/homeData";

export const Gifting: React.FC = () => {
  const { gifting } = homeData;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-16 bg-[#24351F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8 h-auto lg:h-[480px] xl:h-[540px] 2xl:h-[600px]">
          <div className="col-span-12 lg:col-span-7 flex flex-col lg:h-full justify-between gap-6 lg:gap-8 lg:min-h-0">
            <div className="space-y-3 md:space-y-4 text-center lg:text-left flex-shrink-0">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary">
                <span className="text-white font-poppins font-semibold text-xs md:text-sm uppercase tracking-wider">
                  {gifting.tag}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-serif font-bold text-white leading-tight">
                The Art of <span className="text-[#F7A503] font-serif">Premium</span>{" "}
                <br className="hidden lg:block" />
                <span className="text-[#F7A503] font-serif">Gifting</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden relative group min-h-[400px] lg:min-h-0 lg:flex-1">
              <Image
                src={gifting.mainCard.image}
                alt={gifting.mainCard.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                <span className="text-white font-poppins text-xs md:text-sm font-semibold">
                  {gifting.mainCard.tag}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/10 max-w-[420px]">
                <p className="text-white/80 font-poppins font-medium text-[10px] md:text-xs uppercase tracking-wider mb-1">
                  {gifting.mainCard.category}
                </p>
                <h3 className="text-[#F7A503] font-serif font-bold text-xl md:text-2xl">
                  {gifting.mainCard.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 lg:h-full justify-between lg:min-h-0">
            <div className="bg-brand-primary rounded-2xl overflow-hidden relative group w-full h-[220px] sm:h-[260px] lg:h-full lg:flex-1 lg:min-h-0">
              <Image
                src={gifting.subCards[0].image}
                alt={gifting.subCards[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-brand-green-light/80 backdrop-blur-sm">
                <span className="text-white font-poppins text-xs md:text-sm font-semibold">
                  {gifting.subCards[0].tag}
                </span>
              </div>
              <h3 className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white font-serif font-bold text-lg md:text-xl xl:text-2xl">
                {gifting.subCards[0].title}
              </h3>
            </div>

            <div className="bg-brand-primary rounded-2xl overflow-hidden relative group w-full h-[220px] sm:h-[260px] lg:h-full lg:flex-1 lg:min-h-0">
              <Image
                src={gifting.subCards[1].image}
                alt={gifting.subCards[1].title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-brand-green/80 backdrop-blur-sm">
                <span className="text-white font-poppins text-xs md:text-sm font-semibold">
                  {gifting.subCards[1].tag}
                </span>
              </div>
              <h3 className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white font-serif font-bold text-lg md:text-xl xl:text-2xl">
                {gifting.subCards[1].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
