"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { answersMatch } from "./answer-matching";
import { contextualGrammarExplanation } from "./explanation-style";
import { setupPassageHighlighter } from "./passage-highlighter";
import { FIGHTER_CLASSES } from "./quiz-config";
import { assetUrl, localAttemptToken, submitResult } from "./result-submission";
import { getTestMeta } from "./test-catalog";
import type { WorksheetSection, WorksheetTest } from "./worksheet-data";
import {
  answerPlaceholder,
  extractQuestionContext,
  isAuthoredLabeledChoice,
  normalizeWorksheetBody,
  parseChoices,
  parseSharedPassageChoices,
  stripQuestionNumber,
  tokenizeWorksheetLine,
  worksheetQuestionPrompts,
  type WorksheetChoice,
} from "./worksheet-format";

type AnswerMap = Record<number, string>;
type SavedAttempt = {
  answers: AnswerMap;
  name: string;
  studentClass: string;
  token: string;
  completedAt?: string;
};

function isCorrect(actual: string, expected: string) {
  return answersMatch(actual, expected);
}

function displayAnswer(expected: string) {
  return expected.split("|").join(" / ");
}

function sectionAnswerNumbers(section: WorksheetSection) {
  return Array.from(
    { length: section.answerEnd - section.answerStart + 1 },
    (_, index) => section.answerStart + index,
  );
}

function isPassageSection(section: WorksheetSection) {
  if (parseSharedPassageChoices(section.body, section.answerStart, section.answerEnd)) return true;
  const help = section.help.toLowerCase();
  if (/read (?:the )?(?:text|letter|dialogue|paragraph)|text below|letter below|paragraph below|each space/.test(help)) {
    return true;
  }

  const numbers = sectionAnswerNumbers(section);
  const lineStartNumbers = new Set<number>();
  const embeddedNumbers = new Set<number>();
  for (const line of section.body.split(/\r?\n/)) {
    const start = line.match(/^\s*(?:\((\d+)\)|(\d+)[.)])/);
    if (start) lineStartNumbers.add(Number(start[1] || start[2]));
    for (const match of line.matchAll(/(?:^|\s)(?:\((\d+)\)|(\d+)[.)])/g)) {
      embeddedNumbers.add(Number(match[1] || match[2]));
    }
  }
  const relevantLineStarts = numbers.filter((number) => lineStartNumbers.has(number)).length;
  const relevantEmbedded = numbers.filter((number) => embeddedNumbers.has(number)).length;
  return relevantEmbedded >= 2 && relevantLineStarts / Math.max(numbers.length, 1) < 0.45;
}

type QuestionContext = { prompt: string; choices: WorksheetChoice[] };

function buildQuestionContexts(test: WorksheetTest) {
  const contexts = new Map<number, QuestionContext>();
  for (const section of test.sections) {
    const shared = parseSharedPassageChoices(section.body, section.answerStart, section.answerEnd);
    const passage = Boolean(shared) || isPassageSection(section);
    const prompts = worksheetQuestionPrompts(section.body, section.answerStart, section.answerEnd);
    for (const number of sectionAnswerNumbers(section)) {
      const parsedPrompt = parseChoices(prompts.get(number) ?? "");
      const prompt = passage
        ? extractQuestionContext(shared?.sourceBody ?? section.body, number)
        : stripQuestionNumber(parsedPrompt?.prompt || prompts.get(number) || `Câu ${number}`, number);
      contexts.set(number, {
        prompt: prompt || `Câu ${number}`,
        choices: shared?.choicesByNumber.get(number) ?? parsedPrompt?.choices ?? [],
      });
    }
  }
  return contexts;
}

function WorksheetInlineText({ text }: { text: string }) {
  const lines = normalizeWorksheetBody(text).split("\n");
  return <>{lines.map((line, lineIndex) => <Fragment key={`${lineIndex}-${line}`}>
    {tokenizeWorksheetLine(line).map((token, tokenIndex) => {
      if (token.type === "text") return <Fragment key={tokenIndex}>{token.value}</Fragment>;
      if (token.type === "given") return <span className="worksheet-given-answer" key={tokenIndex}>{token.value}</span>;
      return <span className={`worksheet-inline-blank ${token.size}`} aria-label="ô trống cần điền" key={tokenIndex} />;
    })}
    {lineIndex < lines.length - 1 && <br />}
  </Fragment>)}</>;
}

