<!-- markdownlint-disable MD013 MD033 -->

# Developer Setup Guide

This guide describes how to onboard and configure the local development environment for the Taybeen Frontend.

---

## 1. Prerequisites

Before setting up, ensure you have:

- **Node.js**: Version 20.x (LTS) or higher.
- **pnpm**: Version 9.x or higher.
- **Git**: Installed and configured.

---

## 2. Setting Up Third-Party Mock Services

Since this is currently a standalone frontend client, external systems are mocked in `/src/data/`. Once production API contracts are live, the following steps are required:

### Clerk Authentication (Future Integration)

Configure Clerk authentication for secure customer login blocks:

1. Navigate to the Clerk Dashboard: `https://dashboard.clerk.com`.
2. Create an application and grab your API Publishable and Secret Keys.
3. Add Clerk environment variables to your `.env.local`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
   <!-- TODO: Clerk integration steps screenshot -->

### Stripe Payments (Future Integration)

To enable credit card, UPI, and COD flow confirmation online:

1. Navigate to Stripe Developer dashboard: `https://dashboard.stripe.com/test/apikeys`.
2. Grab the Publishable and Secret Keys.
3. Configure your webhook endpoints to receive order events:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
   <!-- TODO: Stripe webhooks configuration screenshot -->

---

## 3. Launching Locally

1. **Clone and Install**:
   ```bash
   git clone https://github.com/taybeen-healthy/taybeen-frontend.git
   cd taybeen-frontend
   pnpm install
   ```
2. **Launch Dev Mode**:
   ```bash
   pnpm dev
   ```
3. **Verify Everything Builds & Compiles**:
   ```bash
   pnpm check
   ```
   _(Executes ESLint checking, Prettier style audits, TypeScript compiler type-check, and mock tests)._
