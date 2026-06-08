import React from "react";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

interface ReviewSuccessModalProps {
  onReset: () => void;
}

export const ReviewSuccessModal: React.FC<ReviewSuccessModalProps> = ({ onReset }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#2C3A1A]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-premium border border-[#F2EADA] space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-brand-green-pale text-brand-green rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Check size={32} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-brown">
            Thank You!
          </h2>
          <p className="text-[#7D6B5E] font-poppins text-sm leading-relaxed">
            Your review has been successfully submitted. We deeply appreciate you sharing your experience with the Taybeen community.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onReset}
            className="w-full bg-[#2C3A1A] hover:bg-[#3d4f26] text-white py-3.5 rounded-lg font-poppins font-bold text-sm uppercase tracking-wider transition-colors active:scale-[0.99] cursor-pointer"
          >
            Leave Another Review
          </button>
          <Link
            href="/"
            className="w-full border border-brand-green text-brand-green hover:bg-brand-green-pale py-3.5 rounded-lg font-poppins font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
