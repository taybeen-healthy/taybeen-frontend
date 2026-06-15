import React from "react";
import { Metadata } from "next";
import { PartnersList } from "@/components/admin/partners";

export const metadata: Metadata = {
  title: "Partners & Coupons | Admin Taybeen",
  description: "Manage affiliates, coupon codes, and partner performance.",
};

export default function AdminPartnersPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <PartnersList />
    </main>
  );
}
