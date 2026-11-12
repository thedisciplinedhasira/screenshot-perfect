import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ScanLine, Share2, ShieldCheck, ReceiptText } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

import emblemAsset from "@/assets/cbe-logo.png.asset.json";
const emblem = emblemAsset.url;
import { PhoneFrame } from "./PhoneFrame";
import { ACCOUNT_HOLDER } from "./TransferSheets";
import { formatAmount, formatReceiptDate, transferCharges } from "./transfer-utils";

export type Receipt = {
  amount: number;
  name: string;
  account: string;
  remark: string;
  txid: string;
  ts: number;
};

const last4 = (acc: string) => acc.slice(-4);

export function SuccessScreen({ receipt }: { receipt: Receipt }) {
  const { amount, name, account, remark, txid, ts } = receipt;
  const [paid, setPaid] = useState(false);
  const [stampKey, setStampKey] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fees = transferCharges(amount);
  const when = formatReceiptDate(new Date(ts));
  const reason = remark || "MB Transfer";

  const summaryText =
    `ETB ${formatAmount(amount)} has been debited from ${ACCOUNT_HOLDER.name} ETB-${last4(ACCOUNT_HOLDER.account)} ` +
    `for ${name} ETB-${last4(account)} on ${when} with transaction ID: ${txid}. Reason: ${reason}\n` +
    `Total Amount Debited: ETB${formatAmount(fees.total)} with Service Charge of ETB${formatAmount(fees.service)}, ` +
    `VAT (15%) of ETB${formatAmount(fees.vat)} and Disaster Recovery (5%) of ETB${formatAmount(fees.disaster)}.`;

  // Tapping anywhere on the screen (except a button) pops the PAID stamp.
  const onTap = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    setPaid(true);
    setStampKey((k) => k + 1);
  };

  const save = async (node: HTMLElement | null, file: string, done: string) => {
    if (!node) return;
    try {
      const url = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      a.click();
      toast.success(done);
    } catch {
      toast.error("Couldn't save the image");
    }
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "CBE Transfer Receipt", text: summaryText });
      } else {
        await navigator.clipboard.writeText(summaryText);
        toast.success("Receipt details copied");
      }
    } catch {
      /* user dismissed share sheet */
    }
  };

  return (
    <PhoneFrame>
      <div ref={screenRef} onClick={onTap} className="relative flex min-h-full flex-col bg-brand">
        {/* Header */}
        <header className="flex items-start justify-between px-[16px] pt-[44px]">
          <div className="flex items-center gap-[8px]">
            <ShieldCheck className="h-[30px] w-[30px] shrink-0 fill-field text-brand" strokeWidth={1.8} />
            <div className="leading-tight">
              <p className="text-[19px] font-medium text-vault-foreground">Thank you</p>
              <p className="text-[13px] text-brand-icon-muted">Success</p>
            </div>
          </div>
          <button
            aria-label="Screenshot"
            onClick={() => save(screenRef.current, `CBE-${txid}.png`, "Screenshot saved")}
            className="tap bob grid h-[34px] w-[34px] place-items-center rounded-full bg-brand-soft shadow-fab"
          >
            <ScanLine className="h-[18px] w-[18px] text-vault-foreground" strokeWidth={1.8} />
          </button>
        </header>

        {/* Panel */}
        <div className="relative mt-[48px] flex flex-1 flex-col rounded-t-[30px] bg-field px-[16px] pb-[18px]">
          <div className="absolute left-1/2 top-[-56px] grid h-[92px] w-[92px] -translate-x-1/2 place-items-center rounded-full border-[6px] border-field bg-brand-bright shadow-fab">
            <Check className="h-[46px] w-[46px] text-vault-foreground" strokeWidth={3} />
          </div>

          <p className="mt-[50px] text-center text-[12.5px] text-ink">Transaction Completed Successfully!</p>

          <section ref={summaryRef} className="relative mt-[18px] rounded-[16px] bg-panel px-[14px] pb-[16px] pt-[14px] shadow-card">
            <p className="text-[11px] text-subtle">Transaction Summary</p>
            <p className="mt-[10px] text-[13px] leading-[20px] text-ink">
              ETB <b className="font-semibold">{formatAmount(amount)}</b> has been debited from{" "}
              <b className="font-semibold">{ACCOUNT_HOLDER.name}</b> ETB-{last4(ACCOUNT_HOLDER.account)} for{" "}
              <b className="font-semibold">{name}</b> ETB-{last4(account)} on <b className="font-semibold">{when}</b>{" "}
              with transaction ID: <b className="font-semibold">{txid}</b>. Reason: {reason}
              <br />
              Total Amount Debited: ETB{formatAmount(fees.total)} with Service Charge of ETB
              {formatAmount(fees.service)}, VAT (15%) of ETB{formatAmount(fees.vat)} and Disaster Recovery (5%) of ETB
              {formatAmount(fees.disaster)}.
            </p>

            <div className="mx-auto mt-[10px] w-fit rounded-[10px] border-[1.5px] border-ink/80 bg-field p-[6px]">
              <QRCodeSVG value={`https://apps.cbe.com.et/?id=${txid}${last4(ACCOUNT_HOLDER.account)}`} size={92} level="M" />
            </div>

            <div className="mt-[8px] flex items-center justify-center gap-[10px]">
              <img src={emblem} alt="" width={34} height={34} className="h-[34px] w-[34px]" />
              <div className="leading-tight">
                <p className="text-[13.5px] text-ink">Commercial Bank of Ethiopia</p>
                <p className="text-[11px] text-subtle">The bank you can always rely on!</p>
              </div>
            </div>

            {paid && (
              <div
                key={stampKey}
                className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="paid-stamp rounded-[10px] border-[2px] border-field bg-brand-bright px-[30px] py-[8px] text-[26px] font-semibold tracking-[0.18em] text-vault-foreground shadow-fab">
                  PAID
                </div>
              </div>
            )}
          </section>

          <div className="flex-1" />

          <div className="mt-[20px] grid grid-cols-3 text-[12.5px] text-ink">
            <button
              onClick={() => save(summaryRef.current, `CBE-Receipt-${txid}.png`, "Receipt saved")}
              className="tap flex items-center justify-center gap-[5px]"
            >
              <ReceiptText className="h-[16px] w-[16px]" strokeWidth={1.8} /> Receipt
            </button>
            <button
              onClick={() => save(screenRef.current, `CBE-${txid}.png`, "Screenshot saved")}
              className="tap flex items-center justify-center gap-[5px]"
            >
              <ScanLine className="h-[16px] w-[16px]" strokeWidth={1.8} /> Screenshot
            </button>
            <button onClick={share} className="tap flex items-center justify-center gap-[5px]">
              <Share2 className="h-[16px] w-[16px]" strokeWidth={1.8} /> Share
            </button>
          </div>
          <Link
            to="/"
            className="tap mt-[12px] grid h-[40px] place-items-center rounded-full border border-border bg-panel text-[13.5px] text-ink shadow-tile"
          >
            Close
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
