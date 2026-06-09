"use client";

import React, { useState } from "react";
import { products } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ComingSoonModal } from "@/components/features/products/ComingSoonModal";
import { Product } from "@/types";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const BestSellers: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Section bg="cream">
      <SectionHeader
        tag="SOURCED FROM THE FINEST FARMS"
        tagVariant="yellow"
        title={
          <>
            Best Selling <br className="hidden md:block" /> Date Varieties
          </>
        }
        actions={
          <a
            href="/products"
            className="flex items-center md:justify-end gap-2 text-brand-green font-poppins font-semibold hover:underline"
          >
            View all varieties <ArrowRight size={16} />
          </a>
        }
        subtitle="Free shipping on all orders above ₹999"
      />

      <div className="flex md:flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8 pb-6 lg:pb-0 -mx-6 px-6 md:-mx-8 md:px-8 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-pl-6 md:scroll-pl-8 scroll-pr-6 md:scroll-pr-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ComingSoonModal
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

