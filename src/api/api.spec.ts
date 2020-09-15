import { API_KEY, API_SECRET } from "config";
import KrakenApi from ".";
const api = new KrakenApi(API_KEY, API_SECRET);

describe("Testing public api", () => {
  it("Should get the server time", async () => {
    const res = await api.getServerTime();
    expect(res.unixtime).toBeTruthy();
    expect(res.rfc1123).toBeTruthy();
  });

  it("Should get asset info", async () => {
    const res = await api.getAssetInfo({});
    expect(res).toBeTruthy();
  });
});
