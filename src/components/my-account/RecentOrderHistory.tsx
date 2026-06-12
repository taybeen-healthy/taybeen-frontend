import React from "react";
import { OrderHistoryItem } from "@/types/myAccount";
import { Tag } from "@/components/ui/Tag";

interface RecentOrderHistoryProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orders: OrderHistoryItem[];
}

export const RecentOrderHistory: React.FC<RecentOrderHistoryProps> = ({
  activeTab,
  onTabChange,
  orders = [],
}) => {
  const displayedOrders = activeTab === "dashboard" ? orders.slice(0, 4) : orders;

  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-4 sm:p-5 lg:p-7 shadow-sm text-left font-poppins select-none">
      {/* Header Block */}
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

      {/* Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#F6F1E9] text-brand-brown font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              <th className="py-3 px-4 rounded-l-lg border-b border-[#C4A482]/20">
                ORDER ID
              </th>
              <th className="py-3 px-4 border-b border-[#C4A482]/20">
                DATE
              </th>
              <th className="py-3 px-4 border-b border-[#C4A482]/20">
                TOTAL
              </th>
              <th className="py-3 px-4 border-b border-[#C4A482]/20">
                STATUS
              </th>
              <th className="py-3 px-4 rounded-r-lg border-b border-[#C4A482]/20">
                {/* View Details header is empty */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C4A482]/15 text-[#3A2418]">
            {displayedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-black/[0.01] transition-colors">
                {/* Order ID */}
                <td className="py-4 px-4 font-semibold text-brand-brown align-middle">
                  {order.id}
                </td>
                {/* Date */}
                <td className="py-4 px-4 font-medium text-[#7D6B5E] align-middle">
                  {order.date}
                </td>
                {/* Total */}
                <td className="py-4 px-4 font-medium text-brand-brown align-middle">
                  ₹{order.total.toFixed(2)}
                </td>
                {/* Status */}
                <td className="py-4 px-4 align-middle">
                  <Tag variant="primary-light" className="text-[10px] sm:text-xs font-semibold py-1 px-3 inline-block shrink-0">
                    {order.status}
                  </Tag>
                </td>
                {/* Action */}
                <td className="py-4 px-4 text-right align-middle">
                  <a
                    href="#"
                    className="text-[#768C3A] hover:underline font-semibold text-xs sm:text-sm whitespace-nowrap"
                  >
                    View details
                  </a>
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

