import ITicker from "../interfaces/ITicker";
import IAsset from "../interfaces/IAsset";
import ILedger from "../interfaces/ILedger";
import ITrade from "../interfaces/ITrade";
import IAssetPair from "../interfaces/IAssetPair";

export type KrakenApiResponse = { result: any; error: any[] };
export type TradeVolumeResponse = {
  currency: string;
  volume: string;
  fees: {
    [tickerpair: string]: {
      fee: string;
      minfee: string;
      maxfee: string;
      nextfee: string;
      nextvolume: string;
      tiervolume: string;
    };
  };
  fees_maker: {
    [tickerpair: string]: {
      fee: string;
      minfee: string;
      maxfee: string;
      nextfee: string;
      nextvolume: string;
      tiervolume: string;
    };
  };
};

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

export type BalanceResponse = {
  [assetName: string]: string;
};

export type DepthResponse = {
  [tickerPair: string]: {
    asks: [[any]];
    bids: [[any]];
  };
};

export type TradesResponse = {
  [tickerPair: string]: [[string, string, number, string, string, string]];
};
export type SpreadResponse = {
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

export type AssetsResponse = { [tickerPair: string]: IAsset };

export type QueryLedgersResponse = { [tickerpair: string]: ILedger };

export type LedgersResponse = {
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
