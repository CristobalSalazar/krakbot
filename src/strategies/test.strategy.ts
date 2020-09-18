import { DOTXBT, LINKXBT } from "../util/asset-pairs";
import Time from "../util/time";
import { percentDifference } from "../util/math";
import fs from "fs";
import { Services } from "../main";

const purchases = {};
var totalGain = 0;

function log(msg: string) {
  const logmsg = `[${new Date().toLocaleString()}] ${msg}`;
  console.log(logmsg);
  fs.appendFileSync("./krakbot.log", logmsg + "\n");
}

export const testStrategy = {
  async run(services: Services) {
    console.log(`Running ${__filename} strategy`);
    setInterval(() => poll(services), Time.seconds(3));
  },
};

type ExchangeInfoResult = {
  coin: string;
  vs: string;
  kraken: number;
  coingecko: number;
  diff: number;
  percentDiff: number;
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

  try {
    const results = await Promise.all([
      getExchangeDiffs("polkadot", DOTXBT, services),
      getExchangeDiffs("chainlink", LINKXBT, services),
    ]);

    for (const result of results) {
      const lastBuyPrice = purchases[result.coin];
      if (lastBuyPrice === undefined && result.percentDiff <= PERCENT_BUY) {
        purchases[result.coin] = result.kraken;
        log(`BUY ${result.coin} for ${result.kraken}`);
      } else if (
        lastBuyPrice !== undefined &&
        percentDifference(result.kraken, lastBuyPrice) >= PERCENT_SELL
      ) {
        const sellPrice = result.kraken;
        const gain = sellPrice - purchases[result.coin];
        totalGain += gain;
        log(`SELL ${result.coin} for ${sellPrice}`);
        log(`TX GAIN: ${gain}, TOTAL GAIN: ${totalGain}`);
        purchases[result.coin] = undefined;
      }
    }
  } catch (err) {
    log("Error fetching results");
  }
}
