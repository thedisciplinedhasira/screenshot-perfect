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
