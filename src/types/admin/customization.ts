export interface HeroCustomization {
  mainHeading: string;
  heading2: string;
  heading3: string;
  supportingText: string;
  heroImages: string[];
  sideImages: string[];
  highlights: string[];
}

export interface ValueCard {
  title: string;
  description: string;
}

export interface OurStoryCustomization {
  sectionLabel: string;
  heading: string;
  description: string;
  sectionImage?: string;
  brandValues: ValueCard[];
}

export interface OfferBannerCustomization {
  badgeText: string;
  heading: string;
  description: string;
}

export interface DeliveryCustomization {
  maximumAmount: string;
  deliveryCharges: string;
  gstPercent: string;
}

export interface AdminCustomizationConfig {
  hero: HeroCustomization;
  story: OurStoryCustomization;
  offer: OfferBannerCustomization;
  delivery: DeliveryCustomization;
}
