import assert from "node:assert/strict";
import test from "node:test";

import { answersMatch } from "../src/answer-matching.ts";
import { worksheetTests } from "../src/worksheet-data.ts";
import { extraWorksheetTests } from "../src/worksheet-extra-data.ts";

test("accepts authored alternatives plus equivalent contractions", () => {
  assert.equal(answersMatch("will have lived", "will have been living|will have lived"), true);
  assert.equal(answersMatch("didn't use to", "did not use to"), true);
  assert.equal(answersMatch("he's already left", "he has already left"), true);
  assert.equal(answersMatch("she's ready", "she is ready"), true);
});

test("accepts standard British and American spelling variants", () => {
  assert.equal(answersMatch("travelling", "traveling"), true);
  assert.equal(answersMatch("apologized", "apologised"), true);
  assert.equal(answersMatch("realized", "realised"), true);
});

test("expands optional words and accepts authored structural alternatives", () => {
  assert.equal(answersMatch("make certain", "make certain (that)"), true);
  assert.equal(answersMatch("make certain that", "make certain (that)"), true);
  assert.equal(answersMatch("continue to make", "continue making|continue to make"), true);
  assert.equal(answersMatch("continue", "continue making|continue to make"), false);
});

test("ignores harmless typography without weakening the grammar key", () => {
  assert.equal(answersMatch("  Café. ", "cafe"), true);
  assert.equal(answersMatch("will go", "go"), false);
  assert.equal(answersMatch("suitable", "unsuitable"), false);
  assert.equal(answersMatch("in", "on"), false);
});

test("accepts every authored Grammar Foundation alternative", () => {
  const tests = { ...worksheetTests, ...extraWorksheetTests };
  for (const [unit, worksheet] of Object.entries(tests)) {
    for (const answer of worksheet.answers) {
      for (const alternative of answer.answer.split("|")) {
        assert.equal(
          answersMatch(alternative, answer.answer),
          true,
          `Grammar site unit ${unit}, question ${answer.number}: ${alternative}`,
        );
      }
    }
  }
});
