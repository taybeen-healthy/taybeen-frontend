import { Metadata } from "next";
import PrivacyPolicyPage from "@/components/user/pages/privacy-policy/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Taybeen Premium Dates",
  description:
    "Learn about how Taybeen collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
