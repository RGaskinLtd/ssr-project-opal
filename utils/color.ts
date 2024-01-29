export interface RGBObj {
  r: number;
  g: number;
  b: number;
  a: number;
}
export interface ColorPicker {
  label: string;
  value: string;
}
export function rgbStringFromObj (rgbObj: RGBObj) {
  if (!rgbObj) { return }
  const { r, g, b } = rgbObj
  if (!r || !g || !b) { return }
  const a = rgbObj.a ?? 1

  return `rgb(${rgbObj.r} ${rgbObj.g} ${rgbObj.b} / ${a * 100}%)`
}
