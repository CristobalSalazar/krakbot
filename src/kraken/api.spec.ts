import api from "./api";
describe("Testing public api", () => {
  it("Should get the server time", async () => {
    const res = await api.public.getServerTime();
    expect(res.unixtime).toBeTruthy();
    expect(res.rfc1123).toBeTruthy();
  });

  it("Should get asset info", async () => {
    const res = await api.public.getAssetInfo({});
    console.log(res);
    expect(res).toBeTruthy();
  });

  it("Should get tradable asset pairs", async () => {});
});
