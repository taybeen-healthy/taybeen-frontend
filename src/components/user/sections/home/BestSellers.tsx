"use client";

import React, { useState, useEffect } from "react";
import { products } from "@/data/user/mockData";
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/user/products/ProductCard";
import { ProductDetailModal } from "@/components/user/products/ProductDetailModal";
import { Product } from "@/types";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCustomization } from "@/context/CustomizationContext";
import { apiClient } from "@/lib/apiClient";

export const BestSellers: React.FC = () => {
  const { delivery } = useCustomization();
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchBestSellers = async () => {
      try {
        const response = await apiClient.get("/products");
        const prodData = response.data?.data?.data || response.data?.data || response.data || [];
        if (active && prodData.length > 0) {
          const mappedProducts = prodData.map((p: any) => ({
            id: p.id || p._id,
            name: p.name,
            category: p.category?.name || p.category || "Others",
            price: p.price,
            originalPrice: p.originalPrice || undefined,
            image: p.images?.[0] || p.image || "/images/placeholder.jpg",
            images: p.images || [],
            rating: p.rating || 5,
            reviewsCount: p.reviewsCount || 0,
            description: p.description || "",
            benefits: p.benefits || [],
            stock: p.stock ?? 10,
            weight: p.weight || p.weightOptions?.[0] || "500g",
            weightOptions: p.weightOptions || ["500g", "1kg"],
            badge: p.badge || undefined,
            badgeColor: p.badgeColor || undefined,
          }));

          // Show the top 4 products
          setProductsList(mappedProducts.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
    return () => {
      active = false;
    };
  }, []);

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
        subtitle={`Free shipping on all orders above ₹${delivery.maximumAmount}`}
      />

      <div className="flex md:flex overflow-x-auto lg:grid lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8 pb-6 lg:pb-0 -mx-6 px-6 md:-mx-8 md:px-8 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-pl-6 md:scroll-pl-8 scroll-pr-6 md:scroll-pr-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </Section>
  );
};
