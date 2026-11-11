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
