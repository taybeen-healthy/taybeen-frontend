import { Metadata } from "next";
import CheckoutPage from "@/components/pages/checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | Taybeen Premium Dates",
  description:
    "Complete your order of premium date varieties and gift hampers.",
  alternates: {
    canonical: "/checkout",
  },
};

export default function Page() {
  return <CheckoutPage />;
}
