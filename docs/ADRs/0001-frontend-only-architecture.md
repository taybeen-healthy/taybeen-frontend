# ADR 0001: Standalone Storefront-Only Frontend Repository Layout

- **Author / Lead Developer**: Aaditya Gunjal ([aadigunjal0975@gmail.com](mailto:aadigunjal0975@gmail.com))
- **Production Storefront**: <https://taybeen.com/>
- **Production Admin Portal**: <https://admin.taybeen.com/>
- **Production API Base Endpoint**: <https://api.taybeen.com/api/v1>

## Status

Approved

## Context

The Taybeen platform was originally conceptualized to have storefront and administrative dashboards bundled inside a single frontend codebase. However, customer storefronts require aggressive search engine optimization (SEO), fast initial page loads, and zero back-office logic blocks, while administrative portals require strict auth controls, extensive dashboard widgets, data tables, and live settings controls.

Having both systems in a single repository bloats the client bundle sizes for customers, exposes sensitive admin routes, and makes independent scaling complex.

## Decision

We decided to keep `taybeen-frontend` as a **dedicated, standalone customer storefront codebase**, completely isolated from the back-office admin dashboard. The administrative dashboard has been moved to its own sibling repository, `admin-taybeen`.

Key parameters for this storefront-only repository:

- **Scope Limit**: Only public e-commerce pages (catalog, product listings, reviews, checkout) and customer personal account options (`/my-account`, order progress status details, partner affiliate dashboards) are housed here.
- **Backend API Integration**: Communicates over CORS with the backend APIs via a unified Axios HTTP client.
- **Session Security**: Restricts access and state keys using secure HTTP cookies and localStorage values.
- **Standardized Quality Suite**: Configured Prettier formatting constraints, ESLint rules, and commitlint pre-checks.

## Consequences

### Pros

- **Optimized Customer Bundles**: Zero administrative code, charts, or heavy tabular libraries are shipped to store customers, reducing initial load latency.
- **Aesthetic Separation**: Visual design systems are restricted to storefront elements (organic colors, Playfair serif brand fonts), preventing styling leakage from admin table panels.
- **Segregated Access**: Back-office admin panels are isolated under private domains (`admin.taybeen.com`), narrowing the storefront access boundary.

### Cons

- **Dual Package Maintenance**: The storefront and admin portals manage separate dependency trees, but lockfile pinning (`pnpm`) manages these packages consistently.
- **Data Contract Alignment**: Shared TypeScript entity definitions (e.g. `Order`, `Product`) must be synchronized across both repositories, which is handled via matching models inside `/src/types/`.
