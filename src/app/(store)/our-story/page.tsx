import { Metadata } from "next";
import OurStoryPage from "@/components/user/pages/our-story/OurStoryPage";

export const metadata: Metadata = {
  title: "Our Story | Taybeen Premium Dates",
  description:
    "Learn about Taybeen, our journey, and our commitment to sourcing premium, natural dates.",
  alternates: {
    canonical: "/our-story",
  },
};

export default function Page() {
  return <OurStoryPage />;
}