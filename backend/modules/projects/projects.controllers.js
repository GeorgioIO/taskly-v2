import { AppError } from "../../utils/AppError.js";
import {
  hasValidImageExtension,
  isValidLength,
  isValidURL,
} from "../../utils/validation.js";
import { create } from "./projects.services.js";

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
    const insertedProject = await create({
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
