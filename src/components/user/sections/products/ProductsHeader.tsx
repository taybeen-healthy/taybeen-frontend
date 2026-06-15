import React from "react";
import { CategoryDetail } from "@/types";

interface ProductsHeaderProps {
  details: CategoryDetail;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({ details }) => {
  return (
    <div className="text-center max-w-3xl mx-auto px-6 pt-10 pb-6 md:pt-16 md:pb-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-3 md:mb-4">
        {details.title}
      </h1>
      <p className="text-brand-green-light font-poppins text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
        {details.description}
      </p>
    </div>
  );
};

export default ProductsHeader;
