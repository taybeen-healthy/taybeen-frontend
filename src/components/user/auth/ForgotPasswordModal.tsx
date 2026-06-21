"use client";

import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { validateEmail } from "@/utils/validation";
import { apiClient } from "@/lib/apiClient";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"email" | "success">("email");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setEmailError(null);
    setSubmitError(null);
    setIsLoading(true);

    try {
      await apiClient.post("/auth/customer/forgot-password", { email });
      setStep("success");
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setSubmitError(
        err.response?.data?.message || "Failed to send reset link. Please verify your email."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetStateAndClose = () => {
    setStep("email");
    setEmail("");
    setEmailError(null);
    setSubmitError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetStateAndClose}
      isSplit={false}
      className="p-6 sm:p-8 flex flex-col text-center font-poppins relative select-none"
    >
      <button
        onClick={resetStateAndClose}
        className="absolute right-4 top-4 text-brand-brown/40 hover:text-brand-brown transition-colors focus:outline-none cursor-pointer"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      {step === "email" && (
        <form onSubmit={handleSendLink} className="space-y-5 pt-4 text-left">
          <div className="space-y-2.5 text-center">
            <h3 className="font-serif text-[#5A3E2B] text-2xl sm:text-3xl font-bold">
              Forgot Password?
            </h3>
            <p className="text-[#768C3A] text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
              Enter your registered email address and we&apos;ll send you a link to reset your
              password.
            </p>
          </div>

          <div className="pt-2">
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
                if (submitError) setSubmitError(null);
              }}
              error={emailError || undefined}
            />
          </div>

          {submitError && (
            <div className="text-red-500 font-poppins text-xs font-semibold text-center bg-red-50 border border-red-200 rounded-lg p-2.5 mt-2">
              {submitError}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5A3E2B] hover:bg-[#483122] disabled:bg-[#5A3E2B]/50 text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "Sending..." : "SEND RESET LINK"}
            </button>
          </div>
        </form>
      )}

      {step === "success" && (
        <div className="space-y-5 py-6 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shadow-sm animate-in zoom-in duration-300">
            <CheckCircle size={30} />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-[#5A3E2B] text-2xl font-bold">Email Sent</h3>
            <p className="text-brand-green text-xs sm:text-sm max-w-xs leading-relaxed">
              We have sent a password reset link to your email address. Please check your inbox and
              spam folder.
            </p>
          </div>

          <div className="pt-3 w-full">
            <button
              onClick={resetStateAndClose}
              className="w-full bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
