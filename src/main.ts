import KrakenApi from "./api";
import { API_KEY, API_SECRET, WATCHLIST } from "./config";
import { getDb } from "./db/mongo";
import TickerService from "./db/services/ticker.service";
import { DOTETH } from "./util/asset-pairs";
import Time from "./util/time";

interface Services {
  tickerService: TickerService;
}

async function main() {
  const api = new KrakenApi(API_KEY, API_SECRET);
  const db = await getDb();
  const services: Services = {
    tickerService: new TickerService(db),
  };

  const res = await api.getOrderBook({ pair: DOTETH });
  console.log(JSON.stringify(res, null, 2));
  //setInterval(() => poll(api, services), Time.minutes(1));
}
main();

async function poll(api: KrakenApi, services: Services) {
  const { tickerService } = services;
  const [tickerResponse] = await Promise.all([api.getTickerInfo(WATCHLIST)]);
  tickerService.save(tickerResponse);
}
