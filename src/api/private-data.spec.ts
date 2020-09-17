import KrakenApi from ".";
import { API_KEY, API_SECRET } from "../config";

describe("Private Data", () => {
  const api = new KrakenApi(API_KEY, API_SECRET);

  it("Should get account balance", async () => {
    const res = await api.getAccountBalance();
    for (const key in res) {
      expect(res[key]).toBeDefined();
    }
  });
});
