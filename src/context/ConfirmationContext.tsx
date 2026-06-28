"use client";

import React, { createContext, useState, useCallback, useMemo } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "danger" | "warning" | "info";
}

interface ConfirmationContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const ConfirmationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    type: "danger" | "warning" | "info";
    resolve: ((val: boolean) => void) | null;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    type: "info",
    resolve: null,
  });

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel || "Confirm",
        cancelLabel: options.cancelLabel || "Cancel",
        type: options.type || "info",
        resolve,
      });
    });
  }, []);

  const handleCancel = useCallback(() => {
    if (state.resolve) state.resolve(false);
    setState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [state]);

  const handleConfirm = useCallback(() => {
    if (state.resolve) state.resolve(true);
    setState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [state]);

  const value = useMemo(() => ({ confirm }), [confirm]);

  const confirmColors = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-amber-600 hover:bg-amber-700 text-white",
    info: "bg-[#5A3E2B] hover:bg-[#483122] text-[#FDFAF3]",
  }[state.type];

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      <Modal
        isOpen={state.isOpen}
        onClose={handleCancel}
        isSplit={false}
        className="max-w-md w-full bg-[#FDFAF3] p-6 text-left font-poppins relative border border-[#C4A482]/20"
      >
        <div className="space-y-4 select-text">
          <h3 className="text-base font-bold text-brand-brown font-serif">{state.title}</h3>
          <p className="text-sm text-brand-brown/90 leading-relaxed font-normal">{state.message}</p>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="py-2 px-4 text-xs font-semibold h-9"
            >
              {state.cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className={`py-2 px-4 text-xs font-semibold h-9 rounded-full transition-all border-none ${confirmColors}`}
            >
              {state.confirmLabel}
            </Button>
          </div>
        </div>
      </Modal>
    </ConfirmationContext.Provider>
  );
};
