import React from "react";
import { Tag } from "./Tag";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
  tagVariant?: "primary-light" | "gold" | "yellow" | "outline";
  tagClassName?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  actions,
  tagVariant = "yellow",
  tagClassName = "",
  className = "",
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8", className)}>
      <div className="space-y-4 text-left">
        <Tag variant={tagVariant} className={tagClassName}>
          {tag}
        </Tag>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown leading-tight">
          {title}
        </h2>
      </div>

      {(actions || subtitle) && (
        <div className="w-full md:w-auto text-left md:text-right space-y-2 select-none">
          {actions}
          {subtitle && (
            <p className="text-brand-green-light font-poppins text-xs md:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default SectionHeader;
