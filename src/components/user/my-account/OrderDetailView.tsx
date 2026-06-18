import React from "react";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import { OrderDetail } from "@/types/myAccount";
import { orderDetailsData } from "@/data/user/myAccountData";

interface OrderDetailViewProps {
  orderId: string;
  onBack: () => void;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({ orderId, onBack }) => {
  const order: OrderDetail | undefined = orderDetailsData[orderId];

  if (!order) {
    return (
      <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 text-center font-poppins select-none">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-brown mb-2">
          Order Not Found
        </h3>
        <p className="text-sm text-[#7D6B5E] mb-6">
          The order with ID <span className="font-semibold">{orderId}</span> could not be retrieved.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#768C3A] hover:underline font-semibold text-sm focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Order History
        </button>
      </div>
    );
  }

  const completedStepsCount = order.progressSteps.filter((s) => s.completed).length;

  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-4 sm:p-5 lg:p-7 shadow-sm text-left font-poppins select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C4A482]/20 pb-4 mb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#768C3A] hover:underline text-xs sm:text-sm font-semibold mb-2 transition-all focus:outline-none cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to List
          </button>
          <h2 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-brand-brown">
            Order ID: {order.id}
          </h2>
        </div>
        <div className="text-left sm:text-right text-xs sm:text-sm text-[#7D6B5E]">
          <p>
            Date Placed: <span className="font-semibold text-[#3A2418]">{order.date}</span>
          </p>
          <p className="mt-0.5">
            Total Items:{" "}
            <span className="font-semibold text-[#3A2418]">
              {order.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-[#F6F1E9]/40 border border-[#C4A482]/20 rounded-2xl p-5 sm:p-6 mb-6">
        <h3 className="font-serif text-sm sm:text-base font-bold text-brand-brown mb-6">
          Order Status
        </h3>
        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-4 md:items-center">
          <div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-0.5 bg-[#C4A482]/15 hidden md:block z-0">
            <div
              className="h-full bg-[#768C3A] transition-all duration-500"
              style={{
                width: `${completedStepsCount > 1 ? ((completedStepsCount - 1) / (order.progressSteps.length - 1)) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="absolute left-[22px] top-[22px] bottom-[22px] w-0.5 bg-[#C4A482]/15 md:hidden z-0">
            <div
              className="w-full bg-[#768C3A] transition-all duration-500"
              style={{
                height: `${completedStepsCount > 1 ? ((completedStepsCount - 1) / (order.progressSteps.length - 1)) * 100 : 0}%`,
              }}
            />
          </div>

          {order.progressSteps.map((step, idx) => {
            const isCompleted = step.completed;
            return (
              <div
                key={idx}
                className="flex md:flex-col items-center gap-4 md:gap-2.5 flex-1 md:text-center"
              >
                <div
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center font-poppins font-bold text-xs sm:text-sm z-10 shrink-0 transition-colors ${
                    isCompleted
                      ? "bg-[#768C3A] text-white border-2 border-[#768C3A] shadow-sm"
                      : "bg-white text-[#7D6B5E]/50 border-2 border-[#C4A482]/20"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span>{step.stepNumber}</span>
                  )}
                </div>
                <div className="flex flex-col md:items-center min-w-0">
                  <span
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      isCompleted ? "text-brand-brown font-bold" : "text-[#7D6B5E]/60"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] text-[#768C3A] font-semibold mt-0.5 uppercase tracking-wider">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 shadow-sm text-left">
          <span className="text-[10px] sm:text-xs font-bold text-brand-brown/70 tracking-widest uppercase block mb-3">
            Shipping Address
          </span>
          <h4 className="font-serif text-sm sm:text-base font-bold text-brand-brown mb-1.5">
            {order.shippingAddress.name}
          </h4>
          {order.shippingAddress.company && (
            <p className="text-xs sm:text-sm text-[#7D6B5E] mb-1 font-medium">
              {order.shippingAddress.company}
            </p>
          )}
          <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed mb-4">
            {order.shippingAddress.addressLine}
          </p>
          <div className="border-t border-[#C4A482]/10 pt-3 space-y-1 text-xs text-[#7D6B5E]">
            <p>
              Email:{" "}
              <span className="font-semibold text-[#3A2418]">{order.shippingAddress.email}</span>
            </p>
            <p>
              Phone:{" "}
              <span className="font-semibold text-[#3A2418]">{order.shippingAddress.phone}</span>
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 shadow-sm text-left">
          <span className="text-[10px] sm:text-xs font-bold text-brand-brown/70 tracking-widest uppercase block mb-3">
            Billing Address
          </span>
          <h4 className="font-serif text-sm sm:text-base font-bold text-brand-brown mb-1.5">
            {order.billingAddress.name}
          </h4>
          {order.billingAddress.company && (
            <p className="text-xs sm:text-sm text-[#7D6B5E] mb-1 font-medium">
              {order.billingAddress.company}
            </p>
          )}
          <p className="text-xs sm:text-sm text-[#7D6B5E] leading-relaxed mb-4">
            {order.billingAddress.addressLine}
          </p>
          <div className="border-t border-[#C4A482]/10 pt-3 space-y-1 text-xs text-[#7D6B5E]">
            <p>
              Email:{" "}
              <span className="font-semibold text-[#3A2418]">{order.billingAddress.email}</span>
            </p>
            <p>
              Phone:{" "}
              <span className="font-semibold text-[#3A2418]">{order.billingAddress.phone}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-brown mb-1">Order Items</h3>

          <div className="hidden sm:block overflow-hidden border border-[#C4A482]/20 rounded-2xl bg-white">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F6F1E9] text-brand-brown font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                  <th className="py-3 px-4 border-b border-[#C4A482]/20">Product</th>
                  <th className="py-3 px-4 border-b border-[#C4A482]/20">Weight</th>
                  <th className="py-3 px-4 border-b border-[#C4A482]/20">Price</th>
                  <th className="py-3 px-4 border-b border-[#C4A482]/20">Qty</th>
                  <th className="py-3 px-4 border-b border-[#C4A482]/20 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C4A482]/15 text-[#3A2418]">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.005] transition-colors">
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 border border-[#C4A482]/20 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-semibold text-brand-brown">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle font-medium text-[#7D6B5E]">
                      {item.weight}
                    </td>
                    <td className="py-4 px-4 align-middle font-medium text-[#7D6B5E]">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 align-middle font-semibold text-[#3A2418]">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-4 align-middle font-bold text-brand-brown text-right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-3 bg-white border border-[#C4A482]/20 rounded-xl"
              >
                <div className="w-16 h-16 bg-gray-50 border border-[#C4A482]/20 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-brand-brown text-xs line-clamp-2 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#7D6B5E] mt-1 font-medium">
                    Weight: <span className="text-[#3A2418]">{item.weight}</span>
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[11px] text-[#7D6B5E] font-medium">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="text-xs font-bold text-brand-brown">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-brown mb-1 lg:opacity-0 pointer-events-none select-none">
            Summary Details
          </h3>
          <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-5 shadow-sm">
            <h4 className="font-serif text-sm sm:text-base font-bold text-brand-brown pb-3 border-b border-[#C4A482]/10 mb-4">
              Order Summary
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#7D6B5E]">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span className="font-semibold text-[#3A2418]">₹{order.subtotal.toFixed(2)}</span>
              </div>
              {order.gst !== undefined && (
                <div className="flex justify-between font-medium">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-[#3A2418]">₹{order.gst.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span>Shipping</span>
                <span className="font-semibold text-[#3A2418]">
                  {order.shippingCost === undefined || order.shippingCost === 0
                    ? "Free"
                    : `₹${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-[#C4A482]/10 pt-3 mt-3 flex justify-between items-baseline">
                <span className="font-serif text-sm sm:text-base font-bold text-brand-brown">
                  Total
                </span>
                <span className="font-poppins text-base sm:text-lg font-bold text-brand-brown">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-[#F6F1E9] rounded-xl p-3.5 mt-5 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-brand-brown font-semibold">
                <CreditCard size={15} />
                <span>Payment Method</span>
              </div>
              <p className="text-[#7D6B5E] pl-6 font-medium leading-relaxed">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
