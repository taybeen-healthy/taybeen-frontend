import React from "react";
import BasePhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";

interface PhoneCountrySelectProps {
  value?: string;
  onChange: (value?: string) => void;
  options: { value?: string; label: string }[];
  disabled?: boolean;
}

const PhoneCountrySelect: React.FC<PhoneCountrySelectProps> = ({
  value,
  onChange,
  options,
  disabled,
}) => {
  const selectOptions = options.map((opt) => {
    const countryCode = opt.value;
    const countryName = opt.label;

    const flagUrl = countryCode ? `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png` : "";

    return {
      value: countryCode || "",
      label: (
        <span className="flex items-center gap-2 text-xs sm:text-sm">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={countryName}
              className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0"
              loading="lazy"
            />
          )}
          <span>{countryName}</span>
        </span>
      ),
      shortLabel: flagUrl ? (
        <img
          src={flagUrl}
          alt={countryName}
          className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0"
          loading="lazy"
        />
      ) : (
        <span>🌎</span>
      ),
      searchString: countryName,
    };
  });

  return (
    <Select
      value={value || ""}
      onChange={(val) => onChange(val || undefined)}
      options={selectOptions}
      variant="borderless"
      className="w-[65px] flex-shrink-0"
      searchable
      disabled={disabled}
    />
  );
};

const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
    "Escape",
    "Home",
    "End",
  ];
  if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }

  if (/^[0-9]$/.test(e.key)) {
    const target = e.currentTarget;
    const value = target.value || "";
    if (value.includes("+91")) {
      const digits = value.replace(/\D/g, "");
      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;
      const selectedText = value.substring(selectionStart, selectionEnd);
      const selectedDigitsCount = selectedText.replace(/\D/g, "").length;
      const currentDigitsCount = digits.length - 2;
      const netDigitsCount = currentDigitsCount - selectedDigitsCount;

      if (netDigitsCount >= 10) {
        e.preventDefault();
      }
    }
  }
};

const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const target = e.currentTarget;
  const value = target.value || "";
  if (value.includes("+91")) {
    const pastedData = e.clipboardData.getData("text");
    const pastedDigits = pastedData.replace(/\D/g, "");

    const selectionStart = target.selectionStart ?? 0;
    const selectionEnd = target.selectionEnd ?? 0;
    const selectedText = value.substring(selectionStart, selectionEnd);
    const selectedDigitsCount = selectedText.replace(/\D/g, "").length;

    const currentDigits = value.replace(/\D/g, "");
    const currentDigitsCount = currentDigits.length - 2;

    const netDigitsCount = currentDigitsCount - selectedDigitsCount;
    const remainingDigits = 10 - netDigitsCount;

    if (remainingDigits <= 0) {
      e.preventDefault();
    } else if (pastedDigits.length > remainingDigits) {
      e.preventDefault();
      const truncatedPastedDigits = pastedDigits.slice(0, remainingDigits);
      const newValue =
        value.slice(0, selectionStart) + truncatedPastedDigits + value.slice(selectionEnd);

      target.value = newValue;
      const event = new Event("input", { bubbles: true });
      target.dispatchEvent(event);
    }
  }
};

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: Country;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountry = "IN",
  placeholder = "Enter phone number",
  disabled,
  error,
  className,
  required,
}) => {
  return (
    <div className="w-full">
      <BasePhoneInput
        international
        defaultCountry={defaultCountry}
        value={value}
        onChange={(val) => {
          let phoneVal = val || "";
          if (phoneVal.startsWith("+91")) {
            const digits = phoneVal.slice(3).replace(/\D/g, "");
            if (digits.length > 10) {
              phoneVal = "+91" + digits.slice(0, 10);
            }
          }
          onChange(phoneVal);
        }}
        countrySelectComponent={PhoneCountrySelect}
        disabled={disabled}
        className={cn(
          "w-full flex items-center bg-white border focus-within:ring-1 rounded-lg px-3 transition-all",
          error
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-200"
            : "border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-[#F7A503]/20",
          className
        )}
        numberInputProps={{
          maxLength: (value || "").startsWith("+91") || !value ? 16 : undefined,
          onKeyDown: handlePhoneKeyDown,
          onPaste: handlePhonePaste,
          placeholder,
          required,
          disabled,
          className:
            "w-full bg-transparent border-none py-3 px-1 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:ring-0 focus:border-none",
        }}
      />
      {error && (
        <span className="text-red-500 font-poppins text-[10px] mt-1 block text-left font-semibold">
          {error}
        </span>
      )}
    </div>
  );
};

export default PhoneInput;
