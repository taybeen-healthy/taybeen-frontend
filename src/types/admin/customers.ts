export interface AdminCustomer {
  id: string;
  name: string;
  initial: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
}

export interface CustomersKpis {
  totalCustomers: number;
  totalCustomersSub: string;
  totalOrders: number;
  totalRevenue: number;
  totalRevenueTrend: string;
}
