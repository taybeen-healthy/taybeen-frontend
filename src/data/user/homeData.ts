export interface HeroVarietyConfig {
  name: string;
  image: string;
}

export interface HeroConfig {
  tag: string;
  heading: string;
  description: string;
  tagline: string;
  buttons: {
    primary: string;
    outline: string;
  };
  varieties: {
    ajwa: HeroVarietyConfig;
    kalmi: HeroVarietyConfig;
    sukkary: HeroVarietyConfig;
    safawi: HeroVarietyConfig;
  };
  badges: {
    farmToTableTitle: string;
    farmToTableDesc: string;
    energyTitle: string;
    energyValue: string;
    energyDesc: string;
    premiumLabel: string;
  };
}

export interface FeatureItem {
  text: string;
}

export interface HighlightItem {
  title: string;
  desc: string;
}

export interface OurStoryConfig {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  highlights: HighlightItem[];
}

export interface SpecialOfferConfig {
  tag: string;
  heading: string;
  description: string;
  imageUrl: string;
}

export interface GiftItem {
  image: string;
  tag: string;
  category?: string;
  title: string;
}

export interface GiftingConfig {
  tag: string;
  heading: string;
  mainCard: GiftItem;
  subCards: GiftItem[];
}

export interface TestimonialsConfig {
  tag: string;
  title: string;
}

export interface HomeData {
  hero: HeroConfig;
  features: FeatureItem[];
  ourStory: OurStoryConfig;
  specialOffer: SpecialOfferConfig;
  gifting: GiftingConfig;
  testimonials: TestimonialsConfig;
}

export const homeData: HomeData = {
  hero: {
    tag: "100% Natural & Organic",
    heading: "Rediscover the Power of Dates.",
    description: "Exceptional dates, naturally nurtured to perfection. Pure sweetness with no compromise on quality. A luxurious and healthier alternative to refined sugar.",
    tagline: "One date a day. A lifetime of difference.",
    buttons: {
      primary: "Explore Collection",
      outline: "Gift Hampers"
    },
    varieties: {
      ajwa: {
        name: "Ajwa Dates",
        image: "/Image (Dates in wooden bowl).png"
      },
      kalmi: {
        name: "Kalmi Dates",
        image: "/Image (Premium dates on a plate).png"
      },
      sukkary: {
        name: "Sukkary Dates",
        image: "/7844d57c9be79ee5e7b88ccbc592df37 1.png"
      },
      safawi: {
        name: "Safawi Dates",
        image: "/Image (Pile of premium dates).png"
      }
    },
    badges: {
      farmToTableTitle: "Farm-to-table",
      farmToTableDesc: "Saudi · Jordan · Iran",
      energyTitle: "Natural energy",
      energyValue: "66 kcal",
      energyDesc: "per 3 dates",
      premiumLabel: "Premium"
    }
  },
  features: [
    { text: "100% Natural Snacks" },
    { text: "No Artificial Additives" },
    { text: "Easy Return" },
    { text: "24/7 Support" }
  ],
  ourStory: {
    title: "Our Story",
    subtitle: "Balanced Snacks for an Active Life",
    description: "At healthy snack store we believe that smart snacking is the key to a balanced life. We curate the finest natural ingredients to create satisfying, nutrients rich snacks that fuel your body and delight your taste buds without compromise. No artificial additives, just pure, wholesome energy to keep you going strong.",
    buttonText: "Learn More About Us",
    imageUrl: "/OurStory.png",
    highlights: [
      { title: "Mindfully Sourced", desc: "Premium non-GMO ingredients" },
      { title: "Balanced Nutrition", desc: "Diverse range of snack types" },
      { title: "Conscious Choices", desc: "No palm oil, no artificial flavours" }
    ]
  },
  specialOffer: {
    tag: "Special Offer!",
    heading: "Unlock upto 50% on your first order",
    description: "Join 8,000+ health-conscious Indian families. Get exclusive early access to new varieties, seasonal hampers, and wellness content — straight to your inbox.",
    imageUrl: "/Offer.png"
  },
  gifting: {
    tag: "Gifting and Occasions",
    heading: "The Art of Premium Gifting",
    mainCard: {
      image: "/Gift1.png",
      tag: "Most Popular",
      category: "CELEBRATE WITH SWEETNESS",
      title: "Festive Diwali Hamper"
    },
    subCards: [
      {
        image: "/Gift2.png",
        tag: "Best Seller",
        title: "Premium Date Collection"
      },
      {
        image: "/Gift3.png",
        tag: "New",
        title: "Curated Wellness Box"
      }
    ]
  },
  testimonials: {
    tag: "From Our Community",
    title: "Dates worth talking about!"
  }
};
