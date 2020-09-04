// @ts-ignore
import KrakenClient from "kraken-api";
import { API_KEY, API_SECRET } from "../config";
import {
  AssetResponse,
  TickerResponse,
  TimeResponse,
  AssetPairResponse,
  OHLCResponse,
  OrderBookResponse,
  RecentTradesResponse,
  RecentSpreadResponse,
} from "./responses";

class KrakenAPI {
  private kraken: KrakenClient;

  constructor(pubkey: string, privatekey: string) {
    this.kraken = new KrakenClient(pubkey, privatekey);
  }

  async getServerTime(): Promise<TimeResponse> {
    const res = await this.kraken.api("Time");
    return res.result;
  }

  async getAssetInfo(opts?: {
    info?: string;
    aclass?: string;
    asset?: string;
  }): Promise<AssetResponse> {
    const res = await this.kraken.api("Assets", opts);
    return res.result;
  }

  async getTradableAssetPairs(opts: {
    info?: "info" | "leverage" | "fees" | "margin";
    pair?: string;
  }): Promise<AssetPairResponse> {
    const res = await this.kraken.api("AssetPairs", opts);
    return res.result;
  }

  async getTickerInfo(pair: string): Promise<TickerResponse> {
    const res = await this.kraken.api("Ticker", { pair });
    return res.result;
  }

  async getOHLC(opts: {
    pair: string;
    interval?: number;
    since?: string;
  }): Promise<OHLCResponse> {
    const res = await this.kraken.api("OHLC", opts);
    return res.result;
  }

  async getOrderBook(opts: {
    pair: string;
    count?: number;
  }): Promise<OrderBookResponse> {
    const res = await this.kraken.api("Depth", opts);
    return res.result;
  }

  async getRecentTrades(opts: {
    pair: string;
    since?: string;
  }): Promise<RecentTradesResponse> {
    const res = await this.kraken.api("Trades", opts);
    return res.result;
  }

  async getRecentSpread(opts: {
    pair: string;
    since?: string;
  }): Promise<RecentSpreadResponse> {
    const res = await this.kraken.api("Spread", opts);
    return res.result;
  }
  // Private
  async getAccountBalance() {}
  async getTradeBalance() {}
  async getOpenOrders() {}
  async getClosedOrders() {}
  async queryOrdersInfo() {}
  async getTradesHistory() {}
  async queryTradesInfo() {}
  async getOpenPositions() {}
  async getLedgersInfo() {}
  async queryLedgers() {}
  async getTradeVolume() {}
  async requestExportReport() {}
  async getExportStatuses() {}
  async getExportReport() {}
  async removeExportReport() {}
  // Private user trading
  async addStandardOrder() {}
  async cancelOpenOrder() {}
  // Private user funding
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
