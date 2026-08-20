"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ACTIVITY_NAME,
  ASSIGNMENT_CODE,
  FIGHTER_CLASSES,
  LESSON_NAME,
} from "./quiz-config";
import { exercises, quizQuestions, type QuizQuestion } from "./quiz-data";
import { contextualGrammarExplanation } from "./explanation-style";
import { setupPassageHighlighter } from "./passage-highlighter";
import { answersMatch } from "./answer-matching";
import { assetUrl, localAttemptToken, submitResult } from "./result-submission";

type AnswerMap = Record<number, string>;

type SavedAttempt = {
  answers: AnswerMap;
  name: string;
  studentClass: string;
  token: string;
  score?: number;
  completedAt?: string;
};

const ATTEMPT_KEY = "gf1-unit1-attempt-v2";

function optionsFor(question: QuizQuestion) {
  const values = [question.answer, ...question.distractors];
  const shift = question.number % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
}

export default function QuizPage({ teacherMode = false }: { teacherMode?: boolean }) {
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
    if (teacherMode) {
      setName("Cô Trang");
      setStudentClass("Xem đáp án");
      setAnswers(Object.fromEntries(quizQuestions.map((question) => [question.number, question.answer])));
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
    const raw = window.localStorage.getItem(ATTEMPT_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as SavedAttempt;
      setName(saved.name);
      setStudentClass(saved.studentClass);
      setAnswers(saved.answers);
      setAttemptToken(saved.token);
      setAttemptStarted(true);
      if (saved.completedAt) {
        setGraded(true);
      }
    } catch {
      window.localStorage.removeItem(ATTEMPT_KEY);
    }
  }, [teacherMode]);

  useEffect(() => {
    if (isPreview || !attemptStarted || !attemptToken || graded) return;
    const saved: SavedAttempt = {
      answers,
      name: name.trim(),
      studentClass,
      token: attemptToken,
    };
    window.localStorage.setItem(ATTEMPT_KEY, JSON.stringify(saved));
  }, [answers, attemptStarted, attemptToken, graded, isPreview, name, studentClass]);

  const score = useMemo(
    () => quizQuestions.reduce((total, question) => total + (answersMatch(answers[question.number] ?? "", question.answer) ? 1 : 0), 0),
    [answers],
  );
  const answered = quizQuestions.filter((question) => (answers[question.number] ?? "").trim()).length;
  const percent = Math.round((score / quizQuestions.length) * 100);
  const current = exercises[sectionIndex];

  useEffect(() => {
    if (!attemptStarted || graded || !current.passage?.length) return;
    let cleanup = () => {};
    const timer = window.setTimeout(() => {
      const passage = document.querySelector<HTMLElement>(".question-workspace.has-passage .passage-copy");
      if (passage) cleanup = setupPassageHighlighter(passage);
    });
    return () => {
      window.clearTimeout(timer);
      cleanup();
    };
  }, [attemptStarted, current.passage?.length, graded, sectionIndex]);

  function choose(questionNumber: number, answer: string) {
    if (graded) return;
    setAnswers((existing) => ({ ...existing, [questionNumber]: answer }));
    setNotice("");
  }

  function moveSection(next: number) {
    setSectionIndex(Math.max(0, Math.min(exercises.length - 1, next)));
    window.requestAnimationFrame(() => {
      document.getElementById("quiz-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function startAttempt() {
    if (!name.trim()) {
      setNotice("Em cần điền Họ và tên trước khi bắt đầu.");
      return;
    }
    if (!studentClass) {
      setNotice("Em cần chọn đúng lớp trước khi bắt đầu.");
      return;
    }

    if (isPreview) {
      setAttemptStarted(true);
      setNotice("");
      return;
    }

    setStarting(true);
    setNotice("");
    const token = localAttemptToken();
    setAttemptToken(token);
    setAttemptStarted(true);
    window.localStorage.setItem(ATTEMPT_KEY, JSON.stringify({
      answers: {},
      name: name.trim(),
      studentClass,
      token,
    } satisfies SavedAttempt));
    setStarting(false);
    window.requestAnimationFrame(() => {
      document.getElementById("quiz-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function gradeAttempt() {
    if (!name.trim() || !studentClass.trim()) {
      setNotice("Thông tin học sinh chưa đầy đủ.");
      return;
    }
    if (answered !== quizQuestions.length) {
      setNotice(`Em còn ${quizQuestions.length - answered} câu chưa trả lời. Hãy kiểm tra đủ 66 câu trước khi chấm.`);
      return;
    }
    const wrongAnswers = quizQuestions
      .filter((question) => !answersMatch(answers[question.number] ?? "", question.answer))
      .map((question) => question.number)
      .join(", ") || "Không có";
    setSubmitting(true);
    setNotice("");
    if (!isPreview) {
      try {
        await submitResult({
          name: name.trim(),
          studentClass,
          score,
          wrongAnswers,
          test: {
            assignmentCode: ASSIGNMENT_CODE,
            lessonName: LESSON_NAME,
            activityName: ACTIVITY_NAME,
            total: quizQuestions.length,
          },
        });
      } catch {
        setNotice("Kết nối tạm thời bị gián đoạn. Bài vẫn được lưu trên máy; em hãy bấm Chấm bài lại.");
        return;
      } finally {
        setSubmitting(false);
      }
    }

    setGraded(true);
    if (!isPreview) {
      const saved: SavedAttempt = {
        answers,
        name: name.trim(),
        studentClass: studentClass.trim(),
        token: attemptToken,
        score,
        completedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(ATTEMPT_KEY, JSON.stringify(saved));
    }
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartAttempt() {
    window.localStorage.removeItem(ATTEMPT_KEY);
    setAnswers({});
    setAttemptToken("");
    setSectionIndex(0);
    setGraded(false);
    setAttemptStarted(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (graded) {
    return (
      <main className="quiz-page">
        <QuizHeader />
        <section className="quiz-result-hero">
          <p className="quiz-kicker">KẾT QUẢ LẦN LÀM NÀY</p>
          <h1>{score}<span>/66</span></h1>
          <strong>{percent}%</strong>
          <p>{name} · {studentClass}</p>
          <div className="result-identifiers">
            <div><span>MÃ BÀI</span><strong>{ASSIGNMENT_CODE}</strong></div>
            <div><span>BÀI HỌC</span><strong>{LESSON_NAME}</strong></div>
            <div><span>NỘI DUNG</span><strong>{ACTIVITY_NAME}</strong></div>
          </div>
          <div className="result-submit">{isPreview ? "CHẾ ĐỘ XEM THỬ · CHƯA GHI ĐIỂM" : "✓ ĐÃ TỰ ĐỘNG GHI NHẬN KẾT QUẢ"}</div>
          <small>{isPreview ? "Kết quả xem thử không được gửi vào hệ thống." : "Kết quả đã được chuyển vào Form tổng."}</small>
          {!isPreview && <button className="retry-attempt" type="button" onClick={restartAttempt}>LÀM LẠI BÀI</button>}
        </section>

        <section className="review-shell">
          <div className="review-heading"><span>ĐÁP ÁN & GIẢI THÍCH</span><h2>Đối chiếu đáp án và hiểu rõ từng lỗi sai</h2></div>
          {exercises.map((exercise) => (
            <section className="review-section" key={exercise.title}>
              <div className="review-section-title"><h3>{exercise.title}</h3><p>{exercise.help}</p></div>
              <ExercisePassage exercise={exercise} compact />
              {exercise.questions.map((question) => {
                const selected = answers[question.number];
                const correct = answersMatch(selected ?? "", question.answer);
                return (
                  <article className={`review-card ${correct ? "is-correct" : "is-wrong"}`} key={question.number}>
                    <div className="review-number">{String(question.number).padStart(2, "0")}</div>
                    <div>
                      <h4>{question.prompt}</h4>
                      <p className="student-answer">Em trả lời: <strong>{selected}</strong></p>
                      {!correct && <p className="correct-answer">Đáp án đúng: <strong>{question.answer}</strong></p>}
                      <div className="explanation"><span>{correct ? "HIỂU VÌ SAO ĐÚNG" : "HIỂU CÂU & SỬA LỖI"}</span><p>{contextualGrammarExplanation({ prompt: question.prompt, answer: question.answer, explanation: question.explanation, topic: exercise.title })}</p></div>
                    </div>
                  </article>
                );
              })}
            </section>
          ))}
        </section>
      </main>
    );
  }

  return (
    <main className="quiz-page">
      <QuizHeader />
      {!attemptStarted && <section className="quiz-intro">
        <div>
          <p className="quiz-kicker">BUỔI 02 · BÀI TẬP UNIT 1</p>
          <h1>Present Forms<em>Làm lại bài · xem đáp án · rút kinh nghiệm</em></h1>
          <p>Em hãy hoàn thành lại đầy đủ 66 câu trong bài tập đã học. Sau khi chấm, hãy đối chiếu đáp án, đọc kỹ phần giải thích và rút kinh nghiệm từ những lỗi mình đã mắc.</p>
        </div>
        <aside>
          <strong>∞</strong><span>CÓ THỂ LUYỆN LẠI</span>
          <p>Làm đủ 66 câu, chấm bài, đọc giải thích rồi luyện lại nếu cần.</p>
        </aside>
      </section>}

      {!attemptStarted && <section className="student-strip">
        <label><span>HỌ VÀ TÊN</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ví dụ: Nguyễn Minh Anh" /></label>
        <label><span>LỚP</span><select value={studentClass} onChange={(event) => setStudentClass(event.target.value)}><option value="">Chọn lớp của em</option>{FIGHTER_CLASSES.map((className) => <option key={className} value={className}>{className}</option>)}</select></label>
        <button className="start-attempt" onClick={startAttempt} disabled={starting}>{starting ? "ĐANG XÁC NHẬN…" : "BẮT ĐẦU LÀM BÀI →"}</button>
      </section>}

      {!attemptStarted && (
        <section className="attempt-gate-note">
          <strong>Trước khi bắt đầu</strong>
          <p>Điền đúng tên và chọn đúng lớp. Mỗi lần chấm được ghi thành một kết quả riêng để em theo dõi tiến bộ.</p>
          {notice && <div className="quiz-notice" role="alert">{notice}</div>}
        </section>
      )}

      {attemptStarted && <section className="quiz-session-bar">
        <div className="quiz-session-title"><span>BUỔI 02 · UNIT 1</span><strong>Present Forms</strong></div>
        <div className="quiz-student-summary">
          <span>{name || "Chế độ xem thử"}</span>
          <span>{studentClass || "Chưa chọn lớp"}</span>
        </div>
        <div className="answer-progress"><strong>{answered}/66</strong><span>câu đã trả lời</span></div>
      </section>}

      {attemptStarted && <nav className="quiz-section-nav" aria-label="Các phần bài kiểm tra">
        {exercises.map((exercise, index) => {
          const completed = exercise.questions.every((question) => answers[question.number]);
          return <button className={sectionIndex === index ? "active" : ""} onClick={() => moveSection(index)} key={exercise.title}><span>{index + 1}</span>{completed ? "✓" : ""}</button>;
        })}
      </nav>}

      {attemptStarted && <section className="question-shell" id="quiz-workspace">
        <header className="question-instruction">
          <span>ĐỀ BÀI</span>
          <div><strong>{current.title}</strong><p>{current.help}</p></div>
        </header>
        <div className={`question-workspace${current.passage?.length ? " has-passage" : " single-panel"}`}>
          <ExercisePassage exercise={current} />
          <div className="question-list" role="region" aria-label="Các câu hỏi của phần này" tabIndex={0}>
            {current.questions.map((question) => (
              <article className="question-card" key={question.number}>
                <div className="question-number">{String(question.number).padStart(2, "0")}</div>
                <div className="question-content">
                  <h3>{question.prompt}</h3>
                  {/choose|circle/i.test(current.help) ? <div className="option-grid">
                    {optionsFor(question).map((option, optionIndex) => (
                      <button
                        className={answers[question.number] === option ? "selected" : ""}
                        onClick={() => choose(question.number, option)}
                        key={option}
                      >
                        <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                      </button>
                    ))}
                  </div> : <input className="question-text-answer" aria-label={`Câu ${question.number}`} value={answers[question.number] ?? ""} onChange={(event) => choose(question.number, event.target.value)} placeholder="Nhập đáp án" autoCapitalize="off" />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}

      {attemptStarted && notice && <div className="quiz-notice" role="alert">{notice}</div>}
      {attemptStarted && <div className="quiz-actions">
        <button onClick={() => moveSection(sectionIndex - 1)} disabled={sectionIndex === 0}>← PHẦN TRƯỚC</button>
        {sectionIndex < exercises.length - 1
          ? <button className="primary" onClick={() => moveSection(sectionIndex + 1)}>PHẦN TIẾP THEO →</button>
          : <button className="primary grade" onClick={gradeAttempt} disabled={submitting}>{submitting ? "ĐANG GHI NHẬN…" : "CHẤM BÀI & XEM GIẢI THÍCH"}</button>}
      </div>}
    </main>
  );
}

function ExercisePassage({ exercise, compact = false }: { exercise: (typeof exercises)[number]; compact?: boolean }) {
  if (!exercise.passage?.length) return null;
  return (
    <aside className={`exercise-passage${compact ? " compact" : ""}`} aria-label="Đề bài và văn bản bài điền từ">
      {exercise.passageTitle && <h3>{exercise.passageTitle}</h3>}
      <div className="passage-copy">
        {exercise.passage.map((line, index) => <p key={`${exercise.title}-${index}`}>{line}</p>)}
      </div>
    </aside>
  );
}

function QuizHeader() {
  return (
    <header className="topbar quiz-topbar">
      <div className="brand"><img src={assetUrl("ms-trang-trieu-education-logo.png")} alt="Ms. Trang Trieu Education" /><span>MS. TRANG TRIEU EDUCATION</span></div>
      <span className="unit-code">GRAMMAR FOUNDATION · UNIT 01</span>
    </header>
  );
}
