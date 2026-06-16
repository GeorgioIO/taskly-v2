import {
  create as createTask,
  getAll as getTasks,
  remove as deleteTask,
  update,
} from "./tasks.services.js";
import {
  isValidID,
  isValidLength,
  isValidDueDate,
  isValidPriority,
  isValidStatus,
  isEmpty,
} from "../../utils/validation.js";
import { AppError } from "../../utils/AppError.js";

export async function createTaskController(req, res, next) {
  const { title, description, status, priority, dueDate } = req.body;
  const projectId = req.params.id;

  if (!isValidID(projectId)) {
    throw new AppError("Invalid project id", 400);
  }

  if (isEmpty(title)) {
    throw new AppError("Title is required", 400);
  } else if (!isValidLength(title, 150)) {
    throw new AppError("Title must be maximum 150 characters", 400);
  }

  if (isEmpty(description)) {
    throw new AppError("Description is required", 400);
  } else if (!isValidLength(description, 255)) {
    throw new AppError("Description must be maximum 255 characters", 400);
  }

  if (!isValidStatus(status)) {
    throw new AppError("Invalid status used", 400);
  }

  if (!isValidPriority(priority)) {
    throw new AppError("Invalid priority used", 400);
  }

  if (isEmpty(dueDate)) {
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

export async function deleteController(req, res, next) {
  const { id: projectId, taskId } = req.params;
  const userId = req.user.id;

  if (!isValidID(projectId) || !isValidID(taskId)) {
    throw new AppError("Invalid given id", 400);
  }

  try {
    const { rowCount } = await deleteTask({ projectId, taskId, userId });

    if (rowCount === 0) {
      throw new AppError("No task found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateController(req, res, next) {
  const { id: projectId, taskId } = req.params;
  const { title, description, status, priority, dueDate } = req.body;
  const userId = req.user.id;

  if (!isValidID(projectId) || !isValidID(taskId)) {
    throw new AppError("Invalid given id", 400);
  }

  if (
    isEmpty(title) &&
    isEmpty(description) &&
    isEmpty(status) &&
    isEmpty(priority) &&
    isEmpty(dueDate)
  ) {
    throw new AppError("No fields set to be updated", 400);
  }

  if (!isEmpty(title) && !isValidLength(title, 150)) {
    throw new AppError("Title must be maximum 150 characters");
  }

  if (!isEmpty(description) && !isValidLength(description, 255)) {
    throw new AppError("Description must be maximum 255 characters");
  }

  if (!isEmpty(status) && !isValidStatus(status)) {
    throw new AppError("Invalid status used", 400);
  }

  if (!isEmpty(priority) && !isValidPriority(priority)) {
    throw new AppError("Invalid priority used", 400);
  }

  if (!isEmpty(dueDate) && !isValidDueDate(dueDate)) {
    throw new AppError("Invalid due date", 400);
  }

  try {
    const { rowCount, rows } = await update({
      projectId,
      taskId,
      userId,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    if (rowCount === 0) {
      throw new AppError("No task found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
}
