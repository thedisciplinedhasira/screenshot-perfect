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
