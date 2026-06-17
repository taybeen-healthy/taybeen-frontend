"use client";

import React, { useState } from "react";
import { Eye, EyeOff, X, CheckCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { validateEmail, validatePassword, validateConfirmPassword } from "@/utils/validation";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"email" | "reset" | "success">("email");
  
  // State for Frame 1 (Email Link request)
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  // State for Frame 2 (Create New Password)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setEmailError(null);
    setIsLoading(true);

    // Simulate API delay and transition
    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
    }, 1200);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordErr = validatePassword(newPassword, true);
    const confirmErr = validateConfirmPassword(newPassword, confirmPassword);

    setPasswordError(passwordErr);
    setConfirmError(confirmErr);

    if (passwordErr || confirmErr) return;
    setIsLoading(true);

    // Simulate API reset delay
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1200);
  };

  const resetStateAndClose = () => {
    setStep("email");
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setEmailError(null);
    setPasswordError(null);
    setConfirmError(null);
    setShowPassword(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetStateAndClose}
      isSplit={false}
      className="p-6 sm:p-8 flex flex-col text-center font-poppins relative select-none"
    >
      {/* Close button */}
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
              Enter your registered email address and we&apos;ll send you a link to reset your password.
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
              }}
              error={emailError || undefined}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "Sending..." : "SEND RESET LINK"}
            </button>
          </div>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-5 pt-4 text-left">
          <div className="space-y-2.5 text-center">
            <h3 className="font-serif text-[#5A3E2B] text-2xl sm:text-3xl font-bold">
              Create New Password
            </h3>
            <p className="text-[#768C3A] text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
              Please enter and confirm your new password.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* New Password */}
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              error={passwordError || undefined}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-brand-brown/40 hover:text-brand-brown transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Confirm Password */}
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmError) setConfirmError(null);
              }}
              error={confirmError || undefined}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-brand-brown/40 hover:text-brand-brown transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Validation hint */}
            <p className="text-left text-[#768C3A] text-[10px] sm:text-xs leading-normal pl-1">
              Password must be at least 6 characters
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "Resetting..." : "RESET PASSWORD"}
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
            <h3 className="font-serif text-[#5A3E2B] text-2xl font-bold">
              Reset Complete
            </h3>
            <p className="text-brand-green text-xs sm:text-sm max-w-xs leading-relaxed">
              Your password has been successfully updated. You can now log in using your new credentials.
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
