"use client";

import React, { useState } from "react";
import { RefreshCw, Search, Eye, Trash2 } from "lucide-react";
import { customersKpis, adminCustomersList } from "@/data/admin/customersData";
import { formatIndianCurrency } from "@/lib/utils";

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
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">
            Customers
          </h1>
          <p className="text-xs text-[#8D7F75] mt-1">
            Manage and view all customer information
          </p>
        </div>
        <button className="bg-brand-green hover:bg-[#3A4E1B] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all">
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Customers */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <h4 className="text-sm font-bold text-brand-brown/70">Total Customers</h4>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {customersKpis.totalCustomers}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {customersKpis.totalCustomersSub}
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <h4 className="text-sm font-bold text-brand-brown/70">Total Orders</h4>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {customersKpis.totalOrders}
          </span>
          <div className="text-[10px] font-semibold text-[#8D7F75]">
            {customersKpis.totalCustomersSub.includes("Active") ? "From All Customers" : customersKpis.totalCustomersSub}
          </div>
        </div>

        {/* Card 3: Total Revenue */}
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

      {/* Search Input Filter */}
      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm">
        <div className="relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D7F75]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, email or phone number..."
            className="w-full bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* Table grid */}
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
                    {/* Customer */}
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

                    {/* Contact */}
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

                    {/* Orders */}
                    <td className="py-4 px-6 font-bold text-[#8D7F75]">
                      {customer.ordersCount < 10 ? `0${customer.ordersCount}` : customer.ordersCount}
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-6 font-bold font-poppins text-[#3A2418]">
                      ₹{formatIndianCurrency(customer.totalSpent)}
                    </td>

                    {/* Joined */}
                    <td className="py-4 px-6 font-semibold text-[#8D7F75]">
                      {customer.joinedDate}
                    </td>

                    {/* Actions */}
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

        {/* Pagination Row */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-poppins font-medium text-[#8D7F75]">
          <div className="flex items-center gap-2">
            <button className="border border-[#C4A482]/30 rounded-lg py-2.5 px-4 bg-white text-[#8D7F75] hover:border-brand-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="bg-brand-green text-white font-bold rounded-lg w-9 h-9 flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="border border-[#C4A482]/30 rounded-lg py-2.5 px-4 bg-white text-[#8D7F75] hover:border-brand-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
