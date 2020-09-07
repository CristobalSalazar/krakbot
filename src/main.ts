import { getDb, closeConnection } from "./db/mongo";
import api from "./kraken/api";

async function main() {
  const db = await getDb();
  try {
    const res = await api.getTradesHistory({});
    console.log(res);
  } catch (err) {
    console.error(err);
  }
  closeConnection();
}
main();
