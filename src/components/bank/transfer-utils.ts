/** CBE account numbers are 13 digits. */
export const isValidAccount = (value: string) => /^\d{13}$/.test(value);

/** Shows first digit, eight stars, and the last four digits: 1********0545 */
export const maskAccount = (value: string) =>
  value.length < 5 ? value : `${value[0]}********${value.slice(-4)}`;

export const parseAmount = (value: string) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
};

export const formatAmount = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

export const PIN_LENGTH = 6;

/** Adds a keypad digit to a PIN, ignoring input past PIN_LENGTH digits. */
export const pushPinDigit = (pin: string, digit: string) =>
  pin.length >= PIN_LENGTH ? pin : pin + digit;

const FIRST = ["Hirut", "Abebe", "Tigist", "Yonas", "Meron", "Bereket", "Liya", "Samuel", "Hana", "Kebede"];
const FATHER = ["Negash", "Tesfaye", "Mulugeta", "Haile", "Girma", "Wolde", "Bekele", "Alemu", "Desta", "Kassa"];
const GRAND = ["Asfaw", "Lemma", "Tadesse", "Ayele", "Mekonnen", "Gebre", "Abate", "Worku", "Shiferaw", "Fikre"];

/**
 * Demo account-holder lookup: known accounts return their saved name, any other
 * valid number returns a stable sample name. Invalid numbers return null.
 */
export const lookupAccountName = (account: string, known: Record<string, string>) => {
  if (!isValidAccount(account)) return null;
  if (known[account]) return known[account];
  const d = account.split("").map(Number);
  const pick = (pool: string[], i: number) => pool[(d[i]! * 7 + d[i + 1]! * 3 + d[12]!) % pool.length]!;
  return `${pick(FIRST, 4)} ${pick(FATHER, 7)} ${pick(GRAND, 9)}`;
};

/* ------------------------------ Charges ------------------------------ */

export const SERVICE_CHARGE = 0.5;
export const VAT_RATE = 0.15; // applied to the service charge
export const DISASTER_RECOVERY_RATE = 0.05; // applied to the service charge

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export const transferCharges = (amount: number) => {
  const service = SERVICE_CHARGE;
  const vat = round2(service * VAT_RATE);
  const disaster = round2(service * DISASTER_RECOVERY_RATE);
  return { service, vat, disaster, total: round2(amount + service + vat + disaster) };
};

/* --------------------------- Transaction id --------------------------- */

const dayOfYear = (d: Date) =>
  Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86_400_000);

/** CBE-style reference: FT + 2-digit year + day of year + 5 random characters (e.g. FT26315SW8VH). */
export const makeTransactionId = (date: Date, random: () => number = Math.random) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  const tail = Array.from({ length: 5 }, () => chars[Math.floor(random() * chars.length)]).join("");
  return `FT${String(date.getFullYear()).slice(-2)}${String(dayOfYear(date)).padStart(3, "0")}${tail}`;
};

/** "Nov 11, 2026 05:10 PM" */
export const formatReceiptDate = (d: Date) => {
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${date} ${time}`;
};
