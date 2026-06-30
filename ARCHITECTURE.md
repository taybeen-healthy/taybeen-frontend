<!-- markdownlint-disable MD013 MD033 -->

# System Architecture - Taybeen Storefront

Detailed overview of routing patterns, rendering pipelines, request sequences, and conceptual schema models for the Taybeen Customer Storefront.

---

## 1. System Context Diagram

The following diagram maps interactions between storefront pages, user session caches, the backend API, and external platforms (Razorpay payment gateway):

```mermaid
graph TD
    User([Store Customer Browser]) -->|HTTP Requests| Storefront[Taybeen Storefront<br/>Next.js App Router]
    Storefront -->|Interactive Components| ClientJS[React 19 / Client Hydration]
    ClientJS -->|Auth cookies / Cart| LocalStore[(Cookies & LocalStorage)]
    ClientJS -->|HTTPS API Requests| SiblingAPI[Taybeen Backend API]
    ClientJS -->|Dynamically requests scripts| RazorpaySDK[Razorpay Checkout SDK]
```

---

## 2. Request & Rendering Pipeline

Taybeen leverages Next.js App Router hybrid rendering models to optimize page load speeds (Core Web Vitals) and interactivity:

- **Server Components (RSC)**: Rendered by default for page templates (e.g., `/our-story`, `/shipping-and-delivery`, `/terms-and-conditions`, and products catalog lists) to minimize the clientside JavaScript footprint.
- **Client Components**: Instantiated using the `"use client"` directive for user interactivity components:
  - Cart drawer controller, item counter, and sliding overlay.
  - Interactive product filter panels and image magnifier triggers.
  - Checkout form fields, validation error loops, and loading spinners.
  - Account order visualizers and affiliate sign-up models.

```mermaid
sequenceDiagram
    autonumber
    actor User as Customer Browser
    participant Router as Next.js Router
    participant RSC as Server Components (RSC)
    participant Client as React Client Hydration

    User->>Router: GET /products
    Router->>RSC: Fetch catalog data & render static node tree
    RSC-->>Router: HTML + RSC Payload
    Router-->>User: Fast initial paint HTML
    User->>Client: Load & Hydrate Client scripts
    Client->>Client: Attach state listeners (Cart Context, filter events)
```

---

## 3. Sequence Diagram: Razorpay Checkout & Order Placement Workflow

This diagram outlines the detailed workflow when a customer completes a purchase using the Razorpay Payment Gateway integration:

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer Browser
    participant Checkout as Checkout Page (/checkout)
    participant Cart as CartContext
    participant SDK as Razorpay SDK
    participant API as Backend API Server
    participant Gate as Razorpay Servers

    Customer->>Checkout: Fills Shipping Details & Selects "Razorpay"
    Customer->>Checkout: Clicks "Place Order"
    Checkout->>API: POST /api/v1/orders (Details + Cart Items)
    Note over API: Create database order entry<br/>Initiate payment order in Razorpay
    API-->>Checkout: Return 201 Created + RazorpayOrderData (OrderId, keyId, amount)
    Checkout->>Checkout: loadRazorpayScript() dynamically loads SDK
    Checkout->>SDK: Open Razorpay checkout modal with order details
    SDK->>Customer: Display Payment UI (Cards, UPI, Netbanking)
    Customer->>SDK: Authenticate & Confirm Payment
    SDK->>Gate: Authorize transaction
    Gate-->>SDK: Return payment success parameters
    SDK-->>Checkout: Trigger handler callback (razorpay_payment_id, razorpay_signature)
    Checkout->>API: POST /api/v1/orders/validate-payment (IDs + Signature)
    Note over API: Verify signature using webhook credentials
    API-->>Checkout: Return payment validation status (Success)
    Checkout->>Cart: clearCart() resets localStorage / cookies
    Checkout->>Checkout: Route to /order-confirmed?id=ORD-XXXX
```

---

## 4. Sequence Diagram: Token Authentication & Auto-Refresh Workflow

This diagram details client authentication and the auto-refresh mechanism handled by the Axios client when standard JWT sessions expire:

```mermaid
sequenceDiagram
    autonumber
    actor User as Customer Browser
    participant Page as Page View (/my-account)
    participant Client as apiClient (Axios Wrapper)
    participant Cook as Browser Cookies
    participant API as Backend API Server

    User->>Page: Request protected account page
    Page->>Client: Send request GET /profile
    Client->>Cook: Read "taybeen_access_token"
    alt Token Active
        Client->>API: Send request with Authorization Bearer token
        API-->>Page: Return 200 User Profile Data
    else Token Expired (API returns 401 Unauthorized)
        Client->>API: Send request with Authorization Bearer token
        API-->>Client: Return 401 Unauthorized
        Note over Client: Intercept response & pause failed queue
        Client->>Cook: Read "taybeen_refresh_token"
        Client->>API: POST /api/v1/auth/refresh (refreshToken)
        alt Refresh Valid
            API-->>Client: Return 200 (New accessToken + refreshToken)
            Client->>Cook: Update "taybeen_access_token" & "taybeen_refresh_token"
            Client->>API: Re-dispatch paused queue with new bearer token
            API-->>Page: Return 200 User Profile Data
        else Refresh Expired/Invalid
            API-->>Client: Return 400 Bad Request
            Client->>Cook: Remove tokens
            Client->>Page: Redirect to /signin
        end
    end
```

---

## 5. Data Model ERD (Storefront Conceptual)

Conceptual data entities consumed or updated by pages and contexts in the storefront repository:

```mermaid
erDiagram
    USER ||--o| PROFILE : possesses
    USER ||--o{ ORDER : places
    USER ||--o| AFFILIATE_ACCOUNT : applies
    PRODUCT ||--o{ ORDER_ITEM : includes
    PRODUCT ||--o{ REVIEW : receives
    CATEGORY ||--o{ PRODUCT : groups
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER ||--o| PAYMENT_DETAILS : verified-by
```

---

## 6. Known Limitations & Evolution Paths

- **Context-Bound Cart Storage**: State is managed in a React Context wrapper, triggering recalculations on every context subscriber re-render.
  - _Evolution_: Refactor state storage into Zustand to limit slice updates and boost page responsiveness.
- **Client-side Search Filters**: Product lists resolve search queries and category exclusions in-memory on the client.
  - _Evolution_: Implement paginated API server requests matching search queries to optimize bundle sizing.
- **Payment Verification Fallbacks**: Payment confirmation relies on frontend redirection hooks.
  - _Evolution_: Rely exclusively on backend Stripe/Razorpay server-to-server webhook notifications to handle cases where a customer closes their tab mid-verification.