function WorksheetSourceText({ body }: { body: string }) {
  const normalized = normalizeWorksheetBody(body);
  const hasBlanks = /_{3,}/.test(normalized);
  return <div className={`worksheet-source-text${hasBlanks ? " has-fill-blanks" : ""}`}>
    {normalized.split("\n").map((line, index) => line
      ? <p key={`${index}-${line}`}><WorksheetInlineText text={line} /></p>
      : <div className="worksheet-paragraph-break" aria-hidden="true" key={`break-${index}`} />)}
  </div>;
}

function responseLabel(value: string, context: QuestionContext | undefined) {
  return value.split(" / ").map((part) => {
    const choice = context?.choices.find((item) => item.label === part.trim().toUpperCase());
    return choice ? `${choice.label}. ${choice.text}` : part;
  }).join(" / ");
}

function clearInstruction(help: string) {
  const original = help.replace(/^Ex\s*\d+\s*:\s*/i, "").trim();
  if (/fill(?:ing)? (?:in )?a,? an or the where necessary/i.test(original)) {
    return "Điền a, an hoặc the vào mỗi chỗ trống. Nếu câu không cần mạo từ, nhập Ø.";
  }
  if (/fill in the where necessary/i.test(original)) {
    return "Điền the vào chỗ trống khi cần. Nếu câu không dùng mạo từ, nhập Ø.";
  }
  if (/fill in a,? an,? or some/i.test(original)) {
    return "Điền a, an hoặc some vào mỗi chỗ trống.";
  }
  if (/underline the correct item|circle the correct item/i.test(original)) {
    return "Chọn đúng một đáp án trong các phương án được cho ở mỗi câu.";
  }
  if (/complete (?:each )?second sentence using the word given/i.test(original)) {
    return "Viết lại câu thứ hai sao cho nghĩa không đổi. Bắt buộc dùng từ được cho, không thay đổi từ đó và chỉ viết số từ được yêu cầu vào chỗ trống.";
  }
  if (/rewrite.+(?:word|words) given/i.test(original)) {
    return "Viết lại câu theo yêu cầu và giữ nguyên nghĩa. Bắt buộc dùng đúng từ được cho, không tự đổi dạng của từ đó.";
  }
  if (/complete using.+words? in the box/i.test(original)) {
    return "Dùng từ trong khung để hoàn thành từng câu. Chia hoặc biến đổi dạng từ khi đề bài yêu cầu.";
  }
  if (/fill in the gaps with the words from the list/i.test(original)) {
    return "Dùng các từ trong danh sách để điền vào chỗ trống. Biến đổi sang dạng số ít hoặc số nhiều cho phù hợp với câu.";
  }
  if (/put the verbs in brackets into the correct tense/i.test(original)) {
    return "Chia động từ trong ngoặc ở đúng thì và viết đầy đủ phần còn thiếu vào ô trả lời.";
  }
  if (/circle.+extra word/i.test(original)) {
    return "Mỗi vị trí có một từ thừa. Nhập chính xác từ thừa vào ô trả lời tương ứng.";
  }
  if (/write one word in each gap/i.test(original)) {
    return "Điền đúng một từ vào mỗi chỗ trống.";
  }
  if (/rewrite/i.test(original)) {
    return `${original} Viết đầy đủ câu mới và giữ nguyên nghĩa của câu gốc.`;
  }
  return original;
}

function requiredWord(prompt: string, help: string) {
  if (!/rewrite|word given/i.test(help)) return "";
  const lines = normalizeWorksheetBody(prompt).split("\n").map((line) => line.trim()).filter(Boolean);
  const standalone = lines.find((line) => /^[A-Za-z][A-Za-z'-]*$/.test(line));
  if (standalone) return standalone;
  const firstLine = lines[0]?.replace(/^\d+[.)]\s*/, "") ?? "";
  return firstLine.match(/[.!?][’'”"]?\s+([A-Za-z][A-Za-z'-]*)$/)?.[1] ?? "";
}

