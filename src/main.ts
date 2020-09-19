import { CoinGeckoAPI } from "@coingecko/cg-api-ts";
import { API_KEY, API_SECRET } from "./config";
import KrakenApi from "./services/kraken";
import { testStrategy } from "./strategies/test.strategy";
import fetch from "node-fetch";
import Logger from "./services/logger/logger";

export type Services = {
  kraken: KrakenApi;
  coinGecko: CoinGeckoAPI;
  logger: Logger;
};

function initServices(): Services {
  return {
    kraken: new KrakenApi(API_KEY, API_SECRET),
    coinGecko: new CoinGeckoAPI(fetch),
    logger: new Logger(),
  };
}

async function main() {
  const services = initServices();
  testStrategy.run(services);
}
main();
