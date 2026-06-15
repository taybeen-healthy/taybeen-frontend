import { Metadata } from "next";
import ReviewPage from "@/components/user/pages/review/ReviewPage";

export const metadata: Metadata = {
  title: "Leave a Review | Taybeen Premium Dates",
  description: "Share your experience with Taybeen dates.",
  alternates: {
    canonical: "/review",
  },
};

export default function Page() {
  return <ReviewPage />;
}