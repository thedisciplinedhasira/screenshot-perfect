import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Calculator, ChevronLeft, ChevronRight, Eye, EyeOff, Plus, Trash2, UserRoundSearch, WalletCards, Landmark } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PhoneFrame } from "./PhoneFrame";
import { formatAmount, initials, isValidAccount, maskAccount, parseAmount } from "./transfer-utils";

type Contact = { name: string; account: string };

const RECENT: Contact[] = [
  { name: "Kenenisa Gelo Adula", account: "1000123450545" },
  { name: "Mohammed Sirmolo Hussein", account: "1000234568174" },
  { name: "Abonesh Tsegaye Lema", account: "1000345674383" },
  { name: "Huzeyfa Mohammednur Abdulshukur", account: "1000456783498" },
  { name: "Mekususa Nuredin Maruf", account: "1000567891364" },
];

const BENEFICIARIES: Contact[] = [
  { name: "Selam Bekele Tadesse", account: "1000678902211" },
  { name: "Dawit Alemu Girma", account: "1000789017730" },
];

type Tab = "recent" | "beneficiaries";

export function TransferScreen() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [remarkOpen, setRemarkOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [tab, setTab] = useState<Tab>("recent");
  const [recent, setRecent] = useState(RECENT);
  const [beneficiaries, setBeneficiaries] = useState(BENEFICIARIES);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const list = tab === "recent" ? recent : beneficiaries;
  const setList = tab === "recent" ? setRecent : setBeneficiaries;
  const recipient = [...RECENT, ...BENEFICIARIES].find((c) => c.account === account);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidAccount(account)) {
      toast.error("Enter a valid 13-digit account number");
      return;
    }
    if (parseAmount(amount) <= 0) {
      toast.error("Enter an amount greater than 0");
      return;
    }
    setConfirmOpen(true);
  };

  const confirm = () => {
    setConfirmOpen(false);
    toast.success(`ETB ${formatAmount(parseAmount(amount))} sent`, {
      description: `To ${recipient?.name ?? maskAccount(account)}`,
    });
    navigate({ to: "/" });
  };

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-brand">
        <header className="flex items-center gap-[18px] px-[20px] pb-[26px] pt-[44px]">
          <Link
            to="/"
            aria-label="Back"
            className="tap grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-brand-soft"
          >
            <ChevronLeft className="h-[18px] w-[18px] text-vault-foreground" strokeWidth={2.2} />
          </Link>
          <h1 className="truncate text-[21px] font-medium text-vault-foreground">CBE Transfer</h1>
        </header>

        <div className="flex-1 rounded-t-[26px] bg-panel px-[17px] pb-[28px] pt-[20px]">
          {/* From account */}
          <section className="rounded-[16px] bg-slate-card px-[15px] py-[12px] leading-tight text-vault-foreground">
            <p className="text-[13px]">From Account</p>
            <p className="mt-[5px] text-[13px]">
              Saving Account <span className="font-semibold">1********4516</span>
            </p>
            <div className="mt-[4px] flex items-center gap-[8px]">
              <span className={cn("text-[13px]", showBalance ? "font-semibold" : "tracking-[0.1em]")}>
                {showBalance ? "ETB 24,580.75" : "••••••"}
              </span>
              <button
                type="button"
                aria-label={showBalance ? "Hide balance" : "Show balance"}
                onClick={() => setShowBalance((v) => !v)}
                className="tap text-vault-foreground"
              >
                {showBalance ? <Eye className="h-[14px] w-[14px]" /> : <EyeOff className="h-[14px] w-[14px]" />}
              </button>
            </div>
          </section>

          <form onSubmit={submit} className="mt-[10px]">
            <label className="flex h-[58px] items-center gap-[14px] rounded-[16px] border-[1.5px] border-brand/70 bg-field px-[14px] focus-within:border-brand">
              <Landmark className="h-[19px] w-[19px] shrink-0 text-brand" strokeWidth={1.6} />
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value.replace(/\D/g, "").slice(0, 13))}
                inputMode="numeric"
                placeholder="Account Number"
                aria-label="Account Number"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle"
              />
              <button
                type="button"
                aria-label="Choose beneficiary"
                onClick={() => setTab("beneficiaries")}
                className="tap shrink-0 text-ink"
              >
                <UserRoundSearch className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
            </label>
            {recipient && <p className="mt-[5px] px-[4px] text-[11px] text-brand">{recipient.name}</p>}

            <label className="mt-[8px] flex h-[58px] items-center gap-[14px] rounded-[16px] bg-field px-[14px] shadow-tile">
              <WalletCards className="h-[19px] w-[19px] shrink-0 text-brand" strokeWidth={1.6} />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                inputMode="decimal"
                placeholder="Amount*"
                aria-label="Amount"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle"
              />
              <Calculator className="h-[18px] w-[18px] shrink-0 text-ink" strokeWidth={1.6} />
            </label>

            {remarkOpen ? (
              <input
                autoFocus
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Remark (optional)"
                aria-label="Remark"
                maxLength={60}
                className="mt-[10px] h-[44px] w-full rounded-[14px] bg-field px-[14px] text-[14px] text-ink outline-none shadow-tile placeholder:text-subtle"
              />
            ) : (
              <button
                type="button"
                onClick={() => setRemarkOpen(true)}
                className="tap mt-[14px] flex items-center gap-[10px] text-ink"
              >
                <span className="grid h-[16px] w-[16px] place-items-center rounded-[4px] border border-ink">
                  <Plus className="h-[11px] w-[11px]" strokeWidth={2} />
                </span>
                <span className="text-[13px]">Add remark</span>
                <span className="text-[11px] italic">*Default: MB transfer</span>
              </button>
            )}

            <button
              type="submit"
              className="tap mt-[16px] h-[46px] w-full rounded-full bg-brand-bright text-[17px] font-medium text-vault-foreground shadow-fab"
            >
              Continue
            </button>
          </form>

          {/* Tabs */}
          <div className="mt-[18px] grid grid-cols-2" role="tablist">
            {(
              [
                ["recent", "Recent Transfers"],
                ["beneficiaries", "Beneficiaries"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className="tap flex flex-col items-center"
              >
                <span className="text-[13px] text-brand">{label}</span>
                <span className={cn("mt-[10px] h-[2px] w-[100px] rounded-full", tab === key ? "bg-brand" : "bg-transparent")} />
              </button>
            ))}
          </div>

          <ul className="mt-[12px] space-y-[8px]">
            {list.length === 0 && (
              <li className="py-[24px] text-center text-[13px] text-subtle">No saved accounts yet</li>
            )}
            {list.map((c) => (
              <li key={c.account}>
                <div
                  className={cn(
                    "flex h-[56px] items-center rounded-[16px] bg-field pl-[12px] pr-[10px] shadow-tile",
                    account === c.account && "ring-1 ring-brand/50",
                  )}
                >
                  <button
                    onClick={() => setAccount(c.account)}
                    className="tap flex min-w-0 flex-1 items-center gap-[12px] text-left"
                  >
                    <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-avatar text-[13px] font-medium text-brand">
                      {initials(c.name)}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-[13px] text-ink">{c.name}</span>
                      <span className="mt-[3px] block text-[12px] text-subtle">{maskAccount(c.account)}</span>
                    </span>
                  </button>
                  <button
                    aria-label={`Remove ${c.name}`}
                    onClick={() => {
                      setList((l) => l.filter((x) => x.account !== c.account));
                      toast(`${c.name} removed`);
                    }}
                    className="tap ml-[8px] p-[6px] text-ink"
                  >
                    <Trash2 className="h-[15px] w-[15px]" strokeWidth={1.6} />
                  </button>
                  <button
                    aria-label={`Send to ${c.name}`}
                    onClick={() => setAccount(c.account)}
                    className="tap p-[6px] text-ink"
                  >
                    <ChevronRight className="h-[16px] w-[16px]" strokeWidth={1.8} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-[360px] rounded-[20px] bg-field">
          <DialogHeader>
            <DialogTitle className="text-brand">Confirm transfer</DialogTitle>
            <DialogDescription>Please review the details before sending.</DialogDescription>
          </DialogHeader>
          <dl className="space-y-[8px] text-[14px]">
            {[
              ["From", "Saving Account 1********4516"],
              ["To", recipient ? `${recipient.name} · ${maskAccount(account)}` : maskAccount(account)],
              ["Amount", `ETB ${formatAmount(parseAmount(amount))}`],
              ["Remark", remark.trim() || "MB transfer"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-subtle">{k}</dt>
                <dd className="text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            onClick={confirm}
            className="tap mt-[8px] h-[44px] w-full rounded-full bg-brand-bright text-[15px] font-medium text-vault-foreground"
          >
            Send money
          </button>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}
