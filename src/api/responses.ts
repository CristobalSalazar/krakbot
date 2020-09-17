export type KrakenApiResponse = { result: any; error: any[] };
export type TimeResponse = { unixtime: number; rfc1123: string };
export type AssetsResponse = TickerPair<AssetInfo>;
export type AssetPairResponse = TickerPair<AssetPair>;
export type TickerResponse = TickerPair<TickerInfo>;
export type OhlcResponse = TickerPair<OhlcData[]> & Last;
export type DepthResponse = TickerPair<DepthInfo>;
export type TradesResponse = TickerPair<TradesInfo[]> & Last;
export type SpreadResponse = TickerPair<SpreadInfo[]> & Last;
export type AddOrderResponse = {
  descr: { order: string };
  txid: [txid: string];
};
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
  open: Id<OrdersInfo>;
  count: number;
};
export type ClosedOrdersResponse = {
  closed: Id<OrdersInfo>;
  count: number;
};
export type QueryOrdersResponse = Id<OrdersInfo>;
export type TradesHistoryResponse = {
  trades: Id<TradeHistoryInfo>;
  count: number;
};
export type QueryTradesResponse = Id<TradeHistoryInfo>;
export type OpenPositionsResponse = Id<OpenPositionInfo>;
export type LedgersResponse = {
  ledger: Id<LedgerInfo>;
  count: number;
};
export type QueryLedgersResponse = Id<LedgerInfo>;
export type TradeVolumeResponse = {
  currency: string;
  volume: string;
  fees: TickerPair<FeeInfo>;
  fees_maker: TickerPair<FeeInfo>;
};
export type AddExportResponse = { id: string };
export type ExportStatusResponse = ReportInfo[];
export type RemoveExportResponse = { delete?: boolean; cancel?: boolean };
export type DepositMethodsResponse = [
  {
    method: string;
    limit: string | boolean;
    fee: string;
    "gen-address": boolean;
  }
];
export type DepositAdddressesResponse = [
  { address: string; expiretm: number; new: boolean }
];
export type DepositStatusResponse = [
  {
    method: string;
    aclass: string;
    asset: string;
    refid: string;
    txid: string;
    info: string;
    amount: string;
    fee: string;
    time: number;
    status: string;
    "status-prop"?: "return" | "onhold";
  }
];
export type WithdrawInfoResponse = [
  {
    method: string;
    limit: string;
    fee: string;
  }
];
export type WithdrawResponse = {
  refid: string;
};
export type WithdrawStatusResponse = {
  method: string;
  aclass: string;
  asset: string;
  refid: string;
  txid: string;
  info: string;
  amount: string;
  fee: string;
  time: number;
  status: string;
  "status-prop"?:
    | "cancel-pending"
    | "canceled"
    | "cancel-denied"
    | "return"
    | "onhold";
};

export type WalletTransferResponse = {
  refid: string;
};

export type CancelOrderResponse = {
  count: number;
  pending?: string;
};

type ReportInfo = {
  id: string;
  descr: string;
  format: string;
  report: string;
  subtype: string;
  status: string;
  flags: string;
  fields: string;
  createdtm: string;
  expiretm: string;
  starttm: string;
  completedtm: string;
  datastarttm: string;
  dataendtm: string;
  aclass: string;
  asset: string;
};

type OpenPositionInfo = {};
type LedgerInfo = {
  refid: string;
  time: number;
  type: string;
  subtype: string;
  aclass: string;
  asset: string;
  amount: string;
  fee: string;
  balance: string;
};

type TradeHistoryInfo = {
  ordertxid: string;
  postxid: string;
  pair: string;
  time: number;
  type: string;
  ordertype: string;
  price: string;
  cost: string;
  fee: string;
  vol: string;
  margin: string;
  misc: string;
};
type Id<T> = { [id: string]: T };
type OrdersInfo = {
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
  wsname?: string;
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
  fees_maker?: Fees;
  fee_volume_currency: string;
  margin_call: number;
  margin_stop: number;
  ordermin?: string;
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
  asks: [[price: string, volume: string, timestamp: number]];
  bids: [[price: string, volume: string, timestamp: number]];
};
type Last = { last: number | string };
type OhlcData = [
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
