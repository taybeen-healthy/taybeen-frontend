import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Info } from "lucide-react";
import { CartItem, CheckoutStep } from "@/types";
import { formatIndianCurrency } from "@/lib/utils";

interface CheckoutOrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  step: CheckoutStep;
  onProceed: () => void;
  discount?: number;
  paymentMethod?: string;
  gstCost?: number;
  gstPercent?: number;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  cartItems,
  subtotal,
  shippingCost,
  total,
  step,
  onProceed,
  discount = 0,
  paymentMethod = "Razorpay",
  gstCost = 0,
  gstPercent = 5,
}) => {
  const [showGstInfo, setShowGstInfo] = useState(false);
  const combinedShipping = shippingCost + gstCost;
  return (
    <div className="w-full bg-[#FDFAF3] border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm text-left font-poppins">
      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown tracking-wide mb-5 border-b border-[#C4A482]/15 pb-3">
        Order Summary
      </h3>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {cartItems.map((item, index) => {
          const itemImage = item.product.images?.[0] || item.product.image;
          const displayName = item.product.name.includes("Mejdool")
            ? "Mejdool Dates"
            : item.product.name.includes("Ajwa")
              ? "Ajwa Dates"
              : item.product.name;

          return (
            <div key={`${item.product.id}-${index}`} className="flex gap-4 items-center">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#C4A482]/15 flex-shrink-0">
                <Image src={itemImage} alt={item.product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#3A2418] truncate">
                  {displayName}
                </h4>
                <div className="flex items-center gap-4 text-[10px] sm:text-xs text-[#7D6B5E] font-medium mt-0.5">
                  <span>{item.selectedWeight}</span>
                  <span>Qty : {item.quantity}</span>
                </div>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#3A2418] flex-shrink-0">
                ₹{formatIndianCurrency(item.priceAtSelection * item.quantity)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-[#C4A482]/15 pt-4 space-y-2.5">
        <div className="flex justify-between items-center text-xs sm:text-sm text-[#7D6B5E]">
          <span>Cart Subtotal</span>
          <span className="font-semibold text-[#3A2418]">₹{formatIndianCurrency(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center text-xs sm:text-sm text-green-600 font-medium">
            <span>Coupon Discount</span>
            <span>- ₹{formatIndianCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-xs sm:text-sm text-[#7D6B5E]">
          <div className="flex items-center gap-1.5">
            <span>Shipping & Handling</span>
            <button
              type="button"
              onClick={() => setShowGstInfo(true)}
              className="text-[#7D6B5E] hover:text-brand-brown transition-colors focus:outline-none flex items-center justify-center p-0.5 rounded hover:bg-[#F6F1E9]"
              aria-label="Shipping tax information"
            >
              <Info size={14} />
            </button>
          </div>
          <span className="font-semibold text-[#3A2418]">
            {combinedShipping === 0 ? "Free" : `₹${formatIndianCurrency(combinedShipping)}`}
          </span>
        </div>

        <div className="border-t border-[#C4A482]/15 mt-3 pt-3 flex justify-between items-center text-sm sm:text-base">
          <span className="font-bold text-[#3A2418]">Order Total</span>
          <span className="font-bold text-[#3A2418] text-base sm:text-lg">
            ₹{formatIndianCurrency(total)}
          </span>
        </div>
      </div>

      {(step === "form" || typeof window !== "undefined") && (
        <>
          <div className={`${step === "review" ? "lg:hidden" : ""} mt-6 pt-2`}>
            <Button
              onClick={onProceed}
              variant="primary"
              className="w-full uppercase font-bold text-xs sm:text-sm tracking-wider py-3.5 shadow-md active:scale-[0.98] select-none"
            >
              {step === "form"
                ? "PROCEED TO REVIEW"
                : paymentMethod === "Cash on Delivery"
                  ? "PLACE COD ORDER"
                  : "PROCEED TO MAKE PAYMENT"}
            </Button>
            <div className="mt-4 text-[10px] text-[#7D6B5E] text-center leading-relaxed">
              By placing an order you agree to our{" "}
              <a href="/terms-and-contitions" className="underline hover:text-brand-brown">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="underline hover:text-brand-brown">
                Privacy Policy
              </a>
            </div>
          </div>
        </>
      )}

      {showGstInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FDFAF3] border border-[#C4A482] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center relative animate-in zoom-in duration-200">
            <h4 className="font-serif text-lg font-bold text-brand-brown mb-2">
              Shipping & Handling
            </h4>
            <p className="text-sm text-[#7D6B5E] leading-relaxed mb-6">
              This charge is inclusive of all taxes, including Goods and Services Tax (GST).
            </p>
            <Button
              onClick={() => setShowGstInfo(false)}
              variant="primary"
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutOrderSummary;
