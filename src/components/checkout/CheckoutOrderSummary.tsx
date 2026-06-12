import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/types";
import { CheckoutStep } from "@/types/checkout";

interface CheckoutOrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  step: CheckoutStep;
  onProceed: () => void;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  cartItems,
  subtotal,
  shippingCost,
  total,
  step,
  onProceed,
}) => {
  return (
    <div className="w-full bg-[#FDFAF3] border border-[#C4A482]/25 rounded-2xl p-5 sm:p-6 shadow-sm text-left font-poppins">
      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown tracking-wide mb-5 border-b border-[#C4A482]/15 pb-3">
        Order Summary
      </h3>

      {/* Cart items list */}
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
                <Image
                  src={itemImage}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
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
                ₹{(item.priceAtSelection * item.quantity).toLocaleString("en-IN")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing breakdown summary */}
      <div className="mt-6 border-t border-[#C4A482]/15 pt-4 space-y-2.5">
        <div className="flex justify-between items-center text-xs sm:text-sm text-[#7D6B5E]">
          <span>Cart Subtotal</span>
          <span className="font-semibold text-[#3A2418]">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm text-[#7D6B5E]">
          <span>Shipping & Handling</span>
          <span className="font-semibold text-[#3A2418]">
            {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
          </span>
        </div>

        {/* Total Price display */}
        <div className="border-t border-[#C4A482]/15 mt-3 pt-3 flex justify-between items-center text-sm sm:text-base">
          <span className="font-bold text-[#3A2418]">Order Total</span>
          <span className="font-bold text-[#3A2418] text-base sm:text-lg">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Action Button inside Order Summary (For Form step on desktop, and for all steps on mobile viewports) */}
      {(step === "form" || typeof window !== "undefined") && (
        <>
          {/* Form state button display or Mobile review button display */}
          <div className={`${step === "review" ? "lg:hidden" : ""} mt-6 pt-2`}>
            <Button
              onClick={onProceed}
              variant="primary"
              className="w-full uppercase font-bold text-xs sm:text-sm tracking-wider py-3.5 shadow-md active:scale-[0.98] select-none"
            >
              PROCEED TO MAKE PAYMENT
            </Button>
            <div className="mt-4 text-[10px] text-[#7D6B5E] text-center leading-relaxed">
              By placing an order you agree to our{" "}
              <a href="#" className="underline hover:text-brand-brown">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-brand-brown">
                Privacy Policy
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutOrderSummary;
