import React from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface AdminUploadBoxProps {
  height?: string;
  iconSize?: number;
  rounded?: "xl" | "2xl";
  title?: string;
  description?: string;
  className?: string;
}

export const AdminUploadBox: React.FC<AdminUploadBoxProps> = ({
  height = "h-[120px]",
  iconSize = 20,
  rounded = "xl",
  title = "Upload",
  description,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:border-brand-primary/40 transition-colors text-center font-poppins select-none",
        rounded === "2xl" ? "rounded-2xl" : "rounded-xl",
        height,
        className
      )}
    >
      <Upload size={iconSize} className="text-brand-brown/40 mb-1" />
      <span className="text-xs font-bold text-brand-brown/70">{title}</span>
      {description && (
        <span className={cn("text-[9px] text-[#8D7F75] mt-0.5", iconSize > 24 && "text-[11px] mt-1")}>
          {description}
        </span>
      )}
    </div>
  );
};

export default AdminUploadBox;
