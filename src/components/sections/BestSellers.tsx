/**
 * BestSellers — Grid of top-selling date product cards.
 * Displays product image, badge, rating stars, price, and add-to-cart button.
 */

import { products } from "@/data/mockData";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

export const BestSellers: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="space-y-4">
            {/* Category tag */}
            <div className="inline-block px-4 py-2 rounded-3xl bg-[#FDE8C0]">
              <span className="text-brand-green font-poppins text-xs md:text-sm uppercase tracking-wider">SOURCED FROM THE FINEST FARMS</span>
            </div>
            {/* Section title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown leading-tight">
              Best Selling <br className="hidden md:block" /> Date Varieties
            </h2>
          </div>
          <div className="w-full md:w-auto text-left md:text-right space-y-2">
            <a href="#" className="flex items-center md:justify-end gap-2 text-brand-green font-poppins font-semibold hover:underline">
              View all varieties <ArrowRight size={16} />
            </a>
            <p className="text-brand-green-light font-poppins text-xs md:text-sm">Free shipping on all orders above ₹999</p>
          </div>
        </div>

        {/* ── Product Cards Grid ── */}
        <div className="flex md:flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8 pb-6 lg:pb-0 -mx-6 px-6 md:-mx-8 md:px-8 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-pl-6 md:scroll-pl-8 scroll-pr-6 md:scroll-pr-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-auto flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden flex flex-col h-auto lg:h-full shadow-sm transition-shadow duration-300 border border-[#F2EADA] hover:border-brand-primary/60 group"
            >
              {/* Product image with badges */}
              <div className="relative h-[200px] lg:h-[210px] xl:h-[220px] 2xl:h-[230px] bg-brand-bg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Category badge (e.g. "Best Seller", "New Arrival") */}
                {product.badge && (
                  <div
                    className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-white text-[9px] md:text-[10px] font-poppins font-bold uppercase tracking-wider shadow-sm select-none"
                    style={{ backgroundColor: product.badgeColor }}
                  >
                    {product.badge}
                  </div>
                )}
                {/* Weight badge */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-brand-brown text-[9px] md:text-[10px] font-poppins font-bold shadow-sm border border-white/30 select-none">
                  {product.weight}
                </div>
              </div>

              {/* Product details */}
              <div className="p-5 md:p-6 flex-1 flex flex-col">
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-brand-brown leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[#7D6B5E] font-poppins text-xs md:text-sm leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Rating and price section (pushed to bottom) */}
                <div className="mt-auto pt-4 border-t border-[#F5EDE0] space-y-4 md:space-y-5">
                  {/* Star rating */}
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

                  {/* Price and add-to-cart */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xl md:text-2xl font-poppins font-bold text-brand-brown">₹{product.price}</span>
                    <button className="w-9 h-9 md:w-10 md:h-10 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green-light active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(74,94,40,0.15)] cursor-pointer group/btn">
                      <ShoppingCart size={16} className="md:w-[18px] md:h-[18px] transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
