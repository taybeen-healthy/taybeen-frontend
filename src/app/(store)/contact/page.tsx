import { Metadata } from "next";
import ContactPage from "@/components/user/pages/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Taybeen Premium Dates",
  description:
    "Get in touch with Taybeen Premium Dates. Send us a message, email us at contactus@taybeen.com, or reach out via WhatsApp/Phone.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
