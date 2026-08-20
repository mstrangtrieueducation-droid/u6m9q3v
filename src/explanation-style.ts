type ContextualExplanationInput = {
  answer: string;
  answerText?: string;
  explanation: string;
  number?: number;
  prompt?: string;
  source?: string;
  topic?: string;
};

const genericExplanation = /^(?:Đáp án mẫu:|Đáp án\s+[A-D]\.|Câu gốc đúng\.|Dùng\s+.+?(?:để|cho)\s+.+?\.|Chú ý dùng đúng cấu trúc)/i;
const ruleFirstExplanation = /^(?:Sau\s+(?:when|before|after|as soon as|by the time|until|while|if)\b|Cấu trúc\b|Chủ ngữ\b|Động từ\b)/i;
const futureTimeConnectors = ["as soon as", "by the time", "before", "after", "when", "until", "while", "if"] as const;

function tidy(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function replaceBlank(value: string, answer: string) {
  const visibleAnswer = answer.split("|")[0].trim();
  return value
    .replace(/\b\d+\)\s*_{2,}/, visibleAnswer)
    .replace(/_{2,}/, visibleAnswer)
    .replace(/\s+([,.;!?])/g, "$1");
}

function sourceSentence(source: string, number: number | undefined, answer: string) {
  if (!source || !number) return "";
  const marker = new RegExp(`(?:^|\\s)${number}\\)\\s*_+`, "m");
  const match = marker.exec(source);
  if (!match) return "";
  const index = match.index;
  const left = Math.max(
    source.lastIndexOf(".", index - 1),
    source.lastIndexOf("?", index - 1),
    source.lastIndexOf("!", index - 1),
    source.lastIndexOf("\n", index - 1),
  );
  const candidates = [source.indexOf(".", index), source.indexOf("?", index), source.indexOf("!", index), source.indexOf("\n", index)]
    .filter((position) => position >= 0);
  const right = candidates.length ? Math.min(...candidates) + 1 : Math.min(source.length, index + 220);
  return tidy(replaceBlank(source.slice(left + 1, right), answer));
}

function visibleAnswer(input: ContextualExplanationInput) {
  return tidy(input.answerText || input.answer).split("|")[0].trim();
}

function contextText(input: ContextualExplanationInput) {
  const answer = visibleAnswer(input);
  if (input.prompt) return tidy(replaceBlank(input.prompt, answer));
  return sourceSentence(input.source ?? "", input.number, answer);
}

function numberedBlank(value: string, number: number | undefined) {
  if (!number) return null;
  const exact = new RegExp(`\\b${number}\\)\\s*_{2,}`);
  const match = exact.exec(value);
  if (match) return { index: match.index, pattern: new RegExp(`\\b${number}\\)\\s*_{2,}(?:\\s*\\([^)]*\\))?`) };

  const blanks = [...value.matchAll(/_{2,}/g)];
  if (blanks.length !== 1 || blanks[0].index === undefined) return null;
  return { index: blanks[0].index, pattern: /_{2,}(?:\\s*\\([^)]*\\))?/ };
}

function connectorBeforeBlank(value: string, blankIndex: number) {
  const before = value.slice(0, blankIndex);
  const boundary = Math.max(...[",", ";", ".", "?", "!", ":", "\n"].map((mark) => before.lastIndexOf(mark)));
  const clauseStart = boundary + 1;
  const clausePrefix = before.slice(clauseStart).toLowerCase();
  let selected: { connector: (typeof futureTimeConnectors)[number]; index: number } | null = null;

  for (const connector of futureTimeConnectors) {
    const matches = [...clausePrefix.matchAll(new RegExp(`\\b${connector.replace(/ /g, "\\s+")}\\b`, "g"))];
    const index = matches.at(-1)?.index;
    if (index !== undefined && (!selected || index > selected.index)) selected = { connector, index };
  }

  return selected ? { connector: selected.connector, index: clauseStart + selected.index } : null;
}

