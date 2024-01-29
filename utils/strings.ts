export function pxToInt (px: string) {
  const intString = px.replace('px', '')
  const int = parseInt(intString)
  return int ?? null
}
