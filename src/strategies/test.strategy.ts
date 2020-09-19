import { ADAXBT, DOTXBT, LINKXBT } from "../util/asset-pairs";
import Time from "../util/time";
import { percentDifference } from "../util/math";
import fs from "fs";
import { Services } from "../main";

var balance = 0.01;
var purchases: { [id: string]: { price: number; vol: number } } = {};

function log(msg: string) {
  const logmsg = `[${new Date().toLocaleString()}] ${msg}`;
  console.log(logmsg);
  fs.appendFileSync("./krakbot.log", logmsg + "\n");
}

export const testStrategy = {
  async run(services: Services) {
    console.log(`Running ${__filename} strategy`);
    console.log("BALANCE", balance);
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
  const PERCENT_BUY = -0.25;
  const PERCENT_SELL = 0.25;
  const PERCENT_INVESTMENT = 0.1;
  try {
    const results = await Promise.all([
      getExchangeDiffs("polkadot", DOTXBT, services),
      getExchangeDiffs("chainlink", LINKXBT, services),
      getExchangeDiffs("cardano", ADAXBT, services),
    ]);
    for (const result of results) {
      const purchase = purchases[result.coin];
      if (purchase === undefined && result.percentDiff <= PERCENT_BUY) {
        const currentPrice = result.kraken;
        // price is lower than coingecko so buy
        const investment = PERCENT_INVESTMENT * balance; // get a percentage of holdings
        balance -= investment; // subtract from holdings
        const vol = investment / currentPrice;
        purchases[result.coin] = { price: currentPrice, vol };
        log(`BUY ${vol} ${result.coin.toUpperCase()} for 1 x ${result.kraken}`);
      } else if (
        purchase !== undefined &&
        percentDifference(result.kraken, purchase.price) >= PERCENT_SELL
      ) {
        // price is higher than previous by percent
        const sellPrice = result.kraken;
        const net = sellPrice * purchase.vol - purchase.price * purchase.vol;
        balance += net;
        log(`SELL ${result.coin.toUpperCase()} for ${sellPrice}`);
        log(`BALANCE: ${balance}`);
        purchases[result.coin] = undefined;
      } else if (purchase !== undefined && result.percentDiff >= PERCENT_SELL) {
        // price has exceeded
        const sellPrice = result.kraken;
        const net = sellPrice * purchase.vol - purchase.price * purchase.vol;
        balance += net;
        log(
          `STOP LOSS ${
            purchase.vol
          } ${result.coin.toUpperCase()} for ${sellPrice}`
        );
        log(`BALANCE: ${balance}`);
        purchases[result.coin] = undefined;
      }
    }
  } catch (err) {
    log(`Error fetching results ${err}`);
  }
}
