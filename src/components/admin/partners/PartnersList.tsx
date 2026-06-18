"use client";

import React, { useState } from "react";
import { Plus, Eye, Trash2, Copy, Check, Boxes, CheckCircle2, Clock, Tags } from "lucide-react";
import { partnersKpis, adminPartnersList } from "@/data/admin/partnersData";
import { formatIndianCurrency } from "@/lib/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { AdminPartner } from "@/types/admin/partners";
import { AffiliateDetailsModal } from "./AffiliateDetailsModal";
import {
  AdminPageHeader,
  AdminListStatCard,
  AdminTableShell,
  AdminPagination,
  AdminStatusBadge,
} from "../shared";

export const PartnersList: React.FC = () => {
  const [partners, setPartners] = useState<AdminPartner[]>(adminPartnersList);
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleUpdatePartner = (updatedPartner: AdminPartner) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === updatedPartner.id ? updatedPartner : p))
    );
    if (selectedPartner?.id === updatedPartner.id) {
      setSelectedPartner(updatedPartner);
    }
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

  const filteredPartners = partners.filter((partner) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = partner.name.toLowerCase().includes(term) ||
      partner.email.toLowerCase().includes(term) ||
      partner.couponCode.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "All" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tableHeaders = [
    { label: "Customer" },
    { label: "Contact" },
    { label: "Coupon Code" },
    { label: "Sales Via Code" },
    { label: "Status" },
    { label: "Actions", className: "text-center" },
  ];

  return (
    <div className="space-y-8 text-left font-poppins">
      <AdminPageHeader
        title="Affiliate Partners & coupons"
        subtitle="Manage affiliate partners, their coupon codes, and sales performance"
        actions={
          <>
            <Button variant="outline" size="sm">
              Manage Affiliates
            </Button>
            <Button variant="dark" size="sm" className="gap-2">
              <Plus size={16} />
              <span>Invite</span>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <AdminListStatCard
          title="Total Affiliates"
          value={partnersKpis.totalAffiliates}
          subtext={partnersKpis.totalAffiliatesSub}
          icon={getKpiIcon("affiliates")}
          subtextClassName="text-brand-primary font-bold"
        />

        <AdminListStatCard
          title="Verified"
          value={partnersKpis.verifiedCount}
          subtext={partnersKpis.verifiedPercentText}
          icon={getKpiIcon("verified")}
          subtextClassName="text-[#8D7F75] font-semibold"
        />

        <AdminListStatCard
          title="Pending Requests"
          value={partnersKpis.pendingCount}
          subtext="Awaiting review"
          icon={getKpiIcon("pending")}
          subtextClassName="text-[#8D7F75] font-semibold"
        />

        <AdminListStatCard
          title="Total sales via affiliates"
          value={partnersKpis.totalSalesCount}
          subtext="This month"
          icon={getKpiIcon("sales")}
          subtextClassName="text-[#8D7F75] font-semibold"
        />
      </div>

      <div className="bg-white border border-[#C4A482]/20 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Affiliates..."
          className="md:max-w-md"
        />

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

      <AdminTableShell headers={tableHeaders} tableClassName="min-w-[800px]">
        {filteredPartners.map((partner) => (
          <tr key={partner.id} className="hover:bg-gray-50/40 transition-colors">
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

            <td className="py-4 px-6">
              <AdminStatusBadge status={partner.status} />
            </td>

            <td className="py-4 px-6">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSelectedPartner(partner);
                    setIsModalOpen(true);
                  }}
                  className="text-[#8D7F75] hover:text-brand-brown p-1.5 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  aria-label="View affiliate"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => {
                    setPartners((prev) => prev.filter((p) => p.id !== partner.id));
                  }}
                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  aria-label="Delete affiliate"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>

      <AdminPagination currentPage={1} totalPages={1} />

      {isModalOpen && selectedPartner && (
        <AffiliateDetailsModal
          partner={selectedPartner}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPartner(null);
          }}
          onUpdatePartner={handleUpdatePartner}
        />
      )}
    </div>
  );
};

export default PartnersList;
