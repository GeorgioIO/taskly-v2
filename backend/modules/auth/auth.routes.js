import {
  loginController,
  logoutController,
  registerController,
} from "./auth.controllers.js";
import { Router } from "express";
import authenticationLimiter from "../../middlewares/authenticationLimiter.js";
export const router = Router();

router.use(authenticationLimiter);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
