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

export type MyAccountTab = "dashboard" | "orders" | "settings";

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
  date: string;
  total: number;
  status: string;
  paymentMethod: string;
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



