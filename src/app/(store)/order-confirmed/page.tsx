import { Metadata } from "next";
import OrderConfirmedPage from "@/components/user/pages/order-confirmed/OrderConfirmedPage";

export const metadata: Metadata = {
  title: "Order Confirmed | Taybeen Premium Dates",
  description:
    "Thank you for your order! Your purchase of Taybeen premium dates has been confirmed.",
  alternates: {
    canonical: "/order-confirmed",
  },
};

export default function Page() {
  return <OrderConfirmedPage />;
}