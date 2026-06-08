"use client";

import { useState } from "react";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F1E9] bg-opacity-0 backdrop-blur-md px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-16 py-4 md:py-5 lg:py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
            alt="Taybeen Logo"
            className="h-[42px] md:h-12 lg:h-[52px] xl:h-[60px] 2xl:h-[68px] w-auto"
          />
        </div>

        <div className="hidden lg:flex items-center space-x-12">
          <a href="#" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Home</a>
          <a href="#" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Our Story</a>
          <a href="#" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Our Products</a>
          <a href="#" className="font-poppins font-medium text-base xl:text-lg text-brand-brown/90 hover:text-brand-brown transition-colors duration-200">Contact Us</a>
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
          <button className="text-brand-brown hover:text-brand-brown/70 transition-colors">
            <User size={24} className="md:w-8 md:h-8" strokeWidth={2} />
          </button>
          <div className="relative">
            <button className="text-brand-brown hover:text-brand-brown/70 transition-colors">
              <ShoppingCart size={24} className="md:w-8 md:h-8" strokeWidth={2} />
            </button>
            <span className="absolute -top-1 -right-1 bg-brand-primary w-2 md:w-2.5 h-2 md:h-2.5 rounded-full border border-white"></span>
          </div>

          <button
            className="lg:hidden text-brand-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#F6F1E9] border-t border-brand-brown/10 p-6 flex flex-col space-y-4 shadow-xl z-50"
          >
            <a href="#" className="font-poppins font-bold text-lg text-brand-brown">Home</a>
            <a href="#" className="font-poppins font-medium text-lg text-brand-brown/60 hover:text-brand-brown transition-colors duration-200">Our Story</a>
            <a href="#" className="font-poppins font-medium text-lg text-brand-brown/60 hover:text-brand-brown transition-colors duration-200">Our Products</a>
            <a href="#" className="font-poppins font-medium text-lg text-brand-brown/60 hover:text-brand-brown transition-colors duration-200">Contact Us</a>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};
