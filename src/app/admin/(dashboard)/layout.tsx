"use client";

import React, { useState } from "react";
import { AdminNavbar, AdminSidebar } from "@/components/admin/layout";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-brand-bg flex flex-col selection:bg-brand-primary/30">
      <AdminNavbar onMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />
      <div className="flex flex-1 flex-col lg:flex-row relative overflow-hidden">
        <AdminSidebar isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
        <div className="flex-1 w-full bg-[#FDFAF3] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
