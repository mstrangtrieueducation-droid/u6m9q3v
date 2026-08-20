"use client";

import { useEffect, useState } from "react";
import { lessons, type LessonData } from "./lesson-data";
import QuizPage from "./quiz";
import WorksheetQuiz from "./worksheet-quiz";
import { worksheetTests } from "./worksheet-data";
import { extraWorksheetTests } from "./worksheet-extra-data";
import { theoryAssets } from "./theory-assets";
import { assetUrl } from "./result-submission";

type View = "core" | "contrast" | "mistakes";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function useLesson(): LessonData {
  const [lesson, setLesson] = useState(lessons["01"]);
  useEffect(() => {
    const parentPathToLesson: Record<string, string> = {
      "g3v8n1k5q2": "03", "p5m2r8x4c7": "05", "t7k3v9n2q6": "07",
      "h9r4m7x2k5": "09", "c1v8q4n7m3": "11", "b3n7x1q8v5": "13",
      "d5k9m2r7c4": "15", "f7v3q6n1x8": "17", "j9m4c7v2q5": "19",
      "l1x8n3k6r4": "21", "n3q7v5m1c8": "23", "q5k2r8x4v7": "25",
      "s7v1m9c3n6": "27", "u9n4q2k7x5": "29", "w1c6v3m8q4": "31",
      "y3r7n5k2v9": "33", "a5x9q1m6c3": "35", "e7m2v8q5n1": "37",
      "g9q4c6x1r7": "39", "i1v7n3m9k5": "41", "k3x8r2v6q9": "43",
      "m5n1c7k4v8": "45",
    };
    const explicit = new URLSearchParams(window.location.search).get("lesson");
    const referrer = document.referrer;
    const matchedPath = Object.keys(parentPathToLesson).find((path) => referrer.includes(`/${path}`));
    const value = explicit ?? (matchedPath ? parentPathToLesson[matchedPath] : "01");
    setLesson(lessons[value] ?? lessons["01"]);
  }, []);
  return lesson;
}

