import { isValidPhoneNumber } from "react-phone-number-input";
import { getCountryIso } from "./geo";

export const validateFullName = (name: string): string | null => {
  if (!name.trim()) {
    return "Full name is required";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePhone = (phone: string, countryName?: string): string | null => {
  if (!phone || !phone.trim() || phone.trim() === "+") {
    return "Phone number is required";
  }

  const trimmed = phone.trim();

  if (countryName === "India" || countryName?.toLowerCase() === "india") {
    let rawNumber = trimmed.replace(/\D/g, "");
    if (rawNumber.startsWith("91")) {
      rawNumber = rawNumber.slice(2);
    }
    if (rawNumber.length !== 10) {
      return "Indian phone number must be exactly 10 digits";
    }
  }

  if (countryName) {
    const countryIso = getCountryIso(countryName) as any;
    if (!isValidPhoneNumber(trimmed, countryIso)) {
      return `Please enter a valid phone number for ${countryName}`;
    }
  } else {
    if (!isValidPhoneNumber(trimmed)) {
      return "Please enter a valid phone number";
    }
  }
  return null;
};

export const validatePassword = (password: string, isSignUp = false): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (isSignUp && password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirm: string): string | null => {
  if (password !== confirm) {
    return "Passwords do not match";
  }
  return null;
};

export const validateAcceptTerms = (accept: boolean): string | null => {
  if (!accept) {
    return "You must accept the terms and conditions";
  }
  return null;
};

export const validateFirstName = (firstName: string): string | null => {
  if (!firstName.trim()) {
    return "First name is required";
  }
  return null;
};

export const validateLastName = (lastName: string): string | null => {
  if (!lastName.trim()) {
    return "Last name is required";
  }
  return null;
};

export const validateStreetAddress = (address: string): string | null => {
  if (!address.trim()) {
    return "Street address is required";
  }
  return null;
};

export const validatePostalCode = (code: string): string | null => {
  if (!code.trim()) {
    return "Postal code is required";
  }
  if (!/^[0-9]{6}$/.test(code.trim())) {
    return "Postal code must be exactly 6 digits";
  }
  return null;
};

export const validateCountry = (country: string): string | null => {
  if (!country.trim()) {
    return "Country is required";
  }
  return null;
};

export const validateStateProvince = (state: string): string | null => {
  if (!state.trim() || state === "Please select a region or state") {
    return "State/Province is required";
  }
  return null;
};

export const validateCity = (city: string): string | null => {
  if (!city.trim()) {
    return "City is required";
  }
  return null;
};
