import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: "cream" | "white" | "none";
  overflowHidden?: boolean;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  bg = "cream",
  overflowHidden = false,
  id,
}) => {
  const bgStyles = {
    cream: "bg-brand-bg",
    white: "bg-white",
    none: "bg-transparent",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 md:py-20 lg:py-24",
        bgStyles[bg],
        overflowHidden && "overflow-hidden",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        {children}
      </div>
    </section>
  );
};
export default Section;
