import {
  remove as removeUser,
  update as updateUser,
} from "./users.services.js";
import {
  isEmpty,
  isValidEmail,
  isValidPassword,
} from "../../utils/validation.js";
import { AppError } from "../../utils/AppError.js";

export async function updateController(req, res, next) {
  const { name, email, password } = req.body;
  const id = req.user.id;

  if (isEmpty(name) && isEmpty(email) && isEmpty(password)) {
    throw new AppError("Atleast one field is required to update", 400);
  }

  if (!isEmpty(email) && !isValidEmail(email)) {
    throw new AppError("Email is invalid", 400);
  }

  if (!isEmpty(password) && !isValidPassword(password)) {
    throw new AppError("Password is invalid", 400);
  }

  try {
    const updatedUser = await updateUser({ name, email, password, id });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteController(req, res, next) {
  const id = req.user.id;

  try {
    const affectedRows = await removeUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}
