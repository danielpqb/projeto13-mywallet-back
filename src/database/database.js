import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DB_URI);
try {
  await mongoClient.connect();
  console.log("Conectado ao MongoDB");
} catch (error) {
  console.log(error.message);
}
const db = mongoClient.db("my-wallet");

export { db };
