import React from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  className?: string;
  variant?: "default" | "catalog";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  className,
  variant = "default",
}) => {
  // Set badge colors based on product badge type or a default color
  const getBadgeStyle = () => {
    if (product.badgeColor) {
      return { backgroundColor: product.badgeColor };
    }
    switch (product.badge?.toLowerCase()) {
      case "best-seller":
      case "best seller":
        return { backgroundColor: "#F7A503" }; // Yellow/gold badge in mockup
      case "new":
      case "new arrival":
        return { backgroundColor: "#4A5E28" }; // Green badge in mockup
      case "sacred & rare":
      case "rare":
        return { backgroundColor: "#5A3E2B" }; // Brown/olive badge in mockup
      default:
        return { backgroundColor: "#768C3A" };
    }
  };

  const isCatalog = variant === "catalog";

  if (isCatalog) {
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
        className={
          className ||
          "w-full bg-white rounded-2xl overflow-hidden flex flex-col h-full shadow-sm transition-all duration-300 border border-[#C4A482]/40 hover:border-brand-primary/60 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        }
      >
        {/* Image Container with Rounded Corners & Transitions */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white p-2">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#F6F1E9]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>

          {/* Floating Badge (Top Left) - Hidden on Mobile */}
          {product.badge && (
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[9px] md:text-[10px] font-poppins font-bold uppercase tracking-wider shadow-sm select-none hidden lg:block"
              style={getBadgeStyle()}
            >
              {product.badge}
            </div>
          )}
        </div>

        {/* Content Container (Title & Price Only, responsive layout) */}
        <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-1 lg:gap-4 w-full">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-serif font-bold text-brand-brown leading-snug group-hover:text-brand-green transition-colors duration-200 text-left line-clamp-2">
              {product.name}
            </h3>
            <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-poppins font-bold text-[#5A3E2B] whitespace-nowrap">
              ₹{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default Home Page layout (BestSellers slider cards)
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
      className={
        className ||
        "w-[280px] sm:w-[320px] md:w-[340px] lg:w-auto flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden flex flex-col h-auto lg:h-full shadow-sm transition-all duration-300 border border-[#F2EADA] hover:border-brand-primary/60 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      }
    >
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F6F1E9] shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          priority
        />

        {product.badge && (
          <div
            className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-white text-[9px] md:text-[10px] font-poppins font-bold uppercase tracking-wider shadow-sm select-none"
            style={getBadgeStyle()}
          >
            {product.badge}
          </div>
        )}

        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-brand-brown text-[9px] md:text-[10px] font-poppins font-bold shadow-sm border border-white/30 select-none">
          {product.weight || "500g"}
        </div>
      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-1 lg:gap-4">
          <div className="space-y-1 flex-1">
            <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-brand-brown leading-snug group-hover:text-brand-green transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-[#7D6B5E] font-poppins text-xs leading-relaxed line-clamp-1">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-baseline gap-1.5 lg:flex-col lg:items-end lg:gap-0 mt-1 lg:mt-0">
            <span className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-brand-brown">
              ₹{product.price}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F5EDE0] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="w-3 md:w-3.5 h-3 md:h-3.5"
                  fill={i < Math.floor(product.rating || 4.9) ? "#F7A503" : "transparent"}
                  stroke="#F7A503"
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-[11px] md:text-xs font-poppins text-brand-brown/80 font-medium">
              {product.rating || 4.9}{" "}
              <span className="text-[#8D7F75] font-normal">
                ({(product.reviewsCount || 120).toLocaleString()})
              </span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-8 h-8 md:w-9 md:h-9 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green-light active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(74,94,40,0.15)] cursor-pointer group/btn"
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} className="md:w-[16px] md:h-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
};
