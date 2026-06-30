# Route & API Reference - Taybeen Storefront

This document maps all public pages, client-protected pages, and JSON API request/response contracts for the Taybeen Storefront.

---

## 1. Storefront Pages Index

### Public Access Pages

| Page Path                | Purpose                                                                                       | Key Components Involved                                         |
| ------------------------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `/`                      | Landing page, showcasing hero sliders, branding, special offers, categories, and testimonials | `Hero`, `FeaturesBar`, `BestSellers`, `Gifting`, `Testimonials` |
| `/products`              | Catalog layout with text search, collection filtering, price sorting, and weight sizing       | `ProductGrid`, `FilterSidebar`, `SortSelector`                  |
| `/checkout`              | Delivery details input, cart review, and Razorpay modal transaction initiator                 | `CheckoutForm`, `CheckoutReview`, `CheckoutOrderSummary`        |
| `/partnerships`          | Affiliate registration form for creators, influencers, and brand promoters                    | `PartnershipApplyForm`                                          |
| `/contact`               | Customer support channels, email details, and location maps                                   | `ContactForm`                                                   |
| `/signin`                | Credential entry (email & password) to authenticate customer sessions                         | `SignInForm`                                                    |
| `/signup`                | Forms for new user registration and profile creation                                          | `SignUpForm`                                                    |
| `/auth/callback`         | Redirect endpoint capturing JWT access and refresh tokens from URL query parameters           | `AuthCallbackHandler`                                           |
| `/privacy-policy`        | Compliance guidelines detailing privacy statements                                            | `LegalContent`                                                  |
| `/shipping-and-delivery` | Shipping timelines and regional charging tiers                                                | `LegalContent`                                                  |
| `/terms-and-conditions`  | Legal constraints regarding platform services                                                 | `LegalContent`                                                  |

### Client-Protected Pages

All routes under `/my-account` require active token cookies (`taybeen_access_token`). If no token is detected, the router redirects the browser to `/signin`.

| Protected Path           | Purpose                                                                             | Key Components                           |
| ------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| `/my-account`            | Main dashboard displaying profile summary and order history list                    | `AccountDashboard`, `OrderHistoryList`   |
| `/my-account/orders/:id` | In-depth order receipt view and visual shipment status step tracking bar            | `OrderDetailView`, `ShipmentProgressBar` |
| `/my-account/affiliate`  | Commission statistics panel, coupon code view, and referral tracking link generator | `AffiliateDashboard`, `EarningsChart`    |

---

## 2. API Interface Schema Definitions

Below are the TypeScript interfaces that declare data structures processed within the storefront components.

### Product & Category

```typescript
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Base price for standard weight
  originalPrice?: number; // Pre-discount price if applicable
  weight: string; // e.g. "250g", "500g", "1kg"
  images: string[];
  categorySlug: string;
  isBestSeller: boolean;
  stock: number;
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}
```

### Shopping Cart

```typescript
export interface CartItem {
  id: string; // Composite ID: productId_weight
  productId: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
  image: string;
}
```

### Orders & Shipping

```typescript
export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  hexId: string; // User-facing hexadecimal identifier
  date: string;
  total: number;
  subtotal: number;
  gst: number;
  shippingCost: number;
  status: "Order received" | "Processing" | "On the way" | "Delivered" | "Cancelled";
  paymentMethod: "Razorpay" | "Cash on Delivery";
  paymentStatus: "Pending" | "Paid" | "Failed";
  shippingAddress: ShippingDetails;
  items: OrderItem[];
}
```

---

## 3. Backend REST Endpoint Contacts

All request URLs prefix with the base config: `${NEXT_PUBLIC_API_URL}` (which defaults to `http://localhost:5000/api/v1`).

### A. Authentication Endpoints

#### User Login

- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "email": "customer@taybeen.local",
    "password": "customer123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "usr-9812",
        "name": "Maryam Ali",
        "email": "customer@taybeen.local"
      },
      "tokens": {
        "accessToken": "eyJhbGciOi...",
        "refreshToken": "eyJhbGciOi..."
      }
    }
  }
  ```

#### Refreshing Access Token

- **Endpoint**: `POST /auth/refresh`
- **Request Body**:
  ```json
  {
    "refreshToken": "eyJhbGciOi..."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "tokens": {
      "accessToken": "eyJhbGciOiN...",
      "refreshToken": "eyJhbGciOiN..."
    }
  }
  ```

---

### B. Catalog Endpoints

#### Fetch Products list

- **Endpoint**: `GET /products`
- **Query Parameters**:
  - `category` (optional): Filter items by category slug (e.g. `organic-dates`).
  - `sort` (optional): Sort items (e.g. `price-asc`, `price-desc`, `popular`).
  - `search` (optional): String match on name or description.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "prod-001",
        "name": "Ajwa Premium Dates",
        "slug": "ajwa-premium-dates",
        "price": 490,
        "weight": "500g",
        "images": ["/images/ajwa-1.png"]
      }
    ]
  }
  ```

---

### C. Checkout & Payments Endpoints

#### Place Order

- **Endpoint**: `POST /orders`
- **Headers**: `Authorization: Bearer <accessToken>` (optional for guest orders)
- **Request Body**:
  ```json
  {
    "shippingAddress": {
      "firstName": "Maryam",
      "lastName": "Ali",
      "addressLine": "Flat 402, Green Valley Apartments, Pune",
      "city": "Pune",
      "state": "Maharashtra",
      "postalCode": "411045",
      "country": "India",
      "email": "customer@taybeen.local",
      "phone": "+919876543210"
    },
    "paymentMethod": "Razorpay",
    "items": [
      {
        "productId": "prod-001",
        "quantity": 1,
        "weight": "500g"
      }
    ]
  }
  ```
- **Response (210 Created - Razorpay Option)**:
  ```json
  {
    "success": true,
    "data": {
      "orderId": "ORD-2026-00006",
      "paymentOrder": {
        "keyId": "rzp_test_key12345",
        "amount": 490.0,
        "currency": "INR",
        "hexId": "202600006",
        "razorpayOrderId": "order_QLu87d9Ajs"
      }
    }
  }
  ```

#### Validate Razorpay Payment

- **Endpoint**: `POST /orders/validate-payment`
- **Request Body**:
  ```json
  {
    "orderId": "ORD-2026-00006",
    "razorpayOrderId": "order_QLu87d9Ajs",
    "razorpayPaymentId": "pay_QLu98dfA83",
    "razorpaySignature": "382a9dbdf09a2..."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Payment verified and order finalized.",
    "status": "Paid"
  }
  ```
