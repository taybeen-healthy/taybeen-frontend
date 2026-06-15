import React from "react";
import { Metadata } from "next";
import { OrdersList } from "@/components/admin/orders";

export const metadata: Metadata = {
  title: "Orders Management | Admin Taybeen",
  description: "Monitor and manage customer orders on Taybeen.",
};

export default function AdminOrdersPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <OrdersList />
    </main>
  );
}
