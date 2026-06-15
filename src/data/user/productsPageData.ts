export interface SortOption {
  label: string;
  value: string;
}

export interface HeroBannerConfig {
  src: string;
  alt: string;
}

export const SORT_BY_OPTIONS: SortOption[] = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" }
];

export const HERO_BANNER: HeroBannerConfig = {
  src: "/OurProducts Header.png",
  alt: "Our Products Banner"
};
