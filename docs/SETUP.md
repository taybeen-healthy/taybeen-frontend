# Developer Setup Guide - Taybeen Storefront

This guide describes how to onboard, configure, and launch the Taybeen Storefront development environment.

- **Lead Developer**: Aaditya Gunjal ([aadigunjal0975@gmail.com](mailto:aadigunjal0975@gmail.com))
- **Production Storefront Application**: <https://taybeen.com/>
- **Production Admin Management Portal**: <https://admin.taybeen.com/>
- **Production Backend API Service**: <https://api.taybeen.com/api/v1>

---

## 1. Prerequisites

Before starting the setup, ensure that your system has the following dependencies configured globally:

- **Node.js**: Version 20.x (LTS) or higher.
- **pnpm**: Version 10.x or higher (`corepack enable && corepack prepare pnpm@latest --activate`).
- **Git**: Version control CLI tool.

---

## 2. Environment Configurations

The storefront relies on environment variables inside `.env.local` to resolve endpoints. Create a `.env.local` file by copying the base template:

```bash
cp .env.example .env.local
```

Modify the environment keys as follows:

| Environment Key       | Category     | Development Default            | Production Endpoint              | Purpose                                 |
| --------------------- | ------------ | ------------------------------ | -------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | Application  | `http://localhost:3000`        | `https://taybeen.com/`           | Address of the storefront client server |
| `NEXT_PUBLIC_API_URL` | API Endpoint | `http://localhost:5000/api/v1` | `https://api.taybeen.com/api/v1` | Sibling backend REST server address     |

> [!NOTE]
> Make sure the backend server (typically running in the sibling folder [taybeen-backend-module1](../../taybeen-backend-module1) or hosted at `https://api.taybeen.com/api/v1`) is active on the configured `NEXT_PUBLIC_API_URL` port to process authentication requests and orders checkout.

---

## 3. Razorpay Payment Gateway Integration

The storefront uses Razorpay to secure credit card, debit card, and UPI operations.

- **SDK Loading**: The client asynchronously requests the Razorpay script from `https://checkout.razorpay.com/v1/checkout.js` only when a customer reaches the checkout verification state or triggers a payment retry inside their account orders panel.
- **Key Resolution**: To avoid exposing key parameters inside clientside environment bundles, the public key ID (`keyId`) is fetched dynamically from the backend server within the `POST /orders` response.
- **Testing**: In development, Razorpay transactions use test mode coordinates. Real debit transactions are disabled, and payment success tokens can be simulated inside the Razorpay modal.

---

## 4. Local Installation and Server Launch

1. **Clone and Navigate**:

   ```bash
   git clone https://github.com/taybeen-healthy/taybeen-frontend.git
   cd taybeen-frontend
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Start Local Development Server**:

   ```bash
   pnpm dev
   ```

   Open your browser to [http://localhost:3000](http://localhost:3000) to view the storefront landing page.

4. **Verify Build Integrity**:
   Run the static analysis check list before committing files:
   ```bash
   pnpm check
   ```
   _(Executes ESLint validation checks, Prettier styling verification, and TypeScript compiler tests)._
