import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CheckoutAddressForm } from "@/types";

interface CheckoutReviewProps {
  shippingForm: CheckoutAddressForm;
  billingForm: CheckoutAddressForm;
  isBillingSame: boolean;
  onEdit: () => void;
  onPaymentSubmit: () => void;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export const CheckoutReview: React.FC<CheckoutReviewProps> = ({
  shippingForm,
  billingForm,
  isBillingSame,
  onEdit,
  onPaymentSubmit,
  paymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm text-left font-poppins">
      <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-brand-brown mb-6 tracking-wide">
        Shipping Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl p-5 relative flex flex-col justify-between min-h-[140px]">
          <div className="space-y-2.5">
            <span className="text-[10px] sm:text-xs font-bold text-brand-brown/70 tracking-widest block">
              Shipping address
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown leading-tight">
              {shippingForm.firstName} {shippingForm.lastName}
            </h3>
            <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed">
              {shippingForm.streetAddress}, {shippingForm.city}, {shippingForm.stateProvince}{" "}
              {shippingForm.postalCode}, {shippingForm.country}
            </p>
            <p className="text-xs sm:text-sm text-[#7D6B5E] font-medium">{shippingForm.phone}</p>
          </div>

          <button
            onClick={onEdit}
            className="absolute top-4 right-4 w-9 h-9 bg-white hover:bg-[#FDFBF7] text-brand-brown border border-[#C4A482]/50 rounded-lg flex items-center justify-center shadow-sm cursor-pointer transition-colors active:scale-95 focus:outline-none"
            title="Edit Shipping Address"
          >
            <Pencil size={15} />
          </button>
        </div>

        <div className="bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl p-5 relative flex flex-col justify-between min-h-[140px]">
          <div className="space-y-2.5">
            <span className="text-[10px] sm:text-xs font-bold text-brand-brown/70 tracking-widest block">
              Billing address
            </span>

            {isBillingSame ? (
              <>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown leading-tight">
                  {shippingForm.firstName} {shippingForm.lastName}
                </h3>
                <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed">
                  {shippingForm.streetAddress}, {shippingForm.city}, {shippingForm.stateProvince}{" "}
                  {shippingForm.postalCode}, {shippingForm.country}
                </p>
                <p className="text-xs sm:text-sm text-[#7D6B5E] font-medium">
                  {shippingForm.phone}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown leading-tight">
                  {billingForm.firstName} {billingForm.lastName}
                </h3>
                <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed">
                  {billingForm.streetAddress}, {billingForm.city}, {billingForm.stateProvince}{" "}
                  {billingForm.postalCode}, {billingForm.country}
                </p>
                <p className="text-xs sm:text-sm text-[#7D6B5E] font-medium">{billingForm.phone}</p>
              </>
            )}
          </div>

          <button
            onClick={onEdit}
            className="absolute top-4 right-4 w-9 h-9 bg-white hover:bg-[#FDFBF7] text-brand-brown border border-[#C4A482]/50 rounded-lg flex items-center justify-center shadow-sm cursor-pointer transition-colors active:scale-95 focus:outline-none"
            title="Edit Billing Address"
          >
            <Pencil size={15} />
          </button>
        </div>
      </div>

      <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-brand-brown mt-8 mb-4 tracking-wide">
        Payment Method
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            id: "Razorpay",
            label: "Pay Online",
            desc: "Pay securely via UPI, Cards, Net Banking, or Wallets using Razorpay",
          },
          {
            id: "Cash on Delivery",
            label: "Cash on Delivery (COD)",
            desc: "Pay with cash upon delivery",
          },
        ].map((method) => {
          const isSelected = paymentMethod === method.id;
          return (
            <label
              key={method.id}
              className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-[#F6F1E9]/50 border-brand-green ring-1 ring-brand-green/20"
                  : "bg-white border-[#C4A482]/25 hover:bg-black/[0.01]"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={isSelected}
                  onChange={() => onPaymentMethodChange(method.id)}
                  className="accent-[#5A3E2B] w-4 h-4 cursor-pointer"
                />
                <span className="font-bold text-sm text-brand-brown">{method.label}</span>
              </div>
              <span className="text-[11px] text-[#7D6B5E] pl-7 mt-1">{method.desc}</span>
            </label>
          );
        })}
      </div>

      <div className="mt-8 text-xs sm:text-sm text-[#7D6B5E] leading-relaxed border-t border-[#C4A482]/15 pt-4">
        By placing an order you agree to our{" "}
        <a href="/terms-and-contitions" className="underline hover:text-brand-brown">
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="underline hover:text-brand-brown">
          Privacy Policy
        </a>
      </div>

      <div className="hidden lg:flex pt-6">
        <Button
          onClick={onPaymentSubmit}
          variant="primary"
          className="uppercase font-bold text-xs sm:text-sm tracking-wider px-10 py-3.5 shadow-md hover:shadow-lg active:scale-98"
        >
          {paymentMethod === "Cash on Delivery" ? "PLACE COD ORDER" : "PROCEED TO MAKE PAYMENT"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutReview;
