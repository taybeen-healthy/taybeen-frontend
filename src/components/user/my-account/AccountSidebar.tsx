import React from "react";
import { LayoutGrid, History, ShoppingCart, Settings, LogOut, Users, LucideIcon } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const menuItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "orders", label: "Order history", icon: History },
  { id: "cart", label: "Shopping Cart", icon: ShoppingCart },
  { id: "affiliate", label: "Affiliate & Coupon", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Log-out", icon: LogOut },
];

import { useCart } from "@/context/CartContext";

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { setIsCartOpen } = useCart();

  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-4 sm:p-5 shadow-sm text-left">
      <ul className="space-y-1.5 font-poppins">
        {menuItems.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (item.id === "cart") {
                    setIsCartOpen(true);
                  } else {
                    onTabChange(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-left text-sm md:text-base transition-all ${
                  isActive
                    ? "bg-[#5A3E2B]/5 border-l-[3px] border-[#F7A503] text-brand-brown font-bold"
                    : "text-[#7D6B5E] hover:text-brand-brown hover:bg-black/5 font-medium"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-[#F7A503]" : "text-[#7D6B5E]"}
                />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountSidebar;
