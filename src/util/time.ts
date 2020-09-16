export default class Time {
  static weeks(n: number) {
    return this.days(7) * n;
  }

  static days(n: number) {
    return this.hours(24) * n;
  }

  static hours(n: number) {
    return this.minutes(60) * n;
  }

  static minutes(n: number) {
    return this.seconds(60) * n;
  }

  static seconds(n: number) {
    return this.milliseconds(n) * 1000;
  }

  static milliseconds(n: number) {
    return n;
  }
}
