"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ComingSoonModal } from "@/components/features/products/ComingSoonModal";
import { products } from "@/data/products";
import { Product } from "@/types";

const getPaginationRange = (currentPage: number, totalPages: number) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage === totalPages) {
    return [totalPages - 1, totalPages];
  }

  if (currentPage + 1 === totalPages) {
    return [currentPage, totalPages];
  }

  if (currentPage + 2 === totalPages) {
    return [currentPage, currentPage + 1, totalPages];
  }

  return [currentPage, currentPage + 1, '...', totalPages];
};

const CATEGORIES = [
  "All Products",
  "Plain Dates",
  "Stuffed Dates",
  "Gift Hampers",
  "Corporate Gifting",
  "Wellness Boxes",
  "Custom Orders"
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset to first page when filtering category
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Filter products based on selected category
  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All Products" || product.category === selectedCategory
  );

  // Pagination logic (4 items per page matching mockup)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Banner Header Section */}
        <div className="relative w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] mt-[74px] md:mt-[88px] lg:mt-[99px] overflow-hidden select-none">
          <Image
            src="/OurProducts Header.png"
            alt="Our Products Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Header Text Section */}
        <div className="text-center max-w-3xl mx-auto px-6 pt-10 pb-6 md:pt-16 md:pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-3 md:mb-4">
            All Products
          </h1>
          <p className="text-brand-green-light font-poppins text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Premium dates and curated gift hampers sourced from the finest farms across the Middle East.
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12">
          <hr className="border-[#5A3E2B]/10 mb-8 md:mb-12" />
        </div>

        {/* Catalog Main Section */}
        <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 pb-20">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            
            {/* Sidebar for Desktop Layout */}
            <aside className="hidden lg:block w-[200px] xl:w-[240px] flex-shrink-0">
              <div className="sticky top-28 space-y-6">
                <div className="flex items-center gap-2 text-[#4A5E28]">
                  <SlidersHorizontal size={18} />
                  <h2 className="font-poppins font-bold text-lg uppercase tracking-wider">
                    Categories
                  </h2>
                </div>
                <div className="flex flex-col space-y-4">
                  {CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left font-poppins text-base transition-colors duration-200 ${
                          isActive
                            ? "font-bold text-[#5A3E2B]"
                            : "text-[#5A3E2B]/80 hover:text-[#5A3E2B]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Mobile Categories Floating Dropdown Overlay */}
            <div className="lg:hidden w-full mb-6 relative">
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="flex items-center gap-2 text-[#4A5E28] font-poppins font-bold text-base py-2 focus:outline-none"
              >
                <SlidersHorizontal size={18} />
                <span>Categories</span>
              </button>

              <AnimatePresence>
                {mobileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setMobileDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 z-30 w-[240px] bg-[#FDFAF3] border border-[#C4A482]/30 rounded-xl mt-1.5 py-4 px-5 flex flex-col space-y-3 shadow-premium"
                    >
                      {CATEGORIES.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setMobileDropdownOpen(false);
                            }}
                            className={`w-full text-left font-poppins text-sm py-1 transition-colors duration-200 ${
                              isActive
                                ? "font-bold text-brand-brown"
                                : "text-[#5A3E2B]/80 hover:text-brand-brown"
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Products Responsive Grid */}
            <div className="flex-1">
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      variant="catalog"
                      className="w-full bg-white rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 border border-[#C4A482]/40 hover:border-brand-primary/60 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#5A3E2B]/15">
                  <p className="font-poppins text-base text-[#7D6B5E]">
                    No products found in this category.
                  </p>
                </div>
              )}

              {/* Working Pagination Section */}
              {totalPages > 1 && (
                <div className="flex items-center justify-start gap-2 mt-12 md:mt-16">
                  {/* Previous Arrow */}
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-poppins font-semibold text-xs md:text-sm transition-all duration-300 border ${
                      currentPage === 1
                        ? "opacity-40 cursor-not-allowed bg-[#FAF6EE]/50 border-[#C4A482]/20 text-[#5A3E2B]/50"
                        : "bg-[#FAF6EE] border border-[#C4A482]/40 text-[#5A3E2B] hover:bg-[#F6F1E9]"
                    }`}
                    aria-label="Previous page"
                  >
                    &lt;
                  </button>

                  {getPaginationRange(currentPage, totalPages).map((pageNum, index) => {
                    if (pageNum === '...') {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center font-poppins font-semibold text-xs md:text-sm text-[#5A3E2B]/60 select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum as number);
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-poppins font-semibold text-xs md:text-sm transition-all duration-300 border ${
                          isActive
                            ? "bg-[#4A5E28] text-white border-[#4A5E28] shadow-[0_4px_12px_rgba(74,94,40,0.15)]"
                            : "bg-[#FAF6EE] border border-[#C4A482]/40 text-[#5A3E2B] hover:bg-[#F6F1E9]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Arrow */}
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-poppins font-semibold text-xs md:text-sm transition-all duration-300 border ${
                      currentPage === totalPages
                        ? "opacity-40 cursor-not-allowed bg-[#FAF6EE]/50 border-[#C4A482]/20 text-[#5A3E2B]/50"
                        : "bg-[#FAF6EE] border border-[#C4A482]/40 text-[#5A3E2B] hover:bg-[#F6F1E9]"
                    }`}
                    aria-label="Next page"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* WhatsApp Modal Portal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ComingSoonModal
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
