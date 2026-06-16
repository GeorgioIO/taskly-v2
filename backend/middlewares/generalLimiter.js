import RateLimit from "express-rate-limit";

const generalLimiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Too many requests please try again later",
});

export default generalLimiter;
