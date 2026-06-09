"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReviewForm } from "@/components/sections/review/ReviewForm";
import { ReviewSuccessModal } from "@/components/sections/review/ReviewSuccessModal";
import comingSoonImage from "../../../../public/ComingSoon Dates.png";

const logoUrl =
  "https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__";

export default function ReviewPage() {
  const [submitCount, setSubmitCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = () => {
    setSubmitCount((prev) => prev + 1);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {isSuccess && (
        <ReviewSuccessModal onReset={handleReset} />
      )}

      <div className="flex-1 lg:w-[55%] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 xl:px-20 bg-white">
        <div className="max-w-2xl mx-auto w-full">
          
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
              src={logoUrl}
              alt="Taybeen Logo"
              width={160}
              height={72}
              className="h-14 xl:h-[68px] w-auto object-contain select-none"
              priority
            />
            <div className="space-y-2">
              <h1 className="text-4xl xl:text-[2.75rem] font-serif font-bold text-[#2C3A1A] leading-tight">
                Leave a Review
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
                src={comingSoonImage}
                alt="Taybeen Premium Dates"
                fill
                className="object-contain select-none pointer-events-none"
                priority
              />
            </div>
            <Image
              src={logoUrl}
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
                We&apos;re crafting an exquisite experience for premium dates, elegant gifting and gourmet indulgence. Stay tuned!
              </p>
            </div>
          </div>

          <ReviewForm key={submitCount} onSubmitSuccess={() => setIsSuccess(true)} />

        </div>
      </div>

      <div className="hidden lg:flex lg:w-[45%] bg-white items-center justify-center border-l border-[#F2EADA] p-12 sticky top-0 h-screen select-none">
        <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
          <Image
            src={comingSoonImage}
            alt="Taybeen Premium Dates"
            fill
            className="object-contain select-none pointer-events-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
