import express from "express";

import { createUser } from "../controllers/users.controller.js";

const router = express.Router();

//Users
router.post("/register", createUser);

export { router };
