import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  align?: "left" | "right";
  icon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = "Select option",
  align = "right",
  icon,
  className = "",
  triggerClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 font-poppins text-xs text-[#8D7F75] select-none",
        className
      )}
      ref={containerRef}
    >
      {label && <span className="uppercase tracking-wider">{label}</span>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "font-semibold text-brand-brown hover:text-brand-primary transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer",
          triggerClassName
        )}
      >
        {icon && <span className="flex-shrink-0 flex items-center">{icon}</span>}
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full mt-2 w-48 bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl py-2 shadow-premium z-30 overflow-hidden",
                align === "right" ? "right-0" : "left-0"
              )}
            >
              {options.map((option) => {
                const isSelected = value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-xs font-poppins font-normal transition-colors cursor-pointer",
                      isSelected
                        ? "text-brand-green font-semibold bg-brand-green-pale/50"
                        : "text-brand-brown hover:bg-white hover:text-brand-brown-dark"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
