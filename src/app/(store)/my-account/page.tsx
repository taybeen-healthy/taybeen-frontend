import { Metadata } from "next";
import { Suspense } from "react";
import MyAccountPage from "@/components/user/pages/my-account/MyAccountPage";
import { BrandLoader } from "@/components/ui/BrandLoader";

export const metadata: Metadata = {
  title: "My Account | Taybeen Premium Dates",
  description:
    "Manage your Taybeen premium dates account details, track recent orders, view billing addresses, and edit profile settings.",
  alternates: {
    canonical: "/my-account",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<BrandLoader text="Loading your account..." />}>
      <MyAccountPage />
    </Suspense>
  );
}
