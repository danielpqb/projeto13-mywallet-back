import { db } from "../database/database.js";

async function getTransactions(req, res) {
  const auth = req.headers.authorization.replace("Bearer ", "");
  const token = auth;

  const user = await db.collection("users").findOne({ token });

  if (!user) {
    res.status(404).send({ message: "Token inválido" });
    return;
  }

  res.status(200).send({ transactions: user.transactions });
  return;
}

async function createTransaction(req, res) {
  const auth = req.headers.authorization.replace("Bearer ", "");
  const token = auth;

  const user = await db.collection("users").findOne({ token });

  if (!user) {
    res.status(404).send({ message: "Token inválido" });
    return;
  }

  try {
    user.transactions.push(req.body);
    await db
      .collection("users")
      .updateOne(
        { email: user.email },
        { $set: { lastStatus: Date.now(), transactions: user.transactions } }
      );
    res.status(200).send({ message: "Transação criada com sucesso" });
    return;
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export { getTransactions, createTransaction };
