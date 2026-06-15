import React from "react";
import Image from "next/image";
import { adminAuthData } from "@/data/adminAuthData";
import { AdminAuthHeader } from "./AdminAuthHeader";
import { AdminAuthFooter } from "./AdminAuthFooter";

interface AdminAuthLayoutProps {
  children: React.ReactNode;
}

export const AdminAuthLayout: React.FC<AdminAuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[380px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src={adminAuthData.backgroundImage}
          alt={adminAuthData.backgroundAlt}
          fill
          className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
          priority
        />
      </div>

      {/* Admin Module Brand Header */}
      <div className="z-10 relative">
        <AdminAuthHeader />
      </div>

      {/* Centered Sign In Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 md:py-20 z-10 relative">
        {children}
      </main>

      {/* Admin Footer */}
      <div className="z-10 relative bg-[#FDFAF3] border-t border-[#C4A482]/20">
        <AdminAuthFooter />
      </div>
    </div>
  );
};

export default AdminAuthLayout;
