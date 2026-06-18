"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  OrderConfirmedHeader,
  OrderSummaryCard,
  OrderActions,
  OrderSupportNote
} from "@/components/user/sections/order-confirmed";

interface OrderInfo {
  id: string;
  placedOn: string;
  itemsCount: number;
}

export const OrderConfirmedPage: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem("taybeen_last_order");
      if (storedOrder) {
        const parsed = JSON.parse(storedOrder);
        setOrderInfo({
          id: parsed.id || "TYB-2024-0056",
          placedOn: parsed.placedOn || "11th June 2026 5:30 pm",
          itemsCount: parsed.itemsCount || 1
        });
      } else {
        setOrderInfo({
          id: "TYB-2024-0056",
          placedOn: "11th June 2026 5:30 pm",
          itemsCount: 1
        });
      }
    } catch (error) {
      console.error("Failed to retrieve order info from local storage", error);
      setOrderInfo({
        id: "TYB-2024-0056",
        placedOn: "11th June 2026 5:30 pm",
        itemsCount: 1
      });
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded || !orderInfo) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      <div>
        <Navbar />

        <OrderConfirmedHeader />

        <main className="relative z-20 px-6 md:px-12 lg:px-20 xl:px-24 pb-16 md:pb-0 -mt-4 sm:-mt-8">
          <div className="max-w-[800px] mx-auto space-y-8">
            <OrderSummaryCard
              orderId={orderInfo.id}
              placedOn={orderInfo.placedOn}
              itemsCount={orderInfo.itemsCount}
            />

            <OrderActions />

            <div className="pt-2">
              <OrderSupportNote />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmedPage;
