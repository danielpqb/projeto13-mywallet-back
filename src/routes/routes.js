import express from "express";

import { createUser, validateUser } from "../controllers/users.controller.js";

const router = express.Router();

//Users
router.post("/register", createUser);
router.get("/", validateUser);

export { router };
