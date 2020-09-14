import { getDb, closeConnection } from "./db/mongo";
import api from "./kraken/api";
import { LINKXBT } from "./util/asset-pairs";
import _ from "lodash";
import { Db } from "mongodb";
import { TICKER_POLL_INTERVAL, WATCHLIST } from "./config";

async function main() {
  try {
    const db = await getDb();
    startPolling(db);
    const res = await api.getTradableAssetPairs({ pair: LINKXBT });
    console.log(res);

    const orderRes = await api.addStandardOrder({
      pair: LINKXBT,
      type: "sell",
      volume: "1",
      ordertype: "market",
    });
    console.log(orderRes);
  } catch (err) {
    console.error(err);
  }
}
main();

function startPolling(database: Db) {
  pollTickerInfo(database);
  setInterval(async () => {
    await pollTickerInfo(database);
  }, TICKER_POLL_INTERVAL);
}

async function pollTickerInfo(db: Db) {
  const results = await api.getTickerInfo(WATCHLIST);
  db.collection("ticker_info").insertMany(
    results.map((i) => {
      i.timestamp = new Date();
      return i;
    })
  );
}
