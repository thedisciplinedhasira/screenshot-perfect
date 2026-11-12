import { useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
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
  ChartLine,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

import mapBg from "@/assets/card-world-map.jpg";
import emblemAsset from "@/assets/cbe-logo.png.asset.json";
const emblem = emblemAsset.url;
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
    <header className="flex items-center pl-[21px] pr-[16px] pt-[45px]">
      <button
        aria-label="Menu"
        onClick={() => notify("Menu")}
        className="tap grid h-[37px] w-[37px] shrink-0 place-items-center rounded-full bg-brand-soft/80"
      >
        <GridMenuIcon className="h-[21px] w-[21px] text-brand-icon-muted" />
      </button>
      <div className="ml-[5px] min-w-0 flex-1 leading-none">
        <p className="text-[12px] font-light text-brand-dim">Hello,</p>
        <p className="mt-[4px] truncate text-[16px] text-vault-foreground">Israel</p>
      </div>
      <button
        onClick={() => setLang((l) => (l === "English" ? "አማርኛ" : "English"))}
        className="tap h-[23px] w-[73px] shrink-0 rounded-full bg-brand-soft text-[12.5px] text-vault-foreground"
      >
        {lang}
      </button>
      <button
        aria-label="Profile"
        onClick={() => notify("Profile")}
        className="tap ml-[10px] h-[24px] w-[24px] shrink-0 rounded-full bg-brand-soft"
      />
      <button
        aria-label="Search"
        onClick={() => notify("Search")}
        className="tap ml-[7px] grid h-[24px] w-[24px] shrink-0 place-items-center rounded-full bg-brand-soft"
      >
        <SearchDotIcon className="h-[14px] w-[14px] text-vault-foreground" />
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
      className="relative ml-[33px] mr-[29px] mt-[16px] h-[204px] overflow-hidden rounded-[24px] bg-vault shadow-card"
      aria-label="Saving account"
    >
      <img
        src={mapBg}
        alt=""
        width={800}
        height={480}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="relative flex items-start pl-[14px] pt-[23px]">
        <img src={emblem} alt="CBE emblem" width={32} height={32} className="h-[32px] w-[32px] shrink-0" />
        <div className="ml-[9px] leading-none">
          <p className="text-[14.5px] text-gold">Commercial Bank of Ethiopia</p>
          <p className="mt-[5px] text-[10.5px] tracking-[0.09em] text-gold">The bank you can always rely on!</p>
        </div>
      </div>

      <div className="relative mt-[32px] flex items-end justify-center">
        {visible ? (
          <span className="text-[20px] font-semibold leading-none tracking-[0.02em] text-vault-foreground">
            24,580.75
          </span>
        ) : (
          <span className="text-[22px] font-bold leading-none tracking-[0.2em] text-vault-foreground">
            ******
          </span>
        )}
        <span className="mb-[-6px] ml-[6px] text-[13px] font-semibold tracking-[0.06em] text-vault-foreground">
          ETB
        </span>
        <button
          aria-label={visible ? "Hide balance" : "Show balance"}
          onClick={() => setVisible((v) => !v)}
          className="tap absolute right-[34px] top-[-2px] text-vault-muted/40"
        >
          {visible ? <Eye className="h-[19px] w-[19px]" strokeWidth={1.4} /> : <EyeOff className="h-[19px] w-[19px]" strokeWidth={1.4} />}
        </button>
      </div>

      <div className="relative mt-[33px] flex items-center justify-center">
        <p className="font-mono text-[14px] tracking-[0.07em] text-vault-muted">
          Saving Account 1 **** 4516
        </p>
        <button
          aria-label="Copy account number"
          onClick={copy}
          className="tap absolute right-[23px] text-vault-muted"
        >
          <CopyCardIcon className="h-[15px] w-[13px]" />
        </button>
      </div>
      <p className="relative mt-[8px] text-center text-[9px] tracking-[0.1em] text-vault-muted">
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
    <section className="relative mt-[17px]" aria-label="Quick actions">
      <div ref={ref} className="no-scrollbar mr-[46px] flex overflow-x-auto scroll-smooth pl-[36px]">
        {quickActions.map(({ label, icon: I, filled }) => (
          <button
            key={label}
            onClick={() => notify(label)}
            className="tap flex w-[83px] shrink-0 flex-col items-center"
          >
            <span className="grid h-[39px] w-[39px] place-items-center rounded-full bg-tile">
              {filled ? (
                <I className="h-[16px] w-[14px] text-brand" />
              ) : (
                <I className="h-[20px] w-[20px] text-brand" strokeWidth={1.7} />
              )}
            </span>
            <span className="mt-[11px] whitespace-nowrap text-[12px] font-medium text-brand">{label}</span>
          </button>
        ))}
      </div>
      <button
        aria-label="More actions"
        onClick={() => ref.current?.scrollBy({ left: 166 })}
        className="tap absolute right-[21px] top-[23px] grid h-[22px] w-[22px] place-items-center rounded-full bg-tile"
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
      return <Phone className="h-[24px] w-[24px] text-brand" fill="currentColor" strokeWidth={1} />;
    case "Other Transfers":
      return <Repeat className="h-[24px] w-[24px] text-brand" strokeWidth={2} />;
    case "CBEBirr":
      return <I className="h-[20px] w-[24px] text-brand" />;
    case "Bills & Utilities":
      return <I className="h-[20px] w-[16px] text-brand" />;
    case "Banking":
      return <I className="h-[22px] w-[22px] text-brand" />;
    default:
      return <I className="h-[20px] w-[15px] text-brand" />;
  }
}

