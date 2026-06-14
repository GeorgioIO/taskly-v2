import pool from "../../config/db.js";

export async function create(data) {
  const { userId, title, description, banner } = data;

  const result = await pool.query(
    "INSERT INTO projects (user_id , title , description , banner_url) VALUES ($1 , $2 , $3 , $4) RETURNING title , description",
    [userId, title, description, banner],
  );

  return result.rows[0];
}

export async function remove(data) {
  const { projectId, userId } = data;

  const result = await pool.query(
    "DELETE FROM projects WHERE id = $1 AND user_id = $2",
    [projectId, userId],
  );

  return result.rowCount;
}

export async function update(data) {}

export async function getAll() {}

export async function get() {}
