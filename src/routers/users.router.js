import express from "express";

import { createUser, validateUser } from "../controllers/users.controller.js";

import { createUserValidation } from "../middlewares/createUserValidation.middleware.js";
import { loginUserValidation } from "../middlewares/loginUserValidation.middleware.js";

const router = express.Router();

//Users
router.post("/register", createUserValidation, createUser);
router.post("/login", loginUserValidation, validateUser);

export { router as usersRouter };
