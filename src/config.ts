import dotenv from "dotenv";
dotenv.config();

export const CONNECTION_STRING =
  process.env.CONNECTION_STRING || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME || "krakbot";
export const API_KEY = process.env.API_KEY as string;
export const API_SECRET = process.env.API_SECRET as string;
