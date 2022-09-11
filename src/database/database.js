import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.DB_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("my-wallet");
});

export { db };
