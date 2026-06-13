import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export default function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    next(new AppError("No valid authentication token provided", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
}
