import { Metadata } from "next";
import { Suspense } from "react";
import MyAccountPage from "@/components/user/pages/my-account/MyAccountPage";
import { Loader2 } from "lucide-react";

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
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFAF3]">
          <Loader2 className="w-10 h-10 animate-spin text-[#5A3E2B] mb-4" />
          <p className="font-poppins text-[#5A3E2B]/80 font-medium font-semibold">Loading your account...</p>
        </div>
      }
    >
      <MyAccountPage />
    </Suspense>
  );
}
