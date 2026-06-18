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
                onChange={(val) => onShippingFormChange({ ...shippingForm, phone: val || "" })}
                countrySelectComponent={PhoneCountrySelect}
                className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                numberInputProps={{
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
                  onChange={(val) => onBillingFormChange({ ...billingForm, phone: val || "" })}
                  countrySelectComponent={PhoneCountrySelect}
                  className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                  numberInputProps={{
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
