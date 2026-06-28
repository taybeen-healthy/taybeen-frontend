"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/lib/utils/cookie";
import { apiClient } from "@/lib/apiClient";
import { Loader2 } from "lucide-react";

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const avatarUrl = searchParams.get("avatarUrl") || undefined;

    if (accessToken && refreshToken) {
      setCookie("taybeen_access_token", accessToken, 1);
      setCookie("taybeen_refresh_token", refreshToken, 7);

      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      localStorage.setItem(
        "taybeen_profile",
        JSON.stringify({
          firstName,
          lastName,
          email,
          phone: "",
          avatarUrl,
        })
      );

      // Clean query parameters from browser history to prevent token leakage
      if (typeof window !== "undefined") {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      router.push("/my-account");
    } else {
      router.push("/signin");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFAF3]">
      <Loader2 className="w-10 h-10 animate-spin text-[#5A3E2B] mb-4" />
      <p className="font-poppins text-[#5A3E2B]/80 font-medium">Completing login...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFAF3]">
          <Loader2 className="w-10 h-10 animate-spin text-[#5A3E2B] mb-4" />
          <p className="font-poppins text-[#5A3E2B]/80 font-medium">Loading...</p>
        </div>
      }
    >
      <AuthCallbackHandler />
    </Suspense>
  );
}
