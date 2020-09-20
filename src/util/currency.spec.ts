import { toDecimalPrecision } from "./currency";

describe("Currency", () => {
  it("Should return specified decimal precision", () => {
    let num = 0.1234567891;
    let res = toDecimalPrecision(num, 8);
    expect(res).toBe(0.12345678);

    num = 123.1234567891;
    res = toDecimalPrecision(num, 8);
    expect(res).toBe(123.12345678);

    num = 123.123;
    res = toDecimalPrecision(num, 8);
    expect(res).toBe(123.123);

    num = 3;
    res = toDecimalPrecision(num, 3);
    expect(res).toBe(3);
  });
});
