import { ADAXBT, DOTXBT, LINKXBT, TRXXBT } from "../util/asset-pairs";
import Time from "../util/time";
import { percentDifference, percentOf } from "../util/math";
import { Services } from "../main";
import { toDecimalPrecision } from "../util/currency";
import color from "cli-color";

// CONFIGURATION VARIABLES
const STARTING_BALANCE = 0.01;
const START_PERCENT_BUY = 0.5;
const PERCENT_INVESTMENT = 10;
const PURCHASES: {
  [id: string]: { price: number; vol: number; buyPercent: number };
} = {};
const PERCENT_BUY_PENALTY = 0.01;
//

var buyPercent = START_PERCENT_BUY;
var balance = STARTING_BALANCE;

export const testStrategy = {
  async run(services: Services) {
    const { logger } = services;
    logger.intro();
    logger.balance(balance);
    logger.buyThreshold(buyPercent);
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

  let krkPrice =
    (parseFloat(krkRes[krakenXBTPair].a[0]) +
      parseFloat(krkRes[krakenXBTPair].b[0])) /
    2;
  krkPrice = toDecimalPrecision(krkPrice, 8);

  let cgPrice = cgRes.data[coinName].btc;
  cgPrice = toDecimalPrecision(cgPrice, 8);

  return {
    coin: coinName,
    pair: krakenXBTPair,
    vs,
    kraken: krkPrice,
    coingecko: cgPrice,
    diff: cgPrice - krkPrice,
    percentDiff: percentDifference(krkPrice, cgPrice),
  };
}

async function poll(services: Services) {
  const { logger } = services;
  // get asset info and precision

  try {
    const results = await Promise.all([
      getExchangeDiffs("polkadot", DOTXBT, services),
      getExchangeDiffs("chainlink", LINKXBT, services),
      getExchangeDiffs("cardano", ADAXBT, services),
      getExchangeDiffs("tron", TRXXBT, services),
    ]);
    for (const result of results) {
      const purchase = PURCHASES[result.coin];
      const hasPurchased = purchase !== undefined;
      const isOvervalued = result.percentDiff > 0;
      const isUndervalued = result.percentDiff <= -buyPercent;
      if (!hasPurchased && isUndervalued) {
        //
        const currentPrice = toDecimalPrecision(result.kraken, 8);
        const investment = toDecimalPrecision(
          percentOf(PERCENT_INVESTMENT, balance),
          8
        );
        const vol = toDecimalPrecision(investment / currentPrice, 8);
        PURCHASES[result.coin] = {
          price: currentPrice,
          vol,
          buyPercent: buyPercent,
        };
        balance = toDecimalPrecision(balance - investment, 8);
        logger.buy(vol, result.coin, result.kraken);
        logger.balance(balance);
      } else if (hasPurchased && isOvervalued) {
        const sellPrice = result.kraken;
        logger.sell(purchase.vol, result.coin, sellPrice);
        balance = toDecimalPrecision(balance + sellPrice, 8);
        const net = sellPrice * purchase.vol - purchase.price * purchase.vol;
        if (net < 0) {
          logger.info(`LOSS ${net}`);
          if (buyPercent <= purchase.buyPercent) {
            buyPercent += PERCENT_BUY_PENALTY;
            logger.buyThreshold(buyPercent);
          }
        }
        logger.balance(balance);
        PURCHASES[result.coin] = undefined;
      }
    }
  } catch (err) {
    logger.error(err);
  }
}
