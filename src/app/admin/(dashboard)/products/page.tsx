import React from "react";
import { Metadata } from "next";
import { ProductForm, RecentProductsTable } from "@/components/admin/products";

export const metadata: Metadata = {
  title: "Products Catalog | Admin Taybeen",
  description: "Manage and catalog Taybeen premium dates.",
};

export default function AdminProductsPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10 space-y-8 text-left">
      <div>
        <h1 className="font-serif text-3xl font-bold text-brand-brown">Products</h1>
        <p className="text-xs text-[#8D7F75] mt-1">Add new products to your store.</p>
      </div>

      <ProductForm />
      <RecentProductsTable />
    </main>
  );
}
