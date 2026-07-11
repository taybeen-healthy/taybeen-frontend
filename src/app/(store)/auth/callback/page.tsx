"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/lib/utils/cookie";
import { apiClient } from "@/lib/apiClient";
import { BrandLoader } from "@/components/ui/BrandLoader";

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    
    const redirectFromParam = searchParams.get("redirect");
    const redirectFromSession =
      typeof window !== "undefined" ? sessionStorage.getItem("taybeen_google_redirect") : null;
    const lastVisited =
      typeof window !== "undefined" ? sessionStorage.getItem("taybeen_last_visited") : null;
    const redirect = redirectFromParam || redirectFromSession || lastVisited || "/my-account";

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
        sessionStorage.removeItem("taybeen_google_redirect");
      }

      router.push(redirect);
    } else {
      router.push("/signin");
    }
  }, [searchParams, router]);

  return <BrandLoader text="Completing login..." />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<BrandLoader text="Loading..." />}>
      <AuthCallbackHandler />
    </Suspense>
  );
}
