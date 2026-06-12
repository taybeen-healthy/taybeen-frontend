import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Account | Taybeen Premium Dates",
  description:
    "Register for a Taybeen account to order premium dates, customize date hampers, and save your preferences for seamless shopping.",
  alternates: {
    canonical: "/signup",
  },
};

export default function Page() {
  redirect("/my-account");
}
