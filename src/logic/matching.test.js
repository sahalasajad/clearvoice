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
    // "Platfrm" is missing one letter vs "platform" -> distance 1
    expect(isRelevant("Now boarding at Platfrm 5", "Platform 5")).toBe(true);
  });

  it("matches a single letter substitution", () => {
    // "gats" vs "gate": one substitution (e->s) -> distance 1
    expect(isRelevant("Train arriving at gats 3", "Gate 3")).toBe(true);
  });

  it("does NOT match a transposition (distance 2, not 1)", () => {
    // "gaet" vs "gate" is a swap of adjacent letters -> Levenshtein distance 2
    // NOTE: standard Levenshtein counts transpositions as 2 edits.
    // If you want these to match, you'd need Damerau-Levenshtein instead.
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
    // Numeric tokens now require exact match, so a single-digit difference
    // no longer causes a false positive.
    expect(isRelevant("Now boarding at Platform 5", "Platform 9")).toBe(false);
  });
});

describe("isRelevant - edge cases", () => {
  it("handles empty transcript", () => {
    expect(isRelevant("", "Platform 5")).toBe(false);
  });

  it("handles empty selectedTracking", () => {
    // normalize("") -> "", "".split(" ") -> [""] (array with one empty string,
    // NOT an empty array). So .every() checks if "" fuzzy-matches some word,
    // which it won't (distance = word length > 1). Net effect: nothing shows
    // when no tracking is selected, which is the safe/sensible behavior.
    expect(isRelevant("Any announcement here", "")).toBe(false);
  });

  it("handles multi-word tracking where all words must match", () => {
    expect(isRelevant("Flight 6E 202 now boarding", "6E 202")).toBe(true);
  });

  it("rejects numeric confusion in multi-digit values (FIXED)", () => {
    // "12a" and "128" are distance 1 apart, but numeric tokens now require
    // an exact match, so this is correctly rejected.
    expect(isRelevant("Now boarding gate 12a", "gate 128")).toBe(false);
  });
});