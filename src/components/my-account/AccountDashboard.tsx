import React from "react";
import { AccountProfileCard } from "./AccountProfileCard";
import { BillingAddressCard } from "./BillingAddressCard";
import { RecentOrderHistory } from "./RecentOrderHistory";
import { OrderHistoryItem } from "@/types/myAccount";

interface AccountDashboardProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  billing: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    country: string;
    stateProvince: string;
    postalCode: string;
    email: string;
    phone: string;
  };
  orders: OrderHistoryItem[];
  onEditProfile: () => void;
  onEditBilling: () => void;
  onTabChange: (tab: string) => void;
  onViewDetails?: (orderId: string) => void;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  profile,
  billing,
  orders,
  onEditProfile,
  onEditBilling,
  onTabChange,
  onViewDetails,
}) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 xl:gap-8">
        <div className="h-full">
          <AccountProfileCard profile={profile} onEdit={onEditProfile} />
        </div>
        <div className="h-full">
          <BillingAddressCard billing={billing} onEdit={onEditBilling} />
        </div>
      </div>

      <div className="w-full">
        <RecentOrderHistory
          activeTab="dashboard"
          onTabChange={onTabChange}
          orders={orders}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  );
};

export default AccountDashboard;
