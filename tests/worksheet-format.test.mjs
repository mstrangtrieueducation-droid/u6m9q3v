import assert from "node:assert/strict";
import test from "node:test";
import {
  extractQuestionContext,
  authoredChoicesForQuestion,
  normalizeWorksheetBody,
  parseChoices,
  parseSharedPassageChoices,
  tokenizeWorksheetLine,
} from "../src/worksheet-format.ts";
import { worksheetTests } from "../src/worksheet-data.ts";
import { extraWorksheetTests } from "../src/worksheet-extra-data.ts";

test("normalizes source spacing and turns underscore runs into stable blank tokens", () => {
  const normalized = normalizeWorksheetBody("   You (0) __will meet__ Agent.   When she 1) _______________ (arrive).  ");
  assert.equal(normalized, "You (0) __will meet__ Agent. When she 1) _______________ (arrive).");
  const tokens = tokenizeWorksheetLine(normalized);
  assert.ok(tokens.some((token) => token.type === "given" && token.value === "will meet"));
  assert.ok(tokens.some((token) => token.type === "blank" && token.size === "medium"));
});

test("parses A-D choices and separates a shared passage from its answer list", () => {
  const body = [
    "Dear Veena,",
    "When you 37) ______ me, I 38) ______ you up from the airport.",
    "After that, we will go to the flat and discuss our plans for the rest of the week.",
    "37. A will visit B are visiting C visit D will be visiting",
    "38. A will pick B will be picking C am picking D pick",
  ].join("\n");
  const parsed = parseSharedPassageChoices(body, 37, 38);
  assert.ok(parsed);
  assert.match(parsed.sourceBody, /Dear Veena/);
  assert.doesNotMatch(parsed.sourceBody, /A will visit/);
  assert.equal(parsed.choicesByNumber.get(37)?.[2].text, "visit");
  assert.equal(parseChoices("46. I ____ tomorrow. A go B went C am going D have gone")?.prompt, "I ____ tomorrow.");
  assert.deepEqual(
    parseChoices("29. He denied ____ it. A. take B. to take C. taking")?.choices.map((choice) => choice.text),
    ["take", "to take", "taking"],
  );
});

test("keeps an authored two-choice question as exactly two choices", () => {
  const parsed = parseChoices("14. The sausages taste delicious. A. taste B. are tasting");
  assert.deepEqual(parsed?.choices.map((choice) => choice.label), ["A", "B"]);
  assert.deepEqual(parsed?.choices.map((choice) => choice.text), ["taste", "are tasting"]);
});

test("parses tightly-spaced labels and detached passage choice blocks", () => {
  assert.deepEqual(
    parseChoices("15. _____ had he finished dinner. A. No sooner B.Not until C. No longer D. Scarcely")
      ?.choices.map((choice) => choice.text),
    ["No sooner", "Not until", "No longer", "Scarcely"],
  );

  const body = [
    "If this theory (26) ___ correct, it (27) ___ that we live in more than one universe.",
    "26",
    "A. will be",
    "B. is",
    "C. would have been",
    "D. has been",
    "27",
    "A. has meant",
    "B. meant",
    "C. had meant",
    "D. means",
  ].join("\n");
  const parsed = parseSharedPassageChoices(body, 26, 27);
  assert.ok(parsed);
  assert.equal(parsed.choicesByNumber.get(26)?.[1].text, "is");
  assert.equal(parsed.choicesByNumber.get(27)?.[3].text, "means");
});

test("every letter answer in all worksheet tests has authored source choices", () => {
  const allTests = { ...worksheetTests, ...extraWorksheetTests };
  assert.equal(Object.keys(allTests).length, 22);

  for (const worksheet of Object.values(allTests)) {
    for (const section of worksheet.sections) {
      const answers = worksheet.answers.filter((answer) => (
        answer.number >= section.answerStart && answer.number <= section.answerEnd
      ));
      for (const answer of answers) {
        if (!/^[A-D]$/.test(answer.answer)) continue;
        const choices = authoredChoicesForQuestion(
          section.body,
          section.answerStart,
          section.answerEnd,
          answer.number,
        );
        assert.ok(
          choices.length >= 2,
          `${worksheet.assignmentCode}, câu ${answer.number}: đáp án chữ cái nhưng đề gốc không có phương án.`,
        );
        assert.ok(
          choices.some((choice) => choice.label === answer.answer),
          `${worksheet.assignmentCode}, câu ${answer.number}: đáp án không tồn tại trong phương án gốc.`,
        );
      }
    }
  }
});

test("Unit 5.1 numbering and answer types stay aligned with the original sections", () => {
  const unit = extraWorksheetTests["06"];
  assert.match(unit.sections[2].body, /13\. ought \/ should/);
  assert.match(unit.sections[7].body, /54\. ___ visit/);
  assert.equal(unit.answers.find((answer) => answer.number === 29)?.answer, "could");
  assert.equal(unit.answers.find((answer) => answer.number === 30)?.answer, "should");
  assert.equal(unit.answers.find((answer) => answer.number === 31)?.answer, "B");
});

test("extracts the actual sentence for answer review", () => {
  const body = "Last year, I 55) ______ (celebrate) at home and everyone 56) ______ (enjoy) themselves. It 57) ______ (open) tomorrow.";
  assert.match(extractQuestionContext(body, 56), /everyone 56\)/);
  assert.match(extractQuestionContext(body, 57), /It 57\)/);
});
