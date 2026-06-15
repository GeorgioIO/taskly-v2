import { Router } from "express";
import {
  createTaskController,
  getTasksController,
} from "./tasks.controllers.js";

export const router = Router({ mergeParams: true });

router.post("/", createTaskController);
router.get("/", getTasksController);
