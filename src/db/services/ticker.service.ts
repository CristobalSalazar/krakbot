import { Db } from "mongodb";
import { TickerResponse } from "../../kraken/responses";
import { TickerModel } from "../models/ticker.model";

export default class TickerService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }

  async get(): Promise<TickerModel[]> {
    const tickers = await this.db.collection("tickers").find({}).toArray();
    return tickers;
  }

  async save(res: TickerResponse) {
    const out: TickerModel[] = [];
    for (const key in res) {
      const el = res[key];
      out.push({
        pair: key,
        ts: new Date(),
        ask: {
          price: parseFloat(el.a[0]),
          wholeLotVolume: parseFloat(el.a[1]),
          lotVolume: parseFloat(el.a[2]),
        },
        bid: {
          price: parseFloat(el.b[0]),
          wholeLotVolume: parseFloat(el.b[1]),
          lotVolume: parseFloat(el.b[2]),
        },
        lastTradeClosed: {
          price: parseFloat(el.c[0]),
          lotVolume: parseFloat(el.c[1]),
        },
        volume: {
          today: parseFloat(el.v[0]),
          last24hours: parseFloat(el.v[1]),
        },
        volumeWeightedAveragePrice: {
          today: parseFloat(el.p[0]),
          last24hours: parseFloat(el.p[1]),
        },
        numberOfTrades: {
          today: el.t[0],
          last24hours: el.t[1],
        },
        low: {
          today: parseFloat(el.l[0]),
          last24hours: parseFloat(el.l[1]),
        },
        high: {
          today: parseFloat(el.h[0]),
          last24hours: parseFloat(el.h[1]),
        },
        openingPrice: parseFloat(el.o),
      });
    }
    await this.db.collection("tickers").insertMany(out);
  }
}
