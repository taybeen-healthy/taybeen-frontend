"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/features/cart/CartDrawer";
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
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#F6F1E9] bg-opacity-0 px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-16 py-4 md:py-5 lg:py-4 ${isMenuOpen ? "backdrop-blur-none lg:backdrop-blur-md" : "backdrop-blur-md"}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
              alt="Taybeen Logo"
              width={150}
              height={68}
              className="h-[42px] md:h-12 lg:h-[52px] xl:h-[60px] 2xl:h-[68px] w-auto object-contain"
              priority
            />
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            <Link href="/" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Home</Link>
            <a href="#" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Our Story</a>
            <Link href="/products" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Our Products</Link>
            <a href="#" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Contact Us</a>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <button className="hidden lg:block text-brand-brown hover:text-brand-brown/70 transition-colors">
              <User size={24} className="md:w-8 md:h-8" strokeWidth={2} />
            </button>
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-brand-brown hover:text-brand-brown/70 transition-colors"
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
              transition={{ duration: 0.50, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 left-0 right-0 bg-[#FDFAF3] rounded-b-[20px] z-[45] flex flex-col px-6 pt-24 pb-8 shadow-premium overflow-hidden"
            >
              <div className="flex flex-col">
                <div className="border-t border-[#5A3E2B]/15" />
                
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-brand-brown hover:text-brand-brown/80 transition-colors"
                >
                  <span>Home</span>
                  <ArrowRight size={20} className="text-brand-brown" strokeWidth={1.2} />
                </Link>
                
                <div className="border-t border-[#5A3E2B]/15" />
                
                <a
                  href="#"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-brand-brown hover:text-brand-brown/80 transition-colors"
                >
                  <span>Our Story</span>
                  <ArrowRight size={20} className="text-brand-brown" strokeWidth={1.2} />
                </a>
                
                <div className="border-t border-[#5A3E2B]/15" />
                
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-brand-brown hover:text-brand-brown/80 transition-colors"
                >
                  <span>Our Products</span>
                  <ArrowRight size={20} className="text-brand-brown" strokeWidth={1.2} />
                </Link>
                
                <div className="border-t border-[#5A3E2B]/15" />

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-between py-5 font-poppins text-lg font-medium text-brand-brown hover:text-brand-brown/80 transition-colors"
                >
                  <span>Cart</span>
                  <ArrowRight size={20} className="text-brand-brown" strokeWidth={1.2} />
                </a>
                
                <div className="border-t border-[#5A3E2B]/15" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-3.5 px-4 rounded-xl border border-[#5A3E2B]/40 font-poppins font-semibold text-sm text-[#5A3E2B] bg-[#FDFAF3] hover:bg-black/5 transition-colors text-center"
                >
                  My Account
                </a>
                
                <a
                  href="#"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#5A3E2B] font-poppins font-semibold text-sm text-[#FDFAF3] hover:bg-[#432E20] transition-colors text-center"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
