import { getDb, closeConnection } from "./db/mongo";
import api from "./kraken/api";

async function main() {
  const db = await getDb();
  const res = await api.getRecentTrades({ pair: "DOTXBT" });
  console.log(res);
  closeConnection();
}
main();
