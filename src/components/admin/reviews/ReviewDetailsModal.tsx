"use client";

import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { AdminReview } from "@/types/admin/reviews";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

interface ReviewDetailsModalProps {
  review: AdminReview;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (reviewId: string, status: AdminReview["status"]) => void;
}

export const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({
  review,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState<AdminReview["status"]>(review.status);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleSave = () => {
    onUpdateStatus(review.id, currentStatus);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isSplit={false}
      className="max-w-3xl w-full bg-[#FDFAF3] p-0 overflow-hidden max-h-[90vh] md:max-h-[92vh] flex flex-col relative font-poppins"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-9 h-9 bg-white hover:bg-[#F2EADA]/40 text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
        aria-label="Close details modal"
      >
        <X size={18} />
      </button>

      <div className="p-6 md:p-8 pb-3 shrink-0 select-text text-left pr-16 md:pr-20">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown">
          Customer Review Details
        </h2>
      </div>

      <div className="border-b border-[#C4A482]/10 mx-6 md:mx-8" />

      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-6 select-text text-left pr-4 sm:pr-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 border border-[#C4A482]/15 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-primary/15 text-brand-primary font-bold text-lg flex items-center justify-center select-none shrink-0 border border-[#F7A503]/20">
              {review.customerInitial}
            </div>
            <div>
              <h4 className="font-bold text-brand-brown leading-tight">{review.customerName}</h4>
              <span className="text-xs text-[#8D7F75] font-semibold">{review.customerEmail}</span>
            </div>
          </div>

          <div className="flex gap-6 text-xs text-brand-brown">
            <div>
              <span className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                Order ID
              </span>
              <span className="font-bold mt-1 block font-poppins">{review.orderId}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8D7F75] uppercase tracking-wider block">
                Date
              </span>
              <span className="font-semibold mt-1 block">{review.date}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-2 space-y-3">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#C4A482]/20 shadow-sm flex items-center justify-center">
              <img
                src={review.images[activeImageIndex] || review.images[0]}
                alt={review.productName}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {review.images.length > 1 && (
              <div className="flex gap-2">
                {review.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white shrink-0 ${
                      activeImageIndex === i
                        ? "border-[#C4A482] shadow-sm"
                        : "border-transparent hover:border-[#C4A482]/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${review.productName} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-3 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold uppercase tracking-wide text-brand-brown">
                {review.productName}
              </h3>
              <Badge
                text={currentStatus}
                variant={
                  currentStatus === "Approved"
                    ? "success"
                    : currentStatus === "Pending"
                      ? "pending"
                      : "error"
                }
                className="inline-block"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#768C3A] tracking-wider uppercase block">
                Rating
              </span>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s <= review.rating ? "#F7A503" : "none"}
                    className={s <= review.rating ? "text-[#F7A503]" : "text-[#C4A482]/40"}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1 bg-white border border-[#C4A482]/15 rounded-2xl p-4 shadow-sm">
              <p className="text-xs sm:text-sm text-brand-brown/90 leading-relaxed font-medium">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-brand-brown/70 tracking-widest uppercase block">
                Review Status Moderation
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStatus("Approved")}
                  className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none text-center ${
                    currentStatus === "Approved"
                      ? "bg-brand-green text-white border-brand-green shadow-sm"
                      : "bg-white text-[#768C3A] border-[#768C3A]/30 hover:bg-[#768C3A]/5"
                  }`}
                >
                  Approve
                </button>
                <button
                  onClick={() => setCurrentStatus("Rejected")}
                  className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none text-center ${
                    currentStatus === "Rejected"
                      ? "bg-red-500 text-white border-red-500 shadow-sm"
                      : "bg-white text-red-500 border-red-500/30 hover:bg-red-50/50"
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            className="bg-[#5A3E2B] hover:bg-[#473021] transition-colors text-white font-bold py-3 px-10 rounded-lg text-xs font-poppins uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDetailsModal;
