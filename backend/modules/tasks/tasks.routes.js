import { Router } from "express";
import {
  createTaskController,
  deleteController,
  getTasksController,
  updateController,
} from "./tasks.controllers.js";

export const router = Router({ mergeParams: true });

router.post("/", createTaskController);
router.get("/", getTasksController);
router.delete("/:taskId", deleteController);
router.put("/:taskId", updateController);
