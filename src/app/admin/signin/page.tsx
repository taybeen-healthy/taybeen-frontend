import { Metadata } from "next";
import { AdminAuthLayout, AdminSignInForm } from "@/components/admin/auth";

export const metadata: Metadata = {
  title: "Admin Sign In | Taybeen Premium Dates",
  description: "Log into the Taybeen Administrator Portal to manage the dates catalog, view orders, and manage settings.",
  alternates: {
    canonical: "/admin/signin",
  },
};

export default function Page() {
  return (
    <AdminAuthLayout>
      <AdminSignInForm />
    </AdminAuthLayout>
  );
}
