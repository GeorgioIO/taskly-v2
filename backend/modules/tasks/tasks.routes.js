import { Router } from "express";
import {
  createTaskController,
  deleteController,
  getTasksController,
  updateController,
} from "./tasks.controllers.js";
import validateParams from "../../middlewares/validateParams.js";

export const router = Router({ mergeParams: true });

router.post("/", createTaskController);
router.get("/", getTasksController);
router.delete("/:taskId", validateParams("taskId"), deleteController);
router.put("/:taskId", validateParams("taskId"), updateController);
