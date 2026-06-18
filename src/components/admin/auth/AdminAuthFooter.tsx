import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { adminAuthData } from "@/data/admin/adminAuthData";

export const AdminAuthFooter: React.FC = () => {
  const { labels } = adminAuthData;

  return (
    <footer className="w-full text-center py-6 select-none font-poppins flex flex-col items-center gap-3">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#4A5E28] hover:text-[#38471E] hover:underline transition-all duration-200"
      >
        <ArrowLeft size={14} />
        {labels.backToStoreText}
      </Link>
      <p className="text-[11px] sm:text-xs text-brand-brown/50">{labels.copyrightText}</p>
    </footer>
  );
};

export default AdminAuthFooter;
