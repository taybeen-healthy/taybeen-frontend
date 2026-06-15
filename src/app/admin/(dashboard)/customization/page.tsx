import React from "react";
import { Metadata } from "next";
import { CustomizationSettings } from "@/components/admin/customization";

export const metadata: Metadata = {
  title: "Site Customization | Admin Taybeen",
  description: "Customize storefront content modules and banners.",
};

export default function AdminCustomizationPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
      <CustomizationSettings />
    </main>
  );
}
