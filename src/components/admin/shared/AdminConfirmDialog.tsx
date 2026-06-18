import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface AdminConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdminConfirmDialog: React.FC<AdminConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      isSplit={false}
      className="max-w-md w-full bg-[#FDFAF3] p-6 text-left font-poppins relative border border-[#C4A482]/20"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-brand-brown font-serif">{title}</h3>
        <p className="text-sm text-brand-brown/90 leading-relaxed font-medium">
          {message}
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="py-2.5 px-5 text-xs font-semibold h-9"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            className="py-2.5 px-5 text-xs font-semibold h-9"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminConfirmDialog;
