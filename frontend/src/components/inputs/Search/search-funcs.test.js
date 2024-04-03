/**
 * Tests for the search functions
 * used by the search bar component
 * to filter a list of strings to
 * find items containing the
 * target string.
 */

import * as s from "./search-funcs";

test("caseInsensitive", () => {
  const testCases = [
    {
      target: "hi",
      inputs: ["hill", "Hill", "Hillo", "h", "no"],
      expected: ["hill", "Hill", "Hillo"],
    },
    {
      target: "w",
      inputs: ["Walmart", "will", "wilson", "al watts", "not", ""],
      expected: ["Walmart", "will", "wilson", "al watts"],
    },
  ];

  testCases.forEach(({ target, inputs, expected }) => {
    expect(s.caseInsensitive(target, inputs)).toEqual(expected);
  });
});

test("caseInsensitiveAlphabetical", () => {
  const testCases = [
    {
      target: "hi",
      inputs: ["hill", "Ahi", "way too high", "h", "no"],
      expected: ["Ahi", "hill", "way too high"],
    },
    {
      target: "w",
      inputs: ["Walmart", "will", "wilson", "al watts", "not", ""],
      expected: ["al watts", "Walmart", "will", "wilson"],
    },
  ];

  testCases.forEach(({ target, inputs, expected }) => {
    expect(s.caseInsensitiveAlphabetical(target, inputs)).toEqual(expected);
  });
});
