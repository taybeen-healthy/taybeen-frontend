"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { CheckoutAddressForm, CheckoutStep } from "@/types/checkout";
import { Hero } from "@/components/layout/Hero";
import { apiClient } from "@/lib/apiClient";
import { loadRazorpayScript } from "@/utils/loadScript";
import {
  CheckoutForm,
  CheckoutReview,
  CheckoutOrderSummary,
  CouponCard,
} from "@/components/user/checkout";
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

import { useCustomization } from "@/context/CustomizationContext";

export const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { delivery } = useCustomization();

  const [step, setStep] = useState<CheckoutStep>("form");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);
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

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);
  const shippingThreshold = delivery.maximumAmount;
  const shippingCost = subtotal >= shippingThreshold ? 0 : delivery.deliveryCharges;

  const discount = appliedCoupon ? discountAmount : 0;
  const total = Math.max(0, subtotal + shippingCost - discount);

  const handleApplyCoupon = async (code: string): Promise<boolean> => {
    if (!code) return false;
    setCouponError(null);
    setCouponSuccess(null);

    try {
      const res = await apiClient.post("/coupons/validate", {
        code,
        orderSubtotal: subtotal,
      });

      const validationData = res.data?.data || res.data;

      if (validationData?.valid) {
        setAppliedCoupon(code);
        setDiscountAmount(validationData.discountAmount);
        setCouponSuccess(validationData.message || `Coupon "${code}" applied!`);
        return true;
      } else {
        setCouponError(validationData?.message || "Invalid coupon code");
        return false;
      }
    } catch (err: any) {
      setCouponError(err.response?.data?.message || "Failed to validate coupon code");
      return false;
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponSuccess(null);
    setCouponError(null);
  };

  const validateForm = () => {
    const sErrors: Record<string, string> = {};
    const bErrors: Record<string, string> = {};

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

  const initiateRazorpayPayment = async (orderId: string, razorpayOrder: any) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentError("Failed to load Razorpay SDK. Please check your connection.");
      setIsProcessingPayment(false);
      return;
    }

    const storedProfileStr = localStorage.getItem("taybeen_profile");
    let profileData: any = null;
    if (storedProfileStr) profileData = JSON.parse(storedProfileStr);

    const options = {
      key: razorpayOrder.keyId,
      amount: Math.round(razorpayOrder.amount * 100),
      currency: razorpayOrder.currency,
      name: "Taybeen Premium Dates",
      description: `Order #${razorpayOrder.hexId}`,
      order_id: razorpayOrder.razorpayOrderId,
      handler: async (response: any) => {
        setIsProcessingPayment(true);
        try {
          const verifyRes = await apiClient.post("/payments/verify", {
            orderId: orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (verifyRes.data) {
            localStorage.setItem("taybeen_last_order", JSON.stringify(verifyRes.data));
            clearCart();
            router.push("/order-confirmed");
          }
        } catch (err: any) {
          setPaymentError(err.response?.data?.message || "Payment verification failed.");
        } finally {
          setIsProcessingPayment(false);
        }
      },
      prefill: {
        name: `${shippingForm.firstName} ${shippingForm.lastName}`,
        email: profileData?.email || shippingForm.phone + "@taybeen.local",
        contact: shippingForm.phone,
      },
      theme: {
        color: "#4A5E28",
      },
      modal: {
        ondismiss: () => {
          setIsProcessingPayment(false);
          setPaymentError("Payment process cancelled by user. You can click 'PROCEED TO MAKE PAYMENT' to try again.");
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleProceedAction = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (step === "form") {
      if (validateForm()) {
        setStep("review");
      }
    } else {
      setIsProcessingPayment(true);
      setPaymentError(null);

      const storedProfileStr = localStorage.getItem("taybeen_profile");
      let profileData: any = null;
      if (storedProfileStr) profileData = JSON.parse(storedProfileStr);

      try {
        let order = createdOrder;

        if (!order) {
          const orderPayload = {
            items: cartItems.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              weight: item.selectedWeight,
            })),
            couponCode: appliedCoupon || undefined,
            paymentMethod: "UPI",
            shippingAddress: {
              firstName: shippingForm.firstName,
              lastName: shippingForm.lastName,
              streetAddress: shippingForm.streetAddress,
              city: shippingForm.city,
              stateProvince: shippingForm.stateProvince,
              postalCode: shippingForm.postalCode,
              country: shippingForm.country,
              phone: shippingForm.phone,
              email: profileData?.email || "customer@taybeen.local",
            },
            billingAddress: isBillingSame
              ? undefined
              : {
                  firstName: billingForm.firstName,
                  lastName: billingForm.lastName,
                  streetAddress: billingForm.streetAddress,
                  city: billingForm.city,
                  stateProvince: billingForm.stateProvince,
                  postalCode: billingForm.postalCode,
                  country: billingForm.country,
                  phone: billingForm.phone,
                  email: profileData?.email || "customer@taybeen.local",
                },
            giftMessage: giftMessageOpen ? giftMessageText : undefined,
          };

          const orderResponse = await apiClient.post("/orders", orderPayload);
          order = orderResponse.data?.data || orderResponse.data;
          setCreatedOrder(order);
        }

        const paymentOrderResponse = await apiClient.post("/payments/orders", {
          orderId: order.id,
        });
        const paymentOrder = paymentOrderResponse.data?.data || paymentOrderResponse.data;

        await initiateRazorpayPayment(order.id, paymentOrder);

      } catch (err: any) {
        setPaymentError(err.response?.data?.message || "Failed to initiate payment. Please try again.");
        setIsProcessingPayment(false);
      }
    }
  };

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
              {paymentError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-poppins font-medium flex items-center justify-between">
                  <span>{paymentError}</span>
                  <button onClick={() => setPaymentError(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
                </div>
              )}

              {isProcessingPayment && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-poppins font-medium flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                  <span>Processing, please wait...</span>
                </div>
              )}

              <div className="lg:hidden w-full mb-6">
                <CheckoutOrderSummary
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  total={total}
                  discount={discount}
                  step={step}
                  onProceed={handleProceedAction}
                />
                <CouponCard
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={handleApplyCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                  couponError={couponError}
                  couponSuccess={couponSuccess}
                  setCouponError={setCouponError}
                  setCouponSuccess={setCouponSuccess}
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
                discount={discount}
                step={step}
                onProceed={handleProceedAction}
              />
              <CouponCard
                appliedCoupon={appliedCoupon}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                couponError={couponError}
                couponSuccess={couponSuccess}
                setCouponError={setCouponError}
                setCouponSuccess={setCouponSuccess}
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
