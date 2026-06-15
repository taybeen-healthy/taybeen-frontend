import { OverviewAlert, DashboardKpi, RevenueChartPoint, BestSellerItem } from "@/types/admin/dashboard";

export const overviewAlerts: OverviewAlert[] = [
  {
    id: "alert-1",
    count: 14,
    label: "LOW STOCK ITEMS",
    actionText: "Action needed",
    type: "red",
  },
  {
    id: "alert-2",
    count: 4,
    label: "NEW REVIEWS",
    actionText: "Out for delivery",
    type: "yellow",
  },
  {
    id: "alert-3",
    count: 6,
    label: "IN TRANSIT",
    actionText: "Out for delivery",
    type: "green",
  },
  {
    id: "alert-4",
    count: 14,
    label: "PENDING",
    actionText: "Action needed",
    type: "yellow",
  },
];

export const dashboardKpis: DashboardKpi[] = [
  {
    id: "kpi-1",
    title: "Total Income",
    value: "₹8,46,200",
    trend: "+18.2%",
    trendDirection: "up",
    subtext: "vs ₹7,16,400 last month",
    iconType: "income",
  },
  {
    id: "kpi-2",
    title: "Customers",
    value: "30",
    trend: "+9.4%",
    trendDirection: "up",
    subtext: "+142 new this month",
    iconType: "customers",
  },
  {
    id: "kpi-3",
    title: "Total Orders",
    value: "₹8,46,200",
    trend: "+5.7%",
    trendDirection: "up",
    subtext: "87 orders this week",
    iconType: "orders",
  },
  {
    id: "kpi-4",
    title: "Products Listed",
    value: "28",
    trend: "-3.1%",
    trendDirection: "down",
    subtext: "3 low stock alerts",
    iconType: "products",
  },
];

export const revenueChartData: RevenueChartPoint[] = [
  { month: "Jul", amount: 200000 },
  { month: "Aug", amount: 220000 },
  { month: "Sep", amount: 400000 },
  { month: "Oct", amount: 850000 },
  { month: "Nov", amount: 650000 },
  { month: "Dec", amount: 600000 },
  { month: "Jan", amount: 250000 },
  { month: "Feb", amount: 200000 },
  { month: "Mar", amount: 380000 },
  { month: "Apr", amount: 420000 },
  { month: "May", amount: 550000 },
  { month: "Jun", amount: 680000 },
];

export const bestSellers: BestSellerItem[] = [
  {
    rank: 1,
    name: "Ajwa Dates",
    soldUnits: 40,
    progressPercent: 85,
    revenue: "₹1.88T",
    image: "/AjwaDatesThumb.png",
  },
  {
    rank: 2,
    name: "Safawi Dates",
    soldUnits: 21,
    progressPercent: 60,
    revenue: "₹1.24L",
    image: "/SafawiDatesThumb.png",
  },
  {
    rank: 3,
    name: "Mabroom Dates",
    soldUnits: 90,
    progressPercent: 45,
    revenue: "₹0.92L",
    image: "/MabroomDatesThumb.png",
  },
];
