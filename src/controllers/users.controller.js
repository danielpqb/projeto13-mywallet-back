import { db } from "../database/database.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

async function findUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
  return user;
}

async function createUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (user) {
      res.status(409).send({ message: "Usuário já existe." });
      return;
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({
      name,
      email,
      password: passwordHash,
      token: "",
      transactions: [],
    });
    res.status(201).send({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

async function validateUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(409).send({ message: "Usuário inválido." });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      user.token = uuid();

      await db
        .collection("users")
        .updateOne(
          { email: user.email },
          { $set: { lastStatus: Date.now(), token: user.token } }
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
