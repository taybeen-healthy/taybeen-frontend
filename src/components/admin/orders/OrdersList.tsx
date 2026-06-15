"use client";

import React, { useState } from "react";
import { 
  Download, 
  SlidersHorizontal, 
  BarChart3, 
  Eye, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  Boxes, 
  IndianRupee 
} from "lucide-react";
import { ordersKpis, adminOrdersList } from "@/data/admin/ordersData";
import { formatIndianCurrency } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export const OrdersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const getKpiIcon = (iconName: string) => {
    switch (iconName) {
      case "orders":
        return <Boxes className="w-5 h-5 text-[#8D7F75]" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-brand-green" />;
      case "revenue":
        return <IndianRupee className="w-5 h-5 text-brand-green" />;
      default:
        return <Boxes className="w-5 h-5" />;
    }
  };

  const filteredOrders = adminOrdersList.filter((order) => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 text-left font-poppins">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">
            All Orders
          </h1>
          <p className="text-xs text-[#8D7F75] mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <Button variant="dark" size="sm" className="gap-2">
          <Download size={16} />
          <span>Export</span>
        </Button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Total Orders */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Total Orders</h4>
            {getKpiIcon("orders")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {ordersKpis.totalOrders}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {ordersKpis.totalOrdersTrend}
          </div>
        </div>

        {/* Card 2: Pending */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Pending</h4>
            {getKpiIcon("pending")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {ordersKpis.pendingCount}
          </span>
          <div className="text-[10px] font-semibold text-[#8D7F75]">
            {ordersKpis.revenueTrend.includes("Awaiting") ? ordersKpis.revenueTrend : "Awaiting processing"}
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Completed</h4>
            {getKpiIcon("completed")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {ordersKpis.completedCount}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {ordersKpis.completedTrend}
          </div>
        </div>

        {/* Card 4: Revenue */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Revenue</h4>
            {getKpiIcon("revenue")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {ordersKpis.revenueText}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {ordersKpis.revenueTrend}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search orders..." 
          className="md:max-w-md" 
        />

        {/* Filter select tags */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl px-2 py-0.5 w-44">
            <BarChart3 size={16} className="text-[#8D7F75] ml-2 absolute left-2 pointer-events-none" />
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={["All", "Completed", "Pending", "In Transit", "Cancelled"]}
              placeholder="All Status"
              variant="borderless"
              className="pl-6 w-full"
            />
          </div>
          
          <Button variant="outline" size="sm" className="gap-2 px-6 py-2.5 h-10">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#C4A482]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[768px] border-collapse">
            <thead>
              <tr className="bg-[#F8E8C9]/35 text-[#5A3E2B] font-bold text-xs uppercase tracking-wider text-left border-b border-[#C4A482]/10">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Items</th>
                <th className="py-4 px-6">Total</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-[#3A2418]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/40 transition-colors">
                    {/* Order ID */}
                    <td className="py-4 px-6 font-bold text-brand-green">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none">
                          {order.customerInitial}
                        </div>
                        <span className="font-semibold text-[#3A2418]">
                          {order.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 font-medium text-[#8D7F75]">
                      {order.date}
                    </td>

                    {/* Items Count */}
                    <td className="py-4 px-6 font-bold text-[#8D7F75]">
                      {order.itemsCount < 10 ? `0${order.itemsCount}` : order.itemsCount}
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-6 font-bold font-poppins text-[#3A2418]">
                      ₹{formatIndianCurrency(order.totalAmount)}
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      <Badge
                        text={order.status}
                        variant={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                            ? "pending"
                            : order.status === "In Transit"
                            ? "info"
                            : "error"
                        }
                        className="inline-block"
                      />
                    </td>

                    {/* Actions icons */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer" aria-label="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer" aria-label="More Options">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-[#8D7F75]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-poppins font-medium text-[#8D7F75]">
          <span>
            Showing 1-{filteredOrders.length} of {filteredOrders.length} orders.
          </span>
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

export default OrdersList;
