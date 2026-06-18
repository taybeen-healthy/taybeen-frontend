import { AdminCustomer, CustomersKpis } from "@/types/admin/customers";

export const customersKpis: CustomersKpis = {
  totalCustomers: 3,
  totalCustomersSub: "Active users",
  totalOrders: 100,
  totalRevenue: 8777.0,
  totalRevenueTrend: "10% from last month",
};

export const adminCustomersList: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Maryam Ali",
    initial: "M",
    email: "maryamali@gmail.com",
    phone: "1234567890",
    ordersCount: 2,
    totalSpent: 499,
    joinedDate: "12/06/26",
    recentOrders: [
      {
        id: "ORD-2026-00007",
        date: "12/06/26",
        amount: 499,
        status: "Pending",
      },
      {
        id: "ORD-2026-00001",
        date: "12/06/26",
        amount: 499,
        status: "Completed",
      },
    ],
  },
  {
    id: "cust-2",
    name: "Nikhil Patel",
    initial: "NP",
    email: "nikhil@gmail.com",
    phone: "1234567890",
    ordersCount: 1,
    totalSpent: 798,
    joinedDate: "10/06/26",
    recentOrders: [
      {
        id: "ORD-2026-00002",
        date: "10/06/26",
        amount: 798,
        status: "Pending",
      },
    ],
  },
  {
    id: "cust-3",
    name: "Aisha Raza",
    initial: "A",
    email: "aisha@freshfarm.io",
    phone: "1234567890",
    ordersCount: 3,
    totalSpent: 1797,
    joinedDate: "08/06/26",
    recentOrders: [
      {
        id: "ORD-2026-00003",
        date: "08/06/26",
        amount: 599,
        status: "In Transit",
      },
    ],
  },
];
