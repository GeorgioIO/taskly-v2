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
import validateParams from "../../middlewares/validateParams.js";

export const router = Router();

router.use(authenticate);

router.use("/:id/tasks", validateParams("id"), taskRoutes);
router.post("/", createController);
router.delete("/:id", validateParams("id"), deleteController);
router.get("/", getProjectsController);
router.get("/:id", validateParams("id"), getProjectController);
router.put("/:id", validateParams("id"), updateController);
