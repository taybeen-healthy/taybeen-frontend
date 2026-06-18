import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, IndianRupee, Users, ShoppingCart, Box as BoxIcon } from "lucide-react";

interface AdminDashboardStatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  trend: string;
  trendDirection: "up" | "down";
  iconType: string;
  className?: string;
}

export const AdminDashboardStatCard: React.FC<AdminDashboardStatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  trendDirection,
  iconType,
  className = "",
}) => {
  const isUp = trendDirection === "up";

  const getKpiIcon = (type: string) => {
    const baseClass = "w-5 h-5";
    switch (type) {
      case "income":
        return <IndianRupee className={cn(baseClass, "text-amber-600")} />;
      case "customers":
        return <Users className={cn(baseClass, "text-blue-600")} />;
      case "orders":
        return <ShoppingCart className={cn(baseClass, "text-indigo-600")} />;
      case "products":
        return <BoxIcon className={cn(baseClass, "text-amber-800")} />;
      default:
        return <BoxIcon className={baseClass} />;
    }
  };

  const getKpiIconBg = (type: string) => {
    switch (type) {
      case "income":
        return "bg-amber-50";
      case "customers":
        return "bg-blue-50";
      case "orders":
        return "bg-indigo-50";
      case "products":
        return "bg-amber-100/50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className={cn("bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4 hover:border-brand-primary/30 transition-all duration-300 text-left font-poppins", className)}>
      <div className="flex items-center justify-between">
        <div className={cn("p-2.5 rounded-xl", getKpiIconBg(iconType))}>
          {getKpiIcon(iconType)}
        </div>
        
        <div className={cn(
          "flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold",
          isUp 
            ? "bg-[#4A5E28]/10 text-brand-green" 
            : "bg-red-500/10 text-red-500"
        )}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{trend}</span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-2xl font-bold font-poppins text-[#3A2418]">
          {value}
        </span>
        <h4 className="text-xs font-semibold text-[#8D7F75] tracking-wider uppercase block">
          {title}
        </h4>
      </div>

      <div className="border-t border-gray-100 pt-3 text-[11px] text-[#8D7F75]">
        {subtext}
      </div>
    </div>
  );
};

export default AdminDashboardStatCard;