export default function WorksheetQuiz({ test, teacherMode = false }: { test: WorksheetTest; teacherMode?: boolean }) {
  const storageKey = `grammar-foundation-${test.assignmentCode}-attempt-v1`;
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [attemptStarted, setAttemptStarted] = useState(false);
  const [attemptToken, setAttemptToken] = useState("");
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [graded, setGraded] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!attemptStarted || graded) return;
    let cleanup = () => {};
    const timer = window.setTimeout(() => {
      const passage = document.querySelector<HTMLElement>(".worksheet-workspace.has-passage .worksheet-source-text");
      if (passage) cleanup = setupPassageHighlighter(passage);
    });
    return () => {
      window.clearTimeout(timer);
      cleanup();
    };
  }, [attemptStarted, graded, sectionIndex]);

  useEffect(() => {
    if (teacherMode) {
      const correctAnswers = Object.fromEntries(test.answers.map((item) => [item.number, item.answer.split("|")[0]]));
      setName("Cô Trang");
      setStudentClass("Xem đáp án");
      setAnswers(correctAnswers);
      setAttemptStarted(true);
      setGraded(true);
      setIsPreview(true);
      return;
    }
    const preview = new URLSearchParams(window.location.search).get("preview") === "1";
    setIsPreview(preview);
    if (preview) {
      setAttemptStarted(true);
      return;
    }
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as SavedAttempt;
      setName(saved.name);
      setStudentClass(saved.studentClass);
      setAnswers(saved.answers);
      setAttemptToken(saved.token);
      setAttemptStarted(true);
      if (saved.completedAt) setGraded(true);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey, teacherMode, test.answers]);

  useEffect(() => {
    if (isPreview || !attemptStarted || !attemptToken || graded) return;
    window.localStorage.setItem(storageKey, JSON.stringify({
      answers,
      name: name.trim(),
      studentClass,
      token: attemptToken,
    } satisfies SavedAttempt));
  }, [answers, attemptStarted, attemptToken, graded, isPreview, name, storageKey, studentClass]);

  const score = useMemo(
    () => test.answers.reduce((sum, item) => sum + (isCorrect(answers[item.number] ?? "", item.answer) ? 1 : 0), 0),
    [answers, test.answers],
  );
  const answered = test.answers.filter((item) => (answers[item.number] ?? "").trim()).length;
  const questionContexts = useMemo(() => buildQuestionContexts(test), [test]);
  const current = test.sections[sectionIndex];
  const currentAnswers = test.answers.filter(
    (item) => item.number >= current.answerStart && item.number <= current.answerEnd,
  );
  const sharedPassageChoices = parseSharedPassageChoices(current.body, current.answerStart, current.answerEnd);
  const passageSection = Boolean(sharedPassageChoices) || isPassageSection(current);
  const prompts = worksheetQuestionPrompts(current.body, current.answerStart, current.answerEnd);
  const integratedQuestions = !passageSection && prompts.size >= Math.ceil(currentAnswers.length * 0.6);

  function moveSection(next: number) {
    setSectionIndex(Math.max(0, Math.min(test.sections.length - 1, next)));
    window.requestAnimationFrame(() => document.getElementById("quiz-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function startAttempt() {
    if (!name.trim()) return setNotice("Em cần điền Họ và tên trước khi bắt đầu.");
    if (!studentClass) return setNotice("Em cần chọn đúng lớp trước khi bắt đầu.");
    if (isPreview) return setAttemptStarted(true);

    setStarting(true);
    setNotice("");
    const token = localAttemptToken();
    setAttemptToken(token);
    setAttemptStarted(true);
    setStarting(false);
  }

  async function gradeAttempt() {
    if (answered !== test.total) return setNotice(`Em còn ${test.total - answered} câu chưa trả lời. Hãy hoàn thành đủ ${test.total} câu trước khi chấm.`);
    const wrongAnswers = test.answers.filter((item) => !isCorrect(answers[item.number] ?? "", item.answer)).map((item) => item.number).join(", ") || "Không có";
    setSubmitting(true);
    setNotice("");
    if (!isPreview) {
      try {
        await submitResult({
          name: name.trim(),
          studentClass,
          score,
          wrongAnswers,
          test: getTestMeta(test.assignmentCode) ?? {
            assignmentCode: test.assignmentCode,
            lessonName: `Grammar Foundation – Unit ${test.sourceUnit}`,
            activityName: `${test.title} – Bài kiểm tra`,
            total: test.total,
          },
        });
      } catch {
        return setNotice("Kết nối tạm thời bị gián đoạn. Bài vẫn được lưu trên máy; em hãy bấm Chấm bài lại.");
      } finally {
        setSubmitting(false);
      }
    }
    setGraded(true);
    if (!isPreview) {
      window.localStorage.setItem(storageKey, JSON.stringify({ answers, name, studentClass, token: attemptToken, completedAt: new Date().toISOString() } satisfies SavedAttempt));
    }
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartAttempt() {
    window.localStorage.removeItem(storageKey);
    setAnswers({});
    setAttemptToken("");
    setSectionIndex(0);
    setGraded(false);
    setAttemptStarted(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (graded) {
    const percent = Math.round((score / test.total) * 100);
    return <main className="quiz-page worksheet-quiz-page">
      <WorksheetHeader test={test} />
      <section className="quiz-result-hero">
        <p className="quiz-kicker">KẾT QUẢ LẦN LÀM NÀY</p>
        <h1>{score}<span>/{test.total}</span></h1><strong>{percent}%</strong>
        <p>{name} · {studentClass}</p>
        <div className="result-identifiers"><div><span>MÃ BÀI</span><strong>{test.assignmentCode}</strong></div><div><span>BÀI HỌC</span><strong>Grammar Foundation · Unit {test.sourceUnit}</strong></div><div><span>NỘI DUNG</span><strong>{test.title}</strong></div></div>
        <div className="result-submit">{isPreview ? "CHẾ ĐỘ XEM THỬ · CHƯA GHI ĐIỂM" : "✓ ĐÃ TỰ ĐỘNG GHI NHẬN KẾT QUẢ"}</div>
        <small>{isPreview ? "Kết quả xem thử không được gửi vào hệ thống." : "Kết quả đã được chuyển vào Form tổng."}</small>
        {!isPreview && <button className="retry-attempt" type="button" onClick={restartAttempt}>LÀM LẠI BÀI</button>}
      </section>
      <section className="review-shell"><div className="review-heading"><span>ĐÁP ÁN & GIẢI THÍCH</span><h2>Đối chiếu đáp án và rút kinh nghiệm từ từng lỗi</h2></div>
        {test.answers.map((item) => {
          const correct = isCorrect(answers[item.number] ?? "", item.answer);
          const context = questionContexts.get(item.number);
          const section = test.sections.find((candidate) => item.number >= candidate.answerStart && item.number <= candidate.answerEnd);
          const explanation = contextualGrammarExplanation({
            answer: item.answer,
            answerText: context?.choices.find((choice) => choice.label === item.answer.toUpperCase())?.text,
            explanation: item.explanation,
            number: item.number,
            prompt: context?.prompt,
            source: section?.body,
            topic: test.titleVi,
          });
          return <article className={`review-card ${correct ? "is-correct" : "is-wrong"}`} key={item.number}><div className="review-number">{String(item.number).padStart(2, "0")}</div><div><h4><WorksheetInlineText text={context?.prompt ?? `Câu ${item.number}`} /></h4>{Boolean(context?.choices.length) && <div className="review-choice-list">{context?.choices.map((choice) => <span className={(answers[item.number] ?? "").toUpperCase() === choice.label ? "student-choice" : ""} key={choice.label}><b>{choice.label}</b>{choice.text}</span>)}</div>}<p className="student-answer">Em trả lời: <strong>{responseLabel(answers[item.number], context)}</strong></p>{!correct && <p className="correct-answer">Đáp án đúng: <strong>{responseLabel(displayAnswer(item.answer), context)}</strong></p>}<div className="explanation"><span>{correct ? "HIỂU VÌ SAO ĐÚNG" : "HIỂU CÂU & SỬA LỖI"}</span><p>{explanation}</p></div></div></article>;
        })}
      </section>
    </main>;
  }

  return <main className="quiz-page worksheet-quiz-page">
    <WorksheetHeader test={test} />
    {!attemptStarted && <section className="quiz-intro"><div><p className="quiz-kicker">GRAMMAR FOUNDATION · UNIT {test.sourceUnit}</p><h1>{test.title}<em>{test.titleVi}</em></h1><p>Làm lại đúng bài tập gốc, kiểm tra đáp án và đọc phần giải thích sau khi chấm để rút kinh nghiệm từ lỗi đã mắc.</p></div><aside><strong>∞</strong><span>CÓ THỂ LUYỆN LẠI</span><p>Hoàn thành đủ {test.total} câu, chấm bài, đọc giải thích rồi làm lại nếu cần.</p></aside></section>}
    {!attemptStarted && <section className="student-strip"><label><span>HỌ VÀ TÊN</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ví dụ: Nguyễn Minh Anh" /></label><label><span>LỚP</span><select value={studentClass} onChange={(event) => setStudentClass(event.target.value)}><option value="">Chọn lớp của em</option>{FIGHTER_CLASSES.map((value) => <option key={value}>{value}</option>)}</select></label><button className="start-attempt" onClick={startAttempt} disabled={starting}>{starting ? "ĐANG XÁC NHẬN…" : "BẮT ĐẦU LÀM BÀI →"}</button></section>}
    {!attemptStarted && <section className="attempt-gate-note"><strong>Trước khi bắt đầu</strong><p>Điền đúng tên và chọn đúng lớp. Mỗi lần chấm được ghi thành một kết quả riêng để em theo dõi tiến bộ.</p>{notice && <div className="quiz-notice">{notice}</div>}</section>}
    {attemptStarted && <><section className="quiz-session-bar"><div className="quiz-session-title"><span>UNIT {test.sourceUnit}</span><strong>{test.title}</strong></div><div className="quiz-student-summary"><span>{name || "Chế độ xem thử"}</span><span>{studentClass || "Chưa chọn lớp"}</span></div><div className="answer-progress"><strong>{answered}/{test.total}</strong><span>câu đã trả lời</span></div></section>
      <nav className="quiz-section-nav">{test.sections.map((section, index) => <button className={sectionIndex === index ? "active" : ""} onClick={() => moveSection(index)} key={section.title}><span>{index + 1}</span>{section.answerEnd - section.answerStart + 1 > 0 && Array.from({ length: section.answerEnd - section.answerStart + 1 }, (_, offset) => answers[section.answerStart + offset]).every(Boolean) ? "✓" : ""}</button>)}</nav>
      <section className="question-shell worksheet-shell" id="quiz-workspace"><header className="question-instruction"><span>ĐỀ BÀI</span><div><strong>{current.title}</strong><p>{clearInstruction(current.help)}</p></div></header><div className={`question-workspace worksheet-workspace ${passageSection ? "has-passage" : "single-panel"}`}>{passageSection && <aside className="exercise-passage worksheet-source"><WorksheetSourceText body={sharedPassageChoices?.sourceBody ?? current.body} /></aside>}{!passageSection && !integratedQuestions && <div className="worksheet-single-source"><WorksheetSourceText body={current.body} /></div>}<div className="question-list worksheet-answer-list">{currentAnswers.map((item) => {
        const context = questionContexts.get(item.number);
        const choices = context?.choices ?? [];
        const isMultipleChoice = isAuthoredLabeledChoice(item.answer, choices);
        const word = requiredWord(context?.prompt ?? "", current.help);
        return <article className="worksheet-answer" key={item.number}><span>{String(item.number).padStart(2, "0")}</span><div><strong>{passageSection ? `Ô số ${item.number}` : <WorksheetInlineText text={context?.prompt ?? (integratedQuestions ? prompts.get(item.number) ?? "" : `Câu ${item.number}`)} />}</strong>{word && <div className="required-word"><span>TỪ BẮT BUỘC</span><b>{word}</b></div>}{isMultipleChoice ? <div className="worksheet-choice-grid" role="radiogroup" aria-label={`Câu ${item.number}`}>{choices.map((choice) => <button type="button" role="radio" aria-checked={(answers[item.number] ?? "").toUpperCase() === choice.label} className={(answers[item.number] ?? "").toUpperCase() === choice.label ? "selected" : ""} onClick={() => { setAnswers((old) => ({ ...old, [item.number]: choice.label })); setNotice(""); }} key={choice.label}><span>{choice.label}</span>{choice.text && <b>{choice.text}</b>}</button>)}</div> : <input aria-label={`Câu ${item.number}`} value={answers[item.number] ?? ""} onChange={(event) => { setAnswers((old) => ({ ...old, [item.number]: event.target.value })); setNotice(""); }} placeholder={answerPlaceholder(current.help)} autoCapitalize="off" spellCheck={false} />}</div></article>;
      })}</div></div></section>
      {notice && <div className="quiz-notice">{notice}</div>}<div className="quiz-actions"><button onClick={() => moveSection(sectionIndex - 1)} disabled={sectionIndex === 0}>← PHẦN TRƯỚC</button>{sectionIndex < test.sections.length - 1 ? <button className="primary" onClick={() => moveSection(sectionIndex + 1)}>PHẦN TIẾP THEO →</button> : <button className="primary grade" onClick={gradeAttempt} disabled={submitting}>{submitting ? "ĐANG GHI NHẬN…" : "CHẤM BÀI & XEM GIẢI THÍCH"}</button>}</div></>}
  </main>;
}

function WorksheetHeader({ test }: { test: WorksheetTest }) {
  return <header className="topbar quiz-topbar"><div className="brand"><img src={assetUrl("ms-trang-trieu-education-logo.png")} alt="Ms. Trang Trieu Education" /><span>MS. TRANG TRIEU EDUCATION</span></div><span className="unit-code">GRAMMAR FOUNDATION · UNIT {test.sourceUnit}</span></header>;
}
