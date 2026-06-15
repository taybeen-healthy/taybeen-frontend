import React from "react";
import { Metadata } from "next";
import { CustomersList } from "@/components/admin/customers";

export const metadata: Metadata = {
  title: "Customers Directory | Admin Taybeen",
  description: "View and manage Taybeen customers list.",
};

export default function AdminCustomersPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <CustomersList />
    </main>
  );
}
