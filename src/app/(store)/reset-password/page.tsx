"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthBackground } from "@/components/user/auth";
import { Input } from "@/components/ui/Input";
import { apiClient } from "@/lib/apiClient";
import { validatePassword, validateConfirmPassword } from "@/utils/validation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email") || "";
    const tokenParam = searchParams.get("token") || "";
    setEmail(emailParam);
    setToken(tokenParam);

    if (!tokenParam || !emailParam) {
      setSubmitError("Invalid or expired password reset link. Please request a new one.");
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const passwordErr = validatePassword(password, true);
    if (passwordErr) newErrors.password = passwordErr;

    const confirmErr = validateConfirmPassword(password, confirmPassword);
    if (confirmErr) newErrors.confirmPassword = confirmErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      setSubmitError("Reset token and email are missing. Please request a new reset link.");
      return;
    }

    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await apiClient.post("/auth/customer/reset-password", {
          email,
          token,
          password,
          confirmPassword,
        });
        setIsSuccess(true);
      } catch (err: any) {
        console.error("Reset password error:", err);
        setSubmitError(
          err.response?.data?.message || "Failed to reset password. The link may have expired."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-[480px] bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shadow-sm mb-6 animate-in zoom-in duration-300">
          <CheckCircle size={30} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#5A3E2B] mb-4">Reset Complete</h2>
        <p className="text-[#768C3A] text-sm leading-relaxed mb-8 max-w-sm">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="w-full bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium flex flex-col justify-center">
      <h2 className="text-3xl font-serif font-bold text-[#5A3E2B] text-center mb-4 leading-tight">
        Reset Password
      </h2>
      <p className="text-center text-[#768C3A] text-xs sm:text-sm mb-6 leading-relaxed max-w-xs mx-auto">
        Please enter and confirm your new password below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          error={errors.password}
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

        <Input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-brand-brown/40 hover:text-brand-brown transition-colors cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        {submitError && (
          <div className="text-red-500 font-poppins text-xs font-semibold text-center bg-red-50 border border-red-200 rounded-lg p-2.5 mt-2">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !email || !token}
          className="w-full bg-[#5A3E2B] hover:bg-[#483122] disabled:bg-[#5A3E2B]/50 text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer mt-6 flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      <AuthBackground />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 md:py-0 py-28 md:pt-32 lg:pt-36 z-10 relative">
        <Suspense
          fallback={
            <div className="w-full max-w-[480px] bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#5A3E2B] mb-4" />
              <p className="font-poppins text-[#5A3E2B]/80 font-medium">Loading form...</p>
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
