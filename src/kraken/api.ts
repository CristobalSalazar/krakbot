// @ts-ignore
import KrakenClient from "kraken-api";
import { API_KEY, API_SECRET } from "../config";
import * as Opts from "./opts";
import * as Res from "./res";
import { tickerAdapter, ohlcAdapter, OHLCData } from "./adapters";

type KrakenApiResponse = { result: any; error: any[] };

class KrakenAPI {
  private kraken: KrakenClient;

  constructor(pubkey: string, privatekey: string) {
    this.kraken = new KrakenClient(pubkey, privatekey);
  }

  async api(endpoint: string, opts?: any): Promise<any | null> {
    let res: KrakenApiResponse;
    if (opts) {
      res = await this.kraken.api(endpoint, opts);
    } else {
      res = await this.kraken.api(endpoint);
    }
    if (res.error.length > 0) {
      console.error("api error! :", res.error);
      return null;
    } else {
      return res.result;
    }
  }

  async getServerTime(): Promise<Res.TimeResponse> {
    return await this.api("Time");
  }

  async getAssetInfo(opts?: Opts.AssetsOpts): Promise<Res.AssetsResponse> {
    return await this.api("Assets", opts);
  }

  async getTradableAssetPairs(
    opts: Opts.AssetPairsOpts
  ): Promise<Res.AssetPairResponse> {
    return await this.api("AssetPairs", opts);
  }

  async getTickerInfo(pairs: string[]) {
    const res = await this.api("Ticker", { pair: pairs.join(",") });
    if (res) {
      const tickerInfo = tickerAdapter(res);
      return tickerInfo;
    }
  }

  async getOHLCData(opts: Opts.OHLCOpts): Promise<OHLCData> {
    const res = await this.api("OHLC", opts);
    if (res) {
      const ohlc = ohlcAdapter(res);
      return ohlc;
    }
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

  async getAccountBalance(): Promise<Res.BalanceResponse> {
    return await this.api("Balance");
  }

  async getTradeBalance(
    opts: Opts.TradeBalanceOpts
  ): Promise<Res.TradeBalanceResponse> {
    return await this.api("TradeBalance", opts);
  }

  async getOpenOrders(
    opts: Opts.OpenOrdersOpts
  ): Promise<Res.OpenOrdersResponse> {
    return await this.api("OpenOrders", opts);
  }

  async getClosedOrders(
    opts: Opts.ClosedOrdersOpts
  ): Promise<Res.ClosedOrdersResponse> {
    return await this.api("ClosedOrders", opts);
  }

  // TODO: Add return type
  async queryOrdersInfo(opts: Opts.QueryOrdersOpts) {
    return await this.api("QueryOrders", opts);
  }

  // TODO: Add return type
  async getTradesHistory(opts: Opts.TradesHistoryOpts) {
    return await this.api("TradesHistory", opts);
  }

  // TODO: Add return type
  async queryTradesInfo(opts: Opts.QueryTradesOpts) {
    return await this.api("QueryTrades", opts);
  }

  // TODO: Add return type
  async getOpenPositions(opts: Opts.OpenPositionsOpts) {
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

  // TODO: Add return type
  async requestExportReport(opts: Opts.AddExportOpts) {
    return await this.api("AddExport", opts);
  }

  // TODO: Add return type
  async getExportStatuses(opts: Opts.ExportStatusOpts) {
    return await this.api("ExportStatus", opts);
  }

  // TODO: Add return type
  async getExportReport(opts: Opts.RetrieveExportOpts) {
    return await this.api("RetrieveExport", opts);
  }

  // TODO: Add return type
  async removeExportReport(opts: Opts.RemoveExportOpts) {
    return await this.api("RemoveExport", opts);
  }

  // TODO: Add return type
  async addStandardOrder(opts: Opts.AddOrderOpts) {
    return await this.api("AddOrder", opts);
  }

  async cancelOpenOrder() {}
  async getDepositMethods() {}
  async getDepositAddresses() {}
  async getDepositStatus() {}
  async getWithdrawlInfo() {}
  async withdrawFunds() {}
  async getWithdrawStatus() {}
  async requestWithdrawlCancelation() {}
  async walletTransfer() {}
}

export default new KrakenAPI(API_KEY, API_SECRET);
