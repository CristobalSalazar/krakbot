import { MongoClient, Db } from "mongodb";
import { CONNECTION_STRING, DB_NAME } from "../config";
var client: MongoClient | null = null;

export async function getDb(): Promise<Db> {
  const connectionString = CONNECTION_STRING;
  const dbName = DB_NAME;
  if (client !== null) {
    return client.db(dbName);
  }
  try {
    client = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to db...");
    return client.db(dbName);
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
