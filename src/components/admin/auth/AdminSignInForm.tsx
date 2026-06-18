"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { adminAuthData } from "@/data/admin/adminAuthData";
import { validateEmail, validatePassword } from "@/utils/validation";

export const AdminSignInForm: React.FC = () => {
  const router = useRouter();
  const { title, subtitle, labels } = adminAuthData;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const passwordErr = validatePassword(password, false);
    if (passwordErr) newErrors.password = passwordErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/admin");
    } catch (err) {
      console.error("Admin sign in failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] sm:max-w-[520px] bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium flex flex-col justify-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-[2.25rem] font-serif font-bold text-[#5A3E2B] leading-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#8D7F75] font-poppins mt-2 max-w-[340px] mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={labels.passwordPlaceholder}
          error={errors.password}
          disabled={isLoading}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-brand-brown/40 hover:text-brand-brown transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Toggle password visibility"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-1 select-none text-xs sm:text-sm font-poppins font-medium">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#C4A482]/50 text-[#4A5E28] focus:ring-[#4A5E28]/20 cursor-pointer accent-[#4A5E28]"
              disabled={isLoading}
            />
            <span className="text-[#4A5E28]">{labels.rememberMeText}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#5A3E2B] hover:bg-[#483122] disabled:bg-[#5A3E2B]/70 text-[#FDFAF3] py-4 rounded-full font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer mt-6 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#FDFAF3] border-t-transparent rounded-full animate-spin" />
          ) : (
            labels.submitButtonText
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminSignInForm;
