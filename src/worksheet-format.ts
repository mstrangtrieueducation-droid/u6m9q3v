export type WorksheetTextToken =
  | { type: "text"; value: string }
  | { type: "blank"; value: string; size: "short" | "medium" | "long" }
  | { type: "given"; value: string };

export type WorksheetChoice = {
  label: "A" | "B" | "C" | "D";
  text: string;
};

export type ParsedChoices = {
  number?: number;
  prompt: string;
  choices: WorksheetChoice[];
};

export type SharedPassageChoices = {
  sourceBody: string;
  choicesByNumber: Map<number, WorksheetChoice[]>;
};

export function normalizeWorksheetBody(body: string) {
  const cleaned: string[] = [];
  for (const rawLine of body.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine
      .replace(/\t/g, " ")
      .replace(/[\u00a0 ]{2,}/g, " ")
      .trim();
    if (!line) {
      if (cleaned.length && cleaned.at(-1) !== "") cleaned.push("");
      continue;
    }
    cleaned.push(line);
  }

  while (cleaned.at(-1) === "") cleaned.pop();
  while (/^(?:ĐÁP ÁN|GRAMMAR FOUNDATION(?: 1)?)$/i.test(cleaned.at(-1) ?? "")) {
    cleaned.pop();
    while (cleaned.at(-1) === "") cleaned.pop();
  }
  return cleaned.join("\n");
}

export function tokenizeWorksheetLine(line: string): WorksheetTextToken[] {
  const tokens: WorksheetTextToken[] = [];
  const pattern = /_{2,}\s*([A-Za-z][A-Za-z0-9’'\-/ ]{0,70}?)\s*_{2,}|_{3,}/g;
  let cursor = 0;
  for (const match of line.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ type: "text", value: line.slice(cursor, index) });
    if (match[1]) {
      tokens.push({ type: "given", value: match[1].trim() });
    } else {
      const length = match[0].length;
      tokens.push({
        type: "blank",
        value: match[0],
        size: length >= 24 ? "long" : length >= 10 ? "medium" : "short",
      });
    }
    cursor = index + match[0].length;
  }
  if (cursor < line.length) tokens.push({ type: "text", value: line.slice(cursor) });
  return tokens.length ? tokens : [{ type: "text", value: line }];
}

function choiceMarkers(value: string) {
  return [...value.matchAll(/(?:^|\s)([A-D])(?:[.)]\s*|\s+)/g)].map((match) => ({
    label: match[1] as WorksheetChoice["label"],
    start: (match.index ?? 0) + (match[0].length - match[0].trimStart().length),
    end: (match.index ?? 0) + match[0].length,
  }));
}

export function parseChoices(value: string): ParsedChoices | null {
  const normalized = normalizeWorksheetBody(value).replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
  const numbered = normalized.match(/^(\d+)[.)]\s*/);
  const content = numbered ? normalized.slice(numbered[0].length) : normalized;
  const markers = choiceMarkers(content);

  for (let index = 0; index < markers.length; index += 1) {
    if (markers[index].label !== "A") continue;
    const candidate = markers.slice(index, index + 4);
    const labels = candidate.map((item) => item.label).join("");
    const choiceCount = labels.startsWith("ABCD") ? 4 : labels.startsWith("ABC") ? 3 : labels.startsWith("AB") ? 2 : 0;
    if (!choiceCount) continue;
    const sequence = candidate.slice(0, choiceCount);
    const choices = sequence.map((marker, choiceIndex) => ({
      label: marker.label,
      text: content.slice(marker.end, sequence[choiceIndex + 1]?.start ?? content.length).trim(),
    }));
    if (choices.some((choice) => !choice.text)) continue;
    return {
      number: numbered ? Number(numbered[1]) : undefined,
      prompt: content.slice(0, sequence[0].start).trim(),
      choices,
    };
  }
  return null;
}

function markerCount(value: string, answerStart: number, answerEnd: number) {
  let count = 0;
  for (let number = answerStart; number <= answerEnd; number += 1) {
    const marker = new RegExp(`(?:\\(|\\b)${number}[.)]\\s*_{2,}`);
    if (marker.test(value)) count += 1;
  }
  return count;
}

function parseDetachedChoiceBlocks(lines: string[], answerStart: number, answerEnd: number) {
  const choicesByNumber = new Map<number, WorksheetChoice[]>();
  let firstBlockLine = -1;

  for (let index = 0; index < lines.length; index += 1) {
    const numbered = lines[index].match(/^(\d+)[.)]?$/);
    if (!numbered) continue;
    const number = Number(numbered[1]);
    if (number < answerStart || number > answerEnd) continue;

    const optionLines: string[] = [];
    let cursor = index + 1;
    while (cursor < lines.length && !/^\d+[.)]?$/.test(lines[cursor])) {
      optionLines.push(lines[cursor]);
      cursor += 1;
    }
    const parsed = parseChoices(`${number}. ${optionLines.join(" ")}`);
    if (!parsed || parsed.choices.length < 2) continue;
    if (firstBlockLine < 0) firstBlockLine = index;
    choicesByNumber.set(number, parsed.choices);
    index = cursor - 1;
  }

  return { choicesByNumber, firstBlockLine };
}