export default function Home() {
  const lesson = useLesson();
  const [view, setView] = useState<View>("core");
  const [isQuiz, setIsQuiz] = useState(false);
  const [testUnit, setTestUnit] = useState("");

  useEffect(() => setView("core"), [lesson.session]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathTestUnit = window.location.pathname.includes("grammar-u03-test-live") ? "03" : "";
    setIsQuiz(params.get("lesson") === "02");
    setTestUnit((params.get("test") ?? pathTestUnit).padStart(2, "0"));
  }, []);

  const worksheetTest = worksheetTests[testUnit] ?? extraWorksheetTests[testUnit];
  if (testUnit && worksheetTest) return <WorksheetQuiz test={worksheetTest} />;
  if (isQuiz) return <QuizPage />;

  const asset = theoryAssets[lesson.unit] ?? theoryAssets["01"];
  const documentPreviewUrl = `https://docs.google.com/document/d/${asset.docId}/preview`;
  const documentOpenUrl = `https://docs.google.com/document/d/${asset.docId}/edit?usp=sharing`;

  return (
    <main className="theory-course">
      <header className="topbar">
        <div className="brand">
          <img src={assetUrl("ms-trang-trieu-education-logo.png")} alt="Ms. Trang Trieu Education" />
          <span>MS. TRANG TRIEU EDUCATION</span>
        </div>
        <span className="unit-code">GRAMMAR FOUNDATION · UNIT {lesson.unit}</span>
      </header>

      <section className="course-intro">
        <div>
          <p className="course-kicker">GRAMMAR FOUNDATION · BUỔI {lesson.session}</p>
          <h1>Unit {lesson.unit}: {lesson.title}</h1>
          <p>{lesson.titleVi}</p>
        </div>
        <div className="course-route" aria-label="Lộ trình hoàn thành bài học">
          <a href="#lecture"><span>01</span><strong>Chép bài giảng gốc</strong></a>
          <a href="#guidance"><span>02</span><strong>Học phần bổ trợ</strong></a>
          <a href="#submission"><span>03</span><strong>Nộp bài chép vở</strong></a>
        </div>
      </section>

      <section className="course-section lecture-section" id="lecture">
        <div className="course-section-heading">
          <span>01</span>
          <div>
            <p className="eyebrow">BÀI GIẢNG GỐC</p>
            <h2>Chép bài giảng vào vở</h2>
            <p>Em chép đầy đủ nội dung theo đúng thứ tự, trình bày sạch sẽ và kiểm tra lại trước khi nộp.</p>
          </div>
        </div>
        <div className="lecture-requirements">
          <p><strong>Đầy đủ</strong><span>Không bỏ sót tiêu đề, công thức, ví dụ và phần ghi chú.</span></p>
          <p><strong>Đúng thứ tự</strong><span>Giữ nguyên trình tự của bài giảng để dễ ôn tập.</span></p>
          <p><strong>Sáng rõ</strong><span>Viết ngay ngắn; bản scan phải rõ và dễ đọc.</span></p>
        </div>
        <div className="document-embed">
          <iframe
            src={documentPreviewUrl}
            title={`Bài giảng gốc Grammar Foundation Unit ${lesson.unit}`}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <a className="source-open" href={documentOpenUrl} target="_blank" rel="noreferrer">
          MỞ BÀI GIẢNG TOÀN MÀN <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="guidance-heading" id="guidance">
        <span>02</span>
        <div>
          <p className="eyebrow">HƯỚNG DẪN BỔ TRỢ</p>
          <h2>Hiểu logic và phân biệt cách dùng</h2>
          <p>Phần này bổ trợ cho bài giảng gốc, giúp em hiểu bản chất cấu trúc trước khi làm bài.</p>
        </div>
      </section>

      <section className="hero">
        <div className="hero-copy">
          <p className="hero-kicker">BUỔI {lesson.session} · HƯỚNG DẪN BỔ TRỢ</p>
          <h2>{lesson.title}<em>{lesson.titleVi}</em></h2>
          <p className="hero-lead">{lesson.overview}</p>
          <div className="decision-box">
            <span>CÂU HỎI TRUNG TÂM</span>
            <strong>{lesson.question}</strong>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="lesson-core"><small>UNIT</small><strong>{lesson.unit}</strong></div>
          {lesson.points.map((point, index) => (
            <span className={`concept concept-${index + 1}`} key={point.label}>{String(index + 1).padStart(2, "0")} · {point.label}</span>
          ))}
        </div>
      </section>

      <section className="learning-path" aria-label="Lộ trình học">
        <div><span>01</span><p><strong>Nắm logic</strong>Đọc câu hỏi trung tâm trước khi nhìn công thức.</p></div>
        <div><span>02</span><p><strong>So sánh nghĩa</strong>Đặt hai cấu trúc cạnh nhau để thấy điểm khác.</p></div>
      </section>

      <section className="lesson-shell">
        <nav className="lesson-tabs" aria-label="Các phần hướng dẫn">
          <button className={view === "core" ? "active" : ""} onClick={() => setView("core")}><span>01</span>KIẾN THỨC CỐT LÕI</button>
          <button className={view === "contrast" ? "active" : ""} onClick={() => setView("contrast")}><span>02</span>PHÂN BIỆT CÁCH DÙNG</button>
          <button className={view === "mistakes" ? "active" : ""} onClick={() => setView("mistakes")}><span>03</span>LỖI DỄ MẮC</button>
        </nav>

        {view === "core" && (
          <section className="lesson-panel">
            <div className="section-intro">
              <span className="section-index">01</span>
              <div><p className="eyebrow">Grammar map</p><h2>Bản đồ kiến thức</h2><p>Mỗi thẻ trả lời ba câu hỏi: <strong>cấu trúc là gì, dùng khi nào và vì sao ví dụ đó đúng.</strong></p></div>
            </div>
            <div className="point-grid">
              {lesson.points.map((point, index) => (
                <article className="point-card" key={point.label}>
                  <div className="point-heading"><span>{String(index + 1).padStart(2, "0")}</span><h3>{point.label}</h3></div>
                  <div className="formula">{point.rule}</div>
                  <div className="example-box">
                    <div><small>VÍ DỤ TRỌNG TÂM</small><strong>{point.example}</strong></div>
                    <button onClick={() => speak(point.example)} aria-label={`Nghe ${point.example}`}>▶</button>
                  </div>
                  <div className="why-box"><span>VÌ SAO?</span><p>{point.explanation}</p></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "contrast" && (
          <section className="lesson-panel">
            <div className="section-intro">
              <span className="section-index">02</span>
              <div><p className="eyebrow">Contrast lab</p><h2>Đổi cấu trúc, đổi nghĩa</h2><p>Đừng chỉ hỏi câu nào đúng. Hãy nhìn xem <strong>người viết đã đổi trọng tâm nghĩa như thế nào.</strong></p></div>
            </div>
            <div className="contrast-list">
              {lesson.contrasts.map((item, index) => (
                <article key={item.left}>
                  <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="sentence"><small>CÁCH 1</small><strong>{item.left}</strong><button onClick={() => speak(item.left)}>▶ Nghe</button></div>
                  <div className="switch">↔</div>
                  <div className="sentence"><small>CÁCH 2</small><strong>{item.right}</strong><button onClick={() => speak(item.right)}>▶ Nghe</button></div>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "mistakes" && (
          <section className="lesson-panel">
            <div className="section-intro">
              <span className="section-index">03</span>
              <div><p className="eyebrow">Error clinic</p><h2>Sửa từ gốc</h2><p>Mỗi lỗi đều được sửa kèm nguyên nhân để học sinh <strong>không lặp lại cùng một kiểu sai.</strong></p></div>
            </div>
            <div className="mistake-grid">
              {lesson.mistakes.map((item, index) => (
                <article key={item.wrong}>
                  <span className="error-tag">LỖI {String(index + 1).padStart(2, "0")}</span>
                  <p className="wrong">✕ {item.wrong}</p>
                  <strong className="right">✓ {item.right}</strong>
                  <div className="reason"><span>GIẢI THÍCH</span>{item.why}</div>
                </article>
              ))}
            </div>
          </section>
        )}

      </section>

      <section className="submission-section" id="submission">
        <div className="course-section-heading">
          <span>03</span>
          <div>
            <p className="eyebrow">NỘP BÀI CHÉP VỞ</p>
            <h2>Hoàn thiện và nộp bài</h2>
            <p>Scan đầy đủ các trang vở chép theo đúng thứ tự, bảo đảm bản scan sáng rõ, ngay ngắn và dễ đọc. Sau đó gộp toàn bộ thành 01 file PDF duy nhất để upload.</p>
          </div>
        </div>
        <a className="submission-button" href={asset.formUrl} target="_blank" rel="noreferrer">
          NỘP BÀI <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <div><strong>MS. TRANG TRIEU EDUCATION</strong><span>Grammar Foundation · Buổi {lesson.session} · Unit {lesson.unit}</span></div>
        <p>Học liệu bổ trợ được biên soạn theo bài giảng gốc của cô Trang.</p>
      </footer>
    </main>
  );
}
