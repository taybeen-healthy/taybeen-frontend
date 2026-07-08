import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { orderConfirmedData } from "@/data/user/orderConfirmedData";

export const OrderConfirmedHeader: React.FC = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[400px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src="/authBG.webp"
          alt="Botanical Background"
          fill
          className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
          priority
        />
      </div>

      <section className="h-[46vh] min-h-[400px] lg:h-[48vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 pt-20 relative z-10 select-none">
        <div className="w-24 h-24 sm:w-32 lg:w-28 sm:h-32 lg:h-28 rounded-full bg-brand-green-pale flex items-center justify-center mb-4 lg:mb-3">
          <div className="w-14 h-14 sm:w-20 lg:w-16 sm:h-20 lg:h-16 rounded-full bg-[#718742] text-white flex items-center justify-center shadow-md">
            <Check className="w-7 h-7 sm:w-10 lg:w-8 sm:h-10 lg:h-8" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[2.25rem] font-serif font-bold text-typo1 leading-tight">
          {orderConfirmedData.title}
        </h1>

        <p className="text-typo2 font-poppins text-xs sm:text-sm md:text-base lg:text-sm leading-relaxed max-w-2xl mt-4 lg:mt-3">
          {orderConfirmedData.subtitle}
        </p>
      </section>
    </>
  );
};

export default OrderConfirmedHeader;
