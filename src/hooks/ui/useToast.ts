import { useContext } from "react";
import { ToastContext } from "@/context/ToastContext";

/**
 * Hook to consume the global Toast Notification system.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default useToast;
