import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-auto flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden flex flex-col h-auto lg:h-full shadow-sm transition-all duration-300 border border-[#F2EADA] hover:border-brand-primary/60 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      <div className="relative h-[200px] lg:h-[210px] xl:h-[220px] 2xl:h-[230px] bg-brand-bg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.badge && (
          <div
            className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-white text-[9px] md:text-[10px] font-poppins font-bold uppercase tracking-wider shadow-sm select-none"
            style={{ backgroundColor: product.badgeColor }}
          >
            {product.badge}
          </div>
        )}
        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-brand-brown text-[9px] md:text-[10px] font-poppins font-bold shadow-sm border border-white/30 select-none">
          {product.weight}
        </div>
      </div>

      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg md:text-xl font-serif font-bold text-brand-brown leading-snug">
            {product.name}
          </h3>
          <p className="text-[#7D6B5E] font-poppins text-xs md:text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-[#F5EDE0] space-y-4 md:space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  fill={i < Math.floor(product.rating) ? "#F7A503" : "transparent"}
                  stroke="#F7A503"
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm font-poppins text-brand-brown/80 font-medium">
              {product.rating}{" "}
              <span className="text-[#8D7F75] font-normal">({product.reviewsCount.toLocaleString()})</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xl md:text-2xl font-poppins font-bold text-brand-brown">₹{product.price}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-9 h-9 md:w-10 md:h-10 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green-light active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(74,94,40,0.15)] cursor-pointer group/btn"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} className="md:w-[18px] md:h-[18px] transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
