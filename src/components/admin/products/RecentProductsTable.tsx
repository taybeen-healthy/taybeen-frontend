"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { recentProducts } from "@/data/admin/productsData";
import { formatIndianCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const RecentProductsTable: React.FC = () => {
  return (
    <div className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-left font-poppins space-y-6">
      <div>
        <h3 className="text-lg font-bold text-brand-brown">Recent Products</h3>
        <p className="text-xs text-[#8D7F75]">Manage your product inventory.</p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-[#F8E8C9]/35 text-[#5A3E2B] font-bold text-xs uppercase tracking-wider text-left border-b border-[#C4A482]/10">
              <th className="py-4 px-4 rounded-l-xl">Product</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Stock</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-[#3A2418]">
            {recentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/40 transition-colors">
                {/* Product name & thumbnail */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FDFAF3] border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      <div className="text-[10px] font-bold text-brand-brown/40">Dates</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3A2418] leading-tight">
                        {product.name}
                      </h4>
                      <span className="text-[10px] text-[#8D7F75] font-semibold">
                        ID: {product.id}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-medium">{product.category}</td>
                
                <td className="py-4 px-4 font-semibold font-poppins text-[#3A2418]">₹{formatIndianCurrency(product.price)}</td>
                
                <td className="py-4 px-4 font-semibold">{product.stock}</td>
                
                <td className="py-4 px-4">
                  <Badge 
                    text={product.status}
                    variant={
                      product.status === "In Stock"
                        ? "success"
                        : product.status === "Low Stock"
                        ? "pending"
                        : "error"
                    }
                    className="inline-block"
                  />
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <button className="text-brand-green hover:text-[#3A4E1B] text-xs font-bold cursor-pointer hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors cursor-pointer" aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-start pt-2">
        <Button variant="dark" size="sm">
          Load More Products
        </Button>
      </div>
    </div>
  );
};

export default RecentProductsTable;
