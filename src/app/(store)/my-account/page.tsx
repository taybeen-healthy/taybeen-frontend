import { Metadata } from "next";
import MyAccountPage from "@/components/user/pages/my-account/MyAccountPage";

export const metadata: Metadata = {
  title: "My Account | Taybeen Premium Dates",
  description:
    "Manage your Taybeen premium dates account details, track recent orders, view billing addresses, and edit profile settings.",
  alternates: {
    canonical: "/my-account",
  },
};

export default function Page() {
  return <MyAccountPage />;
}
