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
    imageUrl: "https://s3-alpha-sig.figma.com/img/67d8/0cc5/654d01deade95e42e47d2afd1c672c85?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EtcZsw8GNS-OxeKl46DCvxfUgEdEpLqCLMMbEUgljhUDaI3YklwMWlpwKXuDs-JHzyXkJu52Gs3oDTkUg2HIP1v1SQLMwcF5Bkdm7NrMo0oA9NEngwz3n9-61GachZN8a0WFEUt5BylQW6xw9GUDN4eh8Nc85bpxeA0O0P9Qux9OXgn~7cIMPvaS1P~IrkD9BikOFKNh~MCDdQbLc~gD4gl9BaD5BPPuTOovtdqnaHAKddVlsFsUSqeNDCxeIHZ66lSgfvB-qm188qIwLMW8LqXXjmy9BXp6D4teladN-PcRRJoAMWK31jWOR4EJOaxKCI1ZbF1KVUPK1A~l9~JaNA__",
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
    imageUrl: "https://s3-alpha-sig.figma.com/img/872e/ecfe/b923789118b00da9da7053d0ccee2cbf?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UCZlVwukV~Gf99gJ9tdWNNcdGp99KTJQyy8HgNYWaw2OccoU-L81mX3qa6BcpPsLgd4NLOULMIuSqgFIAnasNhb2WRo4o42kzPrTIKlrzMIxiTTuHFvHETO4JqyLSpTd-2P2ZXd-91xMQa4YUq5sOmKq70kFS3PP4NHEhq4M2folPJjlZTBHfRar4vIzd9MvAT~DDQelGxzC37PDlBuUCL0VgYZQIwwOJYWsOeeq9b9oMo1Y2VHjtsjB8nblK0jI~rJap2SyV2sDnBXCEaQ7w7yMhiQ01L0lGa~BG3NOqJgTsOKZA3yMNJuYXfwRd71Hqz-f1LbS~1e0mzcfswOx6Q__"
  },
  gifting: {
    tag: "Gifting and Occasions",
    heading: "The Art of Premium Gifting",
    mainCard: {
      image: "https://s3-alpha-sig.figma.com/img/09a7/959c/665a5e022a30a5e6bdac4cdf87b661c6?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LeRFZIoy7Aqv9M6stGfbkh9I7SHqyWO2u8naUp4BiD8FhD89JhOJ0DdUdoZbijwMu8~axfBpjZ-6vFOmMKoX5W0HyfW0NFWUBeSoAp8bcOhDuPNtzyGHVlwzcaIUieiAJpb-JPedY2~vdLBkRiiZEQNn-Nk8QtK8a4nkj7savDNWv4JIKmgekE6721TA0TdvA8uFRJmNjS3-NihN5ElRO-PAbOHGHFHT-u2GsUSsgDpig1OvPm7qbQ3g~IgAuoEYme8wTuJZSZdt6ji3LcYfuT0Lk7xBkEZbl2iAupWf8X66LDUsSxyNfVMX62tzs~uKctN56OQ3Eiz55aIIZagrvA__",
      tag: "Most Popular",
      category: "CELEBRATE WITH SWEETNESS",
      title: "Festive Diwali Hamper"
    },
    subCards: [
      {
        image: "https://s3-alpha-sig.figma.com/img/adf2/f70a/bf44c05647e6b6c385b5b929b1e66cd5?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Is5mrUedAqnQTmJlXilPLheck97DIIEKPXN6ewWKO8omnkJ319-ivvWavGL6fem9u74U78r~k2LKCq27TLELovKXeq0K9BesUzzl9V2IHb9qwRxmZ4SkKMDTprmgKwnkslJeOfmGpXa9Gley1DUltu8wgBqkP0t-fYq0g43Kb1~lN8fY0Vi8fevR7SkNw44ZiDUwEDvDzk24T6QHQBbudK~pjn4wqbEd5mZoEnq1n6F6Rp7Liwv7zq7hxgaCfwxYwIGh0c9AOZ~bwRUBmr6WNGE2vmUlGcCVfr-KswJgSxpcboNEwEwHkbiNgU~VL9pA0ec5zV6YHutO8Hjiwz73NQ__",
        tag: "Best Seller",
        title: "Premium Date Collection"
      },
      {
        image: "https://s3-alpha-sig.figma.com/img/d4a6/fa5a/8d5d8bcc3afc4b8d1ce862a552272063?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J0Pf7DR5yhcsAhayzXMZi5kywWvrO637siNzabZSZzqHiFo4cwPcnu60G8yP3PmxHwtl0ALpl-cvqLWcUcF476fRLS8rcZ3AvvEF7bEgtowKU4fnBVlSgL3YcR854lh5S~-a8EIiNzdJ9vpUMNt28bvWh7YcT35Lf0YGIFMllwYHk-lLK~3vpVdVx6a8SSSLZPsaGZjrlBWOgF57X6iRZQyJ~5OrUCO2XHFPB8q2gxL9tGInBKOm2zwRMf8C27qeJMQpaq5Ymk~o0Av4VDNJEiqs8fNrcGSw4L4kssJ-548kNcXsnSyZ9JoNGr~CDC6wdk1Oo2G2tsYrhlj3I35Ixw__",
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
