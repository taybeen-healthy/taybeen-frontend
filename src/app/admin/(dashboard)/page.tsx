import React from "react";
import { Metadata } from "next";
import { DashboardOverview } from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Taybeen Premium Dates",
  description: "Taybeen Administrator Dashboard - Manage products, catalog, and orders.",
};

export default function AdminDashboardPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <DashboardOverview />
    </main>
  );
}
