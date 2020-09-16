import { DbModel } from "./db.model";

export interface TickerModel extends DbModel {
  pair: string;
  ask: { price: number; wholeLotVolume: number; lotVolume: number };
  bid: { price: number; wholeLotVolume: number; lotVolume: number };
  lastTradeClosed: { price: number; lotVolume: number };
  volume: { today: number; last24hours: number };
  volumeWeightedAveragePrice: { today: number; last24hours: number };
  numberOfTrades: { today: number; last24hours: number };
  low: { today: number; last24hours: number };
  high: { today: number; last24hours: number };
  openingPrice: number;
}
