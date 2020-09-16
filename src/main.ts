import KrakenApi from "./api";
import { API_KEY, API_SECRET } from "./config";

async function main() {
  const api = new KrakenApi(API_KEY, API_SECRET);
  try {
    const res = await api.getTradableAssetPairs({});
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
main();
