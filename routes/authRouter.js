import express from "express";
import {
  register,
  login,
  logout,
  current,
  updateAvatar,
} from "../controllers/authControllers.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import isFilePresent from "../middlewares/isFilePresent.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(registerUserSchema), register);

authRouter.post("/login", isEmptyBody, validateBody(loginUserSchema), login);

authRouter.post("/logout", isAuthenticated, logout);

authRouter.get("/current", isAuthenticated, current);

authRouter.patch("/avatars", isAuthenticated, upload.single("avatar"), isFilePresent, updateAvatar);

export default authRouter;