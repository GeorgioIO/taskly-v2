import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

// Routers
import { router as authRoutes } from "./modules/auth/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
