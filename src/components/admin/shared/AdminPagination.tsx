import React from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const AdminPagination: React.FC<AdminPaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) => {
  return (
    <div className={cn("p-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-poppins font-medium text-[#8D7F75] select-none", className)}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="py-2.5 px-4 text-xs font-semibold h-9"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={cn(
                "font-bold rounded-lg w-9 h-9 flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-95",
                isActive 
                  ? "bg-brand-green text-white" 
                  : "bg-white border border-[#C4A482]/20 text-brand-brown hover:bg-[#F2EADA]/20"
              )}
            >
              {page}
            </button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="py-2.5 px-4 text-xs font-semibold h-9"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminPagination;
