import { MongoClient, Db } from "mongodb";
import { CONNECTION_STRING, DB_NAME } from "../config";
var client: MongoClient | null = null;

export async function getDb(): Promise<Db> {
  if (client !== null) {
    return client.db(DB_NAME);
  }
  try {
    client = await MongoClient.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to db...");
    return client.db(DB_NAME);
  } catch (err) {
    console.error("Unable to connect to database", err);
    process.exit(1);
  }
}

export async function closeConnection() {
  if (client !== null) {
    await client.close();
  }
}
