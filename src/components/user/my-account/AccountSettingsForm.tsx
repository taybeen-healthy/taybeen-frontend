"use client";

import React, { useState, useRef } from "react";
import { User, Pencil, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AccountProfileForm, BillingAddressForm } from "@/types/myAccount";
import { getCountryOptions, getStateOptions } from "@/utils/geoUtils";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateStreetAddress,
  validateCountry,
  validateStateProvince,
  validatePostalCode,
} from "@/utils/validation";

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

    const flagUrl = countryCode
      ? `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
      : "";

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

interface AccountSettingsFormProps {
  profile: AccountProfileForm;
  billing: BillingAddressForm;
  onSaveProfile: (updatedProfile: AccountProfileForm) => void;
  onSaveBilling: (updatedBilling: BillingAddressForm) => void;
}

export const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  profile,
  billing,
  onSaveProfile,
  onSaveBilling,
}) => {
  // Local state for profile form
  const [profileForm, setProfileForm] = useState<AccountProfileForm>({ ...profile });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Local state for billing form
  const [billingForm, setBillingForm] = useState<BillingAddressForm>({ ...billing });
  const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
  const [billingSuccess, setBillingSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic list of countries with flag images (renders flags correctly on all OS)
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

  // Dynamic list of states for selected country
  const stateOptions = getStateOptions(billingForm.country);

  // Handle country dropdown changes (resets selected state)
  const handleCountryChange = (countryName: string) => {
    const states = getStateOptions(countryName);
    const firstStateName = states.length > 0 ? states[0].value : "";
    setBillingForm((prev) => ({
      ...prev,
      country: countryName,
      stateProvince: firstStateName,
    }));
  };

  // Avatar upload handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileForm((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Profile save validation and submit
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const firstNameErr = validateFirstName(profileForm.firstName);
    if (firstNameErr) errors.firstName = firstNameErr;

    const lastNameErr = validateLastName(profileForm.lastName);
    if (lastNameErr) errors.lastName = lastNameErr;

    const emailErr = validateEmail(profileForm.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(profileForm.phone);
    if (phoneErr) errors.phone = phoneErr;

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setProfileSuccess(false);
      return;
    }

    setProfileErrors({});
    onSaveProfile(profileForm);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);
  };

  // Billing save validation and submit
  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const firstNameErr = validateFirstName(billingForm.firstName);
    if (firstNameErr) errors.firstName = firstNameErr;

    const lastNameErr = validateLastName(billingForm.lastName);
    if (lastNameErr) errors.lastName = lastNameErr;

    const streetAddressErr = validateStreetAddress(billingForm.streetAddress);
    if (streetAddressErr) errors.streetAddress = streetAddressErr;

    const countryErr = validateCountry(billingForm.country);
    if (countryErr) errors.country = countryErr;

    const stateProvinceErr = validateStateProvince(billingForm.stateProvince);
    if (stateProvinceErr) errors.stateProvince = stateProvinceErr;

    const postalCodeErr = validatePostalCode(billingForm.postalCode);
    if (postalCodeErr) errors.postalCode = postalCodeErr;

    if (billingForm.email) {
      const emailErr = validateEmail(billingForm.email);
      if (emailErr) errors.email = emailErr;
    }

    if (billingForm.phone) {
      const phoneErr = validatePhone(billingForm.phone);
      if (phoneErr) errors.phone = phoneErr;
    }

    if (Object.keys(errors).length > 0) {
      setBillingErrors(errors);
      setBillingSuccess(false);
      return;
    }

    setBillingErrors({});
    onSaveBilling(billingForm);
    setBillingSuccess(true);
    setTimeout(() => setBillingSuccess(false), 4000);
  };

  return (
    <div className="w-full space-y-8 font-poppins">
      <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl shadow-sm text-left">
        <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-[#C4A482]/20">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-brand-brown">
            Account Settings
          </h2>
        </div>

        <form onSubmit={handleProfileSubmit} className="p-5 sm:p-7 md:p-8 space-y-6">
          {profileSuccess && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium animate-fadeIn">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
              <span>Profile settings saved successfully!</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <div
                onClick={triggerFileSelect}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-brand-brown/15 bg-[#FDFBF7] flex items-center justify-center text-brand-brown/60 relative cursor-pointer overflow-hidden group-hover:border-[#C4A482]/50 transition-all shadow-sm"
              >
                {profileForm.avatarUrl ? (
                  <img
                    src={profileForm.avatarUrl}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={52} strokeWidth={1} />
                )}
              </div>
              <button
                type="button"
                onClick={triggerFileSelect}
                className="absolute bottom-1 right-1 w-9 h-9 bg-white hover:bg-[#FDFBF7] text-brand-brown border border-[#C4A482]/60 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors active:scale-95"
                title="Change Avatar"
              >
                <Pencil size={15} className="text-brand-brown" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    placeholder="Enter Your Name"
                    error={profileErrors.firstName}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    placeholder="Enter Your Name"
                    error={profileErrors.lastName}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                  Email<span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  placeholder="Enter your email"
                  error={profileErrors.email}
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={profileForm.phone}
                  onChange={(val) => setProfileForm({ ...profileForm, phone: val || "" })}
                  countrySelectComponent={PhoneCountrySelect}
                  className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                  numberInputProps={{
                    className: "w-full bg-transparent border-none py-3 px-1 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:ring-0 focus:border-none",
                  }}
                />
                {profileErrors.phone && (
                  <span className="text-red-500 font-poppins text-[10px] mt-1 block">
                    {profileErrors.phone}
                  </span>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full md:w-auto uppercase font-bold text-xs sm:text-sm tracking-wider shadow-md hover:shadow-lg hover:bg-opacity-95 active:scale-[0.98]"
                >
                  SAVE CHANGES
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl shadow-sm text-left">
        <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-[#C4A482]/20">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-brand-brown">
            Billing Address
          </h2>
        </div>

        <form onSubmit={handleBillingSubmit} className="p-5 sm:p-7 md:p-8 space-y-5">
          {billingSuccess && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium animate-fadeIn">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
              <span>Billing Address saved successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                First Name<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={billingForm.firstName}
                onChange={(e) => setBillingForm({ ...billingForm, firstName: e.target.value })}
                placeholder="Enter Name"
                error={billingErrors.firstName}
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Last Name<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={billingForm.lastName}
                onChange={(e) => setBillingForm({ ...billingForm, lastName: e.target.value })}
                placeholder="Enter Name"
                error={billingErrors.lastName}
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
              Street Address<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={billingForm.streetAddress}
              onChange={(e) => setBillingForm({ ...billingForm, streetAddress: e.target.value })}
              placeholder="Enter Street Address"
              error={billingErrors.streetAddress}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Country"
              required
              value={billingForm.country}
              onChange={handleCountryChange}
              options={countryOptions}
              error={billingErrors.country}
              searchable
            />

            <Select
              label="State/Province"
              required
              value={billingForm.stateProvince}
              onChange={(val) => setBillingForm({ ...billingForm, stateProvince: val })}
              options={stateOptions}
              placeholder="Please select a region or state"
              error={billingErrors.stateProvince}
              disabled={stateOptions.length === 0}
              searchable
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
              Postal Code<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={billingForm.postalCode}
              onChange={(e) => setBillingForm({ ...billingForm, postalCode: e.target.value })}
              placeholder="Postal Code"
              error={billingErrors.postalCode}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Email
              </label>
              <Input
                type="email"
                value={billingForm.email}
                onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                placeholder="Enter Email"
                error={billingErrors.email}
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
                Phone
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={billingForm.phone}
                onChange={(val) => setBillingForm({ ...billingForm, phone: val || "" })}
                countrySelectComponent={PhoneCountrySelect}
                className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                numberInputProps={{
                  className: "w-full bg-transparent border-none py-3 px-1 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:ring-0 focus:border-none",
                }}
              />
              {billingErrors.phone && (
                <span className="text-red-500 font-poppins text-[10px] mt-1 block">
                  {billingErrors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full md:w-auto uppercase font-bold text-xs sm:text-sm tracking-wider shadow-md hover:shadow-lg hover:bg-opacity-95 active:scale-[0.98] px-12 py-3"
            >
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