function TransferRow() {
  const items = [
    { title: "CBE Transfer", sub: "Send Money", icon: ArrowUpRight, tint: "bg-send-tint", color: "text-send" },
    { title: "Receive", sub: "Get Paid", icon: ArrowDownLeft, tint: "bg-receive-tint", color: "text-receive" },
  ];
  return (
    <div className="mt-[24px] grid grid-cols-2 gap-[8px] pl-[25px] pr-[21px]">
      {items.map(({ title, sub, icon: I, tint, color }) => {
        const body = (
          <>
            <span className={cn("grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full", tint)}>
              <I className={cn("h-[15px] w-[15px]", color)} strokeWidth={1.6} />
            </span>
            <span className="ml-[8px] min-w-0 leading-none">
              <span className="block truncate text-[14px] text-brand">{title}</span>
              <span className="mt-[3px] block text-[9px] text-subtle">{sub}</span>
            </span>
          </>
        );
        const cls = "tap flex h-[69px] min-w-0 items-center rounded-[22px] bg-tile pl-[15px] text-left shadow-tile";
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
    <div className="mt-[14px] grid grid-cols-2 gap-x-[14px] gap-y-[14px] pl-[33px] pr-[29px] pb-[90px]">
      {services.map((s) => (
        <button
          key={s.label}
          onClick={() => notify(s.label)}
          className="tap flex h-[90px] min-w-0 flex-col items-center justify-center rounded-[20px] bg-tile px-2 text-center shadow-tile"
        >
          <ServiceIcon label={s.label} icon={s.icon} />
          <span className="mt-[8px] text-[15px] leading-[16px] text-brand">{s.label}</span>
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
      className="tap absolute bottom-[62px] left-1/2 z-20 flex h-[30px] w-[92px] -translate-x-1/2 items-center justify-center rounded-full bg-brand text-[13px] text-vault-foreground shadow-fab active:scale-95"
    >
      <span className="relative px-[3px] py-[2px]">
        Scan QR
        <QrCornerIcon className="absolute -left-[3px] -top-[2px] h-[6px] w-[6px]" />
        <QrCornerIcon className="absolute -right-[3px] -top-[2px] h-[6px] w-[6px]" />
        <QrCornerIcon className="absolute -bottom-[2px] -left-[3px] h-[6px] w-[6px]" />
        <QrCornerIcon className="absolute -bottom-[2px] -right-[3px] h-[6px] w-[6px]" />
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
    <nav className="absolute inset-x-0 bottom-0 z-10 grid h-[58px] grid-cols-3 border-t border-border bg-tile px-[29px]">
      {tabs.map(({ label, icon: I }) => {
        const on = active === label;
        return (
          <button
            key={label}
            onClick={() => setActive(label)}
            aria-current={on ? "page" : undefined}
            className="tap flex flex-col items-center pt-[7px]"
          >
            <span
              className={cn(
                "grid h-[23px] w-[60px] place-items-center rounded-full transition-colors",
                on && "bg-nav-active",
              )}
            >
              {label === "Settings" ? (
                <I className="h-[20px] w-[20px] text-brand" strokeWidth={1.6} />
              ) : label === "Home" ? (
                <I className="h-[19px] w-[21px] text-brand" />
              ) : (
                <I className="h-[20px] w-[27px] text-brand" />
              )}
            </span>
            <span className="mt-[9px] text-[11px] text-ink">{label}</span>
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
        <div className="absolute inset-x-0 top-[233px] h-[120px] rounded-tl-[46px] bg-surface" />
        <div className="relative">
          <Header />
          <AccountCard />
          <div className="mx-auto mt-[10px] h-[8px] w-[29px] rounded-full bg-indicator" />
          <QuickActions />
          <TransferRow />
          <ServiceGrid />
        </div>
      </div>
    </PhoneFrame>
  );
}
