"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Copy,
  Check,
  Share2,
  Zap,
  Ticket,
  Trash2,
} from "lucide-react";
import { AdminPartner } from "@/types/admin/partners";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { formatIndianCurrency } from "@/lib/utils";

interface AffiliateDetailsModalProps {
  partner: AdminPartner;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePartner: (updatedPartner: AdminPartner) => void;
}

export const AffiliateDetailsModal: React.FC<AffiliateDetailsModalProps> = ({
  partner,
  isOpen,
  onClose,
  onUpdatePartner,
}) => {
  const [currentStatus, setCurrentStatus] = useState<AdminPartner["status"]>(partner.status);
  const [couponStatus, setCouponStatus] = useState<AdminPartner["couponStatus"]>(
    partner.couponStatus || "None"
  );
  const [isGeneratingCoupon, setIsGeneratingCoupon] = useState(false);

  const [couponCodeInput, setCouponCodeInput] = useState(
    partner.couponCode && partner.couponCode !== "Not generated" && partner.couponCode !== "-"
      ? partner.couponCode
      : ""
  );
  const [discountType, setDiscountType] = useState<"Rupees" | "Percentage">("Percentage");
  const [discountValueInput, setDiscountValueInput] = useState(
    partner.discountOffered && partner.discountOffered !== "-" ? partner.discountOffered : ""
  );

  const [copiedLink, setCopiedLink] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleReject = () => {
    const updated: AdminPartner = {
      ...partner,
      status: "Expired", // transition rejected or expired
      couponCode: "-",
      couponStatus: "None",
      salesAmount: -1,
    };
    onUpdatePartner(updated);
    onClose();
  };

  const handleDeleteCoupon = () => {
    const todayStr = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setCouponStatus("Expired");
    setCurrentStatus("Expired");

    const updated: AdminPartner = {
      ...partner,
      status: "Expired",
      couponStatus: "Expired",
      couponDetails: `${partner.discountOffered || "10%"} off · Expired on ${todayStr}`,
      couponExpiryDate: todayStr,
    };
    onUpdatePartner(updated);
  };

  const handleGenerateCoupon = () => {
    if (!couponCodeInput.trim()) return alert("Please enter a coupon code");
    if (!discountValueInput.trim()) return alert("Please enter a discount value");

    const code = couponCodeInput.trim().toUpperCase();
    const formattedDiscount =
      discountValueInput.includes("%") ||
      discountValueInput.toLowerCase().includes("off") ||
      discountValueInput.includes("₹")
        ? discountValueInput
        : discountType === "Percentage"
          ? `${discountValueInput}%`
          : `₹${discountValueInput}`;

    const updated: AdminPartner = {
      ...partner,
      status: "Approved",
      couponCode: code,
      couponStatus: "Active",
      discountOffered: formattedDiscount.replace("%", "") + "%", // store simple discount display or text
      couponDetails: `${formattedDiscount} off · No minimum`,
      refLink: `taybeen.in/ref?code=${code}`,
      salesAmount: partner.salesAmount === -1 ? 0 : partner.salesAmount,
      ordersCount: partner.ordersCount,
    };

    onUpdatePartner(updated);

    setIsGeneratingCoupon(false);
    onClose();
  };

  const getSubtitle = () => {
    if (currentStatus === "Pending") {
      return "Affiliate request — pending review";
    }
    if (couponStatus === "Expired" || currentStatus === "Expired") {
      return "Affiliate details — coupon expired";
    }
    return "Affiliate details & coupon management";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isSplit={false}
      className="max-w-xl w-full bg-[#FDFAF3] p-0 overflow-hidden max-h-[92vh] flex flex-col relative font-poppins text-left"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-9 h-9 bg-white hover:bg-[#F2EADA]/40 text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
        aria-label="Close details modal"
      >
        <X size={18} />
      </button>

      <div className="p-6 md:p-8 pb-4 shrink-0 select-text pr-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown">
          {partner.name}
        </h2>
        <p className="text-xs text-[#8D7F75] font-semibold mt-1">{getSubtitle()}</p>
      </div>

      <div className="border-b border-[#C4A482]/10 mx-6 md:mx-8" />

      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-6 select-text text-sm text-[#3A2418]">
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#768C3A] tracking-wider uppercase">
            Personal Details
          </h3>
          <div className="divide-y divide-[#C4A482]/10 border-t border-b border-[#C4A482]/10">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-[#768C3A]">
                <User size={16} className="shrink-0" />
                <span className="font-medium">Full name</span>
              </div>
              <span className="font-bold text-brand-brown text-right">{partner.name}</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-[#768C3A]">
                <Mail size={16} className="shrink-0" />
                <span className="font-medium">Email</span>
              </div>
              <span className="font-bold text-brand-brown text-right break-all">
                {partner.email}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-[#768C3A]">
                <Phone size={16} className="shrink-0" />
                <span className="font-medium">Phone</span>
              </div>
              <span className="font-bold text-brand-brown text-right">
                {partner.phone || "+91 98001 23456"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-[#768C3A]">
                <MapPin size={16} className="shrink-0" />
                <span className="font-medium">City</span>
              </div>
              <span className="font-bold text-brand-brown text-right">
                {partner.city || "Pune, Maharashtra"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-[#768C3A]">
                <Briefcase size={16} className="shrink-0" />
                <span className="font-medium">Occupation</span>
              </div>
              <span className="font-bold text-brand-brown text-right">
                {partner.occupation || "Nutritionist"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-[#768C3A]">
                <Calendar size={16} className="shrink-0" />
                <span className="font-medium">
                  {currentStatus === "Pending" ? "Requested on" : "Joined on"}
                </span>
              </div>
              <span className="font-bold text-brand-brown text-right">
                {partner.joinedDate || partner.requestedDate.replace("Requested ", "")}
              </span>
            </div>
          </div>
        </div>

        {(currentStatus === "Approved" || currentStatus === "Expired") && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#768C3A] tracking-wider uppercase">
              {currentStatus === "Expired" ? "Past Performance" : "Sales Performance"}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm text-center flex flex-col justify-center min-h-[90px]">
                <span className="text-base sm:text-lg font-bold text-brand-brown">
                  {partner.salesAmount === -1
                    ? "-"
                    : `₹${formatIndianCurrency(partner.salesAmount)}`}
                </span>
                <span className="text-[10px] text-[#8D7F75] font-semibold mt-1 block leading-tight">
                  Total sales generated
                </span>
              </div>

              <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm text-center flex flex-col justify-center min-h-[90px]">
                <span className="text-base sm:text-lg font-bold text-brand-brown">
                  {partner.ordersCount}
                </span>
                <span className="text-[10px] text-[#8D7F75] font-semibold mt-1 block leading-tight">
                  Orders via coupon
                </span>
              </div>

              <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm text-center flex flex-col justify-center min-h-[90px]">
                <span className="text-base sm:text-lg font-bold text-brand-brown">
                  {partner.discountOffered || "10%"}
                </span>
                <span className="text-[10px] text-[#8D7F75] font-semibold mt-1 block leading-tight">
                  Discount offered
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStatus === "Pending" && partner.whyJoin && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#768C3A] tracking-wider uppercase">
              Why they want to be an affiliate
            </h3>
            <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm text-left">
              <p className="text-xs sm:text-sm text-brand-brown/90 leading-relaxed font-medium italic">
                &ldquo;{partner.whyJoin}&rdquo;
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-1">
          <h3 className="text-xs font-bold text-[#768C3A] tracking-wider uppercase block">
            Coupon
          </h3>

          {currentStatus === "Approved" && couponStatus === "Active" && (
            <div className="space-y-4">
              <div className="border border-dashed border-[#C4A482] rounded-2xl p-5 bg-[#FDFAF3] flex flex-col gap-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xl text-brand-brown tracking-wider">
                    {partner.couponCode}
                  </span>
                  <Badge
                    text="Active"
                    variant="success"
                    className="px-2.5 py-0.5 text-[10px] font-bold"
                  />
                </div>
                <p className="text-xs text-[#8D7F75] font-semibold">
                  {partner.couponDetails || "10% off · No minimum"}
                </p>

                <div className="flex gap-2 items-center mt-1 w-full">
                  <input
                    type="text"
                    readOnly
                    value={partner.refLink || `taybeen.in/ref?code=${partner.couponCode}`}
                    className="flex-1 bg-white border border-[#C4A482]/20 rounded-lg px-3 py-2 text-xs font-medium text-brand-brown select-all focus:outline-none h-9 truncate"
                  />
                  <button
                    onClick={() =>
                      handleCopyLink(partner.refLink || `taybeen.in/ref?code=${partner.couponCode}`)
                    }
                    className="bg-white border border-[#C4A482]/30 hover:border-[#C4A482] transition-colors rounded-lg px-3 text-xs font-bold font-poppins flex items-center justify-center gap-1.5 h-9 text-brand-brown cursor-pointer select-none active:scale-95"
                  >
                    {copiedLink ? (
                      <Check size={14} className="text-brand-green" />
                    ) : (
                      <Copy size={14} />
                    )}
                    <span>{copiedLink ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white border border-[#C4A482]/30 hover:border-[#C4A482] transition-colors rounded-lg px-3 text-xs font-bold font-poppins flex items-center justify-center gap-1.5 h-9 text-brand-brown cursor-pointer select-none active:scale-95"
                  >
                    <Share2 size={14} />
                    <span>{shared ? "Shared" : "Share"}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDeleteCoupon}
                  className="flex-1 bg-red-50 hover:bg-red-100/80 transition-colors text-red-600 border border-red-200 font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} />
                  <span>Delete coupon</span>
                </button>
                <button
                  onClick={() => {
                    setIsGeneratingCoupon(true);
                    setCouponStatus("None");
                  }}
                  className="flex-1 bg-white hover:bg-gray-50 transition-colors text-brand-brown border border-[#C4A482]/30 font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none flex items-center justify-center gap-2"
                >
                  <Zap size={14} />
                  <span>Generate new</span>
                </button>
              </div>
            </div>
          )}

          {currentStatus === "Expired" && couponStatus === "Expired" && !isGeneratingCoupon && (
            <div className="space-y-4">
              <div className="border border-dashed border-[#C4A482]/50 rounded-2xl p-5 bg-[#FDFAF3] flex flex-col gap-3 opacity-80">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xl text-[#8D7F75] line-through tracking-wider">
                    {partner.couponCode}
                  </span>
                  <Badge
                    text="Expired"
                    variant="error"
                    className="px-2.5 py-0.5 text-[10px] font-bold"
                  />
                </div>
                <p className="text-xs text-[#8D7F75] font-semibold">
                  {partner.couponDetails ||
                    `20% off · Expired on ${partner.couponExpiryDate || "31 May 2025"}`}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-brand-brown/70 block">
                    New coupon code
                  </label>
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder={`e.g. ${partner.couponCode}NEW`}
                    className="w-full bg-[#F9F6EE] border border-[#C4A482]/20 rounded-xl px-4 py-3 text-sm font-semibold text-brand-brown focus:outline-none placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-brand-brown/70 block">
                    Discount value
                  </label>
                  <input
                    type="text"
                    value={discountValueInput}
                    onChange={(e) => setDiscountValueInput(e.target.value)}
                    placeholder="e.g. 20% or ₹150 flat"
                    className="w-full bg-[#F9F6EE] border border-[#C4A482]/20 rounded-xl px-4 py-3 text-sm font-semibold text-brand-brown focus:outline-none placeholder:text-gray-400"
                  />
                </div>

                <button
                  onClick={handleGenerateCoupon}
                  className="w-full bg-[#768C3A] hover:bg-[#5E702E] transition-colors text-white font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none flex items-center justify-center gap-2"
                >
                  <Zap size={14} fill="white" />
                  <span>Generate new coupon</span>
                </button>
              </div>
            </div>
          )}

          {((currentStatus === "Pending" && !isGeneratingCoupon) ||
            (couponStatus === "None" && !isGeneratingCoupon && currentStatus !== "Pending")) && (
            <div className="space-y-4">
              {currentStatus === "Pending" ? (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setIsGeneratingCoupon(true)}
                    className="flex-1 bg-[#768C3A]/5 hover:bg-[#768C3A]/10 text-[#768C3A] border border-[#768C3A]/30 py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none text-center"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 bg-red-50/50 hover:bg-red-50 text-red-600 border border-red-500/30 py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none text-center"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-dashed border-[#C4A482]/40 rounded-2xl p-6 bg-[#FDFAF3] flex flex-col items-center justify-center text-center">
                    <Ticket className="text-[#C4A482]/60 w-8 h-8 mb-2" />
                    <p className="text-xs text-[#8D7F75] font-semibold max-w-xs leading-relaxed">
                      No coupon yet. Fill in the details below and generate a code for this
                      affiliate.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-brand-brown/70 block">
                        Coupon code
                      </label>
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        placeholder="No coupon generated"
                        className="w-full bg-[#F9F6EE] border border-[#C4A482]/20 rounded-xl px-4 py-3 text-sm font-semibold text-brand-brown focus:outline-none placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-brand-brown/70 block">
                        Discount value
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setDiscountType("Rupees")}
                          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none text-center ${
                            discountType === "Rupees"
                              ? "bg-[#F8E8C9] text-brand-brown border-[#C4A482]/60 shadow-sm"
                              : "bg-[#F9F6EE] text-brand-brown/70 border-[#C4A482]/25 hover:bg-white"
                          }`}
                        >
                          Rupees
                        </button>
                        <button
                          type="button"
                          onClick={() => setDiscountType("Percentage")}
                          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none text-center ${
                            discountType === "Percentage"
                              ? "bg-[#F8E8C9] text-brand-brown border-[#C4A482]/60 shadow-sm"
                              : "bg-[#F9F6EE] text-brand-brown/70 border-[#C4A482]/25 hover:bg-white"
                          }`}
                        >
                          Percentage %
                        </button>
                      </div>

                      <input
                        type="text"
                        value={discountValueInput}
                        onChange={(e) => setDiscountValueInput(e.target.value)}
                        placeholder={
                          discountType === "Percentage"
                            ? "Enter value e.g. 10%"
                            : "Enter value e.g. ₹150 flat"
                        }
                        className="w-full bg-[#F9F6EE] border border-[#C4A482]/20 rounded-xl px-4 py-3 text-sm font-semibold text-brand-brown focus:outline-none placeholder:text-gray-400 mt-2"
                      />
                    </div>

                    <button
                      onClick={handleGenerateCoupon}
                      className="w-full bg-[#768C3A] hover:bg-[#5E702E] transition-colors text-white font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none flex items-center justify-center gap-2"
                    >
                      <Zap size={14} fill="white" />
                      <span>Generate coupon & approve affiliate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStatus === "Pending" && isGeneratingCoupon && (
            <div className="space-y-4">
              <div className="border border-dashed border-[#C4A482]/40 rounded-2xl p-6 bg-[#FDFAF3] flex flex-col items-center justify-center text-center">
                <Ticket className="text-[#C4A482]/60 w-8 h-8 mb-2" />
                <p className="text-xs text-[#8D7F75] font-semibold max-w-xs leading-relaxed">
                  No coupon yet. Fill in the details below and generate a code to approve this
                  affiliate.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-brand-brown/70 block">Coupon code</label>
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="No coupon generated"
                    className="w-full bg-[#F9F6EE] border border-[#C4A482]/20 rounded-xl px-4 py-3 text-sm font-semibold text-brand-brown focus:outline-none placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-brand-brown/70 block">
                    Discount value
                  </label>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDiscountType("Rupees")}
                      className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none text-center ${
                        discountType === "Rupees"
                          ? "bg-[#F8E8C9] text-brand-brown border-[#C4A482]/60 shadow-sm"
                          : "bg-[#F9F6EE] text-brand-brown/70 border-[#C4A482]/25 hover:bg-white"
                      }`}
                    >
                      Rupees
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType("Percentage")}
                      className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none text-center ${
                        discountType === "Percentage"
                          ? "bg-[#F8E8C9] text-brand-brown border-[#C4A482]/60 shadow-sm"
                          : "bg-[#F9F6EE] text-brand-brown/70 border-[#C4A482]/25 hover:bg-white"
                      }`}
                    >
                      Percentage %
                    </button>
                  </div>

                  <input
                    type="text"
                    value={discountValueInput}
                    onChange={(e) => setDiscountValueInput(e.target.value)}
                    placeholder={
                      discountType === "Percentage"
                        ? "Enter value e.g. 10%"
                        : "Enter value e.g. ₹150 flat"
                    }
                    className="w-full bg-[#F9F6EE] border border-[#C4A482]/20 rounded-xl px-4 py-3 text-sm font-semibold text-brand-brown focus:outline-none placeholder:text-gray-400 mt-2"
                  />
                </div>

                <button
                  onClick={handleGenerateCoupon}
                  className="w-full bg-[#768C3A] hover:bg-[#5E702E] transition-colors text-white font-bold py-3.5 px-6 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 focus:outline-none flex items-center justify-center gap-2"
                >
                  <Zap size={14} fill="white" />
                  <span>Generate coupon & approve affiliate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AffiliateDetailsModal;
