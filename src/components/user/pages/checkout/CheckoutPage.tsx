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
  const [paymentMethod, setPaymentMethod] = useState<string>("Razorpay");
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [saveErrorMsg, setSaveErrorMsg] = useState<string | null>(null);

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
    const loadInitialAddresses = async () => {
      try {
        const draftShipping = localStorage.getItem("taybeen_checkout_draft_shipping");
        const draftBilling = localStorage.getItem("taybeen_checkout_draft_billing");
        const draftIsBillingSame = localStorage.getItem("taybeen_checkout_draft_is_billing_same");

        let initialShipping: CheckoutAddressForm | null = null;
        let initialBilling: CheckoutAddressForm | null = null;
        let initialIsBillingSame = true;

        if (draftShipping) {
          const parsed = JSON.parse(draftShipping);
          if (parsed.streetAddress?.trim()) {
            initialShipping = parsed;
          }
        }
        if (draftBilling) {
          const parsed = JSON.parse(draftBilling);
          if (parsed.streetAddress?.trim()) {
            initialBilling = parsed;
          }
          if (draftIsBillingSame !== null) {
            initialIsBillingSame = draftIsBillingSame === "true";
          }
        }

        // Helper to check address validity
        const checkAddressValid = (addr: CheckoutAddressForm) => {
          return (
            !validateFirstName(addr.firstName) &&
            !validateLastName(addr.lastName) &&
            !validateStreetAddress(addr.streetAddress) &&
            !validateCity(addr.city) &&
            !validateCountry(addr.country) &&
            !validateStateProvince(addr.stateProvince) &&
            !validatePostalCode(addr.postalCode) &&
            !validatePhone(addr.phone, addr.country)
          );
        };

        if (initialShipping && initialBilling) {
          setShippingForm(initialShipping);
          setBillingForm(initialBilling);
          setIsBillingSame(initialIsBillingSame);

          const isShippingValid = checkAddressValid(initialShipping);
          const isBillingValid = initialIsBillingSame || checkAddressValid(initialBilling);

          if (isShippingValid && isBillingValid) {
            setStep("review");
          }
          return;
        }

        // If no drafts, try to load from backend API first
        const exampleAddr: CheckoutAddressForm = {
          firstName: "Example",
          lastName: "User",
          streetAddress: "123, Example Street",
          city: "City",
          stateProvince: "State",
          postalCode: "123456",
          country: "India",
          phone: "+919876543210",
        };

        try {
          const res = await apiClient.get("/customers/me");
          const cust = res.data?.data || res.data;
          if (cust) {
            const nameParts = (cust.name || "").trim().split(/\s+/);
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            const profileData = {
              firstName,
              lastName,
              email: cust.email || "",
              phone: cust.phone || "",
              avatarUrl: cust.avatarUrl || undefined,
            };
            localStorage.setItem("taybeen_profile", JSON.stringify(profileData));

            let shippingAddr: CheckoutAddressForm = {
              firstName: firstName || exampleAddr.firstName,
              lastName: lastName || exampleAddr.lastName,
              streetAddress:
                cust.shippingAddress?.street ||
                cust.shippingAddress?.streetAddress ||
                exampleAddr.streetAddress,
              city: cust.shippingAddress?.city || exampleAddr.city,
              country: cust.shippingAddress?.country || exampleAddr.country,
              stateProvince:
                cust.shippingAddress?.state ||
                cust.shippingAddress?.stateProvince ||
                exampleAddr.stateProvince,
              postalCode: cust.shippingAddress?.postalCode || exampleAddr.postalCode,
              phone: cust.shippingAddress?.phone || cust.phone || exampleAddr.phone,
            };

            let billingAddr: CheckoutAddressForm = {
              firstName: firstName || exampleAddr.firstName,
              lastName: lastName || exampleAddr.lastName,
              streetAddress:
                cust.billingAddress?.street ||
                cust.billingAddress?.streetAddress ||
                exampleAddr.streetAddress,
              city: cust.billingAddress?.city || exampleAddr.city,
              country: cust.billingAddress?.country || exampleAddr.country,
              stateProvince:
                cust.billingAddress?.state ||
                cust.billingAddress?.stateProvince ||
                exampleAddr.stateProvince,
              postalCode: cust.billingAddress?.postalCode || exampleAddr.postalCode,
              phone: cust.billingAddress?.phone || cust.phone || exampleAddr.phone,
            };

            // Align shipping and billing if only one was returned in DB
            if (cust.billingAddress && !cust.shippingAddress) {
              shippingAddr = { ...billingAddr };
            } else if (cust.shippingAddress && !cust.billingAddress) {
              billingAddr = { ...shippingAddr };
            }

            // Sync with local storage if from DB
            if (cust.billingAddress) {
              localStorage.setItem("taybeen_billing", JSON.stringify(billingAddr));
            }

            setShippingForm(shippingAddr);
            setBillingForm(billingAddr);
            setIsBillingSame(true);

            const isShippingValid = checkAddressValid(shippingAddr);
            const isBillingValid = checkAddressValid(billingAddr);

            if (isShippingValid && isBillingValid) {
              setStep("review");
            }
            return;
          }
        } catch (apiErr) {
          console.warn(
            "Failed to fetch customer profile from API, falling back to localStorage:",
            apiErr
          );
        }

        // Fallback to local storage if API fails or isn't logged in
        const storedProfileStr = localStorage.getItem("taybeen_profile");
        const storedBillingStr = localStorage.getItem("taybeen_billing");

        let profileData: any = null;
        let billingData: any = null;

        if (storedProfileStr) profileData = JSON.parse(storedProfileStr);
        if (storedBillingStr) billingData = JSON.parse(storedBillingStr);

        const loadedShipping: CheckoutAddressForm = {
          firstName: billingData?.firstName || profileData?.firstName || exampleAddr.firstName,
          lastName: billingData?.lastName || profileData?.lastName || exampleAddr.lastName,
          streetAddress: billingData?.streetAddress || exampleAddr.streetAddress,
          city: billingData?.city || exampleAddr.city,
          country: billingData?.country || exampleAddr.country,
          stateProvince: billingData?.stateProvince || exampleAddr.stateProvince,
          postalCode: billingData?.postalCode || exampleAddr.postalCode,
          phone: billingData?.phone || profileData?.phone || exampleAddr.phone,
        };

        const loadedBilling: CheckoutAddressForm = {
          firstName: billingData?.firstName || exampleAddr.firstName,
          lastName: billingData?.lastName || exampleAddr.lastName,
          streetAddress: billingData?.streetAddress || exampleAddr.streetAddress,
          city: billingData?.city || exampleAddr.city,
          country: billingData?.country || exampleAddr.country,
          stateProvince: billingData?.stateProvince || exampleAddr.stateProvince,
          postalCode: billingData?.postalCode || exampleAddr.postalCode,
          phone: billingData?.phone || exampleAddr.phone,
        };

        setShippingForm(loadedShipping);
        setBillingForm(loadedBilling);
        setIsBillingSame(true);

        const isShippingValid = checkAddressValid(loadedShipping);
        const isBillingValid = checkAddressValid(loadedBilling);

        if (isShippingValid && isBillingValid) {
          setStep("review");
        }
      } catch (e) {
        console.error("Failed to load prefill details:", e);
      }
    };

    loadInitialAddresses();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("taybeen_checkout_draft_shipping", JSON.stringify(shippingForm));
    } catch (e) {
      console.error("Failed to save shipping form draft", e);
    }
  }, [shippingForm]);

  useEffect(() => {
    try {
      localStorage.setItem("taybeen_checkout_draft_billing", JSON.stringify(billingForm));
    } catch (e) {
      console.error("Failed to save billing form draft", e);
    }
  }, [billingForm]);

  useEffect(() => {
    try {
      localStorage.setItem("taybeen_checkout_draft_is_billing_same", String(isBillingSame));
    } catch (e) {
      console.error("Failed to save isBillingSame draft", e);
    }
  }, [isBillingSame]);

  useEffect(() => {
    const pin = shippingForm.postalCode.trim();
    if (/^[0-9]{6}$/.test(pin) && shippingForm.country === "India") {
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => res.json())
        .then((data) => {
          if (
            data &&
            data[0] &&
            data[0].Status === "Success" &&
            data[0].PostOffice &&
            data[0].PostOffice[0]
          ) {
            const postOffice = data[0].PostOffice[0];
            const state = postOffice.State;
            const city = postOffice.District || postOffice.Block || "";
            setShippingForm((prev) => ({
              ...prev,
              stateProvince: state,
              city: city,
            }));
            setShippingErrors((prev) => ({ ...prev, postalCode: "" }));
          }
        })
        .catch((err) => console.error("Error fetching pincode data:", err));
    }
  }, [shippingForm.postalCode, shippingForm.country]);

  useEffect(() => {
    if (isBillingSame) return;
    const pin = billingForm.postalCode.trim();
    if (/^[0-9]{6}$/.test(pin) && billingForm.country === "India") {
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => res.json())
        .then((data) => {
          if (
            data &&
            data[0] &&
            data[0].Status === "Success" &&
            data[0].PostOffice &&
            data[0].PostOffice[0]
          ) {
            const postOffice = data[0].PostOffice[0];
            const state = postOffice.State;
            const city = postOffice.District || postOffice.Block || "";
            setBillingForm((prev) => ({
              ...prev,
              stateProvince: state,
              city: city,
            }));
            setBillingErrors((prev) => ({ ...prev, postalCode: "" }));
          }
        })
        .catch((err) => console.error("Error fetching pincode data:", err));
    }
  }, [billingForm.postalCode, billingForm.country, isBillingSame]);

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);
  const discount = appliedCoupon ? discountAmount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);

  const shippingThreshold = delivery.maximumAmount;
  const shippingCost = discountedSubtotal >= shippingThreshold ? 0 : delivery.deliveryCharges;

  const gstPercent = delivery.gstPercent || 5;
  const gstCost = Math.round(((discountedSubtotal * gstPercent) / 100) * 100) / 100;
  const total = Math.max(0, discountedSubtotal + shippingCost + gstCost);

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

    const sPhoneErr = validatePhone(shippingForm.phone, shippingForm.country);
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

      const bPhoneErr = validatePhone(billingForm.phone, billingForm.country);
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

          const orderData = verifyRes.data?.data || verifyRes.data;
          if (orderData) {
            const lastOrderInfo = {
              id: orderData.hexId || createdOrder?.hexId || orderData.orderId || createdOrder?.id,
              placedOn:
                createdOrder?.placedOn ||
                new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }),
              itemsCount:
                createdOrder?.itemsCount || cartItems.reduce((acc, item) => acc + item.quantity, 0),
              paymentStatus: orderData.paymentStatus || "Captured",
            };
            localStorage.setItem("taybeen_last_order", JSON.stringify(lastOrderInfo));
            localStorage.removeItem("taybeen_checkout_draft_shipping");
            localStorage.removeItem("taybeen_checkout_draft_billing");
            localStorage.removeItem("taybeen_checkout_draft_is_billing_same");
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
          setPaymentError(
            "Payment process cancelled by user. You can click 'PROCEED TO MAKE PAYMENT' to try again."
          );
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleSaveAddress = async () => {
    setSaveSuccessMsg(null);
    setSaveErrorMsg(null);

    if (!validateForm()) {
      setSaveErrorMsg("Please fix validation errors first.");
      return;
    }

    setIsSavingAddress(true);
    const addressToSave = shippingForm;
    const billingToSave = isBillingSame ? shippingForm : billingForm;

    try {
      localStorage.setItem("taybeen_billing", JSON.stringify(addressToSave));

      const storedProfileStr = localStorage.getItem("taybeen_profile");
      if (storedProfileStr) {
        const profileData = JSON.parse(storedProfileStr);
        await apiClient.put("/customers/billing", {
          billingAddress: {
            firstName: billingToSave.firstName,
            lastName: billingToSave.lastName,
            streetAddress: billingToSave.streetAddress,
            city: billingToSave.city || "Pune",
            stateProvince: billingToSave.stateProvince,
            country: billingToSave.country,
            postalCode: billingToSave.postalCode,
            phone: billingToSave.phone,
            email: billingToSave.phone + "@taybeen.local",
          },
          shippingAddress: {
            firstName: addressToSave.firstName,
            lastName: addressToSave.lastName,
            streetAddress: addressToSave.streetAddress,
            city: addressToSave.city || "Pune",
            stateProvince: addressToSave.stateProvince,
            country: addressToSave.country,
            postalCode: addressToSave.postalCode,
            phone: addressToSave.phone,
            email: profileData.email || addressToSave.phone + "@taybeen.local",
          },
        });
        setSaveSuccessMsg("Address saved to profile successfully!");
      } else {
        setSaveSuccessMsg("Address saved locally! Log in to sync to your profile.");
      }
    } catch (err: any) {
      console.error("Failed to save address:", err);
      setSaveErrorMsg(err.response?.data?.message || "Failed to save address. Please try again.");
    } finally {
      setIsSavingAddress(false);
    }
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
            paymentMethod: paymentMethod,
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

        if (paymentMethod === "Cash on Delivery") {
          const lastOrderInfo = {
            id: order.hexId || order.id,
            placedOn: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
            paymentStatus: "Pending",
          };
          localStorage.setItem("taybeen_last_order", JSON.stringify(lastOrderInfo));
          localStorage.removeItem("taybeen_checkout_draft_shipping");
          localStorage.removeItem("taybeen_checkout_draft_billing");
          localStorage.removeItem("taybeen_checkout_draft_is_billing_same");
          clearCart();
          router.push("/order-confirmed");
          return;
        }

        const paymentOrderResponse = await apiClient.post("/payments/orders", {
          orderId: order.id,
        });
        const paymentOrder = paymentOrderResponse.data?.data || paymentOrderResponse.data;

        await initiateRazorpayPayment(order.id, paymentOrder);
      } catch (err: any) {
        setPaymentError(
          err.response?.data?.message || "Failed to initiate payment. Please try again."
        );
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
                  <button
                    onClick={() => setPaymentError(null)}
                    className="text-red-500 hover:text-red-700 font-bold ml-2"
                  >
                    ✕
                  </button>
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
                  paymentMethod={paymentMethod}
                  gstCost={gstCost}
                  gstPercent={gstPercent}
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
                  onSaveAddress={handleSaveAddress}
                  isSavingAddress={isSavingAddress}
                  saveSuccessMsg={saveSuccessMsg}
                  saveErrorMsg={saveErrorMsg}
                />
              ) : (
                <CheckoutReview
                  shippingForm={shippingForm}
                  billingForm={billingForm}
                  isBillingSame={isBillingSame}
                  onEdit={() => setStep("form")}
                  onPaymentSubmit={handleProceedAction}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
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
                paymentMethod={paymentMethod}
                gstCost={gstCost}
                gstPercent={gstPercent}
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
