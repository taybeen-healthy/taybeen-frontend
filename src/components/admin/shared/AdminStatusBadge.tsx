import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface AdminStatusBadgeProps {
  status: string;
  className?: string;
}

export const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({ status, className = "" }) => {
  const getBadgeVariant = (s: string) => {
    const norm = s.toLowerCase().trim();
    if (
      norm === "approved" ||
      norm === "in stock" ||
      norm === "completed" ||
      norm === "success" ||
      norm === "active"
    ) {
      return "success";
    }
    if (
      norm === "pending" ||
      norm === "low stock" ||
      norm === "awaiting" ||
      norm === "processing"
    ) {
      return "pending";
    }
    if (norm === "expired" || norm === "rejected" || norm === "cancelled" || norm === "error") {
      return "error";
    }
    if (norm === "in transit" || norm === "shipped" || norm === "info") {
      return "info";
    }
    return "default";
  };

  return (
    <Badge
      text={status}
      variant={getBadgeVariant(status)}
      className={cn("inline-block", className)}
    />
  );
};

export default AdminStatusBadge;
