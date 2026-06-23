"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { partnershipsData } from "@/data/user/partnershipsData";
import { AffiliateApplicationForm } from "@/types";
import { apiClient } from "@/lib/apiClient";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateAcceptTerms,
} from "@/lib/utils/validation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Select } from "@/components/ui/Select";

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

export const PartnershipsPage: React.FC = () => {
  const router = useRouter();
  const { title, subtitle, termsHeading, terms, formHeading } = partnershipsData;

  const [form, setForm] = useState<AffiliateApplicationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    occupation: "",
    reason: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhoneChange = (val?: string) => {
    let phoneVal = val || "";
    if (phoneVal.startsWith("+91")) {
      const digits = phoneVal.slice(3).replace(/\D/g, "");
      if (digits.length > 10) {
        phoneVal = "+91" + digits.slice(0, 10);
      }
    }
    setForm((prev) => ({ ...prev, phone: phoneVal }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    const firstNameErr = validateFirstName(form.firstName);
    if (firstNameErr) errs.firstName = firstNameErr;

    const lastNameErr = validateLastName(form.lastName);
    if (lastNameErr) errs.lastName = lastNameErr;

    const emailErr = validateEmail(form.email);
    if (emailErr) errs.email = emailErr;

    const phoneErr = validatePhone(form.phone);
    if (phoneErr) errs.phone = phoneErr;

    const termsErr = validateAcceptTerms(form.agreeToTerms);
    if (termsErr) errs.agreeToTerms = termsErr;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await apiClient.post("/affiliates/apply", {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        city: form.city,
        occupation: form.occupation,
        whyJoin: form.reason,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Affiliate apply error:", err);
      setSubmitError(
        err.response?.data?.message || "Failed to submit application. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />

        <Hero src="/OurProducts Header.png" alt="Become a Taybeen Affiliate Banner" />

        <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 sm:py-16 md:py-20 text-left font-poppins">
          {!isSubmitted && (
            <>
              <div className="mb-10 text-left space-y-4">
                <h1 className="font-serif font-bold text-[#5A3E2B] text-3xl sm:text-4xl md:text-5xl leading-tight">
                  {title}
                </h1>
                <p className="text-brand-green/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </div>

              <div className="bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
                <h2 className="font-serif font-bold text-[#5A3E2B] text-xl sm:text-2xl mb-6 pb-3 border-b border-[#C4A482]/15">
                  {termsHeading}
                </h2>
                <div className="space-y-6">
                  {terms.map((term) => (
                    <div key={term.id} className="flex gap-4 items-start text-left">
                      <div className="w-8 h-8 rounded-full bg-[#FFDA8C]/30 text-[#5A3E2B] flex items-center justify-center font-semibold text-sm sm:text-base flex-shrink-0 mt-0.5 select-none">
                        {term.stepNumber}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-[#5A3E2B] text-sm">{term.title}</h4>
                        <p className="text-brand-green/95 text-xs sm:text-sm leading-relaxed">
                          {term.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!isSubmitted ? (
            <div className="space-y-8">
              <h2 className="font-serif font-bold text-[#5A3E2B] text-2xl sm:text-3xl border-b border-[#C4A482]/25 pb-4">
                {formHeading}
              </h2>

              {submitError && (
                <div className="text-red-500 font-poppins text-sm font-semibold bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[#5A3E2B] text-sm font-semibold block">
                      First Name*
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Enter Name"
                      value={form.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#5A3E2B] text-sm sm:text-base font-bold block">
                      Last Name*
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Enter Name"
                      value={form.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#5A3E2B] text-sm sm:text-base font-bold block">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter Mail"
                      value={form.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[#5A3E2B] text-sm sm:text-base font-bold block">
                      Phone Number
                    </label>
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      countrySelectComponent={PhoneCountrySelect}
                      className="w-full flex items-center bg-white border border-[#C4A482]/40 focus-within:border-[#F7A503] focus-within:ring-1 focus-within:ring-[#F7A503]/20 rounded-lg px-3 transition-all"
                      numberInputProps={{
                        maxLength:
                          (form.phone || "").startsWith("+91") || !form.phone ? 16 : undefined,
                        onKeyDown: handlePhoneKeyDown,
                        onPaste: handlePhonePaste,
                        className:
                          "w-full bg-transparent border-none py-3 px-1 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:ring-0 focus:border-none",
                      }}
                    />
                    {errors.phone && (
                      <span className="text-red-500 font-poppins text-[10px] mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#5A3E2B] text-sm sm:text-base font-bold block">
                      City
                    </label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={form.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#5A3E2B] text-sm sm:text-base font-bold block">
                      Occupation
                    </label>
                    <Input
                      type="text"
                      name="occupation"
                      placeholder="e.g. Nutritionist"
                      value={form.occupation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#5A3E2B] text-sm sm:text-base font-bold block">
                    Why do you want to be a Taybeen affiliate?
                  </label>
                  <Textarea
                    name="reason"
                    rows={6}
                    placeholder="Tell us how you plan to share Taybeen with your audience and why you love the product."
                    value={form.reason}
                    onChange={handleInputChange}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex gap-3 items-start cursor-pointer group text-left">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={form.agreeToTerms}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border border-[#C4A482]/35 text-[#5A3E2B] focus:ring-brand-primary cursor-pointer mt-0.5"
                    />
                    <span className="text-brand-green font-medium text-xs sm:text-sm leading-relaxed select-none">
                      I have read and agree to the{" "}
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-[#F7A503] font-semibold hover:underline cursor-pointer"
                      >
                        Taybeen Affiliate Terms & Conditions
                      </span>{" "}
                      listed above and confirm that all information provided is accurate.
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-red-500 text-xs font-semibold pl-8">{errors.agreeToTerms}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="uppercase font-bold text-xs sm:text-sm tracking-wider py-3.5 px-10 shadow-md active:scale-95 duration-200"
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-[#4A5E28]/10 border border-[#4A5E28]/20 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#4A5E28]/25 text-[#4A5E28] flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-serif text-[#5A3E2B] text-2xl font-bold">
                Application Submitted!
              </h3>
              <p className="text-brand-green max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                Thank you for applying to the Taybeen Affiliate Program! We have received your
                details and will review them. Our team will get back to you via email within 2-3
                business days.
              </p>
              <div className="pt-4 flex justify-center">
                <Button
                  onClick={() => router.push("/my-account")}
                  variant="primary"
                  className="uppercase font-bold text-xs sm:text-sm tracking-wider py-3 px-8 shadow-md active:scale-95 duration-200"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PartnershipsPage;
