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
