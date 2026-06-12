import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | Taybeen Premium Dates",
  description:
    "Log into your Taybeen account to check order statuses, manage addresses, and access exclusive premium date product listings.",
  alternates: {
    canonical: "/signin",
  },
};

export default function Page() {
  redirect("/my-account");
}
