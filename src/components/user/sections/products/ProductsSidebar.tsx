import React from "react";
import { SlidersHorizontal } from "lucide-react";

interface ProductsSidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <aside className="hidden lg:block w-[200px] xl:w-[240px] flex-shrink-0">
      <div className="sticky top-28 space-y-6">
        <div className="flex items-center gap-2 text-[#4A5E28]">
          <SlidersHorizontal size={18} />
          <h2 className="font-poppins font-bold text-lg uppercase tracking-wider">
            Categories
          </h2>
        </div>
        <div className="flex flex-col space-y-4">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left font-poppins text-base transition-colors duration-200 ${
                  isActive
                    ? "font-bold text-[#5A3E2B]"
                    : "text-[#5A3E2B]/80 hover:text-[#5A3E2B]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ProductsSidebar;
