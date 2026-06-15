import { AdminReview, ReviewsKpis } from "@/types/admin/reviews";

export const reviewsKpis: ReviewsKpis = {
  totalReviews: 10,
  pendingCount: 3,
  approvedCount: 3,
  rejectedCount: 2,
};

export const adminReviewsList: AdminReview[] = [
  {
    id: "rev-1",
    customerName: "Maryam Ali",
    customerInitial: "M",
    customerEmail: "maryamali@gmail.com",
    customerPhone: "1234567890",
    productName: "Ajwa Dates",
    date: "12/06/26",
    status: "Approved",
  },
  {
    id: "rev-2",
    customerName: "Nikhil Patel",
    customerInitial: "NP",
    customerEmail: "nikhil@gmail.com",
    customerPhone: "1234567890",
    productName: "Safawi Dates",
    date: "11/06/26",
    status: "Pending",
  },
  {
    id: "rev-3",
    customerName: "Aisha Raza",
    customerInitial: "A",
    customerEmail: "aisha@freshfarm.io",
    customerPhone: "1234567890",
    productName: "Mabroom Dates",
    date: "10/06/26",
    status: "Rejected",
  },
];
