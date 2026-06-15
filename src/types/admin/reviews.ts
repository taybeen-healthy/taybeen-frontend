export interface AdminReview {
  id: string;
  customerName: string;
  customerInitial: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface ReviewsKpis {
  totalReviews: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}
