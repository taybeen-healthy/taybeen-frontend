"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Package, 
  ClipboardList, 
  Users, 
  Store, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems: SidebarItem[] = [
    { label: "Home", href: "/admin", icon: Home },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "All orders", href: "/admin/orders", icon: ClipboardList },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Vendors", href: "/admin/partners", icon: Store },
    { label: "Reviews", href: "/admin/reviews", icon: FileText },
    { label: "Admin Customization", href: "/admin/customization", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-brand-green text-white p-3 rounded-full shadow-lg hover:bg-[#3A4E1B] transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "bg-[#FDFAF3] border-r border-[#C4A482]/20 h-[calc(100vh-73px)] sticky top-[73px] transition-all duration-300 select-none z-40 flex flex-col justify-between py-6",
          // Desktop sizing
          isExpanded ? "w-64" : "w-[72px] items-center",
          // Mobile sizing and behavior
          "fixed lg:relative inset-y-0 left-0 lg:translate-x-0 transform",
          isMobileOpen ? "translate-x-0 w-64 pt-20 h-screen top-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col gap-6 w-full">
          {/* Top Toggle Button (Desktop Only) */}
          <div className="hidden lg:flex justify-end px-4 w-full">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-brown hover:text-brand-primary p-1.5 rounded-lg hover:bg-black/[0.02] transition-all"
              title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isExpanded ? (
                <div className="flex items-center gap-1 text-[11px] font-poppins font-bold uppercase tracking-wider text-brand-brown/40">
                  <span>Collapse</span>
                  <ChevronLeft size={16} />
                </div>
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 w-full px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-4 py-3.5 px-3 rounded-xl transition-all duration-200 group relative font-poppins text-sm font-medium",
                    isActive
                      ? "bg-brand-green-pale text-brand-green"
                      : "text-brand-brown hover:text-brand-green hover:bg-brand-green-pale/40"
                  )}
                >
                  <Icon 
                    size={20} 
                    className={cn(
                      "shrink-0 transition-transform duration-200 group-hover:scale-105",
                      isActive ? "text-brand-green" : "text-[#8D7F75] group-hover:text-brand-green"
                    )} 
                  />
                  
                  {/* Label (hidden on desktop collapsed) */}
                  <span
                    className={cn(
                      "transition-opacity duration-200",
                      isExpanded || isMobileOpen ? "opacity-100" : "lg:opacity-0 lg:w-0 overflow-hidden"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Tooltip on collapsed desktop view */}
                  {!isExpanded && !isMobileOpen && (
                    <div className="absolute left-16 bg-brand-brown text-white text-xs py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md font-poppins font-semibold">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Info (Shows when expanded) */}
        {(isExpanded || isMobileOpen) && (
          <div className="px-6 border-t border-[#C4A482]/10 pt-4 text-left">
            <p className="text-[10px] text-brand-brown/50 font-poppins font-semibold uppercase tracking-wider">Logged in as</p>
            <p className="text-xs text-brand-brown font-semibold font-poppins truncate">admin@taybeen.com</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default AdminSidebar;
