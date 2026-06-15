import { AppError } from "../../utils/AppError.js";
import {
  hasValidImageExtension,
  isValidDueDate,
  isValidID,
  isValidLength,
  isValidPriority,
  isValidStatus,
  isValidURL,
} from "../../utils/validation.js";
import {
  create as createProject,
  createTask,
  get as getProject,
  getAll as getProjects,
  getTasks,
  remove as removeProject,
  update as updateProject,
} from "./projects.services.js";

export async function createController(req, res, next) {
  const { title, description, banner } = req.body;
  const userId = req.user.id;

  // Validation
  if (!title) {
    throw new AppError("Title is required.", 400);
  } else if (!isValidLength(title, 100)) {
    throw new AppError("Title must be maximum 100 characters");
  }

  if (!description) {
    throw new AppError("Description is required.", 400);
  } else if (!isValidLength(description, 255)) {
    throw new AppError("Description must be maximum 255 characters");
  }

  if (banner) {
    if (!isValidURL(banner)) {
      throw new AppError("Url is invalid", 400);
    }

    if (!hasValidImageExtension(banner)) {
      throw new AppError(
        "Given file format is not accepted (Only jpg, jpeg, png, webp)",
        400,
      );
    }

    if (!isValidLength(banner, 255)) {
      throw new AppError("Banner url must be maximum 255 characters", 400);
    }
  }

  // Request
  try {
    const insertedProject = await createProject({
      title,
      description,
      banner,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: insertedProject,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteController(req, res, next) {
  const projectId = req.params.id;
  const userId = req.user.id;

  try {
    const deletedId = await removeProject({ projectId, userId });

    if (deletedId === 0) {
      throw new AppError("No rows found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectsController(req, res, next) {
  const userId = req.user.id;

  try {
    const projects = await getProjects(userId);

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectController(req, res, next) {
  const projectId = req.params.id;
  const userId = req.user.id;

  if (!isValidID(projectId)) {
    throw new AppError("Invalid given id", 400);
  }

  try {
    const { rows, rowCount } = await getProject({ projectId, userId });

    if (rowCount === 0) {
      throw new AppError("Project not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateController(req, res, next) {
  const { title, description, banner } = req.body;
  const projectId = req.params.id;
  const userId = req.user.id;

  if (!title && !description) {
    throw new AppError("Title and description are required", 400);
  }

  if (title && !isValidLength(title, 100)) {
    throw new AppError("Title is required", 400);
  }

  if (description && !isValidLength(description, 255)) {
    throw new AppError("Description is required", 400);
  }

  if (banner) {
    if (!isValidURL(banner)) {
      throw new AppError("Url is invalid", 400);
    }

    if (!hasValidImageExtension(banner)) {
      throw new AppError(
        "Given file format is not accepted (Only jpg, jpeg, png, webp)",
        400,
      );
    }

    if (!isValidLength(banner, 255)) {
      throw new AppError("Banner url must be maximum 255 characters", 400);
    }
  }

  try {
    const { rows, rowCount } = await updateProject({
      projectId,
      title,
      description,
      banner,
      userId,
    });

    if (rowCount === 0) {
      throw new AppError("Updating project failed", 500);
    }

    return res.status(200).json({
      success: true,
      message: "Project is updated successfully",
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
}

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
