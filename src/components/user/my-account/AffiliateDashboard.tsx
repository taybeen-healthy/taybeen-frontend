"use client";

import React, { useState } from "react";
import { Package, CheckCircle, Clock, Copy, Share2 } from "lucide-react";
import { AffiliateDashboardInfo } from "@/types/myAccount";
import { formatIndianCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface AffiliateDashboardProps {
  data: AffiliateDashboardInfo;
}

export const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Become a Taybeen Affiliate",
          text: `Check out Taybeen Premium Dates and use my coupon code ${data.couponCode} for 10% off!`,
          url: `https://${data.referralLink}`,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const detailRows = [
    { label: "Full name", value: data.details.fullName },
    { label: "Email", value: data.details.email },
    { label: "Phone", value: data.details.phone },
    { label: "City", value: data.details.city },
    { label: "Occupation", value: data.details.occupation },
    { label: "Approved on", value: data.details.approvedOn },
  ];

  return (
    <div className="flex flex-col gap-6 lg:gap-8 w-full text-left font-poppins">
      <div className="space-y-1.5">
        <h1 className="font-serif font-bold text-[#5A3E2B] text-2xl sm:text-3xl md:text-4xl leading-tight">
          Your affiliate dashboard
        </h1>
        <p className="text-brand-green/80 text-xs sm:text-sm md:text-base leading-relaxed">
          Track your coupon performance and share your unique link with your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-[#7D6B5E]">
              Total sales via your code
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#3A2418] font-poppins">
              ₹{formatIndianCurrency(data.totalSales)}
            </p>
            <p className="text-[10px] sm:text-xs text-[#7D6B5E]/70 font-medium">
              Since {data.salesSince}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50/50 flex items-center justify-center text-[#C4A482] flex-shrink-0">
            <Package size={22} className="stroke-[1.75]" />
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-[#7D6B5E]">Orders placed</p>
            <p className="text-xl sm:text-2xl font-bold text-[#3A2418] font-poppins">
              {data.ordersPlaced}
            </p>
            <p className="text-[10px] sm:text-xs text-[#7D6B5E]/70 font-medium">
              Using {data.couponCode}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-50/50 flex items-center justify-center text-brand-green flex-shrink-0">
            <CheckCircle size={22} className="stroke-[1.75]" />
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-[#7D6B5E]">Coupon status</p>
            <div className="pt-1">
              <span className="px-3.5 py-1 text-xs font-bold text-green-700 bg-green-50/90 rounded-full border border-green-200">
                {data.couponStatus}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50/50 flex items-center justify-center text-[#F7A503] flex-shrink-0">
            <Clock size={22} className="stroke-[1.75]" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm">
        <h2 className="font-serif font-bold text-[#5A3E2B] text-lg sm:text-xl mb-4 pb-2 border-b border-[#C4A482]/15">
          Your details
        </h2>
        <div className="space-y-1">
          {detailRows.map((row, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 sm:py-3.5 border-b border-[#C4A482]/10 last:border-b-0 last:pb-0"
            >
              <span className="text-[#7D6B5E] text-xs sm:text-sm font-medium">{row.label}</span>
              <span className="text-[#3A2418] text-xs sm:text-sm font-semibold text-right">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif font-bold text-[#5A3E2B] text-lg sm:text-xl">Your coupon</h2>
        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-lg sm:text-xl font-bold text-[#3A2418] tracking-wide uppercase">
                {data.couponCode}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold text-green-700 bg-green-50 rounded-full border border-green-200">
                {data.couponStatus}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#7D6B5E]/85">{data.couponDescription}</p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
              <input
                type="text"
                readOnly
                value={data.referralLink}
                className="bg-[#FDFAF3] border border-[#C4A482]/35 rounded-xl px-4 py-2.5 text-xs text-[#3A2418] font-poppins focus:outline-none flex-1 truncate select-all"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#5A3E2B] border-[#C4A482]/40 bg-white hover:!bg-[#F6F1E9] hover:!text-[#5A3E2B] rounded-xl"
                >
                  <Copy size={14} />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </Button>
                <Button
                  onClick={handleShareLink}
                  variant="outline"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#5A3E2B] border-[#C4A482]/40 bg-white hover:!bg-[#F6F1E9] hover:!text-[#5A3E2B] rounded-xl"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-center flex-shrink-0 mr-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3A2418] to-[#1E110A] border-2 border-[#F7A503]/50 flex items-center justify-center shadow-lg relative overflow-hidden group select-none">
              <span className="font-serif font-bold text-4xl text-[#F7A503] drop-shadow-md">T</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(247,165,3,0.2)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[#C4A482]/15">
          <h2 className="font-serif font-bold text-[#5A3E2B] text-lg sm:text-xl">
            Orders placed using your code
          </h2>
          <span className="text-xs sm:text-sm text-brand-green font-medium font-poppins">
            47 total orders
          </span>
        </div>

        <div className="overflow-x-auto w-full border border-[#C4A482]/15 rounded-xl bg-white shadow-sm overflow-hidden">
          <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F6F1E9] text-brand-brown font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                <th className="py-3 px-4 rounded-l-lg border-b border-[#C4A482]/20">ORDER ID</th>
                <th className="py-3 px-4 border-b border-[#C4A482]/20">DATE</th>
                <th className="py-3 px-4 border-b border-[#C4A482]/20">ITEM</th>
                <th className="py-3 px-4 border-b border-[#C4A482]/20">AMOUNT</th>
                <th className="py-3 px-4 rounded-r-lg border-b border-[#C4A482]/20">
                  PAYMENT STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C4A482]/15 text-[#3A2418]">
              {data.orders.map((order, index) => (
                <tr key={index} className="hover:bg-black/[0.01] transition-colors">
                  <td className="py-4 px-4 font-semibold text-brand-brown align-middle">
                    {order.orderId}
                  </td>
                  <td className="py-4 px-4 font-medium text-[#7D6B5E] align-middle">
                    {order.date}
                  </td>
                  <td className="py-4 px-4 font-medium text-[#3A2418] align-middle">
                    {order.item}
                  </td>
                  <td className="py-4 px-4 font-semibold text-brand-brown align-middle">
                    ₹{formatIndianCurrency(order.amount)}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <span className="px-4 py-1 text-xs font-bold text-[#0066CC] bg-[#7FBFFC]/25 rounded-full inline-block">
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
