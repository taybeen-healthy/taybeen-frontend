/** Shared TypeScript interfaces for the Taybeen application. */

/** Represents a date product with its details and display properties. */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeColor?: string;
}

/** Represents a customer testimonial / review. */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  productName: string;
}

/** Represents a feature highlight shown in the features bar. */
export interface Feature {
  id: string;
  title: string;
  icon: string;
}