function sharedFutureClauseExplanation(input: ContextualExplanationInput) {
  const topic = (input.topic || "").toLowerCase();
  if (!topic.includes("future") && !topic.includes("tương lai")) return "";

  const prompt = input.prompt || "";
  const blank = numberedBlank(prompt, input.number);
  if (!blank || /\bwill\b/i.test(visibleAnswer(input))) return "";

  const match = connectorBeforeBlank(prompt, blank.index);
  if (!match) return "";

  const subjectText = tidy(prompt.slice(match.index + match.connector.length, blank.index));
  if (!subjectText) return "";

  const completedTail = prompt.slice(match.index).replace(blank.pattern, visibleAnswer(input));
  const clause = tidy(completedTail.split(/[,.;!?]/, 1)[0].split(/\s+(?:and\s+then|then)\b/i, 1)[0]);
  if (!clause || /_{2,}|\b\d+\)/.test(clause)) return "";

  if (match.connector === "if") {
    return `Theo quy tắc chung, trong mệnh đề điều kiện bắt đầu bằng if, không dùng will. Ta dùng Hiện tại đơn: ${clause}.`;
  }

  return `Theo quy tắc chung, trong mệnh đề thời gian nói về tương lai bắt đầu bằng ${match.connector}, không dùng will. Ta dùng Hiện tại đơn: ${clause}.`;
}

function topicFocus(topic = "") {
  const value = topic.toLowerCase();
  if (value.includes("quá khứ") || value.includes("past")) return "việc nào đang làm nền, việc nào xảy ra xen vào và việc nào đã xảy ra trước";
  if (value.includes("tương lai") || value.includes("future")) return "thứ tự trước - sau của các việc trong tương lai";
  if (value.includes("modal")) return "thái độ của người nói: khả năng, lời khuyên, sự bắt buộc hay suy đoán";
  if (value.includes("passive") || value.includes("bị động")) return "người hoặc vật nhận tác động, thay vì chỉ nhìn hình thức của động từ";
  if (value.includes("condition") || value.includes("điều kiện")) return "điều kiện có thật hay giả định và thời điểm của kết quả";
  if (value.includes("reported") || value.includes("tường thuật")) return "lời nói gốc được kể lại từ góc nhìn và thời điểm mới";
  if (value.includes("article") || value.includes("mạo từ")) return "danh từ đang nói chung, nói lần đầu hay chỉ một đối tượng đã xác định";
  if (value.includes("comparison") || value.includes("so sánh")) return "mức độ chênh lệch và đối tượng đang được so sánh";
  if (value.includes("participle") || value.includes("phân từ")) return "chủ thể gây ra cảm giác hay là người nhận cảm giác/tác động";
  if (value.includes("question") || value.includes("câu hỏi")) return "thông tin người nói thực sự muốn hỏi";
  if (value.includes("inversion") || value.includes("đảo ngữ")) return "ý được nhấn mạnh và trật tự tự nhiên của câu sau khi đảo";
  return "ý người nói muốn diễn đạt và mối quan hệ giữa các phần của câu";
}

export function contextualGrammarExplanation(input: ContextualExplanationInput) {
  const original = tidy(input.explanation);
  const context = contextText(input);
  const answer = visibleAnswer(input);
  const sharedRule = sharedFutureClauseExplanation(input);

  if (sharedRule) return sharedRule;

  if (ruleFirstExplanation.test(original) && context) {
    return `Đọc trọn câu “${context}”. Đáp án “${answer}” phù hợp với ý nghĩa và cấu trúc của câu. ${original}`;
  }

  if (genericExplanation.test(original)) {
    const opening = context
      ? `Đọc trọn ý “${context}”.`
      : `Đặt “${answer}” vào câu rồi đọc lại cả ý.`;
    return `${opening} Ở đây cần nhìn ${topicFocus(input.topic)}; vì vậy “${answer}” là cách diễn đạt phù hợp, không phải một đáp án được chọn chỉ vì từ khóa.`;
  }

  return original;
}
