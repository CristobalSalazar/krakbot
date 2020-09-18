import { API_KEY, API_SECRET } from "../config";
import KrakenApi from ".";
import { DOTXBT, ETHDAI } from "../util/asset-pairs";

describe("Public Api", () => {
  const api = new KrakenApi(API_KEY, API_SECRET);

  it("Should get the server time", async () => {
    const res = await api.getServerTime();
    expect(res.unixtime).toBeDefined();
    expect(res.rfc1123).toBeDefined();
  });

  it("Should get asset info", async () => {
    const res = await api.getAssetInfo();
    for (const key in res) {
      const asset = res[key];
      expect(asset.aclass).toBeDefined();
      expect(asset.altname).toBeDefined();
      expect(asset.decimals).toBeDefined();
      expect(asset.display_decimals).toBeDefined();
    }
  });

  it("Should get tradable asset pairs", async () => {
    const res = await api.getTradableAssetPairs();
    for (const key in res) {
      const assetPair = res[key];
      expect(assetPair.aclass_base).toBeDefined();
      expect(assetPair.aclass_quote).toBeDefined();
      expect(assetPair.altname).toBeDefined();
      expect(assetPair.base).toBeDefined();
      expect(assetPair.fee_volume_currency).toBeDefined();
      expect(assetPair.fees).toBeDefined();
      expect(assetPair.leverage_buy).toBeDefined();
      expect(assetPair.leverage_sell).toBeDefined();
      expect(assetPair.lot).toBeDefined();
      expect(assetPair.lot_decimals).toBeDefined();
      expect(assetPair.lot_multiplier).toBeDefined();
      expect(assetPair.margin_call).toBeDefined();
      expect(assetPair.margin_stop).toBeDefined();
      expect(assetPair.pair_decimals).toBeDefined();
      expect(assetPair.quote).toBeDefined();
    }
  });

  it("Should get ticker info", async () => {
    const res = await api.getTickerInfo([DOTXBT, ETHDAI]);
    for (const key in res) {
      const info = res[key];
      expect(info.a[0]).toBeDefined();
      expect(info.a[1]).toBeDefined();
      expect(info.a[2]).toBeDefined();
      expect(info.b[0]).toBeDefined();
      expect(info.b[1]).toBeDefined();
      expect(info.b[2]).toBeDefined();
      expect(info.c[0]).toBeDefined();
      expect(info.c[1]).toBeDefined();
      expect(info.v[0]).toBeDefined();
      expect(info.v[1]).toBeDefined();
      expect(info.p[0]).toBeDefined();
      expect(info.p[1]).toBeDefined();
      expect(info.t[0]).toBeDefined();
      expect(info.t[1]).toBeDefined();
      expect(info.l[0]).toBeDefined();
      expect(info.l[1]).toBeDefined();
      expect(info.h[0]).toBeDefined();
      expect(info.h[1]).toBeDefined();
      expect(info.o).toBeDefined();
    }
  });

  it("Should get ohlc data", async () => {
    const res = await api.getOhlcData({ pair: DOTXBT });
    expect(res.last).toBeDefined();
    for (const key in res) {
      if (key !== "last") {
        const dataArray = res[key];
        for (const data of dataArray) {
          expect(data).toHaveLength(8);
          expect(data[0]).toBeDefined();
          expect(data[1]).toBeDefined();
          expect(data[2]).toBeDefined();
          expect(data[3]).toBeDefined();
          expect(data[4]).toBeDefined();
          expect(data[5]).toBeDefined();
          expect(data[6]).toBeDefined();
          expect(data[7]).toBeDefined();
        }
      }
    }
  });

  it("Should get order book", async () => {
    const res = await api.getOrderBook({ pair: DOTXBT });
    for (const key in res) {
      const info = res[key];
      expect(info.asks).toBeDefined();
      expect(info.bids).toBeDefined();
      for (const ask of info.asks) {
        expect(ask).toHaveLength(3);
        expect(ask[0]).toBeDefined();
        expect(ask[1]).toBeDefined();
        expect(ask[2]).toBeDefined();
      }
      for (const bid of info.bids) {
        expect(bid).toHaveLength(3);
        expect(bid[0]).toBeDefined();
        expect(bid[1]).toBeDefined();
        expect(bid[2]).toBeDefined();
      }
    }
  });

  it("Should get recent trades", async () => {
    const res = await api.getRecentTrades({ pair: DOTXBT });
    expect(res.last).toBeDefined();
    for (const key in res) {
      if (key !== "last") {
        const infoArray = res[key];
        for (const info of infoArray) {
          expect(info).toHaveLength(6);
          expect(info[0]).toBeDefined();
          expect(info[1]).toBeDefined();
          expect(info[2]).toBeDefined();
          expect(info[3]).toBeDefined();
          expect(info[4]).toBeDefined();
          expect(info[5]).toBeDefined();
        }
      }
    }
  });

  it("Should get recent spread", async () => {
    const res = await api.getRecentSpread({ pair: DOTXBT });
    expect(res.last).toBeDefined();
    for (const key in res) {
      if (key !== "last") {
        const infoArray = res[key];
        for (const info of infoArray) {
          expect(info).toHaveLength(3);
          expect(info[0]).toBeDefined();
          expect(info[1]).toBeDefined();
          expect(info[2]).toBeDefined();
        }
      }
    }
  });
});
