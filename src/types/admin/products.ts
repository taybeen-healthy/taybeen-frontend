export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  unit: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image?: string;
  description?: string;
  benefits?: string;
}
