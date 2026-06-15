import { Metadata } from "next";
import ProductsPage from "@/components/user/pages/products/ProductsPage";

export const metadata: Metadata = {
  title: "Our Products | Taybeen Premium Dates",
  description:
    "Explore our premium selection of hand-picked dates and curated gifting hampers. Sourced directly from authentic farms across the Middle East.",
  alternates: {
    canonical: "/products",
  },
};

export default function Page() {
  return <ProductsPage />;
}
