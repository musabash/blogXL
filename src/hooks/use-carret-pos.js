export default function useCarretPos() {
  const pos = window.getSelection().getRangeAt(0).startOffset
  // inputReff.current.focus()
  // inputReff.current.setSelectionRange(pos, pos)
  return {pos}
}
