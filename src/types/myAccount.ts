export interface OrderHistoryItem {
  id: string;
  date: string;
  total: number;
  status: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface BillingAddress {
  name: string;
  addressLine: string;
  email: string;
}

export interface AccountProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface BillingAddressForm {
  firstName: string;
  lastName: string;
  streetAddress: string;
  country: string;
  stateProvince: string;
  postalCode: string;
  email: string;
  phone: string;
}

export type MyAccountTab = "dashboard" | "orders" | "settings" | "affiliate";

export interface AffiliateOrder {
  orderId: string;
  date: string;
  item: string;
  amount: number;
  paymentStatus: string;
}

export interface AffiliateDetails {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  approvedOn: string;
}

export interface AffiliateDashboardInfo {
  totalSales: number;
  salesSince: string;
  ordersPlaced: number;
  couponCode: string;
  couponStatus: "Active" | "Inactive" | "Pending";
  couponDescription: string;
  referralLink: string;
  details: AffiliateDetails;
  orders: AffiliateOrder[];
  expiredCouponCode?: string;
  expiredCouponDiscount?: number;
  expiredCouponExpiryDate?: string;
}

export interface OrderDetailItem {
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

export interface OrderAddressBlock {
  name: string;
  company?: string;
  addressLine: string;
  email: string;
  phone: string;
}

export interface OrderDetail {
  id: string;
  dbId?: string;
  date: string;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus?: string;
  subtotal: number;
  gst?: number;
  shippingCost?: number;
  billingAddress: OrderAddressBlock;
  shippingAddress: OrderAddressBlock;
  items: OrderDetailItem[];
  progressSteps: Array<{
    label: string;
    completed: boolean;
    stepNumber: string;
  }>;
}
