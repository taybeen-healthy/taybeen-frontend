import React from "react";
import { AdminNavbar, AdminSidebar } from "@/components/admin/layout";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col selection:bg-brand-primary/30">
      <AdminNavbar />
      <div className="flex flex-1 flex-col lg:flex-row relative min-h-[calc(100vh-73px)]">
        <AdminSidebar />
        <div className="flex-1 w-full bg-[#FDFAF3]">
          {children}
        </div>
      </div>
    </div>
  );
}
