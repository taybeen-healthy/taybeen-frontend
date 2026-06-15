import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-white border rounded-lg py-3 px-4 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none transition-all resize-y min-h-[100px]",
            error
              ? "border-red-400 focus:ring-1 focus:ring-red-200"
              : "border-[#C4A482]/40 focus:border-[#F7A503] focus:ring-1 focus:ring-[#F7A503]/20",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-red-500 font-poppins text-[10px] mt-1 block text-left">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
