import { useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  EyeOff,
  Eye,
  Phone,
  Repeat,
  Settings,
  Split,
  PiggyBank,
  RotateCcw,
  ChartLine,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

import mapBg from "@/assets/card-world-map.jpg";
// served from /public so it loads locally and on Lovable
const emblem = "/favicon.png";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./PhoneFrame";
import {
  BankFilledIcon,
  BankOutlineIcon,
  BuildingFilledIcon,
  CopyCardIcon,
  GridMenuIcon,
  HomeFilledIcon,
  QrCornerIcon,
  ReceiptFilledIcon,
  SearchDotIcon,
  WalletFilledIcon,
} from "./icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const notify = (label: string) => toast(label, { description: "Coming soon" });

/* ------------------------------- Header ------------------------------- */

function Header() {
  const [lang, setLang] = useState<"English" | "አማርኛ">("English");
  return (
    <header className="flex items-center pl-[15px] pr-[15px] pt-[45px]">
      <button
        aria-label="Menu"
        onClick={() => notify("Menu")}
        className="tap grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-brand-soft/80"
      >
        <GridMenuIcon className="h-[19px] w-[19px] text-brand-icon-muted" />
      </button>
      <div className="ml-[9px] min-w-0 flex-1 leading-none">
        <p className="relative top-[1px] text-[12px] font-light text-brand-dim">Hello,</p>
        <p className="mt-[4px] truncate text-[16px] text-vault-foreground">Israel</p>
      </div>
      <button
        onClick={() => setLang((l) => (l === "English" ? "አማርኛ" : "English"))}
        className="tap flex h-[22px] w-[74px] shrink-0 items-center justify-center gap-[5px] rounded-full bg-brand-soft text-[12.5px] text-vault-foreground"
      >
        {lang}
        <ChevronDown className="h-[10px] w-[10px]" strokeWidth={2} />
      </button>
      <button
        aria-label="Profile"
        onClick={() => notify("Profile")}
        className="tap ml-[17px] grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-brand-soft"
      >
        <RotateCcw className="h-[17px] w-[17px] text-vault-foreground" strokeWidth={1.6} />
      </button>
      <button
        aria-label="Search"
        onClick={() => notify("Search")}
        className="tap ml-[8px] grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-brand-soft"
      >
        <SearchDotIcon className="h-[17px] w-[17px] text-vault-foreground" />
      </button>
    </header>
  );
}

/* ---------------------------- Account card ---------------------------- */

function AccountCard() {
  const [visible, setVisible] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("1000123454516");
      toast.success("Account number copied");
    } catch {
      toast("Account: 1000123454516");
    }
  };

  return (
    <section
      className="relative ml-[17px] mr-[19px] mt-[9px] h-[203px] overflow-hidden rounded-[24px] bg-vault shadow-card"
      aria-label="Saving account"
    >
      <img
        src={mapBg}
        alt=""
        width={800}
        height={480}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative flex items-start pl-[19px] pt-[20px]">
        <img src={emblem} alt="CBE emblem" width={33} height={33} className="h-[33px] w-[33px] shrink-0" />
        <div className="ml-[19px] mt-[2px] leading-none">
          <p className="text-[16px] text-gold">Commercial Bank of Ethiopia</p>
          <p className="mt-[3px] font-mono text-[11px] text-gold">The bank you can always rely on!</p>
        </div>
      </div>

      <div className="relative mt-[24px] flex items-end justify-center">
        {visible ? (
          <span className="text-[20px] font-semibold leading-none tracking-[0.02em] text-vault-foreground">
            24,580.75
          </span>
        ) : (
          <span className="text-[22px] font-bold leading-none tracking-[0.2em] text-vault-foreground">
            ******
          </span>
        )}
        <span className="mb-[-3px] ml-[6px] text-[13px] font-semibold leading-none tracking-[0.06em] text-vault-foreground">
          ETB
        </span>
        <button
          aria-label={visible ? "Hide balance" : "Show balance"}
          onClick={() => setVisible((v) => !v)}
          className="tap absolute right-[31px] top-[5px] text-vault-muted/40"
        >
          {visible ? <Eye className="h-[19px] w-[19px]" strokeWidth={1.4} /> : <EyeOff className="h-[19px] w-[19px]" strokeWidth={1.4} />}
        </button>
      </div>

      <div className="relative mt-[38px] flex items-center justify-center">
        <p className="font-mono text-[13.2px] leading-none tracking-[0.07em] text-vault-muted">
          Saving Account 1 **** 4516
        </p>
        <button
          aria-label="Copy account number"
          onClick={copy}
          className="tap ml-[9px] text-vault-muted"
        >
          <CopyCardIcon className="h-[17px] w-[15px]" />
        </button>
      </div>
      <p className="relative mt-[20px] text-center text-[9px] leading-none tracking-[0.1em] text-vault-muted">
        11 Nov 2026 · 05:09 PM
      </p>
    </section>
  );
}

