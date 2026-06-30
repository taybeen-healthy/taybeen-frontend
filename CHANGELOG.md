<!-- markdownlint-disable MD013 MD033 -->

# Changelog

All notable changes to the Taybeen Storefront project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-30

### Added

- **Repository Separation**: Segregated the repository to focus exclusively on the customer storefront application, decoupling administrative dashboard files to `admin-taybeen`.
- **Razorpay SDK Integration**: Dynamic scripts loader and backend validation callbacks hookup for Cards, UPI, and Net Banking orders checkout.
- **JWT Axios Client**: Custom Axios HTTP client featuring automatic headers setup and interceptors for 401 unauthorized session refresh loops.
- **Auth Callback Routing**: Authentication page route `/auth/callback` to capture redirect tokens and register profiles in secure cookies/localStorage.
- **Customer My Account Dashboard**: User profile panel mapping order details history, shipment progression milestones, and affiliate commission summaries.
- **Affiliate Partnerships Program**: Interactive registration application form and tracking link generator for approved partners.
- **Quality Tooling Configuration**: Integrated Prettier, ESLint check configurations, NVM engine locks, and commitlint hook rules.
