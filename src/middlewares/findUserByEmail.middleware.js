import { db } from "../database/database.js";

async function findUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
  return user;
}

export { findUserByEmail };
