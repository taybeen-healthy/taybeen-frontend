"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { CheckoutAddressForm, CheckoutStep } from "@/types/checkout";
import { Hero } from "@/components/layout/Hero";
import {
  CheckoutForm,
  CheckoutReview,
  CheckoutOrderSummary
} from "@/components/checkout";
import {
  validateFirstName,
  validateLastName,
  validateStreetAddress,
  validateCity,
  validateCountry,
  validateStateProvince,
  validatePostalCode,
  validatePhone,
} from "@/utils/validation";

export const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>("form");
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [giftMessageOpen, setGiftMessageOpen] = useState(false);
  const [giftMessageText, setGiftMessageText] = useState("");

  const [shippingForm, setShippingForm] = useState<CheckoutAddressForm>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    country: "India",
    stateProvince: "",
    postalCode: "",
    phone: "",
  });

  const [billingForm, setBillingForm] = useState<CheckoutAddressForm>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    country: "India",
    stateProvince: "",
    postalCode: "",
    phone: "",
  });

  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});

  // Load profile / address values on mount to prefill form
  useEffect(() => {
    try {
      const storedProfileStr = localStorage.getItem("taybeen_profile");
      const storedBillingStr = localStorage.getItem("taybeen_billing");

      let profileData: any = null;
      let billingData: any = null;

      if (storedProfileStr) profileData = JSON.parse(storedProfileStr);
      if (storedBillingStr) billingData = JSON.parse(storedBillingStr);

      const defaultShipping = {
        firstName: billingData?.firstName || profileData?.firstName || "",
        lastName: billingData?.lastName || profileData?.lastName || "",
        streetAddress: billingData?.streetAddress || "",
        city: "",
        country: billingData?.country || "India",
        stateProvince: billingData?.stateProvince || "",
        postalCode: billingData?.postalCode || "",
        phone: billingData?.phone || profileData?.phone || "",
      };

      setShippingForm(defaultShipping);

      // If user saved a billing address, default the separate billing address state to it too
      setBillingForm({
        firstName: billingData?.firstName || "",
        lastName: billingData?.lastName || "",
        streetAddress: billingData?.streetAddress || "",
        city: "",
        country: billingData?.country || "India",
        stateProvince: billingData?.stateProvince || "",
        postalCode: billingData?.postalCode || "",
        phone: billingData?.phone || "",
      });
    } catch (e) {
      console.error("Failed to load prefill details from localStorage", e);
    }
  }, []);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.priceAtSelection * item.quantity,
    0
  );
  const shippingThreshold = 999;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 79;
  const total = subtotal + shippingCost;

  // Validate form addresses
  const validateForm = () => {
    const sErrors: Record<string, string> = {};
    const bErrors: Record<string, string> = {};

    // Validate shipping
    const sFirstNameErr = validateFirstName(shippingForm.firstName);
    if (sFirstNameErr) sErrors.firstName = sFirstNameErr;

    const sLastNameErr = validateLastName(shippingForm.lastName);
    if (sLastNameErr) sErrors.lastName = sLastNameErr;

    const sStreetErr = validateStreetAddress(shippingForm.streetAddress);
    if (sStreetErr) sErrors.streetAddress = sStreetErr;

    const sCityErr = validateCity(shippingForm.city);
    if (sCityErr) sErrors.city = sCityErr;

    const sCountryErr = validateCountry(shippingForm.country);
    if (sCountryErr) sErrors.country = sCountryErr;

    const sStateErr = validateStateProvince(shippingForm.stateProvince);
    if (sStateErr) sErrors.stateProvince = sStateErr;

    const sPostalErr = validatePostalCode(shippingForm.postalCode);
    if (sPostalErr) sErrors.postalCode = sPostalErr;

    const sPhoneErr = validatePhone(shippingForm.phone);
    if (sPhoneErr) sErrors.phone = sPhoneErr;

    // Validate billing if distinct
    if (!isBillingSame) {
      const bFirstNameErr = validateFirstName(billingForm.firstName);
      if (bFirstNameErr) bErrors.firstName = bFirstNameErr;

      const bLastNameErr = validateLastName(billingForm.lastName);
      if (bLastNameErr) bErrors.lastName = bLastNameErr;

      const bStreetErr = validateStreetAddress(billingForm.streetAddress);
      if (bStreetErr) bErrors.streetAddress = bStreetErr;

      const bCityErr = validateCity(billingForm.city);
      if (bCityErr) bErrors.city = bCityErr;

      const bCountryErr = validateCountry(billingForm.country);
      if (bCountryErr) bErrors.country = bCountryErr;

      const bStateErr = validateStateProvince(billingForm.stateProvince);
      if (bStateErr) bErrors.stateProvince = bStateErr;

      const bPostalErr = validatePostalCode(billingForm.postalCode);
      if (bPostalErr) bErrors.postalCode = bPostalErr;

      const bPhoneErr = validatePhone(billingForm.phone);
      if (bPhoneErr) bErrors.phone = bPhoneErr;
    }

    setShippingErrors(sErrors);
    setBillingErrors(bErrors);

    return Object.keys(sErrors).length === 0 && Object.keys(bErrors).length === 0;
  };

  const handleProceedAction = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (step === "form") {
      if (validateForm()) {
        setStep("review");
      }
    } else {
      // Place Order
      const orderId = `TYB-2024-${Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0')}`;
      
      const date = new Date();
      const day = date.getDate();
      const actualMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = actualMonths[date.getMonth()];
      const year = date.getFullYear();

      let suffix = "th";
      if (day === 1 || day === 21 || day === 31) suffix = "st";
      else if (day === 2 || day === 22) suffix = "nd";
      else if (day === 3 || day === 23) suffix = "rd";

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;

      const placedOn = `${day}${suffix} ${month} ${year} ${hours}:${minutes} ${ampm}`;
      const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

      const orderObject = {
        id: orderId,
        placedOn: placedOn,
        itemsCount: itemsCount,
        items: cartItems.map(item => ({
          id: item.product.id,
          name: item.product.name,
          weight: item.selectedWeight,
          quantity: item.quantity,
          price: item.priceAtSelection
        })),
        total: total,
        giftMessage: giftMessageOpen ? giftMessageText : undefined
      };

      localStorage.setItem("taybeen_last_order", JSON.stringify(orderObject));
      clearCart();
      router.push("/order-confirmed");
    }
  };

  // If cart is empty and we loaded, show browse fallback
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col justify-between selection:bg-brand-primary/30">
        <div>
          <Navbar />
          <main className="max-w-[600px] mx-auto px-6 py-20 text-center font-poppins">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-[#7D6B5E] text-sm sm:text-base mb-8">
              Add some of our premium date selections or gift boxes before proceeding to checkout.
            </p>
            <Button
              onClick={() => router.push("/products")}
              variant="primary"
              className="uppercase font-bold tracking-wider px-10 py-3"
            >
              BROWSE COLLECTION
            </Button>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between selection:bg-brand-primary/30">
      <div>
        <Navbar />

        <Hero />

        <main className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 pb-24 pt-8 sm:pt-12 w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
            
            <div className="flex-1 w-full">
              <div className="lg:hidden w-full mb-6">
                <CheckoutOrderSummary
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  total={total}
                  step={step}
                  onProceed={handleProceedAction}
                />
              </div>

              {step === "form" ? (
                <CheckoutForm
                  shippingForm={shippingForm}
                  onShippingFormChange={setShippingForm}
                  shippingErrors={shippingErrors}
                  billingForm={billingForm}
                  onBillingFormChange={setBillingForm}
                  billingErrors={billingErrors}
                  isBillingSame={isBillingSame}
                  onBillingSameChange={setIsBillingSame}
                  giftMessageOpen={giftMessageOpen}
                  onGiftMessageOpenChange={setGiftMessageOpen}
                  giftMessageText={giftMessageText}
                  onGiftMessageTextChange={setGiftMessageText}
                  onSubmit={handleProceedAction}
                />
              ) : (
                <CheckoutReview
                  shippingForm={shippingForm}
                  billingForm={billingForm}
                  isBillingSame={isBillingSame}
                  onEdit={() => setStep("form")}
                  onPaymentSubmit={handleProceedAction}
                />
              )}
            </div>

            <div className="hidden lg:block w-[380px] xl:w-[420px] flex-shrink-0">
              <CheckoutOrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
                step={step}
                onProceed={handleProceedAction}
              />
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
