import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Bottom sheet that stays inside the phone frame (PhoneFrame's <main> is the positioning parent). */
export function BottomSheet({
  open,
  onClose,
  children,
  label,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-vault/55 animate-in fade-in duration-200"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "absolute inset-x-0 bottom-0 rounded-t-[30px] bg-field pt-[12px] animate-in slide-in-from-bottom duration-300",
          className,
        )}
      >
        <div className="mx-auto h-[4px] w-[38px] rounded-full bg-border" />
        {children}
      </div>
    </div>
  );
}
