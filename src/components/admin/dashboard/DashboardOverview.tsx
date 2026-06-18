"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowUpRight, ArrowDownRight, IndianRupee, Users, ShoppingCart, Box as BoxIcon, ArrowRight } from "lucide-react";
import { overviewAlerts, dashboardKpis, revenueChartData, bestSellers } from "@/data/admin/dashboardData";
import { cn, formatIndianCurrency } from "@/lib/utils";

export const DashboardOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Today" | "Weekly" | "Monthly" | "Yearly">("Monthly");

  const getKpiIcon = (type: string) => {
    const baseClass = "w-5 h-5";
    switch (type) {
      case "income":
        return <IndianRupee className={cn(baseClass, "text-amber-600")} />;
      case "customers":
        return <Users className={cn(baseClass, "text-blue-600")} />;
      case "orders":
        return <ShoppingCart className={cn(baseClass, "text-indigo-600")} />;
      case "products":
        return <BoxIcon className={cn(baseClass, "text-amber-800")} />;
      default:
        return <BoxIcon className={baseClass} />;
    }
  };

  const getKpiIconBg = (type: string) => {
    switch (type) {
      case "income":
        return "bg-amber-50";
      case "customers":
        return "bg-blue-50";
      case "orders":
        return "bg-indigo-50";
      case "products":
        return "bg-amber-100/50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="space-y-8 text-left font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#C4A482]/20 rounded-xl px-4 py-2.5 shadow-sm text-xs font-medium text-brand-brown cursor-pointer hover:border-brand-primary/40 transition-colors">
          <Calendar size={16} className="text-brand-brown/60" />
          <span>Thursday, 12 June 2026</span>
        </div>
      </div>

      <div className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-brand-brown mb-6">Overview</h2>
        <div className="flex flex-col xl:flex-row items-stretch justify-between gap-8">
          
          <div className="flex flex-col justify-center text-left max-w-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-brown mb-2">
              Welcome back, Admin!
            </h3>
            <p className="text-sm text-[#8D7F75] leading-relaxed">
              Here&apos;s what&apos;s happening with your store today
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            {overviewAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="border border-brand-green/20 bg-brand-green-pale/10 rounded-xl overflow-hidden flex flex-col justify-between text-center min-w-[110px]"
              >
                <div className="p-4 flex-1 flex flex-col justify-center items-center">
                  <span className={cn(
                    "text-2xl font-bold font-poppins mb-1",
                    alert.type === "red" ? "text-red-500" : "text-amber-500"
                  )}>
                    {alert.count}
                  </span>
                  <span className="text-[9px] font-bold text-brand-brown/80 tracking-wider">
                    {alert.label}
                  </span>
                </div>
                <div className="bg-[#768C3A]/10 border-t border-[#768C3A]/20 py-2 text-[10px] font-semibold text-[#4A5E28]">
                  {alert.actionText}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardKpis.map((kpi) => {
          const isUp = kpi.trendDirection === "up";
          return (
            <div 
              key={kpi.id} 
              className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4 hover:border-brand-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={cn("p-2.5 rounded-xl", getKpiIconBg(kpi.iconType))}>
                  {getKpiIcon(kpi.iconType)}
                </div>
                
                <div className={cn(
                  "flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold",
                  isUp 
                    ? "bg-[#4A5E28]/10 text-brand-green" 
                    : "bg-red-500/10 text-red-500"
                )}>
                  {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  <span>{kpi.trend}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-2xl font-bold font-poppins text-[#3A2418]">
                  {kpi.value}
                </span>
                <h4 className="text-xs font-semibold text-[#8D7F75] tracking-wider uppercase block">
                  {kpi.title}
                </h4>
              </div>

              <div className="border-t border-gray-100 pt-3 text-[11px] text-[#8D7F75]">
                {kpi.subtext}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-brand-brown">Revenue</h3>
              <p className="text-xs text-[#8D7F75]">Income overview across periods</p>
            </div>
            <div className="flex bg-[#F5F2EA] p-1 rounded-xl w-fit">
              {(["Today", "Weekly", "Monthly", "Yearly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    activeTab === tab 
                      ? "bg-white text-brand-brown shadow-sm" 
                      : "text-[#8D7F75] hover:text-brand-brown"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end min-h-[280px]">
            <div className="relative w-full h-[220px] flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-1">
              {revenueChartData.map((dataPoint) => {
                const heightPercent = `${Math.min(95, (dataPoint.amount / 850000) * 100)}%`;
                return (
                  <div key={dataPoint.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    <div className="absolute bottom-full mb-2 bg-[#5A3E2B] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md font-semibold font-poppins z-20">
                      ₹{formatIndianCurrency(dataPoint.amount)}
                    </div>
                    <div 
                      style={{ height: heightPercent }}
                      className="w-full sm:w-8 bg-[#768C3A] rounded-t-lg hover:bg-brand-green transition-all duration-300 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

            <div className="w-full flex justify-between gap-2 px-2 pt-3">
              {revenueChartData.map((dataPoint) => (
                <span key={dataPoint.month} className="flex-1 text-[11px] text-[#8D7F75] font-medium text-center">
                  {dataPoint.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-brand-brown">Best Sellers</h3>
                <p className="text-xs text-[#8D7F75]">By revenue generated</p>
              </div>
              <Link href="/admin/products" className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline">
                <span>All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {bestSellers.map((item) => (
                <div key={item.rank} className="py-4 flex items-center gap-4 text-left">
                  <span className="text-sm font-bold text-[#8D7F75] w-4 shrink-0">
                    {item.rank}
                  </span>

                  <div className="w-12 h-12 rounded-lg bg-[#FDFAF3] border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    <div className="text-xs font-bold text-brand-brown/40">Dates</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#3A2418] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#8D7F75] font-medium mt-0.5">
                      {item.soldUnits} units
                    </p>
                    
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-[#768C3A] rounded-full"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <span className="text-sm font-bold text-[#3A2418] shrink-0 font-poppins">
                    {item.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
