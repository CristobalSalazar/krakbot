import { BalanceResponse, TickerResponse, OHLCResponse } from "./responses";

export function accountBalanceAdapter(res: BalanceResponse) {
  const out: { [assetName: string]: number } = {};
  for (let key in res) {
    out[key] = parseFloat(res[key]);
  }
  return out;
}

interface TickerInformation {
  pair: string;
  timestamp?: Date;
  ask: {
    price: number;
    wholeLotVolume: number;
    lotVolume: number;
  };
  bid: {
    price: number;
    wholeLotVolume: number;
    lotVolume: number;
  };
  lastTradeClosed: {
    price: number;
    volume: number;
  };
  volume: {
    today: number;
    last24hrs: number;
  };
  vwap: {
    today: number;
    last24hrs: number;
  };
  numberOfTrades: {
    today: number;
    last24hrs: number;
  };
  low: {
    today: number;
    last24hrs: number;
  };
  high: {
    today: number;
    last24hrs: number;
  };
  openingPrice: number;
}

export function tickerAdapter(res: TickerResponse): TickerInformation[] {
  let out: TickerInformation[] = [];
  for (let key in res) {
    const info = res[key];
    out.push({
      pair: key,
      ask: {
        price: parseFloat(info.a[0]),
        wholeLotVolume: parseFloat(info.a[1]),
        lotVolume: parseFloat(info.a[2]),
      },
      bid: {
        price: parseFloat(info.b[0]),
        wholeLotVolume: parseFloat(info.b[1]),
        lotVolume: parseFloat(info.b[2]),
      },
      lastTradeClosed: {
        price: parseFloat(info.c[0]),
        volume: parseFloat(info.c[1]),
      },
      volume: {
        today: parseFloat(info.v[0]),
        last24hrs: parseFloat(info.v[1]),
      },
      vwap: {
        today: parseFloat(info.p[0]),
        last24hrs: parseFloat(info.p[1]),
      },
      numberOfTrades: {
        today: info.t[0],
        last24hrs: info.t[1],
      },
      low: {
        today: parseFloat(info.l[0]),
        last24hrs: parseFloat(info.l[1]),
      },
      high: {
        today: parseFloat(info.h[0]),
        last24hrs: parseFloat(info.h[1]),
      },
      openingPrice: parseFloat(info.o),
    });
  }
  return out;
}

interface OHLCInfo {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  vwap: number;
  volume: number;
  count: number;
}
export type OHLCData = { last: number } & { [tickerPair: string]: OHLCInfo[] };
export function ohlcAdapter(res: OHLCResponse): OHLCData {
  let out: OHLCData = Object.create({});
  for (let key in res) {
    if (key === "last") continue;
    const ohlc = res[key];
    let outArr: OHLCInfo[] = [];
    for (let arr of ohlc) {
      outArr.push({
        time: arr[0],
        open: parseFloat(arr[1]),
        high: parseFloat(arr[2]),
        low: parseFloat(arr[3]),
        close: parseFloat(arr[4]),
        vwap: parseFloat(arr[5]),
        volume: parseFloat(arr[6]),
        count: arr[7],
      });
    }
    out[key] = outArr;
  }
  //out.last = res["last"];
  return out;
}