/* ---------------------------- Quick actions --------------------------- */

const quickActions: { label: string; icon: Icon; filled?: boolean }[] = [
  { label: "Mini Statement", icon: ReceiptFilledIcon, filled: true },
  { label: "Cash Out", icon: CircleDollarSign },
  { label: "Bill Share", icon: Split },
  { label: "Cards", icon: CreditCard },
  { label: "Savings", icon: PiggyBank },
  { label: "Rates", icon: ChartLine },
];

function QuickActions() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="relative mt-[19px]" aria-label="Quick actions">
      <div ref={ref} className="no-scrollbar mr-[44px] flex overflow-x-auto scroll-smooth pl-[15px]">
        {quickActions.map(({ label, icon: I, filled }) => (
          <button
            key={label}
            onClick={() => notify(label)}
            className="tap flex w-[92.4px] shrink-0 flex-col items-center"
          >
            <span className="grid h-[37px] w-[37px] place-items-center rounded-full bg-tile">
              {filled ? (
                <I className="h-[21px] w-[17px] text-brand" />
              ) : (
                <I className="h-[22px] w-[22px] text-brand" strokeWidth={1.9} />
              )}
            </span>
            <span className="mt-[19px] whitespace-nowrap text-[12.2px] font-medium leading-none text-ink">{label}</span>
          </button>
        ))}
      </div>
      <button
        aria-label="More actions"
        onClick={() => ref.current?.scrollBy({ left: 185 })}
        className="tap absolute right-[19px] top-[45px] grid h-[22px] w-[22px] place-items-center rounded-full bg-tile"
      >
        <ChevronRight className="h-[12px] w-[12px] text-ink" strokeWidth={2} />
      </button>
    </section>
  );
}

/* ----------------------------- Service grid --------------------------- */

const services: { label: string; icon: Icon }[] = [
  { label: "Airtime", icon: Phone },
  { label: "Other Transfers", icon: Repeat },
  { label: "CBEBirr", icon: WalletFilledIcon },
  { label: "Bills & Utilities", icon: ReceiptFilledIcon },
  { label: "Banking", icon: BankFilledIcon },
  { label: "Government Services", icon: BuildingFilledIcon },
];

function ServiceIcon({ label, icon: I }: { label: string; icon: Icon }) {
  switch (label) {
    case "Airtime":
      return <Phone className="h-[22px] w-[22px] text-brand" fill="currentColor" strokeWidth={1} />;
    case "Other Transfers":
      return <Repeat className="h-[22px] w-[22px] text-brand" strokeWidth={2} />;
    case "CBEBirr":
      return <I className="h-[17px] w-[20px] text-brand" />;
    case "Bills & Utilities":
      return <I className="h-[20px] w-[16px] text-brand" />;
    case "Banking":
      return <I className="h-[20px] w-[21px] text-brand" />;
    default:
      return <I className="h-[19px] w-[15px] text-brand" />;
  }
}

function TransferRow() {
  const items = [
    { title: "CBE Transfer", sub: "Send Money", icon: ArrowUpRight, tint: "bg-send-tint", color: "text-send" },
    { title: "Receive", sub: "Get Paid", icon: ArrowDownLeft, tint: "bg-receive-tint", color: "text-receive" },
  ];
  return (
    <div className="mt-[19px] grid grid-cols-2 gap-[12px] pl-[17px] pr-[18px]">
      {items.map(({ title, sub, icon: I, tint, color }) => {
        const body = (
          <>
            <span className={cn("grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full", tint)}>
              <I className={cn("h-[15px] w-[15px]", color)} strokeWidth={1.6} />
            </span>
            <span className="ml-[8px] min-w-0 leading-none">
              <span className="block truncate text-[15px] text-ink">{title}</span>
              <span className="mt-[6px] block text-[10.4px] text-subtle">{sub}</span>
            </span>
          </>
        );
        const cls = "tap flex h-[67px] min-w-0 items-center rounded-[22px] bg-tile pl-[12px] text-left shadow-tile";
        return title === "CBE Transfer" ? (
          <Link key={title} to="/transfer" className={cls}>
            {body}
          </Link>
        ) : (
          <button key={title} onClick={() => notify(title)} className={cls}>
            {body}
          </button>
        );
      })}
    </div>
  );
}

