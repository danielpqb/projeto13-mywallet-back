import { db } from "../database/database.js";

async function getTransactions(req, res) {
  const { token } = req.body;

  const user = await db.collection("users").findOne({ token });

  if (!user) {
    res.status(404).send({ message: "Token inválido" });
    return;
  }

  res.status(200).send(user.transactions);
}

export { getTransactions };
