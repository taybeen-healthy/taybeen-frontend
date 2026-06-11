import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { orderConfirmedData } from "@/data/orderConfirmedData";

export const OrderConfirmedHeader: React.FC = () => {
  return (
    <>
      {/* Background botanical branch line-art */}
      <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[400px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src="/authBg.png"
          alt="Botanical Background"
          fill
          className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
          priority
        />
      </div>

      {/* Centered circular badge and header content */}
      <section className="h-[46vh] min-h-[400px] lg:h-[48vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 pt-20 relative z-10 select-none">
        {/* Checked Circular Badge with Light Outer Circle */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-brand-green-pale flex items-center justify-center mb-6">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#718742] text-white flex items-center justify-center shadow-md">
            <Check className="w-7 h-7 sm:w-10 sm:h-10" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#5A3E2B] leading-tight">
          {orderConfirmedData.title}
        </h1>

        {/* Subtitle */}
        <p className="text-[#768C3A] font-poppins text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mt-4">
          {orderConfirmedData.subtitle}
        </p>
      </section>
    </>
  );
};

export default OrderConfirmedHeader;
