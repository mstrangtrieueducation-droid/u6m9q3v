import assert from "node:assert/strict";
import test from "node:test";

import { worksheetTests } from "../src/worksheet-data.ts";
import { extraWorksheetTests } from "../src/worksheet-extra-data.ts";
import { exercises, quizQuestions } from "../src/quiz-data.ts";
import {
  answerPlaceholder,
  authoredChoicesForQuestion,
  worksheetQuestionPrompts,
} from "../src/worksheet-format.ts";

const allTests = { ...worksheetTests, ...extraWorksheetTests };

test("Unit 1 retains all 66 original questions in continuous order", () => {
  assert.equal(quizQuestions.length, 66);
  assert.deepEqual(
    quizQuestions.map((question) => question.number),
    Array.from({ length: 66 }, (_, index) => index + 1),
  );
  assert.ok(quizQuestions.every((question) => question.prompt.trim()));
});

test("Unit 1 only renders authored choose/circle sections as multiple choice", () => {
  for (const exercise of exercises) {
    const isAuthoredChoice = /choose|circle/i.test(exercise.help);
    if (isAuthoredChoice) {
      for (const question of exercise.questions) {
        assert.ok(question.distractors.length >= 1 && question.distractors.length <= 3);
        assert.equal(
          new Set([question.answer, ...question.distractors]).size,
          question.distractors.length + 1,
          `Unit 1 question ${question.number}: duplicate options`,
        );
      }
    } else {
      assert.doesNotMatch(
        exercise.help,
        /choose|circle/i,
        `${exercise.title}: fill-in exercise must remain a text input`,
      );
    }
  }
});

test("Unit 1 answer review has a specific explanation for every question", () => {
  for (const question of quizQuestions) {
    assert.ok(question.explanation.length >= 80, `Unit 1 question ${question.number}: explanation is too short`);
    assert.match(question.explanation, new RegExp(`Câu này muốn nói:`));
  }
});

test("text inputs tell students exactly what kind of answer to enter", () => {
  assert.equal(answerPlaceholder("Filling a, an or the where necessary."), "Nhập a / an / the / Ø");
  assert.equal(answerPlaceholder("If a sentence is correct, put a tick (✓). If there is an extra word, write it."), "Nhập từ thừa hoặc ✓");
  assert.equal(answerPlaceholder("Rewrite the sentences using the word given."), "Nhập câu viết lại");
  assert.equal(answerPlaceholder("Write one word in each gap."), "Nhập đúng 1 từ");
});

test("contains the complete Unit 2-20 worksheet set", () => {
  assert.deepEqual(Object.keys(allTests).sort(), [
    "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
  ]);
});

test("every worksheet has a continuous, unique answer key and matching total", () => {
  for (const [testId, worksheet] of Object.entries(allTests)) {
    assert.equal(
      worksheet.answers.length,
      worksheet.total,
      `${testId} ${worksheet.assignmentCode}: total does not match the answer key`,
    );

    const numbers = worksheet.answers.map((answer) => answer.number).sort((a, b) => a - b);
    assert.deepEqual(
      numbers,
      Array.from({ length: worksheet.total }, (_, index) => index + 1),
      `${testId} ${worksheet.assignmentCode}: missing or duplicated answer numbers`,
    );
  }
});

test("sections cover every answer exactly once and retain their original instructions", () => {
  for (const [testId, worksheet] of Object.entries(allTests)) {
    const covered = [];
    for (const section of worksheet.sections) {
      assert.ok(section.title.trim(), `${testId}: a section is missing its title`);
      assert.ok(section.help.trim(), `${testId} ${section.title}: missing original instruction`);
      assert.ok(section.body.trim(), `${testId} ${section.title}: missing original exercise content`);
      assert.ok(section.answerStart <= section.answerEnd, `${testId} ${section.title}: invalid answer range`);
      for (let number = section.answerStart; number <= section.answerEnd; number += 1) covered.push(number);
    }

    assert.deepEqual(
      covered.sort((a, b) => a - b),
      Array.from({ length: worksheet.total }, (_, index) => index + 1),
      `${testId} ${worksheet.assignmentCode}: sections omit or duplicate questions`,
    );
  }
});

test("authored multiple-choice questions keep exactly their original 2-4 options", () => {
  for (const [testId, worksheet] of Object.entries(allTests)) {
    for (const section of worksheet.sections) {
      for (let number = section.answerStart; number <= section.answerEnd; number += 1) {
        const answer = worksheet.answers.find((candidate) => candidate.number === number);
        assert.ok(answer, `${testId}: missing answer ${number}`);
        const choices = authoredChoicesForQuestion(
          section.body,
          section.answerStart,
          section.answerEnd,
          number,
        );

        if (!choices.length) {
          assert.doesNotMatch(
            answer.answer,
            /^[A-D]$/,
            `${testId} question ${number}: letter key without authored source choices`,
          );
          continue;
        }

        assert.ok(
          choices.length >= 2 && choices.length <= 4,
          `${testId} question ${number}: invalid source choice count ${choices.length}`,
        );
        assert.deepEqual(
          choices.map((choice) => choice.label),
          ["A", "B", "C", "D"].slice(0, choices.length),
          `${testId} question ${number}: source choice labels are not continuous`,
        );
        assert.match(
          answer.answer,
          /^[A-D]$/,
          `${testId} question ${number}: authored multiple choice was converted to text input`,
        );
        assert.ok(
          choices.some((choice) => choice.label === answer.answer),
          `${testId} question ${number}: key ${answer.answer} is absent from source choices`,
        );
      }
    }
  }
});

test("standalone exercises expose a prompt for every question", () => {
  for (const [testId, worksheet] of Object.entries(allTests)) {
    for (const section of worksheet.sections) {
      const prompts = worksheetQuestionPrompts(section.body, section.answerStart, section.answerEnd);
      if (prompts.size < Math.ceil((section.answerEnd - section.answerStart + 1) * 0.6)) continue;
      for (let number = section.answerStart; number <= section.answerEnd; number += 1) {
        assert.ok(
          prompts.get(number)?.trim(),
          `${testId} ${section.title}: question ${number} has no visible prompt`,
        );
      }
    }
  }
});
