"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { recentProducts } from "@/data/admin/productsData";
import { formatIndianCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AdminCard, AdminTableShell, AdminStatusBadge } from "../shared";

export const RecentProductsTable: React.FC = () => {
  const tableHeaders = [
    { label: "Product", className: "px-4 rounded-l-xl" },
    { label: "Category", className: "px-4" },
    { label: "Price", className: "px-4" },
    { label: "Stock", className: "px-4" },
    { label: "Status", className: "px-4" },
    { label: "Actions", className: "px-4 rounded-r-xl" },
  ];

  return (
    <AdminCard className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-brand-brown">Recent Products</h3>
        <p className="text-xs text-[#8D7F75]">Manage your product inventory.</p>
      </div>

      <AdminTableShell headers={tableHeaders} tableClassName="min-w-[640px]">
        {recentProducts.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50/40 transition-colors">
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FDFAF3] border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  <div className="text-[10px] font-bold text-brand-brown/40">Dates</div>
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] leading-tight">{product.name}</h4>
                  <span className="text-[10px] text-[#8D7F75] font-semibold">ID: {product.id}</span>
                </div>
              </div>
            </td>

            <td className="py-4 px-4 font-medium">{product.category}</td>

            <td className="py-4 px-4 font-semibold font-poppins text-[#3A2418]">
              ₹{formatIndianCurrency(product.price)}
            </td>

            <td className="py-4 px-4 font-semibold">{product.stock}</td>

            <td className="py-4 px-4">
              <AdminStatusBadge status={product.status} />
            </td>

            <td className="py-4 px-4">
              <div className="flex items-center gap-4">
                <button className="text-brand-green hover:text-[#3A4E1B] text-xs font-bold cursor-pointer hover:underline">
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>

      <div className="flex justify-start pt-2">
        <Button variant="dark" size="sm">
          Load More Products
        </Button>
      </div>
    </AdminCard>
  );
};

export default RecentProductsTable;
