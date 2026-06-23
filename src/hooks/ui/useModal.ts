import { useState, useCallback } from "react";

interface UseModalReturn<T> {
  isOpen: boolean;
  data: T | null;
  open: (modalData?: T) => void;
  close: () => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * Custom hook for managing overlay states and data bindings.
 */
export function useModal<T = any>(initialOpen = false): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    setData,
  };
}

export default useModal;
