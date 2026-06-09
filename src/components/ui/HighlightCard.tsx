import React from "react";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  className?: string;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  description,
  icon: Icon,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex items-center border border-brand-brown/10 rounded-xl bg-white/50 backdrop-blur-sm",
        "p-4 sm:p-5 lg:p-4 xl:p-5 gap-3 sm:gap-4 lg:gap-3 xl:gap-4",
        className
      )}
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full bg-brand-primary flex items-center justify-center text-[#F6F1E9] shrink-0">
        <Icon size={20} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[18px] lg:h-[18px] xl:w-5 xl:h-5" />
      </div>
      <div className="text-left">
        <h4 className="text-brand-green font-poppins font-bold text-sm sm:text-base lg:text-sm xl:text-base leading-tight">
          {title}
        </h4>
        <p className="text-brand-green-light font-poppins text-xs sm:text-sm lg:text-xs xl:text-sm mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
};
export default HighlightCard;
