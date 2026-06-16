export default function errorHandler(error, req, res, next) {
  console.error(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error.";
  let errors = null;

  // DB specific errors
  if (error.code) {
    switch (error.code) {
      // unique violation
      case "23505":
        statusCode = 409;
        message = "Resource already exists";
        break;

      // not null violation
      case "23502":
        statusCode = 400;
        message = "Missing required field";
        break;

      // foreign key violation
      case "23503":
        statusCode = 400;
        message = "Referenced resource does not exist";
        break;

      // check constraint violation
      case "23514":
        statusCode = 400;
        message = "Data failed validation rules";
        break;

      // DB connection refused
      case "ECONNREFUSED":
        statusCode = 503;
        message = "Database connection failed, try again later";
        break;
    }
  }

  // JWT related errors
  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token is expired , try again later";
  }

  return res
    .status(statusCode)
    .json({ success: false, message, data: null, errors });
}
