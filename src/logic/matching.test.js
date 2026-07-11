// src/logic/matching.test.js
import { describe, it, expect } from "vitest";
import { isRelevant } from "./matching.js";

describe("isRelevant - exact matches", () => {
  it("matches when tracking word appears exactly in transcript", () => {
    expect(isRelevant("Now boarding at Platform 5", "Platform 5")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isRelevant("now boarding at platform 5", "PLATFORM 5")).toBe(true);
  });

  it("ignores punctuation via normalize", () => {
    expect(isRelevant("Platform: 5, please proceed.", "Platform 5")).toBe(true);
  });
});

describe("isRelevant - fuzzy misspellings (distance <= 1)", () => {
  it("matches a single-character STT misspelling", () => {
    expect(isRelevant("Now boarding at Platfrm 5", "Platform 5")).toBe(true);
  });

  it("matches a single letter substitution", () => {
    expect(isRelevant("Train arriving at gats 3", "Gate 3")).toBe(true);
  });

  it("does NOT match a transposition (distance 2, not 1)", () => {
    expect(isRelevant("Train arriving at gaet 3", "Gate 3")).toBe(false);
  });
});

describe("isRelevant - should NOT match (avoid false positives)", () => {
  it("rejects a completely different word", () => {
    expect(isRelevant("Now boarding at Platform 5", "Terminal 9")).toBe(false);
  });

  it("rejects unrelated transcript entirely", () => {
    expect(isRelevant("Please mind the gap", "Platform 5")).toBe(false);
  });
});

describe("isRelevant - numeric tokens require exact match (FIXED)", () => {
  it("does NOT match Platform 9 against Platform 5 transcript", () => {
    expect(isRelevant("Now boarding at Platform 5", "Platform 9")).toBe(false);
  });
});

describe("isRelevant - edge cases", () => {
  it("handles empty transcript", () => {
    expect(isRelevant("", "Platform 5")).toBe(false);
  });

  it("handles empty selectedTracking", () => {
    expect(isRelevant("Any announcement here", "")).toBe(false);
  });

  it("handles multi-word tracking where all words must match", () => {
    expect(isRelevant("Flight 6E 202 now boarding", "6E 202")).toBe(true);
  });

  it("rejects numeric confusion in multi-digit values (FIXED)", () => {
    expect(isRelevant("Now boarding gate 12a", "gate 128")).toBe(false);
  });
});