import express from "express";
import {
  register,
  login,
  logout,
  current,
} from "../controllers/authControllers.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(registerUserSchema), register);

authRouter.post("/login", isEmptyBody, validateBody(loginUserSchema), login);

authRouter.post("/logout", isAuthenticated, logout);

authRouter.get("/current", isAuthenticated, current);

export default authRouter;