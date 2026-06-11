import { Metadata } from "next";
import OurStoryPage from "@/components/pages/our-story/OurStoryPage";

export const metadata: Metadata = {
  title: "Our Story | Taybeen Premium Dates",
  description:
    "Discover the story behind Taybeen Premium Dates. Learn about our commitment to sourcing pure, seasonal, and non-GMO date varieties from ancient groves across the Middle East.",
  alternates: {
    canonical: "/our-story",
  },
};

export default function Page() {
  return <OurStoryPage />;
}
