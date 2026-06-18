# Route & API Reference

Since this is a client application using Next.js App Router, this document details public pages, admin panels, and mock schemas.

---

## 1. Public Storefront Routes

The following pages are publicly accessible to guests and customers:

### Home Page (`/`)

- **Purpose**: Store landing, hero slider, and featured collections (dates, hampers, gifts).
- **Auth**: None (Public).

### Products Catalog (`/products`)

- **Purpose**: List and filter all available dates, gift boxes, and hampers.
- **Auth**: None (Public).

### Our Story (`/our-story`)

- **Purpose**: Informational company values page.
- **Auth**: None.

### Checkout Page (`/checkout`)

- **Purpose**: Collects shipping information, custom payment options, and dispatches the order request.
- **Auth**: None (or customer account).

---

## 2. Admin Panel Routes (Protected)

All admin routes require clientside authentication. If unauthorized, pages redirect to `/admin/signin`.

### Admin Login (`/admin/signin`)

- **Purpose**: Form to sign in using administrator email and password credentials.
- **Auth**: None.

### Admin Dashboard Overview (`/admin`)

- **Purpose**: High-level store status overview, listing KPIs (revenue, alerts count, completed orders counts).
- **Auth**: Admin JWT / local token.

### Orders Management (`/admin/orders`)

- **Purpose**: Manage, search, and update customer order statuses (Pending, Processing, In Transit, Shipped, Completed, Cancelled).
- **Auth**: Admin JWT.

### Customers Listing (`/admin/customers`)

- **Purpose**: List customer names, profiles, phone numbers, and calculate total amount spent.
- **Auth**: Admin JWT.

### Partners & Coupon Codes (`/admin/partners`)

- **Purpose**: Manage affiliate partners, review request details, approve requests, and regenerate/expire coupons.
- **Auth**: Admin JWT.

---

## 3. Core Mock Data Contracts

Requests for dashboard listings utilize in-memory JSON interfaces.

### AdminOrder Schema

```json
{
  "id": "ORD-26-00001",
  "customerName": "Maryam Ali",
  "customerEmail": "1234@gmail.com",
  "customerPhone": "1234567890",
  "date": "June 12, 2026",
  "itemsCount": 1,
  "totalAmount": 499,
  "status": "Completed",
  "paymentMethod": "Cash On Delivery",
  "shippingAddress": "Flat 402, Green Valley Apartments, Pune, Maharashtra 411045",
  "items": [
    {
      "name": "Ajwa Dates",
      "quantity": 1,
      "price": 499,
      "image": "/Image (Pile of premium dates).png"
    }
  ]
}
```
