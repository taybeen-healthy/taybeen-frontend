"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, XCircle, Eye, Trash2, HelpCircle } from "lucide-react";
import { reviewsKpis, adminReviewsList } from "@/data/admin/reviewsData";
import { Button } from "@/components/ui/Button";
import { ReviewDetailsModal } from "./ReviewDetailsModal";
import { AdminReview } from "@/types/admin/reviews";
import {
  AdminPageHeader,
  AdminListStatCard,
  AdminTableShell,
  AdminPagination,
  AdminStatusBadge,
} from "../shared";

export const ReviewsList: React.FC = () => {
  const [reviews, setReviews] = useState<AdminReview[]>(adminReviewsList);
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateStatus = (reviewId: string, newStatus: AdminReview["status"]) => {
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, status: newStatus } : r)));
  };

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

  const tableHeaders = [
    { label: "Customer" },
    { label: "Contact" },
    { label: "Product Name" },
    { label: "Date" },
    { label: "Status" },
    { label: "Actions", className: "text-center" },
  ];

  return (
    <div className="space-y-8 text-left font-poppins">
      <AdminPageHeader
        title="Customer Reviews"
        subtitle="Manage and view all customer review information"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <AdminListStatCard
          title="Total Reviews"
          value={reviewsKpis.totalReviews}
          icon={getKpiIcon("total")}
        />

        <AdminListStatCard
          title="Pending"
          value={reviewsKpis.pendingCount}
          icon={getKpiIcon("pending")}
        />

        <AdminListStatCard
          title="Approved"
          value={reviewsKpis.approvedCount}
          icon={getKpiIcon("approved")}
        />

        <AdminListStatCard
          title="Rejected"
          value={reviewsKpis.rejectedCount}
          icon={getKpiIcon("rejected")}
        />
      </div>

      <AdminTableShell headers={tableHeaders} tableClassName="min-w-[768px]">
        {reviews.map((review) => (
          <tr key={review.id} className="hover:bg-gray-50/40 transition-colors">
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none shrink-0">
                  {review.customerInitial}
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] leading-tight">{review.customerName}</h4>
                  <span className="text-[10px] text-[#8D7F75] font-semibold">
                    {review.customerEmail}
                  </span>
                </div>
              </div>
            </td>

            <td className="py-4 px-6">
              <div className="flex flex-col">
                <span className="font-semibold text-[#3A2418] leading-tight">
                  {review.customerEmail}
                </span>
                <span className="text-xs text-[#8D7F75] mt-0.5">{review.customerPhone}</span>
              </div>
            </td>

            <td className="py-4 px-6 font-medium text-[#3A2418]">{review.productName}</td>

            <td className="py-4 px-6 font-semibold text-[#8D7F75]">{review.date}</td>

            <td className="py-4 px-6">
              <AdminStatusBadge status={review.status} />
            </td>

            <td className="py-4 px-6">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSelectedReview(review);
                    setIsModalOpen(true);
                  }}
                  className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  aria-label="Moderate Review"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => {
                    setReviews((prev) => prev.filter((r) => r.id !== review.id));
                  }}
                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  aria-label="Delete Review"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>

      <AdminPagination currentPage={1} totalPages={1} />

      {isModalOpen && selectedReview && (
        <ReviewDetailsModal
          review={selectedReview}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReview(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default ReviewsList;
