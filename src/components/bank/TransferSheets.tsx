import { useState } from "react";
import { Check, Delete, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { BottomSheet } from "./BottomSheet";
import { PIN_LENGTH, formatAmount, maskAccount, pushPinDigit } from "./transfer-utils";

export const ACCOUNT_HOLDER = { name: "Israel Abdu Abedla", account: "1000987654516" };

export function ConfirmSheet({
  open,
  onCancel,
  onContinue,
  toName,
  toAccount,
  amount,
}: {
  open: boolean;
  onCancel: () => void;
  onContinue: () => void;
  toName: string;
  toAccount: string;
  amount: number;
}) {
  const [whole, cents] = formatAmount(amount).split(".");
  return (
    <BottomSheet open={open} onClose={onCancel} label="Please Confirm">
      <h2 className="mt-[22px] text-center text-[16px] text-ink">Please Confirm</h2>
      <div className="mx-[24px] mt-[16px] border-t border-border" />
      <dl className="px-[36px] pt-[18px] text-[13px]">
        <div className="flex justify-between gap-4">
          <dt className="text-subtle">From</dt>
          <dd className="text-right leading-[18px]">
            <span className="block text-ink">{ACCOUNT_HOLDER.name}</span>
            <span className="block text-subtle">{maskAccount(ACCOUNT_HOLDER.account)}</span>
          </dd>
        </div>
        <div className="mt-[26px] flex justify-between gap-4">
          <dt className="text-subtle">To</dt>
          <dd className="min-w-0 text-right leading-[18px]">
            <span className="block truncate text-ink">{toName}</span>
            <span className="block text-subtle">{maskAccount(toAccount)}</span>
          </dd>
        </div>
        <div className="mt-[34px] flex items-end justify-between gap-4">
          <dt className="pb-[4px] text-ink">Total Amount</dt>
          <dd className="text-right text-brand-bright">
            <span className="text-[26px] font-medium leading-none">
              {whole}.{cents}
            </span>
            <span className="ml-[6px] text-[13px] text-ink">ETB</span>
          </dd>
        </div>
      </dl>
      <div className="mt-[56px] grid grid-cols-2 gap-[14px] px-[18px] pb-[28px]">
        <button
          onClick={onCancel}
          className="tap h-[42px] rounded-[12px] bg-send-tint/60 text-[14px] font-medium text-send"
        >
          Cancel
        </button>
        <button
          onClick={onContinue}
          className="tap h-[42px] rounded-[12px] bg-brand-bright text-[14px] font-medium text-vault-foreground"
        >
          Continue
        </button>
      </div>
    </BottomSheet>
  );
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function PinSheet({
  open,
  onCancel,
  onSubmit,
}: {
  open: boolean;
  onCancel: () => void;
  onSubmit: (pin: string) => void;
}) {
  const [pin, setPin] = useState("");
  const close = () => {
    setPin("");
    onCancel();
  };
  const press = (d: string) => setPin((p) => pushPinDigit(p, d));
  const complete = pin.length === PIN_LENGTH;

  const keyCls =
    "tap grid h-[50px] place-items-center rounded-[12px] bg-panel text-[20px] text-ink active:bg-border";

  return (
    <BottomSheet open={open} onClose={close} label="Enter your PIN to confirm">
      <button
        aria-label="Close"
        onClick={close}
        className="tap absolute right-[16px] top-[14px] grid h-[30px] w-[30px] place-items-center rounded-full bg-panel text-send"
      >
        <X className="h-[16px] w-[16px]" strokeWidth={2} />
      </button>
      <h2 className="mt-[26px] text-center text-[14px] text-brand">Enter your PIN to confirm</h2>
      <div className="mt-[22px] flex justify-center gap-[12px]" aria-label={`${pin.length} of ${PIN_LENGTH} digits entered`}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-[15px] w-[15px] rounded-full transition-colors",
              i < pin.length ? "bg-brand-bright" : "border-[1.5px] border-brand-bright/40",
            )}
          />
        ))}
      </div>
      <button onClick={close} className="tap mx-auto mt-[22px] block text-[12px] text-subtle">
        Cancel
      </button>
      <div className="mt-[18px] grid grid-cols-3 gap-[8px] px-[16px] pb-[22px]">
        {KEYS.map((k) => (
          <button key={k} onClick={() => press(k)} className={keyCls}>
            {k}
          </button>
        ))}
        <button aria-label="Delete" onClick={() => setPin((p) => p.slice(0, -1))} className={cn(keyCls, "text-send")}>
          <Delete className="h-[20px] w-[20px]" strokeWidth={1.6} />
        </button>
        <button onClick={() => press("0")} className={keyCls}>
          0
        </button>
        <button
          aria-label="Confirm PIN"
          disabled={!complete}
          onClick={() => {
            onSubmit(pin);
            setPin("");
          }}
          className="tap grid h-[50px] place-items-center rounded-[12px] bg-brand-bright text-vault-foreground disabled:opacity-50"
        >
          <Check className="h-[20px] w-[20px]" strokeWidth={2.2} />
        </button>
      </div>
    </BottomSheet>
  );
}
