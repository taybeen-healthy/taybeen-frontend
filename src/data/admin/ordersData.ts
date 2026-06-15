import { AdminOrder, OrdersKpis } from "@/types/admin/orders";

export const ordersKpis: OrdersKpis = {
  totalOrders: 3,
  totalOrdersTrend: "16% from last month",
  pendingCount: 3,
  completedCount: 10,
  completedTrend: "10% from last month",
  revenueText: "4.6k",
  revenueTrend: "19% from last month",
};

export const adminOrdersList: AdminOrder[] = [
  {
    id: "ORD-26-00001",
    customerName: "Maryam Ali",
    customerInitial: "M",
    customerEmail: "maryamali@gmail.com",
    date: "June 12, 2026",
    itemsCount: 1,
    totalAmount: 499,
    status: "Completed",
  },
  {
    id: "ORD-26-00002",
    customerName: "Nikhil Patel",
    customerInitial: "NP",
    customerEmail: "nikhil@gmail.com",
    date: "June 10, 2026",
    itemsCount: 2,
    totalAmount: 798,
    status: "Pending",
  },
  {
    id: "ORD-26-00003",
    customerName: "Aisha Raza",
    customerInitial: "A",
    customerEmail: "aisha@freshfarm.io",
    date: "June 08, 2026",
    itemsCount: 1,
    totalAmount: 599,
    status: "In Transit",
  },
];
