# AGENTS.md - Developer & Agent Onboarding Guide

This document provides a complete onboarding reference for AI coding agents and developers working on the Taybeen Frontend Storefront repository.

- **Lead Developer**: Aaditya Gunjal ([aadigunjal0975@gmail.com](mailto:aadigunjal0975@gmail.com))
- **Production Storefront**: <https://taybeen.com/>
- **Production Admin Portal**: <https://admin.taybeen.com/>
- **Production API Base**: <https://api.taybeen.com/api/v1>

---

## 1. Project Map & Folder Directory

The storefront is built as a decoupled, standalone Next.js App Router application:

```text
taybeen-frontend/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI Pipeline verification workflows
├── docs/
│   ├── API.md                # Page routes index and API schema reference
│   ├── SETUP.md              # Env files and Razorpay integration guide
│   └── ADRs/
│       └── 0001-frontend-only-architecture.md # Standalone storefront ADR decision
├── public/
│   ├── Playfair_Display/     # Brand serif font assets
│   └── ...                   # Product images, graphics, and icon assets
└── src/
    ├── app/                  # Next.js page layout configurations
    │   ├── (store)/          # Public and customer routes group
    │   │   ├── auth/callback # Token receiver endpoint
    │   │   ├── checkout/     # Cart validation and Razorpay entry
    │   │   ├── my-account/   # Order status tracking and affiliate stats
    │   │   ├── partnerships/ # Affiliate signup form
    │   │   ├── products/     # Product search and filters
    │   │   └── ...           # Informational, login, and policy pages
    │   ├── layout.tsx        # Root HTML layout structure
    │   └── not-found.tsx     # Custom 404 handler page
    ├── components/           # Reusable UI component modules
    │   ├── layout/           # App navbar, footer, and whatsapp float widget
    │   ├── ui/               # Base design primitives (button, input, overlay)
    │   └── user/             # Storefront parts (cart drawer, checkout review)
    ├── context/              # Context Providers (Cart, Toast, Customization)
    ├── data/                 # Static content JSONs (faqs, categories, home)
    ├── lib/                  # Library wrappers (apiClient, tailwind utils)
    ├── styles/               # Main CSS styles configuration (globals.css)
    ├── types/                # Strict TypeScript declaration types
    └── utils/                # Clientside verification helpers (validators, cookies)
```

---

## 2. Core Build & Development Commands

Execute all developer scripts from the repository root directory `taybeen-frontend/`:

- **Start Development Server**: `pnpm dev` (Runs locally at `http://localhost:3000`)
- **Build Production Assets**: `pnpm build` (Compiles static pages and checks types)
- **Start Local Server**: `pnpm start` (Runs the built static version locally)
- **TypeScript Verifier**: `pnpm typecheck` (Checks typings compilation)
- **ESLint Checker**: `pnpm lint` (Validates linting rules compliance)
- **Prettier Formatter**: `pnpm format` (Applies formatting changes code-wide)
- **Formatting Auditor**: `pnpm format:check` (Checks if code requires formatting)
- **Integrity Pipeline check**: `pnpm check` (Executes lint, format check, and typecheck in sequence)

---

## 3. Important Development Hot Paths

### A. Shopping Cart Context & Drawer

- **Context Provider**: `src/context/CartContext.tsx`
  - Handles item additions, subtotals, GST, shipping estimations, and local storage caching.
- **Drawer Trigger Component**: `src/components/user/cart/CartDrawer.tsx`
  - Client side slider displaying quantities, coupons, checkout CTA buttons.

### B. Checkout Page & Razorpay Integration

- **Page Component**: `src/components/user/pages/checkout/CheckoutPage.tsx`
  - Validates delivery inputs and launches the Razorpay window callback.
- **SDK Loader**: `src/lib/utils/loadScript.ts`
  - Asynchronously pulls `https://checkout.razorpay.com/v1/checkout.js` into the DOM.
- **Payment Verification**: Triggers backend endpoint POST `/orders/validate-payment` with Razorpay signature details.

### C. Authentication Callback & API client

- **Axios HTTP Setup**: `src/lib/api/apiClient.ts`
  - Automatically appends JWT bearer headers and intercepts expired `401` tokens to fetch new sessions.
- **Auth Callback Page**: `src/app/(store)/auth/callback/page.tsx`
  - Processes token parameters (`accessToken`, `refreshToken`) on redirect, saving them to secure cookies.

### D. User Account & Order Progression

- **Dashboard Component**: `src/components/user/my-account/OrderDetailView.tsx`
  - Renders shipment step milestones dynamically using the active order status.
- **Affiliate View**: `src/components/user/my-account/AffiliateDashboard.tsx`
  - Visualizes sales stats, active coupons, and approved registration details.

---

## 4. Key Coding Conventions

- **Conditional Class Names**: Merge responsive CSS attributes safely with `cn()`:

  ```typescript
  import { cn } from "@/lib/utils";

  className={cn("bg-brand-bg border border-brand-primary/20 p-4", className)}
  ```

- **Absolute Aliased Imports**: Never use nested parent folder chains (`../../../`). Always use the path alias `@/` mapped to the `src` directory.
- **Strict Typing Conventions**: Define type interfaces for React component props. Avoid standard fallback variables like `any` or `@ts-ignore` bypass controls.
- **Named Component Exports**: Keep components structured as named exports inside codebase files.

---

## 5. Antipatterns & Guardrails to Enforce

1. **Protect UI Primitives**: Base elements under `src/components/ui/` (e.g. `Button.tsx`, `Input.tsx`, `Slider.tsx`) are globally shared across all storefront page types. Avoid modifying their core spacing, layout rules, or base color parameters. Overwrite them locally by passing props via `className`.
2. **Prevent Dynamic Tailwind Generation**: Do not programmatically construct tailwind classes (e.g., `className={"p-" + size}`). Write the full, explicit class name tags so the tailwind compiler handles asset trees correctly.
3. **Avoid Circular Imports**: Do not reference nested folder components inside root barrel index handlers to prevent dependency exceptions.
4. **Never Commit Secrets**: Do not write API credentials or local keys directly in code blocks. Keep parameters configured in `.env.local` templates.
