import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tag, X } from "lucide-react";

interface CouponCardProps {
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => Promise<boolean>;
  onRemoveCoupon: () => void;
  couponError: string | null;
  couponSuccess: string | null;
  setCouponError: (msg: string | null) => void;
  setCouponSuccess: (msg: string | null) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  couponError,
  couponSuccess,
  setCouponError,
  setCouponSuccess,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const code = inputValue.trim().toUpperCase();
    const success = await onApplyCoupon(code);
    if (success) {
      setInputValue("");
    }
  };

  return (
    <div className="w-full bg-[#FDFAF3] border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm text-left font-poppins mt-6">
      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown tracking-wide mb-4 border-b border-[#C4A482]/15 pb-3 flex items-center gap-2">
        <Tag size={18} className="text-[#3A2418]" />
        Promo Code / Coupon
      </h3>

      {!appliedCoupon ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (couponError) setCouponError(null);
              }}
              className="w-full sm:flex-1 bg-white border border-[#C4A482]/35 rounded-xl px-4 py-2.5 text-sm text-[#3A2418] placeholder-[#7D6B5E]/50 focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase flex-shrink-0"
            >
              Apply
            </Button>
          </div>
          {couponError && (
            <p className="text-red-600 text-xs font-medium pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
              {couponError}
            </p>
          )}
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-green-50 border border-green-200/50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-green-800">
              <Tag size={16} className="text-green-600" />
              <div>
                <span className="font-bold text-sm">{appliedCoupon}</span>
                <span className="text-xs ml-1.5 text-green-700 font-medium">Applied</span>
              </div>
            </div>
            <button
              onClick={() => {
                onRemoveCoupon();
                setInputValue("");
              }}
              className="text-[#7D6B5E] hover:text-red-600 transition-colors p-1"
              aria-label="Remove coupon"
            >
              <X size={16} />
            </button>
          </div>
          {couponSuccess && (
            <p className="text-green-600 text-xs font-semibold pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
              {couponSuccess}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponCard;
