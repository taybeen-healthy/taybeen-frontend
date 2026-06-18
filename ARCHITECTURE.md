<!-- markdownlint-disable MD013 MD033 -->

# System Architecture - Taybeen Frontend

Detailed overview of routing patterns, rendering pipelines, request sequences, and conceptual schema models.

---

## 1. System Context Diagram

The following diagram maps interactions between storefront pages, administrative settings, and mock databases:

```mermaid
graph TD
    User([Customer / Admin Browser]) -->|HTTP Requests| WebServer[Next.js App Server]
    WebServer -->|Static SSG / ISR Pages| User
    WebServer -->|Client Interactivity| ClientJS[React 19 / Client Bundle]
    ClientJS -->|API Requests| ExternalAPI[Taybeen Backend API]
    ClientJS -->|State Management| CartCtx[Cart Context / LocalStorage]
```

---

## 2. Request & Rendering Pipeline

Taybeen leverages Next.js App Router hybrid rendering models:

- **Server Components (RSC)**: Rendered by default for page templates (e.g., our story, FAQ, catalog overview) to minimize JavaScript sent to browsers.
- **Client Components**: Triggered via `"use client"` directive for interactive views, including:
  - Cart drawers, item modifiers, and sidebar drawers.
  - Admin dashboards, filter inputs, dialog overlays, and form submissions.

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant Router as Next.js Router
    participant RSC as Server Components (RSC)
    participant Client as React Client Hydration

    User->>Router: GET /products
    Router->>RSC: Render page content
    RSC-->>Router: HTML + RSC Payload
    Router-->>User: Fast initial paint HTML
    User->>Client: Load & Execute Client JS
    Client->>Client: Hydrate Interactive Components (Cart, Filters)
```

---

## 3. Sequence Diagram: Primary Checkout Workflow

The following sequence details the checkout pipeline where a customer places an order:

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Page as Checkout Page (/checkout)
    participant Ctx as CartContext
    participant Backend as Backend Order Handler
    participant Conf as Confirmation Page

    Customer->>Page: Fill Shipping Details & Select Payment
    Customer->>Page: Click "Place Order"
    Page->>Ctx: Validate cart items & calculate totals
    Page->>Backend: POST /api/orders (Order Details + Items)
    Backend-->>Page: Success response (Order ID: ORD-26-XXXX)
    Page->>Ctx: Clear cart data (localStorage reset)
    Page->>Conf: Route to /order-confirmed?id=ORD-26-XXXX
    Conf-->>Customer: Display Order Confirmation
```

---

## 4. Sequence Diagram: Admin Coupon Expiry and Regeneration Workflow

Below is the workflow for admin affiliate coupon management (e.g. within [PartnersList](file:///c:/Users/Admin/Desktop/Taybeen/taybeen-frontend/src/components/admin/partners/PartnersList.tsx) and [AffiliateDetailsModal](file:///c:/Users/Admin/Desktop/Taybeen/taybeen-frontend/src/components/admin/partners/AffiliateDetailsModal.tsx)):

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant List as Partners List View
    participant Modal as Affiliate Details Modal
    participant Store as State Store (mock/api)

    Admin->>List: Click "Eye" icon on Affiliate Partner
    List->>Modal: Open Modal with selected partner data
    Admin->>Modal: Click "Delete coupon"
    Modal->>Store: Update status to "Expired" (with timestamp & line-through)
    Store-->>Modal: Return updated partner
    Modal-->>List: Trigger handleUpdatePartner callback
    Modal->>Admin: Show coupon regeneration input forms
    Admin->>Modal: Fill custom coupon code & click "Generate Coupon"
    Modal->>Store: Update partner status to "Active" (with new code & expiry)
    Store-->>Modal: Return new active partner details
    Modal-->>List: Trigger handleUpdatePartner callback
    Modal->>Admin: Re-render modal in Active Coupon state
```

---

## 5. Data Model ERD (Conceptual)

Conceptual schema representing the model relationships consumed by the UI:

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER_ITEM }|--|| PRODUCT : reference
    PARTNER ||--o{ COUPON : owns
    COUPON ||--o{ ORDER : discounts
    REVIEW }|--|| CUSTOMER : written-by
    REVIEW }|--|| PRODUCT : rates
```

---

## 6. Known Limitations & Evolution Paths

- **Mock Datastore**: Currently, the dashboard, reviews list, and partner coupon flows run on in-memory React state derived from `/src/data/`.
  - _Evolution_: Replace local data imports with Server Actions or React Query fetching from live database APIs.
- **Clientside Search**: Filters and query terms are resolved in-memory on the client.
  - _Evolution_: Migrate to server-side query params for pagination and database-level fuzzy indexing when catalog count increases.
