import { describe, it, expect } from "vitest";
import { looksLikeSpam, reviewSchema } from "@/lib/reviews";

describe("review spam guard", () => {
  it("rejects filled honeypot", () => expect(looksLikeSpam("bot", 0, 10_000)).toBe(true));
  it("rejects too-fast submissions", () => expect(looksLikeSpam("", 0, 1000)).toBe(true));
  it("accepts normal submissions", () => expect(looksLikeSpam("", 0, 5000)).toBe(false));
});
describe("review schema", () => {
  it("requires a 1-5 rating", () => {
    expect(reviewSchema.safeParse({ name: "Ann", branch: "vv-puram", rating: 0, comment: "Lovely kulche here" }).success).toBe(false);
    expect(reviewSchema.safeParse({ name: "Ann", branch: "vv-puram", rating: 5, comment: "Lovely kulche here" }).success).toBe(true);
  });
});
