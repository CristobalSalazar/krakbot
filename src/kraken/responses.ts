import ITicker from "../interfaces/ITicker";
import IAsset from "../interfaces/IAsset";
import ILedger from "../interfaces/ILedger";
import ITrade from "../interfaces/ITrade";
import IAssetPair from "../interfaces/IAssetPair";

export type OrderBookResponse = {
  [id: string]: {
    asks: [[any]];
    bids: [[any]];
  };
};

export type RecentTradesResponse = {
  [id: string]: [[string, string, number, string, string, string]];
};
export type RecentSpreadResponse = {
  [id: string]: [[number, string, string]];
};

export type OHLCResponse = { [id: string]: [[number | string]] };

export type AssetPairResponse = { [id: string]: IAssetPair };

export type TimeResponse = { unixtime: number; rfc1123: string };

export type TickerResponse = {
  [id: string]: ITicker;
};

export type AssetResponse = { [id: string]: IAsset };

export type LedgerResponse = {
  ledger: {
    [id: string]: ILedger;
  };
  count: number;
};

export type TradesHistoryResponse = {
  trades: {
    [id: string]: ITrade;
  };
  count: number;
};
