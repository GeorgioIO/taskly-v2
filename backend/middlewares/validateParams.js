import { AppError } from "../utils/AppError.js";
import { isValidID } from "../utils/validation.js";

export default function validateParams(paramName) {
  return (req, res, next) => {
    const idToValidate = req.params[paramName];
    if (!isValidID(idToValidate)) {
      return next(new AppError("Invalid given id", 400));
    }

    next();
  };
}
