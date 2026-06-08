import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[] | SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  error,
  required,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options array
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { label: opt, value: opt };
    }
    return opt;
  });

  // Find currently selected option object
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative w-full flex flex-col", className)} ref={containerRef}>
      {label && (
        <span className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm mb-2 block text-left">
          {label}
          {required && "*"}
        </span>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full bg-white border rounded-lg py-3 px-4 pr-10 text-brand-brown font-poppins text-sm text-left focus:outline-none focus:ring-1 transition-all relative",
            error
              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
              : "border-[#D1C7BD] focus:ring-brand-primary focus:border-brand-primary",
            isOpen && !error ? "border-brand-primary ring-1 ring-brand-primary/20" : ""
          )}
        >
          {selectedOption ? (
            <span className="text-brand-brown font-medium">{selectedOption.label}</span>
          ) : (
            <span className="text-[#C2B5A8]">{placeholder}</span>
          )}
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#8D7F75] transition-transform duration-200 ease-out shrink-0",
                isOpen ? "transform rotate-180 text-brand-primary" : ""
              )}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#F2EADA] rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 scrollbar-thin">
            {normalizedOptions.length === 0 ? (
              <div className="px-4 py-3 text-[#C2B5A8] font-poppins text-sm text-center">
                No options available
              </div>
            ) : (
              normalizedOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "w-full px-4 py-3 text-brand-brown font-poppins text-sm text-left hover:bg-brand-green-pale/50 transition-colors flex items-center justify-between cursor-pointer",
                      isSelected ? "bg-brand-green-pale/70 font-semibold text-brand-green" : ""
                    )}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-500 font-poppins text-[10px] md:text-xs mt-1 text-left">
          {error}
        </span>
      )}
    </div>
  );
};
