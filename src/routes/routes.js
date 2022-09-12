import express from "express";

import { createUser, validateUser } from "../controllers/users.controller.js";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactions.controller.js";

import { createUserValidation } from "../middlewares/createUserValidation.middleware.js";
import { loginUserValidation } from "../middlewares/loginUserValidation.middleware.js";
import { createTransactionValidation } from "../middlewares/createTransactionValidation.middleware.js";

const router = express.Router();

//Users
router.post("/register", createUserValidation, createUser);
router.post("/login", loginUserValidation, validateUser);

//Transactions
router.get("/transactions", getTransactions);
router.post("/transactions", createTransactionValidation, createTransaction);

export { router };
