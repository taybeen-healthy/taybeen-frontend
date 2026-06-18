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
    orderId: "ORD-26-00001",
    rating: 4,
    comment:
      "The dates were fresh, soft, and beautifully packed. Delivery was quick, and the quality exceeded my expectations. Will definitely order again and recommend to family and friends",
    images: ["/Image (Pile of premium dates).png", "/Image (Dates in wooden bowl).png"],
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
    orderId: "ORD-26-00002",
    rating: 5,
    comment:
      "Excellent quality Safawi dates! They are chewy and naturally sweet. Highly recommended brand.",
    images: ["/Image (Premium dates on a plate).png", "/Image (Dates in wooden bowl).png"],
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
    orderId: "ORD-26-00003",
    rating: 3,
    comment:
      "The Mabroom dates are good, but some of them were a bit dry. Package was well sealed.",
    images: ["/Image (Dates in wooden bowl).png", "/Image (Premium dates on a plate).png"],
  },
];
