import React from "react";
import AdminNavbar from "@/components/admin/layout/AdminNavbar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      <div>
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
}
