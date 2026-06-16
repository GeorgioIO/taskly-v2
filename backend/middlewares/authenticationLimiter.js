import RateLimit from "express-rate-limit";

const authenticationLimiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests try again later...",
});

export default authenticationLimiter;
