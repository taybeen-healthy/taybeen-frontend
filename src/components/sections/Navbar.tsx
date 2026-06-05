/**
 * Navbar Section — Fixed navigation bar with logo, desktop links, icons, and mobile menu.
 * Uses useState for mobile hamburger menu toggle.
 * Migrated from TB-Dualite React project.
 */

"use client";

import { useState } from "react";
import { User, ShoppingCart, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  /* Track mobile menu open/close state */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F1E9] bg-opacity-70 backdrop-blur-md px-4 md:px-24 py-4 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
            alt="Taybeen Logo"
            className="h-8 md:h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-12">
          <a href="#" className="font-poppins font-bold text-xl text-brand-brown">Home</a>
          <a href="#" className="font-poppins font-normal text-xl text-brand-brown">Our Story</a>
          <a href="#" className="font-poppins font-normal text-xl text-brand-brown">Our Products</a>
          <a href="#" className="font-poppins font-normal text-xl text-brand-brown">Contact Us</a>
        </div>

        {/* Action Icons + Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <button className="text-brand-brown hover:opacity-70 transition-opacity">
            <User size={24} className="md:w-8 md:h-8" strokeWidth={2} />
          </button>
          <div className="relative">
            <button className="text-brand-brown hover:opacity-70 transition-opacity">
              <ShoppingCart size={24} className="md:w-8 md:h-8" strokeWidth={2} />
            </button>
            {/* Cart notification dot */}
            <span className="absolute -top-1 -right-1 bg-brand-gold w-2 md:w-2.5 h-2 md:h-2.5 rounded-full border border-white"></span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-brand-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#F6F1E9] border-t border-brand-brown/10 p-6 flex flex-col space-y-4 shadow-xl">
          <a href="#" className="font-poppins font-bold text-lg text-brand-brown">Home</a>
          <a href="#" className="font-poppins font-normal text-lg text-brand-brown">Our Story</a>
          <a href="#" className="font-poppins font-normal text-lg text-brand-brown">Our Products</a>
          <a href="#" className="font-poppins font-normal text-lg text-brand-brown">Contact Us</a>
        </div>
      )}
    </nav>
  );
};
