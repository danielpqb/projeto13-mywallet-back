import express from "express";
import cors from "cors";

import { usersRouter } from "./src/routers/users.router.js";
import { transactionsRouter } from "./src/routers/transactions.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRouter);
app.use(transactionsRouter);

app.listen(5000, () => console.log("Servidor rodando na porta 5000!"));
