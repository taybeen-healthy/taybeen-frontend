import { AdminPartner, PartnersKpis } from "@/types/admin/partners";

export const partnersKpis: PartnersKpis = {
  totalAffiliates: 9,
  totalAffiliatesSub: "+2 This month",
  verifiedCount: 9,
  verifiedPercentText: "75% of the total",
  pendingCount: 3,
  totalSalesCount: 21,
};

export const adminPartnersList: AdminPartner[] = [
  {
    id: "part-1",
    name: "Maryam Ali",
    initial: "M",
    requestedDate: "Requested 02 May 2026",
    email: "maryamali@gmail.com",
    phone: "1234567890",
    couponCode: "MARYAM10",
    salesAmount: 28400,
    ordersCount: 47,
    status: "Approved",
  },
  {
    id: "part-2",
    name: "Nikhil Patel",
    initial: "NP",
    requestedDate: "Requested 02 May 2026",
    email: "nikhil@gmail.com",
    phone: "1234567890",
    couponCode: "Not generated",
    salesAmount: -1, // representing "-"
    ordersCount: 0,
    status: "Pending",
  },
  {
    id: "part-3",
    name: "Aisha Raza",
    initial: "A",
    requestedDate: "Requested 22 April 2026",
    email: "aisha@freshfarm.io",
    phone: "1234567890",
    couponCode: "-",
    salesAmount: 8400,
    ordersCount: 25,
    status: "Expired",
  },
];
