export interface AffiliateTerm {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

export interface AffiliateApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  reason: string;
  agreeToTerms: boolean;
}

export interface PartnershipsPageData {
  title: string;
  subtitle: string;
  termsHeading: string;
  terms: AffiliateTerm[];
  formHeading: string;
}
