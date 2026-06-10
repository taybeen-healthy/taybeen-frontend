import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={cn("relative flex items-center bg-[#FDFCF9] hover:bg-white border border-[#C4A482]/30 hover:border-brand-primary/60 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 rounded-xl py-2.5 pl-4 pr-10 transition-all duration-300 w-full max-w-[280px]", className)}>
      <Search size={15} className="text-brand-green/70 flex-shrink-0" strokeWidth={2.5} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent text-brand-brown font-poppins text-xs placeholder-brand-brown/40 focus:outline-none w-full ml-2"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-brown/40 hover:text-brand-brown text-[10px] font-bold tracking-wider"
        >
          CLEAR
        </button>
      )}
    </div>
  );
};
