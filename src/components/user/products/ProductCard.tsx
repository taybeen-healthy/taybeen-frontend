import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";

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
  const isCatalog = variant === "catalog";

  const getBadgeVariant = () => {
    if (!product.badge) return "default";
    const text = product.badge.toLowerCase();
    if (text.includes("seller")) return "best-seller";
    if (text.includes("new")) return "new";
    if (text.includes("rare") || text.includes("sacred")) return "rare";
    return "default";
  };

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

          {product.badge && (
            <Badge
              text={product.badge}
              variant={getBadgeVariant()}
              className="absolute top-4 left-4 hidden lg:block"
              style={product.badgeColor ? { backgroundColor: product.badgeColor } : undefined}
            />
          )}
        </div>

        <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-1 lg:gap-4 w-full">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-serif font-bold text-brand-brown leading-snug group-hover:text-brand-green transition-colors duration-200 text-left line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.originalPrice ? (
                <>
                  <span className="text-[10px] sm:text-xs text-[#5A3E2B]/60 line-through font-poppins font-medium">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-poppins font-bold text-[#5A3E2B] whitespace-nowrap">
                    ₹{product.price}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#768C3A] font-poppins font-semibold">
                    ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                  </span>
                </>
              ) : (
                <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-poppins font-bold text-[#5A3E2B] whitespace-nowrap">
                  ₹{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Badge
            text={product.badge}
            variant={getBadgeVariant()}
            className="absolute top-3.5 left-3.5"
            style={product.badgeColor ? { backgroundColor: product.badgeColor } : undefined}
          />
        )}

        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-brand-brown text-[9px] md:text-[10px] font-poppins font-bold shadow-sm border border-white/30 select-none">
          {product.weight || "500g"}
        </div>
      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-brand-brown leading-snug group-hover:text-brand-green transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-[#7D6B5E] font-poppins text-xs leading-relaxed line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="pt-1 flex items-center gap-2 flex-wrap">
            {product.originalPrice ? (
              <>
                <span className="text-sm sm:text-base text-brand-brown/60 line-through font-poppins font-medium">
                  ₹{product.originalPrice}
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-brand-brown">
                  ₹{product.price}
                </span>
                <span className="text-xs sm:text-sm text-[#768C3A] font-poppins font-semibold">
                  ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-brand-brown">
                ₹{product.price}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F5EDE0] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating
              rating={product.rating || 4.9}
              size={12}
              className="[&_svg]:!w-3 [&_svg]:md:!w-3.5 [&_svg]:!h-3 [&_svg]:md:!h-3.5"
            />
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
