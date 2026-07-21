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

export function formatIndianCurrency(amount: number, minimumFractionDigits = 0): string {
  const precision = Math.max(2, minimumFractionDigits);
  const rounded = Math.round(amount * Math.pow(10, precision)) / Math.pow(10, precision);
  const formatted =
    minimumFractionDigits > 0 ? rounded.toFixed(minimumFractionDigits) : rounded.toString();
  return formatIndianNumber(formatted);
}

export function getWeightInGrams(weightStr: string): number {
  if (!weightStr) return 0;
  const clean = weightStr.toLowerCase().replace(/\s+/g, "");
  
  if (clean === "kg" || clean === "kilogram") return 1000;
  if (clean === "g" || clean === "gram" || clean === "grams") return 1;

  const value = parseFloat(clean);
  if (isNaN(value)) return 0;

  if (clean.includes("kg") || clean.includes("kilogram")) {
    return Math.round(value * 1000);
  }
  return Math.round(value);
}

