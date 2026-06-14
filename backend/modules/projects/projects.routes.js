import { Router } from "express";
import { createController, deleteController } from "./projects.controllers.js";
import authenticate from "../../middlewares/authenticate.js";

export const router = Router();

router.use(authenticate);

router.post("/", createController);
router.delete("/:id", deleteController);
