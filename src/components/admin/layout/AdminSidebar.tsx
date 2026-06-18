"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Package,
  ClipboardList,
  Users,
  Store,
  FileText,
  Settings,
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

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isMobileOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems: SidebarItem[] = [
    { label: "Home", href: "/admin", icon: Home },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "All orders", href: "/admin/orders", icon: ClipboardList },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Affilates", href: "/admin/partners", icon: Store },
    { label: "Reviews", href: "/admin/reviews", icon: FileText },
    { label: "Admin Customization", href: "/admin/customization", icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/45 z-40 transition-opacity duration-300 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "bg-[#FDFAF3] border-r border-[#C4A482]/20 h-full transition-all duration-300 select-none z-45 flex flex-col justify-between py-6 shadow-[4px_0_24px_rgba(74,94,40,0.01)]",
          // Desktop sizing
          isExpanded ? "w-64" : "w-[76px]",
          // Mobile sizing and behavior
          "fixed lg:relative inset-y-0 left-0 lg:translate-x-0 transform",
          isMobileOpen ? "translate-x-0 w-64 pt-6 h-screen top-0 z-50" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center justify-between px-6 pb-4 border-b border-[#C4A482]/10 lg:hidden">
            <Image
              src="/TaybeenLogo.png"
              alt="Taybeen Logo"
              width={100}
              height={45}
              className="h-[28px] w-auto object-contain"
            />
            <button
              onClick={onClose}
              className="text-[#5A3E2B] hover:text-brand-green hover:bg-brand-green-pale/50 p-1.5 rounded-lg transition-all focus:outline-none cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className={cn(
            "hidden lg:flex items-center w-full h-10 shrink-0",
            isExpanded ? "justify-between px-6" : "justify-center"
          )}>
            {isExpanded && (
              <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-brand-brown/45">
                Navigation
              </span>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-brown hover:text-brand-green p-2 rounded-lg hover:bg-brand-green-pale/40 transition-all flex items-center justify-center cursor-pointer focus:outline-none"
              title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>

          <nav className={cn(
            "flex flex-col gap-1.5 w-full",
            isExpanded ? "px-3" : "px-0 items-center"
          )}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center rounded-xl transition-all duration-200 group relative font-poppins text-sm font-medium h-12 shrink-0",
                    isExpanded
                      ? "w-full gap-4 px-3.5"
                      : "w-12 justify-center",
                    isActive
                      ? "bg-brand-green-pale text-brand-green font-semibold"
                      : "text-[#5A3E2B] hover:text-brand-green hover:bg-brand-green-pale/30"
                  )}
                >
                  {isActive && (
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-[3.5px] h-7 bg-[#F7A503] rounded-r-md",
                      isExpanded ? "left-0" : "left-[-14px]"
                    )} />
                  )}

                  <Icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-all duration-300",
                      isActive ? "text-brand-green" : "text-[#8D7F75] group-hover:text-brand-green"
                    )}
                  />

                  {(isExpanded || isMobileOpen) && (
                    <span className="whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 delay-300">
                      {item.label}
                    </span>
                  )}

                  {!isExpanded && !isMobileOpen && (
                    <div className="absolute left-16 bg-[#3A2418] text-white text-[11px] py-1.5 px-3 rounded-lg shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 font-poppins font-semibold border border-[#C4A482]/20">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={cn(
          "border-t border-[#C4A482]/10 text-left w-full h-14 flex items-center shrink-0",
          isExpanded || isMobileOpen ? "px-6" : "justify-center"
        )}>
          {isExpanded || isMobileOpen ? (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300 delay-300">
              <p className="text-[9px] text-[#8D7F75] font-poppins font-bold uppercase tracking-wider">Logged in as</p>
              <p className="text-xs text-brand-brown font-bold font-poppins truncate">admin@taybeen.com</p>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none cursor-pointer animate-in fade-in duration-300" title="admin@taybeen.com">
              A
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
