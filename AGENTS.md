# AGENTS.md - Developer & Agent Onboarding Guide

This document provides a complete, end-to-end guide to the Taybeen Frontend codebase for AI coding agents and human developers.

---

## 1. Project Map & Folder Directory

The codebase is organized as a standalone Next.js App Router application:

```text
taybeen-frontend/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI Pipeline configuration
├── docs/
│   ├── API.md                # Page routes and schemas reference
│   ├── SETUP.md              # Mock setup and dependencies guide
│   └── ADRs/
│       └── 0001-frontend-only-architecture.md # Standalone frontend architecture decision
├── public/
│   ├── Playfair_Display/     # Typography font assets
│   └── ...                   # Static storefront image assets
└── src/
    ├── app/                  # Next.js Page routes
    │   ├── admin/            # Admin Panel
    │   │   ├── signin/       # Admin Sign In Form
    │   │   └── (dashboard)/  # Admin Dashboard Panel (customers, orders, customization, etc.)
    │   ├── (store)/          # E-commerce Storefront (checkout, cart, products catalog)
    │   ├── layout.tsx        # Root HTML shell and layouts
    │   └── not-found.tsx     # Custom 404 handler page
    ├── components/           # Reusable React components
    │   ├── admin/            # Administrative UI components
    │   │   └── shared/       # Standardized Admin UI widgets (headers, stat cards, shells)
    │   ├── layout/           # App-wide structural layout (Navbar, Footer, WhatsApp float)
    │   └── ui/               # Global primitive widgets (Button, Input, Select, Dropdown)
    ├── context/              # Context State Providers (CartContext)
    ├── data/                 # Static data configurations and local mock databases
    ├── lib/                  # Library utilities (cn Tailwind class merger)
    ├── styles/               # Global stylesheet entry points (globals.css)
    ├── types/                # Strict TypeScript declaration interfaces
    └── utils/                # Global validation and geo helper utilities
```

---

## 2. Core Build & Development Commands

Always run these commands from the root directory `taybeen-frontend/`:

- **Start local server**: `pnpm dev`
- **Create production build**: `pnpm build`
- **Run type checker**: `pnpm typecheck`
- **Execute ESLint check**: `pnpm lint`
- **Prettier formatting check**: `pnpm format:check`
- **Run Prettier formatter**: `pnpm format`
- **Run full pipeline suite**: `pnpm check` (Executes linting, format check, typechecking, and mock tests)

---

## 3. Important Development Hot Paths

### A. E-commerce Checkout Flow

- Path: `/src/app/(store)/checkout/page.tsx`
- State: Uses `CartContext` (`/src/context/CartContext.tsx`) for reading items, pricing calculations, and totals.
- Forms: Managed using React Hook Form with validation schemas.

### B. Admin Dashboard Statistics & Layouts

- Path: `/src/app/admin/(dashboard)/page.tsx`
- Shared Components: Uses [shared components](file:///c:/Users/Admin/Desktop/Taybeen/taybeen-frontend/src/components/admin/shared/) to display metrics:
  - `AdminPageHeader.tsx`
  - `AdminCard.tsx`
  - `AdminListStatCard.tsx`
  - `AdminDashboardStatCard.tsx`
  - `AdminTableShell.tsx`
  - `AdminPagination.tsx`
  - `AdminStatusBadge.tsx`
  - `AdminSpinner.tsx`

### C. Admin Partner Coupon Management

- Path: `/src/components/admin/partners/PartnersList.tsx` & `/src/components/admin/partners/AffiliateDetailsModal.tsx`
- State transitions: Clicking "Delete coupon" changes status to "Expired" (with timestamp & line-through). Regeneration forms collect coupon code, discount percentage, and generate an "Active" coupon.

---

## 4. Key Coding Conventions

- **Conditional Classes**: Always merge tailwind classes using the `cn()` utility:

  ```typescript
  import { cn } from "@/lib/utils";

  className={cn("bg-white border border-[#C4A482]/20 rounded-2xl p-6", className)}
  ```

- **Absolute Aliased Imports**: Never use relative parent chains (`../../..`). Use the `@/` prefix (e.g. `import { Button } from "@/components/ui/Button"`).
- **Typing rules**: Set strict types for all component props. Avoid utilizing `any` or `@ts-ignore` bypass directives.
- **Component exports**: Ensure files utilize named exports for React components.

---

## 5. Antipatterns & Guardrails to Enforce

1. **Do Not Touch Storefront base UI**: Base UI elements in `src/components/ui/` (like `Button.tsx`, `Input.tsx`, `Select.tsx`) are shared with the public storefront. Do not change their padding/margins/colors directly to fix admin alignment bugs, as it will break the public store page visuals. Instead, pass custom classes via `className` prop to override them locally.
2. **Do Not Append Dynamic Tailwind Names**: Do not concatenate class strings (e.g. `"bg-" + color`). Tailwind's compiler will prune them. Write complete class name maps instead.
3. **Avoid Circular Imports**: Do not reference nested folder files inside barrel `index.ts` files to prevent circular reference compilation exceptions.
