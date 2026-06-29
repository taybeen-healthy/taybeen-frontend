import React, { useState } from "react";
import { Package, Truck, Mail, Download, Loader2 } from "lucide-react";
import { orderConfirmedData } from "@/data/user/orderConfirmedData";
import { apiClient } from "@/lib/apiClient";

interface OrderSummaryCardProps {
  orderId: string;
  placedOn: string;
  itemsCount: number;
  paymentStatus?: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  orderId,
  placedOn,
  itemsCount,
  paymentStatus = "Captured",
}) => {
  const { labels } = orderConfirmedData;
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadInvoice = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const response = await apiClient.get(`/invoices/download/${orderId}`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Failed to download invoice PDF:", err);
      setDownloadError("Failed to download invoice. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const itemsText = itemsCount === 1 ? "1 item" : `${itemsCount} items`;

  return (
    <div className="max-w-[800px] w-full mx-auto bg-white rounded-2xl border border-[#C4A482]/35 shadow-premium overflow-hidden text-left">
      <div className="bg-gradient-to-r from-[#5A4200] to-[#2C3A1A] px-6 sm:px-8 py-5 flex justify-between items-center select-none gap-4">
        <div>
          <span className="text-[9px] sm:text-xs font-poppins font-medium text-white/60 tracking-wider uppercase">
            {labels.orderIdLabel}
          </span>
          <p className="text-xs sm:text-base font-poppins font-bold text-[#FFDA8C] mt-1">
            {orderId}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[9px] sm:text-xs font-poppins font-medium text-white/60 tracking-wider uppercase">
            {labels.placedOnLabel}
          </span>
          <p className="text-xs sm:text-base font-poppins font-bold text-[#FFDA8C] mt-1">
            {placedOn}
          </p>
        </div>
      </div>

      <div className="lg:hidden divide-y divide-[#5A3E2B]/10">
        <div className="py-5 px-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FFDA8C]/15 border border-[#FFDA8C]/40 flex items-center justify-center text-[#F7A503] shrink-0">
            <Package size={18} strokeWidth={2} />
          </div>
          <div>
            <span className="text-[10px] font-poppins text-typo2 tracking-wider uppercase font-semibold">
              {labels.itemsLabel}
            </span>
            <p className="text-sm font-poppins font-semibold text-typo1 mt-0.5">{itemsText}</p>
          </div>
        </div>

        <div className="py-5 px-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FFDA8C]/15 border border-[#FFDA8C]/40 flex items-center justify-center text-[#F7A503] shrink-0">
            <Mail size={18} strokeWidth={2} />
          </div>
          <div>
            <span className="text-[10px] font-poppins text-typo2 tracking-wider uppercase font-semibold">
              {labels.confirmationSentLabel}
            </span>
            <p className="text-sm font-poppins font-semibold text-typo1 mt-0.5">
              {labels.confirmationSentValue}
            </p>
          </div>
        </div>

        <div className="py-5 px-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FFDA8C]/15 border border-[#FFDA8C]/40 flex items-center justify-center text-[#F7A503] shrink-0">
            <Truck size={18} strokeWidth={2} />
          </div>
          <div>
            <span className="text-[10px] font-poppins text-typo2 tracking-wider uppercase font-semibold">
              {labels.deliveryLabel}
            </span>
            <p className="text-sm font-poppins font-semibold text-typo1 mt-0.5">
              {labels.deliveryValue}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-6 px-8 py-7 bg-white divide-x divide-[#5A3E2B]/10">
        <div className="flex items-center gap-4.5">
          <div className="w-11 h-11 rounded-full bg-[#FFDA8C]/15 border border-[#FFDA8C]/40 flex items-center justify-center text-[#F7A503] shrink-0">
            <Package size={20} strokeWidth={2} />
          </div>
          <div className="ml-1">
            <span className="text-[10px] font-poppins text-typo2 tracking-wider uppercase font-semibold">
              {labels.itemsLabel}
            </span>
            <p className="text-base font-poppins font-semibold text-typo1 mt-0.5">
              {itemsText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4.5 pl-6">
          <div className="w-11 h-11 rounded-full bg-[#FFDA8C]/15 border border-[#FFDA8C]/40 flex items-center justify-center text-[#F7A503] shrink-0">
            <Truck size={20} strokeWidth={2} />
          </div>
          <div className="ml-1">
            <span className="text-[10px] font-poppins text-typo2 tracking-wider uppercase font-semibold">
              {labels.deliveryLabel}
            </span>
            <p className="text-base font-poppins font-semibold text-typo1 mt-0.5">
              {labels.deliveryValue}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4.5 pl-6">
          <div className="w-11 h-11 rounded-full bg-[#FFDA8C]/15 border border-[#FFDA8C]/40 flex items-center justify-center text-[#F7A503] shrink-0">
            <Mail size={20} strokeWidth={2} />
          </div>
          <div className="ml-1">
            <span className="text-[10px] font-poppins text-typo2 tracking-wider uppercase font-semibold">
              {labels.confirmationSentLabel}
            </span>
            <p className="text-base font-poppins font-semibold text-typo1 mt-0.5">
              {labels.confirmationSentValue}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Status Row */}
      <div className="bg-[#FDFAF3] border-t border-[#C4A482]/20 px-6 sm:px-8 py-3.5 flex justify-between items-center select-none">
        <span className="text-xs font-poppins font-medium text-typo2">Payment Status</span>
        <span
          className={`text-[10px] sm:text-xs font-poppins font-bold px-2.5 py-0.5 rounded-full inline-block ${
            paymentStatus === "Captured" || paymentStatus === "Paid"
              ? "text-brand-green bg-brand-green-pale/40 border border-brand-green/20"
              : paymentStatus === "Failed"
                ? "text-red-600 bg-red-100 border border-red-200"
                : "text-yellow-600 bg-yellow-100 border border-yellow-200"
          }`}
        >
          {paymentStatus}
        </span>
      </div>

      {/* Invoice Row */}
      <div className="bg-[#FDFAF3] border-t border-[#C4A482]/20 px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <div className="flex flex-col">
          <span className="text-sm font-poppins font-medium text-brand-brown">
            Need a copy of your invoice?
          </span>
          {downloadError && (
            <span className="text-xs text-red-500 font-poppins mt-0.5">{downloadError}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleDownloadInvoice}
          disabled={isDownloading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all text-xs font-bold font-poppins cursor-pointer select-none shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download size={14} />
              Download Invoice
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
