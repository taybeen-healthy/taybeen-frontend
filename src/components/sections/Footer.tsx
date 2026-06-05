/**
 * Footer Section — Site footer with logo, social links, navigation columns,
 * newsletter subscription, and copyright bar.
 * Migrated from TB-Dualite React project.
 */

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-bg pt-16 md:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-24">

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">

          {/* Brand Column — Logo, description, social links */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <img
                src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
                alt="Taybeen Logo"
                className="h-10 md:h-12 w-auto"
              />
            </div>
            <p className="text-brand-brown-dark font-poppins text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              India&apos;s most trusted source for premium, authenticated date varieties — sourced directly from Saudi Arabia, Jordan, and Iran.
            </p>
            {/* Social media icons */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-brand-green-pale flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns — Products, Company, Support */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {/* Our Products */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-brand-brown font-poppins font-semibold uppercase text-sm md:text-base">OUR PRODUCTS</h4>
              <ul className="space-y-3 md:space-y-4 text-brand-brown font-poppins text-sm md:text-base">
                <li><a href="#" className="hover:text-brand-primary">Premium Collection</a></li>
                <li><a href="#" className="hover:text-brand-primary">Festive Hampers</a></li>
                <li><a href="#" className="hover:text-brand-primary">Corporate Gifting</a></li>
                <li><a href="#" className="hover:text-brand-primary">Wellness Boxes</a></li>
                <li><a href="#" className="hover:text-brand-primary">Custom Orders</a></li>
              </ul>
            </div>
            {/* Company */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-brand-brown font-poppins font-semibold uppercase text-sm md:text-base">COMPANY</h4>
              <ul className="space-y-3 md:space-y-4 text-brand-brown font-poppins text-sm md:text-base">
                <li><a href="#" className="hover:text-brand-primary">Our Story</a></li>
                <li><a href="#" className="hover:text-brand-primary">Sourcing &amp; Quality</a></li>
                <li><a href="#" className="hover:text-brand-primary">Certifications</a></li>
              </ul>
            </div>
            {/* Support */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-brand-brown font-poppins font-semibold uppercase text-sm md:text-base">SUPPORT</h4>
              <ul className="space-y-3 md:space-y-4 text-brand-brown font-poppins text-sm md:text-base">
                <li><a href="#" className="hover:text-brand-primary">FAQ</a></li>
                <li><a href="#" className="hover:text-brand-primary">Shipping &amp; Returns</a></li>
                <li><a href="#" className="hover:text-brand-primary">Track Order</a></li>
                <li><a href="#" className="hover:text-brand-primary">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription Column */}
          <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-brand-brown font-poppins font-semibold text-xl md:text-2xl leading-tight">
              Be the first to know about <span className="text-brand-primary">new collections</span> and <span className="text-brand-primary">exclusive offers!</span>
            </p>
            <div className="relative w-full max-w-sm">
              <input
                type="email"
                placeholder="your@gmail.com"
                className="w-full bg-[#F7A503]/10 border border-black/50 rounded-3xl py-3 px-6 pr-32 font-poppins text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-primary text-sm"
              />
              <button className="absolute right-1.5 top-1.5 bg-brand-green-light text-white px-4 md:px-6 py-1.5 rounded-3xl font-poppins text-xs md:text-sm hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Copyright Bar ── */}
        <div className="pt-8 border-t border-[#A69797] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">© 2026 Tevin Premium Dates. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-brand-green-light font-poppins text-[10px] md:text-xs">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
