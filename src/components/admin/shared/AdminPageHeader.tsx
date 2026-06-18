import React from "react";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  className?: string;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
}) => {
  const content = (
    <div>
      <h1 className="font-serif text-3xl font-bold text-brand-brown">{title}</h1>
      <p className="text-xs text-[#8D7F75] mt-1 font-poppins font-semibold">{subtitle}</p>
    </div>
  );

  if (!actions) {
    return <div className={cn("text-left", className)}>{content}</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left",
        className
      )}
    >
      {content}
      <div className="flex items-center gap-3 shrink-0">{actions}</div>
    </div>
  );
};

export default AdminPageHeader;
