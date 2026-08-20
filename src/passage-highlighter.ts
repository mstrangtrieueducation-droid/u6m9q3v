export function setupPassageHighlighter(passage: HTMLElement) {
  const source = passage.parentElement;
  if (!source || source.querySelector(".passage-highlight-guide")) return () => {};

  const guide = document.createElement("div");
  guide.className = "passage-highlight-guide";
  guide.innerHTML = "<span>Bấm vào một từ hoặc kéo chọn cụm từ để tô vàng đánh dấu.</span><button type=\"button\">Xóa tô vàng</button>";
  source.insertBefore(guide, passage);
  let suppressClickUntil = 0;

  function unwrap(mark: Element) {
    mark.replaceWith(document.createTextNode(mark.textContent ?? ""));
    passage.normalize();
  }

  function wrap(range: Range) {
    if (range.collapsed || !passage.contains(range.commonAncestorContainer)) return;
    const mark = document.createElement("mark");
    mark.className = "passage-highlight";
    try {
      range.surroundContents(mark);
    } catch {
      const fragment = range.extractContents();
      mark.append(fragment);
      range.insertNode(mark);
    }
    window.getSelection()?.removeAllRanges();
  }

  function selectRange() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      wrap(selection.getRangeAt(0));
      suppressClickUntil = Date.now() + 400;
    }
  }

  function clickWord(event: MouseEvent) {
    if (Date.now() < suppressClickUntil) return;
    const selectedMark = (event.target as HTMLElement).closest("mark.passage-highlight");
    if (selectedMark) return unwrap(selectedMark);
    if (!window.getSelection()?.isCollapsed) return;

    const documentWithCaret = document as Document & {
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
      caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    };
    let range = documentWithCaret.caretRangeFromPoint?.(event.clientX, event.clientY) ?? null;
    if (!range) {
      const position = documentWithCaret.caretPositionFromPoint?.(event.clientX, event.clientY);
      if (position) {
        range = document.createRange();
        range.setStart(position.offsetNode, position.offset);
        range.collapse(true);
      }
    }
    if (!range || range.startContainer.nodeType !== Node.TEXT_NODE) return;

    const value = range.startContainer.textContent ?? "";
    let start = range.startOffset;
    let end = range.startOffset;
    while (start > 0 && /[A-Za-z'-]/.test(value[start - 1])) start -= 1;
    while (end < value.length && /[A-Za-z'-]/.test(value[end])) end += 1;
    if (start === end) return;
    range.setStart(range.startContainer, start);
    range.setEnd(range.startContainer, end);
    wrap(range);
  }

  function clear() {
    passage.querySelectorAll("mark.passage-highlight").forEach(unwrap);
  }

  passage.addEventListener("mouseup", selectRange);
  passage.addEventListener("touchend", selectRange);
  passage.addEventListener("click", clickWord);
  guide.querySelector("button")?.addEventListener("click", clear);
  return () => {
    passage.removeEventListener("mouseup", selectRange);
    passage.removeEventListener("touchend", selectRange);
    passage.removeEventListener("click", clickWord);
    guide.remove();
  };
}
