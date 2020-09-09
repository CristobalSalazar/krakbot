// @ts-ignore
import KrakenClient from "kraken-api";
import { API_KEY, API_SECRET } from "../config";
import {
  ClosedOrdersResponse,
  OpenOrdersResponse,
  TradeBalanceResponse,
  AccountBalanceResponse,
  AssetResponse,
  TimeResponse,
  AssetPairResponse,
  OrderBookResponse,
  RecentTradesResponse,
  RecentSpreadResponse,
} from "./responses";
import { tickerAdapter, ohlcAdapter, OHLCData } from "./adapters";

type KrakenApiResponse = { result: any; error: any[] };
class KrakenAPI {
  private kraken: KrakenClient;

  constructor(pubkey: string, privatekey: string) {
    this.kraken = new KrakenClient(pubkey, privatekey);
  }

  async fetch(endpoint: string, opts?: any): Promise<any | null> {
    let res: KrakenApiResponse;
    if (opts) {
      res = await this.kraken.api(endpoint, opts);
    } else {
      res = await this.kraken.api(endpoint);
    }
    if (res.error.length > 0) {
      console.error("api error:", res.error);
      return null;
    } else {
      return res.result;
    }
  }

  public = {
    getServerTime: async (): Promise<TimeResponse> => {
      return await this.fetch("Time");
    },
    getAssetInfo: async (opts?: {
      info?: string;
      aclass?: string;
      asset?: string;
    }): Promise<AssetResponse> => {
      return await this.fetch("Assets", opts);
    },
    getTradableAssetPairs: async (opts: {
      info?: "info" | "leverage" | "fees" | "margin";
      pair?: string;
    }): Promise<AssetPairResponse> => {
      return await this.fetch("AssetPairs", opts);
    },
    getTickerInfo: async (pairs: string[]) => {
      const res = await this.fetch("Ticker", { pair: pairs.join(",") });
      if (res) {
        const tickerInfo = tickerAdapter(res);
        return tickerInfo;
      }
    },
    getOHLCData: async (opts: {
      pair: string;
      interval?: number;
      since?: string;
    }): Promise<OHLCData> => {
      const res = await this.fetch("OHLC", opts);
      if (res) {
        const ohlc = ohlcAdapter(res);
        return ohlc;
      }
    },
    getOrderBook: async (opts: {
      pair: string;
      count?: number;
    }): Promise<OrderBookResponse> => {
      return await this.fetch("Depth", opts);
    },
    getRecentTrades: async (opts: {
      pair: string;
      since?: string;
    }): Promise<RecentTradesResponse> => {
      return await this.fetch("Trades", opts);
    },
    getRecentSpread: async (opts: {
      pair: string;
      since?: string;
    }): Promise<RecentSpreadResponse> => {
      return await this.fetch("Spread", opts);
    },
  };

  private = {};

  // Private
  async getAccountBalance(): Promise<AccountBalanceResponse> {
    const res = await this.kraken.api("Balance");
    return res.result;
  }

  async getTradeBalance(opts: {
    aclass?: string;
    asset?: string;
  }): Promise<TradeBalanceResponse> {
    const res = await this.kraken.api("TradeBalance", opts);
    return res.result;
  }

  async getOpenOrders(opts: {
    trades?: boolean;
    userref?: string;
  }): Promise<OpenOrdersResponse> {
    const res = await this.kraken.api("OpenOrders", opts);
    return res.result;
  }

  async getClosedOrders(opts: {
    trades?: boolean;
    userref?: string;
    start?: number;
    end?: number;
    ofs?: number;
    closetime?: "open" | "close";
  }): Promise<ClosedOrdersResponse> {
    const res = await this.kraken.api("ClosedOrders", opts);
    return res.result;
  }

  // TODO: add return type
  async queryOrdersInfo(opts: {
    txid: string;
    trades?: boolean;
    userref?: string;
  }) {
    const res = await this.kraken.api("QueryOrders", opts);
    return res.result;
  }

  // get trade history for item
  async getTradesHistory(opts: {
    type?:
      | "all"
      | "any position"
      | "closed position"
      | "closing position"
      | "no position";
    trades?: boolean;
    start?: number;
    end?: number;
    ofs?: number;
  }) {
    const res = await this.kraken.api("TradesHistory", opts);
    return res.result;
  }

  async queryTradesInfo(opts: { txid?: string; trades?: boolean }) {
    const res = await this.kraken.api("QueryTrades", opts);
    return res.result;
  }

  async getOpenPositions(opts: {
    txid: string;
    docalcs?: boolean;
    consolidartion?: { market: string };
  }) {
    const res = await this.kraken.api("OpenPositions", opts);
    return res.result;
  }

  async getLedgersInfo(opts: {
    aclass?: string;
    asset?: string;
    start?: number;
    end?: number;
    ofs?: number;
  }) {
    const res = await this.kraken.api("Ledgers", opts);
    return res.result;
  }

  async queryLedgers(opts: {}) {}

  async getTradeVolume(opts: {}) {}

  async requestExportReport(opts: {}) {}

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
