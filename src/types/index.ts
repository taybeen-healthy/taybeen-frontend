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
  category?: string;
  images?: string[];
  benefits?: string[];
  weightOptions?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  productName: string;
}

export interface Feature {
  id: string;
  title: string;
  icon: string;
}

export interface CategoryDetail {
  title: string;
  description: string;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  quantity: number;
  priceAtSelection: number;
}
