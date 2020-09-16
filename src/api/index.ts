// @ts-ignore
import KrakenClient from "kraken-api";
import * as Opts from "./options";
import * as Res from "./responses";

export default class KrakenApi {
  private client: KrakenClient;

  constructor(pub: string, secret: string) {
    this.client = new KrakenClient(pub, secret);
  }

  private async api(endpoint: string, opts?: any): Promise<any | null> {
    const res: Res.KrakenApiResponse = opts
      ? await this.client.api(endpoint, opts)
      : await this.client.api(endpoint);
    return res.error.length > 0 ? null : res.result;
  }

  // public user methods
  async getServerTime(): Promise<Res.TimeResponse> {
    return await this.api("Time");
  }

  async getAssetInfo(opts?: Opts.AssetsOpts): Promise<Res.AssetsResponse> {
    return await this.api("Assets", opts);
  }

  async getTradableAssetPairs(
    opts?: Opts.AssetPairsOpts
  ): Promise<Res.AssetPairResponse> {
    return await this.api("AssetPairs", opts);
  }

  async getTickerInfo(pairs: string[]): Promise<Res.TickerResponse> {
    return await this.api("Ticker", { pair: pairs.join(",") });
  }

  async getOhlcData(opts?: Opts.OhlcOpts): Promise<Res.OhlcResponse> {
    return await this.api("OHLC", opts);
  }

  async getOrderBook(opts: Opts.DepthOpts): Promise<Res.DepthResponse> {
    return await this.api("Depth", opts);
  }

  async getRecentTrades(opts: Opts.TradesOpts): Promise<Res.TradesResponse> {
    return await this.api("Trades", opts);
  }

  async getRecentSpread(opts: Opts.SpreadOpts): Promise<Res.SpreadResponse> {
    return await this.api("Spread", opts);
  }

  // Private user methods
  async getAccountBalance(): Promise<Res.BalanceResponse> {
    return await this.api("Balance");
  }

  async getTradeBalance(
    opts: Opts.TradeBalanceOpts
  ): Promise<Res.TradeBalanceResponse> {
    return await this.api("TradeBalance", opts);
  }

  async getOpenOrders(
    opts?: Opts.OpenOrdersOpts
  ): Promise<Res.OpenOrdersResponse> {
    return await this.api("OpenOrders", opts);
  }

  async getClosedOrders(
    opts?: Opts.ClosedOrdersOpts
  ): Promise<Res.ClosedOrdersResponse> {
    return await this.api("ClosedOrders", opts);
  }

  async queryOrdersInfo(
    opts: Opts.QueryOrdersOpts
  ): Promise<Res.QueryOrdersResponse> {
    return await this.api("QueryOrders", opts);
  }

  async getTradesHistory(
    opts: Opts.TradesHistoryOpts
  ): Promise<Res.TradesHistoryResponse> {
    return await this.api("TradesHistory", opts);
  }

  async queryTradesInfo(
    opts: Opts.QueryTradesOpts
  ): Promise<Res.QueryTradesResponse> {
    return await this.api("QueryTrades", opts);
  }

  async getOpenPositions(
    opts: Opts.OpenPositionsOpts
  ): Promise<Res.OpenPositionsResponse> {
    return await this.api("OpenPositions", opts);
  }

  async getLedgersInfo(opts: Opts.LedgersOpts): Promise<Res.LedgersResponse> {
    return await this.api("Ledgers", opts);
  }

  async queryLedgers(id: string[]): Promise<Res.QueryLedgersResponse> {
    return await this.api("QueryLedgers", { id: id.join(",") });
  }

  async getTradeVolume(
    opts: Opts.TradeVolumeOpts
  ): Promise<Res.TradeVolumeResponse> {
    return await this.api("TradeVolume", opts);
  }

  async requestExportReport(
    opts: Opts.AddExportOpts
  ): Promise<Res.AddExportResponse> {
    return await this.api("AddExport", opts);
  }

  async getExportStatuses(
    opts: Opts.ExportStatusOpts
  ): Promise<Res.ExportStatusResponse> {
    return await this.api("ExportStatus", opts);
  }

  // TODO: Add return type - this returns error as content-type needs to be set in client
  async getExportReport(opts: Opts.RetrieveExportOpts): Promise<any> {
    return await this.api("RetrieveExport", opts);
  }

  async removeExportReport(
    opts: Opts.RemoveExportOpts
  ): Promise<Res.RemoveExportResponse> {
    return await this.api("RemoveExport", opts);
  }

  async addStandardOrder(
    opts: Opts.AddOrderOpts
  ): Promise<Res.AddOrderResponse> {
    return await this.api("AddOrder", opts);
  }

  // TODO: Add return type
  async cancelOpenOrder(opts: Opts.CancelOrderOpts): Promise<any> {
    return await this.api("CancelOrder", opts);
  }

  // TODO: Add return type
  async getDepositMethods(opts: Opts.DepositMethodsOpts): Promise<any> {
    return await this.api("DepositMethods", opts);
  }

  // TODO: Add return type
  async getDepositAddresses(opts: Opts.DepositAddressesOpts): Promise<any> {
    return await this.api("DepositAddresses", opts);
  }

  // TODO: Add return type
  async getDepositStatus(opts: Opts.DepositStatusOpts): Promise<any> {
    return await this.api("DepositStatus", opts);
  }

  // TODO: Add return type
  async getWithdrawlInfo(opts: Opts.WithdrawInfoOpts): Promise<any> {
    return await this.api("WithdrawInfo", opts);
  }

  // TODO: Add return type
  async withdrawFunds(opts: Opts.WithdrawOpts): Promise<any> {
    return await this.api("Withdraw", opts);
  }

  // TODO: Add return type
  async getWithdrawStatus(opts: Opts.WithdrawStatusOpts): Promise<any> {
    return await this.api("WithdrawStatus", opts);
  }

  // TODO: Add return type
  async requestWithdrawlCancelation(
    opts: Opts.WithdrawCancelOpts
  ): Promise<any> {
    return await this.api("WithdrawCancel", opts);
  }

  // TODO: Add return type
  async walletTransfer(opts: Opts.WalletTransferOpts): Promise<any> {
    return await this.api("WalletTransfer", opts);
  }
}
