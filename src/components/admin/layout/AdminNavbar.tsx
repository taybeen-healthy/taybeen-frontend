"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, User, Menu } from "lucide-react";
import { NotificationsDrawer } from "./NotificationsDrawer";

interface AdminNavbarProps {
  onMenuToggle: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onMenuToggle }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FDFAF3] border-b border-[#C4A482]/20 px-6 md:px-8 lg:px-10 xl:px-12 py-4 select-none">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden text-[#5A3E2B] hover:text-brand-green hover:bg-brand-green-pale/50 p-2 rounded-lg transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>

          <Link href="/admin">
            <Image
              src="/TaybeenLogo.png"
              alt="Taybeen Logo"
              width={120}
              height={54}
              className="h-[32px] sm:h-[36px] md:h-[40px] w-auto object-contain cursor-pointer"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(true)}
            className="text-[#5A3E2B] hover:text-[#5A3E2B]/80 hover:bg-black/[0.02] p-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5A3E2B]/20 relative"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#FDFAF3]" />
          </button>

          <button
            type="button"
            className="text-[#5A3E2B] hover:text-[#5A3E2B]/80 hover:bg-black/[0.02] p-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5A3E2B]/20"
            aria-label="Admin Profile"
          >
            <User size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </nav>
  );
};

export default AdminNavbar;
