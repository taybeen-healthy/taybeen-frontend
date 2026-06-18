"use client";

import React, { useState, useRef } from "react";
import {
  Download,
  SlidersHorizontal,
  Eye,
  MoreVertical,
  Clock,
  CheckCircle2,
  Boxes,
  IndianRupee,
  Printer,
} from "lucide-react";
import { ordersKpis, adminOrdersList } from "@/data/admin/ordersData";
import { formatIndianCurrency, cn } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { AdminOrder } from "@/types/admin/orders";
import { motion, AnimatePresence } from "framer-motion";
import { PortalDropdown } from "@/components/ui/PortalDropdown";
import {
  AdminPageHeader,
  AdminListStatCard,
  AdminTableShell,
  AdminPagination,
  AdminStatusBadge,
} from "../shared";

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
    setSelectedOrder((prev) =>
      prev && prev.id === orderId ? { ...prev, status: newStatus } : prev
    );
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || order.status === statusFilter;

      let matchesPrice = true;
      if (priceRange === "under500") {
        matchesPrice = order.totalAmount < 500;
      } else if (priceRange === "500to750") {
        matchesPrice = order.totalAmount >= 500 && order.totalAmount <= 750;
      } else if (priceRange === "above750") {
        matchesPrice = order.totalAmount > 750;
      }

      let matchesPayment = true;
      if (paymentFilter === "cod") {
        matchesPayment = order.paymentMethod.toLowerCase().includes("cash");
      } else if (paymentFilter === "upi") {
        matchesPayment =
          order.paymentMethod.toLowerCase().includes("upi") ||
          order.paymentMethod.toLowerCase().includes("net");
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

  const tableHeaders = [
    { label: "Order", className: "rounded-l-xl" },
    { label: "Customer" },
    { label: "Date" },
    { label: "Payment" },
    { label: "Status" },
    { label: "Amount" },
    { label: "Actions", className: "text-center rounded-r-xl" },
  ];

  return (
    <div className="space-y-8 text-left font-poppins">
      <AdminPageHeader
        title="All Orders"
        subtitle="Manage and track all customer orders"
        actions={
          <Button variant="dark" size="sm" className="gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <AdminListStatCard
          title="Total Orders"
          value={ordersKpis.totalOrders}
          subtext={ordersKpis.totalOrdersTrend}
          icon={getKpiIcon("orders")}
          subtextClassName="text-brand-primary font-bold"
        />

        <AdminListStatCard
          title="Pending"
          value={ordersKpis.pendingCount}
          subtext={
            ordersKpis.revenueTrend.includes("Awaiting")
              ? ordersKpis.revenueTrend
              : "Awaiting processing"
          }
          icon={getKpiIcon("pending")}
          subtextClassName="text-[#8D7F75] font-semibold"
        />

        <AdminListStatCard
          title="Completed"
          value={ordersKpis.completedCount}
          subtext={ordersKpis.completedTrend}
          icon={getKpiIcon("completed")}
          subtextClassName="text-brand-primary font-bold"
        />

        <AdminListStatCard
          title="Revenue"
          value={ordersKpis.revenueText}
          subtext={ordersKpis.revenueTrend}
          icon={getKpiIcon("revenue")}
          subtextClassName="text-brand-primary font-bold"
        />
      </div>

      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search orders by customer name or order ID..."
          className="md:max-w-md"
        />

        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl px-2 py-0.5 w-44">
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={[
                "All",
                "Pending",
                "Processing",
                "In Transit",
                "Shipped",
                "Completed",
                "Cancelled",
              ]}
              placeholder="All Statuses"
              variant="borderless"
              className="w-full"
            />
          </div>

          <button
            ref={filterButtonRef}
            onClick={() => setIsFilterPopoverOpen(true)}
            className="flex items-center justify-center border border-[#C4A482]/20 bg-[#FDFAF3] hover:bg-[#F2EADA]/30 w-11 h-11 rounded-xl text-brand-brown cursor-pointer transition-all active:scale-95"
            title="Filters"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <AdminTableShell headers={tableHeaders} tableClassName="min-w-[900px]">
        {filteredOrders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50/40 transition-colors">
            <td className="py-4 px-6 font-bold text-[#3A2418]">{order.id}</td>

            <td className="py-4 px-6">
              <div className="flex flex-col">
                <span className="font-bold text-[#3A2418] leading-tight">{order.customerName}</span>
                <span className="text-[10px] text-[#8D7F75] font-semibold mt-1">
                  {order.customerEmail}
                </span>
              </div>
            </td>

            <td className="py-4 px-6 font-semibold text-[#8D7F75]">{order.date}</td>

            <td className="py-4 px-6">
              <div className="flex flex-col">
                <span className="font-semibold text-[#3A2418]">{order.paymentMethod}</span>
                <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider mt-0.5">
                  Paid
                </span>
              </div>
            </td>

            <td className="py-4 px-6">
              <AdminStatusBadge status={order.status} />
            </td>

            <td className="py-4 px-6 font-bold font-poppins text-[#3A2418]">
              ₹{formatIndianCurrency(order.totalAmount)}
            </td>

            <td className="py-4 px-6">
              <div className="flex items-center justify-center">
                <button
                  ref={activeActionMenuOrderId === order.id ? activeActionTriggerRef : null}
                  onClick={(e) => {
                    activeActionTriggerRef.current = e.currentTarget;
                    setActiveActionMenuOrderId(
                      activeActionMenuOrderId === order.id ? null : order.id
                    );
                  }}
                  className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  aria-label="Actions Menu"
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>

      <AdminPagination currentPage={1} totalPages={1} />

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

      {isFilterPopoverOpen && (
        <PortalDropdown
          isOpen={isFilterPopoverOpen}
          onClose={() => setIsFilterPopoverOpen(false)}
          triggerRef={filterButtonRef}
          width={280}
          align="right"
        >
          <div className="p-4 space-y-4 font-poppins text-xs text-left bg-[#FDFAF3] border border-[#C4A482]/20 rounded-2xl shadow-premium">
            <div className="flex items-center justify-between border-b border-[#C4A482]/10 pb-2 mb-1">
              <span className="font-bold text-brand-brown text-sm">Filters</span>
              <button
                onClick={() => {
                  setPriceRange("all");
                  setPaymentFilter("all");
                  setSortOrder("newest");
                }}
                className="text-brand-green hover:underline cursor-pointer font-bold text-[10px] uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-1.5 mt-3">
              <label className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                Sort by Date
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder("newest")}
                  className={cn(
                    "flex-1 py-1.5 px-3 rounded-lg border font-semibold text-center transition-all cursor-pointer",
                    sortOrder === "newest"
                      ? "bg-[#F8E8C9] text-brand-brown border-[#C4A482]/40"
                      : "bg-white text-brand-brown/70 border-gray-150 hover:bg-[#F2EADA]/10"
                  )}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortOrder("oldest")}
                  className={cn(
                    "flex-1 py-1.5 px-3 rounded-lg border font-semibold text-center transition-all cursor-pointer",
                    sortOrder === "oldest"
                      ? "bg-[#F8E8C9] text-brand-brown border-[#C4A482]/40"
                      : "bg-white text-brand-brown/70 border-gray-150 hover:bg-[#F2EADA]/10"
                  )}
                >
                  Oldest
                </button>
              </div>
            </div>

            <div className="space-y-1.5 mt-3">
              <label className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                Order Total
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-white border border-[#C4A482]/20 rounded-lg py-2 px-3 text-brand-brown font-medium outline-none focus:border-brand-primary"
              >
                <option value="all">All Amounts</option>
                <option value="under500">Under ₹500</option>
                <option value="500to750">₹500 - ₹750</option>
                <option value="above750">Above ₹750</option>
              </select>
            </div>

            <div className="space-y-1.5 mt-3">
              <label className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                Payment Method
              </label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full bg-white border border-[#C4A482]/20 rounded-lg py-2 px-3 text-brand-brown font-medium outline-none focus:border-brand-primary"
              >
                <option value="all">All Methods</option>
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI / Net Banking</option>
                <option value="card">Card Payment</option>
              </select>
            </div>
          </div>
        </PortalDropdown>
      )}

      {activeActionMenuOrderId && (
        <PortalDropdown
          isOpen={activeActionMenuOrderId !== null}
          onClose={() => setActiveActionMenuOrderId(null)}
          triggerRef={activeActionTriggerRef}
          width={150}
          align="right"
        >
          <div className="py-1 bg-white border border-[#C4A482]/10 rounded-xl shadow-lg font-poppins text-xs font-semibold text-[#5A3E2B]">
            <button
              onClick={() => {
                const order = orders.find((o) => o.id === activeActionMenuOrderId);
                if (order) {
                  setSelectedOrder(order);
                  setIsModalOpen(true);
                }
                setActiveActionMenuOrderId(null);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              <Eye size={14} className="text-[#8D7F75]" />
              <span>View Details</span>
            </button>
            <button
              onClick={() => {
                window.print();
                setActiveActionMenuOrderId(null);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 cursor-pointer border-t border-gray-50"
            >
              <Printer size={14} className="text-[#8D7F75]" />
              <span>Print Invoice</span>
            </button>
          </div>
        </PortalDropdown>
      )}
    </div>
  );
};

export default OrdersList;
