import { AppError } from "../../utils/AppError.js";
import { login, register } from "./auth.services.js";
import { isValidEmail, isValidPassword } from "../../utils/validation.js";

export async function registerController(req, res, next) {
  // Get data
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  if (!isValidEmail(email)) {
    throw new AppError("Email is invalid", 400);
  }

  if (!isValidPassword(password)) {
    throw new AppError("Password is invalid", 400);
  }

  try {
    const user = await register(name, email, password);

    return res
      .status(201)
      .json({ success: true, message: "Register successful", data: user });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  // Get data
  const { email, password } = req.body;

  // Validate data
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // Send request to db
  try {
    const { token, user } = await login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 8 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req, res, next) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Log out successful",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}
