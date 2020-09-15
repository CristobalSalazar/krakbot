import ILedger from "../interfaces/ILedger";
import ITrade from "../interfaces/ITrade";

export type KrakenApiResponse = { result: any; error: any[] };
export type TimeResponse = { unixtime: number; rfc1123: string };
export type AssetsResponse = TickerPair<AssetInfo>;
export type AssetPairResponse = TickerPair<AssetPair>;
export type TickerResponse = TickerPair<TickerInfo>;
export type OHLCResponse = TickerPair<OHLCData[]> & Last;
export type DepthResponse = TickerPair<DepthInfo>;
export type TradesResponse = TickerPair<TradesInfo[]> & Last;
export type SpreadResponse = TickerPair<SpreadInfo[]> & Last;
export type BalanceResponse = {
  [assetName: string]: string;
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
export type OpenOrdersResponse = {
  open: TickerPair<OpenOrdersInfo>;
};

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
export type TradeVolumeResponse = {
  currency: string;
  volume: string;
  fees: TickerPair<FeeInfo>;
  fees_maker: TickerPair<FeeInfo>;
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
type OpenOrdersInfo = {
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

type TradesInfo = [
  price: string,
  volume: string,
  time: number,
  buy_sell: string,
  market_limit: string,
  misc: string
];
type SpreadInfo = [time: number, bid: string, ask: string];
type TickerInfo = {
  a: [price: string, wholeLotVolume: string, lotVolume: string];
  b: [price: string, wholeLotVolume: string, lotVolume: string];
  c: [price: string, lotVolume: string];
  v: [today: string, last24hours: string];
  p: [today: string, last24hours: string];
  t: [today: number, last24hours: number];
  l: [today: string, last24hours: string];
  h: [today: string, last24hours: string];
  o: string;
};
type Fees = [[volume: string, percentFee: string]];
type AssetPair = {
  altname: string;
  wsname: string;
  aclass_base: string;
  base: string;
  aclass_quote: string;
  quote: string;
  lot: string;
  pair_decimals: number;
  lot_decimals: number;
  lot_multiplier: number;
  leverage_buy: number[];
  leverage_sell: number[];
  fees: Fees;
  fees_maker: Fees;
  fee_volume_currency: string;
  margin_call: number;
  margin_stop: number;
  ordermin: string;
};
type FeeInfo = {
  fee: string;
  minfee: string;
  maxfee: string;
  nextfee: string;
  nextvolume: string;
  tiervolume: string;
};

// Internal Types
type DepthInfo = {
  asks: [price: string, volume: string, timestamp: number];
  bids: [price: string, volume: string, timestamp: number];
};
type Last = { last: number | string };
type OHLCData = [
  time: number,
  open: string,
  high: string,
  low: string,
  close: string,
  vwap: string,
  volume: string,
  count: number
];
type TickerPair<T> = { [tickerPair: string]: T };
type AssetInfo = {
  aclass: string;
  altname: string;
  decimals: number;
  display_decimals: number;
};
