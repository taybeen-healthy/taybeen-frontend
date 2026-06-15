export interface AdminOrder {
  id: string;
  customerName: string;
  customerInitial: string;
  customerEmail?: string;
  date: string;
  itemsCount: number;
  totalAmount: number;
  status: "Completed" | "Pending" | "In Transit" | "Cancelled";
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
