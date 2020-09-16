export type WalletTransferOpts = Asset & Amount & WalletTransfer;
export type WithdrawCancelOpts = OptionalAssetClass & Asset & RefId;
export type WithdrawStatusOpts = OptionalAssetClass & Asset & Method;
export type WithdrawOpts = OptionalAssetClass & Asset & Key & Amount;
export type WithdrawInfoOpts = OptionalAssetClass & Asset & Key & Amount;
export type DepositStatusOpts = OptionalAssetClass & Asset & Method;
export type DepositAddressesOpts = OptionalAssetClass & Asset & Method & New;
export type DepositMethodsOpts = OptionalAssetClass & Asset;
export type CancelOrderOpts = TransactionId;
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
export type QueryTradesOpts = TransactionId & OptionalTrades;
export type TradesHistoryOpts = OptionalTrades &
  OptionalStart &
  OptionalEnd &
  OptionalOffset &
  OptionalTradeType;
export type OhlcOpts = Pair & OptionalInterval & OptionalSince;
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
export type TradeBalanceOpts = OptionalAssetClass & Asset;
export type AddOrderOpts = Pair &
  Volume &
  StandardOrderType &
  OptionalUserRef &
  OptionalPrice &
  OptionalSecondaryPrice &
  OptionalLeverage &
  OptionalStartTime &
  OrderType & {
    oflags?: string;
    expiretm?: number;
    validate?: boolean;
  };

// Subtypes
type Volume = { volume: string };
type OptionalPrice = { price?: string };
type OptionalSecondaryPrice = { price2?: string };
type OptionalLeverage = { leverage?: string };
type WalletTransfer = { to: string; from: string };
type RefId = { refid: string };
type Asset = { asset: string };
type Id = { id: string };
type Key = { key: string };
type Amount = { amount: string };
type Method = { method: string };
type New = { new: boolean };
type RemoveType = { type: "cancel" | "delete" };
type ReportType = { report: "trades" | "ledgers" };
type TransactionId = { txid: string };
type Description = { description: string };
type Pair = { pair: string };
type Interval = 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 | 21600;
type OptionalTradeType = {
  type?:
    | "all"
    | "any position"
    | "closed position"
    | "closing position"
    | "no position";
};
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
type OptionalInterval = { interval?: Interval };
type OptionalSince = { since?: number };
type OptionalCount = { count?: number };
type StandardOrderType = { type: "buy" | "sell" };
type OrderType = {
  ordertype:
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
};
