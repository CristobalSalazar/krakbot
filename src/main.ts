import { CoinGeckoAPI } from "@coingecko/cg-api-ts";
import { API_KEY, API_SECRET } from "./config";
import KrakenApi from "./kraken";
import { testStrategy } from "./strategies/test.strategy";
import fetch from "node-fetch";

export type Services = {
  kraken: KrakenApi;
  coinGecko: CoinGeckoAPI;
};

function initServices(): Services {
  return {
    kraken: new KrakenApi(API_KEY, API_SECRET),
    coinGecko: new CoinGeckoAPI(fetch),
  };
}

async function main() {
  const services = initServices();
  testStrategy.run(services);
}
main();
