import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./config/db.js";

// Routes
import { router as authRoutes } from "./modules/auth/auth.routes.js";
import { router as userRoutes } from "./modules/users/users.routes.js";
import { router as projectRoutes } from "./modules/projects/projects.routes.js";

// Middlewares
import errorHandler from "./middlewares/errorHandler.js";
import generalLimiter from "./middlewares/generalLimiter.js";
import authenticationLimiter from "./middlewares/authenticationLimiter.js";

import { AppError } from "./utils/AppError.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(generalLimiter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);

app.use((req, res, next) => next(new AppError("No route found", 404)));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
