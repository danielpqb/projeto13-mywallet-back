import express from "express";

import {
  getTransactions,
  createTransaction,
} from "../controllers/transactions.controller.js";

import { createTransactionValidation } from "../middlewares/createTransactionValidation.middleware.js";

const router = express.Router();

//Transactions
router.get("/transactions", getTransactions);
router.post("/transactions", createTransactionValidation, createTransaction);

export { router as transactionsRouter };
