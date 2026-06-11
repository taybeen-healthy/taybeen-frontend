import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { reviewPageData } from "@/data/reviewPageData";

export const ReviewHeader: React.FC = () => {
  return (
    <>
      <div className="mb-6 lg:mb-8 text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-light font-poppins font-semibold text-xs md:text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="hidden lg:flex flex-col items-center text-center mb-8 space-y-4">
        <Image
          src={reviewPageData.logoUrl}
          alt="Taybeen Logo"
          width={160}
          height={72}
          className="h-14 xl:h-[68px] w-auto object-contain select-none"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-4xl xl:text-[2.75rem] font-serif font-bold text-[#2C3A1A] leading-tight">
            {reviewPageData.desktopHeader.title}
          </h1>
          <p className="text-[#7D6B5E] font-poppins text-sm leading-relaxed max-w-md mx-auto">
            We&apos;d love to hear about your experience.<br />
            Your feedback helps us serve you better!
          </p>
        </div>
      </div>

      <div className="flex lg:hidden flex-col items-center text-center mb-8">
        <div className="w-full max-w-[315px] aspect-[3/4] relative mb-6 rounded-xl overflow-hidden bg-white border border-[#F2EADA] mx-auto">
          <Image
            src={reviewPageData.comingSoonImage}
            alt="Taybeen Premium Dates"
            fill
            className="object-contain select-none pointer-events-none"
            priority
          />
        </div>
        <Image
          src={reviewPageData.logoUrl}
          alt="Taybeen Logo"
          width={130}
          height={58}
          className="h-11 w-auto object-contain mb-4 select-none"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-green leading-tight">
            Something Sweet is <br />
            <span className="text-brand-primary">Arriving Soon!</span>
          </h1>
          <p className="text-[#7D6B5E] font-poppins text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
            {reviewPageData.mobileComingSoon.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewHeader;
