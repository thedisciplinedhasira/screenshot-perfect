import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function GridMenuIcon(p: P) {
  return (
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={2.2} {...p}>
      <rect x="1.5" y="1.5" width="7.5" height="7.5" rx="2.4" />
      <rect x="13" y="1.5" width="7.5" height="7.5" rx="2.4" />
      <rect x="1.5" y="13" width="7.5" height="7.5" rx="2.4" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="2.4" />
    </svg>
  );
}

export function SearchDotIcon(p: P) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} {...p}>
      <circle cx="7" cy="7" r="5.5" />
      <circle cx="13.2" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ReceiptFilledIcon(p: P) {
  return (
    <svg viewBox="0 0 20 24" fill="currentColor" {...p}>
      <path d="M1 1.5 3.4 0l2.4 1.5L8.2 0l2.4 1.5L13 0l2.4 1.5L17.8 0 19 .8v22.4l-1.2.8-2.4-1.5L13 24l-2.4-1.5L8.2 24l-2.4-1.5L3.4 24 1 22.5Z" />
      <path d="M5 8h10M5 11.5h10M5 15h10" stroke="white" strokeOpacity={0.85} strokeWidth={1.1} />
    </svg>
  );
}

export function WalletFilledIcon(p: P) {
  return (
    <svg viewBox="0 0 48 40" fill="currentColor" {...p}>
      <path d="M8 0h28a4 4 0 0 1 4 4v2H8a2.5 2.5 0 0 0 0 5h34a6 6 0 0 1 6 6v17a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V8a8 8 0 0 1 8-8Z" />
      <circle cx="39" cy="25.5" r="2.6" fill="white" />
    </svg>
  );
}

export function BuildingFilledIcon(p: P) {
  return (
    <svg viewBox="0 0 30 40" fill="currentColor" {...p}>
      <path d="M3 0h24a3 3 0 0 1 3 3v37H19v-8h-8v8H0V3a3 3 0 0 1 3-3Z" />
      <g fill="white">
        <rect x="5" y="6" width="4" height="4" rx=".6" />
        <rect x="13" y="6" width="4" height="4" rx=".6" />
        <rect x="21" y="6" width="4" height="4" rx=".6" />
        <rect x="5" y="14" width="4" height="4" rx=".6" />
        <rect x="13" y="14" width="4" height="4" rx=".6" />
        <rect x="21" y="14" width="4" height="4" rx=".6" />
      </g>
    </svg>
  );
}

export function BankFilledIcon(p: P) {
  return (
    <svg viewBox="0 0 44 40" fill="currentColor" {...p}>
      <path d="M22 0 44 9v4H0V9Z" />
      <rect x="3" y="15" width="38" height="3" />
      <rect x="5" y="20" width="4" height="12" />
      <rect x="13" y="20" width="4" height="12" />
      <rect x="20" y="20" width="4" height="12" />
      <rect x="27" y="20" width="4" height="12" />
      <rect x="35" y="20" width="4" height="12" />
      <rect x="2" y="34" width="40" height="3" />
      <circle cx="22" cy="7" r="1.8" fill="white" />
    </svg>
  );
}

export function HomeFilledIcon(p: P) {
  return (
    <svg viewBox="0 0 24 22" fill="currentColor" {...p}>
      <path d="M12 0 24 10.5h-3.5V22h-6v-7h-5v7h-6V10.5H0Z" />
    </svg>
  );
}

export function BankOutlineIcon(p: P) {
  return (
    <svg viewBox="0 0 30 24" fill="none" stroke="currentColor" strokeWidth={1.3} {...p}>
      <path d="M15 1 29 7.5v1.5H1V7.5Z" strokeLinejoin="round" />
      <circle cx="15" cy="5.5" r="1.3" />
      <path d="M2.5 11h25M4 11v8M8 11v8M12 11v8M18 11v8M22 11v8M26 11v8M2 20.5h26M1 23h28" />
    </svg>
  );
}

export function QrCornerIcon(p: P) {
  return (
    <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth={0.9} {...p}>
      <rect x="0.5" y="0.5" width="7" height="7" rx="1.6" />
      <rect x="2.6" y="2.6" width="2.8" height="2.8" rx=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CopyCardIcon(p: P) {
  return (
    <svg viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth={1.1} {...p}>
      <rect x="3" y="0.6" width="10.4" height="12" rx="1.6" />
      <path d="M1 3.5v10.4A1.6 1.6 0 0 0 2.6 15.5h8" strokeDasharray="1.4 1.2" />
    </svg>
  );
}
