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

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  if (!/^\+?[0-9\s-]{10,15}$/.test(phone.trim())) {
    return "Please enter a valid phone number";
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
