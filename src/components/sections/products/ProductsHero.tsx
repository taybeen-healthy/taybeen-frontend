import React from "react";
import Image from "next/image";
import { HERO_BANNER } from "@/data/productsPageData";

export const ProductsHero: React.FC = () => {
  return (
    <div className="relative w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] mt-[74px] md:mt-[88px] lg:mt-[99px] overflow-hidden select-none">
      <Image
        src={HERO_BANNER.src}
        alt={HERO_BANNER.alt}
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  );
};

export default ProductsHero;
