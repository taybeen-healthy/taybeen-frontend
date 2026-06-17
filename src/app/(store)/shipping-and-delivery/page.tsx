import { Metadata } from "next";
import ShippingDeliveryPage from "@/components/user/pages/shipping-and-delivery/ShippingDeliveryPage";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Taybeen Premium Dates",
  description:
    "Learn about Taybeen's shipping options, processing times, shipping rates, and returns policy.",
  alternates: {
    canonical: "/shipping-and-delivery",
  },
};

export default function Page() {
  return <ShippingDeliveryPage />;
}
