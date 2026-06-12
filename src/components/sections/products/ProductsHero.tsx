import React from "react";
import { HERO_BANNER } from "@/data/productsPageData";
import { Hero } from "@/components/layout/Hero";

export const ProductsHero: React.FC = () => {
  return (
    <Hero
      src={HERO_BANNER.src}
      alt={HERO_BANNER.alt}
      className="h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px]"
    />
  );
};

export default ProductsHero;
