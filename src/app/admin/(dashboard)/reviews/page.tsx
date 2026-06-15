import React from "react";
import { Metadata } from "next";
import { ReviewsList } from "@/components/admin/reviews";

export const metadata: Metadata = {
  title: "Customer Reviews | Admin Taybeen",
  description: "View and moderate product reviews for Taybeen dates.",
};

export default function AdminReviewsPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <ReviewsList />
    </main>
  );
}
