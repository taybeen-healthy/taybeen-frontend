import { CategoryDetail } from "@/types";

export const CATEGORIES = [
  "All Products",
  "Plain Dates",
  "Stuffed Dates",
  "Gift Hampers",
  "Corporate Gifting",
  "Wellness Boxes",
  "Custom Orders",
];

export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  "All Products": {
    title: "All Products",
    description:
      "Premium dates and curated gift hampers sourced from the finest farms across the Middle East.",
  },
  "Plain Dates": {
    title: "Plain Dates",
    description:
      "Sourced from the finest farms, our dates bring authenticity and richness to every bite.",
  },
  "Stuffed Dates": {
    title: "Stuffed Dates",
    description: "Premium dates paired with exquisite fillings for an indulgence worth savoring.",
  },
  "Gift Hampers": {
    title: "Gift Hampers",
    description:
      "Curated with care and beautifully presented for moments that deserve something special.",
  },
  "Corporate Gifting": {
    title: "Corporate Gifting",
    description:
      "Elevated gifting experiences crafted to reflect appreciation, trust, and excellence.",
  },
  "Wellness Boxes": {
    title: "Wellness Boxes",
    description:
      "Nutritious, feel-good selections thoughtfully assembled for a healthier lifestyle.",
  },
  "Custom Orders": {
    title: "Custom Orders",
    description: "From personal celebrations to grand occasions, every order is crafted your way.",
  },
};
