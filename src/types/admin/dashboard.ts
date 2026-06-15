export interface OverviewAlert {
  id: string;
  count: number;
  label: string;
  actionText: string;
  type: "red" | "yellow" | "green";
}

export interface DashboardKpi {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  subtext: string;
  iconType: "income" | "customers" | "orders" | "products";
}

export interface RevenueChartPoint {
  month: string;
  amount: number;
}

export interface BestSellerItem {
  rank: number;
  name: string;
  soldUnits: number;
  progressPercent: number;
  revenue: string;
  image?: string;
}
