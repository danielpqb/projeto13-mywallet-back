import { db } from "../database/database.js";
import { createTransactionSchema } from "../database/schemas.js";

async function getTransactions(req, res) {
  const auth = req.headers.authorization.replace("Bearer ", "");
  const token = auth;

  const user = await db.collection("users").findOne({ token });

  if (!user) {
    res.status(404).send({ message: "Token inválido" });
    return;
  }

  res.status(200).send({ transactions: user.transactions });
}

async function createTransaction(req, res) {
  const auth = req.headers.authorization.replace("Bearer ", "");
  const token = auth;

  const user = await db.collection("users").findOne({ token });

  if (!user) {
    res.status(404).send({ message: "Token inválido" });
    return;
  }

  const { value, description } = req.body;

  const validation = createTransactionSchema.validate(
    { value, description },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error);
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
  } catch (error) {}
}

export { getTransactions, createTransaction };
