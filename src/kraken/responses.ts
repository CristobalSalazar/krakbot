import ITicker from "../interfaces/ITicker";
import IAsset from "../interfaces/IAsset";
import ILedger from "../interfaces/ILedger";
import ITrade from "../interfaces/ITrade";
import IAssetPair from "../interfaces/IAssetPair";

export type ClosedOrdersResponse = {
  closed: {
    [tickerPair: string]: {
      refid?: string;
      userref: number;
      status: string;
      reason?: string;
      openttm: number;
      closetm: number;
      starttm: number;
      expiretm: number;
      descr: {
        pair: string;
        type: string;
        ordertype: string;
        price: string;
        price2: string;
        leverage: string;
        order: string;
        close: string;
      };
      vol: string;
      vol_exec: string;
      cost: string;
      fee: string;
      price: string;
      stopprice: string;
      limitprice: string;
      misc: string;
      offlags: string;
    };
  };
  count: number;
};

export type OpenOrdersResponse = {
  open: {
    [tickerPair: string]: {
      refid?: string;
      userref: number;
      status: string;
      openttm: number;
      starttm: number;
      expiretm: number;
      descr: {
        pair: string;
        type: string;
        ordertype: string;
        price: string;
        price2: string;
        leverage: string;
        order: string;
        close: string;
      };
      vol: string;
      vol_exec: string;
      cost: string;
      fee: string;
      price: string;
      stopprice: string;
      limitprice: string;
      misc: string;
      offlags: string;
    };
  };
};

export type TradeBalanceResponse = {
  eb: string;
  tb: string;
  m: string;
  n: string;
  c: string;
  v: string;
  e: string;
  mf: string;
  ml: string;
};

export type AccountBalanceResponse = {
  [assetName: string]: string;
};

export type OrderBookResponse = {
  [tickerPair: string]: {
    asks: [[any]];
    bids: [[any]];
  };
};

export type RecentTradesResponse = {
  [tickerPair: string]: [[string, string, number, string, string, string]];
};
export type RecentSpreadResponse = {
  [tickerPair: string]: [[number, string, string]];
};

export type OHLCResponse = {
  [tickerPair: string]: [
    [number, string, string, string, string, string, string, number]
  ];
} & { last: number };

export type AssetPairResponse = { [tickerPair: string]: IAssetPair };

export type TimeResponse = { unixtime: number; rfc1123: string };

export type TickerResponse = {
  [tickerPair: string]: ITicker;
};

export type AssetResponse = { [tickerPair: string]: IAsset };

export type LedgerResponse = {
  ledger: {
    [tickerPair: string]: ILedger;
  };
  count: number;
};

export type TradesHistoryResponse = {
  trades: {
    [tickerPair: string]: ITrade;
  };
  count: number;
};
