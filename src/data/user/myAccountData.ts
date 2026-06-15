import { OrderHistoryItem, UserProfile, BillingAddress, OrderDetail } from "@/types/myAccount";

export const userProfile: UserProfile = {
  name: "Maryam Ali",
  role: "Customer",
};

export const billingAddress: BillingAddress = {
  name: "Maryam Ali",
  addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
  email: "1234@gmil.com",
};

export const orderHistory: OrderHistoryItem[] = [
  {
    id: "ORD-2026-00006",
    date: "June 12, 2026",
    total: 578.00,
    status: "Order received",
  },
  {
    id: "ORD-2026-00005",
    date: "June 12, 2026",
    total: 578.00,
    status: "Processing",
  },
  {
    id: "ORD-2026-00004",
    date: "June 12, 2026",
    total: 578.00,
    status: "On the way",
  },
  {
    id: "ORD-2026-00003",
    date: "June 12, 2026",
    total: 578.00,
    status: "Delivered",
  },
];

export const orderDetailsData: Record<string, OrderDetail> = {
  "ORD-2026-00006": {
    id: "ORD-2026-00006",
    date: "June 12, 2026",
    total: 578.00,
    status: "Order received",
    paymentMethod: "UPI / Net Banking",
    subtotal: 490.00,
    gst: 88.00,
    shippingCost: 0,
    billingAddress: {
      name: "Maryam Ali",
      company: "Tech Solutions Inc.",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    shippingAddress: {
      name: "Maryam Ali",
      company: "Tech Solutions Inc.",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    items: [
      {
        name: "Mejdool Jordan Premium Jumbo Dates",
        price: 245.00,
        quantity: 2,
        weight: "250g",
        image: "/Image (Dates in wooden bowl).png"
      }
    ],
    progressSteps: [
      { label: "Order received", completed: true, stepNumber: "01" },
      { label: "Processing", completed: false, stepNumber: "02" },
      { label: "On the way", completed: false, stepNumber: "03" },
      { label: "Delivered", completed: false, stepNumber: "04" }
    ]
  },
  "ORD-2026-00005": {
    id: "ORD-2026-00005",
    date: "June 12, 2026",
    total: 578.00,
    status: "Processing",
    paymentMethod: "Credit Card",
    subtotal: 490.00,
    gst: 88.00,
    shippingCost: 0,
    billingAddress: {
      name: "Maryam Ali",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    shippingAddress: {
      name: "Maryam Ali",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    items: [
      {
        name: "Ajwa Premium Dates",
        price: 490.00,
        quantity: 1,
        weight: "500g",
        image: "/Image (Pile of premium dates).png"
      }
    ],
    progressSteps: [
      { label: "Order received", completed: true, stepNumber: "01" },
      { label: "Processing", completed: true, stepNumber: "02" },
      { label: "On the way", completed: false, stepNumber: "03" },
      { label: "Delivered", completed: false, stepNumber: "04" }
    ]
  },
  "ORD-2026-00004": {
    id: "ORD-2026-00004",
    date: "June 12, 2026",
    total: 578.00,
    status: "On the way",
    paymentMethod: "UPI / Net Banking",
    subtotal: 490.00,
    gst: 88.00,
    shippingCost: 0,
    billingAddress: {
      name: "Maryam Ali",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    shippingAddress: {
      name: "Maryam Ali",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    items: [
      {
        name: "Mebroom Premium Dates",
        price: 245.00,
        quantity: 2,
        weight: "250g",
        image: "/Image (Premium dates on a plate).png"
      }
    ],
    progressSteps: [
      { label: "Order received", completed: true, stepNumber: "01" },
      { label: "Processing", completed: true, stepNumber: "02" },
      { label: "On the way", completed: true, stepNumber: "03" },
      { label: "Delivered", completed: false, stepNumber: "04" }
    ]
  },
  "ORD-2026-00003": {
    id: "ORD-2026-00003",
    date: "June 12, 2026",
    total: 578.00,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    subtotal: 490.00,
    gst: 88.00,
    shippingCost: 0,
    billingAddress: {
      name: "Maryam Ali",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    shippingAddress: {
      name: "Maryam Ali",
      addressLine: "Flat 402, Green Valley Apartments, Baner, Pune, Maharashtra 411045",
      email: "maryam.ali@gmail.com",
      phone: "+91 98765 43210"
    },
    items: [
      {
        name: "Sukkari Premium Dates",
        price: 490.00,
        quantity: 1,
        weight: "500g",
        image: "/Image (Dates in wooden bowl).png"
      }
    ],
    progressSteps: [
      { label: "Order received", completed: true, stepNumber: "01" },
      { label: "Processing", completed: true, stepNumber: "02" },
      { label: "On the way", completed: true, stepNumber: "03" },
      { label: "Delivered", completed: true, stepNumber: "04" }
    ]
  }
};

