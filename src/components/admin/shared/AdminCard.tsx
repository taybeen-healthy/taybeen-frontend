import React from "react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={cn("border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-left font-poppins space-y-6", className)}>
      {title && (
        <h3 className="text-lg font-bold text-brand-brown pb-2 border-b border-gray-100">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default AdminCard;
