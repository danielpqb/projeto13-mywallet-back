import express from "express";

import { createUser, validateUser } from "../controllers/users.controller.js";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactions.controller.js";

const router = express.Router();

//Users
router.post("/register", createUser);
router.post("/login", validateUser);

//Transactions
router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);

export { router };
