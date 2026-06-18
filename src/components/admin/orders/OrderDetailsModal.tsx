"use client";

import React from "react";
import { X, Calendar, Mail, Phone } from "lucide-react";
import { AdminOrder } from "@/types/admin/orders";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { formatIndianCurrency } from "@/lib/utils";

interface OrderDetailsModalProps {
  order: AdminOrder;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: AdminOrder["status"]) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const getStatusBadgeVariant = (status: AdminOrder["status"]) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "pending";
      case "In Transit":
      case "Shipped":
      case "Processing":
        return "info";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusButtonStyle = (buttonStatus: AdminOrder["status"]) => {
    const isCurrent = order.status === buttonStatus ||
      (buttonStatus === "Shipped" && order.status === "In Transit");

    switch (buttonStatus) {
      case "Pending":
        return isCurrent
          ? "bg-amber-500 text-white border-amber-500"
          : "bg-amber-50/50 hover:bg-amber-50 text-amber-600 border-amber-500/30";
      case "Processing":
        return isCurrent
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-blue-50/50 hover:bg-blue-50 text-blue-600 border-blue-500/30";
      case "Shipped":
        return isCurrent
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-orange-50/50 hover:bg-orange-50 text-orange-500 border-orange-500/30";
      case "Completed":
        return isCurrent
          ? "bg-brand-green text-white border-brand-green"
          : "bg-brand-green/5 hover:bg-brand-green/10 text-brand-green border-brand-green/30";
      case "Cancelled":
        return isCurrent
          ? "bg-red-500 text-white border-red-500"
          : "bg-red-50/50 hover:bg-red-50 text-red-600 border-red-500/30";
      default:
        return "";
    }
  };

  const formatPriceValue = (val: number | "Free") => {
    if (val === "Free") {
      return <span className="text-[#768C3A] font-bold">Free</span>;
    }
    return <span className="text-[#3A2418]">₹{formatIndianCurrency(val)}</span>;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isSplit={false}
      className="max-w-3xl w-full bg-[#FDFAF3] p-0 overflow-hidden max-h-[90vh] md:max-h-[92vh] flex flex-col relative"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-9 h-9 bg-white hover:bg-[#F2EADA]/40 text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
        aria-label="Close details modal"
      >
        <X size={18} />
      </button>

      <div className="p-6 shrink-0 select-text text-left font-poppins pr-16 md:pr-20">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown">
          Order Details
        </h2>
        <p className="text-xs text-[#8D7F75] mt-1 font-semibold tracking-wide">
          {order.hexId}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 space-y-6 select-text text-left font-poppins pr-4 sm:pr-6">
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-brand-brown/70 tracking-widest uppercase">
              Order Status
            </span>
            <Badge
              text={order.status}
              variant={getStatusBadgeVariant(order.status)}
              className="inline-block mt-0.5"
            />
          </div>
          <div className="flex flex-col gap-1.5 items-end text-right">
            <span className="text-[10px] font-bold text-brand-brown/70 tracking-widest uppercase">
              Order Date
            </span>
            <div className="flex items-center gap-2 mt-0.5 text-sm font-semibold text-brand-brown">
              <Calendar size={16} className="text-[#8D7F75]" />
              <span>{order.date}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
          <h3 className="font-serif text-base font-bold text-brand-brown mb-4">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase">
                Name
              </span>
              <p className="font-semibold text-brand-brown mt-1">
                {order.customerName}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase">
                Email
              </span>
              <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-brand-brown min-w-0">
                <Mail size={16} className="text-[#8D7F75] shrink-0" />
                <span className="truncate">{order.customerEmail}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase">
                Phone
              </span>
              <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-brand-brown">
                <Phone size={16} className="text-[#8D7F75] shrink-0" />
                <span>{order.customerPhone}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase">
                Payment Method
              </span>
              <p className="font-semibold text-brand-brown mt-1">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
          <h3 className="font-serif text-base font-bold text-brand-brown mb-2.5">
            Shipping Address
          </h3>
          <p className="text-xs sm:text-sm text-brand-brown/95 font-medium leading-relaxed">
            {order.shippingAddress}
          </p>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
          <h3 className="font-serif text-base font-bold text-brand-brown mb-4">
            Order Items ({order.itemsCount})
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FDFAF3] border border-[#C4A482]/10 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 relative bg-white border border-[#C4A482]/20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-brand-brown">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#8D7F75] font-semibold mt-1">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="text-base font-bold text-[#3A2418] font-poppins">
                  ₹{formatIndianCurrency(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
          <div className="space-y-3 text-xs sm:text-sm text-brand-brown font-medium">
            <div className="flex justify-between items-center">
              <span className="text-[#8D7F75] font-semibold">Shipping</span>
              <span className="font-bold">
                {formatPriceValue(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8D7F75] font-semibold">Subtotal</span>
              <span className="font-bold">
                {formatPriceValue(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8D7F75] font-semibold">Tax</span>
              <span className="font-bold">
                ₹{formatIndianCurrency(order.tax)}
              </span>
            </div>
            <div className="border-t border-[#C4A482]/10 pt-3 mt-3 flex justify-between items-center">
              <span className="font-serif text-base font-bold text-brand-brown">
                Total
              </span>
              <span className="font-poppins text-lg font-bold text-brand-brown">
                ₹{formatIndianCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
          <h3 className="font-serif text-base font-bold text-brand-brown mb-4">
            Update Order Status
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {(["Pending", "Processing", "Shipped", "Completed", "Cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => onUpdateStatus(order.id, status)}
                className={`py-2 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none select-none active:scale-95 ${getStatusButtonStyle(
                  status
                )}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => window.print()}
            className="bg-[#768C3A] hover:bg-[#5E702E] transition-all text-white font-bold py-3 px-6 rounded-lg text-xs font-poppins uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
