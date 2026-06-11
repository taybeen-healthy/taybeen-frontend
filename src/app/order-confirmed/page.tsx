import { Metadata } from "next";
import OrderConfirmedPage from "@/components/pages/order-confirmed/OrderConfirmedPage";

export const metadata: Metadata = {
  title: "Order Confirmed | Taybeen Premium Dates",
  description:
    "Thank you for choosing Taybeen. Your order has been placed and is currently being processed.",
  alternates: {
    canonical: "/order-confirmed",
  },
};

export default function Page() {
  return <OrderConfirmedPage />;
}
