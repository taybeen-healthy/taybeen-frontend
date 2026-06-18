"use client";

import React from "react";
import { X } from "lucide-react";
import { AdminCustomer } from "@/types/admin/customers";
import { Modal } from "@/components/ui/Modal";
import { formatIndianCurrency } from "@/lib/utils";

interface CustomerDetailsModalProps {
  customer: AdminCustomer;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isSplit={false}
      className="max-w-2xl w-full bg-[#FDFAF3] p-0 overflow-hidden max-h-[90vh] md:max-h-[92vh] flex flex-col relative"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-9 h-9 bg-white hover:bg-[#F2EADA]/40 text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
        aria-label="Close details modal"
      >
        <X size={18} />
      </button>

      <div className="p-6 md:p-8 pb-3 shrink-0 select-text text-left font-poppins pr-16 md:pr-20">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown">
          Customer Details
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 space-y-6 select-text text-left font-poppins pr-4 sm:pr-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-primary/15 text-brand-primary font-bold text-2xl flex items-center justify-center select-none shrink-0 border border-[#F7A503]/20">
            {customer.initial}
          </div>
          <div>
            <h3 className="font-bold text-brand-brown text-xl leading-tight">
              {customer.name}
            </h3>
            <p className="text-sm text-[#8D7F75] font-medium mt-1">
              {customer.email}
            </p>
          </div>
        </div>

        <div className="border-t border-[#C4A482]/10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase block">
              Phone
            </span>
            <p className="font-semibold text-brand-brown mt-1.5 text-sm sm:text-base">
              {customer.phone}
            </p>
          </div>
          <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase block">
              Joined Date
            </span>
            <p className="font-semibold text-brand-brown mt-1.5 text-sm sm:text-base">
              {customer.joinedDate}
            </p>
          </div>
          <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase block">
              Total Orders
            </span>
            <p className="font-semibold text-brand-brown mt-1.5 text-sm sm:text-base">
              {customer.ordersCount}
            </p>
          </div>
          <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase block">
              Total Spent
            </span>
            <p className="font-semibold text-brand-brown mt-1.5 text-sm sm:text-base">
              ₹{formatIndianCurrency(customer.totalSpent)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-brand-brown">
            Recent Orders
          </h4>
          {customer.recentOrders && customer.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {customer.recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-brand-brown">
                      Order ID: {ord.id}
                    </span>
                    <span className="text-[10px] text-[#8D7F75] font-semibold mt-1">
                      {ord.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-right font-poppins">
                    <span className="text-sm sm:text-base font-bold text-[#3A2418]">
                      ₹{formatIndianCurrency(ord.amount)}
                    </span>
                    <span
                      className={`text-[9px] font-bold mt-1 uppercase tracking-wider ${
                        ord.status === "Completed"
                          ? "text-[#768C3A]"
                          : ord.status === "Pending"
                          ? "text-amber-500"
                          : "text-blue-500"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8D7F75] font-semibold italic">
              No recent orders recorded.
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="bg-[#5A3E2B] hover:bg-[#422e20] transition-colors text-white font-bold py-3 px-8 rounded-lg text-xs font-poppins uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailsModal;
