"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard, ProductDetailModal } from "@/components/user/products";
import { CATEGORY_DETAILS } from "@/data/user/categories";
import { SORT_BY_OPTIONS } from "@/data/user/productsPageData";
import { Product } from "@/types";
import { Pagination } from "@/components/ui/Pagination";
import { Dropdown } from "@/components/ui/Dropdown";
import { apiClient } from "@/lib/apiClient";
import {
  ProductsHero,
  ProductsHeader,
  ProductsSidebar,
  ProductsFilters,
} from "@/components/user/sections/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>(["All Products"]);
  const [categoryDetailsMap, setCategoryDetailsMap] =
    useState<Record<string, { title: string; description: string }>>(CATEGORY_DETAILS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [prodRes, catRes] = await Promise.all([
          apiClient.get("/products"),
          apiClient.get("/categories"),
        ]);

        const prodData = prodRes.data?.data?.data || prodRes.data?.data || prodRes.data || [];
        const catData = catRes.data?.data || catRes.data || [];

        const mappedProducts = prodData.map((p: any) => ({
          id: p.id || p._id,
          name: p.name,
          category: p.category?.name || p.category || "Others",
          price: p.price,
          originalPrice: p.originalPrice || undefined,
          image: p.images?.[0] || "/images/placeholder.jpg",
          images: p.images || [],
          rating: p.rating || 5,
          reviewsCount: p.reviewsCount || 0,
          description: p.description || "",
          benefits: p.benefits || [],
          ingredients: p.ingredients || [],
          details: p.details || "",
          stock: p.stock ?? 10,
          weight: p.weight || p.weightOptions?.[0] || "500g",
          weightOptions: p.weightOptions || ["500g", "1kg"],
          weights: p.weights || ["500g", "1kg"],
          pricePerWeight: p.pricePerWeight || {},
        }));
        setProductsList(mappedProducts);

        const mappedCategories = ["All Products", ...catData.map((c: any) => c.name)];
        setCategoriesList(mappedCategories);

        const detailsMap = { ...CATEGORY_DETAILS };
        catData.forEach((c: any) => {
          detailsMap[c.name] = {
            title: c.name,
            description:
              c.description ||
              CATEGORY_DETAILS[c.name]?.description ||
              "Premium selection of dates.",
          };
        });
        setCategoryDetailsMap(detailsMap);
      } catch (e) {
        console.error("Error fetching catalog data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const filteredProducts = (() => {
    let list = productsList.filter(
      (product) => selectedCategory === "All Products" || product.category === selectedCategory
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

  const currentCategoryDetails =
    categoryDetailsMap[selectedCategory] || categoryDetailsMap["All Products"];

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />
        <ProductsHero />
        <ProductsHeader details={currentCategoryDetails} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12">
          <hr className="border-[#5A3E2B]/10 mb-8 md:mb-12" />
        </div>

        <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 pb-20">
          <div className="flex flex-col lg:flex-row xl:gap-12">
            <ProductsSidebar
              categories={categoriesList}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <Dropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoriesList.map((cat) => ({ label: cat, value: cat }))}
              placeholder="Categories"
              align="left"
              icon={<SlidersHorizontal size={16} className="text-[#4A5E28]" />}
              className="lg:hidden w-full mb-6 font-poppins font-bold text-base py-2 focus:outline-none"
              triggerClassName="text-[#4A5E28]"
            />

            <div className="flex-1">
              <ProductsFilters
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                itemsCount={filteredProducts.length}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                sortOptions={SORT_BY_OPTIONS}
              />

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#C4A482]/25">
                  <Loader2 className="w-10 h-10 animate-spin text-[#5A3E2B] mb-4" />
                  <p className="font-poppins text-brand-brown text-sm font-semibold">
                    Loading premium dates...
                  </p>
                </div>
              ) : displayedProducts.length > 0 ? (
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
          <ProductDetailModal product={selectedProduct} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
