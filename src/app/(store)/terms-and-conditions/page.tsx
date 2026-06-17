import { Metadata } from "next";
import TermsConditionsPage from "@/components/user/pages/terms-and-conditions/TermsConditionsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Taybeen Premium Dates",
  description: "Read the Terms & Conditions governing your use of the Taybeen website.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function Page() {
  return <TermsConditionsPage />;
}
