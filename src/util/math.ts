export function percentDifference(a: number, b: number) {
  return ((a - b) / ((a + b) / 2)) * 100;
}

export function percentOf(percent: number, of: number) {
  return (percent / 100) * of;
}
