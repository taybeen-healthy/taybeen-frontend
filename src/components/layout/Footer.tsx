import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-bg border-t border-[#E5E5E5] lg:border-t-0 pt-10 lg:pt-12 pb-10 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        <div className="hidden lg:block border-t border-[#A69797] mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 lg:mb-8">

          <div className="space-y-6 text-left">
            <div className="flex justify-start">
              <Image
                src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
                alt="Taybeen Logo"
                width={160}
                height={80}
                className="h-20 lg:h-[72px] w-auto object-contain"
              />
            </div>
            <p className="text-brand-brown-dark font-poppins text-sm leading-relaxed max-w-xs">
              India&apos;s most trusted source for premium, authenticated date varieties — sourced directly from Saudi Arabia, Jordan, and Iran.
            </p>
            <div className="flex items-center justify-start gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-brand-green-pale flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:pt-10 xl:pt-0">
            <h4 className="text-brand-brown font-poppins font-semibold uppercase text-sm md:text-base">OUR PRODUCTS</h4>
            <ul className="space-y-3 text-brand-brown font-poppins text-sm md:text-base">
              <li><a href="#" className="hover:text-brand-primary">Premium Collection</a></li>
              <li><a href="#" className="hover:text-brand-primary">Festive Hampers</a></li>
              <li><a href="#" className="hover:text-brand-primary">Corporate Gifting</a></li>
              <li><a href="#" className="hover:text-brand-primary">Wellness Boxes</a></li>
              <li><a href="#" className="hover:text-brand-primary">Custom Orders</a></li>
            </ul>
          </div>

          <div className="space-y-6 lg:pt-10 xl:pt-0">
            <h4 className="text-brand-brown font-poppins font-semibold uppercase text-sm md:text-base">SUPPORT</h4>
            <ul className="space-y-3 text-brand-brown font-poppins text-sm md:text-base">
              <li><a href="#" className="hover:text-brand-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-primary">Shipping &amp; Returns</a></li>
              <li><a href="#" className="hover:text-brand-primary">Track Order</a></li>
              <li><Link href="/contact" className="hover:text-brand-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-6 lg:pt-10 xl:pt-0">
            <h4 className="text-brand-brown font-poppins font-semibold uppercase text-sm md:text-base">COMPANY</h4>
            <ul className="space-y-3 text-brand-brown font-poppins text-sm md:text-base">
              <li><a href="#" className="hover:text-brand-primary">Our Story</a></li>
              <li><a href="#" className="hover:text-brand-primary">Sourcing &amp; Quality</a></li>
              <li><a href="#" className="hover:text-brand-primary">Certifications</a></li>
            </ul>
          </div>



        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-8 lg:mb-16 max-w-2xl mx-auto">
          <p className="text-brand-brown font-serif font-bold text-xl md:text-[1.75rem] leading-snug lg:whitespace-nowrap">
            Be the first to know about <span className="text-brand-primary">new collections</span> and <span className="text-brand-primary">exclusive offers!</span>
          </p>
          <div className="relative w-full max-w-xl">
            <input
              type="email"
              placeholder="your@gmail.com"
              className="w-full bg-[#F7A503]/10 border border-black/35 rounded-full py-3.5 px-6 pr-32 sm:pr-36 font-poppins text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-primary text-sm"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-green-light text-white px-5 md:px-6 py-2 rounded-full font-poppins text-xs md:text-sm hover:bg-opacity-90 transition-all font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        <div className="pt-8 lg:pt-0 border-t lg:border-t-0 border-[#A69797] flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
          <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">© 2026 Taybeen Premium Dates. All rights reserved.</p>
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
