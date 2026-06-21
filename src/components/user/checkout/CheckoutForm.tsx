import React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CheckoutAddressForm } from "@/types/checkout";
import { getCountryOptions, getStateOptions } from "@/utils/geoUtils";
import { CheckoutGiftMessage } from "./CheckoutGiftMessage";

interface PhoneCountrySelectProps {
  value?: string;
  onChange: (value?: string) => void;
  options: { value?: string; label: string }[];
  disabled?: boolean;
}

const PhoneCountrySelect: React.FC<PhoneCountrySelectProps> = ({ value, onChange, options }) => {
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
      const currentDigitsCount = digits.length - 2; // exclude 91
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
    const currentDigitsCount = currentDigits.length - 2; // exclude 91

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

interface CheckoutFormProps {
  shippingForm: CheckoutAddressForm;
  onShippingFormChange: (form: CheckoutAddressForm) => void;
  shippingErrors: Record<string, string>;
  billingForm: CheckoutAddressForm;
  onBillingFormChange: (form: CheckoutAddressForm) => void;
  billingErrors: Record<string, string>;
  isBillingSame: boolean;
  onBillingSameChange: (same: boolean) => void;
  giftMessageOpen: boolean;
  onGiftMessageOpenChange: (open: boolean) => void;
  giftMessageText: string;
  onGiftMessageTextChange: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSaveAddress: () => void;
  isSavingAddress: boolean;
  saveSuccessMsg: string | null;
  saveErrorMsg: string | null;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  shippingForm,
  onShippingFormChange,
  shippingErrors,
  billingForm,
  onBillingFormChange,
  billingErrors,
  isBillingSame,
  onBillingSameChange,
  giftMessageOpen,
  onGiftMessageOpenChange,
  giftMessageText,
  onGiftMessageTextChange,
  onSubmit,
  onSaveAddress,
  isSavingAddress,
  saveSuccessMsg,
  saveErrorMsg,
}) => {
  const countryOptions = getCountryOptions().map((c) => ({
    value: c.name,
    label: (
      <span className="flex items-center gap-2 text-xs sm:text-sm">
        <img
          src={`https://flagcdn.com/w20/${c.isoCode.toLowerCase()}.png`}
          alt={c.name}
          className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0"
          loading="lazy"
        />
        <span>{c.name}</span>
      </span>
    ),
    searchString: c.name,
  }));

  const shippingStateOptions = getStateOptions(shippingForm.country);
  const billingStateOptions = getStateOptions(billingForm.country);

  const handleShippingCountryChange = (countryName: string) => {
    const states = getStateOptions(countryName);
    const firstState = states.length > 0 ? states[0].value : "";
    onShippingFormChange({
      ...shippingForm,
      country: countryName,
      stateProvince: firstState,
    });
  };

  const handleBillingCountryChange = (countryName: string) => {
    const states = getStateOptions(countryName);
    const firstState = states.length > 0 ? states[0].value : "";
    onBillingFormChange({
      ...billingForm,
      country: countryName,
      stateProvince: firstState,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm text-left font-poppins">
        <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-brand-brown mb-6 tracking-wide">
          Shipping Information
        </h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                First Name<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={shippingForm.firstName}
                onChange={(e) =>
                  onShippingFormChange({ ...shippingForm, firstName: e.target.value })
                }
                placeholder="Enter Your Name"
                error={shippingErrors.firstName}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Last Name<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={shippingForm.lastName}
                onChange={(e) =>
                  onShippingFormChange({ ...shippingForm, lastName: e.target.value })
                }
                placeholder="Enter Your Name"
                error={shippingErrors.lastName}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
              Street Address<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={shippingForm.streetAddress}
              onChange={(e) =>
                onShippingFormChange({ ...shippingForm, streetAddress: e.target.value })
              }
              placeholder="Enter Street Address"
              error={shippingErrors.streetAddress}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
              City<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={shippingForm.city}
              onChange={(e) => onShippingFormChange({ ...shippingForm, city: e.target.value })}
              placeholder="Enter City"
              error={shippingErrors.city}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Country"
              required
              value={shippingForm.country}
              onChange={handleShippingCountryChange}
              options={countryOptions}
              error={shippingErrors.country}
              searchable
            />

            <div className="space-y-1.5 text-left">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Zip/ Postal Code<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={shippingForm.postalCode}
                onChange={(e) =>
                  onShippingFormChange({ ...shippingForm, postalCode: e.target.value })
                }
                placeholder="12345"
                error={shippingErrors.postalCode}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="State/ Province"
              required
              value={shippingForm.stateProvince}
              onChange={(val) => onShippingFormChange({ ...shippingForm, stateProvince: val })}
              options={shippingStateOptions}
              placeholder="Please select a region"
              error={shippingErrors.stateProvince}
              disabled={shippingStateOptions.length === 0}
              searchable
            />

            <div className="space-y-1.5 text-left">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Shipping Phone Number<span className="text-red-500">*</span>
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={shippingForm.phone}
                onChange={(val) => {
                  let phoneVal = val || "";
                  if (phoneVal.startsWith("+91")) {
                    const digits = phoneVal.slice(3).replace(/\D/g, "");
                    if (digits.length > 10) {
                      phoneVal = "+91" + digits.slice(0, 10);
                    }
                  }
                  onShippingFormChange({ ...shippingForm, phone: phoneVal });
                }}
                countrySelectComponent={PhoneCountrySelect}
                className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                numberInputProps={{
                  maxLength:
                    (shippingForm.phone || "").startsWith("+91") || !shippingForm.phone
                      ? 16
                      : undefined,
                  onKeyDown: handlePhoneKeyDown,
                  onPaste: handlePhonePaste,
                  className:
                    "w-full bg-transparent border-none py-3 px-1 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:ring-0 focus:border-none",
                }}
              />
              {shippingErrors.phone && (
                <span className="text-red-500 text-[10px] mt-1 block">{shippingErrors.phone}</span>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-5 border-t border-[#C4A482]/15">
            <span className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
              My billing and shipping address are the same
            </span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-[#3A2418] font-medium cursor-pointer">
                <input
                  type="radio"
                  name="isBillingSame"
                  checked={isBillingSame}
                  onChange={() => onBillingSameChange(true)}
                  className="accent-[#5A3E2B] w-4 h-4 cursor-pointer"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-[#3A2418] font-medium cursor-pointer">
                <input
                  type="radio"
                  name="isBillingSame"
                  checked={!isBillingSame}
                  onChange={() => onBillingSameChange(false)}
                  className="accent-[#5A3E2B] w-4 h-4 cursor-pointer"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-5 border-t border-[#C4A482]/15">
            <button
              type="button"
              disabled={isSavingAddress}
              onClick={onSaveAddress}
              className="bg-[#5A3E2B]/10 hover:bg-[#5A3E2B]/15 text-[#5A3E2B] font-poppins font-bold text-xs tracking-wider uppercase py-2.5 px-5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSavingAddress ? "Saving Address..." : "Save Address"}
            </button>
            {saveSuccessMsg && (
              <span className="text-xs font-semibold text-green-600 font-poppins animate-fadeIn">
                ✓ {saveSuccessMsg}
              </span>
            )}
            {saveErrorMsg && (
              <span className="text-xs font-semibold text-red-500 font-poppins animate-fadeIn">
                ⚠ {saveErrorMsg}
              </span>
            )}
          </div>

          <CheckoutGiftMessage
            isOpen={giftMessageOpen}
            onOpenChange={onGiftMessageOpenChange}
            message={giftMessageText}
            onMessageChange={onGiftMessageTextChange}
          />
        </div>
      </div>

      {!isBillingSame && (
        <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm text-left font-poppins animate-fadeIn">
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-brand-brown mb-6 tracking-wide">
            Billing Information
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                  First Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={billingForm.firstName}
                  onChange={(e) =>
                    onBillingFormChange({ ...billingForm, firstName: e.target.value })
                  }
                  placeholder="Enter Your Name"
                  error={billingErrors.firstName}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={billingForm.lastName}
                  onChange={(e) =>
                    onBillingFormChange({ ...billingForm, lastName: e.target.value })
                  }
                  placeholder="Enter Your Name"
                  error={billingErrors.lastName}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Street Address<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={billingForm.streetAddress}
                onChange={(e) =>
                  onBillingFormChange({ ...billingForm, streetAddress: e.target.value })
                }
                placeholder="Enter Street Address"
                error={billingErrors.streetAddress}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                City<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={billingForm.city}
                onChange={(e) => onBillingFormChange({ ...billingForm, city: e.target.value })}
                placeholder="Enter City"
                error={billingErrors.city}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Country"
                required
                value={billingForm.country}
                onChange={handleBillingCountryChange}
                options={countryOptions}
                error={billingErrors.country}
                searchable
              />

              <div className="space-y-1.5 text-left">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                  Zip/ Postal Code<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={billingForm.postalCode}
                  onChange={(e) =>
                    onBillingFormChange({ ...billingForm, postalCode: e.target.value })
                  }
                  placeholder="12345"
                  error={billingErrors.postalCode}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="State/ Province"
                required
                value={billingForm.stateProvince}
                onChange={(val) => onBillingFormChange({ ...billingForm, stateProvince: val })}
                options={billingStateOptions}
                placeholder="Please select a region"
                error={billingErrors.stateProvince}
                disabled={billingStateOptions.length === 0}
                searchable
              />

              <div className="space-y-1.5 text-left">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                  Billing Phone Number<span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={billingForm.phone}
                  onChange={(val) => {
                    let phoneVal = val || "";
                    if (phoneVal.startsWith("+91")) {
                      const digits = phoneVal.slice(3).replace(/\D/g, "");
                      if (digits.length > 10) {
                        phoneVal = "+91" + digits.slice(0, 10);
                      }
                    }
                    onBillingFormChange({ ...billingForm, phone: phoneVal });
                  }}
                  countrySelectComponent={PhoneCountrySelect}
                  className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                  numberInputProps={{
                    maxLength:
                      (billingForm.phone || "").startsWith("+91") || !billingForm.phone
                        ? 16
                        : undefined,
                    onKeyDown: handlePhoneKeyDown,
                    onPaste: handlePhonePaste,
                    className:
                      "w-full bg-transparent border-none py-3 px-1 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:ring-0 focus:border-none",
                  }}
                />
                {billingErrors.phone && (
                  <span className="text-red-500 text-[10px] mt-1 block">{billingErrors.phone}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
