import { Product, Testimonial } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Medjool Dates",
    description:
      "The 'King of Dates' - large, soft, and intensely caramel - sweet fudge like texture. Exceptionally rich in natural sugar and potassium.",
    price: 1300,
    originalPrice: 1500,
    weight: "500g",
    rating: 4.9,
    reviewsCount: 1240,
    image: "/Image (Premium dates on a plate).png",
    badge: "Best Seller",
    badgeColor: "#F7A503",
  },
  {
    id: "2",
    name: "Ajwa Dates",
    description:
      "From the holy city of Madinah. Dark, soft and uniquely flavoured with a dry finish. Revered for centuries for their extraordinary health properties.",
    price: 750,
    originalPrice: 1000,
    weight: "500g",
    rating: 5.0,
    reviewsCount: 840,
    image: "/Image (Dates in wooden bowl).png",
    badge: "Sacred & Rare",
    badgeColor: "#2C3A1A",
  },
  {
    id: "3",
    name: "Kalmi Dates",
    description:
      "Moist, dark, and highly nutritious dates with a rich texture, perfect for regular daily snacking and health goals.",
    price: 600,
    originalPrice: 800,
    weight: "500g",
    rating: 4.8,
    reviewsCount: 470,
    image: "/Image (Premium dates on a plate).png",
    badge: "New Arrival",
    badgeColor: "#768C3A",
  },
  {
    id: "4",
    name: "Sugai Dates",
    description:
      "Distinctive dual-toned dates with a golden crispy base and a soft, sweet body, offering a unique texture and pleasant crunch.",
    price: 550,
    originalPrice: 700,
    weight: "500g",
    rating: 4.9,
    reviewsCount: 310,
    image: "/Image (Pile of premium dates).png",
    badge: "Chef's Pick",
    badgeColor: "#4A5E28",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "\"I recommend Taybeen's Ajwa dates to every one of my clients who needs a natural iron supplement. The quality is consistently exceptional — fresh, moist, and exactly as described. Nothing like the dry dates you find in local stores.\"",
    author: "Priya Sharma",
    role: "Nutritionist",
    location: "Mumbai",
    rating: 5,
    productName: "Ajwa Dates",
  },
  {
    id: "2",
    quote:
      "\"The Mejdool dates are incredibly soft and sweet, like caramel fudge. They are the perfect natural sweet treat and a great source of energy before my workouts. My family absolutely loves them!\"",
    author: "Rahul Verma",
    role: "Fitness Coach",
    location: "Delhi",
    rating: 5,
    productName: "Mejdool Dates",
  },
  {
    id: "3",
    quote:
      "\"I recommend Taybeen's Ajwa dates to every one of my clients who needs a natural iron supplement. The quality is consistently exceptional — fresh, moist, and exactly as described. Nothing like the dry dates you find in local stores.\"",
    author: "Priya Sharma",
    role: "Nutritionist",
    location: "Mumbai",
    rating: 4,
    productName: "Ajwa Dates",
  },
  {
    id: "4",
    quote:
      "\"We ordered the festive hampers for corporate gifting this year. The feedback from our clients was overwhelming - they loved the premium presentation and the rich, authentic taste of the Safawi dates.\"",
    author: "Sneha Patel",
    role: "HR Director",
    location: "Bangalore",
    rating: 5,
    productName: "Safawi Dates",
  },
  {
    id: "5",
    quote:
      "\"Mabroom dates are my absolute favorite. They are semi-dry and have a balanced, subtle sweetness that isn't overpowering. Outstanding quality, clean packaging, and very fast shipping!\"",
    author: "Amit Kapoor",
    role: "Food Blogger",
    location: "Pune",
    rating: 5,
    productName: "Mabroom Dates",
  },
  {
    id: "6",
    quote:
      "\"Every single date in the package was perfect - soft, clean, and delicious. You can really taste the difference when dates are sourced fresh. Will definitely be a regular customer!\"",
    author: "Neha Sen",
    role: "Home Chef",
    location: "Kolkata",
    rating: 5,
    productName: "Premium Collection",
  },
];
