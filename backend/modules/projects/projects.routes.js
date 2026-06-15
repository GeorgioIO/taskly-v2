import { Router } from "express";
import {
  createController,
  deleteController,
  getProjectController,
  getProjectsController,
  updateController,
} from "./projects.controllers.js";
import authenticate from "../../middlewares/authenticate.js";
import { router as taskRoutes } from "../tasks/tasks.routes.js";

export const router = Router();

router.use(authenticate);

router.use("/:id/tasks", taskRoutes);
router.post("/", createController);
router.delete("/:id", deleteController);
router.get("/", getProjectsController);
router.get("/:id", getProjectController);
router.put("/:id", updateController);
