import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { orderConfirmedData } from "@/data/user/orderConfirmedData";

export const OrderActions: React.FC = () => {
  const { buttons } = orderConfirmedData;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[600px] mx-auto select-none pt-4">
      <Link
        href="/products"
        className="w-full sm:w-[280px] bg-typo1 hover:bg-[#443200] text-btnText py-4 rounded-xl font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
      >
        <span>{buttons.continueShopping}</span>
        <ArrowRight size={16} strokeWidth={2.5} />
      </Link>

      <Link
        href="/"
        className="w-full sm:w-[280px] border border-typo1 text-typo1 hover:bg-typo1 hover:text-btnText py-4 rounded-xl font-poppins font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center active:scale-[0.98] cursor-pointer bg-transparent"
      >
        {buttons.backToHome}
      </Link>
    </div>
  );
};

export default OrderActions;
