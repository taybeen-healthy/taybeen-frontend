import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, rightElement, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full bg-white border rounded-lg py-3 px-4 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none transition-all",
              rightElement && "pr-11",
              error
                ? "border-red-400 focus:ring-1 focus:ring-red-200"
                : "border-[#C4A482]/40 focus:border-[#F7A503] focus:ring-1 focus:ring-[#F7A503]/20",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <span className="text-red-500 font-poppins text-[10px] mt-1 block text-left">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
