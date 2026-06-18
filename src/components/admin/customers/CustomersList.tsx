"use client";

import React, { useState } from "react";
import { RefreshCw, Eye, Trash2 } from "lucide-react";
import { customersKpis, adminCustomersList } from "@/data/admin/customersData";
import { formatIndianCurrency } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { CustomerDetailsModal } from "./CustomerDetailsModal";
import { AdminCustomer } from "@/types/admin/customers";
import {
  AdminPageHeader,
  AdminListStatCard,
  AdminTableShell,
  AdminPagination,
  AdminEmptyState,
} from "../shared";

export const CustomersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCustomers = adminCustomersList.filter((customer) => {
    const term = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.includes(term)
    );
  });

  const tableHeaders = [
    { label: "Customer" },
    { label: "Contact" },
    { label: "Orders" },
    { label: "Total Spent" },
    { label: "Joined" },
    { label: "Actions", className: "text-center" },
  ];

  return (
    <div className="space-y-8 text-left font-poppins">
      <AdminPageHeader
        title="Customers"
        subtitle="Manage and view all customer information"
        actions={
          <Button variant="dark" size="sm" className="gap-2">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminListStatCard
          title="Total Customers"
          value={customersKpis.totalCustomers}
          subtext={customersKpis.totalCustomersSub}
          subtextClassName="text-brand-primary"
        />

        <AdminListStatCard
          title="Total Orders"
          value={customersKpis.totalOrders}
          subtext={
            customersKpis.totalCustomersSub.includes("Active")
              ? "From All Customers"
              : customersKpis.totalCustomersSub
          }
        />

        <AdminListStatCard
          title="Total Revenue"
          value={`₹${formatIndianCurrency(customersKpis.totalRevenue, 2)}`}
          subtext={customersKpis.totalRevenueTrend}
          subtextClassName="text-brand-primary"
        />
      </div>

      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search customers by name, email or phone number..."
          className="max-w-none"
        />
      </div>

      <AdminTableShell headers={tableHeaders} tableClassName="min-w-[768px]">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50/40 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none shrink-0">
                    {customer.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3A2418] leading-tight">{customer.name}</h4>
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
                  <span className="text-xs text-[#8D7F75] mt-0.5">{customer.phone}</span>
                </div>
              </td>

              <td className="py-4 px-6 font-bold text-[#8D7F75]">
                {customer.ordersCount < 10 ? `0${customer.ordersCount}` : customer.ordersCount}
              </td>

              <td className="py-4 px-6 font-bold font-poppins text-[#3A2418]">
                ₹{formatIndianCurrency(customer.totalSpent)}
              </td>

              <td className="py-4 px-6 font-semibold text-[#8D7F75]">{customer.joinedDate}</td>

              <td className="py-4 px-6">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsModalOpen(true);
                    }}
                    className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                    aria-label="View Info"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    aria-label="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <AdminEmptyState message="No customers found matching the search query." />
            </td>
          </tr>
        )}
      </AdminTableShell>

      <AdminPagination currentPage={1} totalPages={1} />

      {isModalOpen && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomersList;
