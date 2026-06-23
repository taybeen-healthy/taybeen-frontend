export interface ShippingSection {
  title: string;
  paragraphs: string[];
  bullets?: {
    title: string;
    items: string[];
  };
  footerText?: string;
}

export interface ShippingDeliveryData {
  title: string;
  sections: {
    processingTime: ShippingSection;
    shippingRates: ShippingSection;
    returnsPolicy: ShippingSection;
    replacementsRefunds: ShippingSection;
  };
}

export interface LegalPageData {
  title: string;
  paragraphs: string[];
}

export interface LegalData {
  shippingDelivery: ShippingDeliveryData;
  privacyPolicy: LegalPageData;
  termsConditions: LegalPageData;
}
