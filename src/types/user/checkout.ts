export interface CheckoutAddressForm {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  country: string;
  stateProvince: string;
  postalCode: string;
  phone: string;
}

export type CheckoutStep = "form" | "review";

export interface CheckoutOrderObject {
  id: string;
  placedOn: string;
  itemsCount: number;
  items: Array<{
    id: string;
    name: string;
    weight: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  giftMessage?: string;
}
