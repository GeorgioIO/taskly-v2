import pool from "../../config/db.js";

export async function update(data) {
  const { taskId, title, description, status, priority, dueDate } = data;

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

  if (status) {
    fields.push(`status = $${paramsCounter}`);
    params.push(status);
    paramsCounter++;
  }

  if (priority) {
    fields.push(`priority = $${paramsCounter}`);
    params.push(priority);
    paramsCounter++;
  }

  if (dueDate) {
    fields.push(`due_date = $${paramsCounter}`);
    params.push(dueDate);
    paramsCounter++;
  }

  const conditions = fields.join(",");
  params.push(taskId);

  const query = `UPDATE tasks SET ${conditions} WHERE id = $${paramsCounter} RETURNING id`;

  const result = await pool.query(query, params);

  return result;
}

export async function remove() {}
