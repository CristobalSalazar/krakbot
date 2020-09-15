import { getDb, closeConnection } from "./db/mongo";
import api from "./api";
import { DOTETH } from "./util/asset-pairs";

async function main() {
  try {
    const res = await api.getTickerInfo([DOTETH]);
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();
