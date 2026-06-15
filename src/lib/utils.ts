import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number according to Indian numbering system (e.g. 2,00,000) */
export function formatIndianNumber(num: number | string): string {
  const parts = num.toString().split(".");
  let val = parts[0];
  const lastThree = val.substring(val.length - 3);
  const otherNumbers = val.substring(0, val.length - 3);
  if (otherNumbers !== "") {
    val = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    val = lastThree;
  }
  return parts.length > 1 ? `${val}.${parts[1]}` : val;
}

/** Format a number as Indian Currency (e.g. 2,00,000 or 2,00,000.00) */
export function formatIndianCurrency(amount: number, minimumFractionDigits = 0): string {
  const formatted = minimumFractionDigits > 0 ? amount.toFixed(minimumFractionDigits) : amount.toString();
  return formatIndianNumber(formatted);
}

