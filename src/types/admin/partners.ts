export interface AdminPartner {
  id: string;
  name: string;
  initial: string;
  requestedDate: string;
  email: string;
  phone: string;
  couponCode: string; // e.g. "MARYAM10" or "Not generated" or "-"
  salesAmount: number; // can be 0 or negative for none
  ordersCount: number;
  status: "Approved" | "Pending" | "Expired";

  city?: string;
  occupation?: string;
  joinedDate?: string;
  whyJoin?: string;
  discountOffered?: string;
  couponStatus?: "Active" | "Expired" | "None";
  couponDetails?: string;
  refLink?: string;
  couponExpiryDate?: string;
}

export interface PartnersKpis {
  totalAffiliates: number;
  totalAffiliatesSub: string;
  verifiedCount: number;
  verifiedPercentText: string;
  pendingCount: number;
  totalSalesCount: number;
}
