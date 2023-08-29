export interface RGBObj {
  r: number;
  g: number;
  b: number;
  a: number;
}
export function rgbStringFromObj(rgbObj: RGBObj) {
  return `rgb(${rgbObj.r} ${rgbObj.g} ${rgbObj.b} / ${rgbObj.a * 100}%)`;
}
