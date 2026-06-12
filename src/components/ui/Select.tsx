import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  shortLabel?: React.ReactNode;
  searchString?: string;
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
  variant?: "default" | "borderless";
  optionsClassName?: string;
  disabled?: boolean;
  searchable?: boolean;
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
  variant = "default",
  optionsClassName = "",
  disabled = false,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { label: opt, value: opt, searchString: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

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

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const filteredOptions = normalizedOptions.filter((opt) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const valMatch = opt.value.toLowerCase().includes(query);
    const searchStringMatch = opt.searchString?.toLowerCase().includes(query);

    let labelMatch = false;
    if (typeof opt.label === "string") {
      labelMatch = opt.label.toLowerCase().includes(query);
    }

    return valMatch || searchStringMatch || labelMatch;
  });

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
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full text-brand-brown font-poppins text-sm text-left focus:outline-none transition-all relative",
            disabled && "opacity-60 cursor-not-allowed bg-black/[0.03]",
            variant === "borderless"
              ? "bg-transparent border-none py-2 px-1 pr-6"
              : "bg-white border rounded-lg py-3 px-4 pr-10 " + (
                  error
                    ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                    : "border-[#D1C7BD] focus:ring-brand-primary focus:border-brand-primary"
                ),
            isOpen && variant !== "borderless" && !error ? "border-brand-primary ring-1 ring-brand-primary/20" : ""
          )}
        >
          {selectedOption ? (
            <span className="text-brand-brown font-medium">
              {selectedOption.shortLabel || selectedOption.label}
            </span>
          ) : (
            <span className="text-[#C2B5A8]">{placeholder}</span>
          )}
          <span className={cn(
            "absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none",
            variant === "borderless" ? "right-1" : "right-3.5"
          )}>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#8D7F75] transition-transform duration-200 ease-out shrink-0",
                isOpen ? "transform rotate-180 text-brand-primary" : ""
              )}
            />
          </span>
        </button>

        {isOpen && (
          <div className={cn(
            "absolute mt-1.5 bg-white border border-[#F2EADA] rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 scrollbar-thin flex flex-col",
            variant === "borderless" ? "-left-3 w-[240px]" : "left-0 right-0",
            optionsClassName
          )}>
            {searchable && (
              <div className="p-2 border-b border-[#F2EADA] bg-white sticky top-0 z-10 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FDFAF3] border border-[#C4A482]/30 rounded-md py-1.5 px-3 text-xs font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:border-[#F7A503] focus:ring-1 focus:ring-[#F7A503]/20"
                  autoFocus
                />
              </div>
            )}
            <div className="overflow-y-auto flex-1 max-h-52">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-[#C2B5A8] font-poppins text-sm text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((opt) => {
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
