export interface ReviewPageConfig {
  logoUrl: string;
  comingSoonImage: string;
  desktopHeader: {
    title: string;
    description: string;
  };
  mobileComingSoon: {
    title: string;
    description: string;
  };
}

export const reviewPageData: ReviewPageConfig = {
  logoUrl: "/TaybeenLogo.png",
  comingSoonImage: "/ComingSoon Dates.png",
  desktopHeader: {
    title: "Leave a Review",
    description:
      "We'd love to hear about your experience. Your feedback helps us serve you better!",
  },
  mobileComingSoon: {
    title: "Something Sweet is Arriving Soon!",
    description:
      "We're crafting an exquisite experience for premium dates, elegant gifting and gourmet indulgence. Stay tuned!",
  },
};
