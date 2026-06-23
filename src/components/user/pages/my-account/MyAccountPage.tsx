"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, Users, Clock, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Modal } from "@/components/ui/Modal";
import { orderHistory, affiliateDashboardData } from "@/data/user/myAccountData";
import { AccountProfileForm, BillingAddressForm } from "@/types/myAccount";
import { Hero } from "@/components/layout/Hero";
import { apiClient } from "@/lib/apiClient";
import { removeCookie } from "@/utils/cookie";
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatarUrl: undefined,
  });

  const [billing, setBilling] = useState<BillingAddressForm>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    country: "",
    stateProvince: "",
    postalCode: "",
    email: "",
    phone: "",
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [affiliateData, setAffiliateData] = useState<any>(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAffiliate, setLoadingAffiliate] = useState(true);

  const renderAffiliateTab = () => {
    if (loadingAffiliate) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#5A3E2B]" />
        </div>
      );
    }

    if (!affiliateData) {
      return (
        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 sm:p-10 text-center font-poppins shadow-sm max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3A2418] to-[#1E110A] border-2 border-[#F7A503]/50 flex items-center justify-center shadow-lg text-[#F7A503]">
            <Users size={32} className="stroke-[1.75]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown text-center">
              Become a Taybeen Affiliate Partner
            </h3>
            <p className="text-sm text-[#7D6B5E] max-w-md mx-auto leading-relaxed text-center">
              Earn rewards by sharing Taybeen Premium Dates with your audience. Access your
              custom coupon code, track orders in real-time, and get exclusive commissions.
            </p>
          </div>
          <button
            onClick={() => router.push("/partnerships")}
            className="px-6 py-3 bg-[#5A3E2B] hover:bg-[#462F20] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer border border-[#C4A482]/25 font-poppins"
          >
            Apply Now
          </button>
        </div>
      );
    }

    if (affiliateData.status === "Pending") {
      return (
        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 sm:p-10 text-center font-poppins shadow-sm max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center shadow-md text-amber-600">
            <Clock size={32} className="stroke-[1.75]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown text-center">
              Application Pending Review
            </h3>
            <p className="text-sm text-[#7D6B5E] max-w-md mx-auto leading-relaxed text-center">
              Thank you for applying! Your affiliate application is currently being reviewed by our team.
              We will notify you via email at <strong className="text-brand-brown">{affiliateData.email}</strong> once your account has been approved.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-[#5A3E2B] hover:bg-[#462F20] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer border border-[#C4A482]/25 font-poppins"
          >
            Back to Home
          </button>
        </div>
      );
    }

    if (
      affiliateData.status === "Rejected" ||
      affiliateData.status?.toLowerCase() === "rejected" ||
      (affiliateData.status === "Expired" &&
        (!affiliateData.couponCode ||
          affiliateData.couponCode === "Not generated" ||
          affiliateData.couponCode === "-"))
    ) {
      return (
        <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 sm:p-10 text-center font-poppins shadow-sm max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center shadow-md text-red-600">
            <AlertCircle size={32} className="stroke-[1.75]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown text-center">
              Application Rejected
            </h3>
            <p className="text-sm text-[#7D6B5E] max-w-md mx-auto leading-relaxed text-center">
              Your form has been rejected. If you have any questions, please reach out to our support team.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-[#5A3E2B] hover:bg-[#462F20] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer border border-[#C4A482]/25 font-poppins"
          >
            Back to Home
          </button>
        </div>
      );
    }

    // Status is Approved or Expired, render dashboard with mapped data
    const mappedData = {
      totalSales: affiliateData.salesAmount ?? 0,
      salesSince: affiliateData.joinedDate
        ? new Date(affiliateData.joinedDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      ordersPlaced: affiliateData.ordersCount ?? 0,
      couponCode: affiliateData.couponCode || "Not generated",
      couponStatus: affiliateData.status === "Approved" ? "Active" : "Inactive",
      couponDescription: affiliateData.discountOffered || "10% off for anyone who uses your code",
      referralLink: affiliateData.refLink || "",
      details: {
        fullName: affiliateData.name,
        email: affiliateData.email,
        phone: affiliateData.phone,
        city: affiliateData.city || "",
        occupation: affiliateData.occupation || "",
        approvedOn: affiliateData.joinedDate
          ? new Date(affiliateData.joinedDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "N/A",
      },
      orders: Array.isArray(affiliateData.orders)
        ? affiliateData.orders.map((ord: any) => ({
            orderId: ord.hexId || ord.id,
            date: new Date(ord.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            item:
              ord.items?.map((i: any) => `${i.name} x${i.quantity}`).join(", ") ||
              "Dates Package",
            amount: ord.total ?? 0,
            paymentStatus: ord.paymentStatus || "Pending",
          }))
        : [],
      expiredCouponCode: affiliateData.expiredCouponCode,
      expiredCouponDiscount: affiliateData.expiredCouponDiscount,
      expiredCouponExpiryDate: affiliateData.expiredCouponExpiryDate,
    };

    return <AffiliateDashboard data={mappedData as any} />;
  };

  useEffect(() => {
    // Fetch customer profile & billing info
    apiClient
      .get("/customers/me")
      .then((res) => {
        const cust = res.data?.data || res.data;
        if (cust) {
          const nameParts = (cust.name || "").trim().split(/\s+/);
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setProfile({
            firstName,
            lastName,
            email: cust.email || "",
            phone: cust.phone || "",
            avatarUrl: cust.avatarUrl || undefined,
          });

          if (cust.billingAddress) {
            setBilling({
              firstName: cust.billingAddress.firstName || "",
              lastName: cust.billingAddress.lastName || "",
              streetAddress: cust.billingAddress.street || cust.billingAddress.streetAddress || "",
              city: cust.billingAddress.city || "",
              country: cust.billingAddress.country || "",
              stateProvince: cust.billingAddress.state || cust.billingAddress.stateProvince || "",
              postalCode: cust.billingAddress.postalCode || "",
              email: cust.billingAddress.email || "",
              phone: cust.billingAddress.phone || "",
            });
          } else {
            const storedBilling = localStorage.getItem("taybeen_billing");
            if (storedBilling) {
              setBilling(JSON.parse(storedBilling));
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching customer profile:", err);
        // Fallback to local storage
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
      });

    // Fetch customer orders
    console.log("Fetching customer orders...");
    apiClient
      .get("/orders")
      .then((res) => {
        console.log("Get orders response payload:", res.data);
        const ordersList = Array.isArray(res.data?.data?.data)
          ? res.data.data.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : Array.isArray(res.data)
              ? res.data
              : [];

        console.log("Resolved ordersList array:", ordersList);
        const mappedOrders = ordersList.map((ord: any) => ({
          id: ord.id || ord._id?.toString(),
          hexId: ord.hexId || ord.id,
          date: ord.placedOn || ord.date || "Just now",
          total: typeof ord.total === "number" ? ord.total : Number(ord.total) || 0,
          status: ord.status,
        }));
        console.log("Mapped orders for UI state:", mappedOrders);
        setOrders(mappedOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoadingOrders(false));

    // Fetch affiliate dashboard
    apiClient
      .get("/affiliates/my-dashboard")
      .then((res) => {
        const dashboardData = res.data?.data || res.data;
        if (dashboardData && res.data?.data !== null) {
          setAffiliateData(dashboardData);
        } else {
          setAffiliateData(null);
        }
      })
      .catch((err) => {
        console.warn("Affiliate dashboard not found or error fetching:", err?.message || err);
        setAffiliateData(null);
      })
      .finally(() => setLoadingAffiliate(false));
  }, []);

  const handleSaveProfile = async (newProfile: AccountProfileForm) => {
    setProfile(newProfile);
    try {
      localStorage.setItem("taybeen_profile", JSON.stringify(newProfile));
      localStorage.removeItem("taybeen_checkout_draft_shipping");
      localStorage.removeItem("taybeen_checkout_draft_billing");
      localStorage.removeItem("taybeen_checkout_draft_is_billing_same");
      await apiClient.put("/customers/profile", {
        name: `${newProfile.firstName} ${newProfile.lastName}`.trim(),
        phone: newProfile.phone,
        avatarUrl: newProfile.avatarUrl,
      });
    } catch (e) {
      console.error("Error saving profile to API:", e);
    }
  };

  const handleSaveBilling = async (newBilling: BillingAddressForm) => {
    setBilling(newBilling);
    try {
      localStorage.setItem("taybeen_billing", JSON.stringify(newBilling));
      localStorage.removeItem("taybeen_checkout_draft_shipping");
      localStorage.removeItem("taybeen_checkout_draft_billing");
      localStorage.removeItem("taybeen_checkout_draft_is_billing_same");
      await apiClient.put("/customers/billing", {
        billingAddress: {
          firstName: newBilling.firstName,
          lastName: newBilling.lastName,
          streetAddress: newBilling.streetAddress,
          city: newBilling.city || "Pune",
          stateProvince: newBilling.stateProvince,
          country: newBilling.country,
          postalCode: newBilling.postalCode,
          phone: newBilling.phone,
          email: newBilling.email || profile.email,
        },
      });
    } catch (e) {
      console.error("Error saving billing to API:", e);
    }
  };

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
            {activeTab === "orders" &&
              (selectedOrderId ? (
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
              ))}
            {activeTab === "affiliate" && renderAffiliateTab()}
            {activeTab !== "dashboard" &&
              activeTab !== "orders" &&
              activeTab !== "settings" &&
              activeTab !== "affiliate" && (
                <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 text-center font-poppins">
                  <h3 className="font-serif text-lg font-bold text-brand-brown mb-2 capitalize">
                    {activeTab.replace("-", " ")}
                  </h3>
                  <p className="text-sm text-[#7D6B5E]">This section is coming soon.</p>
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
                  {renderAffiliateTab()}
                </div>
              )}

              {activeTab !== "dashboard" &&
                activeTab !== "orders" &&
                activeTab !== "settings" &&
                activeTab !== "affiliate" && (
                  <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-8 text-center font-poppins">
                    <h3 className="font-serif text-lg md:text-xl font-bold text-brand-brown mb-2 capitalize">
                      {activeTab.replace("-", " ")}
                    </h3>
                    <p className="text-sm text-[#7D6B5E]">This section is coming soon.</p>
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
            <h3 className="font-serif text-xl font-bold text-brand-brown">Log Out</h3>
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
              onClick={async () => {
                setIsLogoutModalOpen(false);
                try {
                  await apiClient.post("/auth/logout");
                } catch (e) {
                  console.error("Logout API error:", e);
                } finally {
                  removeCookie("taybeen_access_token");
                  removeCookie("taybeen_refresh_token");
                  localStorage.removeItem("taybeen_profile");
                  localStorage.removeItem("taybeen_billing");
                  router.push("/");
                }
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
