"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { GoogleIcon } from "@/components/ui/Icons";
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateAcceptTerms,
} from "@/utils/validation";

interface AuthFormProps {
  type: "signup" | "signin";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const isSignUp = type === "signup";

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (isSignUp) {
      const fullNameErr = validateFullName(fullName);
      if (fullNameErr) newErrors.fullName = fullNameErr;

      const emailErr = validateEmail(email);
      if (emailErr) newErrors.email = emailErr;

      const phoneErr = validatePhone(phone);
      if (phoneErr) newErrors.phone = phoneErr;

      const passwordErr = validatePassword(password, true);
      if (passwordErr) newErrors.password = passwordErr;

      const confirmErr = validateConfirmPassword(password, confirmPassword);
      if (confirmErr) newErrors.confirmPassword = confirmErr;

      const acceptErr = validateAcceptTerms(acceptTerms);
      if (acceptErr) newErrors.acceptTerms = acceptErr;
    } else {
      const emailErr = validateEmail(email);
      if (emailErr) newErrors.email = emailErr;

      const passwordErr = validatePassword(password, false);
      if (passwordErr) newErrors.password = passwordErr;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (isSignUp) {
        alert("Account created successfully!");
      } else {
        alert("Signed in successfully!");
      }
    }
  };

  return (
    <div className="w-full max-w-[480px] sm:max-w-[520px] bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium flex flex-col justify-center">
      <h2 className="text-3xl sm:text-[2.25rem] font-serif font-bold text-[#5A3E2B] text-center mb-8 leading-tight">
        {isSignUp ? "Create Account" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {isSignUp && (
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            error={errors.fullName}
          />
        )}

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isSignUp ? "Email" : "Enter Your Email"}
          error={errors.email}
        />

        {isSignUp && (
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            error={errors.phone}
          />
        )}

        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
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

        {isSignUp && (
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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
        )}

        {isSignUp ? (
          <div className="pt-1 select-none flex flex-col">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded border-[#C4A482]/50 text-[#4A5E28] focus:ring-[#4A5E28]/20 cursor-pointer accent-[#4A5E28]"
              />
              <span className="text-xs sm:text-sm text-[#4A5E28] font-poppins font-medium">
                Accept Terms and conditions
              </span>
            </label>
            {errors.acceptTerms && (
              <span className="text-red-500 font-poppins text-[10px] mt-1 block">
                {errors.acceptTerms}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1 select-none text-xs sm:text-sm font-poppins font-medium">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#C4A482]/50 text-[#4A5E28] focus:ring-[#4A5E28]/20 cursor-pointer accent-[#4A5E28]"
              />
              <span className="text-[#4A5E28]">Remember me</span>
            </label>
            <Link href="#" className="text-[#4A5E28] hover:underline font-semibold">
              Forgot Password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer mt-6"
        >
          {isSignUp ? "Create Account" : "Sign In"}
        </button>
      </form>

      <div className="flex items-center justify-between my-6">
        <div className="border-t border-[#5A3E2B]/15 flex-1" />
        <span className="text-[10px] sm:text-xs text-[#8D7F75] font-poppins px-3 uppercase tracking-wider">
          or continue with
        </span>
        <div className="border-t border-[#5A3E2B]/15 flex-1" />
      </div>

      <button
        type="button"
        className="w-full bg-white border border-[#C4A482]/50 hover:bg-black/5 text-[#5A3E2B] py-3.5 px-6 rounded-full font-poppins font-semibold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm"
      >
        <GoogleIcon className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>

      <div className="mt-8 text-center text-xs sm:text-sm font-poppins text-[#8D7F75] font-medium">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="text-[#4A5E28] font-semibold hover:underline">
              Sign In
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#4A5E28] font-semibold hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
