"use client";

import React, { useState } from "react";
import { Plus, Eye, Trash2, Copy, Check, Boxes, CheckCircle2, Clock, Tags } from "lucide-react";
import { partnersKpis, adminPartnersList } from "@/data/admin/partnersData";
import { formatIndianCurrency } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export const PartnersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getKpiIcon = (iconName: string) => {
    switch (iconName) {
      case "affiliates":
        return <Boxes className="w-5 h-5 text-[#8D7F75]" />;
      case "verified":
        return <CheckCircle2 className="w-5 h-5 text-brand-green" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "sales":
        return <Tags className="w-5 h-5 text-brand-green" />;
      default:
        return <Boxes className="w-5 h-5" />;
    }
  };

  const filteredPartners = adminPartnersList.filter((partner) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = partner.name.toLowerCase().includes(term) ||
      partner.email.toLowerCase().includes(term) ||
      partner.couponCode.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "All" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 text-left font-poppins">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">
            Partners & coupons
          </h1>
          <p className="text-xs text-[#8D7F75] mt-1">
            Manage affiliate partners, their coupon codes, and sales performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Manage Vendors
          </Button>
          <Button variant="dark" size="sm" className="gap-2">
            <Plus size={16} />
            <span>Invite</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Total Affiliates */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Total Affiliates</h4>
            {getKpiIcon("affiliates")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {partnersKpis.totalAffiliates}
          </span>
          <div className="text-[10px] font-bold text-brand-primary tracking-wide">
            {partnersKpis.totalAffiliatesSub}
          </div>
        </div>

        {/* Card 2: Verified */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Verified</h4>
            {getKpiIcon("verified")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {partnersKpis.verifiedCount}
          </span>
          <div className="text-[10px] font-semibold text-[#8D7F75]">
            {partnersKpis.verifiedPercentText}
          </div>
        </div>

        {/* Card 3: Pending Requests */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Pending Requests</h4>
            {getKpiIcon("pending")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {partnersKpis.pendingCount}
          </span>
          <div className="text-[10px] font-semibold text-[#8D7F75]">
            Awaiting review
          </div>
        </div>

        {/* Card 4: Total sales via affiliates */}
        <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-brown/70">Total sales via affiliates</h4>
            {getKpiIcon("sales")}
          </div>
          <span className="text-3xl font-bold font-poppins text-[#3A2418]">
            {partnersKpis.totalSalesCount}
          </span>
          <div className="text-[10px] font-semibold text-[#8D7F75]">
            This month
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search vendors..." 
          className="md:max-w-md" 
        />

        {/* Filter select tags */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl px-2 py-0.5 w-44">
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={["All", "Approved", "Pending", "Expired"]}
              placeholder="All Statuses"
              variant="borderless"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#C4A482]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-[#F8E8C9]/35 text-[#5A3E2B] font-bold text-xs uppercase tracking-wider text-left border-b border-[#C4A482]/10">
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Coupon Code</th>
                <th className="py-4 px-6">Sales Via Code</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-[#3A2418]">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50/40 transition-colors">
                  {/* Customer Column */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center select-none shrink-0">
                        {partner.initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#3A2418] leading-tight">
                          {partner.name}
                        </h4>
                        <span className="text-[10px] text-[#8D7F75] font-semibold">
                          {partner.requestedDate}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact Column */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#3A2418] leading-tight">
                        {partner.email}
                      </span>
                      <span className="text-xs text-[#8D7F75] mt-0.5">
                        {partner.phone}
                      </span>
                    </div>
                  </td>

                  {/* Coupon Code Column */}
                  <td className="py-4 px-6">
                    {partner.couponCode === "Not generated" ? (
                      <span className="text-brand-green font-semibold">
                        Not generated
                      </span>
                    ) : partner.couponCode === "-" ? (
                      <span className="text-[#8D7F75]">-</span>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-[#FDFAF3] border border-gray-100 px-3 py-1.5 rounded-lg select-none">
                        <span className="font-mono font-bold text-brand-brown text-xs">
                          {partner.couponCode}
                        </span>
                        <button
                          onClick={() => handleCopy(partner.couponCode)}
                          className="text-[#8D7F75] hover:text-brand-brown transition-colors cursor-pointer"
                          title="Copy Code"
                        >
                          {copiedCode === partner.couponCode ? (
                            <Check size={14} className="text-brand-green" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Sales Column */}
                  <td className="py-4 px-6">
                    {partner.salesAmount === -1 ? (
                      <span className="text-[#8D7F75] font-semibold">-</span>
                    ) : (
                      <div className="flex flex-col">
                        <span className="font-bold text-[#3A2418]">
                          ₹{formatIndianCurrency(partner.salesAmount)}
                        </span>
                        <span className="text-[10px] text-[#8D7F75] font-semibold mt-0.5">
                          {partner.ordersCount} orders
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Status column */}
                  <td className="py-4 px-6">
                    <Badge
                      text={partner.status}
                      variant={
                        partner.status === "Approved"
                          ? "success"
                          : partner.status === "Pending"
                          ? "pending"
                          : "error"
                      }
                      className="inline-block"
                    />
                  </td>

                  {/* Actions column */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-4">
                      <button className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer" aria-label="View affiliate">
                        <Eye size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer" aria-label="Delete affiliate">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-poppins font-medium text-[#8D7F75]">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="py-2.5 px-4 text-xs font-semibold h-9"
              disabled
            >
              Previous
            </Button>
            <button className="bg-brand-green text-white font-bold rounded-lg w-9 h-9 flex items-center justify-center shadow-sm select-none">
              1
            </button>
            <Button
              variant="outline"
              size="sm"
              className="py-2.5 px-4 text-xs font-semibold h-9"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersList;
