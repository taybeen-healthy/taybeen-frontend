import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach access token
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("taybeen_access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie("taybeen_refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call the refresh endpoint
        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data.tokens;

        setCookie("taybeen_access_token", newAccessToken, 1);
        setCookie("taybeen_refresh_token", newRefreshToken, 7);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Invalidate session on refresh failure
        removeCookie("taybeen_access_token");
        removeCookie("taybeen_refresh_token");
        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
