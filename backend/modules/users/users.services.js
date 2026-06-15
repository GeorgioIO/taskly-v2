import pool from "../../config/db.js";
import bcrypt from "bcryptjs";

export async function update(data) {
  const { name, email, password, id } = data;

  // Build dynamic query
  const fields = [];
  const params = [];
  let paramsCounter = 1;

  if (name) {
    fields.push(`name = $${paramsCounter}`);
    params.push(name);
    paramsCounter++;
  }

  if (email) {
    fields.push(`email = $${paramsCounter}`);
    params.push(email);
    paramsCounter++;
  }

  if (password) {
    fields.push(`password = $${paramsCounter}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    params.push(hashedPassword);
    paramsCounter++;
  }

  params.push(id);
  const conditions = fields.join(",");

  const query = `UPDATE users SET ${conditions} WHERE id = $${paramsCounter} RETURNING id , name , email`;

  const result = await pool.query(query, params);

  return result.rows[0];
}

export async function remove(id) {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

  return result.rowCount;
}
