import { AdminProduct } from "@/types/admin/products";

export const recentProducts: AdminProduct[] = [
  {
    id: "123445",
    name: "Ajwa Dates",
    category: "Dates",
    price: 499,
    stock: 20,
    unit: "kg",
    status: "In Stock",
    image: "/AjwaDatesThumb.png",
  },
  {
    id: "123446",
    name: "Safawi Dates",
    category: "Dates",
    price: 399,
    stock: 5,
    unit: "kg",
    status: "Low Stock",
    image: "/SafawiDatesThumb.png",
  },
  {
    id: "123447",
    name: "Mabroom Dates",
    category: "Dates",
    price: 599,
    stock: 0,
    unit: "kg",
    status: "Out of Stock",
    image: "/MabroomDatesThumb.png",
  },
];
