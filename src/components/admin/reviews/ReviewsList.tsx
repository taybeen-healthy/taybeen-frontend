"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, XCircle, Eye, Trash2, HelpCircle } from "lucide-react";
import { reviewsKpis, adminReviewsList } from "@/data/admin/reviewsData";
import { cn } from "@/lib/utils";

export const ReviewsList: React.FC = () => {
  const getKpiIcon = (iconName: string) => {
    switch (iconName) {
      case "total":
        return <HelpCircle className="w-5 h-5 text-[#8D7F75]" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-brand-green" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-brand-green text-white";
      case "Pending":
        return "bg-amber-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-8 text-left font-poppins">
      {/* Header Row */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-brand-brown">
          Customer Reviews
        </h1>
        <p className="text-xs text-[#8D7F75] mt-1">
          Manage and view all customer review information
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Total Reviews */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Total Reviews</h4>
            {getKpiIcon("total")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {reviewsKpis.totalReviews}
          </span>
        </div>

        {/* Card 2: Pending */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Pending</h4>
            {getKpiIcon("pending")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {reviewsKpis.pendingCount}
          </span>
        </div>

        {/* Card 3: Approved */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Approved</h4>
            {getKpiIcon("approved")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {reviewsKpis.approvedCount}
          </span>
        </div>

        {/* Card 4: Rejected */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Rejected</h4>
            {getKpiIcon("rejected")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {reviewsKpis.rejectedCount}
          </span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white border border-[#C4A482]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[768px] border-collapse">
            <thead>
              <tr className="bg-[#F8E8C9]/35 text-[#5A3E2B] font-bold text-xs uppercase tracking-wider text-left border-b border-[#C4A482]/10">
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Product Name</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-[#3A2418]">
              {adminReviewsList.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50/40 transition-colors">
                  {/* Customer */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none shrink-0">
                        {review.customerInitial}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#3A2418] leading-tight">
                          {review.customerName}
                        </h4>
                        <span className="text-[10px] text-[#8D7F75] font-semibold">
                          {review.customerEmail}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#3A2418] leading-tight">
                        {review.customerEmail}
                      </span>
                      <span className="text-xs text-[#8D7F75] mt-0.5">
                        {review.customerPhone}
                      </span>
                    </div>
                  </td>

                  {/* Product Reviewed */}
                  <td className="py-4 px-6 font-medium text-[#3A2418]">
                    {review.productName}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 font-semibold text-[#8D7F75]">
                    {review.date}
                  </td>

                  {/* Status badge */}
                  <td className="py-4 px-6">
                    <span className={cn(
                      "inline-block px-4 py-1.5 rounded-full text-xs font-bold shadow-sm",
                      getStatusBadgeClass(review.status)
                    )}>
                      {review.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-4">
                      <button className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer" aria-label="Moderate Review">
                        <Eye size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer" aria-label="Delete Review">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

export default ReviewsList;