export function parseSharedPassageChoices(
  body: string,
  answerStart: number,
  answerEnd: number,
): SharedPassageChoices | null {
  const lines = normalizeWorksheetBody(body).split("\n");
  const detached = parseDetachedChoiceBlocks(lines, answerStart, answerEnd);
  if (detached.choicesByNumber.size >= 2 && detached.firstBlockLine > 0) {
    const sourceBody = lines.slice(0, detached.firstBlockLine).join("\n").trim();
    if (sourceBody.length >= 80 && markerCount(sourceBody, answerStart, answerEnd) >= 2) {
      return { sourceBody, choicesByNumber: detached.choicesByNumber };
    }
  }

  const parsedLines = lines.map((line, index) => ({ index, parsed: parseChoices(line) }));
  const relevant = parsedLines.filter(({ parsed }) => (
    parsed?.number !== undefined
    && parsed.number >= answerStart
    && parsed.number <= answerEnd
  ));
  if (relevant.length < 2) return null;

  const firstChoiceLine = parsedLines.find(({ parsed }) => (parsed?.choices.length ?? 0) >= 3)?.index ?? relevant[0].index;
  const sourceBody = lines.slice(0, firstChoiceLine).join("\n").trim();
  if (sourceBody.length < 80 || markerCount(sourceBody, answerStart, answerEnd) < 2) return null;

  const choicesByNumber = new Map<number, WorksheetChoice[]>();
  for (const { parsed } of relevant) {
    if (parsed?.number !== undefined) choicesByNumber.set(parsed.number, parsed.choices);
  }
  return { sourceBody, choicesByNumber };
}

export function worksheetQuestionPrompts(body: string, answerStart: number, answerEnd: number) {
  const prompts = new Map<number, string>();
  const valid = new Set(Array.from(
    { length: answerEnd - answerStart + 1 },
    (_, index) => answerStart + index,
  ));
  let active: number[] = [];

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim().replace(/[\t ]{2,}/g, " ");
    if (!line) continue;
    const numbers = [...line.matchAll(/(?:^|\s)(?:\((\d+)\)|(\d+)[.)])/g)]
      .map((match) => Number(match[1] || match[2]))
      .filter((number) => valid.has(number));
    if (numbers.length) active = [...new Set(numbers)];
    if (!active.length) continue;
    active.forEach((number) => {
      const previous = prompts.get(number);
      prompts.set(number, previous ? `${previous}\n${line}` : line);
    });
  }
  return prompts;
}

export function authoredChoicesForQuestion(
  body: string,
  answerStart: number,
  answerEnd: number,
  number: number,
) {
  const shared = parseSharedPassageChoices(body, answerStart, answerEnd);
  if (shared?.choicesByNumber.has(number)) return shared.choicesByNumber.get(number) ?? [];
  const prompt = worksheetQuestionPrompts(body, answerStart, answerEnd).get(number) ?? "";
  return parseChoices(prompt)?.choices ?? [];
}

export function isAuthoredLabeledChoice(answer: string, choices: WorksheetChoice[]) {
  return /^[A-D]$/.test(answer) && choices.some((choice) => choice.label === answer);
}

export function extractQuestionContext(body: string, number: number) {
  const flat = normalizeWorksheetBody(body).replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
  const marker = new RegExp(`(?:\\(|\\b)${number}[.)]\\s*_{2,}`);
  const found = marker.exec(flat);
  if (!found) return "";

  const markerIndex = found.index;
  const previousStops = [flat.lastIndexOf(". ", markerIndex), flat.lastIndexOf("? ", markerIndex), flat.lastIndexOf("! ", markerIndex)];
  const previousStop = Math.max(...previousStops);
  const start = previousStop >= 0 ? previousStop + 2 : Math.max(0, markerIndex - 120);
  const afterMarker = markerIndex + found[0].length;
  const nextStops = [flat.indexOf(". ", afterMarker), flat.indexOf("? ", afterMarker), flat.indexOf("! ", afterMarker)]
    .filter((value) => value >= 0);
  const end = nextStops.length ? Math.min(...nextStops) + 1 : Math.min(flat.length, markerIndex + 220);
  return flat.slice(start, end).trim();
}
