import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CheckoutAddressForm } from "@/types/checkout";

interface CheckoutReviewProps {
  shippingForm: CheckoutAddressForm;
  billingForm: CheckoutAddressForm;
  isBillingSame: boolean;
  onEdit: () => void;
  onPaymentSubmit: () => void;
}

export const CheckoutReview: React.FC<CheckoutReviewProps> = ({
  shippingForm,
  billingForm,
  isBillingSame,
  onEdit,
  onPaymentSubmit,
}) => {
  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm text-left font-poppins">
      <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-brand-brown mb-6 tracking-wide">
        Shipping Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

        {/* Shipping address review card */}
        <div className="bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl p-5 relative flex flex-col justify-between min-h-[140px]">
          <div className="space-y-2.5">
            <span className="text-[10px] sm:text-xs font-bold text-brand-brown/70 tracking-widest block">
              Shipping address
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-brand-brown leading-tight">
              {shippingForm.firstName} {shippingForm.lastName}
            </h3>
            <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed">
              {shippingForm.streetAddress}, {shippingForm.city}, {shippingForm.stateProvince} {shippingForm.postalCode}, {shippingForm.country}
            </p>
            <p className="text-xs sm:text-sm text-[#7D6B5E] font-medium">
              {shippingForm.phone}
            </p>
          </div>

          <button
            onClick={onEdit}
            className="absolute top-4 right-4 w-9 h-9 bg-white hover:bg-[#FDFBF7] text-brand-brown border border-[#C4A482]/50 rounded-lg flex items-center justify-center shadow-sm cursor-pointer transition-colors active:scale-95 focus:outline-none"
            title="Edit Shipping Address"
          >
            <Pencil size={15} />
          </button>
        </div>

        {/* Billing address review card */}
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
                  {shippingForm.streetAddress}, {shippingForm.city}, {shippingForm.stateProvince} {shippingForm.postalCode}, {shippingForm.country}
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
                  {billingForm.streetAddress}, {billingForm.city}, {billingForm.stateProvince} {billingForm.postalCode}, {billingForm.country}
                </p>
                <p className="text-xs sm:text-sm text-[#7D6B5E] font-medium">
                  {billingForm.phone}
                </p>
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

      {/* Terms & disclaimer */}
      <div className="mt-8 text-xs sm:text-sm text-[#7D6B5E] leading-relaxed">
        By placing an order you agree to our{" "}
        <a href="#" className="underline hover:text-brand-brown">
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-brand-brown">
          Privacy Policy
        </a>
      </div>

      {/* Desktop-only Action Payment button */}
      <div className="hidden lg:flex pt-6">
        <Button
          onClick={onPaymentSubmit}
          variant="primary"
          className="uppercase font-bold text-xs sm:text-sm tracking-wider px-10 py-3.5 shadow-md hover:shadow-lg active:scale-98"
        >
          PROCEED TO MAKE PAYMENT
        </Button>
      </div>
    </div>
  );
};

export default CheckoutReview;
