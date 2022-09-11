import { db } from "../database/database.js";
import {
  signInSchema,
  signUpSchema,
  transactionSchema,
} from "../database/schemas.js";

async function findUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
  console.log(user);
  return user;
}

async function createUser(req, res) {
  let { name, email, password } = req.body;

  const validation = signUpSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }

  try {
    const user = await findUserByEmail(email);
    if (user) {
      res.status(409).send({ message: "Usuário já existe." });
      return;
    }
    await db.collection("users").insertOne({ name, email, password });
    res.status(201).send({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export { createUser, findUserByEmail };
