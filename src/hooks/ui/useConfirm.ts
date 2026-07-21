"use client";

import { useContext } from "react";
import { ConfirmationContext } from "@/context/ConfirmationContext";

export function useConfirm() {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmationProvider");
  }
  return context.confirm;
}

export default useConfirm;
