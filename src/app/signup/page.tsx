import { Metadata } from "next";
import SignUpPage from "@/components/pages/auth/SignUpPage";

export const metadata: Metadata = {
  title: "Create Account | Taybeen Premium Dates",
  description:
    "Register for a Taybeen account to order premium dates, customize date hampers, and save your preferences for seamless shopping.",
  alternates: {
    canonical: "/signup",
  },
};

export default function Page() {
  return <SignUpPage />;
}
