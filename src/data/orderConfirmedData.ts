export interface OrderConfirmedLabels {
  orderIdLabel: string;
  placedOnLabel: string;
  itemsLabel: string;
  deliveryLabel: string;
  deliveryValue: string;
  confirmationSentLabel: string;
  confirmationSentValue: string;
}

export interface OrderConfirmedDataConfig {
  title: string;
  subtitle: string;
  labels: OrderConfirmedLabels;
  buttons: {
    continueShopping: string;
    backToHome: string;
  };
  support: {
    note: string;
    email: string;
  };
}

export const orderConfirmedData: OrderConfirmedDataConfig = {
  title: "Your order is Confirmed!",
  subtitle: "Thank you for choosing TAYBEEN. Your order is in good hands",
  labels: {
    orderIdLabel: "ORDER ID",
    placedOnLabel: "PLACED ON",
    itemsLabel: "ITEMS",
    deliveryLabel: "DELIVERY",
    deliveryValue: "3-4 days",
    confirmationSentLabel: "CONFIRMATION SENT",
    confirmationSentValue: "Check your inbox"
  },
  buttons: {
    continueShopping: "Continue Shopping",
    backToHome: "Back to Home"
  },
  support: {
    note: "Questions? Email us at Contactus@taybeen.in - We typically respond within a few hours.",
    email: "Contactus@taybeen.in"
  }
};
