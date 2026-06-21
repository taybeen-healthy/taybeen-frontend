import React from "react";

interface BillingAddressCardProps {
  billing: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    country: string;
    stateProvince: string;
    postalCode: string;
    email: string;
    phone: string;
  };
  onEdit: () => void;
}

export const BillingAddressCard: React.FC<BillingAddressCardProps> = ({ billing, onEdit }) => {
  const isEmpty =
    !billing.streetAddress && !billing.country && !billing.firstName && !billing.lastName;

  const fullName = isEmpty
    ? "Example User"
    : `${billing.firstName} ${billing.lastName}`.trim() || "User";
  const addressLine = isEmpty
    ? "123, Example Street, City, State, Country"
    : `${billing.streetAddress}, ${billing.stateProvince} ${billing.postalCode}, ${billing.country}`;
  const email = isEmpty ? "example@gmail.com" : billing.email;
  const phone = isEmpty ? "+91 98765 43210" : billing.phone;

  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-5 lg:p-7 shadow-sm text-left h-full flex flex-col justify-between font-poppins">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs font-bold text-brand-brown/70 tracking-widest uppercase block">
            Billing Address
          </span>
          {isEmpty && (
            <span className="text-[9px] px-2 py-0.5 rounded bg-[#F6F1E9] text-[#7D6B5E] font-semibold border border-[#C4A482]/15">
              Example
            </span>
          )}
        </div>
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-brand-brown leading-tight truncate">
          {fullName}
        </h3>
        <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed max-w-sm">{addressLine}</p>
        {email && <p className="text-xs sm:text-sm text-[#7D6B5E] truncate">{email}</p>}
        {phone && <p className="text-xs sm:text-sm text-[#7D6B5E] truncate">{phone}</p>}
      </div>
      <div className="mt-4 pt-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
          className="text-[#768C3A] hover:underline text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none"
        >
          {isEmpty ? "Add Address" : "Edit Address"}
        </button>
      </div>
    </div>
  );
};

export default BillingAddressCard;
