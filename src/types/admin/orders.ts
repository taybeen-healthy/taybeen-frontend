export interface AdminOrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface AdminOrder {
  id: string;
  hexId: string;
  customerName: string;
  customerInitial: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  itemsCount: number;
  totalAmount: number;
  status: "Completed" | "Pending" | "In Transit" | "Cancelled" | "Processing" | "Shipped";
  paymentMethod: string;
  shippingAddress: string;
  subtotal: number | "Free";
  shipping: number | "Free";
  tax: number;
  total: number;
  items: AdminOrderItem[];
}

export interface OrdersKpis {
  totalOrders: number;
  totalOrdersTrend: string;
  pendingCount: number;
  completedCount: number;
  completedTrend: string;
  revenueText: string;
  revenueTrend: string;
}
