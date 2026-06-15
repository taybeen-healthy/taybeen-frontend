import React from "react";
import { orderConfirmedData } from "@/data/user/orderConfirmedData";

export const OrderSupportNote: React.FC = () => {
  const { support } = orderConfirmedData;

  return (
    <p className="text-center font-poppins text-[11px] sm:text-xs md:text-sm text-[#7D6B5E] max-w-xl mx-auto px-4 select-none leading-relaxed">
      Questions? Email us at{" "}
      <a
        href={`mailto:${support.email}`}
        className="text-[#F7A503] hover:underline font-medium transition-all"
      >
        {support.email}
      </a>{" "}
      · We typically respond within a few hours.
    </p>
  );
};

export default OrderSupportNote;
