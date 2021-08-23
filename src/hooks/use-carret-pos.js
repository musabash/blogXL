export default function useCarretPos(ref) {
  let caretOffset = 0
  if (typeof window.getSelection !== "undefined") {
    let range = window.getSelection().getRangeAt(0);
    let selected = range.toString().length;
    let preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(ref);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length - selected;
  }
  return caretOffset;
}
