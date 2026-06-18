"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Modal } from "@/components/ui/Modal";
import { orderHistory, affiliateDashboardData } from "@/data/user/myAccountData";
import { AccountProfileForm, BillingAddressForm } from "@/types/myAccount";
import { Hero } from "@/components/layout/Hero";
import {
  AccountSidebar,
  AccountDashboard,
  RecentOrderHistory,
  AccountSettingsForm,
  OrderDetailView,
  AffiliateDashboard,
} from "@/components/user/my-account";

export const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const [profile, setProfile] = useState<AccountProfileForm>({
    firstName: "Maryam",
    lastName: "Ali",
    email: "maryam.ali@gmail.com",
    phone: "+919876543210",
    avatarUrl: undefined,
  });

  const [billing, setBilling] = useState<BillingAddressForm>({
    firstName: "Maryam",
    lastName: "Ali",
    streetAddress: "Flat 402, Green Valley Apartments, Baner, Pune",
    country: "India",
    stateProvince: "Maharashtra",
    postalCode: "411045",
    email: "1234@gmil.com",
    phone: "+919876543210",
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("taybeen_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      const storedBilling = localStorage.getItem("taybeen_billing");
      if (storedBilling) {
        setBilling(JSON.parse(storedBilling));
      }
    } catch (e) {
      console.error("Failed to load profile/billing from localStorage", e);
    }
  }, []);

  const handleSaveProfile = (newProfile: AccountProfileForm) => {
    setProfile(newProfile);
    try {
      localStorage.setItem("taybeen_profile", JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveBilling = (newBilling: BillingAddressForm) => {
    setBilling(newBilling);
    try {
      localStorage.setItem("taybeen_billing", JSON.stringify(newBilling));
    } catch (e) {
      console.error(e);
    }
  };

  const [orders] = useState(orderHistory);

  const handleTabChange = (tab: string) => {
    if (tab === "logout") {
      setIsLogoutModalOpen(true);
    } else {
      setActiveTab(tab);
      setSelectedOrderId(null);
    }
  };

  const handleViewDetails = (orderId: string) => {
    setActiveTab("orders");
    setSelectedOrderId(orderId);
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />
        
        <Hero />

        <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 pb-20 pt-8 sm:pt-10">
          
          <div className="flex flex-col lg:hidden gap-6">
            <AccountSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === "dashboard" && (
              <AccountDashboard
                profile={profile}
                billing={billing}
                orders={orders}
                onEditProfile={() => setActiveTab("settings")}
                onEditBilling={() => setActiveTab("settings")}
                onTabChange={handleTabChange}
                onViewDetails={handleViewDetails}
              />
            )}
            {activeTab === "settings" && (
              <AccountSettingsForm
                profile={profile}
                billing={billing}
                onSaveProfile={handleSaveProfile}
                onSaveBilling={handleSaveBilling}
              />
            )}
            {activeTab === "orders" && (
              selectedOrderId ? (
                <OrderDetailView
                  orderId={selectedOrderId}
                  onBack={() => setSelectedOrderId(null)}
                />
              ) : (
                <RecentOrderHistory
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  orders={orders}
                  onViewDetails={setSelectedOrderId}
                />
              )
            )}
            {activeTab === "affiliate" && (
              <AffiliateDashboard data={affiliateDashboardData} />
            )}
            {activeTab !== "dashboard" && activeTab !== "orders" && activeTab !== "settings" && activeTab !== "affiliate" && (
              <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 text-center font-poppins">
                <h3 className="font-serif text-lg font-bold text-brand-brown mb-2 capitalize">
                  {activeTab.replace("-", " ")}
                </h3>
                <p className="text-sm text-[#7D6B5E]">
                  This section is coming soon.
                </p>
              </div>
            )}
          </div>

          <div className="hidden lg:flex gap-8 items-start">
            <div className="w-[260px] xl:w-[280px] flex-shrink-0">
              <AccountSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            <div className="flex-1 flex flex-col gap-8">
              {activeTab === "dashboard" && (
                <AccountDashboard
                  profile={profile}
                  billing={billing}
                  orders={orders}
                  onEditProfile={() => setActiveTab("settings")}
                  onEditBilling={() => setActiveTab("settings")}
                  onTabChange={handleTabChange}
                  onViewDetails={handleViewDetails}
                />
              )}

              {activeTab === "orders" && (
                <div className="w-full">
                  {selectedOrderId ? (
                    <OrderDetailView
                      orderId={selectedOrderId}
                      onBack={() => setSelectedOrderId(null)}
                    />
                  ) : (
                    <RecentOrderHistory
                      activeTab={activeTab}
                      onTabChange={handleTabChange}
                      orders={orders}
                      onViewDetails={setSelectedOrderId}
                    />
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="w-full">
                  <AccountSettingsForm
                    profile={profile}
                    billing={billing}
                    onSaveProfile={handleSaveProfile}
                    onSaveBilling={handleSaveBilling}
                  />
                </div>
              )}

              {activeTab === "affiliate" && (
                <div className="w-full">
                  <AffiliateDashboard data={affiliateDashboardData} />
                </div>
              )}

              {activeTab !== "dashboard" && activeTab !== "orders" && activeTab !== "settings" && activeTab !== "affiliate" && (
                <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 text-center font-poppins">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-brand-brown mb-2 capitalize">
                    {activeTab.replace("-", " ")}
                  </h3>
                  <p className="text-sm text-[#7D6B5E]">
                    This section is coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>

        </main>
      </div>

      <Footer />

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        isSplit={false}
        className="p-6 text-center select-none font-poppins"
      >
        <div className="w-full space-y-5">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2 border border-red-100">
            <LogOut size={22} />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-xl font-bold text-brand-brown">
              Log Out
            </h3>
            <p className="text-sm text-[#7D6B5E]">
              Are you sure you want to log out of your account? Any unsaved changes will be lost.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-[#C4A482]/40 rounded-lg text-sm font-semibold text-[#7D6B5E] hover:bg-black/[0.02] active:scale-98 transition-all cursor-pointer focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsLogoutModalOpen(false);
                router.push("/");
              }}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow-md active:scale-98 transition-all cursor-pointer focus:outline-none"
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export default MyAccountPage;
