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

export async function update(data) {
  // Build dynamic query
  const { title, description, banner, projectId, userId } = data;

  const fields = [];
  const params = [];
  let paramsCounter = 1;

  if (title) {
    fields.push(`title = $${paramsCounter}`);
    params.push(title);
    paramsCounter++;
  }

  if (description) {
    fields.push(`description = $${paramsCounter}`);
    params.push(description);
    paramsCounter++;
  }

  if (banner) {
    fields.push(`banner_url = $${paramsCounter}`);
    params.push(banner);
    paramsCounter++;
  }

  const conditions = fields.join(",");
  const query = `UPDATE projects SET ${conditions} WHERE id = $${paramsCounter} AND user_id = $${paramsCounter + 1} RETURNING *`;
  params.push(projectId, userId);

  console.log(query);
  const result = await pool.query(query, params);

  return result;
}

export async function getAll(userId) {
  const result = await pool.query("SELECT * FROM projects WHERE user_id = $1", [
    userId,
  ]);

  return result.rows;
}

export async function get(data) {
  const { projectId, userId } = data;

  const result = await pool.query(
    "SELECT * FROM projects WHERE id = $1 AND user_id = $2",
    [projectId, userId],
  );

  return result;
}
