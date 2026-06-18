import React from "react";
import { cn } from "@/lib/utils";

interface AdminEmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
  message,
  icon,
  className = "",
}) => {
  return (
    <div className={cn("py-8 text-center text-sm text-[#8D7F75] font-poppins font-medium flex flex-col items-center justify-center gap-2", className)}>
      {icon && <div className="text-gray-400 shrink-0">{icon}</div>}
      <p className="italic">{message}</p>
    </div>
  );
};

export default AdminEmptyState;
