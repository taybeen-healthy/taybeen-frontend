import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getPaginationRange = (currentPage: number, totalPages: number) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage === totalPages) {
    return [totalPages - 1, totalPages];
  }

  if (currentPage + 1 === totalPages) {
    return [currentPage, totalPages];
  }

  if (currentPage + 2 === totalPages) {
    return [currentPage, currentPage + 1, totalPages];
  }

  return [currentPage, currentPage + 1, '...', totalPages];
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-start gap-2 ${className}`}>
      {/* Previous Arrow */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-poppins font-semibold text-xs md:text-sm transition-all duration-300 border ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed bg-[#FAF6EE]/50 border-[#C4A482]/20 text-[#5A3E2B]/50"
            : "bg-[#FAF6EE] border border-[#C4A482]/40 text-[#5A3E2B] hover:bg-[#F6F1E9]"
        }`}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {getPaginationRange(currentPage, totalPages).map((pageNum, index) => {
        if (pageNum === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center font-poppins font-semibold text-xs md:text-sm text-[#5A3E2B]/60 select-none"
            >
              ...
            </span>
          );
        }
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum as number)}
            className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-poppins font-semibold text-xs md:text-sm transition-all duration-300 border ${
              isActive
                ? "bg-[#4A5E28] text-white border-[#4A5E28] shadow-[0_4px_12px_rgba(74,94,40,0.15)]"
                : "bg-[#FAF6EE] border border-[#C4A482]/40 text-[#5A3E2B] hover:bg-[#F6F1E9]"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Arrow */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg font-poppins font-semibold text-xs md:text-sm transition-all duration-300 border ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed bg-[#FAF6EE]/50 border-[#C4A482]/20 text-[#5A3E2B]/50"
            : "bg-[#FAF6EE] border border-[#C4A482]/40 text-[#5A3E2B] hover:bg-[#F6F1E9]"
        }`}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};
