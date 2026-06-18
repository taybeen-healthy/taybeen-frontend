"use client";

import React, { useState, useRef } from "react";
import {
  Download,
  SlidersHorizontal,
  BarChart3,
  Eye,
  MoreVertical,
  Clock,
  CheckCircle2,
  Boxes,
  IndianRupee,
  Printer
} from "lucide-react";
import { ordersKpis, adminOrdersList } from "@/data/admin/ordersData";
import { formatIndianCurrency, cn } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { AdminOrder } from "@/types/admin/orders";
import { motion, AnimatePresence } from "framer-motion";
import { PortalDropdown } from "@/components/ui/PortalDropdown";




export const OrdersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState<AdminOrder[]>(adminOrdersList);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionMenuOrderId, setActiveActionMenuOrderId] = useState<string | null>(null);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const activeActionTriggerRef = useRef<HTMLButtonElement | null>(null);

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

  const handleUpdateStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setSelectedOrder((prev) => (prev && prev.id === orderId ? { ...prev, status: newStatus } : prev));
  };

  const filteredOrders = orders
    .filter((order) => {
      // 1. Search Query
      const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Status Filter
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;

      // 3. Price Range Filter
      let matchesPrice = true;
      if (priceRange === "under500") {
        matchesPrice = order.totalAmount < 500;
      } else if (priceRange === "500to750") {
        matchesPrice = order.totalAmount >= 500 && order.totalAmount <= 750;
      } else if (priceRange === "above750") {
        matchesPrice = order.totalAmount > 750;
      }

      // 4. Payment Method Filter
      let matchesPayment = true;
      if (paymentFilter === "cod") {
        matchesPayment = order.paymentMethod.toLowerCase().includes("cash");
      } else if (paymentFilter === "upi") {
        matchesPayment = order.paymentMethod.toLowerCase().includes("upi") || order.paymentMethod.toLowerCase().includes("net");
      } else if (paymentFilter === "card") {
        matchesPayment = order.paymentMethod.toLowerCase().includes("card");
      }

      return matchesSearch && matchesStatus && matchesPrice && matchesPayment;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-8 text-left font-poppins">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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

      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search orders..."
          className="md:max-w-md"
        />

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

          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
              className={cn(
                "inline-flex items-center justify-center font-poppins leading-none transition-all duration-200 rounded-lg text-sm border border-brand-brown text-brand-brown hover:bg-[#5A3E2B] hover:text-white px-6 py-2.5 h-10 gap-2 cursor-pointer select-none active:scale-[0.98] focus:outline-none",
                isFilterPopoverOpen ? "bg-[#5A3E2B] text-white" : "bg-white"
              )}
            >
              <SlidersHorizontal size={16} />
              <span>Filter</span>
            </button>

            <PortalDropdown
              isOpen={isFilterPopoverOpen}
              onClose={() => setIsFilterPopoverOpen(false)}
              triggerRef={filterButtonRef}
              width={288}
              align="right"
              className="p-5 border-b-2"
            >
              <div className="flex items-center justify-between border-b border-[#C4A482]/10 pb-2 mb-1">
                <span className="font-serif text-sm font-bold text-brand-brown">Filters</span>
                <button
                  onClick={() => {
                    setSortOrder("newest");
                    setPriceRange("all");
                    setPaymentFilter("all");
                    setIsFilterPopoverOpen(false);
                  }}
                  className="text-[10px] font-bold text-[#768C3A] hover:underline cursor-pointer focus:outline-none"
                >
                  Reset All
                </button>
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5 mt-3">
                <label className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                  Sort by Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSortOrder("newest")}
                    className={cn(
                      "py-1.5 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer focus:outline-none",
                      sortOrder === "newest"
                        ? "bg-brand-brown text-white border-brand-brown"
                        : "bg-white text-brand-brown border-[#C4A482]/20 hover:bg-gray-50/50"
                    )}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => setSortOrder("oldest")}
                    className={cn(
                      "py-1.5 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer focus:outline-none",
                      sortOrder === "oldest"
                        ? "bg-brand-brown text-white border-brand-brown"
                        : "bg-white text-brand-brown border-[#C4A482]/20 hover:bg-gray-50/50"
                    )}
                  >
                    Oldest First
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-1.5 mt-3">
                <label className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                  Order Total
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-white border border-[#C4A482]/20 rounded-lg py-1.5 px-3 text-xs font-semibold text-brand-brown focus:outline-none cursor-pointer"
                >
                  <option value="all">All Values</option>
                  <option value="under500">Under ₹500</option>
                  <option value="500to750">₹500 - ₹750</option>
                  <option value="above750">Above ₹750</option>
                </select>
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5 mt-3">
                <label className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "All", value: "all" },
                    { label: "Cash (COD)", value: "cod" },
                    { label: "UPI", value: "upi" },
                    { label: "Card", value: "card" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPaymentFilter(opt.value)}
                      className={cn(
                        "py-1.5 px-2.5 text-[11px] font-semibold rounded-lg border text-center transition-all cursor-pointer focus:outline-none",
                        paymentFilter === opt.value
                          ? "bg-brand-green text-white border-brand-green"
                          : "bg-white text-brand-brown border-[#C4A482]/20 hover:bg-gray-50/50"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </PortalDropdown>
          </div>
        </div>
      </div>

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
                    <td
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                      className="py-4 px-6 font-bold text-brand-green cursor-pointer hover:underline"
                    >
                      {order.id}
                    </td>

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

                    <td className="py-4 px-6 font-medium text-[#8D7F75]">
                      {order.date}
                    </td>

                    <td className="py-4 px-6 font-bold text-[#8D7F75]">
                      {order.itemsCount < 10 ? `0${order.itemsCount}` : order.itemsCount}
                    </td>

                    <td className="py-4 px-6 font-bold font-poppins text-[#3A2418]">
                      ₹{formatIndianCurrency(order.totalAmount)}
                    </td>

                    <td className="py-4 px-6">
                      <Badge
                        text={order.status}
                        variant={
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                              ? "pending"
                              : order.status === "In Transit" || order.status === "Shipped" || order.status === "Processing"
                                ? "info"
                                : "error"
                        }
                        className="inline-block"
                      />
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                          aria-label="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <div>
                          <button
                            ref={(el) => {
                              if (activeActionMenuOrderId === order.id) {
                                activeActionTriggerRef.current = el;
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveActionMenuOrderId(activeActionMenuOrderId === order.id ? null : order.id);
                            }}
                            className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                            aria-label="More Options"
                          >
                            <MoreVertical size={18} />
                          </button>

                          <PortalDropdown
                            isOpen={activeActionMenuOrderId === order.id}
                            onClose={() => setActiveActionMenuOrderId(null)}
                            triggerRef={activeActionTriggerRef}
                            width={192}
                            align="right"
                          >
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsModalOpen(true);
                                setActiveActionMenuOrderId(null);
                              }}
                              className="w-full px-4 py-2 text-xs font-semibold text-brand-brown hover:bg-white hover:text-brand-brown-dark flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <Eye size={14} className="text-[#8D7F75]" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveActionMenuOrderId(null);
                                setSelectedOrder(order);
                                setTimeout(() => window.print(), 100);
                              }}
                              className="w-full px-4 py-2 text-xs font-semibold text-brand-brown hover:bg-white hover:text-brand-brown-dark flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <Printer size={14} className="text-[#8D7F75]" />
                              <span>Print Invoice</span>
                            </button>
                            <div className="border-t border-[#C4A482]/10 my-1.5" />
                            <div className="px-4 py-1 text-[9px] font-bold text-[#8D7F75] uppercase tracking-wider">
                              Quick Status
                            </div>
                            {(["Pending", "Processing", "Shipped", "Completed", "Cancelled"] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => {
                                  handleUpdateStatus(order.id, status);
                                  setActiveActionMenuOrderId(null);
                                }}
                                className={`w-full px-4 py-1.5 text-xs font-medium text-left transition-colors cursor-pointer flex items-center gap-2 ${order.status === status
                                  ? "text-brand-green font-semibold bg-brand-green-pale/40"
                                  : "text-[#8D7F75] hover:bg-white hover:text-brand-brown-dark"
                                  }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${status === "Completed" ? "bg-brand-green" :
                                  status === "Pending" ? "bg-amber-500" :
                                    status === "Cancelled" ? "bg-red-500" : "bg-blue-500"
                                  }`} />
                                <span>{status}</span>
                              </button>
                            ))}
                          </PortalDropdown>
                        </div>
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
      {isModalOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default OrdersList;
