import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "primary-light" | "gold" | "yellow" | "outline";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "primary-light",
  className = "",
}) => {
  const baseStyle = "inline-block px-4 py-1.5 rounded-3xl select-none font-poppins shrink-0";

  const variants = {
    "primary-light":
      "bg-brand-primary/25 border border-[#F6EBDA80] backdrop-blur-sm text-brand-green font-semibold text-xs md:text-sm",
    gold: "bg-[#FFEABF] text-brand-brown font-semibold text-xs md:text-sm",
    yellow: "bg-[#FDE8C0] text-brand-green text-xs md:text-sm uppercase tracking-wider",
    outline: "border border-brand-brown/20 text-brand-brown font-medium text-xs md:text-sm",
  };

  return <div className={cn(baseStyle, variants[variant], className)}>{children}</div>;
};
export default Tag;
