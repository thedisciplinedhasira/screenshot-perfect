import { describe, expect, it } from "vitest";

import { initials, isValidAccount, maskAccount } from "@/components/bank/transfer-utils";

describe("transfer rules", () => {
  it("accepts only 13-digit account numbers", () => {
    expect(isValidAccount("1000123450545")).toBe(true);
    expect(isValidAccount("100012345054")).toBe(false);
  });
  it("masks account numbers like 1********0545", () => {
    expect(maskAccount("1000123450545")).toBe("1********0545");
  });
  it("uses first two name initials for avatars", () => {
    expect(initials("Kenenisa Gelo Adula")).toBe("KG");
  });
});

import { lookupAccountName, pushPinDigit } from "@/components/bank/transfer-utils";

describe("pin and account name", () => {
  it("stops accepting digits after 6", () => {
    expect(pushPinDigit("123456", "7")).toBe("123456");
    expect(pushPinDigit("12345", "6")).toBe("123456");
  });
  it("shows a saved name for a known account and none for an incomplete number", () => {
    expect(lookupAccountName("1000426548333", { "1000426548333": "Hirut Negash Asfaw" })).toBe(
      "Hirut Negash Asfaw",
    );
    expect(lookupAccountName("100042654833", {})).toBeNull();
  });
});

import { makeTransactionId, transferCharges } from "@/components/bank/transfer-utils";

describe("transfer charges and reference", () => {
  it("charges ETB 0.50 service, 15% VAT and 5% disaster recovery: 5.00 sends total 5.61", () => {
    expect(transferCharges(5)).toEqual({ service: 0.5, vat: 0.08, disaster: 0.03, total: 5.61 });
  });
  it("builds a reference like FT26315xxxxx for Nov 11, 2026", () => {
    expect(makeTransactionId(new Date(2026, 10, 11, 17, 10), () => 0)).toBe("FT26315AAAAA");
  });
});

import { searchContacts } from "@/components/bank/transfer-utils";

describe("account name search", () => {
  const people = [
    { name: "Hirut Negash Asfaw", account: "1000426548333" },
    { name: "Mohammed Sirmolo Hussein", account: "1000234568174" },
    { name: "Kenenisa Gelo Adula", account: "1000123450545" },
  ];
  it("typing 'h' lists everyone with a name starting with H", () => {
    expect(searchContacts("h", people).map((p) => p.name)).toEqual(["Hirut Negash Asfaw", "Mohammed Sirmolo Hussein"]);
  });
  it("typing 'hirut' finds Hirut's account, case-insensitive", () => {
    expect(searchContacts("HIRUT", people)).toEqual([people[0]]);
  });
});
