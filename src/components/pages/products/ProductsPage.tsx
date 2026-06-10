"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ComingSoonModal } from "@/components/features/products/ComingSoonModal";
import { products } from "@/data/products";
import { CATEGORIES, CATEGORY_DETAILS } from "@/data/categories";
import { Product } from "@/types";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Dropdown } from "@/components/ui/Dropdown";

const SORT_BY_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const filteredProducts = (() => {
    let list = products.filter(
      (product) =>
        selectedCategory === "All Products" || product.category === selectedCategory
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  })();

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

  const currentCategoryDetails = CATEGORY_DETAILS[selectedCategory] || CATEGORY_DETAILS["All Products"];

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="relative w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] mt-[74px] md:mt-[88px] lg:mt-[99px] overflow-hidden select-none">
          <Image
            src="/OurProducts Header.png"
            alt="Our Products Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="text-center max-w-3xl mx-auto px-6 pt-10 pb-6 md:pt-16 md:pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-3 md:mb-4">
            {currentCategoryDetails.title}
          </h1>
          <p className="text-brand-green-light font-poppins text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {currentCategoryDetails.description}
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12">
          <hr className="border-[#5A3E2B]/10 mb-8 md:mb-12" />
        </div>

        <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 pb-20">
          <div className="flex flex-col lg:flex-row xl:gap-12">

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
                        className={`w-full text-left font-poppins text-base transition-colors duration-200 ${isActive
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

            <Dropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={CATEGORIES.map((cat) => ({ label: cat, value: cat }))}
              placeholder="Categories"
              align="left"
              icon={<SlidersHorizontal size={16} className="text-[#4A5E28]" />}
              className="lg:hidden w-full mb-6 font-poppins font-bold text-base py-2 focus:outline-none"
              triggerClassName="text-[#4A5E28]"
            />

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#5A3E2B]/10">
                <div className="flex items-center gap-4 flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search collection..."
                  />
                  <span className="text-[#5A3E2B]/15 font-poppins text-xs">|</span>
                  <div className="text-[#8D7F75] font-poppins text-xs tracking-wider uppercase font-medium">
                    <span className="font-semibold text-brand-green">{filteredProducts.length}</span> items
                  </div>
                </div>

                <Dropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_BY_OPTIONS}
                  label="Sort by:"
                  align="right"
                />
              </div>

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

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="mt-12 md:mt-16"
              />
            </div>

          </div>
        </main>
      </div>

      <Footer />

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
