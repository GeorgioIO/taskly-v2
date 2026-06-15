import { create as createTask, getAll as getTasks } from "./tasks.services.js";
import {
  isValidID,
  isValidLength,
  isValidDueDate,
  isValidPriority,
  isValidStatus,
} from "../../utils/validation.js";

export async function createTaskController(req, res, next) {
  const { title, description, status, priority, dueDate } = req.body;
  const projectId = req.params.id;

  if (!title.trim()) {
    throw new AppError("Title is required", 400);
  } else if (!isValidLength(title, 150)) {
    throw new AppError("Title must be maximum 150 characters");
  }

  if (!description.trim()) {
    throw new AppError("Description is required", 400);
  } else if (!isValidLength(description, 255)) {
    throw new AppError("Description must be maximum 255 characters");
  }

  if (!isValidStatus(status)) {
    throw new AppError("Invalid status used", 400);
  }

  if (!isValidPriority(priority)) {
    throw new AppError("Invalid priority used", 400);
  }

  if (!dueDate.trim()) {
    throw new AppError("Due date is required", 400);
  } else if (!isValidDueDate(dueDate)) {
    throw new AppError("Invalid due date", 400);
  }

  try {
    const task = await createTask({
      projectId,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTasksController(req, res, next) {
  const projectId = req.params.id;
  const userId = req.user.id;

  if (!isValidID(projectId)) {
    throw new AppError("Invalid given id", 400);
  }

  try {
    const tasks = await getTasks({ projectId, userId });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
}
