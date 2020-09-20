export function toDecimalPrecision(num: number, precision: number): number {
  const numstr = num.toString();
  const dotindex = numstr.indexOf(".");
  const finalindex = dotindex + precision;

  if (numstr.length > finalindex + 1) {
    const cutstr = numstr.substring(0, finalindex + 1);
    return parseFloat(cutstr);
  } else return num;
}
