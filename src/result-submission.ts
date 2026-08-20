import type { TestMeta } from "./test-catalog";

const FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd9HJvGOR7VUETE-KRfvWCsQPQPEshLq_NiFNWVvA04Sicl6g/formResponse";

const FORM_FIELDS = {
  name: "entry.655449102",
  total: "entry.330493587",
  assignmentCode: "entry.86015848",
  lessonName: "entry.414474821",
  activityName: "entry.1423127065",
  studentClass: "entry.172500407",
  percent: "entry.1161504407",
  score: "entry.1454259834",
  wrongAnswers: "entry.989432617",
} as const;

export async function submitResult(values: {
  name: string;
  studentClass: string;
  score: number;
  wrongAnswers: string;
  test: TestMeta;
}) {
  const percent = Math.round((values.score / values.test.total) * 100);
  const body = new URLSearchParams({
    [FORM_FIELDS.name]: values.name,
    [FORM_FIELDS.total]: String(values.test.total),
    [FORM_FIELDS.assignmentCode]: values.test.assignmentCode,
    [FORM_FIELDS.lessonName]: values.test.lessonName,
    [FORM_FIELDS.activityName]: values.test.activityName,
    [FORM_FIELDS.studentClass]: values.studentClass,
    [FORM_FIELDS.percent]: `${percent}%`,
    [FORM_FIELDS.score]: `${values.score}/${values.test.total}`,
    [FORM_FIELDS.wrongAnswers]: values.wrongAnswers || "Không có",
  });

  await fetch(FORM_ACTION_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body,
  });
}

export function localAttemptToken() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
