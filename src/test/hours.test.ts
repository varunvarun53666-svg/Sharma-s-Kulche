import { describe, it, expect } from "vitest";
import { isOpenAt } from "@/lib/hours";

const week = (open: string, close: string) => Array.from({ length: 7 }, () => ({ open, close }));
const at = (h: number, m = 0) => new Date(2026, 10, 27, h, m);

describe("isOpenAt", () => {
  it("is open inside hours and closed outside", () => {
    expect(isOpenAt(week("11:00", "23:00"), at(12))).toBe(true);
    expect(isOpenAt(week("11:00", "23:00"), at(23, 30))).toBe(false);
    expect(isOpenAt(week("11:00", "23:00"), at(10, 59))).toBe(false);
  });
  it("handles closing after midnight", () => {
    expect(isOpenAt(week("18:00", "01:00"), at(0, 30))).toBe(true);
    expect(isOpenAt(week("18:00", "01:00"), at(2))).toBe(false);
  });
  it("is closed on a closed day", () => {
    const h = week("11:00", "23:00").map((d, i) => (i === 5 ? null : d));
    expect(isOpenAt(h, at(12))).toBe(false); // 27 Nov 2026 is a Friday
  });
});
