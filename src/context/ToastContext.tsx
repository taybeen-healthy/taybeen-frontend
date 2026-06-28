"use client";

import React, { createContext, useState, useCallback, useMemo } from "react";
import { ToastContainer } from "@/components/ui/Toast/ToastContainer";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      const next = [...prev, { id, message, type, duration }];
      if (next.length > 5) {
        next.shift();
      }
      return next;
    });
  }, []);

  const success = useCallback(
    (msg: string, dur?: number) => addToast(msg, "success", dur),
    [addToast]
  );
  const error = useCallback((msg: string, dur?: number) => addToast(msg, "error", dur), [addToast]);
  const warning = useCallback(
    (msg: string, dur?: number) => addToast(msg, "warning", dur),
    [addToast]
  );
  const info = useCallback((msg: string, dur?: number) => addToast(msg, "info", dur), [addToast]);

  const value = useMemo(
    () => ({ success, error, warning, info, toasts, removeToast }),
    [success, error, warning, info, toasts, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
