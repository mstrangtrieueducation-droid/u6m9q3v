import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = ["src/App.tsx", "src/quiz.tsx", "src/worksheet-quiz.tsx"];

test("the GitHub build has no dependency on the former server APIs", async () => {
  const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(source, /\/api\/(?:attempt|teacher)/);
  assert.doesNotMatch(source, /chatgpt\.site/);
});

test("results are submitted to the established Google Form", async () => {
  const source = await readFile("src/result-submission.ts", "utf8");
  assert.match(source, /docs\.google\.com\/forms\/d\/e\//);
  assert.match(source, /mode:\s*"no-cors"/);
  assert.match(source, /entry\.86015848/);
  assert.match(source, /entry\.1454259834/);
});
