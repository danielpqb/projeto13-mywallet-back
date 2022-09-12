import { db } from "../database/database.js";
import {
  createUserSchema,
  validateUserSchema,
  createTransactionSchema,
} from "../database/schemas.js";

async function findUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
  return user;
}

async function createUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = createUserSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error);
    return;
  }

  try {
    const user = await findUserByEmail(email);
    if (user) {
      res.status(409).send({ message: "Usuário já existe." });
      return;
    }
    await db
      .collection("users")
      .insertOne({ name, email, password, token: "", transactions: [] });
    res.status(201).send({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

async function validateUser(req, res) {
  const { email, password } = req.body;

  const validation = validateUserSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error);
    return;
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(409).send({ message: "Usuário inválido." });
      return;
    }

    if (password === user.password) {
      user.token = "abcdefghijklmnopqrstuvwxyz";

      await db
        .collection("users")
        .updateOne(
          { email: user.email },
          { $set: { lastLogin: Date.now(), token: user.token } }
        );

      res.status(200).send({
        token: user.token,
        email: user.email,
        name: user.name,
        transactions: user.transactions,
      });
      return;
    } else {
      res.status(409).send({ message: "Senha incorreta." });
      return;
    }
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export { findUserByEmail, createUser, validateUser };
