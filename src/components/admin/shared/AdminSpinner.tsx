import React from "react";
import { cn } from "@/lib/utils";

interface AdminSpinnerProps {
  size?: number;
  colorClassName?: string;
  className?: string;
}

export const AdminSpinner: React.FC<AdminSpinnerProps> = ({
  size = 4,
  colorClassName = "border-[#FDFAF3]",
  className = "",
}) => {
  const sizeClass = size === 5 ? "w-5 h-5 border-2" : "w-4 h-4 border-2";
  return (
    <div
      className={cn(
        "border-t-transparent rounded-full animate-spin",
        sizeClass,
        colorClassName,
        className
      )}
    />
  );
};

export default AdminSpinner;