function ServiceGrid() {
  return (
    <div className="mt-[9px] grid grid-cols-2 gap-x-[13.7px] gap-y-[15.3px] pl-[22.5px] pr-[23.5px] pb-[90px]">
      {services.map((s) => (
        <button
          key={s.label}
          onClick={() => notify(s.label)}
          className="tap flex h-[94.5px] min-w-0 flex-col items-center justify-center rounded-[20px] bg-tile px-2 pb-[1px] text-center shadow-tile"
        >
          <span className="grid h-[24px] place-items-center"><ServiceIcon label={s.label} icon={s.icon} /></span>
          <span className="mt-[6px] text-[16.2px] leading-[22px] text-ink">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Scan + Nav ---------------------------- */

function ScanQr() {
  return (
    <button
      onClick={() => notify("Scan QR")}
      className="tap absolute bottom-[62.5px] left-1/2 z-20 flex h-[39px] w-[100.5px] -translate-x-1/2 items-center justify-center rounded-full bg-brand text-[14px] text-vault-foreground shadow-fab active:scale-95"
    >
      <span className="relative px-[3px] py-[2px]">
        Scan QR
        <QrCornerIcon className="absolute -left-[3px] -top-[2px] h-[8px] w-[8px]" />
        <QrCornerIcon className="absolute -right-[3px] -top-[2px] h-[8px] w-[8px]" />
        <QrCornerIcon className="absolute -bottom-[2px] -left-[3px] h-[8px] w-[8px]" />
        <QrCornerIcon className="absolute -bottom-[2px] -right-[3px] h-[8px] w-[8px]" />
      </span>
    </button>
  );
}

type Tab = "Home" | "Transactions" | "Settings";

function BottomNav() {
  const [active, setActive] = useState<Tab>("Home");
  const tabs: { label: Tab; icon: Icon }[] = [
    { label: "Home", icon: HomeFilledIcon },
    { label: "Transactions", icon: BankOutlineIcon },
    { label: "Settings", icon: Settings },
  ];
  return (
    <nav className="absolute inset-x-0 bottom-0 z-10 grid h-[56px] grid-cols-3 border-t border-border bg-tile">
      {tabs.map(({ label, icon: I }) => {
        const on = active === label;
        return (
          <button
            key={label}
            onClick={() => setActive(label)}
            aria-current={on ? "page" : undefined}
            className="tap flex flex-col items-center pt-[5px]"
          >
            <span
              className={cn(
                "grid h-[29px] w-[56px] place-items-center rounded-full transition-colors",
                on && "bg-nav-active",
              )}
            >
              {label === "Settings" ? (
                <I className="h-[24px] w-[24px] text-brand" strokeWidth={1.6} />
              ) : label === "Home" ? (
                <I className="h-[18px] w-[20px] text-brand" />
              ) : (
                <I className="h-[21px] w-[26px] text-brand" />
              )}
            </span>
            <span className="mt-[3.5px] text-[10.2px] leading-none text-ink">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* -------------------------------- Screen ------------------------------ */

export function BankHome() {
  return (
    <PhoneFrame
      overlay={
        <>
          <ScanQr />
          <BottomNav />
        </>
      }
    >
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[300px] bg-brand" />
        <div className="absolute inset-x-0 top-[244px] h-[120px] rounded-tl-[24px] bg-surface" />
        <div className="relative">
          <Header />
          <AccountCard />
          <div className="mx-auto mt-[17.5px] h-[6px] w-[24px] rounded-full bg-indicator" />
          <QuickActions />
          <TransferRow />
          <ServiceGrid />
        </div>
      </div>
    </PhoneFrame>
  );
}
