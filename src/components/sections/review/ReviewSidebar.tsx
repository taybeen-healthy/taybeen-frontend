import React from "react";
import Image from "next/image";
import { reviewPageData } from "@/data/reviewPageData";

export const ReviewSidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-[45%] bg-white items-center justify-center border-l border-[#F2EADA] p-12 sticky top-0 h-screen select-none">
      <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
        <Image
          src={reviewPageData.comingSoonImage}
          alt="Taybeen Premium Dates"
          fill
          className="object-contain select-none pointer-events-none"
          priority
        />
      </div>
    </div>
  );
};

export default ReviewSidebar;
