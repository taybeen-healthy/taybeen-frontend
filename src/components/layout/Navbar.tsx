"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/user/cart/CartDrawer";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isCartOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#F6F1E9] bg-opacity-0 px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-16 py-4 md:py-5 lg:py-4 ${isMenuOpen ? "backdrop-blur-none lg:backdrop-blur-md" : "backdrop-blur-md"}`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/TaybeenLogo.png"
                alt="Taybeen Logo"
                width={120}
                height={54}
                className="h-[36px] md:h-10 lg:h-[40px] xl:h-[44px] w-auto object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            <Link
              href="/"
              className="font-poppins font-medium text-[18px] text-[#5A4200] link-underline transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/our-story"
              className="font-poppins font-medium text-[18px] text-[#5A4200] link-underline transition-all duration-200"
            >
              Our Story
            </Link>
            <Link
              href="/products"
              className="font-poppins font-medium text-[18px] text-[#5A4200] link-underline transition-all duration-200"
            >
              Our Products
            </Link>
            <Link
              href="/contact"
              className="font-poppins font-medium text-[18px] text-[#5A4200] link-underline transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              href="/my-account"
              className="hidden lg:flex items-center justify-center text-brand-brown hover:text-brand-brown/70 transition-colors"
            >
              <CircleUserRound size={24} className="md:w-8 md:h-8" strokeWidth={2} />
            </Link>
            <div className="hidden lg:flex items-center justify-center relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-brand-brown hover:text-brand-brown/70 transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={24} className="md:w-8 md:h-8" strokeWidth={2} />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-primary min-w-[18px] h-[18px] px-1 rounded-full border border-white flex items-center justify-center text-[9px] font-bold text-white font-poppins">
                  {cartCount}
                </span>
              )}
            </div>

            <button
              className="lg:hidden text-brand-brown"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0% round 0px 0px 20px 20px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 0px 0px 20px 20px)" }}
              exit={{ clipPath: "inset(0% 0% 100% 0% round 0px 0px 20px 20px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 left-0 right-0 bg-[#FDFAF3] rounded-b-[20px] z-[45] flex flex-col px-6 pt-24 pb-8 shadow-premium overflow-hidden"
            >
              <div className="flex flex-col">
                <div className="border-t border-[#5A3E2B]/15" />

                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-typo1 hover:text-typo1/80 transition-colors"
                >
                  <span>Home</span>
                  <ArrowRight size={20} className="text-typo1" strokeWidth={1.2} />
                </Link>

                <div className="border-t border-[#5A3E2B]/15" />

                <Link
                  href="/our-story"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-typo1 hover:text-typo1/80 transition-colors"
                >
                  <span>Our Story</span>
                  <ArrowRight size={20} className="text-typo1" strokeWidth={1.2} />
                </Link>

                <div className="border-t border-[#5A3E2B]/15" />

                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-typo1 hover:text-typo1/80 transition-colors"
                >
                  <span>Our Products</span>
                  <ArrowRight size={20} className="text-typo1" strokeWidth={1.2} />
                </Link>

                <div className="border-t border-[#5A3E2B]/15" />

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-typo1 hover:text-typo1/80 transition-colors"
                >
                  <span>Cart</span>
                  <ArrowRight size={20} className="text-typo1" strokeWidth={1.2} />
                </a>

                <div className="border-t border-[#5A3E2B]/15" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <Link
                  href="/my-account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-3.5 px-4 rounded-xl border border-typo1/40 font-poppins font-semibold text-sm text-typo1 bg-[#FDFAF3] hover:bg-black/5 transition-colors text-center"
                >
                  My Account
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-typo1 font-poppins font-semibold text-sm text-btnText hover:bg-[#443200] transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
