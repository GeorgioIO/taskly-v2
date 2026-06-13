import {
  loginController,
  logoutController,
  registerController,
} from "./auth.controllers.js";
import { Router } from "express";

export const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
