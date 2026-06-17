import { Metadata } from "next";
import PartnershipsPage from "@/components/user/pages/partnerships/PartnershipsPage";

export const metadata: Metadata = {
  title: "Affiliate & Coupons | Taybeen Premium Dates",
  description: "Become a Taybeen affiliate, earn rewards, and promote organic date selections.",
  alternates: {
    canonical: "/partnerships",
  },
};

export default function Page() {
  return <PartnershipsPage />;
}
