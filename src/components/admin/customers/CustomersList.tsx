"use client";

import React, { useState } from "react";
import { RefreshCw, Eye, Trash2 } from "lucide-react";
import { customersKpis, adminCustomersList } from "@/data/admin/customersData";
import { formatIndianCurrency } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";

export const CustomersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = adminCustomersList.filter((customer) => {
    const term = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.includes(term)
    );
  });

  return (
    <div className="space-y-8 text-left font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">
            Customers
          </h1>
          <p className="text-xs text-[#8D7F75] mt-1">
            Manage and view all customer information
          </p>
        </div>
        <Button variant="dark" size="sm" className="gap-2">
          <RefreshCw size={16} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <h4 className="text-sm font-bold text-brand-brown/70">Total Customers</h4>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {customersKpis.totalCustomers}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {customersKpis.totalCustomersSub}
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <h4 className="text-sm font-bold text-brand-brown/70">Total Orders</h4>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {customersKpis.totalOrders}
          </span>
          <div className="text-[10px] font-semibold text-[#8D7F75]">
            {customersKpis.totalCustomersSub.includes("Active") ? "From All Customers" : customersKpis.totalCustomersSub}
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <h4 className="text-sm font-bold text-brand-brown/70">Total Revenue</h4>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            ₹{formatIndianCurrency(customersKpis.totalRevenue, 2)}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {customersKpis.totalRevenueTrend}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search customers by name, email or phone number..."
          className="max-w-none" 
        />
      </div>

      <div className="bg-white border border-[#C4A482]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[768px] border-collapse">
            <thead>
              <tr className="bg-[#F8E8C9]/35 text-[#5A3E2B] font-bold text-xs uppercase tracking-wider text-left border-b border-[#C4A482]/10">
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Orders</th>
                <th className="py-4 px-6">Total Spent</th>
                <th className="py-4 px-6">Joined</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-[#3A2418]">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none shrink-0">
                          {customer.initial}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#3A2418] leading-tight">
                            {customer.name}
                          </h4>
                          <span className="text-[10px] text-[#8D7F75] font-semibold">
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#3A2418] leading-tight">
                          {customer.email}
                        </span>
                        <span className="text-xs text-[#8D7F75] mt-0.5">
                          {customer.phone}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-bold text-[#8D7F75]">
                      {customer.ordersCount < 10 ? `0${customer.ordersCount}` : customer.ordersCount}
                    </td>

                    <td className="py-4 px-6 font-bold font-poppins text-[#3A2418]">
                      ₹{formatIndianCurrency(customer.totalSpent)}
                    </td>

                    <td className="py-4 px-6 font-semibold text-[#8D7F75]">
                      {customer.joinedDate}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer" aria-label="View Info">
                          <Eye size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer" aria-label="Delete User">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-[#8D7F75]">
                    No customers found matching the search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-poppins font-medium text-[#8D7F75]">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="py-2.5 px-4 text-xs font-semibold h-9"
              disabled
            >
              Previous
            </Button>
            <button className="bg-brand-green text-white font-bold rounded-lg w-9 h-9 flex items-center justify-center shadow-sm select-none">
              1
            </button>
            <Button
              variant="outline"
              size="sm"
              className="py-2.5 px-4 text-xs font-semibold h-9"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
