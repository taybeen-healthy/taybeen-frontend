"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { formatIndianCurrency } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatOrderDate = (date: Date): string => {
  const day = date.getDate();
  const monthNames = ["June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May"];
  const actualMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = actualMonths[date.getMonth()];
  const year = date.getFullYear();

  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) suffix = "st";
  else if (day === 2 || day === 22) suffix = "nd";
  else if (day === 3 || day === 23) suffix = "rd";

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day}${suffix} ${month} ${year} ${hours}:${minutes} ${ampm}`;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartCount,
    clearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.priceAtSelection * item.quantity,
    0
  );

  const shippingThreshold = 999;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 79;
  const total = subtotal + shippingCost;
  const remainingForFreeShipping = Math.max(shippingThreshold - subtotal, 0);
  const freeShippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 w-full max-w-[450px] bg-[#FDFAF3] z-[55] shadow-2xl flex flex-col select-none border-l border-[#F2EADA]"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-[#5A3E2B]/15 bg-white">
              <div className="flex items-center text-brand-brown gap-2.5">
                <ShoppingCart size={22} strokeWidth={2} />
                <span className="font-poppins font-bold text-lg sm:text-xl text-[#3A2418]">
                  Your Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-[#F7A503] text-white font-poppins font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="bg-white rounded-full w-10 h-10 shadow-sm border border-[#F2EADA] flex items-center justify-center text-[#3A2418] hover:bg-gray-50 focus:outline-none transition-all cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {cartItems.length > 0 && (
              <div className="bg-[#FDFAF3] px-6 py-4 border-b border-[#5A3E2B]/10">
                <div className="flex justify-between items-center text-xs font-poppins mb-2">
                  <span className="text-brand-green-light font-normal">
                    {remainingForFreeShipping > 0
                      ? `Add ₹${remainingForFreeShipping} more for free shipping`
                      : "You have unlocked free shipping!"}
                  </span>
                  <span className="text-brand-green-light font-normal">
                    ₹{subtotal} / ₹{shippingThreshold}
                  </span>
                </div>
                <div className="w-full bg-[#EAE4D8] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#F7A503] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
                <Image
                  src="/TaybeenLogo.png"
                  alt="Taybeen Logo"
                  width={140}
                  height={64}
                  className="h-12 w-auto object-contain mb-6"
                  priority
                />

                <h3 className="font-poppins font-semibold text-xl text-[#3A2418] mb-2">
                  Your cart is empty
                </h3>

                <p className="font-poppins text-brand-green-light font-normal text-sm sm:text-base max-w-xs mb-8">
                  Discover our premium date varieties and gift hampers.
                </p>

                <button
                  onClick={onClose}
                  className="w-full max-w-[280px] bg-[#5A3E2B] font-poppins font-semibold text-base text-[#FDFAF3] py-3.5 px-6 rounded-xl hover:bg-[#432E20] transition-colors cursor-pointer"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {cartItems.map((item, index) => {
                  const itemPrice = item.priceAtSelection * item.quantity;
                  const itemImage = item.product.images?.[0] || item.product.image;

                  const displayName = item.product.name.includes("Mejdool")
                    ? "Mejdool Dates"
                    : item.product.name.includes("Ajwa")
                      ? "Ajwa Dates"
                      : item.product.name;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}-${index}`}
                      className="bg-white rounded-2xl border border-[#F2EADA] shadow-sm p-4 flex gap-4 relative items-center"
                    >
                      <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F5F0E8] flex-shrink-0">
                        <Image
                          src={itemImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col text-left">
                        <h4 className="font-poppins font-bold text-sm sm:text-base text-[#3A2418] pr-6">
                          {displayName}
                        </h4>
                        <span className="text-xs font-poppins text-brand-green-light font-semibold mt-0.5">
                          {item.selectedWeight}
                        </span>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 border border-[#C4A482]/50 bg-white rounded-full py-1 px-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                              }
                              className="text-brand-brown hover:text-brand-primary active:scale-95 transition-transform"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="text-xs font-poppins font-bold text-brand-brown w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                              }
                              className="text-brand-brown hover:text-brand-primary active:scale-95 transition-transform"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>

                          <span className="font-poppins font-bold text-sm sm:text-base text-[#3A2418]">
                            ₹{formatIndianCurrency(itemPrice)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                        className="absolute top-4 right-4 w-7 h-7 bg-[#FFECEC] hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="border-t border-[#5A3E2B]/10 bg-white px-6 py-5 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center font-poppins text-sm text-[#7D6B5E]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#3A2418]">
                      ₹{formatIndianCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center font-poppins text-sm text-[#7D6B5E]">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#3A2418]">
                      {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="border-t border-[#5A3E2B]/10 my-2 pt-2.5 flex justify-between items-center font-poppins">
                    <span className="text-base font-bold text-[#3A2418]">Total</span>
                    <span className="text-lg font-bold text-[#3A2418]">
                      ₹{formatIndianCurrency(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#5A3E2B] hover:bg-[#483122] transition-colors text-white py-4 rounded-xl font-poppins font-bold text-sm tracking-wide shadow-md cursor-pointer text-center select-none active:scale-[0.98] focus:outline-none"
                >
                  Proceed to Checkout
                </button>

                <p className="text-[10px] sm:text-xs text-brand-green-light font-poppins font-medium text-center">
                  Secure checkout · COD available · Pan-India delivery
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
