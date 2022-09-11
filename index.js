import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
dotenv.config();

async function findUserByEmail(email) {
  const user = await db.collection("users").findOne({ email });
  console.log(user);
  return user;
}

const app = express();

app.use(cors());
app.use(express.json());

//Connect to DB
const mongoClient = new MongoClient(process.env.DB_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("my-wallet");
});

//Schemas
const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

//Endpoints
app.post("/register", async (req, res) => {
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
      res.sendStatus(409);
      return;
    }
    await db
      .collection("users")
      .insertOne({ name, email, password, transactions: [] });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

app.listen(5000, () => console.log("Server listening on port 5000!"));
