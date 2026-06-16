import pool from "../../config/db.js";

export async function create(data) {
  const { projectId, title, description, status, priority, dueDate } = data;

  const result = await pool.query(
    `INSERT INTO tasks (project_id , title , description , status , priority , due_date) 
    VALUES ($1 , $2 , $3 , $4 , $5 , $6) RETURNING *;`,
    [projectId, title, description, status, priority, dueDate],
  );

  return result.rows[0];
}

export async function getAll(data) {
  const { projectId, userId } = data;
  const result = await pool.query(
    `
    SELECT 
      t.id,
      t.title,
      t.description,
      status,
      priority,
      t.created_at,
      due_date
    FROM tasks t
    JOIN projects p ON t.project_id = p.id
    WHERE p.user_id = $1 AND p.id = $2
    `,
    [userId, projectId],
  );

  return result.rows;
}

export async function update(data) {
  const {
    taskId,
    userId,
    projectId,
    title,
    description,
    status,
    priority,
    dueDate,
  } = data;

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
  params.push(projectId, taskId, userId);

  const query = `
    UPDATE tasks t 
    SET ${conditions} 
    FROM projects p 
    WHERE 
      t.project_id = p.id
      AND t.project_id = $${paramsCounter}
      AND t.id = $${paramsCounter + 1}
      AND p.user_id = $${paramsCounter + 2}
    RETURNING *`;

  console.log(query);

  const result = await pool.query(query, params);

  return result;
}

export async function remove(data) {
  const { taskId, userId, projectId } = data;

  const result = await pool.query(
    `
      DELETE FROM tasks t 
      USING projects p 
      WHERE t.project_id = p.id
      AND t.project_id = $1
      AND t.id = $2
      AND p.user_id = $3`,
    [projectId, taskId, userId],
  );

  return result;
}
