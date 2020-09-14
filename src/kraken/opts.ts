export type RemoveExportOpts = RemoveType & Id;
export type RetrieveExportOpts = Id;
export type ExportStatusOpts = ReportType;
export type AddExportOpts = Description &
  ReportType &
  OptionalFormat &
  OptionalFields &
  OptionalAsset &
  OptionalStartTime &
  OptionalEndTime;
export type TradeVolumeOpts = Pair & OptionalFeeInfo;
export type OpenPositionsOpts = TransactionId &
  OptionalDoCalculations &
  OptionalConsolidation;
export type LedgersOpts = OptionalAssetClass &
  OptionalAsset &
  OptionalStart &
  OptionalEnd &
  OptionalOffset;
export type QueryTradesOpts = OptionalTransactionId & OptionalTrades;
export type TradesHistoryOpts = OptionalTrades &
  OptionalStart &
  OptionalEnd &
  OptionalOffset & {
    type?:
      | "all"
      | "any position"
      | "closed position"
      | "closing position"
      | "no position";
  };
export type OHLCOpts = OptionalInterval & OptionalSince & OptionalPair;
export type AssetPairsOpts = {
  info?: "info" | "leverage" | "fees" | "margin";
} & OptionalPair;
export type OpenOrdersOpts = OptionalTrades & OptionalUserRef;
export type ClosedOrdersOpts = OptionalTrades &
  OptionalUserRef &
  OptionalStart &
  OptionalEnd &
  OptionalOffset &
  OptionalClosetime;
export type QueryOrdersOpts = TransactionId & OptionalTrades & OptionalUserRef;
export type AssetsOpts = { info?: string } & OptionalAsset & OptionalAssetClass;
export type TradesOpts = Pair & OptionalSince;
export type SpreadOpts = Pair & OptionalSince;
export type DepthOpts = Pair & OptionalCount;
export type TradeBalanceOpts = OptionalAssetClass & OptionalAsset;
export type AddOrderOpts = Pair &
  OptionalUserRef & {
    type: StandardOrderType;
    ordertype: OrderType;
    volume: string;
    price?: string;
    price2?: string;
    leverage?: string;
    oflags?: string;
    starttm?: number;
    expiretm?: number;
    validate?: boolean;
  };

// Subtypes
type Id = { id: string };
type RemoveType = { type: "cancel" | "delete" };
type ReportType = { report: "trades" | "ledgers" };
type TransactionId = { txid: string };
type Description = { description: string };
type Pair = { pair: string };
type OptionalFormat = { format?: "CSV" | "TSV" };
type OptionalFields = { fields?: string };
type OptionalStartTime = { starttm?: number };
type OptionalEndTime = { endtm?: number };
type OptionalFeeInfo = { "fee-info"?: boolean };
type OptionalConsolidation = { consolidation?: { market: string } };
type OptionalDoCalculations = { docalcs?: boolean };
type OptionalTransactionId = { txid?: string };
type OptionalClosetime = { closetime?: "open" | "close" };
type OptionalStart = { start?: number };
type OptionalEnd = { end?: number };
type OptionalOffset = { ofs?: number };
type OptionalTrades = { trades?: boolean };
type OptionalUserRef = { userref?: string };
type OptionalPair = { pair?: string };
type OptionalAssetClass = { aclass?: string };
type OptionalAsset = { asset?: string };
type OptionalInterval = { interval?: number };
type OptionalSince = { since?: number };
type OptionalCount = { count?: number };
type StandardOrderType = "buy" | "sell";
type OrderType =
  | "market"
  | "limit"
  | "stop-loss"
  | "take-profit"
  | "stop-loss-profit"
  | "stop-loss-limit"
  | "take-profit-limit"
  | "trailing-stop"
  | "trailing-stop-limit"
  | "stop-loss-and-limit"
  | "settle-position";
