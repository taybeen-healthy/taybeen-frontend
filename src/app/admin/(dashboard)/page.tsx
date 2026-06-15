import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Taybeen Premium Dates",
  description: "Taybeen Administrator Dashboard - Manage products, catalog, and orders.",
};

export default function AdminDashboardPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <div className="border border-[#C4A482]/25 bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm font-poppins text-left">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-[#7D6B5E] max-w-xl leading-relaxed">
          Welcome to the Taybeen Administrator Portal. From here you can manage products, track customer order flows, and customize shop layouts.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-[#C4A482]/20 rounded-xl p-6 bg-[#FDFAF3] hover:border-brand-primary/50 transition-all duration-300 cursor-pointer">
            <h3 className="font-semibold text-brand-brown text-base mb-1">Catalog Management</h3>
            <p className="text-xs text-[#7D6B5E]">Add, edit, or adjust inventory status for products.</p>
          </div>
          <div className="border border-[#C4A482]/20 rounded-xl p-6 bg-[#FDFAF3] hover:border-brand-primary/50 transition-all duration-300 cursor-pointer">
            <h3 className="font-semibold text-brand-brown text-base mb-1">Order Fulfillment</h3>
            <p className="text-xs text-[#7D6B5E]">Monitor orders, update delivery status, and handle invoices.</p>
          </div>
          <div className="border border-[#C4A482]/20 rounded-xl p-6 bg-[#FDFAF3] hover:border-brand-primary/50 transition-all duration-300 cursor-pointer">
            <h3 className="font-semibold text-brand-brown text-base mb-1">Analytics Overview</h3>
            <p className="text-xs text-[#7D6B5E]">Track store insights, sales reports, and customer sign-ups.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
