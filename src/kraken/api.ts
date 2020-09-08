// @ts-ignore
import KrakenClient from "kraken-api";
import { API_KEY, API_SECRET } from "../config";
import {
  ClosedOrdersResponse,
  OpenOrdersResponse,
  TradeBalanceResponse,
  AccountBalanceResponse,
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

  public = {
    /**
     * Note: this is to aid in approximating the skew time betweent he server and client.
     * @returns Server's time.
     */
    getServerTime: async (): Promise<TimeResponse> => {
      const res = await this.kraken.api("Time");
      return res.result;
    },

    /**
     * @returns Array of asset names and their info
     */
    getAssetInfo: async (opts?: {
      /**
       * Info to retrieve (optional):
       * info = all info (default)
       */
      info?: string;
      /**
       * Asset class (optional):
       * currency (default)
       */
      aclass?: string;
      /**
       * Comma delimited list of assets to get info on (optional. default = all for given asset).
       */
      asset?: string;
    }): Promise<AssetResponse> => {
      const res = await this.kraken.api("Assets", opts);
      return res.result;
    },

    getTradableAssetPairs: async (opts: {
      info?: "info" | "leverage" | "fees" | "margin";
      pair?: string;
    }): Promise<AssetPairResponse> => {
      const res = await this.kraken.api("AssetPairs", opts);
      return res.result;
    },

    getTickerInfo: async (pair: string): Promise<TickerResponse> => {
      const res = await this.kraken.api("Ticker", { pair });
      return res.result;
    },

    getOHLCData: async (opts: {
      pair: string;
      interval?: number;
      since?: string;
    }): Promise<OHLCResponse> => {
      const res = await this.kraken.api("OHLC", opts);
      return res.result;
    },

    getOrderBook: async (opts: {
      pair: string;
      count?: number;
    }): Promise<OrderBookResponse> => {
      const res = await this.kraken.api("Depth", opts);
      return res.result;
    },

    getRecentTrades: async (opts: {
      pair: string;
      since?: string;
    }): Promise<RecentTradesResponse> => {
      const res = await this.kraken.api("Trades", opts);
      return res.result;
    },
    getRecentSpread: async (opts: {
      pair: string;
      since?: string;
    }): Promise<RecentSpreadResponse> => {
      const res = await this.kraken.api("Spread", opts);
      return res.result;
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
