import React from "react";
import { OrderHistoryItem } from "@/types/myAccount";
import { Tag } from "@/components/ui/Tag";

interface RecentOrderHistoryProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orders: OrderHistoryItem[];
  onViewDetails?: (orderId: string) => void;
}

export const RecentOrderHistory: React.FC<RecentOrderHistoryProps> = ({
  activeTab,
  onTabChange,
  orders = [],
  onViewDetails,
}) => {
  if (!orders || orders.length === 0) {
    if (activeTab === "dashboard") {
      return null;
    }
    return (
      <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-8 sm:p-10 shadow-sm text-center font-poppins">
        <h2 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-brand-brown mb-2 text-left">
          Order History
        </h2>
        <div className="border-b border-[#C4A482]/10 mb-6" />
        <p className="text-sm text-[#8D7F75] font-medium py-4">
          You have not placed any orders yet.
        </p>
      </div>
    );
  }

  const displayedOrders = activeTab === "dashboard" ? orders.slice(0, 4) : orders;

  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-4 sm:p-5 lg:p-7 shadow-sm text-left font-poppins select-none">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-brand-brown">
          {activeTab === "orders" ? "Order History" : "Recent Order History"}
        </h2>
        {activeTab === "dashboard" && (
          <button
            onClick={() => onTabChange("orders")}
            className="text-[#768C3A] hover:underline text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer"
          >
            View All
          </button>
        )}
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#F6F1E9] text-brand-brown font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              <th className="py-3 px-4 rounded-l-lg border-b border-[#C4A482]/20">ORDER ID</th>
              <th className="py-3 px-4 border-b border-[#C4A482]/20">DATE</th>
              <th className="py-3 px-4 border-b border-[#C4A482]/20">TOTAL</th>
              <th className="py-3 px-4 border-b border-[#C4A482]/20">STATUS</th>
              <th className="py-3 px-4 rounded-r-lg border-b border-[#C4A482]/20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C4A482]/15 text-[#3A2418]">
            {displayedOrders.map((order: any) => (
              <tr key={order.id} className="hover:bg-black/[0.01] transition-colors">
                <td className="py-4 px-4 font-semibold text-brand-brown align-middle">
                  {order.hexId || order.id}
                </td>
                <td className="py-4 px-4 font-medium text-[#7D6B5E] align-middle">{order.date}</td>
                <td className="py-4 px-4 font-medium text-brand-brown align-middle">
                  ₹
                  {typeof order.total === "number"
                    ? order.total.toFixed(2)
                    : parseFloat(order.total || 0).toFixed(2)}
                </td>
                <td className="py-4 px-4 align-middle">
                  <Tag
                    variant="primary-light"
                    className="text-[10px] sm:text-xs font-semibold py-1 px-3 inline-block shrink-0"
                  >
                    {order.status}
                  </Tag>
                </td>
                <td className="py-4 px-4 text-right align-middle">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (onViewDetails) {
                        onViewDetails(order.id);
                      }
                    }}
                    className="text-[#768C3A] hover:underline font-semibold text-xs sm:text-sm whitespace-nowrap bg-transparent border-0 cursor-pointer focus:outline-none"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrderHistory;
