/**
 * Application route constants for the taybeen-frontend store.
 */
export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
  AUTH_CALLBACK: "/auth/callback",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CHECKOUT: "/checkout",
  ORDER_CONFIRMED: "/order-confirmed",
  MY_ACCOUNT: "/my-account",
  PARTNERSHIPS: "/partnerships",
  CONTACT: "/contact",
  REVIEW: "/review",
  SHIPPING_AND_DELIVERY: "/shipping-and-delivery",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
} as const;
