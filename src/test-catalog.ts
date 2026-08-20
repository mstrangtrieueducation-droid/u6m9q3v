export type TestMeta = {
  assignmentCode: string;
  lessonName: string;
  activityName: string;
  total: number;
};

export const TEST_CATALOG: Record<string, TestMeta> = {
  "Grammar Foundation - Unit 1": {
    assignmentCode: "Grammar Foundation - Unit 1",
    lessonName: "Grammar Foundation – Unit 1",
    activityName: "Present Forms – Bài kiểm tra",
    total: 66,
  },
  "Grammar Foundation - Unit 2": {
    assignmentCode: "Grammar Foundation - Unit 2",
    lessonName: "Grammar Foundation – Unit 2",
    activityName: "Past Forms – Bài kiểm tra",
    total: 81,
  },
  "Grammar Foundation - Unit 3": {
    assignmentCode: "Grammar Foundation - Unit 3",
    lessonName: "Grammar Foundation – Unit 3",
    activityName: "Future Forms – Bài kiểm tra",
    total: 58,
  },
  "Grammar Foundation - Unit 4.1": {
    assignmentCode: "Grammar Foundation - Unit 4.1",
    lessonName: "Grammar Foundation – Unit 4.1",
    activityName: "Infinitive / -ing Forms – Bài kiểm tra 1",
    total: 58,
  },
  "Grammar Foundation - Unit 4.2": { assignmentCode: "Grammar Foundation - Unit 4.2", lessonName: "Grammar Foundation – Unit 4.2", activityName: "Infinitive / -ing Forms – Bài kiểm tra 2", total: 70 },
  "Grammar Foundation - Unit 5.1": { assignmentCode: "Grammar Foundation - Unit 5.1", lessonName: "Grammar Foundation – Unit 5.1", activityName: "Modal Verbs – Bài kiểm tra 1", total: 54 },
  "Grammar Foundation - Unit 5.2": { assignmentCode: "Grammar Foundation - Unit 5.2", lessonName: "Grammar Foundation – Unit 5.2", activityName: "Modal Verbs – Bài kiểm tra 2", total: 46 },
  "Grammar Foundation - Unit 6": { assignmentCode: "Grammar Foundation - Unit 6", lessonName: "Grammar Foundation – Unit 6", activityName: "The Passive – Bài kiểm tra", total: 50 },
  "Grammar Foundation - Unit 7": { assignmentCode: "Grammar Foundation - Unit 7", lessonName: "Grammar Foundation – Unit 7", activityName: "Conditionals & Wishes – Bài kiểm tra", total: 46 },
  "Grammar Foundation - Unit 8": { assignmentCode: "Grammar Foundation - Unit 8", lessonName: "Grammar Foundation – Unit 8", activityName: "Clauses – Bài kiểm tra", total: 66 },
  "Grammar Foundation - Unit 9.1": { assignmentCode: "Grammar Foundation - Unit 9.1", lessonName: "Grammar Foundation – Unit 9.1", activityName: "Reported Speech – Bài kiểm tra 1", total: 44 },
  "Grammar Foundation - Unit 9.2": { assignmentCode: "Grammar Foundation - Unit 9.2", lessonName: "Grammar Foundation – Unit 9.2", activityName: "Reported Speech – Bài kiểm tra 2", total: 64 },
  "Grammar Foundation - Unit 10": { assignmentCode: "Grammar Foundation - Unit 10", lessonName: "Grammar Foundation – Unit 10", activityName: "Nouns & Articles – Bài kiểm tra", total: 61 },
  "Grammar Foundation - Unit 11": { assignmentCode: "Grammar Foundation - Unit 11", lessonName: "Grammar Foundation – Unit 11", activityName: "Causative Form – Bài kiểm tra", total: 50 },
  "Grammar Foundation - Unit 12": { assignmentCode: "Grammar Foundation - Unit 12", lessonName: "Grammar Foundation – Unit 12", activityName: "Adjectives, Adverbs & Comparisons – Bài kiểm tra", total: 58 },
  "Grammar Foundation - Unit 13": { assignmentCode: "Grammar Foundation - Unit 13", lessonName: "Grammar Foundation – Unit 13", activityName: "Pronouns, Possessives & Quantifiers – Bài kiểm tra", total: 57 },
  "Grammar Foundation - Unit 14": { assignmentCode: "Grammar Foundation - Unit 14", lessonName: "Grammar Foundation – Unit 14", activityName: "Questions & Question Tags – Bài kiểm tra", total: 57 },
  "Grammar Foundation - Unit 15": { assignmentCode: "Grammar Foundation - Unit 15", lessonName: "Grammar Foundation – Unit 15", activityName: "Mixed Conditionals & Inversion – Bài kiểm tra", total: 61 },
  "Grammar Foundation - Unit 16": { assignmentCode: "Grammar Foundation - Unit 16", lessonName: "Grammar Foundation – Unit 16", activityName: "Subject–Verb Agreement – Bài kiểm tra", total: 50 },
  "Grammar Foundation - Unit 17": { assignmentCode: "Grammar Foundation - Unit 17", lessonName: "Grammar Foundation – Unit 17", activityName: "Subjunctive Mood – Bài kiểm tra", total: 40 },
  "Grammar Foundation - Unit 18": { assignmentCode: "Grammar Foundation - Unit 18", lessonName: "Grammar Foundation – Unit 18", activityName: "Advanced Relative Clauses – Bài kiểm tra", total: 63 },
  "Grammar Foundation - Unit 19": { assignmentCode: "Grammar Foundation - Unit 19", lessonName: "Grammar Foundation – Unit 19", activityName: "Inversion – Bài kiểm tra", total: 60 },
  "Grammar Foundation - Unit 20": { assignmentCode: "Grammar Foundation - Unit 20", lessonName: "Grammar Foundation – Unit 20", activityName: "Comparison & Participles – Bài kiểm tra", total: 64 },
};

export function getTestMeta(code: string | undefined) {
  if (!code) return undefined;
  return TEST_CATALOG[code];
}
