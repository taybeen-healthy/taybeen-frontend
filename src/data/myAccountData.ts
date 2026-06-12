import { OrderHistoryItem, UserProfile, BillingAddress } from "@/types/myAccount";

export const userProfile: UserProfile = {
  name: "Maryam Ali",
  role: "Customer",
};

export const billingAddress: BillingAddress = {
  name: "Maryam Ali",
  addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
  email: "1234@gmil.com",
};

export const orderHistory: OrderHistoryItem[] = [
  {
    id: "ORD-2026-00006",
    date: "June 12, 2026",
    total: 578.00,
    status: "Order received",
  },
  {
    id: "ORD-2026-00005",
    date: "June 12, 2026",
    total: 578.00,
    status: "Order received",
  },
  {
    id: "ORD-2026-00004",
    date: "June 12, 2026",
    total: 578.00,
    status: "Order received",
  },
  {
    id: "ORD-2026-00003",
    date: "June 12, 2026",
    total: 578.00,
    status: "Order received",
  },
];
