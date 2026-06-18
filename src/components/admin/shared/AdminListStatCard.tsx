import React from "react";
import { cn } from "@/lib/utils";

interface AdminListStatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  className?: string;
  subtextClassName?: string;
}

export const AdminListStatCard: React.FC<AdminListStatCardProps> = ({
  title,
  value,
  subtext,
  icon,
  className = "",
  subtextClassName = "",
}) => {
  return (
    <div className={cn("bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3 text-left font-poppins", className)}>
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-brand-brown/70">{title}</h4>
        {icon && <div className="shrink-0">{icon}</div>}
      </div>
      <span className="text-3xl font-bold font-poppins text-[#3A2418]">
        {value}
      </span>
      {subtext && (
        <div className={cn("text-[10px] font-bold text-[#8D7F75]", subtextClassName)}>
          {subtext}
        </div>
      )}
    </div>
  );
};

export default AdminListStatCard;
