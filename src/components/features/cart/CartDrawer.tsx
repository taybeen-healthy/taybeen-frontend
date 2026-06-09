"use client";

import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
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
            className="fixed inset-y-0 right-0 w-full max-w-[450px] bg-[#FDFAF3] z-[55] shadow-2xl flex flex-col"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-[#5A3E2B]/15">
              <div className="flex items-center text-brand-brown">
                <ShoppingCart size={22} className="mr-3" strokeWidth={1.5} />
                <span className="font-poppins font-bold text-lg sm:text-xl">Your Cart</span>
              </div>

              <button
                onClick={onClose}
                className="bg-white rounded-full w-10 h-10 shadow-sm border border-gray-100 flex items-center justify-center text-brand-brown hover:bg-white/95 focus:outline-none transition-all"
              >
                <X size={18} className="text-[#3A2418]" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
              <Image
                src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
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
                className="w-full max-w-[280px] bg-[#5A3E2B] font-poppins font-semibold text-base text-[#FDFAF3] py-3.5 px-6 rounded-xl hover:bg-[#432E20] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
