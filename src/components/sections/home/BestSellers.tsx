"use client";

import React, { useState } from "react";
import { products } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ComingSoonModal } from "@/components/features/products/ComingSoonModal";
import { Product } from "@/types";

export const BestSellers: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-3xl bg-[#FDE8C0]">
              <span className="text-brand-green font-poppins text-xs md:text-sm uppercase tracking-wider">
                SOURCED FROM THE FINEST FARMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown leading-tight">
              Best Selling <br className="hidden md:block" /> Date Varieties
            </h2>
          </div>
          <div className="w-full md:w-auto text-left md:text-right space-y-2">
            <a href="/products" className="flex items-center md:justify-end gap-2 text-brand-green font-poppins font-semibold hover:underline">
              View all varieties <ArrowRight size={16} />
            </a>
            <p className="text-brand-green-light font-poppins text-xs md:text-sm">Free shipping on all orders above ₹999</p>
          </div>
        </div>

        <div className="flex md:flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8 pb-6 lg:pb-0 -mx-6 px-6 md:-mx-8 md:px-8 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-pl-6 md:scroll-pl-8 scroll-pr-6 md:scroll-pr-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ComingSoonModal
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
