import { ADAXBT, DOTXBT, LINKXBT, TRXXBT } from "../util/asset-pairs";
import Time from "../util/time";
import path from "path";
import { percentDifference } from "../util/math";
import { Services } from "../main";

var balance = 0.01;
var purchases: { [id: string]: { price: number; vol: number } } = {};

export const testStrategy = {
  async run(services: Services) {
    const { logger } = services;
    logger.info(`Running ${path.basename(__filename)}`);
    logger.balance(balance);
    setInterval(() => poll(services), Time.seconds(3));
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
  const PERCENT_BUY = -0.1;
  const PERCENT_SELL = 0.1;
  const PERCENT_INVESTMENT = 0.1;

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
      // kraken price is lower than coingecko by percentage
      if (purchase === undefined && result.percentDiff <= PERCENT_BUY) {
        const currentPrice = result.kraken;
        const investment = PERCENT_INVESTMENT * balance; // get a percentage of holdings
        const vol = investment / currentPrice;
        // set the purchase data
        purchases[result.coin] = { price: currentPrice, vol };
        balance -= investment; // subtract from holdings

        logger.buy(vol, result.coin, result.kraken);
        logger.balance(balance);
      } else if (
        purchase !== undefined &&
        percentDifference(result.kraken, purchase.price) >= PERCENT_SELL
      ) {
        // price is higher than previous by percent
        const currentPrice = result.kraken;
        balance += currentPrice * purchase.vol;
        logger.sell(purchase.vol, result.coin, currentPrice);
        logger.balance(balance);

        purchases[result.coin] = undefined;
      } else if (purchase !== undefined && result.percentDiff >= PERCENT_SELL) {
        // price has exceeded
        const sellPrice = result.kraken;
        balance += sellPrice * purchase.vol;
        logger.info("Stop Loss");
        logger.sell(purchase.vol, result.coin, sellPrice);
        logger.balance(balance);
        purchases[result.coin] = undefined;
      }
    }
  } catch (err) {
    logger.info(`Error fetching results ${err}`);
  }
}
