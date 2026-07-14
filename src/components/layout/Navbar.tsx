"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircleUserRound,
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  LayoutGrid,
  History,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/user/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, removeCookie } from "@/lib/utils/cookie";
import { apiClient } from "@/lib/apiClient";
import { useToast } from "@/hooks";

export const Navbar: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const token = getCookie("taybeen_access_token");
    setIsLoggedIn(!!token);
    if (token) {
      const stored = localStorage.getItem("taybeen_profile");
      if (stored) {
        try {
          setUserProfile(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse user profile", e);
        }
      }
    } else {
      setUserProfile(null);
    }
  }, [pathname]);

  // Track session history for signin redirection
  useEffect(() => {
    const authRoutes = ["/signin", "/signup", "/reset-password", "/auth/callback"];
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    if (!isAuthRoute) {
      sessionStorage.setItem("taybeen_last_visited", pathname);
    }
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#profile-dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await apiClient.post("/auth/logout");
    } catch (e) {
      console.error("Logout API error:", e);
    } finally {
      removeCookie("taybeen_access_token");
      removeCookie("taybeen_refresh_token");
      localStorage.removeItem("taybeen_profile");
      localStorage.removeItem("taybeen_billing");
      setIsLoggedIn(false);
      setUserProfile(null);
      toast.success("Logged out successfully!");
      router.push("/");
    }
  };

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

  const getLinkClass = (path: string) => {
    const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return `font-poppins font-normal text-[18px] transition-all duration-200 link-underline ${
      active ? "text-[#5A4200] font-semibold" : "text-[#5A4200]/70 hover:text-[#5A4200]"
    }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#F6F1E9] bg-opacity-0 py-4 md:py-5 lg:py-4 ${isMenuOpen ? "backdrop-blur-none lg:backdrop-blur-md" : "backdrop-blur-md"}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12 flex items-center justify-between">
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
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/our-story" className={getLinkClass("/our-story")}>
              Our Story
            </Link>
            <Link href="/products" className={getLinkClass("/products")}>
              Our Products
            </Link>
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            {isLoggedIn ? (
              <div
                className="hidden lg:flex items-center justify-center relative"
                id="profile-dropdown-container"
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center text-brand-brown hover:text-brand-brown/70 transition-colors focus:outline-none"
                  aria-label="Toggle profile menu"
                >
                  <CircleUserRound size={24} className="md:w-8 md:h-8" strokeWidth={2} />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-64 bg-[#FDFAF3] border border-[#C4A482]/25 rounded-2xl p-3 shadow-premium z-50 text-left font-poppins"
                    >
                      {userProfile && (
                        <div className="px-3 py-2 border-b border-[#C4A482]/15 mb-2 select-none">
                          <p className="text-[10px] font-bold text-[#8D7F75]/80 uppercase tracking-wider">
                            Signed in as
                          </p>
                          <p className="text-sm font-bold text-brand-brown truncate">
                            {userProfile.firstName} {userProfile.lastName}
                          </p>
                          <p className="text-xs text-[#7D6B5E] truncate">{userProfile.email}</p>
                        </div>
                      )}

                      <ul className="space-y-1">
                        <li>
                          <Link
                            href="/my-account?tab=dashboard"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#7D6B5E] hover:text-brand-brown hover:bg-black/5 font-medium transition-colors"
                          >
                            <LayoutGrid size={16} />
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/my-account?tab=orders"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#7D6B5E] hover:text-brand-brown hover:bg-black/5 font-medium transition-colors"
                          >
                            <History size={16} />
                            <span>Order history</span>
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setIsCartOpen(true);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#7D6B5E] hover:text-brand-brown hover:bg-black/5 font-medium transition-colors text-left"
                          >
                            <ShoppingCart size={16} />
                            <span>Shopping Cart</span>
                          </button>
                        </li>
                        <li>
                          <Link
                            href="/my-account?tab=affiliate"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#7D6B5E] hover:text-brand-brown hover:bg-black/5 font-medium transition-colors"
                          >
                            <Users size={16} />
                            <span>Affiliate & Coupon</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/my-account?tab=settings"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#7D6B5E] hover:text-brand-brown hover:bg-black/5 font-medium transition-colors"
                          >
                            <Settings size={16} />
                            <span>Settings</span>
                          </Link>
                        </li>
                        <div className="border-t border-[#C4A482]/15 my-2" />
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:text-red-700 hover:bg-red-50 font-medium transition-colors text-left"
                          >
                            <LogOut size={16} />
                            <span>Log-out</span>
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={`/signin?redirect=${encodeURIComponent(pathname)}`}
                className="hidden lg:flex items-center justify-center text-brand-brown hover:text-brand-brown/70 transition-colors"
                aria-label="Sign in"
              >
                <CircleUserRound size={24} className="md:w-8 md:h-8" strokeWidth={2} />
              </Link>
            )}
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
                {isLoggedIn ? (
                  <Link
                    href="/my-account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center py-3.5 px-4 rounded-xl border border-typo1/40 font-poppins font-semibold text-sm text-typo1 bg-[#FDFAF3] hover:bg-black/5 transition-colors text-center"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    href={`/signin?redirect=${encodeURIComponent(pathname)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center py-3.5 px-4 rounded-xl border border-typo1/40 font-poppins font-semibold text-sm text-typo1 bg-[#FDFAF3] hover:bg-black/5 transition-colors text-center"
                  >
                    Sign In
                  </Link>
                )}

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
