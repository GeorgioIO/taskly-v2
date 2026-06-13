import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
// ! .config reads your .env file parses its content and assign them to process.env so you can use them in other files

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default pool;
