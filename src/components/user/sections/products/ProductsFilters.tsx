import React from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Dropdown } from "@/components/ui/Dropdown";
import { SortOption } from "@/data/user/productsPageData";

interface ProductsFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  itemsCount: number;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOptions: SortOption[];
}

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  searchQuery,
  onSearchQueryChange,
  itemsCount,
  sortBy,
  onSortByChange,
  sortOptions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#5A3E2B]/10">
      <div className="flex items-center gap-4 flex-1">
        <SearchBar
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder="Search collection..."
        />
        <span className="text-[#5A3E2B]/15 font-poppins text-xs">|</span>
        <div className="text-[#8D7F75] font-poppins text-xs tracking-wider uppercase font-medium">
          <span className="font-semibold text-brand-green">{itemsCount}</span> items
        </div>
      </div>

      <Dropdown
        value={sortBy}
        onChange={onSortByChange}
        options={sortOptions}
        label="Sort by:"
        align="right"
      />
    </div>
  );
};

export default ProductsFilters;
