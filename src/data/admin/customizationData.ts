import { AdminCustomizationConfig } from "@/types/admin/customization";

export const initialCustomizationData: AdminCustomizationConfig = {
  hero: {
    mainHeading: "Taybeen Premium Dates",
    heading2: "Pure Energy, Divine Taste",
    heading3: "Authentic Saudi & Jordanian Varieties",
    supportingText: "India's most trusted source for premium, authenticated date varieties — sourced directly from Saudi Arabia, Jordan, and Iran.",
    heroImages: ["/hero-main.png"],
    sideImages: ["/hero-side.png"],
    highlights: [
      "Sourced Directly from Saudi Arabia",
      "No Added Sugar or Preservatives",
      "Perfect for Festive & Corporate Gifting",
      "Packed with Essential Mineral Nutrients",
    ],
  },
  story: {
    sectionLabel: "Our Sourcing & Heritage",
    heading: "Only the Finest Premium Date Varieties",
    description: "Every single date we offer is selected by hand, cleaned under strict hygienic guidelines, and transported in specialized cold storage to lock in its natural moist texture, rich vitamins, and authentic taste profile.",
    sectionImage: "/our-story-section.png",
    brandValues: [
      {
        title: "100% Authentic Sourcing",
        description: "Direct ties with certified organic farms across Al-Madinah, Al-Qassim, and Jordan Valley.",
      },
      {
        title: "Cold-Chain Logistics",
        description: "Maintained at steady optimal temperatures from harvest until it reaches your doorstep.",
      },
      {
        title: "Handpicked Quality",
        description: "Rigorous sorting process guarantees uniform size, moisture content, and zero defects.",
      },
    ],
  },
  offer: {
    badgeText: "Limited Time Offer",
    heading: "Unlock Up to 50% Off on Your First Order",
    description: "Experience premium date varieties today. Subscribe to our newsletter or create an account to receive an instant coupon for storewide discounts.",
  },
  delivery: {
    maximumAmount: "999.00",
    deliveryCharges: "150.00",
    gstPercent: "18",
  },
};
