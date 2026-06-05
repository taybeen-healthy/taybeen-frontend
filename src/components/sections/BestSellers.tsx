/**
 * BestSellers — Grid of top-selling date product cards.
 * Displays product image, badge, rating stars, price, and add-to-cart button.
 */

import { products } from "@/data/mockData";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

export const BestSellers: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-24">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="space-y-4">
            {/* Category tag */}
            <div className="inline-block px-4 py-2 rounded-3xl bg-[#FDE8C0]">
              <span className="text-brand-green font-poppins text-xs md:text-sm uppercase tracking-wider">SOURCED FROM THE FINEST FARMS</span>
            </div>
            {/* Section title */}
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-brown leading-tight">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden flex flex-col h-auto md:h-[540px] shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-brand-primary/10">

              {/* Product image with badges */}
              <div className="relative h-[200px] md:h-[230px] bg-brand-green-dark overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {/* Category badge (e.g. "Best Seller", "New Arrival") */}
                {product.badge && (
                  <div
                    className="absolute top-3 left-3 px-3.5 py-1 rounded-2xl text-white text-[10px] md:text-xs font-poppins"
                    style={{ backgroundColor: product.badgeColor }}
                  >
                    {product.badge}
                  </div>
                )}
                {/* Weight badge */}
                <div className="absolute top-3 right-3 px-3.5 py-1 rounded-2xl bg-white/80 text-black text-[10px] md:text-xs font-poppins">
                  {product.weight}
                </div>
              </div>

              {/* Product details */}
              <div className="p-4 md:p-5 flex-1 flex flex-col">
                <div className="space-y-2 md:space-y-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-poppins font-bold text-brand-brown">{product.name}</h3>
                  <p className="text-brand-green font-poppins text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Rating and price section (pushed to bottom) */}
                <div className="mt-auto space-y-4 md:space-y-6">
                  {/* Star rating */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="md:w-4 md:h-4"
                          fill={i < Math.floor(product.rating) ? "#F7A503" : "none"}
                          stroke="#F7A503"
                          strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                        />
                      ))}
                    </div>
                    <span className="text-brand-green font-poppins text-xs md:text-sm">{product.rating} ({product.reviewsCount.toLocaleString()})</span>
                  </div>

                  {/* Price and add-to-cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-poppins font-extrabold text-brand-brown">₹{product.price}</span>
                    <button className="w-8 h-8 md:w-9 md:h-9 bg-brand-green rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-all">
                      <ShoppingCart size={16} className="md:w-[18px] md:h-[18px]" />
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
