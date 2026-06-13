import { deleteController, updateController } from "./users.controllers.js";
import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";

export const router = Router();

router.use(authenticate);
router.put("/profile", updateController);
router.delete("/profile", deleteController);
