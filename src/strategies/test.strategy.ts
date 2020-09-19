import { ADAXBT, DOTXBT, LINKXBT, TRXXBT } from "../util/asset-pairs";
import Time from "../util/time";
import path from "path";
import { percentDifference, percentOf } from "../util/math";
import { Services } from "../main";

var balance = 0.01;
var purchases: { [id: string]: { price: number; vol: number } } = {};
const PERCENT_INVESTMENT = 10;

// -----------------------
// These variables can be changed dynamically
var percentBuy = -0.5;
var percentSell = 0.1;
// -----------------------

export const testStrategy = {
  async run(services: Services) {
    const { logger } = services;
    logger.info(`Running ${path.basename(__filename)}`);
    logger.balance(balance);
    logger.info(`PERCENT BUY ${percentBuy}`);
    setInterval(() => poll(services), Time.seconds(1));
  },
};

async function getExchangeDiffs(
  coinName: string,
  krakenXBTPair: string,
  services: Services
) {
  const { kraken, coinGecko: cg } = services;
  const vs = "btc";
  const cgRes = await cg.getSimplePrice([coinName], [vs]);
  const krkRes = await kraken.getTickerInfo([krakenXBTPair]);
  const krkPrice =
    (parseFloat(krkRes[krakenXBTPair].a[0]) +
      parseFloat(krkRes[krakenXBTPair].b[0])) /
    2;
  const cgPrice = cgRes.data[coinName].btc;

  return {
    coin: coinName,
    vs,
    kraken: krkPrice,
    coingecko: cgPrice,
    diff: cgPrice - krkPrice,
    percentDiff: percentDifference(krkPrice, cgPrice),
  };
}

async function poll(services: Services) {
  const { logger } = services;

  try {
    const results = await Promise.all([
      getExchangeDiffs("polkadot", DOTXBT, services),
      getExchangeDiffs("chainlink", LINKXBT, services),
      getExchangeDiffs("cardano", ADAXBT, services),
      getExchangeDiffs("tron", TRXXBT, services),
    ]);

    for (const result of results) {
      const purchase = purchases[result.coin];
      const hasPurchased = purchase !== undefined;
      const isOvervalued = result.percentDiff > 0;
      const isUndervalued = result.percentDiff <= percentBuy;

      if (!hasPurchased && isUndervalued) {
        const currentPrice = result.kraken;
        const investment = percentOf(PERCENT_INVESTMENT, balance);
        const vol = investment / currentPrice;
        purchases[result.coin] = { price: currentPrice, vol };
        balance -= investment; // subtract from holdings
        logger.buy(vol, result.coin, result.kraken);
        logger.balance(balance);
      } else if (
        hasPurchased &&
        percentDifference(result.kraken, purchase.price) >= percentSell
      ) {
        // Successful sell
        const currentPrice = result.kraken;
        balance += currentPrice * purchase.vol;
        logger.sell(purchase.vol, result.coin, currentPrice);
        logger.balance(balance);
        purchases[result.coin] = undefined;
        percentBuy -= percentOf(10, Math.abs(percentBuy));
        logger.info(`PERCENT BUY ${percentBuy}`);
      } else if (hasPurchased && isOvervalued) {
        // change variables here
        const sellPrice = result.kraken;
        balance += sellPrice * purchase.vol;
        logger.info("Stop Loss");
        logger.sell(purchase.vol, result.coin, sellPrice);
        logger.balance(balance);
        purchases[result.coin] = undefined;
        percentBuy += percentOf(10, Math.abs(percentBuy));
        logger.info(`PERCENT BUY ${percentBuy}`);
      }
    }
  } catch (err) {
    logger.error(err);
  }
}
